'use client';

import { useState } from 'react';

// Exchange rates adjusted to match your specific $53,999 request for the 70M NGN land
const RATES = {
  USD: 1296.32, // 70,000,000 / 53,999
  GBP: 1650.00, 
  EUR: 1420.00, 
};

// Resale Value range for dynamic scaling
const MIN_RESALE = 150000000; // Resale with basic finishes (30M build)
const MAX_RESALE = 350000000; // Resale with luxury finishes (150M build)
const MIN_BUILD_COST = 30000000;
const MAX_BUILD_COST = 150000000;

export default function Estimator() {
  const [buildCost, setBuildCost] = useState(50000000); // Default 50M NGN
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'EUR'>('USD');

  const landCost = 70000000;
  const facilitatorFee = landCost * 0.05; // 5% fee

  // Dynamic resale value calculation: scales linearly with build cost
  const projectedResale = MIN_RESALE + 
    ((buildCost - MIN_BUILD_COST) * (MAX_RESALE - MIN_RESALE) / (MAX_BUILD_COST - MIN_BUILD_COST));
  
  const totalProjectCost = landCost + buildCost + facilitatorFee;
  const projectedProfit = projectedResale - totalProjectCost;

  const getConverted = (ngnAmount: number) => {
    return (ngnAmount / RATES[currency]).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const getCurrencySymbol = () => {
    switch (currency) {
      case 'USD': return '$';
      case 'GBP': return '£';
      case 'EUR': return '€';
    }
  };

  const handleWhatsAppShare = () => {
    const phoneNumber = "2348105105757";
    // Now just a simple text
    const text = "I am interested in this property. Let's discuss!";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans pb-24">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header with Distress Sale Badge */}
        <div className="bg-red-700 p-6 text-white text-center rounded-b-3xl shadow-md relative">
          <div className="absolute top-4 right-4 bg-red-900 text-xs font-bold px-2 py-1 rounded animate-pulse">
            DISTRESS SALE
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-1 mt-2">Lokogoma Estate</h1>
          <p className="text-red-100 text-sm">Premium 500sqm Bungalow Plot</p>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Property Description */}
          <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-200 text-center italic">
            "Bungalow plot of 500sqm in a very developed, buildable, and livable estate for sale in Lokogoma. DM for more info."
          </div>

          {/* Currency Toggle */}
          <div className="flex justify-center bg-gray-100 p-1 rounded-full">
            {(['USD', 'GBP', 'EUR'] as const).map((cur) => (
              <button
                key={cur}
                onClick={() => setCurrency(cur)}
                className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all duration-200 ${
                  currency === cur
                    ? 'bg-white text-red-800 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {cur}
              </button>
            ))}
          </div>

          {/* Fixed Land Cost & Fees */}
          <div className="bg-red-50 rounded-2xl p-5 border border-red-100 relative">
            <p className="text-sm text-red-700 font-semibold uppercase tracking-wider mb-1">Land Price</p>
            <p className="text-3xl font-bold text-gray-800">₦70,000,000</p>
            <p className="text-sm text-red-600 font-medium mt-1">
              ≈ {getCurrencySymbol()}{getConverted(landCost)} {currency} 
              {currency === 'USD' && ' ($53,999)'}
            </p>
            <div className="mt-3 pt-3 border-t border-red-200">
              {/* Only show the text, remove explicit amount */}
              <span className="text-sm font-medium text-gray-800">Facilitator Fee (5%) applies:</span>
            </div>
          </div>

          {/* Adjustable Build Cost (Bill of Quantities) */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-end mb-2">
              <label className="text-sm text-gray-600 font-semibold uppercase tracking-wider">
                Bill of Quantities (Build Cost)
              </label>
            </div>
            <p className="text-xs text-gray-500 mb-4">Estimate building to standard with current premium materials.</p>
            
            <div className="text-2xl font-bold text-emerald-700 mb-2 text-center">
              ₦{buildCost.toLocaleString()}
            </div>
            
            <input
              type="range"
              min={MIN_BUILD_COST}
              max={MAX_BUILD_COST}
              step="1000000"
              value={buildCost}
              onChange={(e) => setBuildCost(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>Standard (₦30M)</span>
              <span>Luxury (₦150M)</span>
            </div>
          </div>

          {/* Investment ROI Section - Now Dynamic */}
          <div className="bg-gray-900 rounded-2xl p-5 text-white shadow-lg">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-4 text-center">Investment Potential</p>
            
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-300">Total Investment (Land + Fees + Build):</span>
              <span className="font-bold">₦{totalProjectCost.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-300">Est. Resale Value:</span>
              {/* This is now a dynamic value derived from the build cost */}
              <span className="font-bold text-emerald-400">₦{projectedResale.toLocaleString()}</span>
            </div>

            <hr className="border-gray-700 mb-4" />

            <div className="text-center">
              <p className="text-sm text-gray-300 mb-1">Projected Profit</p>
              <p className="text-3xl font-extrabold text-emerald-400">
                ₦{projectedProfit.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                ≈ {getCurrencySymbol()}{getConverted(projectedProfit)} {currency}
              </p>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleWhatsAppShare}
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            DM for more info
          </button>

        </div>
      </div>
    </div>
  );
}