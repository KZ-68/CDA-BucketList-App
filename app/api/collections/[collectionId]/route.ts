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