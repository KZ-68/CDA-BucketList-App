import { clerkClient } from "@clerk/nextjs/server"

const FetchUsernameService = async (userId: string) => {
    const data = await (await clerkClient()).users.getUser(userId)
    return data;
}

export default FetchUsernameService