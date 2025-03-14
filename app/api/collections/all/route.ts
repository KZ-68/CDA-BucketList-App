import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { clerkClient } from '@clerk/nextjs/server';
import { getAuth } from "@clerk/nextjs/server";


export async function GET(req: NextRequest) {

    try {

        const auth = getAuth(req);
        console.log("Auth data:", auth);

        const { userId } = auth;

        if (!userId) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        console.log("Utilisateur connecté avec ID:", userId);

        const collections = await db.collection.findMany({
            where: {
                isPrivate: false, // Filtrer les collections 
                userId: { not: userId }
            },
            orderBy: {
                createdAt: "desc"
            },
            include: {
                goals : true,
                likes : true,
                _count: {
                  select: { likes: true }
              },
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
        console.log("collections all", collections )
        return NextResponse.json({
            data: collectionWithUser, //null si erreur
            message: "Succesfully got all users the collections ", // msg d'erreur si erreur
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

export async function POST(req: NextRequest) {
    try {
        const { userId, collectionId } = await req.json();

        const existingLike = await db.like.findUnique({
            where: {
                userId_collectionId: {
                    userId,
                    collectionId
                }
            }
        });

        if (existingLike) {
            await db.like.delete({
                where: {
                    userId_collectionId: {
                        userId,
                        collectionId
                    }
                }
            });

            return NextResponse.json({
                success: true,
                message: "Like removed successfully!"
            });
        }

        await db.like.create({
            data: {
                userId,
                collectionId,
            }
        });

        return NextResponse.json({
            success: true,
            message: "Like added successfully!"
        });

    } catch (error) {
        console.log("[Error handling like]", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while handling the like."
        }, { status: 500 });
    }
}
