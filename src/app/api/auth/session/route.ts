"use server";
import { user } from "@/db/schema";
import db from "@/index";
import { auth } from "@/lib/auth"
import { eq } from "drizzle-orm";
import { headers } from "next/headers"
import { NextResponse } from "next/server";

export async function GET() {
    const res = await auth.api.getSession({
        headers: await headers()
    });

    const id = res?.user?.id;

    if (!id) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized"
        }, { status: 400 });
    };

    const session = await db.query.user.findFirst({
        where: (eq(user.id, res?.user?.id))
    });

    return NextResponse.json({ session })
};