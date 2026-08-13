import './globals.css';

export const metadata = {
  title: 'Gov Direct Payment & Status Tracker',
  description: 'Check your government scheme payment and link status instantly.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900">
        {/* Header */}
        <header className="bg-blue-700 text-white shadow-md">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <a href="/" className="text-2xl font-bold tracking-wide flex items-center gap-2">
              <span>🏛️</span> Gov Tracker
            </a>
            <span className="bg-blue-800 text-xs px-3 py-1 rounded-full border border-blue-400">
              Fast & Secure
            </span>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="flex-grow max-w-6xl w-full mx-auto p-4 sm:p-6">
          {children}
        </main>

        {/* Footer & Legal Disclaimer */}
        <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 mt-12">
          <div className="max-w-6xl mx-auto px-4 text-center text-sm space-y-4">
            <p className="max-w-3xl mx-auto leading-relaxed">
              <strong>Disclaimer:</strong> This website is an independent informational portal and is 
              <strong> NOT affiliated with, authorized, or endorsed by any Government entity</strong> or official authority. 
              We retrieve public data directly from official government endpoints to assist users in checking status easily.
            </p>
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Gov Direct Tracker. All Rights Reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
