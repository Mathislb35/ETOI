import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET(req: NextRequest) {
    try {
        const count = await prisma.user.count();
        return NextResponse.json({ connected: true, userCount: count });
    } catch (e: any) {
        return NextResponse.json({ connected: false, error: e.message });
    }
}

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: "user not found" });
    const valid = await bcrypt.compare(password, user.password);
    return NextResponse.json({
        userFound: true,
        passwordValid: valid,
        userRole: user.role,
    });
}