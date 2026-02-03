"use server";

import { orders, user } from "@/db/schema";
import db from "@/index";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// Admin can update order status
export async function PATCH(req: NextRequest) {
    const body = await req.json();
    const { id, status } = body;

    try {
        await db.update(orders)
            .set({ status: status })
            .where(eq(orders.id, id))

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

// Admin can delete order
export async function DELETE(req: NextRequest) {
    const body = await req.json();
    const { id } = body;

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