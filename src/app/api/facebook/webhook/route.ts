import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    let body = req.json();


  return NextResponse.json({
    message: `\u{1F7EA} Received webhook:`,
  })
  } catch (error) {
    console.log(error)
  }
}