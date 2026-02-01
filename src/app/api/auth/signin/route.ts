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
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                success: false,
                error: error
            },
            { status: 400 })
    }   
}