import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Props = {
    params: Promise<{ collectionId: string }>
}

export async function GET(request: NextRequest, { params }: Props) {
    try {
        const { collectionId } = await params;

        const collection = await db.collection.findUnique({
            where: {
                id: collectionId
            }, 
            include: {
                goals: true
            }
        });

        return NextResponse.json({
            data: collection, //null si erreur
            message: "Successfully got the collection", // msg d'erreur si erreur
            success: true, // false si erreur 
        })

    } catch (error) {
        console.log("[category]", error)
        return NextResponse.json({
            data: null,
            success: false,
            message: `category: Internal Error:  ${error}`
        }, { status: 500 }
        )
    }
}

// export async function POST(request: NextRequest) {
//     try {
//         const body = await request.json();
//         const { label, isPrivate, userId = "123test" } = body;

//         const categoryData = { label, isPrivate, userId };

//         createCategorySchema.parse(categoryData);

//         const newCategory = await db.category.create({
//             data: {
//                 label: categoryData.label,
//             },
//         });

//         return NextResponse.json({
//             success: true,
//             message: "Created new category",
//             data: newCategory,
//         });
//     } catch (error) {

//         if (error instanceof z.ZodError) {
//             return NextResponse.json(
//                 { error: error.errors[0].message },
//                 { status: 400 }
//             );
//         }

//         return NextResponse.json({
//             data: null,
//             success: false,
//             message: `create category: Internal Error:  ${error}`
//         }, { status: 500 }
//         )
//     }
// }