import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type Props = {
    params: Promise<{ goalId: string }>
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