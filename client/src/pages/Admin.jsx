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
  Car as CarIcon,
  AlertCircle,
  Compass,
  Plus,
  Edit2,
  Trash2,
  X,
  Sparkles,
  Layers,
  UploadCloud
} from 'lucide-react';
import {
  adminLogin,
  getEnquiries,
  updateEnquiryStatus,
  getPackages,
  createPackage,
  updatePackage,
  deletePackage,
  getCars,
  createCar,
  updateCar,
  deleteCar
} from '../utils/api.js';
import DragDropUploader from '../components/DragDropUploader.jsx';

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

  // Active Tab: 'enquiries', 'packages', 'cars'
  const [activeTab, setActiveTab] = useState('enquiries');

  // Enquiries State
  const [enquiries, setEnquiries] = useState([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);
  const [filter, setFilter] = useState('');
  const [actionMsg, setActionMsg] = useState('');

  // Packages State
  const [packages, setPackages] = useState([]);
  const [loadingPackages, setLoadingPackages] = useState(false);
  const [pkgModalOpen, setPkgModalOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState(null);
  const [pkgForm, setPkgForm] = useState({
    title: '',
    category: 'Pilgrimage Yatra',
    duration: '',
    startingPrice: '',
    pickupLocation: 'Una Railway Station / Una Town',
    description: '',
    highlights: '',
    itinerary: '',
    inclusions: '',
    image: '',
    featured: false,
  });

  // Cars State
  const [cars, setCars] = useState([]);
  const [loadingCars, setLoadingCars] = useState(false);
  const [carModalOpen, setCarModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [carForm, setCarForm] = useState({
    name: '',
    category: 'Sedan',
    tag: 'Budget & Business',
    passengers: 'Up to 4 Passengers',
    luggage: '2 Large + 2 Small Bags',
    ideal: '',
    features: '',
    startingPrice: '₹11/km',
    image: '',
  });

  useEffect(() => {
    if (token) {
      if (activeTab === 'enquiries') fetchEnquiries();
      if (activeTab === 'packages') fetchPackagesList();
      if (activeTab === 'cars') fetchCarsList();
    }
  }, [token, activeTab, filter]);

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
    setPackages([]);
    setCars([]);
  }

  // Enquiries Handlers
  async function fetchEnquiries() {
    setLoadingEnquiries(true);
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
      setLoadingEnquiries(false);
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

  // Packages Handlers
  async function fetchPackagesList() {
    setLoadingPackages(true);
    try {
      const res = await getPackages();
      setPackages(res.items || []);
    } catch (err) {
      setActionMsg(err.message);
    } finally {
      setLoadingPackages(false);
    }
  }

  function openAddPackage() {
    setEditingPkg(null);
    setPkgForm({
      title: '',
      category: 'Pilgrimage Yatra',
      duration: '',
      startingPrice: '',
      pickupLocation: 'Una Railway Station / Una Town',
      description: '',
      highlights: '',
      itinerary: '',
      inclusions: '',
      image: '',
      featured: false,
    });
    setPkgModalOpen(true);
  }

  function openEditPackage(pkg) {
    setEditingPkg(pkg);
    setPkgForm({
      title: pkg.title || '',
      category: pkg.category || 'Pilgrimage Yatra',
      duration: pkg.duration || '',
      startingPrice: pkg.startingPrice || '',
      pickupLocation: pkg.pickupLocation || 'Una Railway Station / Una Town',
      description: pkg.description || '',
      highlights: Array.isArray(pkg.highlights) ? pkg.highlights.join('\n') : '',
      itinerary: Array.isArray(pkg.itinerary) ? pkg.itinerary.join('\n') : '',
      inclusions: Array.isArray(pkg.inclusions) ? pkg.inclusions.join('\n') : '',
      image: pkg.image || '',
      featured: Boolean(pkg.featured),
    });
    setPkgModalOpen(true);
  }

  async function handleSavePackage(e) {
    e.preventDefault();
    try {
      if (editingPkg) {
        await updatePackage(token, editingPkg._id, pkgForm);
      } else {
        await createPackage(token, pkgForm);
      }
      setPkgModalOpen(false);
      fetchPackagesList();
    } catch (err) {
      alert('Save failed: ' + err.message);
    }
  }

  async function handleDeletePackage(id, title) {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await deletePackage(token, id);
      setPackages((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  }

  // Cars Handlers
  async function fetchCarsList() {
    setLoadingCars(true);
    try {
      const res = await getCars();
      setCars(res.items || []);
    } catch (err) {
      setActionMsg(err.message);
    } finally {
      setLoadingCars(false);
    }
  }

  function openAddCar() {
    setEditingCar(null);
    setCarForm({
      name: '',
      category: 'Sedan',
      tag: 'Budget & Business',
      passengers: 'Up to 4 Passengers',
      luggage: '2 Large + 2 Small Bags',
      ideal: '',
      features: '',
      startingPrice: '₹11/km',
      image: '',
    });
    setCarModalOpen(true);
  }

  function openEditCar(car) {
    setEditingCar(car);
    setCarForm({
      name: car.name || '',
      category: car.category || 'Sedan',
      tag: car.tag || '',
      passengers: car.passengers || 'Up to 4 Passengers',
      luggage: car.luggage || '2 Large + 2 Small Bags',
      ideal: car.ideal || '',
      features: Array.isArray(car.features) ? car.features.join('\n') : '',
      startingPrice: car.startingPrice || '₹11/km',
      image: car.image || '',
    });
    setCarModalOpen(true);
  }

  async function handleSaveCar(e) {
    e.preventDefault();
    try {
      if (editingCar) {
        await updateCar(token, editingCar._id, carForm);
      } else {
        await createCar(token, carForm);
      }
      setCarModalOpen(false);
      fetchCarsList();
    } catch (err) {
      alert('Save failed: ' + err.message);
    }
  }

  async function handleDeleteCar(id, name) {
    if (!window.confirm(`Are you sure you want to delete car "${name}"?`)) return;
    try {
      await deleteCar(token, id);
      setCars((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  }

  if (!token) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center bg-mist py-12 px-4 sm:px-6 lg:px-8">
        <Helmet>
          <title>Admin Login | Radhe Una Taxi Service</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="max-w-md w-full space-y-8 bg-white p-8 border border-slate-200 shadow-md rounded-xl">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-navy/10 text-navy flex items-center justify-center">
              <ShieldCheck size={28} />
            </div>
            <h1 className="mt-4 text-2xl font-extrabold text-navy">Admin Portal Login</h1>
            <p className="mt-2 text-xs text-slate-500">Sign in to manage booking enquiries, tour packages, and cars</p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleLogin}>
            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded flex items-center gap-2">
                <AlertCircle size={16} />
                <span>{loginError}</span>
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase">Admin Username / Email</label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@vipankumartour"
                className="mt-1 w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:border-sky"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:border-sky"
              />
            </div>
            <button
              type="submit"
              disabled={loginLoading}
              className="btn btn-primary w-full justify-center !py-2.5 font-bold"
            >
              {loginLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mist/60 py-8">
      <Helmet>
        <title>Admin Dashboard | Radhe Una Taxi Service</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="wrap">
        {/* Header Bar */}
        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded font-mono text-xs font-bold">Authenticated</span>
              <h1 className="text-2xl font-bold text-navy">Radhe Una Taxi Control Center</h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">Manage customer enquiries, customize tour packages &amp; update cab fleet</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (activeTab === 'enquiries') fetchEnquiries();
                if (activeTab === 'packages') fetchPackagesList();
                if (activeTab === 'cars') fetchCarsList();
              }}
              className="btn btn-outline-dark !py-2 text-xs"
              title="Refresh Current Tab"
            >
              <RefreshCw size={14} /> Refresh
            </button>
            <button
              onClick={handleLogout}
              className="btn btn-outline-dark !py-2 text-xs !border-red-300 text-red-600 hover:!bg-red-50"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-6 flex border-b border-slate-200 gap-2 bg-white px-4 pt-2 rounded-t-xl">
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`py-3 px-5 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'enquiries'
                ? 'border-navy text-navy'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calendar size={16} />
            <span>Booking Enquiries</span>
            <span className="ml-1.5 px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-700 font-mono">
              {enquiries.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('packages')}
            className={`py-3 px-5 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'packages'
                ? 'border-navy text-navy'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Compass size={16} />
            <span>Tour Packages</span>
            <span className="ml-1.5 px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-700 font-mono">
              {packages.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('cars')}
            className={`py-3 px-5 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'cars'
                ? 'border-navy text-navy'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <CarIcon size={16} />
            <span>Cars / Fleet</span>
            <span className="ml-1.5 px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-700 font-mono">
              {cars.length}
            </span>
          </button>
        </div>

        {/* TAB 1: ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div className="bg-white border-x border-b border-slate-200 p-6 rounded-b-xl shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-lg font-bold text-navy">Customer Booking Inquiries</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">Filter:</span>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none"
                >
                  <option value="">All Statuses</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {loadingEnquiries ? (
              <div className="text-center py-12 text-slate-500">Loading enquiries...</div>
            ) : enquiries.length === 0 ? (
              <div className="text-center py-12 text-slate-400">No enquiries found.</div>
            ) : (
              <div className="space-y-4">
                {enquiries.map((item) => (
                  <div key={item._id} className="border border-slate-200 p-5 rounded-lg hover:shadow-sm transition bg-white flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-base font-bold text-navy">{item.name}</span>
                        <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full border ${STATUS_COLORS[item.status] || 'bg-slate-100'}`}>
                          {item.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                        <span className="flex items-center gap-1 font-semibold text-slate-800">
                          <Phone size={13} className="text-sky" /> {item.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={13} className="text-sky" /> {item.pickup} &rarr; {item.drop}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={13} className="text-sky" /> {item.date} {item.time && `@ ${item.time}`}
                        </span>
                        <span className="flex items-center gap-1">
                          <CarIcon size={13} className="text-sky" /> {item.vehicle || 'Any cab'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users size={13} className="text-sky" /> {item.passengers || 1} Pax
                        </span>
                      </div>
                      {item.notes && (
                        <p className="text-xs text-slate-500 italic pt-1">Notes: "{item.notes}"</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 self-end lg:self-center">
                      <a
                        href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(item.name)}%2C%20greetings%20from%20Radhe%20Una%20Taxi%20Service.%20Regarding%20your%20cab%20booking%20enquiry...`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-dark !py-1.5 !px-3 text-xs !bg-[#128C4A] !text-white !border-[#128C4A]"
                      >
                        <MessageCircle size={14} /> WhatsApp
                      </a>
                      <a href={`tel:${item.phone}`} className="btn btn-outline-dark !py-1.5 !px-3 text-xs">
                        <Phone size={14} /> Call
                      </a>
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item._id, e.target.value)}
                        className="px-2 py-1.5 border border-slate-300 rounded text-xs bg-slate-50 font-semibold"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TOUR PACKAGES */}
        {activeTab === 'packages' && (
          <div className="bg-white border-x border-b border-slate-200 p-6 rounded-b-xl shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-navy">Manage Tour &amp; Pilgrimage Packages</h2>
                <p className="text-xs text-slate-500">Upload new packages, edit details, or drag &amp; drop photos</p>
              </div>
              <button onClick={openAddPackage} className="btn btn-primary !py-2 text-xs">
                <Plus size={16} /> Add New Package
              </button>
            </div>

            {loadingPackages ? (
              <div className="text-center py-12 text-slate-500">Loading packages...</div>
            ) : packages.length === 0 ? (
              <div className="text-center py-12 text-slate-400">No tour packages in database.</div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {packages.map((pkg) => (
                  <div key={pkg._id} className="border border-slate-200 rounded-lg overflow-hidden flex flex-col justify-between bg-white shadow-sm hover:shadow transition">
                    <div>
                      <div className="h-44 bg-slate-100 relative">
                        {pkg.image ? (
                          <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                            No custom image (using default)
                          </div>
                        )}
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[11px] font-extrabold bg-navy/90 text-sun">
                          {pkg.category}
                        </span>
                        <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[11px] font-extrabold bg-white text-navy shadow">
                          {pkg.startingPrice}
                        </span>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                          <Clock size={12} className="text-sky" /> {pkg.duration}
                        </div>
                        <h3 className="font-bold text-navy text-base line-clamp-1">{pkg.title}</h3>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1">{pkg.description}</p>
                      </div>
                    </div>

                    <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between mt-2">
                      <span className="text-[11px] text-slate-400 font-mono">slug: {pkg.slug}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditPackage(pkg)}
                          className="p-1.5 text-slate-600 hover:text-navy hover:bg-slate-100 rounded"
                          title="Edit package"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeletePackage(pkg._id, pkg.title)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                          title="Delete package"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CARS / FLEET */}
        {activeTab === 'cars' && (
          <div className="bg-white border-x border-b border-slate-200 p-6 rounded-b-xl shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-navy">Manage Taxi Fleet &amp; Vehicles</h2>
                <p className="text-xs text-slate-500">Upload new cabs, adjust specifications, or drag &amp; drop photos</p>
              </div>
              <button onClick={openAddCar} className="btn btn-primary !py-2 text-xs">
                <Plus size={16} /> Add New Car
              </button>
            </div>

            {loadingCars ? (
              <div className="text-center py-12 text-slate-500">Loading fleet...</div>
            ) : cars.length === 0 ? (
              <div className="text-center py-12 text-slate-400">No cars in database.</div>
            ) : (
              <div className="grid gap-6 md:grid-cols-3">
                {cars.map((car) => (
                  <div key={car._id} className="border border-slate-200 rounded-lg overflow-hidden flex flex-col justify-between bg-white shadow-sm hover:shadow transition">
                    <div>
                      <div className="h-44 bg-slate-100 relative">
                        {car.image ? (
                          <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                            No custom image
                          </div>
                        )}
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[11px] font-extrabold bg-navy/90 text-sun">
                          {car.tag || car.category}
                        </span>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-navy text-base">{car.name}</h3>
                        <p className="text-xs text-sky-dark font-semibold mt-1">
                          {car.passengers} · {car.luggage}
                        </p>
                        <p className="text-xs text-slate-500 mt-2"><b>Ideal:</b> {car.ideal}</p>
                      </div>
                    </div>

                    <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between mt-2">
                      <span className="text-xs font-bold text-navy">{car.startingPrice}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditCar(car)}
                          className="p-1.5 text-slate-600 hover:text-navy hover:bg-slate-100 rounded"
                          title="Edit car"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteCar(car._id, car.name)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                          title="Delete car"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL: ADD / EDIT PACKAGE */}
      {pkgModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 className="text-lg font-bold text-navy">
                {editingPkg ? `Edit Package: ${editingPkg.title}` : 'Add New Tour Package'}
              </h3>
              <button onClick={() => setPkgModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSavePackage} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700">Package Title *</label>
                <input
                  type="text"
                  required
                  value={pkgForm.title}
                  onChange={(e) => setPkgForm({ ...pkgForm, title: e.target.value })}
                  placeholder="e.g. Manali &amp; Solang Valley Holiday Package"
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded text-sm focus:border-sky"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700">Category</label>
                  <select
                    value={pkgForm.category}
                    onChange={(e) => setPkgForm({ ...pkgForm, category: e.target.value })}
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded text-sm focus:border-sky bg-white"
                  >
                    <option value="Pilgrimage Yatra">Pilgrimage Yatra</option>
                    <option value="Hill Station Tour">Hill Station Tour</option>
                    <option value="Temple Special">Temple Special</option>
                    <option value="Adventure & Trekking">Adventure &amp; Trekking</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700">Duration *</label>
                  <input
                    type="text"
                    required
                    value={pkgForm.duration}
                    onChange={(e) => setPkgForm({ ...pkgForm, duration: e.target.value })}
                    placeholder="e.g. 2 Days / 1 Night"
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded text-sm focus:border-sky"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700">Starting Price *</label>
                  <input
                    type="text"
                    required
                    value={pkgForm.startingPrice}
                    onChange={(e) => setPkgForm({ ...pkgForm, startingPrice: e.target.value })}
                    placeholder="e.g. ₹4,999"
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded text-sm focus:border-sky"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700">Pickup Location</label>
                <input
                  type="text"
                  value={pkgForm.pickupLocation}
                  onChange={(e) => setPkgForm({ ...pkgForm, pickupLocation: e.target.value })}
                  placeholder="Una Railway Station / Una Town"
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded text-sm focus:border-sky"
                />
              </div>

              {/* Drag and Drop Image Uploader (NO URL form) */}
              <div>
                <DragDropUploader
                  value={pkgForm.image}
                  onChange={(url) => setPkgForm({ ...pkgForm, image: url })}
                  token={token}
                  folder="packages"
                  label="Package Photo (Drag & Drop File)"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={pkgForm.description}
                  onChange={(e) => setPkgForm({ ...pkgForm, description: e.target.value })}
                  placeholder="Detailed trip overview..."
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded text-sm focus:border-sky"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700">Highlights (One per line)</label>
                <textarea
                  rows={3}
                  value={pkgForm.highlights}
                  onChange={(e) => setPkgForm({ ...pkgForm, highlights: e.target.value })}
                  placeholder="Hadimba Devi historic temple&#10;Solang Valley adventure sports&#10;Atal Tunnel gateway"
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded text-sm focus:border-sky"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setPkgModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded text-sm text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary !py-2 text-sm font-bold">
                  {editingPkg ? 'Save Changes' : 'Create Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT CAR */}
      {carModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 className="text-lg font-bold text-navy">
                {editingCar ? `Edit Car: ${editingCar.name}` : 'Add New Fleet Car'}
              </h3>
              <button onClick={() => setCarModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveCar} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700">Car Name *</label>
                <input
                  type="text"
                  required
                  value={carForm.name}
                  onChange={(e) => setCarForm({ ...carForm, name: e.target.value })}
                  placeholder="e.g. SUV (Toyota Innova Crysta)"
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded text-sm focus:border-sky"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700">Category</label>
                  <select
                    value={carForm.category}
                    onChange={(e) => setCarForm({ ...carForm, category: e.target.value })}
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded text-sm focus:border-sky bg-white"
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Tempo Traveller">Tempo Traveller</option>
                    <option value="Hatchback">Hatchback</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700">Tag / Badge</label>
                  <input
                    type="text"
                    value={carForm.tag}
                    onChange={(e) => setCarForm({ ...carForm, tag: e.target.value })}
                    placeholder="e.g. Family &amp; Hill Tours"
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded text-sm focus:border-sky"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700">Passenger Capacity</label>
                  <input
                    type="text"
                    value={carForm.passengers}
                    onChange={(e) => setCarForm({ ...carForm, passengers: e.target.value })}
                    placeholder="e.g. 6 to 7 Passengers"
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded text-sm focus:border-sky"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700">Luggage Space</label>
                  <input
                    type="text"
                    value={carForm.luggage}
                    onChange={(e) => setCarForm({ ...carForm, luggage: e.target.value })}
                    placeholder="e.g. Roof Carrier + Boot"
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded text-sm focus:border-sky"
                  />
                </div>
              </div>

              {/* Drag and Drop Image Uploader (NO URL form) */}
              <div>
                <DragDropUploader
                  value={carForm.image}
                  onChange={(url) => setCarForm({ ...carForm, image: url })}
                  token={token}
                  folder="cars"
                  label="Car Photo (Drag & Drop File)"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700">Ideal For</label>
                <input
                  type="text"
                  value={carForm.ideal}
                  onChange={(e) => setCarForm({ ...carForm, ideal: e.target.value })}
                  placeholder="e.g. Dharamshala, Manali, family trips"
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded text-sm focus:border-sky"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700">Key Features (One per line)</label>
                <textarea
                  rows={3}
                  value={carForm.features}
                  onChange={(e) => setCarForm({ ...carForm, features: e.target.value })}
                  placeholder="Powerful Dual AC&#10;Smooth Hill Suspension&#10;Reclining Captain Seats"
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded text-sm focus:border-sky"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700">Starting Rate</label>
                <input
                  type="text"
                  value={carForm.startingPrice}
                  onChange={(e) => setCarForm({ ...carForm, startingPrice: e.target.value })}
                  placeholder="e.g. ₹16/km"
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded text-sm focus:border-sky"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setCarModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded text-sm text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary !py-2 text-sm font-bold">
                  {editingCar ? 'Save Changes' : 'Create Car'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
