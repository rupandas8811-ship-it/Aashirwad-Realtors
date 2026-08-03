import React, { useState, useEffect } from 'react';
import { Shield, LogOut, Loader2, Save, XCircle, Search, Calendar, Filter, RotateCcw, Download } from 'lucide-react';
import { supabase } from '../lib/supabase';
import bcrypt from 'bcryptjs';

/**
 * Safely parse a date input (string, Date, or number) ensuring string timestamps
 * without offset are treated as UTC timestamps.
 */
const parseAsUTC = (dateInput: string | Date | number | null | undefined): Date | null => {
  if (!dateInput) return null;
  if (dateInput instanceof Date) return dateInput;
  if (typeof dateInput === 'number') return new Date(dateInput);

  let str = String(dateInput).trim();
  if (!str) return null;

  // Replace space between date and time with 'T' (e.g., "2026-08-03 05:12:00" -> "2026-08-03T05:12:00")
  str = str.replace(/^(\d{4}-\d{2}-\d{2})\s+(\d{2}:)/, '$1T$2');

  // If the string lacks a timezone offset indicator (Z, +HH:MM, or -HH:MM), append 'Z' so JS treats it as UTC
  const hasTimezoneOffset = /[Zz]$|[+-]\d{2}:?\d{2}$/.test(str);
  if (!hasTimezoneOffset) {
    str += 'Z';
  }

  const date = new Date(str);
  return isNaN(date.getTime()) ? null : date;
};

/**
 * Format timestamp into Indian Standard Time (Asia/Kolkata)
 * Example output: "03 Aug 2026, 10:42 AM"
 */
const formatInIST = (dateInput: string | Date | number | null | undefined): string => {
  const date = parseAsUTC(dateInput);
  if (!date) return 'N/A';

  try {
    return new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  } catch (e) {
    return 'N/A';
  }
};

/**
 * Format timestamp into Indian Standard Time (Asia/Kolkata) with seconds for reports.
 * Example output: "03/08/2026, 10:42:00 AM IST"
 */
const formatInISTDetailed = (dateInput: string | Date | number | null | undefined): string => {
  const date = parseAsUTC(dateInput);
  if (!date) return 'N/A';

  try {
    return new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(date);
  } catch (e) {
    return 'N/A';
  }
};

/**
 * Get YYYY-MM-DD date string in Asia/Kolkata timezone for filtering.
 */
const getISTDateString = (dateInput: string | Date | number): string => {
  const date = parseAsUTC(dateInput);
  if (!date) return '';
  try {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  } catch (e) {
    return '';
  }
};

export function Admin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('adminAuth'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [readiness, setReadiness] = useState<any[]>([]);
  const [consults, setConsults] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'readiness'|'consults'>('readiness');

  // Filter States
  const [searchName, setSearchName] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [buyerTypeFilter, setBuyerTypeFilter] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubmissions();
    }
  }, [isAuthenticated]);

  const fetchSubmissions = async () => {
    try {
      const { data: readinessData, error: err1 } = await supabase.from('readiness_tests').select('*').order('created_at', { ascending: false });
      if (err1) throw err1;
      
      const { data: consultData, error: err2 } = await supabase.from('consultations').select('*').order('created_at', { ascending: false });
      if (err2) throw err2;
      
      // Map the DB snake_case to camelCase
      const mappedReadiness = (readinessData || []).map(r => ({
        ...r,
        fullName: r.full_name,
        adminNotes: r.admin_notes,
        createdAt: r.created_at,
        updatedAt: r.updated_at
      }));
      
      const mappedConsults = (consultData || []).map(c => ({
        ...c,
        fullName: c.full_name,
        lookingFor: c.looking_for,
        adminNotes: c.admin_notes,
        createdAt: c.created_at,
        updatedAt: c.updated_at
      }));

      setReadiness(mappedReadiness);
      setConsults(mappedConsults);
    } catch (err: any) {
      console.error(err);
      setError('Failed to fetch data. Ensure Supabase credentials are correct.');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { data, error: fetchErr } = await supabase
        .from('staff')
        .select('*')
        .eq('username', username)
        .limit(1)
        .single();
        
      if (fetchErr || !data) {
        throw new Error('Invalid mobile number or password');
      }
      
      const isValid = bcrypt.compareSync(password, data.password_hash);
      
      if (!isValid) {
        throw new Error('Invalid mobile number or password');
      }
      
      localStorage.setItem('adminAuth', 'true');
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
  };

  const updateSubmission = async (type: 'readiness'|'consultation', id: number, updates: any) => {
    try {
      const table = type === 'readiness' ? 'readiness_tests' : 'consultations';
      const dbUpdates = {
        status: updates.status,
        admin_notes: updates.adminNotes,
        updated_at: new Date().toISOString()
      };
      
      const { error } = await supabase.from(table).update(dbUpdates).eq('id', id);
      if (error) throw error;
      
      fetchSubmissions();
    } catch (err: any) {
      console.error(err);
      alert('Failed to update: ' + err.message);
    }
  };

  // Filter Logic
  const filterItems = (items: any[]) => {
    return items.filter(item => {
      // Name Search
      if (searchName.trim()) {
        const name = (item.fullName || item.full_name || '').toLowerCase();
        if (!name.includes(searchName.trim().toLowerCase())) return false;
      }

      // Phone Search
      if (searchPhone.trim()) {
        const phone = (item.phone || '').toLowerCase();
        if (!phone.includes(searchPhone.trim().toLowerCase())) return false;
      }

      // Buyer Type Filter
      if (buyerTypeFilter) {
        const itemType = (item.category || item.buyerType || item.lookingFor || '').toLowerCase();
        if (!itemType.includes(buyerTypeFilter.toLowerCase())) return false;
      }

      // From Date
      if (fromDate) {
        const itemISTDate = getISTDateString(item.createdAt || item.created_at);
        if (!itemISTDate || itemISTDate < fromDate) return false;
      }

      // To Date
      if (toDate) {
        const itemISTDate = getISTDateString(item.createdAt || item.created_at);
        if (!itemISTDate || itemISTDate > toDate) return false;
      }

      return true;
    });
  };

  const filteredReadiness = filterItems(readiness);
  const filteredConsults = filterItems(consults);

  const handleClearFilters = () => {
    setSearchName('');
    setSearchPhone('');
    setBuyerTypeFilter('');
    setFromDate('');
    setToDate('');
  };

  // Download Report
  const handleDownloadReport = () => {
    const currentList = activeTab === 'readiness' ? filteredReadiness : filteredConsults;
    
    if (currentList.length === 0) {
      alert('No data available to export based on current filters.');
      return;
    }

    const headers = [
      'Name',
      'Phone Number',
      'Email',
      'Buyer Type',
      'Readiness Test Score/Marks',
      'Created Date'
    ];

    const rows = currentList.map(item => {
      const name = item.fullName || item.full_name || 'N/A';
      const phone = item.phone || 'N/A';
      const email = item.email || 'N/A';
      const buyerType = item.category || item.buyerType || item.lookingFor || 'N/A';
      const score = item.score !== undefined && item.score !== null ? item.score : (item.marks || 'N/A');
      const rawDate = item.createdAt || item.created_at;
      const createdDate = rawDate ? formatInISTDetailed(rawDate) : 'N/A';

      return [name, phone, email, buyerType, score, createdDate];
    });

    const escapeCsv = (val: any) => {
      const str = String(val ?? '');
      return `"${str.replace(/"/g, '""')}"`;
    };

    const csvRows = [
      headers.map(escapeCsv).join(','),
      ...rows.map(row => row.map(escapeCsv).join(','))
    ];

    const csvString = csvRows.join('\r\n');
    const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeTab}_report_${getISTDateString(new Date())}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const uniqueBuyerTypes = Array.from(new Set([
    'Platinum Buyer',
    'Hot Buyer',
    'Warm Buyer',
    'Cold Buyer',
    'Nurture',
    'Awareness',
    ...readiness.map(r => r.category).filter(Boolean),
    ...consults.map(c => c.lookingFor || c.category).filter(Boolean)
  ]));

  const hasActiveFilters = Boolean(searchName || searchPhone || buyerTypeFilter || fromDate || toDate);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full border border-gray-100">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-navy-900 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-gold-500" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-navy-900 text-center mb-8">Admin Dashboard</h1>
          
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
    const [notes, setNotes] = useState(item.adminNotes || '');
    const [status, setStatus] = useState(item.status || 'New');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
      setIsSaving(true);
      await updateSubmission(type, item.id, { status, adminNotes: notes });
      setIsSaving(false);
    };

    const isChanged = notes !== (item.adminNotes || '') || status !== (item.status || 'New');

    return (
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-100 flex flex-col md:flex-row gap-4 sm:gap-6 mb-4 overflow-hidden">
        <div className="flex-1 space-y-4 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
            <div className="min-w-0">
              {type === 'consultation' ? (
                <>
                  <h3 className="text-base sm:text-lg font-bold text-navy-900 break-words">{item.fullName}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm break-all">{item.email} | {item.phone}</p>
                </>
              ) : (
                <>
                  <h3 className="text-base sm:text-lg font-bold text-navy-900">Score: {item.score}/100</h3>
                  <p className="text-xs sm:text-sm font-medium text-gold-600 uppercase tracking-widest">{item.category}</p>
                  {item.fullName && (
                    <p className="text-gray-600 text-xs sm:text-sm mt-1 break-words">{item.fullName} | <span className="break-all">{item.email}</span> | {item.phone} | {item.city}</p>
                  )}
                </>
              )}
            </div>
            <div className="sm:text-right">
              <p className="text-[11px] sm:text-xs text-gray-400">Created: {formatInIST(item.createdAt || item.created_at)}</p>
              <p className="text-[11px] sm:text-xs text-gray-400">Updated: {formatInIST(item.updatedAt || item.updated_at)}</p>
            </div>
          </div>
          <div className="bg-gray-50 p-3 sm:p-4 rounded text-xs sm:text-sm overflow-x-auto">
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
        <div className="w-full md:w-72 bg-gray-50 p-3.5 sm:p-4 rounded flex flex-col gap-3 sm:gap-4">
          <div>
            <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">Status</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded text-xs sm:text-sm focus:border-navy-900 focus:ring-1 focus:ring-navy-900 outline-none bg-white min-h-[44px]"
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
              className="w-full flex-1 p-2.5 border border-gray-300 rounded text-xs sm:text-sm focus:border-navy-900 focus:ring-1 focus:ring-navy-900 outline-none resize-none min-h-[90px] bg-white"
            />
          </div>
          {isChanged && (
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-navy-900 text-white font-medium py-2.5 rounded text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-navy-800 transition-colors min-h-[44px]"
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
      <header className="bg-white shadow-sm px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-navy-900 rounded flex items-center justify-center flex-shrink-0">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-gold-500" />
          </div>
          <h1 className="text-base sm:text-xl font-bold truncate">Admin Dashboard</h1>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500 hover:text-red-500 font-medium transition-colors px-2 py-1.5 rounded min-h-[44px]"
        >
          <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Sign Out</span><span className="sm:hidden">Exit</span>
        </button>
      </header>
      
      <main className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto w-full">
        {/* Filter Card */}
        <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm border border-gray-200 mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gold-600" />
              <h2 className="font-bold text-navy-900 text-xs sm:text-sm uppercase tracking-wider">Filter Submissions</h2>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="text-xs font-semibold text-gray-500 hover:text-red-600 flex items-center gap-1 px-3 py-1.5 rounded border border-gray-200 hover:border-red-200 transition-colors min-h-[38px]"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Clear Filters
                </button>
              )}
              
              <button
                onClick={handleDownloadReport}
                className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold px-4 py-2 rounded text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-colors min-h-[38px]"
              >
                <Download className="w-4 h-4" /> Download Report (.csv)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Search Name */}
            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">Search Name</label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchName}
                  onChange={e => setSearchName(e.target.value)}
                  placeholder="e.g. Rahul"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded text-xs sm:text-sm focus:border-navy-900 focus:ring-1 focus:ring-navy-900 outline-none"
                />
              </div>
            </div>

            {/* Search Phone */}
            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">Search Phone</label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchPhone}
                  onChange={e => setSearchPhone(e.target.value)}
                  placeholder="e.g. 98765"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded text-xs sm:text-sm focus:border-navy-900 focus:ring-1 focus:ring-navy-900 outline-none"
                />
              </div>
            </div>

            {/* Buyer Type Filter */}
            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">Buyer Type</label>
              <select
                value={buyerTypeFilter}
                onChange={e => setBuyerTypeFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-xs sm:text-sm focus:border-navy-900 focus:ring-1 focus:ring-navy-900 outline-none bg-white min-h-[38px]"
              >
                <option value="">All Buyer Types</option>
                {uniqueBuyerTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* From Date */}
            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={e => setFromDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-xs sm:text-sm focus:border-navy-900 focus:ring-1 focus:ring-navy-900 outline-none bg-white min-h-[38px]"
              />
            </div>

            {/* To Date */}
            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={e => setToDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-xs sm:text-sm focus:border-navy-900 focus:ring-1 focus:ring-navy-900 outline-none bg-white min-h-[38px]"
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 sm:gap-4 mb-6 border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('readiness')}
            className={`px-3 sm:px-4 py-3 font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors whitespace-nowrap min-h-[44px] ${activeTab === 'readiness' ? 'text-navy-900 border-b-2 border-navy-900' : 'text-gray-400 hover:text-navy-900'}`}
          >
            Readiness Tests ({filteredReadiness.length} / {readiness.length})
          </button>
          <button
            onClick={() => setActiveTab('consults')}
            className={`px-3 sm:px-4 py-3 font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors whitespace-nowrap min-h-[44px] ${activeTab === 'consults' ? 'text-navy-900 border-b-2 border-navy-900' : 'text-gray-400 hover:text-navy-900'}`}
          >
            Consultations ({filteredConsults.length} / {consults.length})
          </button>
        </div>

        {/* Submissions List */}
        <div className="space-y-4">
          {activeTab === 'readiness' ? (
            filteredReadiness.length === 0 ? (
              <p className="text-gray-500 text-center py-12 bg-white rounded border border-gray-200">
                {hasActiveFilters ? 'No readiness tests match the selected filters.' : 'No readiness tests submitted yet.'}
              </p>
            ) : (
              filteredReadiness.map(r => <EditableRow key={r.id} item={r} type="readiness" />)
            )
          ) : (
            filteredConsults.length === 0 ? (
              <p className="text-gray-500 text-center py-12 bg-white rounded border border-gray-200">
                {hasActiveFilters ? 'No consultations match the selected filters.' : 'No consultations submitted yet.'}
              </p>
            ) : (
              filteredConsults.map(c => <EditableRow key={c.id} item={c} type="consultation" />)
            )
          )}
        </div>
      </main>
    </div>
  );
}
