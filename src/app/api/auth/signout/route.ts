"use server"
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        await auth.api.signOut({
            headers: await headers(),
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false }, { status: 400 });
    }
}