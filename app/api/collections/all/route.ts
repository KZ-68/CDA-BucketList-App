import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { clerkClient } from '@clerk/nextjs/server';

export async function GET() {
    try {

        const collections = await db.collection.findMany({
            where: {
                isPrivate: false, // Filtrer les collections publiques
            },
            orderBy: {
                createdAt: "desc"
            },
            include: {
                goals: true
            }
        });


        const collectionWithUser = await Promise.all(
            collections.map(async (collection) => {
                try {

                    const clerk = await clerkClient();
                    const user = await clerk.users.getUser(collection.userId);

                    return {
                        ...collection,
                        user: {
                            id: user.id,
                            username: user.username,
                        }
                    };
                } catch (error) {
                    console.log(`Error when fetching the collection's user ${collection.id}:`, error);
                    return { ...collection, user: null };
                }
            })
        );
        console.log("collections all", collections)
        return NextResponse.json({
            data: collectionWithUser, //null si erreur
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