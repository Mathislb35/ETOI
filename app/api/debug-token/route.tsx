import { getToken } from "next-auth/jwt";
import { headers, cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = cookies();
    const allCookies = cookieStore.getAll();

    const token = await getToken({
        req: {
            headers: Object.fromEntries(headers()),
            cookies: Object.fromEntries(
                allCookies.map(c => [c.name, c.value])
            ),
        } as any,
        secret: process.env.NEXTAUTH_SECRET,
    });

    return NextResponse.json({
        token,
        secret: process.env.NEXTAUTH_SECRET ? `défini (${process.env.NEXTAUTH_SECRET.length} chars)` : "MANQUANT",
        cookies: allCookies.map(c => c.name),
    });
}