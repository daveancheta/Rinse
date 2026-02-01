"use server";
import { user } from "@/db/schema";
import db from "@/index";
import { auth } from "@/lib/auth"
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { email, password, name } = body;

    try {
        if (!email || !password || !name) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 })
        }

        if (password.length < 8) {
            return NextResponse.json({ message: "Password must be at least 8 characters long" }, { status: 400 })
        }

        const existingUser = await db
            .select({ id: user.id })
            .from(user)
            .where(eq(user.email, email))
            .limit(1);

        if (existingUser.length) {
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