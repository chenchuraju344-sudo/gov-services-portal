'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function StatusContent() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('serviceId') || 'eshram';
  const title = searchParams.get('title') || 'Government Service Status';
  const label = searchParams.get('label') || 'Enter details';
  const placeholder = searchParams.get('placeholder') || 'Enter value...';

  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCheck = async (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/check-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceId, inputValue: inputVal }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Server error occurred');

      setResult(data);
    } catch (err) {
      setError(err.message || 'Unable to fetch status right now.');
    } finally {
      setLoading(false);
    }
  };

  const speakResultText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Voice assistant is not supported in your browser.');
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Hello! I checked my payment status for ${title}. Status: SUCCESS. Amount Credited: ${result.paymentAmount}.`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Top Ad Placeholder */}
      <div className="bg-slate-200 border border-dashed border-slate-400 rounded-lg p-3 text-center text-xs text-slate-500">
        ADVERTISEMENT SPACE (Top Banner Ad)
      </div>

      {/* Input Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 border-b pb-3">{title}</h2>
        <form onSubmit={handleCheck} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
            <input
              type="text"
              required
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={placeholder}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-800"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center gap-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                Fetching Live Data...
              </span>
            ) : (
              'Check Status Live'
            )}
          </button>
        </form>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      {/* Result Card */}
      {result && (
        <div className="bg-white rounded-2xl shadow-md border border-emerald-100 p-6 space-y-5">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl text-emerald-500">✅</span>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Payment Processed Successfully</h3>
                <p className="text-xs text-slate-500">Ref ID: {result.referenceId}</p>
              </div>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full">
              ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-50 p-3 rounded-lg">
              <p className="text-xs text-slate-500">Beneficiary Name</p>
              <p className="font-semibold text-slate-800">{result.beneficiaryName}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg">
              <p className="text-xs text-slate-500">Amount Released</p>
              <p className="font-semibold text-emerald-600">{result.paymentAmount}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg">
              <p className="text-xs text-slate-500">Credited Bank Account</p>
              <p className="font-semibold text-slate-800">{result.creditedBank}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg">
              <p className="text-xs text-slate-500">Credit Date</p>
              <p className="font-semibold text-slate-800">{result.transactionDate}</p>
            </div>
          </div>

          {/* Super Features Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() =>
                speakResultText(
                  `Payment of ${result.paymentAmount} has been successfully credited to ${result.creditedBank}.`
                )
              }
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2.5 px-4 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors"
            >
              🔊 Listen to Result
            </button>
            <button
              onClick={handleWhatsAppShare}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors"
            >
              📲 Share via WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* Bottom Ad Placeholder */}
      <div className="bg-slate-200 border border-dashed border-slate-400 rounded-lg p-3 text-center text-xs text-slate-500">
        ADVERTISEMENT SPACE (Bottom In-Feed Ad)
      </div>
    </div>
  );
}

export default function StatusPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading Service...</div>}>
      <StatusContent />
    </Suspense>
  );
              }
