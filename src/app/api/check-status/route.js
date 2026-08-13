import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { serviceId, inputValue } = await request.json();

    if (!inputValue || inputValue.trim() === '') {
      return NextResponse.json({ error: 'Please provide a valid input value.' }, { status: 400 });
    }

    // Mask input value for privacy protection
    const maskedInput = inputValue.length > 4 
      ? 'XXXX-XXXX-' + inputValue.slice(-4) 
      : 'XXXX' + inputValue;

    // Simulate real backend processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Dynamic Mock Response Generator
    const mockData = {
      status: 'SUCCESS',
      referenceId: maskedInput,
      beneficiaryName: 'R. K. Sharma',
      paymentAmount: '$60.00 / ₹5,000',
      creditedBank: 'State Bank - XXXX4321',
      transactionDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      message: `The payment check for scheme [${serviceId.toUpperCase()}] was processed successfully.`
    };

    return NextResponse.json(mockData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve government server response.' }, { status: 500 });
  }
}
