import { FileText, Settings, ChevronRight } from 'lucide-react';
import { DesignVariant } from './VariantSwitcher';

interface MiscThemedProps {
  variant: DesignVariant;
}

export function MiscThemed({ variant }: MiscThemedProps) {
  // Theme configurations
  const themes = {
    material: {
      bg: 'bg-gradient-to-br from-purple-50 to-blue-50',
      header: 'bg-gradient-to-br from-[#6750A4] to-[#4e3a8f] text-white',
      cardBg: 'bg-white',
      cardShadow: 'shadow-md',
      cardBorder: 'border-gray-100',
      iconBg: 'bg-[#E8DEF8]',
      iconColor: 'text-[#6750A4]',
      titleText: 'text-[#1C1B1F]',
      subtitleText: 'text-gray-600',
      hoverBg: 'hover:bg-purple-50',
      chevronColor: 'text-gray-400',
    },
    glassmorphism: {
      bg: 'bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400',
      header: 'bg-white/20 backdrop-blur-xl text-white border-b border-white/20',
      cardBg: 'bg-white/30 backdrop-blur-lg border border-white/20',
      cardShadow: 'shadow-xl',
      cardBorder: 'border-white/20',
      iconBg: 'bg-white/50 backdrop-blur-md border border-white/30',
      iconColor: 'text-white',
      titleText: 'text-white',
      subtitleText: 'text-white/80',
      hoverBg: 'hover:bg-white/40',
      chevronColor: 'text-white/60',
    },
    dark: {
      bg: 'bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950',
      header: 'bg-gradient-to-br from-slate-800 to-slate-900 text-white border-b border-slate-700',
      cardBg: 'bg-slate-800 border border-slate-700',
      cardShadow: 'shadow-lg',
      cardBorder: 'border-slate-700',
      iconBg: 'bg-blue-500/20 border border-blue-500/30',
      iconColor: 'text-blue-400',
      titleText: 'text-white',
      subtitleText: 'text-slate-400',
      hoverBg: 'hover:bg-slate-700',
      chevronColor: 'text-slate-600',
    },
    neo: {
      bg: 'bg-gradient-to-br from-emerald-50 to-cyan-50',
      header: 'bg-gradient-to-br from-emerald-500 to-cyan-500 text-white',
      cardBg: 'bg-white border-2 border-emerald-100',
      cardShadow: 'shadow-lg',
      cardBorder: 'border-emerald-200',
      iconBg: 'bg-gradient-to-br from-emerald-100 to-cyan-100 shadow-md',
      iconColor: 'text-emerald-600',
      titleText: 'text-gray-900',
      subtitleText: 'text-gray-600',
      hoverBg: 'hover:bg-emerald-50',
      chevronColor: 'text-gray-400',
    },
    vibrant: {
      bg: 'bg-gradient-to-br from-orange-100 via-pink-100 to-rose-100',
      header: 'bg-gradient-to-br from-orange-500 via-pink-500 to-rose-500 text-white',
      cardBg: 'bg-white/80 backdrop-blur-sm',
      cardShadow: 'shadow-lg',
      cardBorder: 'border-pink-200',
      iconBg: 'bg-gradient-to-br from-orange-200 to-pink-200',
      iconColor: 'text-orange-700',
      titleText: 'text-gray-900',
      subtitleText: 'text-gray-600',
      hoverBg: 'hover:bg-white',
      chevronColor: 'text-gray-400',
    },
  };

  const theme = themes[variant];

  return (
    <div className={`flex flex-col h-full ${theme.bg}`}>
      {/* Header */}
      <div className={`${theme.header} px-4 py-4`}>
        <h1 className="text-2xl">More</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className={`${theme.cardBg} rounded-2xl ${theme.cardShadow} overflow-hidden`}>
          {/* Templates Option */}
          <button className={`w-full flex items-center justify-between px-4 py-4 ${theme.hoverBg} transition-colors border-b ${theme.cardBorder}`}>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full ${theme.iconBg} flex items-center justify-center`}>
                <FileText size={20} className={theme.iconColor} />
              </div>
              <div className="text-left">
                <div className={theme.titleText}>Templates</div>
                <div className={`text-sm ${theme.subtitleText}`}>Create and edit workout templates</div>
              </div>
            </div>
            <ChevronRight size={20} className={theme.chevronColor} />
          </button>

          {/* Settings Option */}
          <button className={`w-full flex items-center justify-between px-4 py-4 ${theme.hoverBg} transition-colors`}>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full ${theme.iconBg} flex items-center justify-center`}>
                <Settings size={20} className={theme.iconColor} />
              </div>
              <div className="text-left">
                <div className={theme.titleText}>Settings</div>
                <div className={`text-sm ${theme.subtitleText}`}>App preferences and account</div>
              </div>
            </div>
            <ChevronRight size={20} className={theme.chevronColor} />
          </button>
        </div>

        {/* Additional Info Card */}
        <div className={`mt-4 ${theme.cardBg} rounded-2xl ${theme.cardShadow} p-4`}>
          <div className={`text-sm ${theme.subtitleText}`}>
            <p className="mb-2">
              <span className={theme.titleText}>Templates</span> allow you to save workout configurations that you can reuse for future sessions.
            </p>
            <p>
              <span className={theme.titleText}>Settings</span> let you customize your experience, manage your profile, and configure app preferences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
