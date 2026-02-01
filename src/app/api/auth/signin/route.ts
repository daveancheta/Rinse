"use server";
import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { email, password } = body;

    try {
        await auth.api.signInEmail({
            body: {
                email: email,
                password: password,
            }
        })

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error: any) {
        console.log(error)
        const message =
            error?.message?.toLowerCase().includes("invalid") ||
                error?.message?.toLowerCase().includes("credentials")
                ? "We couldn’t verify your credentials. Please check your email and password."
                : "Unable to sign in";

        return NextResponse.json(
            {
                success: false,
                message: message
            },
            { status: 400 })
    }
}