"use server";
import { orders, user } from "@/db/schema";
import db from "@/index";
import { auth } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Customer can place order
export async function POST(req: NextRequest) {
    const body = await req.json();
    const { userAddress, washLevel, } = body;
    const session = await auth.api.getSession({
        headers: await headers()
    });

    try {
        if (!washLevel || !userAddress) {
            return NextResponse.json({
                success: false,
                message: "All fields are required."
            }, { status: 400 })
        }
        const id = session?.user?.id;

        if (!id) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized"
            }, { status: 400 });
        };

        const address = await db.query.user.findFirst({
            where: (eq(user.id, session?.user?.id)),
            columns: {
                id: true,
                address: true
            }
        });

        if (!address?.address) {
            return NextResponse.json({
                success: false,
                message: "Please set an address before submitting your laundry for pickup."
            }, { status: 400 }
            )
        }

        await db.insert(orders).values({
            userId: id,
            status: "pickup",
            washLevel: washLevel,
            address: userAddress
        })

        return NextResponse.json({
            success: true,
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
            .innerJoin(user, eq(orders.userId, user.id))
            .orderBy(desc(orders.createdAt))

        return NextResponse.json({
            success: true,
            order
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}