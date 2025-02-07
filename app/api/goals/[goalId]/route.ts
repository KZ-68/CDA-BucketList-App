import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type Props = {
    params: Promise<{ goalId: string }>
}

export async function GET(request: NextRequest, { params }: Props) {
    try {
        const { goalId } = await params;

        const goal = await db.goal.findUnique({
            where: {
                id: goalId
            },
        });

        if(goal !== null) {
            return NextResponse.json({
                data: goal,
                message: "Successfully got the goal",
                success: true, 
            })
        } else {
            return NextResponse.json({
                data: null,
                message: "Goal not found",
                success: false,
            }, { status: 404 })
        }

    } catch (error) {
        console.log("[goal]", error)
        return NextResponse.json({
            data: null,
            success: false,
            message: `goal: Internal Error:  ${error}`
        }, { status: 500 }
        )
    }
}

const editGoalSchema = z.object({
    label: z.string().nonempty({ message: "Label is required" }),
    description: z.string().optional(),
    isAccomplished: z.boolean(),
    priority: z.number({ message: "Priority must be completed" })
        .int({ message: "Priority must be an int" })
        .nonnegative({ message: "Priority must be positive" }),
    collectionId: z.string().nonempty({ message: "a Collection is required" }),
    categoryId: z.string().nonempty({ message: "a Category is required" }),
});

export async function POST(request: NextRequest, { params }: Props) {
    try {
        const { goalId } = await params;

        const body = await request.json();
        const { userId, label, description, isAccomplished, priority, collectionId, categoryId } = body;

        if (!userId || !categoryId) {
            return NextResponse.json(
                { error: "User ID and Category ID are required" },
                { status: 400 }
            );
        }

        const goalData = { label, description, isAccomplished, priority, collectionId, categoryId };

        editGoalSchema.parse(goalData);

        const newGoal = await db.goal.update({
            where: {
                id: goalId,
            },
            data: {
                label: goalData.label,
                description: goalData.description,
                isAccomplished: goalData.isAccomplished,
                priority: goalData.priority,
                collectionId: goalData.collectionId,
                categoryId: goalData.categoryId
            },
        });

        return NextResponse.json({
            success: true,
            message: "Goal Edited !",
            data: newGoal,
        });
    } catch (error) {
        console.log("[EDIT GOAL]", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.errors[0].message },
                { status: 400 }
            );
        }

        return NextResponse.json({
            data: null,
            success: false,
            message: `edit goal: Internal Error:  ${error || "nothing"}`
        }, { status: 500 }
        )
    }
}

export async function DELETE(request: NextRequest, { params }: Props) {
    try {
        const { goalId } = await params;
        const body = await request.json();
        const { userId } = body;

        if (!userId || !goalId) {
            return NextResponse.json(
                { error: "User ID and Goal ID are required" },
                { status: 400 }
            );
        }

        await db.goal.delete({
            where: { id: goalId },
        });

        return NextResponse.json({
            success: true,
            message: "Goal as been deleted ",
        });
    } catch (error) {
        console.error("[Goal DELETED]", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}