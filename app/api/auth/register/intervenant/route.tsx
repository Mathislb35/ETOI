import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
    const { firstname, lastname, email, expertise, linkedin, password } =
        await req.json();

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
        return NextResponse.json(
            { error: 'Email déjà utilisé' },
            { status: 409 }
        );

    const hashed = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashed,
            role: 'INTERVENANT',
            intervenant: {
                create: { firstname, lastname, expertise, linkedin },
            },
        },
    });

    return NextResponse.json({ id: user.id }, { status: 201 });
}