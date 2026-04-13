'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { propertyList } from '@/lib/properties';

const RATES = {
  USD: 1350.00,
  GBP: 1710.00,
  EUR: 1460.00,
};

export default function PropertyPage() {
  const params = useParams();
  const id = params.id as string;
  const property = propertyList[id];

  const [buildCost, setBuildCost] = useState(50000000);
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'EUR'>('USD');

  // SAFETY CHECK: Move this above any useState that uses 'property'
  if (!property) {
    return <div className="min-h-screen flex items-center justify-center font-bold">Property not found</div>;
  }

  // Now we can safely use property.plots[0]
  const [selectedPlot, setSelectedPlot] = useState(property.plots[0]);

  // --- DYNAMIC CALCULATIONS ---
  const landPrice = selectedPlot.price;
  const facilitatorFee = landPrice * 0.05;
  const totalInvestment = landPrice + facilitatorFee + buildCost;
  
  // Logic: ₦85M base equity + (Build Cost * 1.5)
  const estResaleValue = (buildCost * 1.5) + 85000000; 
  const projectedProfit = estResaleValue - totalInvestment;

  const deposit = landPrice * 0.5;
  const balance = landPrice - deposit;
  const monthly = balance / 6;

  const formatN = (num: number) => "₦" + num.toLocaleString();
  const formatConv = (num: number) => {
    const symbol = currency === 'GBP' ? '£' : currency === 'EUR' ? '€' : '$';
    return symbol + (num / RATES[currency]).toLocaleString(undefined, { maximumFractionDigits: 0 });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans">
      <div className="max-w-md mx-auto bg-white shadow-2xl overflow-hidden rounded-b-[40px]">
        
        {/* Header Image */}
        <div className="relative h-64">
          <img src={property.image} className="w-full h-full object-cover" alt="Property" />
          <div className="absolute top-4 left-4 bg-green-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wider">
            FCDA C of O Verified
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">{property.title}</h1>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{property.location}</p>
            <p className="mt-3 text-red-600 text-xs font-black uppercase animate-pulse">
              6 Months Payment Plan: Initial Deposit 50%
            </p>
          </div>

          {/* Currency Toggle */}
          <div className="flex justify-center bg-gray-100 p-1 rounded-xl gap-1">
            {(['USD', 'GBP', 'EUR'] as const).map((cur) => (
              <button key={cur} onClick={() => setCurrency(cur)}
                className={`flex-1 py-2 rounded-lg text-xs font-black transition-all ${currency === cur ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'}`}>
                {cur}
              </button>
            ))}
          </div>

          {/* Land Selection */}
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Select Investment Plan</p>
            <div className="grid grid-cols-1 gap-2">
              {property.plots.map((plot) => (
                <button key={plot.size} onClick={() => setSelectedPlot(plot)}
                  className={`p-4 rounded-2xl border-2 transition-all flex justify-between items-center ${selectedPlot.size === plot.size ? 'border-green-600 bg-green-50 shadow-sm' : 'border-gray-50 bg-gray-50/50'}`}>
                  <div className="text-left">
                    <p className="font-bold text-sm text-gray-800">{plot.size}</p>
                    <p className="text-[10px] text-gray-500 font-medium uppercase">{plot.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-gray-900 text-base">{formatN(plot.price)}</p>
                    <p className="text-[10px] text-blue-600 font-bold">{formatConv(plot.price)} {currency}</p>
                  </div>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-gray-500 font-semibold mt-1 ml-1">* Facilitator Fee (5%) applies</p>
          </div>

          {/* BOQ Slider */}
          <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Build Cost (BOQ)</label>
            <div className="flex justify-between items-center mb-4">
               <span className="text-2xl font-black text-emerald-700">{formatN(buildCost)}</span>
               <span className="text-xs font-bold text-gray-400">≈ {formatConv(buildCost)}</span>
            </div>
            <input type="range" min="30000000" max="150000000" step="5000000" value={buildCost} onChange={(e) => setBuildCost(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
          </div>

          {/* INVESTMENT POTENTIAL CARD */}
          <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6 text-center">Investment Potential</p>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Total Invest:</span>
                <span className="font-bold">{formatN(totalInvestment)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Est. Resale:</span>
                <span className="font-black text-emerald-400">{formatN(estResaleValue)}</span>
              </div>
            </div>
            <hr className="border-slate-800 mb-6" />
            <div className="text-center">
              <p className="text-slate-400 text-xs mb-1 uppercase font-bold tracking-tighter">Projected Profit</p>
              <p className="text-4xl font-black text-emerald-400">{formatN(projectedProfit)}</p>
              <p className="text-lg font-bold text-blue-400 mt-1 uppercase">≈ {formatConv(projectedProfit)} {currency}</p>
              <p className="text-[9px] text-slate-500 mt-4 leading-tight italic px-4">
                Resale value accounts for ₦85M base property equity plus current market scaling.
              </p>
            </div>
          </div>

          {/* Payment Plan Card */}
          <div className="bg-red-50 rounded-2xl p-5 border border-red-100">
             <p className="text-[10px] font-black text-red-700 uppercase mb-3">50% Deposit Breakdown</p>
             <div className="grid grid-cols-2 gap-4">
                <div><p className="text-[9px] text-gray-500 uppercase font-bold">Initial</p><p className="text-sm font-black text-gray-900">{formatConv(deposit)}</p></div>
                <div><p className="text-[9px] text-gray-500 uppercase font-bold">Monthly x6</p><p className="text-sm font-black text-gray-900">{formatConv(monthly)}</p></div>
             </div>
          </div>

          <button onClick={() => window.open(`https://wa.me/2348105105757?text=Interested in ${selectedPlot.type} at ${property.title}. DM for more info!`, '_blank')}
            className="w-full bg-[#25D366] text-white font-black py-5 rounded-2xl shadow-xl flex items-center justify-center gap-3 uppercase active:scale-95 transition-all">
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