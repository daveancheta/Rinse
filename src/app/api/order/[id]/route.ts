import { orders } from "@/db/schema";
import db from "@/index";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const order = await db.select()
            .from(orders)
            .where(eq(orders.id, id));

        return NextResponse.json({
            success: true,
            order
        }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false
        }, { status: 400 });
    }
}