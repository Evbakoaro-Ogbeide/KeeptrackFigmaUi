export type DesignVariant = 'material' | 'dark' | 'minimal' | 'energetic';

export interface ThemeConfig {
  // Background colors
  bgPrimary: string;
  bgSecondary: string;
  bgCard: string;
  
  // Text colors
  textPrimary: string;
  textSecondary: string;
  textOnPrimary: string;
  
  // Accent colors
  primary: string;
  primaryHover: string;
  accent: string;
  
  // Workout type colors
  gymBg: string;
  gymText: string;
  runBg: string;
  runText: string;
  
  // Border and shadow
  border: string;
  shadow: string;
  cardShadow: string;
  
  // Stats card background
  statsBg: string;
  
  // Navigation
  navBg: string;
  navBorder: string;
  navActive: string;
  navInactive: string;
}

export const themes: Record<DesignVariant, ThemeConfig> = {
  material: {
    bgPrimary: 'bg-gradient-to-br from-purple-50 to-blue-50',
    bgSecondary: 'bg-gradient-to-br from-[#6750A4] to-[#4e3a8f]',
    bgCard: 'bg-white',
    
    textPrimary: 'text-[#1C1B1F]',
    textSecondary: 'text-gray-600',
    textOnPrimary: 'text-white',
    
    primary: 'bg-gradient-to-r from-[#6750A4] to-[#5544a0]',
    primaryHover: 'hover:from-[#7965b3] hover:to-[#6855b0]',
    accent: 'text-[#6750A4]',
    
    gymBg: 'bg-gradient-to-br from-blue-100 to-blue-200',
    gymText: 'text-blue-600',
    runBg: 'bg-gradient-to-br from-green-100 to-green-200',
    runText: 'text-green-600',
    
    border: 'border-purple-200',
    shadow: 'shadow-md shadow-purple-200/50',
    cardShadow: 'shadow-lg shadow-purple-200/30',
    
    statsBg: 'bg-white/25',
    
    navBg: 'bg-white/90 backdrop-blur-md',
    navBorder: 'border-purple-200',
    navActive: 'text-[#6750A4]',
    navInactive: 'text-gray-600',
  },
  
  dark: {
    bgPrimary: 'bg-[#121212]',
    bgSecondary: 'bg-gradient-to-br from-[#1a1a2e] to-[#16213e]',
    bgCard: 'bg-[#1e1e1e]',
    
    textPrimary: 'text-white',
    textSecondary: 'text-gray-400',
    textOnPrimary: 'text-white',
    
    primary: 'bg-[#bb86fc]',
    primaryHover: 'hover:bg-[#cf9fff]',
    accent: 'text-[#bb86fc]',
    
    gymBg: 'bg-purple-900/40',
    gymText: 'text-purple-300',
    runBg: 'bg-cyan-900/40',
    runText: 'text-cyan-300',
    
    border: 'border-gray-800',
    shadow: 'shadow-lg shadow-black/50',
    cardShadow: 'shadow-xl shadow-black/50',
    
    statsBg: 'bg-white/10',
    
    navBg: 'bg-[#1e1e1e]',
    navBorder: 'border-gray-800',
    navActive: 'text-[#bb86fc]',
    navInactive: 'text-gray-400',
  },
  
  minimal: {
    bgPrimary: 'bg-white',
    bgSecondary: 'bg-black',
    bgCard: 'bg-white',
    
    textPrimary: 'text-black',
    textSecondary: 'text-gray-500',
    textOnPrimary: 'text-white',
    
    primary: 'bg-black',
    primaryHover: 'hover:bg-gray-800',
    accent: 'text-black',
    
    gymBg: 'bg-gray-100',
    gymText: 'text-black',
    runBg: 'bg-gray-100',
    runText: 'text-black',
    
    border: 'border-gray-200',
    shadow: '',
    cardShadow: 'border border-gray-200',
    
    statsBg: 'bg-white/30',
    
    navBg: 'bg-white',
    navBorder: 'border-t border-gray-200',
    navActive: 'text-black',
    navInactive: 'text-gray-400',
  },
  
  energetic: {
    bgPrimary: 'bg-gradient-to-br from-orange-50 to-pink-50',
    bgSecondary: 'bg-gradient-to-br from-orange-500 to-pink-600',
    bgCard: 'bg-white',
    
    textPrimary: 'text-gray-900',
    textSecondary: 'text-gray-600',
    textOnPrimary: 'text-white',
    
    primary: 'bg-gradient-to-r from-orange-500 to-pink-600',
    primaryHover: 'hover:from-orange-600 hover:to-pink-700',
    accent: 'text-orange-600',
    
    gymBg: 'bg-gradient-to-br from-orange-100 to-orange-200',
    gymText: 'text-orange-700',
    runBg: 'bg-gradient-to-br from-pink-100 to-pink-200',
    runText: 'text-pink-700',
    
    border: 'border-orange-200',
    shadow: 'shadow-md shadow-orange-200/50',
    cardShadow: 'shadow-lg shadow-pink-200/50',
    
    statsBg: 'bg-white/30',
    
    navBg: 'bg-white/90 backdrop-blur-md',
    navBorder: 'border-orange-200',
    navActive: 'text-orange-600',
    navInactive: 'text-gray-600',
  },
};