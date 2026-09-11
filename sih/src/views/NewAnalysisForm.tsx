import React, { useState } from 'react';
import { MapPin, Coins, Store, Sparkles, ChevronRight, Key, CheckCircle } from 'lucide-react';
import type { AnalysisInput } from '../types';
import { getApiKey, setApiKey } from '../services/aiService';

interface NewAnalysisFormProps {
  onSubmit: (input: AnalysisInput) => void;
  isAnalyzing: boolean;
}

const BUSINESS_OPTIONS = [
  'Dairy Farming',
  'Poultry',
  'Goat Farming',
  'Grocery Store',
  'Tailoring',
  'Food Processing',
  'Agriculture',
  'Handicrafts',
  'Small Manufacturing',
  'Other'
];

export const NewAnalysisForm: React.FC<NewAnalysisFormProps> = ({ onSubmit, isAnalyzing }) => {
  const [apiKeyInput, setApiKeyInput] = useState(getApiKey() || '');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const activeKey = getApiKey();

  const handleSaveApiKey = (key: string) => {
    setApiKey(key.trim() || null);
    setApiKeyInput(key.trim());
  };

  const [village, setVillage] = useState('Kothapalli');
  const [mandal, setMandal] = useState('Karimnagar Rural');
  const [district, setDistrict] = useState('Karimnagar');
  const [state, setState] = useState('Telangana');
  const [radius, setRadius] = useState(10);

  const [ownCapital, setOwnCapital] = useState(100000);
  const [businessType, setBusinessType] = useState('Dairy Farming');
  const [customBusinessName, setCustomBusinessName] = useState('');

  const [gpsLat, setGpsLat] = useState<number | undefined>(undefined);
  const [gpsLng, setGpsLng] = useState<number | undefined>(undefined);
  const [isDetectingGPS, setIsDetectingGPS] = useState<boolean>(false);

  const [experience, setExperience] = useState('2 Years Family Background');
  const [availableLand, setAvailableLand] = useState('0.5 Acre Owned Plot');
  const [employees, setEmployees] = useState(2);
  const [expectedScale, setExpectedScale] = useState('Small / Cottage Scale');

  const handleAutoDetectGPS = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsDetectingGPS(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setGpsLat(lat);
        setGpsLng(lng);

        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
          .then((res) => res.json())
          .then((data) => {
            if (data && data.address) {
              const addr = data.address;
              setVillage(addr.village || addr.suburb || addr.town || addr.city || village);
              setMandal(addr.county || addr.state_district || mandal);
              setDistrict(addr.state_district || addr.county || district);
              setState(addr.state || state);
            }
          })
          .finally(() => setIsDetectingGPS(false));
      },
      (error) => {
        console.warn('GPS location error:', error.message);
        setIsDetectingGPS(false);
        alert('Could not fetch live GPS coordinates. Please type your location text manually.');
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!village || !mandal || !district || !state) {
      alert('Please complete all location fields.');
      return;
    }
    if (ownCapital <= 0) {
      alert('Please enter a valid Own Capital amount (min ₹1,000).');
      return;
    }
    if (businessType === 'Other' && !customBusinessName.trim()) {
      alert('Please specify your custom business name.');
      return;
    }

    const input: AnalysisInput = {
      location: {
        village,
        mandal,
        district,
        state,
        radius: Number(radius),
        lat: gpsLat,
        lng: gpsLng
      },
      ownCapital: Number(ownCapital),
      businessType,
      customBusinessName: businessType === 'Other' ? customBusinessName : undefined,
      experience,
      availableLand,
      employees: Number(employees),
      expectedScale
    };

    onSubmit(input);
  };

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900">New Business Analysis</h1>
        <p className="text-slate-600 text-sm">
          Enter location parameters, equity capital, and business selection to generate an instant feasibility & scheme roadmap.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-8">
        
        {/* AI ENGINE MODE & KEY STATUS */}
        <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Analysis Engine Mode</div>
                <div className="text-sm font-extrabold text-white flex items-center gap-2">
                  {activeKey ? (
                    <span className="text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-400" /> Live Gemini AI Predicted Data Active
                    </span>
                  ) : (
                    <span className="text-amber-300">
                      Offline Demo Engine (Enter Gemini API Key below for Live AI Predictions)
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowKeyInput(!showKeyInput)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer w-fit"
            >
              <Key className="w-3.5 h-3.5" />
              {activeKey ? 'Change / Update API Key' : '🔑 Enter Gemini API Key'}
            </button>
          </div>

          {(showKeyInput || !activeKey) && (
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <label className="block text-xs font-semibold text-slate-300">
                Google Gemini API Key for Live Hyper-Local Predictions:
              </label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={(e) => {
                    setApiKeyInput(e.target.value);
                    handleSaveApiKey(e.target.value);
                  }}
                  placeholder="Paste your Google Gemini API Key here..."
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                />
                {apiKeyInput && (
                  <button
                    type="button"
                    onClick={() => {
                      handleSaveApiKey('');
                    }}
                    className="px-3 py-2 text-xs font-bold text-rose-400 hover:bg-slate-800 rounded-xl border border-slate-700"
                  >
                    Clear
                  </button>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                Key is stored securely in your browser's local storage.
              </p>
            </div>
          )}
        </div>

        {/* SECTION 1: LOCATION */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-lg text-slate-900">1. Location Details</h3>
            </div>

            <button
              type="button"
              onClick={handleAutoDetectGPS}
              disabled={isDetectingGPS}
              className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer w-fit"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              {isDetectingGPS ? 'Detecting GPS...' : gpsLat ? 'GPS Location Detected!' : '📍 Auto-Detect Live GPS'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Village / Town *
              </label>
              <input
                type="text"
                value={village}
                onFocus={(e) => e.target.select()}
                onChange={(e) => setVillage(e.target.value)}
                placeholder="e.g. Kothapalli"
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Mandal / Block *
              </label>
              <input
                type="text"
                value={mandal}
                onFocus={(e) => e.target.select()}
                onChange={(e) => setMandal(e.target.value)}
                placeholder="e.g. Karimnagar Rural"
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                District *
              </label>
              <input
                type="text"
                value={district}
                onFocus={(e) => e.target.select()}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="e.g. Karimnagar"
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                State *
              </label>
              <input
                type="text"
                value={state}
                onFocus={(e) => e.target.select()}
                onChange={(e) => setState(e.target.value)}
                placeholder="e.g. Telangana"
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Analysis Radius (km)
              </label>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {radius} km (Default: 10 km)
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="25"
              step="1"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>
        </div>

        {/* SECTION 2: FINANCIAL CAPITAL */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <Coins className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-lg text-slate-900">2. Financial Capital</h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Own Capital / Equity Contribution (₹) *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-slate-500 font-bold">₹</span>
              <input
                type="number"
                min="5000"
                step="5000"
                value={ownCapital}
                onFocus={(e) => e.target.select()}
                onChange={(e) => setOwnCapital(Number(e.target.value))}
                placeholder="e.g. 100000"
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-8 pr-4 py-2.5 text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Initial project cost and equity ratio can be adjusted dynamically in Module 2.
            </p>
          </div>
        </div>

        {/* SECTION 3: BUSINESS CHOICE */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <Store className="w-5 h-5 text-teal-600" />
            <h3 className="font-bold text-lg text-slate-900">3. Business Selection</h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Select Business Type *
            </label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white cursor-pointer"
            >
              {BUSINESS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {businessType === 'Other' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Specify Custom Business Name *
              </label>
              <input
                type="text"
                value={customBusinessName}
                onChange={(e) => setCustomBusinessName(e.target.value)}
                placeholder="e.g. Bio-Fertilizer Unit, Solar Pump Maintenance"
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>
          )}
        </div>

        {/* SECTION 4: OPTIONAL DETAILS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-base text-slate-700">4. Optional Operational Context</h3>
            <span className="text-xs text-slate-400 font-medium">Optional</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Previous Experience</label>
              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="e.g. 2 Years in farming"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-600 mb-1">Available Land / Shop</label>
              <input
                type="text"
                value={availableLand}
                onChange={(e) => setAvailableLand(e.target.value)}
                placeholder="e.g. Own shop space in village"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-600 mb-1">Planned Employees</label>
              <input
                type="number"
                min="1"
                max="20"
                value={employees}
                onChange={(e) => setEmployees(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-600 mb-1">Expected Scale</label>
              <input
                type="text"
                value={expectedScale}
                onChange={(e) => setExpectedScale(e.target.value)}
                placeholder="e.g. Micro unit"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON (Requirement 6) */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isAnalyzing}
            className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-base rounded-2xl shadow-xl hover:shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="w-5 h-5 animate-spin" /> Analyzing Local Market & Schemes...
              </>
            ) : (
              <>
                Generate Feasibility Report <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};
