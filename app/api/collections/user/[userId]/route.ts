import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Props = {
    params: Promise<{ userId: string }>
}

export async function GET(request: NextRequest, { params }: Props) {
    try {
        const { userId } = await params;
        console.log('userid', userId)
        console.log('param', params)

        if (!userId) {
            return NextResponse.json(
                { error: "User ID is required" }, 
                { status: 400 }
            );
        }
        const collections = await db.collection.findMany({  
            where : {
                userId: userId
            },
            orderBy: {
                createdAt: 'desc'   
            },
            include: {
                _count: {
                    select: { goals: true }
                }
            }
        });
        // return NextResponse.json(cards);
        return NextResponse.json({
            data: collections, 
            message: "Succesfully send the collections", 
            success: true, 
        })
        
    } catch (error) {
        console.log("[MY_COLLECTIONS]", error)
        return NextResponse.json({ error: "Internal Error" }, { status: 500 })
    }
}
