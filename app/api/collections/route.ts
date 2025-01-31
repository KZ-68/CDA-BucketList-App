import { db } from "@/lib/db";
import { CollectionType } from "@/types/types";
import { create } from "domain";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

export async function GET() {
    try {
        const collections = await db.collection.findMany();

        return NextResponse.json({
            data: collections, //null si erreur
            message: "Succesfully got the collections", // msg d'erreur si erreur
            success: true, // false si erreur 
        })

    } catch (error) {
        console.log("[collections]", error)
        return NextResponse.json({
            data: null,
            success: false,
            message: `collections: Internal Error:  ${error}`
        }, { status: 500 }
        )
    }
}

const createCollectionSchema = z.object({
    label: z.string().nonempty({ message: "Label is required" }),
    isPrivate: z.boolean(),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { label, isPrivate } = body;

        const collectionData = { label, isPrivate };

        createCollectionSchema.parse(collectionData);

        const newCollection = await db.collection.create({
            data: {
                label: collectionData.label,
                isPrivate: collectionData.isPrivate,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Created new collection",
            data: newCollection,
        });
    } catch (error) {
        // console.log("[CREATE COLLECTION]", error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.errors[0].message },
                { status: 400 }
            );
        }

        return NextResponse.json({
            data: null,
            success: false,
            message: `create collection: Internal Error:  ${error || "nothing"}`
        }, { status: 500 }
        )
    }
}

// export async function DELETE(request: NextRequest) {
//     try {
//         const body = await request.json();
//         const { userId, cardId } = body;

//         if (!userId || !cardId) {
//             return NextResponse.json(
//                 { error: "User ID and Card ID are required" },
//                 { status: 400 }
//             );
//         }

//         await db.learned.delete({
//             where: { id_user_id_card: { id_user: userId, id_card: cardId } },
//         });

//         return NextResponse.json({
//             success: true,
//             message: "Card marked as unlearned",
//         });
//     } catch (error) {
//         console.error("[UNMARK AS LEARNED]", error);
//         return NextResponse.json({ error: "Internal Error" }, { status: 500 });
//     }
// }