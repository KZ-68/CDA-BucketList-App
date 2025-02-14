import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Props = {
    params: Promise<{ categoryId: string }>
}

export async function DELETE(request: NextRequest, { params }: Props) {
    try {
        const { categoryId } = await params;
        const body = await request.json();
        const { userId } = body;

        if (!userId || !categoryId) {
            return NextResponse.json(
                { error: "User ID and Category ID are required" },
                { status: 400 }
            );
        }

        await db.category.delete({
            where: { id: categoryId },
        });

        return NextResponse.json({
            success: true,
            message: "Category as been deleted ",
        });
    } catch (error) {
        console.error("[Category DELETED]", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}