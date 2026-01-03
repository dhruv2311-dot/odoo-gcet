import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { payrolls } from '@/lib/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userPayrolls = await db
      .select({
        id: payrolls.id,
        payPeriodStart: payrolls.pay_period_start,
        payPeriodEnd: payrolls.pay_period_end,
        grossSalary: payrolls.gross_salary,
        totalDeductions: payrolls.total_deductions,
        netSalary: payrolls.net_salary,
        payableDays: payrolls.payable_days,
        payslipUrl: payrolls.payslip_url,
        createdAt: payrolls.created_at,
      })
      .from(payrolls)
      .where(eq(payrolls.user_id, session.user.id))
      .orderBy(desc(payrolls.pay_period_start));

    return NextResponse.json(userPayrolls);
  } catch (error) {
    console.error('Error fetching payroll data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
