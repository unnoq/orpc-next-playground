"use server"

import { orpc } from "@/lib/orpc"

export async function getMe() {
    return await orpc.auth.me.call()
}