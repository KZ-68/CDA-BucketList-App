import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

export async function GET() {
    try {
        const collections = await db.collection.findMany({
            orderBy: { 
                createdAt: "desc" 
            },
        });

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
    userId: z.string().nonempty({ message: "a User is required" }),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log("Request :", body)
        const { label, isPrivate, userId} = body;

        const collectionData = { label, isPrivate, userId };
        console.log("Collection Data :", body)

        createCollectionSchema.parse(collectionData);

        const newCollection = await db.collection.create({
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
        console.log("[CREATE COLLECTION]", error);
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