import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
    const body = await req.json();

    const {
        city,
        postalCode,
        managerName,
        managerRole,
        email,
        password,
    } = body;

    if (!email || !password) {
        return NextResponse.json(
            { error: 'Email et mot de passe requis' },
            { status: 400 }
        );
    }

    const existing = await prisma.user.findUnique({
        where: { email },
    });

    if (existing) {
        return NextResponse.json(
            { error: 'Un compte existe déjà avec cet email' },
            { status: 409 }
        );
    }

    const hashed = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashed,
            role: 'SCHOOL',
            school: {
                create: {
                    city,
                    postalCode,
                    managerName,
                    managerRole,
                },
            },
        },
    });

    return NextResponse.json({ id: user.id }, { status: 201 });
}