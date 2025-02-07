import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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

const editCollectionSchema = z.object({
    label: z.string().nonempty({ message: "Label is required" }),
    isPrivate: z.boolean(),
});

export async function POST(request: NextRequest, { params }: Props) {
    try {
        const { collectionId } = await params;
        const body = await request.json();
        const { label, isPrivate, userId } = body;

        const collectionData = { label, isPrivate, userId };

        editCollectionSchema.parse(collectionData);

        const newCollection = await db.collection.update({
            where: {
                id: collectionId,
            },
            data: {
                label: collectionData.label,
                isPrivate: collectionData.isPrivate,
                userId: collectionData.userId,
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

export async function DELETE(request: NextRequest, { params }: Props) {
    try {
        const { collectionId } = await params;
        const body = await request.json();
        const { userId } = body;

        if (!userId || !collectionId) {
            return NextResponse.json(
                { error: "User ID and collection ID are required" },
                { status: 400 }
            );
        }

        await db.collection.delete({
            where: { id: collectionId },
        });

        return NextResponse.json({
            success: true,
            message: "collection as been deleted ",
        });
    } catch (error) {
        console.error("[collection DELETED]", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}