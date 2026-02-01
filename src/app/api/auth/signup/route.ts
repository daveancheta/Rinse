"use server";
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server";

export async function POST() {
    try {
        await auth.api.signUpEmail({
            body: {
                email: "user@email.com",
                password: "password",
                name: "Dave Ancheta",
            }
        })

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { success: false,
                error: error
            }, 
            { status: 400 })
    }
}