
import React from 'react';
import Layout from '../components/Layout';

const PricingPage: React.FC = () => {
  const plans = [
    {
      name: 'Free Tier',
      price: 'Always Free',
      features: ['Basic Mock Interviews', 'Limited Feedback', '1 Interview/Month'],
      buttonText: 'Free Tier',
      popular: false
    },
    {
      name: 'Pro Plan',
      price: '$29/Month',
      features: ['Unlimited Interviews', 'Detailed AI Feedback', 'Interview History Access', 'Standard Resources'],
      buttonText: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Platinum Plan',
      price: '$49/Month',
      features: ['All Pro Features', 'Priority Support', 'Personalized Coaching', 'Premium Resources'],
      buttonText: 'Get Started',
      popular: false
    }
  ];

  return (
    <Layout>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900/50 to-slate-900 rounded-b-[40px] shadow-lg">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Unlock Your Potential With Premium Plans</h1>
          <p className="text-slate-300">Choose the plan that's right for you.</p>
        </div>
      </div>
      
      {/* Pricing Cards */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`w-full md:w-1/3 max-w-sm bg-slate-800/50 rounded-xl p-8 border ${plan.popular ? 'border-cyan-500 scale-105' : 'border-slate-700'} transition-transform duration-300 relative`}
            >
              {plan.popular && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Popular</div>}
              <h3 className="text-2xl font-bold text-center mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold text-center text-cyan-400 mb-6">{plan.price}</p>
              <ul className="space-y-3 text-slate-300 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 px-6 rounded-lg font-bold transition-colors ${plan.popular ? 'bg-cyan-500 hover:bg-cyan-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-200'}`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PricingPage;
