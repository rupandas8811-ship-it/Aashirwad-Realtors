import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ReadinessTestProps {
  onClose: () => void;
}

export function ReadinessTest({ onClose }: ReadinessTestProps) {
  const [step, setStep] = useState(0); // 0 is intro, 1-10 are questions, 11 is result
  const [basicDetails, setBasicDetails] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: ''
  });
  const [answers, setAnswers] = useState<Record<string, any>>({
    q1: '',
    q2: '',
    q3: [] as string[],
    q4: '',
    q5: '',
    q6: '',
    q7_radio: '',
    q7_text: '',
    q8: '',
    q9: '',
    q10: ''
  });
  const [score, setScore] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleNext = () => setStep(prev => prev + 1);
  const handlePrev = () => setStep(prev => prev - 1);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const calculateScore = async () => {
    setIsSubmitting(true);
    setSubmitError('');
    let currentScore = 0;

    // Q1 (max 10)
    if (answers.q1) {
      currentScore += answers.q1 === 'I am still exploring.' ? 2 : 10;
    }

    // Q2 (max 10)
    if (answers.q2.length > 30) currentScore += 10;
    else if (answers.q2.length > 5) currentScore += 5;

    // Q3 (max 5) - Just answering gives some points
    if (answers.q3.length > 0) currentScore += 5;

    // Q4 (max 15)
    if (answers.q4 === 'I can book immediately.') currentScore += 15;
    else if (answers.q4 === 'Within 30 days.') currentScore += 12;
    else if (answers.q4 === 'Within 90 days.') currentScore += 8;
    else if (answers.q4 === 'Within 6 months.') currentScore += 5;
    else if (answers.q4 === 'More than 6 months.') currentScore += 2;

    // Q5 (max 5)
    if (answers.q5) currentScore += 5;

    // Q6 (max 10)
    if (answers.q6.length > 40) currentScore += 10;
    else if (answers.q6.length > 10) currentScore += 5;

    // Q7 (max 10)
    if (answers.q7_radio === 'Yes') currentScore += 5;
    else currentScore += 2;
    if (answers.q7_text.length > 20) currentScore += 5;
    else if (answers.q7_text.length > 5) currentScore += 2;

    // Q8 (max 15)
    if (answers.q8 === 'I already have the booking amount ready.') currentScore += 15;
    else if (answers.q8 === 'I know my loan eligibility.') currentScore += 12;
    else if (answers.q8 === 'I have spoken with banks.') currentScore += 10;
    else if (answers.q8 === 'I am arranging finances.') currentScore += 5;

    // Q9 (max 10)
    if (answers.q9 === 'Trust his recommendation.') currentScore += 10;
    else if (answers.q9 === 'Evaluate with him.') currentScore += 8;
    else if (answers.q9 === 'Depends on explanation.') currentScore += 5;
    else if (answers.q9 === 'Stick only to my original plan.') currentScore += 2;

    // Q10 (max 20)
    if (answers.q10.length > 80) currentScore += 20;
    else if (answers.q10.length > 30) currentScore += 10;
    else if (answers.q10.length > 5) currentScore += 5;

    // Normalize to 100 max
    const finalScore = Math.min(100, Math.round((currentScore / 110) * 100));
    setScore(finalScore);
    
    let cat = 'Awareness';
    if (finalScore >= 90) cat = 'Platinum Buyer';
    else if (finalScore >= 75) cat = 'Hot Buyer';
    else if (finalScore >= 60) cat = 'Warm Buyer';
    else if (finalScore >= 40) cat = 'Nurture';
    
    try {
      const payload = {
        answers,
        score: finalScore,
        category: cat,
        full_name: basicDetails.fullName,
        phone: basicDetails.phone,
        email: basicDetails.email,
        city: basicDetails.city
      };
      
      const { error } = await supabase
        .from('readiness_tests')
        .insert([payload]);

      if (error) {
        console.error('Readiness Test Supabase Error:', error);
        throw error;
      }
      setStep(11);
    } catch (e) {
      console.error("Failed to save readiness test", e);
      setSubmitError("Unable to submit. Please try again.");
    }

    setIsSubmitting(false);
  };

  const getResultCategory = () => {
    if (score >= 90) return { cat: 'Platinum Buyer', action: 'Immediate Personal Consultation' };
    if (score >= 75) return { cat: 'Hot Buyer', action: 'Site Visit Priority' };
    if (score >= 60) return { cat: 'Warm Buyer', action: 'Investment Webinar + Community' };
    if (score >= 40) return { cat: 'Nurture', action: 'Monthly Market Updates' };
    return { cat: 'Awareness', action: 'Automated Education Sequence' };
  };

  const sendToWhatsApp = () => {
    const text = `Hi Mr. Nagesh, I have completed the Buyer Readiness Assessment.
    
Score: ${score}/100
Category: ${getResultCategory().cat}

Here are my responses:
1. Why Bangalore? ${answers.q1}
2. Not buying impact: ${answers.q2}
3. Stopping today: ${answers.q3.join(', ')}
4. Financial readiness: ${answers.q4}
5. Buyer segment: ${answers.q5}
6. Smarter to buy now: ${answers.q6}
7. Unchanged prices - purchase?: ${answers.q7_radio} | Why: ${answers.q7_text}
8. Current financial planning: ${answers.q8}
9. Below budget recommendation: ${answers.q9}
10. Why should he believe I'm serious: ${answers.q10}`;
    
    window.open(`https://wa.me/919742636365?text=${encodeURIComponent(text)}`, '_blank');
  };

  const renderQuestion = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-navy-900">1. Why do you believe Bangalore is the right city for you to purchase property?</h3>
            <div className="space-y-3 mt-4">
              {['I already live here.', 'My career depends on Bangalore.', 'Long-term investment.', 'Rental income.', "Children's future.", 'Family relocation.', 'I am still exploring.'].map(opt => (
                <label key={opt} className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer transition-colors ${answers.q1 === opt ? 'border-gold-500 bg-beige-50' : 'border-gray-200 hover:border-navy-900'}`}>
                  <input type="radio" name="q1" value={opt} checked={answers.q1 === opt} onChange={e => setAnswers({...answers, q1: e.target.value})} className="hidden" />
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${answers.q1 === opt ? 'border-gold-500' : 'border-gray-400'}`}>
                    {answers.q1 === opt && <div className="w-2.5 h-2.5 bg-gold-500 rounded-full" />}
                  </div>
                  <span className="font-medium text-navy-900">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-navy-900">2. If you decide NOT to buy any property in Bangalore during the next two years, what would happen?</h3>
            <div className="space-y-3 mt-4">
              {['I may lose an investment opportunity.', 'My rent keeps increasing.', 'My business requires permanent settlement.', 'I want to secure a home for my family.'].map(opt => (
                <label key={opt} className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer transition-colors ${answers.q2 === opt ? 'border-gold-500 bg-beige-50' : 'border-gray-200 hover:border-navy-900'}`}>
                  <input type="radio" name="q2" value={opt} checked={answers.q2 === opt} onChange={e => setAnswers({...answers, q2: e.target.value})} className="hidden" />
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${answers.q2 === opt ? 'border-gold-500' : 'border-gray-400'}`}>
                    {answers.q2 === opt && <div className="w-2.5 h-2.5 bg-gold-500 rounded-full" />}
                  </div>
                  <span className="font-medium text-navy-900">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-navy-900">3. What is stopping you from purchasing today?</h3>
            <div className="grid sm:grid-cols-2 gap-3 mt-4">
              {['Budget', 'Loan eligibility', 'Family approval', 'Location confusion', 'Builder trust', 'Waiting for prices to reduce', 'Market uncertainty', 'Job uncertainty', 'Still comparing options', 'Other'].map(opt => (
                <label key={opt} className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer transition-colors ${answers.q3.includes(opt) ? 'border-gold-500 bg-beige-50' : 'border-gray-200 hover:border-navy-900'}`}>
                  <input type="checkbox" checked={answers.q3.includes(opt)} onChange={(e) => {
                    const newArr = e.target.checked ? [...answers.q3, opt] : answers.q3.filter((x: string) => x !== opt);
                    setAnswers({...answers, q3: newArr});
                  }} className="hidden" />
                  <div className={`w-5 h-5 rounded-sm border flex items-center justify-center ${answers.q3.includes(opt) ? 'border-gold-500 bg-gold-500' : 'border-gray-400'}`}>
                    {answers.q3.includes(opt) && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <span className="font-medium text-navy-900">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-navy-900">4. Suppose you find the perfect property tomorrow. Will you be financially ready?</h3>
            <div className="space-y-3 mt-4">
              {['I can book immediately.', 'Within 30 days.', 'Within 90 days.', 'Within 6 months.', 'More than 6 months.', 'Just exploring.'].map(opt => (
                <label key={opt} className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer transition-colors ${answers.q4 === opt ? 'border-gold-500 bg-beige-50' : 'border-gray-200 hover:border-navy-900'}`}>
                  <input type="radio" name="q4" value={opt} checked={answers.q4 === opt} onChange={e => setAnswers({...answers, q4: e.target.value})} className="hidden" />
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${answers.q4 === opt ? 'border-gold-500' : 'border-gray-400'}`}>
                    {answers.q4 === opt && <div className="w-2.5 h-2.5 bg-gold-500 rounded-full" />}
                  </div>
                  <span className="font-medium text-navy-900">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-navy-900">5. Which statement describes you best?</h3>
            <div className="grid sm:grid-cols-2 gap-3 mt-4">
              {['I am buying my first home.', 'Upgrading my current home.', 'Investment.', 'Rental income.', 'Retirement planning.', 'Villa aspiration.', 'Luxury lifestyle.', 'Commercial diversification.'].map(opt => (
                <label key={opt} className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer transition-colors ${answers.q5 === opt ? 'border-gold-500 bg-beige-50' : 'border-gray-200 hover:border-navy-900'}`}>
                  <input type="radio" name="q5" value={opt} checked={answers.q5 === opt} onChange={e => setAnswers({...answers, q5: e.target.value})} className="hidden" />
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${answers.q5 === opt ? 'border-gold-500' : 'border-gray-400'}`}>
                    {answers.q5 === opt && <div className="w-2.5 h-2.5 bg-gold-500 rounded-full" />}
                  </div>
                  <span className="font-medium text-navy-900">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-navy-900">6. Mr. Nagesh believes many people buy emotionally and regret later. Why do YOU think buying now is a smarter decision than waiting?</h3>
            <div className="space-y-3 mt-4">
              {['Property prices may increase, so buying now could be financially smarter than waiting.', 'I am financially prepared and have found the right time to make the purchase.', 'My family or lifestyle needs make owning a property important for me now.', "I see a good long-term investment opportunity and don't want to miss it."].map(opt => (
                <label key={opt} className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer transition-colors ${answers.q6 === opt ? 'border-gold-500 bg-beige-50' : 'border-gray-200 hover:border-navy-900'}`}>
                  <input type="radio" name="q6" value={opt} checked={answers.q6 === opt} onChange={e => setAnswers({...answers, q6: e.target.value})} className="hidden" />
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${answers.q6 === opt ? 'border-gold-500' : 'border-gray-400'}`}>
                    {answers.q6 === opt && <div className="w-2.5 h-2.5 bg-gold-500 rounded-full" />}
                  </div>
                  <span className="font-medium text-navy-900">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-navy-900">7. Imagine Bangalore property prices remain unchanged for three years. Would you still purchase?</h3>
            <div className="flex gap-4 mt-4 mb-6">
              {['Yes', 'No', 'Not sure'].map(opt => (
                <label key={opt} className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer transition-colors flex-1 ${answers.q7_radio === opt ? 'border-gold-500 bg-beige-50' : 'border-gray-200 hover:border-navy-900'}`}>
                  <input type="radio" name="q7_radio" value={opt} checked={answers.q7_radio === opt} onChange={e => setAnswers({...answers, q7_radio: e.target.value})} className="hidden" />
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${answers.q7_radio === opt ? 'border-gold-500' : 'border-gray-400'}`}>
                    {answers.q7_radio === opt && <div className="w-2.5 h-2.5 bg-gold-500 rounded-full" />}
                  </div>
                  <span className="font-medium text-navy-900">{opt}</span>
                </label>
              ))}
            </div>
            {answers.q7_radio && (
              <div className="animate-fade-in">
                <label className="block font-bold text-navy-900 mb-2">Why?</label>
                <textarea 
                  value={answers.q7_text}
                  onChange={e => setAnswers({...answers, q7_text: e.target.value})}
                  placeholder="Your reasoning..."
                  className="w-full h-32 p-4 border border-gray-200 rounded-sm focus:border-navy-900 focus:ring-1 focus:ring-navy-900 outline-none resize-none"
                />
              </div>
            )}
          </div>
        );
      case 8:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-navy-900">8. Which statement best describes your current financial planning?</h3>
            <div className="space-y-3 mt-4">
              {['I already have the booking amount ready.', 'I know my loan eligibility.', 'I have spoken with banks.', 'I am arranging finances.', "I haven't started financial planning."].map(opt => (
                <label key={opt} className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer transition-colors ${answers.q8 === opt ? 'border-gold-500 bg-beige-50' : 'border-gray-200 hover:border-navy-900'}`}>
                  <input type="radio" name="q8" value={opt} checked={answers.q8 === opt} onChange={e => setAnswers({...answers, q8: e.target.value})} className="hidden" />
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${answers.q8 === opt ? 'border-gold-500' : 'border-gray-400'}`}>
                    {answers.q8 === opt && <div className="w-2.5 h-2.5 bg-gold-500 rounded-full" />}
                  </div>
                  <span className="font-medium text-navy-900">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 9:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-navy-900">9. If Mr. Nagesh recommends a property that is BELOW your planned budget because he believes it is a better investment, what would you do?</h3>
            <div className="space-y-3 mt-4">
              {['Trust his recommendation.', 'Evaluate with him.', 'Stick only to my original plan.', 'Depends on explanation.'].map(opt => (
                <label key={opt} className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer transition-colors ${answers.q9 === opt ? 'border-gold-500 bg-beige-50' : 'border-gray-200 hover:border-navy-900'}`}>
                  <input type="radio" name="q9" value={opt} checked={answers.q9 === opt} onChange={e => setAnswers({...answers, q9: e.target.value})} className="hidden" />
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${answers.q9 === opt ? 'border-gold-500' : 'border-gray-400'}`}>
                    {answers.q9 === opt && <div className="w-2.5 h-2.5 bg-gold-500 rounded-full" />}
                  </div>
                  <span className="font-medium text-navy-900">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 10:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-navy-900">10. The Devil's Advocate Question</h3>
            <p className="text-gray-500 italic">Mr. Nagesh's philosophy is simple: "Sometimes the best advice is NOT to buy." Before he spends his time helping you—convince him. Why should he believe that YOU are genuinely serious about purchasing property within your mentioned timeline?</p>
            <div className="space-y-3 mt-4">
              {['My budget and finances are ready, and I will purchase once I find the right property.', 'I have a clear buying timeline and am actively evaluating suitable properties.', 'My family/business requirement is genuine, and I need to finalize a property within my planned timeline.', 'I am ready to take the next step, including property visits and financial discussions, if the right opportunity is available.'].map(opt => (
                <label key={opt} className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer transition-colors ${answers.q10 === opt ? 'border-gold-500 bg-beige-50' : 'border-gray-200 hover:border-navy-900'}`}>
                  <input type="radio" name="q10" value={opt} checked={answers.q10 === opt} onChange={e => setAnswers({...answers, q10: e.target.value})} className="hidden" />
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${answers.q10 === opt ? 'border-gold-500' : 'border-gray-400'}`}>
                    {answers.q10 === opt && <div className="w-2.5 h-2.5 bg-gold-500 rounded-full" />}
                  </div>
                  <span className="font-medium text-navy-900">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const isCurrentStepAnswered = () => {
    switch (step) {
      case 1: return answers.q1 !== '';
      case 2: return answers.q2 !== '';
      case 3: return answers.q3.length > 0;
      case 4: return answers.q4 !== '';
      case 5: return answers.q5 !== '';
      case 6: return answers.q6 !== '';
      case 7: return answers.q7_radio !== '' && answers.q7_text.trim() !== '';
      case 8: return answers.q8 !== '';
      case 9: return answers.q9 !== '';
      case 10: return answers.q10 !== '';
      default: return true;
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-16 min-h-screen flex flex-col">
        {step === 0 && (
          <div className="flex-1 flex flex-col justify-center animate-fade-in max-w-2xl mx-auto w-full">
            <div className="w-16 h-16 bg-beige-50 rounded-full flex items-center justify-center mb-6 border border-gold-500">
              <ShieldAlert className="w-8 h-8 text-gold-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">The Buyer Readiness Score™</h1>
            <p className="text-lg text-gray-600 mb-6">
              Every prospect completes this assessment before booking a consultation. Please provide your basic details to begin.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); setStep(1); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input required type="text" value={basicDetails.fullName} onChange={e => setBasicDetails({...basicDetails, fullName: e.target.value})} className="w-full p-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy-900 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input required type="tel" value={basicDetails.phone} onChange={e => setBasicDetails({...basicDetails, phone: e.target.value})} className="w-full p-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy-900 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input required type="email" value={basicDetails.email} onChange={e => setBasicDetails({...basicDetails, email: e.target.value})} className="w-full p-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy-900 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input required type="text" value={basicDetails.city} onChange={e => setBasicDetails({...basicDetails, city: e.target.value})} className="w-full p-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy-900 outline-none" />
              </div>
              <div className="pt-4 flex gap-4">
                <button 
                  type="submit"
                  className="bg-navy-900 hover:bg-navy-800 text-white px-8 py-4 rounded-sm font-bold flex items-center justify-center gap-2 transition-colors flex-1"
                >
                  Begin Assessment <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  type="button"
                  onClick={onClose}
                  className="px-8 py-4 text-navy-900 font-bold hover:bg-gray-50 rounded-sm transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {step > 0 && step <= 10 && (
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
              <button onClick={onClose} className="text-sm font-bold text-gray-400 hover:text-navy-900 uppercase tracking-widest transition-colors">
                Close
              </button>
              <div className="text-sm font-bold text-gold-600 uppercase tracking-widest">
                Question {step} of 10
              </div>
            </div>
            
            <div className="flex-1">
              {renderQuestion()}
            </div>

            <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-100">
              <button 
                onClick={handlePrev}
                disabled={step === 1}
                className={`flex items-center gap-2 font-bold px-6 py-3 rounded-sm transition-colors ${step === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-navy-900 hover:bg-beige-50'}`}
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>
              
              {step < 10 ? (
                <button 
                  onClick={handleNext}
                  disabled={!isCurrentStepAnswered()}
                  className={`px-8 py-3 rounded-sm font-bold flex items-center gap-2 transition-colors ${!isCurrentStepAnswered() ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gold-500 hover:bg-gold-600 text-navy-900'}`}
                >
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button 
                  onClick={calculateScore}
                  disabled={isSubmitting || !isCurrentStepAnswered()}
                  className="bg-navy-900 hover:bg-navy-800 text-white px-8 py-3 rounded-sm font-bold flex items-center gap-2 transition-colors shadow-lg disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Calculating...' : 'See My Result'} <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
            {submitError && (
              <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-sm text-sm font-medium text-center border border-red-100">
                {submitError}
              </div>
            )}
          </div>
        )}

        {step === 11 && (
          <div className="flex-1 flex flex-col justify-center items-center text-center animate-fade-in py-12">
            <div className="w-24 h-24 bg-beige-50 rounded-full flex items-center justify-center mb-8 border-4 border-gold-500">
              <CheckCircle2 className="w-12 h-12 text-gold-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-10">Your test was submitted successfully.</h1>
            <button 
              onClick={onClose}
              className="w-full max-w-sm bg-navy-900 text-white px-8 py-4 rounded-sm font-bold hover:bg-navy-800 transition-colors"
            >
              Back to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
