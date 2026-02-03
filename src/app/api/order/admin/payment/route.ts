import { orders } from "@/db/schema";
import db from "@/index";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// Admin can update payment status
export async function PATCH(req: NextRequest) {
    const { id, status } = await req.json()

    try {
        await db.update(orders)
            .set({ paymentStatus: status })
            .where(eq(orders.id, id))

        return NextResponse.json({ success: true })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false })
    }
}