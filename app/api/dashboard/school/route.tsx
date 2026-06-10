import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!(session?.user as any)?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const school = await prisma.school.findUnique({
            where: {
                userId: (session!.user as any).id,
            },
        });

        if (!school) {
            return NextResponse.json(
                { error: "School not found" },
                { status: 404 }
            );
        }

        // (optionnel) ici tu branches tes vraies tables ensuite
        const intervenants = await prisma.intervenant.findMany();
        const demandes = [];

        return NextResponse.json({
            school,
            intervenants,
            demandes,
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}