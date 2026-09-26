import React, { useState } from 'react';
import { X, Check, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | '3mo' | '6mo' | 'yearly'>('monthly');

  if (!isOpen) return null;

  const plans = [
    {
      id: 'monthly',
      name: 'Standard Monthly',
      price: '₹99',
      period: '/ month',
      badge: 'Most Flexible',
      savings: '7-Day Free Trial included',
    },
    {
      id: '3mo',
      name: 'Quarterly Immersion',
      price: '₹249',
      period: 'for 3 months',
      badge: 'Save 16%',
      savings: '₹83 / month',
    },
    {
      id: '6mo',
      name: 'Bi-Annual Haven',
      price: '₹449',
      period: 'for 6 months',
      badge: 'Popular',
      savings: '₹75 / month',
    },
    {
      id: 'yearly',
      name: 'Annual Sanctuary Pass',
      price: '₹799',
      period: 'for 1 year',
      badge: 'Best Value',
      savings: '₹66 / month (Save 33%)',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-[#f59e0b]/40 bg-[#0f131c] p-6 shadow-2xl sm:p-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-[#1c2028] text-[#9ca3af] hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#f59e0b]/40 bg-[#f59e0b]/10 px-3 py-1 text-xs font-semibold text-[#ffc174]">
            <Sparkles className="h-3.5 w-3.5 text-[#f59e0b]" />
            StoryVerse Immersion Pass
          </div>
          <h2 className="mt-3 font-serif text-2xl font-bold tracking-tight text-[#ffc174] sm:text-3xl">
            Start Your 7-Day Free Trial
          </h2>
          <p className="mt-1 text-xs text-[#9ca3af]">
            Zero upfront payment today. Unlimited access to spatial audiobooks, cinema premieres, and AI story studio.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            return (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id as any)}
                className={`relative flex flex-col justify-between rounded-2xl border p-4 text-left transition-all ${
                  isSelected
                    ? 'border-[#f59e0b] bg-[#1c2028] shadow-lg shadow-[#f59e0b]/15'
                    : 'border-[#1f2937] bg-[#161f30]/40 hover:border-[#374151]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#dfe2ee]">{plan.name}</span>
                  <span className="rounded-full bg-[#f59e0b]/20 px-2 py-0.5 text-[10px] font-bold text-[#ffc174]">
                    {plan.badge}
                  </span>
                </div>

                <div className="mt-3">
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-2xl font-bold text-[#ffc174]">{plan.price}</span>
                    <span className="text-xs text-[#9ca3af]">{plan.period}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-[#9ca3af]">{plan.savings}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Features Checklist */}
        <div className="mt-6 space-y-2 rounded-xl border border-[#1f2937] bg-[#111827] p-4 text-xs text-[#dfe2ee]">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-400" />
            <span>Unlimited AI Story Generation tailored to your demographic profile</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-400" />
            <span>Dolby Atmos &amp; Binaural Spatial Audio narration for all stories</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-400" />
            <span>Risk-Free Guarantee: Cancel anytime before trial ends with 0 charges</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex items-center gap-1.5 text-xs text-[#34d399]">
            <ShieldCheck className="h-4 w-4" />
            <span>Encrypted &amp; Verified Checkout</span>
          </div>

          <button
            onClick={() => {
              alert('7-Day Free Trial activated! Welcome to StoryVerse Sanctuary.');
              onClose();
            }}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#ea580c] px-6 py-2.5 text-xs font-bold text-[#0b0f17] shadow-lg shadow-[#f59e0b]/20 hover:brightness-110 active:scale-95"
          >
            <span>Activate 7-Day Free Trial</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
