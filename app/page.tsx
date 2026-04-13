'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { propertyList } from '@/lib/properties';

const RATES = { USD: 1350 }; 

export default function PropertyTemplate() {
  const params = useParams();
  
  // 1. Get the ID and find the property FIRST
  const id = params?.id as string;
  const property = propertyList[id];

  // 2. SAFETY CHECK: If property is missing, stop here and show the error.
  // This prevents the code below from trying to read plots of "undefined"
  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 text-center">
        <div className="bg-white p-8 rounded-3xl shadow-xl">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Property Not Found</h1>
          <p className="text-gray-500 text-sm">We couldn't find a property for: "{id}"</p>
          <p className="text-xs text-gray-400 mt-4 italic text-center">Hint: Check if the name in your URL matches the name in lib/properties.ts exactly.</p>
        </div>
      </div>
    );
  }

  // 3. Now that we are 100% sure property exists, we can set the state
  const [selectedPlot, setSelectedPlot] = useState(property.plots[0]);

  // Calculation logic
  const deposit = selectedPlot.price * 0.5;
  const balance = selectedPlot.price - deposit;
  const monthly = balance / 6;

  const formatN = (num: number) => "₦" + num.toLocaleString();
  const formatU = (num: number) => "$" + Math.round(num / RATES.USD).toLocaleString();

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <div className="max-w-md mx-auto bg-white shadow-xl overflow-hidden rounded-b-3xl">
        
        {/* DYNAMIC HEADER IMAGE */}
        <div className="relative h-60 bg-gray-200">
          <img 
            src={property.image} 
            alt={property.title} 
            className="w-full h-full object-cover" 
          />
        </div>

        <div className="p-6">
          <h1 className={`text-2xl font-bold text-${property.color}-800`}>{property.title}</h1>
          <p className="text-gray-500 text-sm mb-6">{property.location}</p>

          {/* PLOT SELECTION LIST */}
          <div className="space-y-2 mb-8">
            <p className="text-xs font-bold text-gray-400 uppercase">Select Plot Size:</p>
            {property.plots.map((plot) => (
              <button
                key={plot.size}
                onClick={() => setSelectedPlot(plot)}
                className={`w-full flex justify-between p-3 rounded-xl border-2 transition-all ${
                  selectedPlot.size === plot.size 
                  ? `border-${property.color}-500 bg-${property.color}-50` 
                  : 'border-gray-100'
                }`}
              >
                <div className="text-left">
                  <span className="block font-bold text-gray-800">{plot.size}</span>
                  <span className="text-[10px] text-gray-500">{plot.type}</span>
                </div>
                <div className="text-right">
                  <span className="block font-bold text-gray-700">{formatN(plot.price)}</span>
                  <span className="text-[10px] text-gray-400">{formatU(plot.price)}</span>
                </div>
              </button>
            ))}
          </div>

          {/* 6-MONTH PAYMENT PLAN CARD */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-green-400 text-xs font-bold uppercase mb-4 italic">6-Month Spread Plan</h2>
            <div className="flex justify-between border-b border-slate-700 pb-2 mb-4">
              <span className="text-gray-400 text-sm">50% Deposit:</span>
              <span className="font-bold text-xl">{formatN(deposit)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Monthly (x6):</span>
              <span className="font-bold text-xl text-green-400">{formatN(monthly)}</span>
            </div>
          </div>

          {/* WHATSAPP BUTTON */}
          <button 
            onClick={() => window.open(`https://wa.me/2348105105757?text=I'm interested in ${property.title} - ${selectedPlot.size}`, '_blank')}
            className="w-full mt-6 bg-[#25D366] text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2"
          >
            Chat with Agent
          </button>
        </div>
      </div>
    </div>
  );
}