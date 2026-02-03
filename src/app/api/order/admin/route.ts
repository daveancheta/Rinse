"use server";

import { orders, user } from "@/db/schema";
import db from "@/index";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// Admin can delete order
export async function DELETE(req: NextRequest) {
    const { id } = await req.json();

    try {
        await db.delete(orders).where(eq(orders.id, id))
        return NextResponse.json({
            success: true
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false
        }, { status: 400 })
    }
}

// Admin can view all orders
export async function GET() {
    try {
        const order = await db.select()
            .from(orders)
            .innerJoin(user, eq(orders.userId, user.id))
            .orderBy(desc(orders.createdAt))

        return NextResponse.json({
            success: true,
            order
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false
        }, { status: 400 })
    }
}