import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get('reference');

  if (!reference) {
    return NextResponse.json(
      { status: false, message: 'Transaction reference is required' },
      { status: 400 }
    );
  }

  // Simulated server-side Paystack verification handler
  // In live production, this makes a secure HTTPS request to:
  // https://api.paystack.co/transaction/verify/${reference} with PAYSTACK_SECRET_KEY
  return NextResponse.json({
    status: true,
    message: 'Verification successful',
    data: {
      id: 298410291,
      reference,
      amount: reference.includes('CLUB') ? 2500000 : 500000,
      currency: 'NGN',
      channel: 'card',
      status: 'success',
      paid_at: new Date().toISOString(),
      customer: {
        email: 'member@lgan.org.ng',
      },
    },
  });
}
