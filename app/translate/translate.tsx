"use client";

import { useState } from "react";
import Navbar from "../components/navbar";
import { API_CONFIG } from "../config";

interface TranslationResponse {
  translated_text: string;
}

export default function Translate() {
  const [input, setInput] = useState("");
  const [translation, setTranslation] = useState("");
  const [flagMode, setFlagMode] = useState(false);
  const [corrected, setCorrected] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [swapLanguages, setSwapLanguages] = useState(false);

  const handleTranslate = async () => {
    if (!input.trim()) {
      setError("Please enter text to translate");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Translation failed");
      }

      const data = await res.json();
      setTranslation(data.translated_text);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Translation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleFlag = async () => {
    await fetch("http://localhost:8000/flag", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        original_text: input,
        generated: translation,
        correct_translation: corrected,
        user_id: "placeholder-user-id",
      }),
    });
    alert("Flag submitted");
    setFlagMode(false);
  };

  return (
    <div className="dark">
      <div className="max-w-5xl mx-auto p-4 text-neutral-800 dark:text-neutral-100">
        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-400 dark:border-neutral-700 overflow-hidden">
          <div className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-400 dark:border-neutral-700">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-neutral-700 dark:text-neutral-200">English</span>
              <button 
                onClick={() => setSwapLanguages(!swapLanguages)}
                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-500 dark:text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </button>
              <span className="font-medium text-neutral-700 dark:text-neutral-200">Kalenjin</span>
            </div>
            <button className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-500 dark:text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-neutral-400 dark:divide-neutral-700">
            <div className="p-4">
              <div className="relative h-full">
                <textarea
                  className="w-full h-64 p-3 text-neutral-800 dark:text-neutral-100 dark:bg-neutral-900 resize-none focus:outline-none"
                  placeholder="Enter text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                {input && (
                  <button
                    onClick={() => setInput("")}
                    className="absolute top-3 right-3 p-1 text-neutral-400 dark:text-neutral-300 hover:text-neutral-600 dark:hover:text-white rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="p-4 bg-neutral-50 dark:bg-neutral-800">
              <div className="relative h-64">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                  </div>
                ) : translation ? (
                  <>
                    <div className="h-full overflow-y-auto">
                      <p className="text-neutral-800 dark:text-neutral-100">{translation}</p>
                    </div>
                    <div className="absolute bottom-3 right-3 flex space-x-2">
                      <button className="p-2 text-neutral-500 dark:text-neutral-300 hover:text-green-500 dark:hover:text-green-400 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => setFlagMode(true)}
                        className="p-2 text-neutral-500 dark:text-neutral-300 hover:text-red-500 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                        </svg>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-neutral-400 dark:text-neutral-500">Translation will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-neutral-400 dark:border-neutral-700 flex justify-center">
            <button
              onClick={handleTranslate}
              disabled={loading || !input.trim()}
              className={`px-6 py-2 rounded-full text-white shadow-md transition-colors flex items-center
                ${loading ? 'bg-green-700 dark:bg-green-500' : (!input.trim() ? 'bg-green-700 dark:bg-green-400' : 'bg-green-500 hover:bg-green-600 dark:hover:bg-green-700')}`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Translating...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  Translate
                </>
              )}
            </button>
          </div>
        </div>

        {flagMode && (
          <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-80 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">Report Translation</h3>
                <button 
                  onClick={() => setFlagMode(false)}
                  className="text-neutral-400 dark:text-neutral-300 hover:text-neutral-500 dark:hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">Original Text:</p>
                  <p className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded text-neutral-700 dark:text-neutral-200">{input}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">Current Translation:</p>
                  <p className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded text-neutral-700 dark:text-neutral-200">{translation}</p>
                </div>
                <div>
                  <label htmlFor="corrected" className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-1">
                    Correct Translation
                  </label>
                  <textarea
                    id="corrected"
                    className="w-full p-3 border border-neutral-400 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 rounded-md focus:ring-green-500 focus:border-green-500"
                    rows={3}
                    value={corrected}
                    onChange={(e) => setCorrected(e.target.value)}
                    placeholder="Enter the correct translation..."
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setFlagMode(false)}
                  className="px-4 py-2 border border-neutral-400 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFlag}
                  disabled={!corrected.trim()}
                  className={`px-4 py-2 rounded-md text-white ${!corrected.trim() ? 'bg-green-300 dark:bg-green-400' : 'bg-green-500 hover:bg-green-600 dark:hover:bg-green-700'}`}
                >
                  Submit Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
