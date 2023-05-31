import { prisma } from "./lib/prisma"
import { z } from 'zod'
import { FastifyInstance } from 'fastify';
import dayjs from 'dayjs';

export async function appRoutes(app: FastifyInstance){

    // ROUTE 1. Create Habit
    app.post('/habits', async (request, response) => {
        const createHabitBody = z.object({
            title: z.string(),
            weekDays: z.array(
                z.number().min(0).max(6))
        })
        
        const {title, weekDays} = createHabitBody.parse(request.body)

        const today = dayjs().startOf('day').toDate() // The moment we create a new habit, we are going to reset the createdTime of day, to zero 00:00:00 in whathever day we creating, because want to our availability of habits starts with the first day already available the moment we create. 

        await prisma.habit.create({
            data: {
                title,
                created_at: today,
                weekDays: {
                    create: weekDays.map(weekDay => {
                        return {
                            week_day: weekDay
                        }
                    })
                }
            }
        })
    })

    // ROUTE 2. Get Day
    app.get('/day', async (req) => {
        const getDayParams = z.object({
            date: z.coerce.date()
        })

        const { date } = getDayParams.parse(req.query)

        // Getting the week day, to do the get.
        const parsedDate = dayjs(date).startOf('day')
        const weekDay = parsedDate.get('day') //From 0 to 6, starting on Sunday.

        console.log(date, weekDay)

        // Get 1/2. All possible habits on selected day.
        const possibleHabits = await prisma.habit.findMany({
            where: {
                created_at: { 
                    lte: date,
                },
                weekDays: {
                    some: {
                        week_day: weekDay
                    }
                }
            }
        })

        // Get 2/2. All completed habits on selected day. 
        const day = await prisma.day.findUnique({
            where: {
                date: parsedDate.toDate()
            }, 
            include: {
                dayHabits: true,
            }
        })

        // Check if have at least one habit completed on selected day. (Or would get error, since 'day' would be null)
        const completedHabits = day?.dayHabits.map(dayHabit => {
            return dayHabit.habit_id
        }) 

        return {
            possibleHabits,
            completedHabits,
        }

    })

    // ROUTE 3. Toggle habit done.
    app.patch('/habits/:id/toggle', async (request) => {
        
        const toggleHabitParams = z.object({
            id: z.string().uuid(),
        })

        const { id } = toggleHabitParams.parse(request.params)

        const today = dayjs().startOf('day').toDate()

        //Looks if is there already completed the habit
        let day = await prisma.day.findUnique({
            where: {
                date: today
            }
        })

        //If not completed, create a register of the day completing the habit
        if (!day) {
            day = await prisma.day.create({
                data: {
                    date: today
                }
            })
        }

        const dayHabit = await prisma.dayHabit.findUnique({
            where: {
                // Field UNIQUE, its relational on the Table, allows this selection on the line below:
                day_id_habit_id: { 
                    day_id: day.id,
                    habit_id: id
                }
            }
        })

        if (dayHabit) {
            // If complete, remove the completion
            await prisma.dayHabit.delete({
                where: {
                    id: dayHabit.id
                }
            })
        }else{
        //Having the register of day_id, and the habit_id received trough the params, we register a habit completion on a day
        await prisma.dayHabit.create({
            data: {
                day_id: day.id,
                habit_id: id
            }
        })
    }
}) 


    // ROUTE 4. Get summary information, with % of completion on each day of available habits for every specific day
    app.get('/summary', async () => {
        const summary = await prisma.$queryRaw`
            SELECT 
                D.id, 
                D.date,
                (
                    SELECT 
                        cast(count(*) as float)
                    FROM day_habits DH
                    WHERE DH.day_id = D.id
                ) as completed,
                (
                    SELECT
                        cast(count(*) as float)
                    FROM habit_week_days HWD
                    JOIN habits H
                        ON H.id = HWD.habit_id
                    WHERE 
                        HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch' ) as int)
                        AND H.created_at <= D.date
                ) as available
            FROM days D
            `

        return summary
    })
}
