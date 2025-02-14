import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Props = {
    params: Promise<{ userId: string }>
}

export async function GET(request: NextRequest, { params }: Props) {
    try {
        const { userId } = await params;


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

        const totalAccomplishedGoals = await db.goal.count({
            where: {
                collection: {
                    userId: userId
                },
                isAccomplished: true
            }
        });


        // calcul du nb de collections
        const totalCollections = collections.length || 0;

        // calcul du total des goals (somme de tous les `_count.goals`)
        const totalGoals = collections.reduce((sum, collection) => sum + (collection._count?.goals || 0), 0);

        // return NextResponse.json(cards);
        return NextResponse.json({
            data: collections, 
            totalCollections,
            totalGoals,
            totalAccomplishedGoals,
            message: "Succesfully send the collections", 
            success: true, 
        })
        
    } catch (error) {
        console.log("[MY_COLLECTIONS]", error)
        return NextResponse.json({ error: "Internal Error" }, { status: 500 })
    }
}
