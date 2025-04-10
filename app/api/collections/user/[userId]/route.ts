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
                    select: { 
                        goals: true,
                    },
                },
                goals:true
            }
        });

        const categoriesWithGoalsStats = await db.category.findMany({
            where: {
                goals: {
                    some: {
                        collection: {
                            userId: userId
                        }
                    }
                }
            },
            include: {
                _count: {
                    select: {
                        goals: true,
                    }
                },
                goals: {
                    where: { isAccomplished: true },
                    select: { id: true },
                }
            }
        });

        const lastGoalAccomplished = await db.goal.findMany({
            where: {
                collection: {
                    userId: userId
                },
                isAccomplished:true
            }
        })

        const totalAccomplishedGoals = await db.goal.count({
            where: {
                collection: {
                    userId: userId
                },
                isAccomplished: true
            }
        });

        const notAccomplished = await db.goal.count({
            where: {
                collection: {
                    userId: userId
                },
                isAccomplished: false,
            },
        })

        const skip = Math.floor((notAccomplished) * Math.random());

        const goalSuggestion = await db.goal.findMany({
            where: {
                collection: {
                    userId: userId
                },
                isAccomplished: false,
            },
            "take": 1,
            "skip": skip
        })

        const collectionsNotStarted = await db.collection.count({  
            where : {
                userId: userId,
                goals: {
                    every: {
                        isAccomplished:false
                    }
                }
            }
        });

        const collectionsCompleted = await db.collection.count({  
            where : {
                userId: userId,
                goals: {
                    every: {
                        isAccomplished:true
                    }
                }
            }
        });

        const collectionsInProgress = await db.collection.count({
            where: {
                userId: userId,
                goals: {
                    some: {
                        isAccomplished:true
                    }
                }
            }
        })

        const totalCollections = collections.length || 0;

        const totalGoals = collections.reduce((sum, collection) => sum + (collection._count?.goals || 0), 0);

        const categoriesStats = categoriesWithGoalsStats.map(category => ({
            categoryId: category.id,
            categoryName: category.label,
            goalsCompleted: category.goals.length,
            totalGoals: category._count.goals,
            progress: (category.goals.length * 100 / category._count.goals).toFixed(0)
        }));

        const goalsGlobalProgression = totalGoals - totalAccomplishedGoals;

        const collectionsWithAccomplishedGoals = collections.map(collection => {
            const accomplishedGoals = collection.goals.filter(goal => goal.isAccomplished).length;
            return {
                ...collection,
                accomplishedGoals
            }
        });

        return NextResponse.json({
            data: collectionsWithAccomplishedGoals, 
            totalCollections,
            totalGoals,
            totalAccomplishedGoals,
            lastGoalAccomplished,
            goalsGlobalProgression,
            goalSuggestion,
            collectionsNotStarted,
            collectionsCompleted,
            collectionsInProgress,
            categoriesStats,
            message: "Succesfully send the collections", 
            success: true, 
        })
        
    } catch (error) {
        console.log("[MY_COLLECTIONS]", error)
        return NextResponse.json({ error: "Internal Error" }, { status: 500 })
    }
}
