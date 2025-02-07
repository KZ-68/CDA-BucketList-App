import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type Props = {
    params: Promise<{ categoryId: string }>
}


const editCategorySchema = z.object({
    label: z.string().nonempty({ message: "Label is required" }),
});

// Edit Method
export async function POST(request: NextRequest, { params }: Props) {  
    try{
        const { categoryId } = await params;

        const body = await request.json();
        const { label, userId } = body;

        if (!userId || !categoryId) {
            return NextResponse.json(
                { error: "User ID and Category ID are required" },
                { status: 400 }
            );
        }

        const categoryData = { label };
        editCategorySchema.parse(categoryData);

        const updateCategory = await db.category.update({
            where: {
                id: categoryId,
            },
            data: {
                label: categoryData.label,
            },
        })
        return NextResponse.json({
            success: true,
            message: "Category Edited !",
            data: updateCategory,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.errors[0].message },
                { status: 400 }
            );
        }

        return NextResponse.json({
            data: null,
            success: false,
            message: `edit category: Internal Error:  ${error || "nothing"}`
        }, { status: 500 }
        )
    }
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