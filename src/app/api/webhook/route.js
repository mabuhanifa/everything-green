// app/api/webhook/route.js
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

const validateSignature = (req) => {
  const signature = req.headers.get("x-signature");
  const expectedSignature =
    "c58341e3906304975b508b6ae770ee4db549abe550e47b547248db12d06ccce4";
  return signature === expectedSignature;
};

export async function POST(req) {
  try {
    if (!validateSignature(req)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { eventType, data } = body;

    if (!eventType || !data) {
      return NextResponse.json(
        { success: false, message: "Bad Request" },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "db.json");

    let existingData = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      existingData = JSON.parse(fileContent);
    }

    existingData.push({ eventType, data, timestamp: new Date().toISOString() });

    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    return NextResponse.json(
      { success: true, message: "Received" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, message: "Method Not Allowed" },
    { status: 405 }
  );
}
