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

    // ROUTE B. Get Day
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
}
