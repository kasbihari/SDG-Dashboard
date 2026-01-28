import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('token');
    if (!tokenCookie) {
      return NextResponse.json({ error: 'Niet geauthenticeerd' }, { status: 401 });
    }

    const token = tokenCookie.value;
    const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret_change_me';

    let payload: any;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: 'Ongeldige token' }, { status: 401 });
    }

    if (!payload || typeof payload !== 'object' || !payload.id) {
      return NextResponse.json({ error: 'Ongeldige token-payload' }, { status: 401 });
    }

    // Delete user
    await prisma.user.delete({ where: { id: payload.id } });

    // Clear token cookie by expiring it
    const res = NextResponse.json({ message: 'Account verwijderd' });
    res.headers.set('Set-Cookie', 'token=; Path=/; Max-Age=0; HttpOnly');
    return res;
  } catch (err) {
    console.error('Error in /api/account/delete:', err);
    return NextResponse.json({ error: 'Interne serverfout' }, { status: 500 });
  }
}
