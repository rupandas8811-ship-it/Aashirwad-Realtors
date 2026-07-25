import React, { useState, useEffect } from 'react';
import { LogIn, Users, Calendar, ArrowRight, Loader2, RefreshCw } from 'lucide-react';

export function AdminDashboard() {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'readiness' | 'consultations'>('readiness');
  const [data, setData] = useState<{ readiness: any[], consults: any[] }>({ readiness: [], consults: [] });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        setToken(data.token);
        localStorage.setItem('adminToken', data.token);
      } else {
        setLoginError(data.error || 'Invalid credentials');
      }
    } catch (e) {
      setLoginError('Server error. Try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('adminToken');
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/submissions', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const jsonData = await res.json();
        setData(jsonData);
      } else {
        if (res.status === 401) {
          handleLogout();
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 bg-beige-50 flex justify-center items-start">
        <div className="bg-white p-8 rounded-sm shadow-md w-full max-w-md border border-gray-100 mt-10">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-navy-900 rounded-full flex items-center justify-center">
              <LogIn className="w-8 h-8 text-gold-500" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-navy-900 text-center mb-8">Staff Login</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 bg-red-50 text-red-600 rounded-sm text-sm font-medium border border-red-100 text-center">
                {loginError}
              </div>
            )}
            <div>
              <label className="block text-sm font-bold text-navy-900 mb-1">Username</label>
              <input 
                required 
                type="text" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-navy-900 outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-navy-900 mb-1">Password</label>
              <input 
                required 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-navy-900 outline-none" 
              />
            </div>
            <button 
              type="submit" 
              disabled={isLoggingIn}
              className="w-full bg-navy-900 hover:bg-navy-800 text-white p-3 rounded-sm font-bold transition-colors flex items-center justify-center disabled:opacity-70"
            >
              {isLoggingIn ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-navy-900">Staff Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage leads and readiness submissions.</p>
          </div>
          <div className="flex gap-4">
            <button onClick={fetchData} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-navy-900 rounded-sm font-medium hover:bg-gray-50">
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} /> Refresh
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-navy-900 rounded-sm font-medium hover:bg-gray-300">
              Logout
            </button>
          </div>
        </div>

        <div className="flex border-b border-gray-200 mb-8">
          <button 
            className={`px-6 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'readiness' ? 'border-navy-900 text-navy-900' : 'border-transparent text-gray-500 hover:text-navy-900'}`}
            onClick={() => setActiveTab('readiness')}
          >
            <Users className="w-4 h-4" /> Readiness Tests ({data.readiness.length})
          </button>
          <button 
            className={`px-6 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'consultations' ? 'border-navy-900 text-navy-900' : 'border-transparent text-gray-500 hover:text-navy-900'}`}
            onClick={() => setActiveTab('consultations')}
          >
            <Calendar className="w-4 h-4" /> Consultations ({data.consults.length})
          </button>
        </div>

        {isLoading && data.readiness.length === 0 && data.consults.length === 0 ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-navy-900" />
          </div>
        ) : (
          <div className="space-y-6">
            {activeTab === 'readiness' && (
              data.readiness.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-sm border border-gray-200 text-gray-500">No readiness tests submitted yet.</div>
              ) : (
                data.readiness.map((item) => (
                  <div key={item.id} className="bg-white p-6 rounded-sm shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-4">
                      <div>
                        <h3 className="text-xl font-bold text-navy-900">{item.fullName}</h3>
                        <div className="flex gap-4 text-sm text-gray-600 mt-1">
                          <span>{item.email}</span>
                          <span>•</span>
                          <span>{item.phone}</span>
                          <span>•</span>
                          <span>{item.city}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-navy-900">{item.score}/100</div>
                        <div className="text-sm font-bold text-gold-600 uppercase tracking-wider mt-1">{item.category}</div>
                        <div className="text-xs text-gray-400 mt-1">{new Date(item.createdAt).toLocaleString()}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-bold text-navy-900 uppercase text-xs tracking-wider">Responses</h4>
                      {Object.keys(item.answers || {}).sort((a,b) => {
                        const numA = parseInt(a.replace('q', '').replace('_radio', '').replace('_text', '')) || 0;
                        const numB = parseInt(b.replace('q', '').replace('_radio', '').replace('_text', '')) || 0;
                        return numA - numB;
                      }).map((key) => {
                        let ans = item.answers[key];
                        if (Array.isArray(ans)) ans = ans.join(', ');
                        if (!ans) return null;
                        
                        let displayKey = key.toUpperCase();
                        
                        return (
                          <div key={key} className="bg-gray-50 p-3 rounded-sm border border-gray-100 text-sm">
                            <span className="font-semibold text-navy-900 block mb-1">{displayKey}:</span>
                            <span className="text-gray-700 whitespace-pre-wrap">{ans}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))
              )
            )}
            
            {activeTab === 'consultations' && (
              data.consults.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-sm border border-gray-200 text-gray-500">No consultation requests yet.</div>
              ) : (
                data.consults.map((item) => (
                  <div key={item.id} className="bg-white p-6 rounded-sm shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-navy-900">{item.fullName}</h3>
                        <div className="flex flex-col gap-1 text-sm text-gray-600 mt-2">
                          <span className="flex items-center gap-2"><strong>Email:</strong> {item.email}</span>
                          <span className="flex items-center gap-2"><strong>Phone:</strong> {item.phone}</span>
                          <span className="flex items-center gap-2"><strong>Looking For:</strong> <span className="bg-beige-50 px-2 py-0.5 rounded text-navy-900 border border-gold-200">{item.lookingFor}</span></span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold uppercase">New Lead</span>
                        <div className="text-xs text-gray-400 mt-2">{new Date(item.createdAt).toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                ))
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
