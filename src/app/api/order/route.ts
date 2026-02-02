import { orders } from "@/db/schema";
import db from "@/index";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { userId, status } = body;
    try {
        await db.insert(orders).values({
            userId: userId,
            status: status
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

export async function GET() {
    try {
        const order = await db.select()
            .from(orders)
            
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