import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();

        const school = await prisma.school.findUnique({
            where: { userId: session.user.id }
        });

        if (!school) {
            return NextResponse.json({ error: "School not found" }, { status: 404 });
        }

        const intervenants = await prisma.intervenant.findMany({
            where: {
                expertise: form.theme
            }
        });

        const demande = await prisma.demande.create({
            data: {
                theme: body.theme,
                description: body.description,
                date: body.date,
                duration: body.duration,
                level: body.level,
                schoolId: school.id,
            }
        });

        return NextResponse.json(demande);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}