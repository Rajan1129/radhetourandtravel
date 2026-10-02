import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Phone,
  MessageCircle,
  Calendar,
  Users,
  MapPin,
  RefreshCw,
  LogOut,
  ShieldCheck,
  CheckCircle,
  Clock,
  Car,
  AlertCircle
} from 'lucide-react';
import { adminLogin, getEnquiries, updateEnquiryStatus } from '../utils/api.js';

const STATUS_COLORS = {
  new: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  contacted: 'bg-blue-100 text-blue-800 border-blue-300',
  confirmed: 'bg-purple-100 text-purple-800 border-purple-300',
  completed: 'bg-slate-100 text-slate-800 border-slate-300',
  cancelled: 'bg-red-100 text-red-800 border-red-300',
};

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem('radhe_admin_token') || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');
  const [actionMsg, setActionMsg] = useState('');

  useEffect(() => {
    if (token) fetchList();
  }, [token, filter]);

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const data = await adminLogin(email, password);
      if (data.token) {
        localStorage.setItem('radhe_admin_token', data.token);
        setToken(data.token);
        setPassword('');
      } else {
        setLoginError('Login failed: Token not received.');
      }
    } catch (err) {
      setLoginError(err.message || 'Invalid credentials');
    } finally {
      setLoginLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem('radhe_admin_token');
    setToken('');
    setEnquiries([]);
  }

  async function fetchList() {
    setLoading(true);
    setActionMsg('');
    try {
      const res = await getEnquiries(token, filter);
      setEnquiries(res.items || []);
    } catch (err) {
      if (err.message.includes('Authentication') || err.message.includes('401')) {
        handleLogout();
      } else {
        setActionMsg(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id, newStatus) {
    try {
      await updateEnquiryStatus(token, id, newStatus);
      setEnquiries((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
      );
    } catch (err) {
      alert(`Could not update status: ${err.message}`);
    }
  }

  if (!token) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center bg-mist py-12 px-4 sm:px-6 lg:px-8">
        <Helmet>
          <title>Admin Portal Login | Radhe Una Taxi Service</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="w-full max-w-md space-y-8 bg-white p-8 border border-slate-200 shadow-md">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy text-sun">
              <ShieldCheck size={32} />
            </div>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-navy">Admin Portal</h1>
            <p className="mt-2 text-sm text-slate-dark">
              Sign in to manage booking enquiries &amp; customer rides
            </p>
          </div>

          {loginError && (
            <div className="flex items-center gap-2 border border-red-300 bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle size={18} className="shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form className="mt-6 space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-semibold text-deep" htmlFor="admin-email">
                Username / Email
              </label>
              <input
                id="admin-email"
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@vipankumartour"
                className="field mt-1"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-deep" htmlFor="admin-pass">
                Password
              </label>
              <input
                id="admin-pass"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="field mt-1"
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="btn btn-primary w-full !py-3 justify-center text-base"
            >
              {loginLoading ? 'Signing in...' : 'Sign In to Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const counts = {
    total: enquiries.length,
    new: enquiries.filter((e) => e.status === 'new').length,
    contacted: enquiries.filter((e) => e.status === 'contacted').length,
    confirmed: enquiries.filter((e) => e.status === 'confirmed').length,
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Helmet>
        <title>Admin Dashboard | Radhe Una Taxi Service</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Top Header */}
      <div className="border-b border-slate-200 bg-white py-4 shadow-sm">
        <div className="wrap flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-navy flex items-center gap-2">
              <ShieldCheck className="text-sky-dark" size={24} />
              Radhe Una Taxi — Admin Dashboard
            </h1>
            <p className="text-xs text-slate-dark">Logged in as admin@vipankumartour</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchList}
              disabled={loading}
              className="btn btn-outline-dark !py-2 !px-3 text-xs flex items-center gap-1.5"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="btn bg-red-600 hover:bg-red-700 text-white !py-2 !px-3 text-xs flex items-center gap-1.5"
            >
              <LogOut size={14} />
              Log Out
            </button>
          </div>
        </div>
      </div>

      <div className="wrap py-8">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase text-slate-dark">Total Leads</p>
            <p className="mt-2 text-2xl font-extrabold text-navy">{counts.total}</p>
          </div>
          <div className="border border-emerald-200 bg-emerald-50/50 p-4">
            <p className="text-xs font-semibold uppercase text-emerald-800">New / Pending</p>
            <p className="mt-2 text-2xl font-extrabold text-emerald-600">{counts.new}</p>
          </div>
          <div className="border border-blue-200 bg-blue-50/50 p-4">
            <p className="text-xs font-semibold uppercase text-blue-800">Contacted</p>
            <p className="mt-2 text-2xl font-extrabold text-blue-600">{counts.contacted}</p>
          </div>
          <div className="border border-purple-200 bg-purple-50/50 p-4">
            <p className="text-xs font-semibold uppercase text-purple-800">Confirmed</p>
            <p className="mt-2 text-2xl font-extrabold text-purple-600">{counts.confirmed}</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          {['', 'new', 'contacted', 'confirmed', 'completed', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-colors ${
                filter === st
                  ? 'bg-navy text-white'
                  : 'bg-white text-slate-dark border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {st || 'All Enquiries'}
            </button>
          ))}
        </div>

        {actionMsg && (
          <div className="mt-4 border border-slate-200 bg-white p-4 text-sm text-red-600">
            {actionMsg}
          </div>
        )}

        {/* Enquiries List */}
        <div className="mt-6 space-y-4">
          {loading && enquiries.length === 0 ? (
            <div className="text-center py-12 text-slate-dark">Loading enquiries...</div>
          ) : enquiries.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-slate-300 bg-white p-8">
              <Car size={36} className="mx-auto text-slate-300" />
              <p className="mt-2 font-semibold text-slate-dark">No enquiries found for this filter.</p>
            </div>
          ) : (
            enquiries.map((enq) => {
              const travelDateFormatted = enq.travelDate
                ? new Date(enq.travelDate).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                : 'Not specified';

              const createdFormatted = enq.createdAt
                ? new Date(enq.createdAt).toLocaleString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : '';

              const cleanPhone = String(enq.phone || '').replace(/[\s-]/g, '');
              const waNumber = cleanPhone.startsWith('91')
                ? cleanPhone
                : cleanPhone.startsWith('+91')
                ? cleanPhone.slice(1)
                : `91${cleanPhone}`;

              const waText = encodeURIComponent(
                `Hello ${enq.name}, Radhe Una Taxi Service here regarding your enquiry for ${enq.pickup} to ${enq.destination} on ${travelDateFormatted}. How may we assist you?`
              );

              return (
                <div
                  key={enq._id}
                  className="border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-navy">{enq.name}</span>
                        <span
                          className={`border px-2 py-0.5 text-xs font-bold uppercase rounded-full ${
                            STATUS_COLORS[enq.status] || 'bg-slate-100'
                          }`}
                        >
                          {enq.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-dark mt-0.5">
                        Received on {createdFormatted} · Service: <b>{enq.serviceType}</b>
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={`tel:${cleanPhone}`}
                        className="btn btn-primary !py-1.5 !px-3 text-xs flex items-center gap-1"
                      >
                        <Phone size={13} /> Call: {enq.phone}
                      </a>
                      <a
                        href={`https://wa.me/${waNumber}?text=${waText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-wa !py-1.5 !px-3 text-xs flex items-center gap-1"
                      >
                        <MessageCircle size={13} /> WhatsApp
                      </a>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin size={16} className="text-sky-dark mt-0.5 shrink-0" />
                      <div>
                        <span className="block text-xs text-slate-dark">Pickup</span>
                        <span className="font-semibold text-deep">{enq.pickup}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                      <div>
                        <span className="block text-xs text-slate-dark">Destination</span>
                        <span className="font-semibold text-deep">{enq.destination}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Calendar size={16} className="text-navy mt-0.5 shrink-0" />
                      <div>
                        <span className="block text-xs text-slate-dark">Travel Date</span>
                        <span className="font-semibold text-deep">{travelDateFormatted}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Users size={16} className="text-navy mt-0.5 shrink-0" />
                      <div>
                        <span className="block text-xs text-slate-dark">Passengers</span>
                        <span className="font-semibold text-deep">{enq.passengers} Person(s)</span>
                      </div>
                    </div>
                  </div>

                  {enq.message && (
                    <div className="mt-3 bg-slate-50 p-2.5 text-xs text-slate-dark border-l-2 border-sky">
                      <b>Customer Note:</b> {enq.message}
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs">
                    <span className="text-slate-dark">Change Lead Status:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['new', 'contacted', 'confirmed', 'completed', 'cancelled'].map((st) => (
                        <button
                          key={st}
                          disabled={enq.status === st}
                          onClick={() => handleStatusChange(enq._id, st)}
                          className={`px-2.5 py-1 font-semibold rounded border uppercase text-[10px] ${
                            enq.status === st
                              ? 'bg-deep text-white border-deep opacity-90'
                              : 'bg-white border-slate-300 text-slate-dark hover:bg-slate-100'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
