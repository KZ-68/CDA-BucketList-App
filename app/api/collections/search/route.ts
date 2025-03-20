import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from '@clerk/nextjs/server';
import { getAuth } from "@clerk/nextjs/server";


export async function GET(req: NextRequest) {
    try {
        const auth = getAuth(req);
        const { userId } = auth;

        if (!userId) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const searchParams = req.nextUrl.searchParams;
        const searchQuery = searchParams.get('search');

        if (!searchQuery || searchQuery.trim() === '') {
            return NextResponse.json({
                data: [],
                message: "No search query provided",
                success: true
            });
        }

        const collections = await db.collection.findMany({
            where: {
                label: {
                    contains: searchQuery,
                    mode: 'insensitive'
                },
                isPrivate: false,
            },
            select: {
                id: true,
                label: true,
            },
            orderBy: {
                label: "asc"
            },
            take: 10
        });

        return NextResponse.json({
            data: collections, //null si erreur
            message: "Succesfully the collections ", // msg d'erreur si erreur
            success: true, // false si erreur 
        })

    } catch (error) {
        console.log("[collections]", error)
        return NextResponse.json({
            data: null,
            success: false,
            message: `collections: Internal Error:  ${error}`
        }, { status: 500 })
    }
}
