import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get("next-auth.session-token")?.value;

    const token = await getToken({
        req: {
            cookies: { "next-auth.session-token": sessionToken ?? "" },
            headers: {},
        } as any,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) return NextResponse.json({ authenticated: false }, { status: 401 });

    return NextResponse.json({ authenticated: true, role: token.role });
}