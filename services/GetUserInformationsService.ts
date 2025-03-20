"use server"
import { clerkClient } from "@clerk/nextjs/server";

const GetUserInformationService = async (userId:string) => {
    const clerk = await clerkClient(); 
    const user = await clerk.users.getUser(userId);
    return user.username;
}

export default GetUserInformationService