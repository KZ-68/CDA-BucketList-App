import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

const createGoalSchema = z.object({
    label: z.string().nonempty({ message: "Label is required" }),
    description: z.string(),
    isAccomplished: z.boolean(),
    priority: z.number(),
    collectionId: z.string().nonempty({ message: "Collection ID is required" }),
});

export async function POST(request: NextRequest, {params} : {params : {collectionId: string}}) {
    try {
        const { collectionId } = await params;
        const body = await request.json();
        const { label, description, isAccomplished, priority, categoryId } = body;
        const goalData = { label, description, isAccomplished, priority, collectionId, categoryId };

        createGoalSchema.parse(goalData);

        const newGoal = await db.goal.create({
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
            message: "Created new goal",
            data: newGoal,
        });
    } catch (error) {
        // console.log("[CREATE GOAL]", error);

        if (error instanceof z.ZodError) {
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