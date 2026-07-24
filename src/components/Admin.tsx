import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Shield, LogOut, Loader2, Save, XCircle } from 'lucide-react';

export function Admin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('adminToken'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [readiness, setReadiness] = useState<any[]>([]);
  const [consults, setConsults] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'readiness'|'consults'>('readiness');

  useEffect(() => {
    if (token) {
      fetchSubmissions();
    }
  }, [token]);

  const fetchSubmissions = async () => {
    try {
      const res = await fetch('/api/admin/submissions', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) {
        if (res.status === 401) {
          handleLogout();
        }
        throw new Error('Failed to fetch data');
      }
      
      const data = await res.json();
      setReadiness(data.readiness);
      setConsults(data.consults);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const loginRes = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      if (!loginRes.ok) {
        const errorData = await loginRes.json();
        throw new Error(errorData.error || 'Invalid credentials');
      }
      
      const { token } = await loginRes.json();
      localStorage.setItem('adminToken', token);
      setToken(token);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  const updateSubmission = async (type: 'readiness'|'consultation', id: number, updates: any) => {
    try {
      const res = await fetch(`/api/admin/${type}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });
      if (!res.ok) throw new Error('Update failed');
      const updated = await res.json();
      
      if (type === 'readiness') {
        setReadiness(prev => prev.map(r => r.id === id ? updated : r));
      } else {
        setConsults(prev => prev.map(c => c.id === id ? updated : c));
      }
    } catch (err) {
      alert('Failed to update: ' + err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-navy-900 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-gold-500" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-navy-900 mb-6">Admin Dashboard</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username (Mobile Number)</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-navy-900 outline-none"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-navy-900 outline-none"
                placeholder="Enter password"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading || !password || !username}
              className="w-full bg-navy-900 text-white font-bold py-3 rounded-md hover:bg-navy-800 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  const statusOptions = ['New', 'Contacted', 'Scheduled', 'Completed', 'Closed'];

  const EditableRow = ({ item, type }: { item: any, type: 'readiness'|'consultation', key?: React.Key }) => {
    const [notes, setNotes] = useState(item.adminNotes);
    const [status, setStatus] = useState(item.status);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
      setIsSaving(true);
      await updateSubmission(type, item.id, { status, adminNotes: notes });
      setIsSaving(false);
    };

    const isChanged = notes !== item.adminNotes || status !== item.status;

    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col md:flex-row gap-6 mb-4">
        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              {type === 'consultation' ? (
                <>
                  <h3 className="text-lg font-bold text-navy-900">{item.fullName}</h3>
                  <p className="text-gray-600 text-sm">{item.email} | {item.phone}</p>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-navy-900">Score: {item.score}/100</h3>
                  <p className="text-sm font-medium text-gold-600 uppercase tracking-widest">{item.category}</p>
                  {item.fullName && (
                    <p className="text-gray-600 text-sm mt-1">{item.fullName} | {item.email} | {item.phone} | {item.city}</p>
                  )}
                </>
              )}
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Created: {format(new Date(item.createdAt), 'PP p')}</p>
              <p className="text-xs text-gray-400">Updated: {format(new Date(item.updatedAt), 'PP p')}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded text-sm">
            {type === 'consultation' ? (
              <div>
                <strong>Looking for:</strong> {item.lookingFor}
              </div>
            ) : (
              <div className="space-y-2">
                <p><strong>1. Why Bangalore?</strong> {item.answers?.q1}</p>
                <p><strong>2. Not buying impact:</strong> {item.answers?.q2}</p>
                <p><strong>3. Stopping today:</strong> {item.answers?.q3?.join(', ')}</p>
                <p><strong>4. Financial readiness:</strong> {item.answers?.q4}</p>
                <p><strong>5. Buyer segment:</strong> {item.answers?.q5}</p>
                <p><strong>6. Smarter to buy now:</strong> {item.answers?.q6}</p>
                <p><strong>7. Unchanged prices:</strong> {item.answers?.q7_radio} | {item.answers?.q7_text}</p>
                <p><strong>8. Current financial planning:</strong> {item.answers?.q8}</p>
                <p><strong>9. Below budget recommendation:</strong> {item.answers?.q9}</p>
                <p><strong>10. Serious intent:</strong> {item.answers?.q10}</p>
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-72 bg-gray-50 p-4 rounded flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">Status</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm focus:border-navy-900 focus:ring-1 focus:ring-navy-900 outline-none"
            >
              {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div className="flex-1 flex flex-col">
            <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">Admin Notes</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Add private notes here..."
              className="w-full flex-1 p-2 border border-gray-300 rounded text-sm focus:border-navy-900 focus:ring-1 focus:ring-navy-900 outline-none resize-none min-h-[100px]"
            />
          </div>
          {isChanged && (
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-navy-900 text-white font-medium py-2 rounded text-sm flex items-center justify-center gap-2 hover:bg-navy-800 transition-colors"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Changes
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-navy-900 flex flex-col">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-navy-900 rounded flex items-center justify-center">
            <Shield className="w-5 h-5 text-gold-500" />
          </div>
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-500 hover:text-red-500 font-medium transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </header>
      
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('readiness')}
            className={`px-4 py-3 font-bold text-sm uppercase tracking-wider transition-colors ${activeTab === 'readiness' ? 'text-navy-900 border-b-2 border-navy-900' : 'text-gray-400 hover:text-navy-900'}`}
          >
            Readiness Tests ({readiness.length})
          </button>
          <button
            onClick={() => setActiveTab('consults')}
            className={`px-4 py-3 font-bold text-sm uppercase tracking-wider transition-colors ${activeTab === 'consults' ? 'text-navy-900 border-b-2 border-navy-900' : 'text-gray-400 hover:text-navy-900'}`}
          >
            Consultations ({consults.length})
          </button>
        </div>

        <div className="space-y-4">
          {activeTab === 'readiness' ? (
            readiness.length === 0 ? (
              <p className="text-gray-500 text-center py-12">No readiness tests submitted yet.</p>
            ) : (
              readiness.map(r => <EditableRow key={r.id} item={r} type="readiness" />)
            )
          ) : (
            consults.length === 0 ? (
              <p className="text-gray-500 text-center py-12">No consultations submitted yet.</p>
            ) : (
              consults.map(c => <EditableRow key={c.id} item={c} type="consultation" />)
            )
          )}
        </div>
      </main>
    </div>
  );
}
