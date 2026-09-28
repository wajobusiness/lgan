import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    // Verify webhook event type
    if (payload.event === 'charge.success') {
      const data = payload.data;
      console.log(`[LGAN Paystack Webhook] Charge Success for Ref: ${data.reference}`);

      // In production, update database payment record to SUCCESS and activate member/club
      return NextResponse.json({ received: true, status: 'processed' }, { status: 200 });
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error('[LGAN Paystack Webhook Error]', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
