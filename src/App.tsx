import React, { useState } from 'react';
import phoneImage from '../phone.png';

function App() {
  const [showAndroidModal, setShowAndroidModal] = useState(false);

  const handleAndroidClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowAndroidModal(true);
  };

  const closeAndroidModal = () => {
    setShowAndroidModal(false);
  };

  return (
    <div className="min-h-screen w-full bg-white text-black flex items-center">
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10">
        <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-14 items-stretch">
          {/* Left: 2/3 width content card */}
          <div className="md:col-span-2">
            <div className="h-full min-h-[400px] sm:min-h-[520px] rounded-2xl sm:rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src="/fezer-logo.png" 
                    alt="Fezer Logo" 
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
                  />
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight">Fezer</h1>
                </div>
                <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl text-neutral-600 max-w-2xl leading-relaxed">
                  Field operations OS for construction. Time, tasks, tools, supplies,
                  teams, and reports—in one fast app.
                </p>
              </div>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 self-end w-full sm:w-auto">
                <a
                  href="https://testflight.apple.com/join/kvGPdcqB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-black text-white px-6 py-3 sm:px-5 sm:py-2.5 text-base sm:text-sm font-medium hover:opacity-90 transition-opacity min-h-[48px] sm:min-h-0"
                >
                  Download for iOS
                </a>
                <button
                  onClick={handleAndroidClick}
                  className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white text-black px-6 py-3 sm:px-5 sm:py-2.5 text-base sm:text-sm font-medium hover:bg-black/5 transition-colors min-h-[48px] sm:min-h-0"
                >
                  Download for Android
                </button>
              </div>
            </div>
          </div>

          {/* Right: 1/3 width phone + downloads, match height */}
          <div className="md:col-span-1">
            <div className="h-full min-h-[300px] sm:min-h-[400px] md:min-h-[520px] flex items-center justify-center">
              <img
                src={phoneImage}
                alt="Fezer app on phone"
                className="w-[250px] sm:w-[280px] md:w-[300px] lg:w-[340px] h-auto rounded-[2rem] sm:rounded-[2.5rem] border border-neutral-200"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Android Coming Soon Modal */}
      {showAndroidModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center animate-mobile-modal-in">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Android Coming Soon</h2>
              <p className="text-gray-600 leading-relaxed">
                We're working hard to bring Fezer to Android devices. 
                Stay tuned for updates and be among the first to know when it's ready!
              </p>
            </div>
            <button
              onClick={closeAndroidModal}
              className="w-full bg-black text-white py-3 px-6 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;