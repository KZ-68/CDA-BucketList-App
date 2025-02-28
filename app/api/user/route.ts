import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

// Define a GET function that handles incoming requests
export async function GET() {
    try {
        // Fetch users from Clerk
        const users = await (await clerkClient()).users.getUserList();
        return NextResponse.json(users);

    } catch (error) {
        // Log any errors that occur during the execution
        console.log("[USERS]", error);

        // Return an internal server error response
        return new NextResponse(`Internal Error ${error}`, { status: 500 });
    }
}