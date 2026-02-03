import { orders } from "@/db/schema";
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