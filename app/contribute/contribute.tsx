"use client";

import { useState } from "react";
import { getAuth } from "firebase/auth";

interface ContributionData {
  translator_auth_id: string;
  language: string;
  english_sentence: string;
  translated_sentence: string;
  source: string;
}

export default function ContributeTranslation() {
  const [english, setEnglish] = useState("");
  const [kalenjin, setKalenjin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = async () => {
    if (!english.trim() || !kalenjin.trim()) {
      setError("Both English and Kalenjin fields are required");
      return;
    }
    
    setLoading(true);
    setError("");
    setSuccess(false);
    
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      
      if (!user) {
        throw new Error("User not authenticated");
      }
      
      const contributionData: ContributionData = {
        translator_auth_id: user.uid,
        language: "Kalenjin",
        english_sentence: english,
        translated_sentence: kalenjin,
        source: "original" // Set source to 'contribution'
      };
      
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contributions`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contributionData),
        }
      );
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Failed to submit contribution");
      }
      
      setSuccess(true);
      setEnglish("");
      setKalenjin("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Contribution submission failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" mx-auto p-4">
      <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-400 dark:border-neutral-700 overflow-hidden">
        <div className="p-4 border-b border-neutral-400 dark:border-neutral-700">
          <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">
            Contribute Translation
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Add a new English to Kalenjin translation pair
          </p>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-2">
              English Sentence
            </label>
            <textarea
              className="w-full p-3 border border-neutral-400 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 rounded-md focus:ring-green-500 focus:border-green-500"
              rows={3}
              value={english}
              onChange={(e) => setEnglish(e.target.value)}
              placeholder="Enter English sentence..."
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-2">
              Kalenjin Translation
            </label>
            <textarea
              className="w-full p-3 border border-neutral-400 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 rounded-md focus:ring-green-500 focus:border-green-500"
              rows={3}
              value={kalenjin}
              onChange={(e) => setKalenjin(e.target.value)}
              placeholder="Enter Kalenjin translation..."
              disabled={loading}
            />
          </div>
          
          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-md">
              {error}
            </div>
          )}
          
          {success && (
            <div className="p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 rounded-md">
              Contribution submitted successfully!
              <p>Try another</p>
            </div>
          )}
          
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={loading || !english.trim() || !kalenjin.trim()}
              className={`px-4 py-2 rounded-md text-white flex items-center ${
                loading || !english.trim() || !kalenjin.trim()
                  ? "bg-green-500 dark:bg-green-400"
                  : "bg-green-500 hover:bg-green-600 dark:hover:bg-green-700"
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit Contribution"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}