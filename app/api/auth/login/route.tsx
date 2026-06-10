import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';
import { signToken } from '@/app/lib/jwt';

export async function POST(req: Request) {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const ok = await bcrypt.compare(password, user.password);

    if (!ok) {
        return NextResponse.json({ error: 'Wrong password' }, { status: 401 });
    }

    const token = signToken({
        userId: user.id,
        role: user.role,
    });

    const res = NextResponse.json({ success: true });

    res.cookies.set('token', token, {
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secure: false, // passe à true en prod
    });

    return res;
}