import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from '@clerk/nextjs/server'

export async function GET(request: NextRequest) {
    try {
        const { userId } = getAuth(request);
        console.log('userid', userId)

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