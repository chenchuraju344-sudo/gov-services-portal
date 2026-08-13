'use client';

import Link from 'next/link';

const services = [
  // CATEGORY A: DIRECT MONEY CHECK
  { id: 'eshram', title: 'E-Shram Card Benefit', cat: 'Direct Money', icon: '💳', inputLabel: 'Enter Mobile or Aadhaar Number', placeholder: 'e.g. 9876543210' },
  { id: 'pmkisan', title: 'PM Kisan Beneficiary', cat: 'Direct Money', icon: '🌾', inputLabel: 'Enter PM-Kisan Registration ID', placeholder: 'e.g. FARM12345678' },
  { id: 'rythu', title: 'Rythu Bharosa / Bandhu', cat: 'Direct Money', icon: '🚜', inputLabel: 'Enter Pattadar Passbook Number', placeholder: 'e.g. T123456789' },
  { id: 'pension', title: 'Aasara / Pension Status', cat: 'Direct Money', icon: '👵', inputLabel: 'Enter Pension ID or Aadhaar Number', placeholder: 'e.g. PEN88776655' },
  { id: 'gruhalakshmi', title: 'Gruha Lakshmi / Mahalakshmi', cat: 'Direct Money', icon: '🏠', inputLabel: 'Enter Scheme Application ID', placeholder: 'e.g. APP99001122' },
  { id: 'housing', title: 'PM Awas / Indiramma Housing', cat: 'Direct Money', icon: '🏗️', inputLabel: 'Enter Beneficiary ID', placeholder: 'e.g. HOU55443322' },

  // CATEGORY B: LINK & KYC STATUS
  { id: 'dbt', title: 'Aadhaar-Bank Link (DBT)', cat: 'Link & KYC Status', icon: '🏦', inputLabel: 'Enter Aadhaar Number', placeholder: 'Enter 12-digit Aadhaar' },
  { id: 'rationkyc', title: 'Ration Card eKYC', cat: 'Link & KYC Status', icon: '🍚', inputLabel: 'Enter Ration Card Number', placeholder: 'e.g. RAT123456789' },
  { id: 'panlink', title: 'PAN - Aadhaar Link Status', cat: 'Link & KYC Status', icon: '🪪', inputLabel: 'Enter PAN Card Number', placeholder: 'e.g. ABCDE1234F' },
  { id: 'aadhaarupdate', title: 'Aadhaar Update Status', cat: 'Link & KYC Status', icon: '📝', inputLabel: 'Enter Enrolment ID (EID)', placeholder: 'e.g. 1234/56789/01234' },
  { id: 'voter', title: 'Voter ID Application', cat: 'Link & KYC Status', icon: '🗳️', inputLabel: 'Enter Application or EPIC Number', placeholder: 'e.g. VOT9876543' },
  { id: 'rationdetails', title: 'Ration Card Member Details', cat: 'Link & KYC Status', icon: '👨‍👩‍👧‍👦', inputLabel: 'Enter Ration Card Number', placeholder: 'e.g. RAT123456789' },

  // CATEGORY C: SUPER FEATURES
  { id: 'pfmsoneclick', title: 'PFMS One-Click Payment Search', cat: 'Super Features', icon: '⚡', inputLabel: 'Enter Bank Account Number or Aadhaar', placeholder: 'Search all government payments...' },
  { id: 'voiceresult', title: 'Voice Result Assistance', cat: 'Super Features', icon: '🔊', inputLabel: 'Enter Reference / Registration ID', placeholder: 'Get status with audio response...' },
  { id: 'whatsappreminder', title: 'WhatsApp Status Alert & Share', cat: 'Super Features', icon: '📲', inputLabel: 'Enter Mobile Number & Beneficiary EID', placeholder: 'Receive alerts directly on WhatsApp...' }
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Banner Announcement */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-6 sm:p-8 shadow-lg text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Instant Government Scheme Payment Tracker
        </h1>
        <p className="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto">
          Check your DBT payments, pension status, and bank linking status directly in 10 seconds without captchas.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{item.icon}</span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  {item.cat}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">{item.title}</h3>
              <p className="text-xs text-slate-500 mb-4">{item.inputLabel}</p>
            </div>

            <Link
              href={{
                pathname: '/status',
                query: { serviceId: item.id, title: item.title, label: item.inputLabel, placeholder: item.placeholder }
              }}
              className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition-colors block"
            >
              Check Status Now →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
  }
