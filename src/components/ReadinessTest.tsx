import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';

interface ReadinessTestProps {
  onClose: () => void;
}

export function ReadinessTest({ onClose }: ReadinessTestProps) {
  const [step, setStep] = useState(0); // 0 is intro, 1-10 are questions, 11 is result
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

  const calculateScore = () => {
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
    setStep(11);
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
            <p className="text-gray-500 italic">Tests whether you have a real reason to buy in Bangalore or are simply following market hype.</p>
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
            <p className="text-gray-500 italic">Measures pain. People buy because pain is stronger than comfort.</p>
            <textarea 
              value={answers.q2}
              onChange={e => setAnswers({...answers, q2: e.target.value})}
              placeholder="E.g. Nothing, my rent keeps increasing, I may lose an investment opportunity..."
              className="w-full h-40 p-4 border border-gray-200 rounded-sm focus:border-navy-900 focus:ring-1 focus:ring-navy-900 outline-none resize-none"
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-navy-900">3. What is stopping you from purchasing today?</h3>
            <p className="text-gray-500 italic">Select all that apply. Identifies real objections.</p>
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
            <p className="text-gray-500 italic">Measures purchasing capability.</p>
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
            <p className="text-gray-500 italic">Segments customers automatically.</p>
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
            <p className="text-gray-500 italic">This question reveals conviction. People with no conviction rarely convert.</p>
            <textarea 
              value={answers.q6}
              onChange={e => setAnswers({...answers, q6: e.target.value})}
              placeholder="Your answer..."
              className="w-full h-40 p-4 border border-gray-200 rounded-sm focus:border-navy-900 focus:ring-1 focus:ring-navy-900 outline-none resize-none"
            />
          </div>
        );
      case 7:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-navy-900">7. Imagine Bangalore property prices remain unchanged for three years. Would you still purchase?</h3>
            <p className="text-gray-500 italic">Separates investors from genuine homebuyers.</p>
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
            <p className="text-gray-500 italic">Measures financial maturity.</p>
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
            <p className="text-gray-500 italic">Measures trust and advisory mindset.</p>
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
            <div className="bg-beige-50 p-4 border-l-4 border-gold-500 mb-4">
              <p className="text-sm text-navy-900 font-medium">This single answer often predicts conversion. Serious buyers write paragraphs. Casual browsers write one sentence.</p>
            </div>
            <textarea 
              value={answers.q10}
              onChange={e => setAnswers({...answers, q10: e.target.value})}
              placeholder="Your honest answer..."
              className="w-full h-48 p-4 border border-gray-200 rounded-sm focus:border-navy-900 focus:ring-1 focus:ring-navy-900 outline-none resize-none"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-16 min-h-screen flex flex-col">
        {step === 0 && (
          <div className="flex-1 flex flex-col justify-center animate-fade-in">
            <div className="w-16 h-16 bg-beige-50 rounded-full flex items-center justify-center mb-8 border border-gold-500">
              <ShieldAlert className="w-8 h-8 text-gold-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">The Buyer Readiness Score™</h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Every prospect completes this assessment before booking a consultation. The questionnaire is intentionally designed to make you think.
            </p>
            <div className="bg-beige-50 p-6 rounded-sm border-l-4 border-gold-500 mb-10">
              <p className="text-navy-900 font-medium">
                If someone cannot answer these questions seriously, they are unlikely to make a property purchase. This takes about 2-3 minutes.
              </p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setStep(1)}
                className="bg-navy-900 hover:bg-navy-800 text-white px-8 py-4 rounded-sm font-bold flex items-center gap-2 transition-colors"
              >
                Begin Assessment <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={onClose}
                className="px-8 py-4 text-navy-900 font-bold hover:bg-gray-50 rounded-sm transition-colors"
              >
                Cancel
              </button>
            </div>
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
                  className="bg-gold-500 hover:bg-gold-600 text-navy-900 px-8 py-3 rounded-sm font-bold flex items-center gap-2 transition-colors"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button 
                  onClick={calculateScore}
                  className="bg-navy-900 hover:bg-navy-800 text-white px-8 py-3 rounded-sm font-bold flex items-center gap-2 transition-colors shadow-lg"
                >
                  See My Result <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {step === 11 && (
          <div className="flex-1 flex flex-col justify-center items-center text-center animate-fade-in py-12">
            <div className="w-24 h-24 bg-beige-50 rounded-full flex items-center justify-center mb-8 border-4 border-gold-500">
              <span className="text-3xl font-extrabold text-navy-900">{score}</span>
            </div>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Your Readiness Score</h2>
            <h1 className="text-4xl font-bold text-navy-900 mb-4">{getResultCategory().cat}</h1>
            <p className="text-xl text-gray-600 mb-10 max-w-lg">
              Recommended Next Step: <strong className="text-navy-900">{getResultCategory().action}</strong>
            </p>
            
            <div className="space-y-4 w-full max-w-sm">
              <button 
                onClick={sendToWhatsApp}
                className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-white px-8 py-4 rounded-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-lg"
              >
                Send Results via WhatsApp
              </button>
              <button 
                onClick={onClose}
                className="w-full bg-white border border-gray-200 text-navy-900 px-8 py-4 rounded-sm font-bold hover:bg-gray-50 transition-colors"
              >
                Back to Website
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
