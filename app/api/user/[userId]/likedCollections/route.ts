import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: Promise<{ userId: string }>;
};

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { userId } = await params;

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User ID is required.",
      });
    }

    const likedCollections = await db.like.findMany({
      where: {
        userId,
      },
    });

    console.log("liked collections", likedCollections);

    return NextResponse.json({
      data: likedCollections,
      message: "Successfully fetched user liked collections.",
      success: true,
    });
  } catch (error) {
    console.log("[likedCollections API error]", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching liked collections.",
      },
      { status: 500 }
    );
  }
}
