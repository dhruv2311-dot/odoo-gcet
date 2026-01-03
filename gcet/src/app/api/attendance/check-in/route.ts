import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { attendance, users } from '@/lib/db/schema';
import { getAuthCookie, verifyToken } from '@/lib/auth';
import { eq, and } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const token = await getAuthCookie();
    
    if (!token) {
      return NextResponse.json(
        { error: 'No authentication token found' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const today = new Date().toISOString().split('T')[0];
    
    const [existingAttendance] = await db.select()
      .from(attendance)
      .where(and(
        eq(attendance.user_id, payload.userId),
        eq(attendance.date, today)
      ))
      .limit(1);

    if (existingAttendance && existingAttendance.check_in) {
      return NextResponse.json(
        { error: 'Already checked in today' },
        { status: 400 }
      );
    }

    const now = new Date();
    
    if (existingAttendance) {
      await db.update(attendance)
        .set({
          check_in: now,
          status: 'present',
          updated_at: now,
        })
        .where(eq(attendance.id, existingAttendance.id));
    } else {
      await db.insert(attendance).values({
        user_id: payload.userId,
        date: today,
        check_in: now,
        status: 'present',
      });
    }

    return NextResponse.json({
      message: 'Check-in successful',
      checkInTime: now,
    });

  } catch (error) {
    console.error('Check-in error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
