/**
 * BASE DE DATOS DE PAÍSES Y TIERS
 * Basado en los archivos CSV proporcionados.
 */
export const COUNTRY_DB = [
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
  { name: 'Dom. Rep.', rate: 0.0015, tier: 4, code: 'DO' },
  { name: 'Panama', rate: 0.0016, tier: 4, code: 'PA' },

  // TIER 5 (Volume/Emerging ~0.0008 - 0.0012)
  { name: 'India', rate: 0.0010, tier: 5, code: 'IN' },
  { name: 'Philippines', rate: 0.0012, tier: 5, code: 'PH' },
  { name: 'Indonesia', rate: 0.0012, tier: 5, code: 'ID' },
  { name: 'Vietnam', rate: 0.0010, tier: 5, code: 'VN' },
  { name: 'Egypt', rate: 0.0010, tier: 5, code: 'EG' },
  { name: 'Thailand', rate: 0.0012, tier: 5, code: 'TH' },
].sort((a, b) => a.name.localeCompare(b.name));

export const COLORS = ['#1DB954', '#1ed760', '#169c46', '#0f7a36', '#535353', '#b3b3b3'];
