import { Plus, Dumbbell, Play, Filter, Search } from 'lucide-react';
import { DesignVariant } from '../VariantSwitcher';

interface WorkoutsThemedProps {
  variant: DesignVariant;
  onViewWorkout: (id: string) => void;
  onCreateWorkout: () => void;
}

export function WorkoutsThemed({ variant, onViewWorkout, onCreateWorkout }: WorkoutsThemedProps) {
  const workouts = [
    { id: '1', type: 'running', title: 'Morning Run', date: 'Dec 24, 2025', duration: '32 min', detail: '5.2 km', completed: true },
    { id: '2', type: 'gym', title: 'Upper Body Strength', date: 'Dec 22, 2025', duration: '55 min', detail: '9 exercises', completed: true },
    { id: '3', type: 'running', title: 'Evening Jog', date: 'Dec 21, 2025', duration: '25 min', detail: '4.1 km', completed: true },
    { id: '4', type: 'gym', title: 'Core & Abs', date: 'Dec 20, 2025', duration: '40 min', detail: '7 exercises', completed: false },
    { id: '5', type: 'gym', title: 'Leg Day', date: 'Dec 18, 2025', duration: '50 min', detail: '8 exercises', completed: true },
  ];

  // Theme configurations
  const themes = {
    material: {
      bg: 'bg-gradient-to-br from-purple-50 to-blue-50',
      header: 'bg-gradient-to-br from-[#6750A4] to-[#4e3a8f] text-white',
      searchBg: 'bg-white/20 backdrop-blur-sm text-white placeholder-white/60',
      searchFocus: 'focus:bg-white/30',
      filterBg: 'bg-white/50',
      filterBorder: 'border-purple-200',
      activeBtn: 'bg-gradient-to-r from-[#6750A4] to-[#5544a0] text-white',
      inactiveBtn: 'bg-white text-gray-600 hover:bg-purple-50',
      cardBg: 'bg-white',
      cardShadow: 'shadow-md hover:shadow-lg',
      iconGym: 'bg-gradient-to-br from-blue-100 to-blue-200',
      iconRun: 'bg-gradient-to-br from-green-100 to-green-200',
      iconGymText: 'text-blue-600',
      iconRunText: 'text-green-600',
      titleText: 'text-[#1C1B1F]',
      subtitleText: 'text-gray-600',
      completedBadge: 'bg-green-100 text-green-700',
      fabBg: 'bg-gradient-to-r from-[#6750A4] to-[#5544a0] text-white hover:from-[#7965b3] hover:to-[#6855b0]',
    },
    glassmorphism: {
      bg: 'bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400',
      header: 'bg-white/20 backdrop-blur-xl text-white border-b border-white/20',
      searchBg: 'bg-white/30 backdrop-blur-md text-white placeholder-white/70',
      searchFocus: 'focus:bg-white/40',
      filterBg: 'bg-white/20 backdrop-blur-lg',
      filterBorder: 'border-white/20',
      activeBtn: 'bg-white/40 backdrop-blur-md text-white border border-white/30',
      inactiveBtn: 'bg-white/20 backdrop-blur-md text-white/90 hover:bg-white/30 border border-white/20',
      cardBg: 'bg-white/30 backdrop-blur-lg border border-white/20',
      cardShadow: 'shadow-xl hover:shadow-2xl',
      iconGym: 'bg-white/50 backdrop-blur-md border border-white/30',
      iconRun: 'bg-white/50 backdrop-blur-md border border-white/30',
      iconGymText: 'text-blue-700',
      iconRunText: 'text-green-700',
      titleText: 'text-white',
      subtitleText: 'text-white/80',
      completedBadge: 'bg-white/40 backdrop-blur-md text-white border border-white/30',
      fabBg: 'bg-white/40 backdrop-blur-xl text-gray-900 border border-white/30 hover:bg-white/60',
    },
    dark: {
      bg: 'bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950',
      header: 'bg-gradient-to-br from-slate-800 to-slate-900 text-white border-b border-slate-700',
      searchBg: 'bg-slate-700/50 backdrop-blur-sm text-white placeholder-slate-400',
      searchFocus: 'focus:bg-slate-700/70',
      filterBg: 'bg-slate-900',
      filterBorder: 'border-slate-700',
      activeBtn: 'bg-blue-600 text-white',
      inactiveBtn: 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-600',
      cardBg: 'bg-slate-800 border border-slate-700',
      cardShadow: 'shadow-lg hover:shadow-xl',
      iconGym: 'bg-blue-500/20 border border-blue-500/30',
      iconRun: 'bg-green-500/20 border border-green-500/30',
      iconGymText: 'text-blue-400',
      iconRunText: 'text-green-400',
      titleText: 'text-white',
      subtitleText: 'text-slate-400',
      completedBadge: 'bg-green-500/20 text-green-400 border border-green-500/30',
      fabBg: 'bg-blue-600 text-white hover:bg-blue-500',
    },
    neo: {
      bg: 'bg-gradient-to-br from-emerald-50 to-cyan-50',
      header: 'bg-gradient-to-br from-emerald-500 to-cyan-500 text-white',
      searchBg: 'bg-white/30 backdrop-blur-sm text-white placeholder-white/70',
      searchFocus: 'focus:bg-white/40',
      filterBg: 'bg-white',
      filterBorder: 'border-emerald-200',
      activeBtn: 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg',
      inactiveBtn: 'bg-white text-gray-600 hover:bg-emerald-50 border border-emerald-200',
      cardBg: 'bg-white border-2 border-emerald-100',
      cardShadow: 'shadow-lg hover:shadow-xl',
      iconGym: 'bg-gradient-to-br from-cyan-100 to-cyan-200 shadow-md',
      iconRun: 'bg-gradient-to-br from-emerald-100 to-emerald-200 shadow-md',
      iconGymText: 'text-cyan-600',
      iconRunText: 'text-emerald-600',
      titleText: 'text-gray-900',
      subtitleText: 'text-gray-600',
      completedBadge: 'bg-emerald-100 text-emerald-700',
      fabBg: 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:from-emerald-600 hover:to-cyan-600',
    },
    vibrant: {
      bg: 'bg-gradient-to-br from-orange-100 via-pink-100 to-rose-100',
      header: 'bg-gradient-to-br from-orange-500 via-pink-500 to-rose-500 text-white',
      searchBg: 'bg-white/30 backdrop-blur-md text-white placeholder-white/70',
      searchFocus: 'focus:bg-white/40',
      filterBg: 'bg-white/50 backdrop-blur-sm',
      filterBorder: 'border-pink-200',
      activeBtn: 'bg-gradient-to-r from-orange-500 to-pink-500 text-white',
      inactiveBtn: 'bg-white/80 text-gray-600 hover:bg-white border border-pink-200',
      cardBg: 'bg-white/80 backdrop-blur-sm',
      cardShadow: 'shadow-lg hover:shadow-xl',
      iconGym: 'bg-gradient-to-br from-pink-200 to-rose-300',
      iconRun: 'bg-gradient-to-br from-orange-200 to-amber-300',
      iconGymText: 'text-pink-700',
      iconRunText: 'text-orange-700',
      titleText: 'text-gray-900',
      subtitleText: 'text-gray-600',
      completedBadge: 'bg-pink-100 text-pink-700',
      fabBg: 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600',
    },
  };

  const theme = themes[variant];

  return (
    <div className={`flex flex-col h-full ${theme.bg}`}>
      {/* Header */}
      <div className={`${theme.header} px-4 py-4`}>
        <h1 className="text-2xl mb-4">Workouts</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${variant === 'glassmorphism' || variant === 'dark' ? 'text-white/60' : 'text-white/60'}`} size={20} />
          <input
            type="text"
            placeholder="Search workouts..."
            className={`w-full ${theme.searchBg} rounded-xl py-3 pl-11 pr-4 focus:outline-none ${theme.searchFocus}`}
          />
        </div>
      </div>

      {/* Filters */}
      <div className={`px-4 py-3 flex gap-2 border-b ${theme.filterBorder} ${theme.filterBg}`}>
        <button className={`px-4 py-2 rounded-full text-sm ${theme.activeBtn}`}>
          All
        </button>
        <button className={`px-4 py-2 rounded-full text-sm ${theme.inactiveBtn}`}>
          Gym
        </button>
        <button className={`px-4 py-2 rounded-full text-sm ${theme.inactiveBtn}`}>
          Running
        </button>
        <button className={`px-4 py-2 rounded-full text-sm ${theme.inactiveBtn}`}>
          <Filter size={16} />
        </button>
      </div>

      {/* Workouts List */}
      <div className="flex-1 overflow-auto px-4 py-4">
        <div className="space-y-3">
          {workouts.map((workout) => (
            <button
              key={workout.id}
              onClick={() => onViewWorkout(workout.id)}
              className={`w-full ${theme.cardBg} rounded-2xl p-4 ${theme.cardShadow} transition-shadow text-left`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  workout.type === 'gym' ? theme.iconGym : theme.iconRun
                }`}>
                  {workout.type === 'gym' ? (
                    <Dumbbell className={theme.iconGymText} size={24} />
                  ) : (
                    <Play className={theme.iconRunText} size={24} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={theme.titleText}>{workout.title}</h3>
                    {workout.completed && (
                      <span className={`px-2 py-0.5 ${theme.completedBadge} text-xs rounded-full`}>
                        Completed
                      </span>
                    )}
                  </div>
                  <p className={`${theme.subtitleText} text-sm mb-2`}>{workout.date}</p>
                  <div className={`flex items-center gap-4 text-sm ${theme.subtitleText}`}>
                    <span>{workout.duration}</span>
                    <span>{workout.detail}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={onCreateWorkout}
        className={`fixed bottom-20 right-4 max-w-md w-14 h-14 rounded-2xl shadow-lg transition-all flex items-center justify-center ${theme.fabBg}`}
      >
        <Plus size={28} />
      </button>
    </div>
  );
}
