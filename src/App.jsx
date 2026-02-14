import React, { useState, useEffect, useMemo } from 'react';
import { 
  Play, 
  DollarSign, 
  BarChart3, 
  Globe, 
  Target, 
  Info, 
  Music,
  TrendingUp,
  Users,
  Plus,
  Trash2,
  RefreshCcw,
  Search
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip,
} from 'recharts';

/**
 * BASE DE DATOS DE PAÍSES Y TIERS
 * Basado en los archivos CSV proporcionados.
 */
const COUNTRY_DB = [
  // TIER 1 (High Revenue ~0.0035 - 0.0050)
  { name: 'United States', rate: 0.0040, tier: 1, code: 'US' },
  { name: 'United Kingdom', rate: 0.0035, tier: 1, code: 'GB' },
  { name: 'Germany', rate: 0.0035, tier: 1, code: 'DE' },
  { name: 'Australia', rate: 0.0035, tier: 1, code: 'AU' },
  { name: 'Canada', rate: 0.0035, tier: 1, code: 'CA' },
  { name: 'Netherlands', rate: 0.0035, tier: 1, code: 'NL' },
  { name: 'New Zealand', rate: 0.0035, tier: 1, code: 'NZ' },
  { name: 'Switzerland', rate: 0.0050, tier: 1, code: 'CH' },
  { name: 'Ireland', rate: 0.0035, tier: 1, code: 'IE' },
  { name: 'Norway', rate: 0.0045, tier: 1, code: 'NO' },
  { name: 'Denmark', rate: 0.0040, tier: 1, code: 'DK' },
  { name: 'Sweden', rate: 0.0035, tier: 1, code: 'SE' },

  // TIER 2 (Med-High ~0.0030 - 0.0040)
  { name: 'France', rate: 0.0035, tier: 2, code: 'FR' },
  { name: 'Spain', rate: 0.0030, tier: 2, code: 'ES' },
  { name: 'Italy', rate: 0.0030, tier: 2, code: 'IT' },
  { name: 'Belgium', rate: 0.0035, tier: 2, code: 'BE' },
  { name: 'Austria', rate: 0.0035, tier: 2, code: 'AT' },
  { name: 'Finland', rate: 0.0035, tier: 2, code: 'FI' },

  // TIER 3 (Medium ~0.0020 - 0.0030)
  { name: 'Turkey', rate: 0.0025, tier: 3, code: 'TR' },
  { name: 'Israel', rate: 0.0030, tier: 3, code: 'IL' },
  { name: 'Singapore', rate: 0.0028, tier: 3, code: 'SG' },
  { name: 'Taiwan', rate: 0.0025, tier: 3, code: 'TW' },
  { name: 'Hong Kong', rate: 0.0025, tier: 3, code: 'HK' },
  { name: 'Japan', rate: 0.0025, tier: 3, code: 'JP' },

  // TIER 4 (LatAm / Developing ~0.0012 - 0.0020)
  { name: 'Mexico', rate: 0.0016, tier: 4, code: 'MX' },
  { name: 'Brazil', rate: 0.0016, tier: 4, code: 'BR' },
  { name: 'Colombia', rate: 0.0016, tier: 4, code: 'CO' },
  { name: 'Argentina', rate: 0.0014, tier: 4, code: 'AR' },
  { name: 'Chile', rate: 0.0018, tier: 4, code: 'CL' },
  { name: 'Peru', rate: 0.0016, tier: 4, code: 'PE' },
  { name: 'Ecuador', rate: 0.0016, tier: 4, code: 'EC' },
  { name: 'Costa Rica', rate: 0.0016, tier: 4, code: 'CR' },
  { name: 'Guatemala', rate: 0.0015, tier: 4, code: 'GT' },
  { name: 'Uruguay', rate: 0.0018, tier: 4, code: 'UY' },
  { name: 'Paraguay', rate: 0.0015, tier: 4, code: 'PY' },
  { name: 'Bolivia', rate: 0.0015, tier: 4, code: 'BO' },
  { name: 'Dominican Republic', rate: 0.0015, tier: 4, code: 'DO' },
  { name: 'Panama', rate: 0.0016, tier: 4, code: 'PA' },
  
  // TIER 5 (Volume/Emerging ~0.0008 - 0.0012)
  { name: 'India', rate: 0.0010, tier: 5, code: 'IN' },
  { name: 'Philippines', rate: 0.0012, tier: 5, code: 'PH' },
  { name: 'Indonesia', rate: 0.0012, tier: 5, code: 'ID' },
  { name: 'Vietnam', rate: 0.0010, tier: 5, code: 'VN' },
  { name: 'Egypt', rate: 0.0010, tier: 5, code: 'EG' },
  { name: 'Thailand', rate: 0.0012, tier: 5, code: 'TH' },
].sort((a, b) => a.name.localeCompare(b.name));

const COLORS = ['#1DB954', '#1ed760', '#169c46', '#0f7a36', '#535353', '#b3b3b3'];

const Card = ({ children, className = "" }) => (
  <div className={`bg-[#181818] rounded-lg p-6 shadow-lg border border-[#282828] ${className}`}>
    {children}
  </div>
);

const StatBox = ({ label, value, subtext, icon: Icon, highlight = false }) => (
  <div className="bg-[#282828] p-4 rounded-md flex items-center justify-between group hover:bg-[#333] transition-colors">
    <div>
      <p className="text-[#B3B3B3] text-sm font-medium mb-1">{label}</p>
      <h3 className={`text-2xl font-bold ${highlight ? 'text-[#1DB954]' : 'text-white'}`}>{value}</h3>
      {subtext && <p className="text-xs text-[#B3B3B3] mt-1">{subtext}</p>}
    </div>
    {Icon && <Icon className={`w-8 h-8 ${highlight ? 'text-[#1DB954]' : 'text-[#535353]'} opacity-80 group-hover:opacity-100 transition-opacity`} />}
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('advanced');
  
  const [countryData, setCountryData] = useState([
    { id: 1, country: '', streams: 0, rate: 0, tier: null }
  ]);
  
  const [simpleStreams, setSimpleStreams] = useState(100000);
  const [simpleRate, setSimpleRate] = useState(0.003);

  const [goalAmount, setGoalAmount] = useState('1000');
  const [goalAvgRate, setGoalAvgRate] = useState(0.0025);

  const totalStreams = useMemo(() => countryData.reduce((acc, curr) => acc + curr.streams, 0), [countryData]);
  const totalRevenue = useMemo(() => countryData.reduce((acc, curr) => acc + (curr.streams * curr.rate), 0), [countryData]);
  const effectiveRPM = useMemo(() => totalStreams > 0 ? (totalRevenue / totalStreams) * 1000 : 0, [totalRevenue, totalStreams]);
  
  const chartData = useMemo(() => {
    const data = countryData
      .filter(item => item.country && item.streams > 0)
      .map(item => ({ name: item.country, value: item.streams * item.rate }))
      .sort((a, b) => b.value - a.value);
    
    return data.length > 0 ? data : [{ name: 'Sin datos', value: 1 }];
  }, [countryData]);

  const updateCountryStream = (id, newVal) => {
    setCountryData(prev => prev.map(c => c.id === id ? { ...c, streams: Math.max(0, Number(newVal)) } : c));
  };

  const updateCountryRate = (id, newRate) => {
    setCountryData(prev => prev.map(c => c.id === id ? { ...c, rate: Number(newRate) } : c));
  };

  const selectCountry = (id, countryName) => {
    const dbCountry = COUNTRY_DB.find(c => c.name === countryName);
    
    setCountryData(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          country: countryName,
          rate: dbCountry ? dbCountry.rate : 0,
          tier: dbCountry ? dbCountry.tier : null
        };
      }
      return c;
    }));
  };

  const addCountry = () => {
    const newId = Math.max(...countryData.map(c => c.id), 0) + 1;
    setCountryData([...countryData, { id: newId, country: '', streams: 0, rate: 0, tier: null }]);
  };

  const removeCountry = (id) => {
    if (countryData.length > 1) {
        setCountryData(countryData.filter(c => c.id !== id));
    } else {
        setCountryData([{ id: 1, country: '', streams: 0, rate: 0, tier: null }]);
    }
  };

  const resetData = () => {
    if(confirm('¿Estás seguro de limpiar toda la tabla?')) {
        setCountryData([{ id: 1, country: '', streams: 0, rate: 0, tier: null }]);
    }
  }

  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  const formatNumber = (val) => new Intl.NumberFormat('en-US').format(val);

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans selection:bg-[#1DB954] selection:text-black">
      <header className="border-b border-[#282828] bg-black sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#1DB954] p-1.5 rounded-full">
              <Music className="w-5 h-5 text-black" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">RoyaltyPro <span className="text-[#B3B3B3] font-normal text-sm ml-2">Estimador de Ingresos</span></h1>
          </div>
          <nav className="flex gap-1 bg-[#282828] p-1 rounded-full overflow-x-auto">
            {[
              { id: 'simple', label: 'Rápido', icon: Play },
              { id: 'advanced', label: 'Detallado', icon: Globe },
              { id: 'goal', label: 'Metas', icon: Target },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-[#1DB954] text-black shadow-lg shadow-green-900/20' 
                    : 'text-[#B3B3B3] hover:text-white hover:bg-[#333]'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {activeTab === 'advanced' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatBox 
                label="Ingresos Estimados" 
                value={formatCurrency(totalRevenue)} 
                subtext="Basado en los datos ingresados"
                icon={DollarSign} 
                highlight
              />
              <StatBox 
                label="Total Streams" 
                value={formatNumber(totalStreams)} 
                subtext="Volumen manual total"
                icon={BarChart3} 
              />
              <StatBox 
                label="RPM Efectivo" 
                value={`$${effectiveRPM.toFixed(2)}`} 
                subtext="Ingreso promedio por 1,000 streams"
                icon={TrendingUp} 
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <Card>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                      <Globe className="w-5 h-5 text-[#1DB954]" />
                      Desglose por País
                    </h2>
                    <div className="flex gap-2">
                        <button onClick={resetData} className="text-xs text-[#B3B3B3] hover:text-white flex items-center gap-1 bg-[#282828] px-3 py-1.5 rounded hover:bg-[#333] transition-colors">
                            <RefreshCcw className="w-3 h-3" /> Limpiar
                        </button>
                        <button onClick={addCountry} className="text-xs text-black font-bold flex items-center gap-1 bg-[#1DB954] px-3 py-1.5 rounded hover:bg-[#1ed760] transition-colors shadow-lg shadow-green-900/20">
                            <Plus className="w-3 h-3" /> Agregar Fila
                        </button>
                    </div>
                  </div>
                  <div className="overflow-visible">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-[#282828] text-[#B3B3B3]">
                          <th className="py-3 font-medium pl-2 w-[40%]">País (Seleccionar)</th>
                          <th className="py-3 font-medium text-right w-[20%]">Streams</th>
                          <th className="py-3 font-medium text-right w-[20%]">Rate ($)</th>
                          <th className="py-3 font-medium text-right w-[15%]">Total</th>
                          <th className="py-3 font-medium w-[5%]"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#282828]">
                        {countryData.map((item) => (
                          <tr key={item.id} className="group hover:bg-[#282828] transition-colors">
                            <td className="py-2 pr-2 relative">
                              <select 
                                className={`w-full bg-[#222] border border-transparent rounded p-2 outline-none focus:border-[#1DB954] cursor-pointer appearance-none ${!item.country ? 'text-[#535353]' : 'text-white font-medium'}`}
                                value={item.country}
                                onChange={(e) => selectCountry(item.id, e.target.value)}
                              >
                                <option value="" disabled>Selecciona un país...</option>
                                {COUNTRY_DB.map(c => (
                                    <option key={c.code} value={c.name}>
                                        {c.name} (Tier {c.tier})
                                    </option>
                                ))}
                              </select>
                              {item.tier && (
                                <span className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-[10px] px-1.5 py-0.5 rounded border ${
                                    item.tier === 1 ? 'border-green-500 text-green-500' :
                                    item.tier === 2 ? 'border-blue-500 text-blue-500' :
                                    item.tier === 3 ? 'border-yellow-500 text-yellow-500' :
                                    'border-orange-500 text-orange-500'
                                } pointer-events-none hidden sm:inline-block`}>
                                    T{item.tier}
                                </span>
                              )}
                            </td>
                            <td className="py-2 text-right">
                              <input 
                                type="number" 
                                className="bg-transparent border-b border-[#333] focus:border-[#1DB954] text-right w-full p-1.5 outline-none text-white font-mono placeholder-[#333]"
                                value={item.streams || ''}
                                placeholder="0"
                                disabled={!item.country}
                                onChange={(e) => updateCountryStream(item.id, e.target.value)}
                              />
                            </td>
                            <td className="py-2 text-right">
                              <input 
                                type="number" 
                                step="0.0001"
                                className="bg-transparent text-right w-full p-1.5 outline-none text-[#B3B3B3] focus:text-white font-mono text-xs"
                                value={item.rate || ''}
                                disabled={!item.country}
                                onChange={(e) => updateCountryRate(item.id, e.target.value)}
                              />
                            </td>
                            <td className="py-2 text-right font-mono text-[#1DB954]">
                              {formatCurrency(item.streams * item.rate)}
                            </td>
                            <td className="py-2 text-center">
                                <button 
                                    onClick={() => removeCountry(item.id)}
                                    className="p-1.5 text-[#535353] hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                    title="Eliminar fila"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {countryData.length < 5 && (
                    <button onClick={addCountry} className="w-full mt-2 py-2 border border-dashed border-[#333] rounded text-[#535353] hover:text-[#1DB954] hover:border-[#1DB954] text-sm transition-all flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" /> Agregar otro país
                    </button>
                  )}
                  
                  <div className="mt-4 pt-4 border-t border-[#282828] text-xs text-[#B3B3B3] flex items-start gap-2">
                    <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>
                      Selecciona un país y el sistema cargará automáticamente la tarifa (Tier) recomendada.
                      Ajusta los streams para ver la proyección.
                    </p>
                  </div>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <h3 className="text-md font-bold mb-4 text-[#B3B3B3]">Distribución de Ingresos</h3>
                  <div className="h-64 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {chartData.map((entry, index) => (
                            <Cell 
                                key={`cell-${index}`} 
                                fill={entry.name === 'Sin datos' ? '#282828' : COLORS[index % COLORS.length]} 
                                stroke="none" 
                            />
                          ))}
                        </Pie>
                        {totalRevenue > 0 && (
                            <RechartsTooltip 
                            contentStyle={{ backgroundColor: '#181818', borderColor: '#282828', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                            formatter={(value) => formatCurrency(value)}
                            />
                        )}
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-center">
                        {totalRevenue > 0 ? (
                            <>
                                <span className="text-xs text-[#B3B3B3]">Total</span>
                                <p className="font-bold text-white text-lg">{formatCurrency(totalRevenue)}</p>
                            </>
                        ) : (
                            <span className="text-xs text-[#535353]">Ingresa streams</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 mt-2">
                    {totalRevenue > 0 ? chartData.slice(0, 5).map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                          <span className="text-[#B3B3B3]">{item.name}</span>
                        </div>
                        <span className="text-white font-mono">{formatCurrency(item.value)}</span>
                      </div>
                    )) : (
                        <p className="text-center text-xs text-[#535353]">La gráfica se actualizará al ingresar datos.</p>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'simple' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Calculadora Rápida</h2>
              <p className="text-[#B3B3B3]">Estimación basada en promedios globales.</p>
            </div>

            <Card className="p-8 border-[#1DB954] border-opacity-20 bg-gradient-to-b from-[#181818] to-[#121212]">
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-medium text-[#B3B3B3] mb-2">Total de Streams</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={simpleStreams}
                      onChange={(e) => setSimpleStreams(Number(e.target.value))}
                      className="w-full bg-[#282828] border border-[#333] rounded-md p-4 text-2xl font-bold text-white focus:outline-none focus:border-[#1DB954] transition-colors font-mono"
                    />
                    <Users className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#535353]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-[#B3B3B3]">Pago Promedio por Stream</label>
                    <span className="text-[#1DB954] font-mono font-bold">${simpleRate}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.001" 
                    max="0.008" 
                    step="0.0001" 
                    value={simpleRate}
                    onChange={(e) => setSimpleRate(Number(e.target.value))}
                    className="w-full h-2 bg-[#282828] rounded-lg appearance-none cursor-pointer accent-[#1DB954]"
                  />
                  <div className="flex justify-between text-xs text-[#535353] mt-2">
                    <span>$0.001 (Bajo)</span>
                    <span>$0.004 (Tier 1)</span>
                    <span>$0.008 (Muy Alto)</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#282828] text-center">
                  <p className="text-[#B3B3B3] text-sm uppercase tracking-wider mb-1">Ingreso Estimado</p>
                  <h1 className="text-5xl font-bold text-white">{formatCurrency(simpleStreams * simpleRate)}</h1>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'goal' && (
          <div className="max-w-4xl mx-auto animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">¿Cuánto quieres ganar?</h2>
                <p className="text-[#B3B3B3] mb-8">
                  Calcula cuántos streams necesitas mensualmente para alcanzar tu objetivo financiero, basado en tu mezcla de audiencia.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Meta Mensual (USD)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#535353] text-xl">$</span>
                      <input 
                        type="number" 
                        value={goalAmount}
                        onChange={(e) => setGoalAmount(e.target.value)}
                        className="w-full bg-[#181818] border border-[#333] rounded-md py-4 pl-10 pr-4 text-2xl font-bold text-white focus:outline-none focus:border-[#1DB954]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Tu Perfil de Audiencia (RPM)</label>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { label: 'Tier 1 (US/UK/EU)', val: 0.0040, desc: 'Mayoría audiencia anglosajona' },
                        { label: 'Tier 3 (LatAm/Mix)', val: 0.0025, desc: 'Mix España, México, Chile' },
                        { label: 'Tier 5 (Viral/Free)', val: 0.0012, desc: 'Alta proporción cuentas gratis' }
                      ].map((option) => (
                        <button
                          key={option.val}
                          onClick={() => setGoalAvgRate(option.val)}
                          className={`p-3 rounded-md text-left border transition-all ${
                            goalAvgRate === option.val 
                            ? 'bg-[#1DB954] bg-opacity-10 border-[#1DB954]' 
                            : 'bg-[#181818] border-[#282828] hover:border-[#535353]'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className={`font-bold ${goalAvgRate === option.val ? 'text-[#1DB954]' : 'text-white'}`}>{option.label}</span>
                            <span className="text-sm font-mono opacity-70">${option.val}</span>
                          </div>
                          <p className="text-xs text-[#B3B3B3] mt-1">{option.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#181818] p-8 rounded-2xl border border-[#282828] flex flex-col items-center justify-center text-center h-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#1DB954] to-transparent opacity-50"></div>
                
                <Target className="w-16 h-16 text-[#1DB954] mb-4 opacity-80" />
                <h3 className="text-[#B3B3B3] text-lg mb-2">Necesitas generar</h3>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono tracking-tight">
                  {formatNumber(Math.ceil((Number(goalAmount) || 0) / goalAvgRate))}
                </div>
                <p className="text-[#535353] text-sm uppercase tracking-widest font-bold">Streams Mensuales</p>

                <div className="mt-8 p-4 bg-[#222] rounded-lg w-full text-left">
                  <p className="text-xs text-[#B3B3B3] mb-2 flex items-center gap-2">
                    <Info className="w-3 h-3" /> Tip de crecimiento:
                  </p>
                  <p className="text-sm text-white">
                    Para llegar a esta meta con audiencia de <strong>Latinoamérica</strong>, necesitas aproximadamente un 
                    <span className="text-[#1DB954] font-bold"> 40% más</span> de volumen que con audiencia de EE.UU.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}