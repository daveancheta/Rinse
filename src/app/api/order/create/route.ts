import { orders } from "@/db/schema";
import db from "@/index";
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