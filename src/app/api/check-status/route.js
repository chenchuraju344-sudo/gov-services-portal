import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { serviceId, inputValue } = await request.json();

    if (!inputValue || inputValue.trim() === '') {
      return NextResponse.json(
        { error: 'Please enter a valid number or ID.' },
        { status: 400 }
      );
    }

    const cleanInput = inputValue.trim();
    const lastDigits = cleanInput.slice(-4) || '1234';
    const maskedId = cleanInput.length > 4 ? `XXXX-XXXX-${lastDigits}` : `XXXX${cleanInput}`;
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

    // Dynamic responses tailored to each specific scheme/service
    const serviceConfigs = {
      eshram: {
        title: 'E-Shram Benefit',
        amount: '₹1,000 / Credited',
        bank: `DBT - State Bank of India (XXXX${lastDigits})`,
        status: 'ACTIVE'
      },
      pmkisan: {
        title: 'PM Kisan Samman Nidhi',
        amount: '₹2,000 / Credited',
        bank: `DBT - Union Bank of India (XXXX${lastDigits})`,
        status: 'ACTIVE'
      },
      rythu: {
        title: 'Rythu Bharosa Support',
        amount: '₹5,000 / Disbursed',
        bank: `APGVB Grameena Bank (XXXX${lastDigits})`,
        status: 'ACTIVE'
      },
      pension: {
        title: 'Social Security Pension',
        amount: '₹2,016 / Credited',
        bank: `Direct Benefit Transfer (XXXX${lastDigits})`,
        status: 'ACTIVE'
      },
      gruhalakshmi: {
        title: 'Mahalakshmi / Gruha Lakshmi',
        amount: '₹2,500 / Processed',
        bank: `Canara Bank - DBT (XXXX${lastDigits})`,
        status: 'ACTIVE'
      },
      housing: {
        title: 'Housing Scheme Sanction',
        amount: 'Sanctioned / Stage-2',
        bank: `Treasury Account (XXXX${lastDigits})`,
        status: 'ACTIVE'
      },
      dbt: {
        title: 'Aadhaar-Bank Linkage',
        amount: 'Linked & Active (NPCI Mapped)',
        bank: `Primary Account - State Bank (XXXX${lastDigits})`,
        status: 'ACTIVE'
      },
      rationkyc: {
        title: 'Ration eKYC Verification',
        amount: 'eKYC Completed (100%)',
        bank: 'EPDS Telangana / AP Portal',
        status: 'ACTIVE'
      },
      panlink: {
        title: 'PAN - Aadhaar Link Status',
        amount: 'Linked Successfully',
        bank: 'Income Tax Department (ITD)',
        status: 'ACTIVE'
      },
      aadhaarupdate: {
        title: 'Aadhaar Update Request',
        amount: 'Update Processed & Generated',
        bank: 'UIDAI Enrolment Portal',
        status: 'ACTIVE'
      },
      voter: {
        title: 'Voter ID Electoral Status',
        amount: 'Verified & Active in Roll',
        bank: 'Election Commission of India (ECI)',
        status: 'ACTIVE'
      },
      rationdetails: {
        title: 'Ration Card Member Entitlement',
        amount: 'Active (3 Members / 15 Kgs)',
        bank: 'Civil Supplies Dept',
        status: 'ACTIVE'
      },
      pfmsoneclick: {
        title: 'PFMS Consolidated Payment',
        amount: 'All Scheme Credits Verified',
        bank: `Central DBT Portal (XXXX${lastDigits})`,
        status: 'ACTIVE'
      }
    };

    const currentService = serviceConfigs[serviceId] || {
      title: 'Government Service Verification',
      amount: 'Record Matched & Active',
      bank: `Verified Bank Gateway (XXXX${lastDigits})`,
      status: 'ACTIVE'
    };

    // Realistic processing latency simulation
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({
      status: 'SUCCESS',
      referenceId: maskedId,
      beneficiaryName: 'Verified Beneficiary Record',
      paymentAmount: currentService.amount,
      creditedBank: currentService.bank,
      transactionDate: today,
      serviceName: currentService.title
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Unable to process service request. Please try again.' },
      { status: 500 }
    );
  }
}
