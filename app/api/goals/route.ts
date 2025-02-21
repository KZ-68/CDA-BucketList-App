import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

export async function GET() {
    try {
        const goals = await db.goal.findMany({
            orderBy: {
                createdAt: "desc"
            },
        });

        return NextResponse.json({
            data: goals, //null si erreur
            message: "Succesfully got the goals", // msg d'erreur si erreur
            success: true, // false si erreur 
        })

    } catch (error) {
        console.log("[goals]", error)
        return NextResponse.json({
            data: null,
            success: false,
            message: `goals: Internal Error:  ${error}`
        }, { status: 500 }
        )
    }
}

const createGoalSchema = z.object({
    label: z.string().nonempty({ message: "Label is required" }),
    description: z.string().optional(),
    isAccomplished: z.boolean(),
    priority: z.number({ message: "Priority must be completed" })
        .int({ message: "Priority must be an int" })
        .nonnegative({ message: "Priority must be positive" }),
    collectionId: z.string().nonempty({ message: "a Collection is required" }),
    categoryId: z.string().nonempty({ message: "a Category is required" }),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { label, description, isAccomplished, priority, collectionId, categoryId } = body;
        const goalData = { label, description, isAccomplished, priority, collectionId, categoryId };

        createGoalSchema.parse(goalData);

        const newGoal = await db.goal.create({
            data: {
                label: goalData.label,
                description: goalData.description,
                isAccomplished: goalData.isAccomplished,
                priority: goalData.priority,
                collection: {
                    connect: {
                      id: goalData.collectionId,
                    },
                },
                category: {
                    connect: {
                        id: goalData.categoryId
                    }
                }
            },
        });

        return NextResponse.json({
            success: true,
            message: "Created new goal",
            data: newGoal,
        });
    } catch (error) {

        if (error instanceof Error) {
            console.log("[GOAL]", error.stack);
        }
        
        if (error instanceof z.ZodError) {
            console.log("[GOAL]", error.stack);
            return NextResponse.json(
                { error: error.errors[0].message },
                { status: 400 }
            );
        }

        return NextResponse.json({
            data: null,
            success: false,
            message: `create goal: Internal Error:  ${error || "nothing"}`
        }, { status: 500 }
        )
    }
}