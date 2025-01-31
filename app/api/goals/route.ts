import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

export async function GET() {
    try {
        const goals = await db.goal.findMany({
            orderBy: {
                createdAt: "desc"
            },
        });

        return NextResponse.json({
            data: goals, //null si erreur
            message: "Succesfully got the goals", // msg d'erreur si erreur
            success: true, // false si erreur 
        })

    } catch (error) {
        console.log("[goals]", error)
        return NextResponse.json({
            data: null,
            success: false,
            message: `goals: Internal Error:  ${error}`
        }, { status: 500 }
        )
    }
}

const createGoalSchema = z.object({
    label: z.string().nonempty({ message: "Label is required" }),
    description: z.string().optional(),
    isAccomplished: z.boolean(),
    priority: z.number({ message: "Priority must be completed" })
        .int({ message: "Priority must be an int" })
        .nonnegative({ message: "Priority must be positive" }),
    collectionId: z.string().nonempty({ message: "a Collection is required" }),
    categoryId: z.string().nonempty({ message: "a Category is required" }),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { 
            label, 
            description, 
            isAccomplished = false, 
            priority,
            collectionId,
            categoryId,
            userId = "123test"
        } = body;

        const goalData = { 
            label, 
            description, 
            isAccomplished, 
            priority,
            collectionId,
            categoryId,
            userId 
        };

        createGoalSchema.parse(goalData);

        const newGoal = await db.goal.create({
            data: {
                label: goalData.label,
                description: goalData.description,
                isAccomplished: goalData.isAccomplished,
                priority: goalData.priority,
                collectionId: goalData.collectionId,
                categoryId: goalData.categoryId,
            },
        });

        const category = await db.category.update({
            where: {
                id: newGoal.categoryId
            },
            data: {
                goals: {
                    connect: {
                        id: newGoal.id
                    }
                }
            }
        });
        
        const collection = await db.collection.update({
            where: {
                id: newGoal.collectionId
            },
            data: {
                goals: {
                    connect: {
                        id: newGoal.id
                    }
                }
            }
        });

        


        return NextResponse.json({
            success: true,
            message: "Created new goal",
            data: newGoal,
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