"use server";
import { orders } from "@/db/schema";
import db from "@/index";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Customer can place order
export async function POST(req: NextRequest) {
    const body = await req.json();
    const { userId, status, wash_level } = body;
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const id = session?.user?.id;

    if (!id) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized"
        }, { status: 400 });
    };

    try {
        await db.insert(orders).values({
            userId: userId,
            status: status,
            washLevel: wash_level,
        })

        return NextResponse.json({
            success: true
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
        }, { status: 200 })
    }
}

// Get customer order by authId
export async function GET() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const id = session?.user?.id;

    if (!id) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized"
        }, { status: 400 });
    };

    try {
        const order = await db.select()
            .from(orders)
            .where(eq(orders.userId, id))

        return NextResponse.json({ success: true, order: order });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}