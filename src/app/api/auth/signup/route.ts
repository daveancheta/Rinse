"use server";
import db from "@/index";
import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { email, password, name } = body;

    try {
        if (!email || !password || !name) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 })
        }

        const user = await db.query.user.findFirst(email)
        if (user) {
            return NextResponse.json({ message: "Email already exist" }, { status: 400 })
        }
        
        await auth.api.signUpEmail({
            body: {
                email: email,
                password: password,
                name: name,
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