import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

export async function GET() {
    try {
        const categories = await db.category.findMany();

        return NextResponse.json({
            data: categories, //null si erreur
            message: "Succesfully got the categories", // msg d'erreur si erreur
            success: true, // false si erreur 
        })

    } catch (error) {
        console.log("[categories]", error)
        return NextResponse.json({
            data: null,
            success: false,
            message: `categories: Internal Error:  ${error}`
        }, { status: 500 }
        )
    }
}

const createCategorySchema = z.object({
    label: z.string().nonempty({ message: "Label is required" }),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { label, isPrivate, userId = "123test" } = body;

        const categoryData = { label, isPrivate, userId };

        createCategorySchema.parse(categoryData);

        const newCategory = await db.category.create({
            data: {
                label: categoryData.label,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Created new category",
            data: newCategory,
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
            message: `create category: Internal Error:  ${error}`
        }, { status: 500 }
        )
    }
}