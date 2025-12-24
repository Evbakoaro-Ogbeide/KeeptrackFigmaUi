import { ChevronLeft, ChevronRight, Plus, Dumbbell, Play } from 'lucide-react';
import { useState } from 'react';
import { DesignVariant } from '../VariantSwitcher';

interface CalendarThemedProps {
  variant: DesignVariant;
  onCreateWorkout: () => void;
}

export function CalendarThemed({ variant, onCreateWorkout }: CalendarThemedProps) {
  const [currentMonth] = useState('December 2025');
  
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dates = [
    { date: 25, workouts: [], isToday: false },
    { date: 26, workouts: [], isToday: false },
    { date: 27, workouts: [], isToday: false },
    { date: 28, workouts: [], isToday: false },
    { date: 29, workouts: [], isToday: false },
    { date: 30, workouts: [], isToday: false },
    { date: 1, workouts: [], isToday: false, nextMonth: true },
    
    { date: 2, workouts: [], isToday: false, nextMonth: true },
    { date: 3, workouts: [], isToday: false, nextMonth: true },
    { date: 4, workouts: [], isToday: false, nextMonth: true },
    { date: 5, workouts: [], isToday: false, nextMonth: true },
    { date: 6, workouts: [], isToday: false, nextMonth: true },
    { date: 7, workouts: [], isToday: false, nextMonth: true },
    { date: 8, workouts: [], isToday: false, nextMonth: true },
    
    { date: 9, workouts: [], isToday: false, nextMonth: true },
    { date: 10, workouts: [], isToday: false, nextMonth: true },
    { date: 11, workouts: [], isToday: false, nextMonth: true },
    { date: 12, workouts: [], isToday: false, nextMonth: true },
    { date: 13, workouts: [], isToday: false, nextMonth: true },
    { date: 14, workouts: [], isToday: false, nextMonth: true },
    { date: 15, workouts: [], isToday: false, nextMonth: true },
    
    { date: 16, workouts: [], isToday: false, nextMonth: true },
    { date: 17, workouts: [], isToday: false, nextMonth: true },
    { date: 18, workouts: ['gym'], isToday: false, nextMonth: true },
    { date: 19, workouts: [], isToday: false, nextMonth: true },
    { date: 20, workouts: ['gym'], isToday: false, nextMonth: true },
    { date: 21, workouts: ['running'], isToday: false, nextMonth: true },
    { date: 22, workouts: ['gym'], isToday: false, nextMonth: true },
    
    { date: 23, workouts: [], isToday: false, nextMonth: true },
    { date: 24, workouts: ['running'], isToday: true, nextMonth: true },
    { date: 25, workouts: ['gym'], isToday: false, nextMonth: true },
    { date: 26, workouts: [], isToday: false, nextMonth: true },
    { date: 27, workouts: [], isToday: false, nextMonth: true },
    { date: 28, workouts: [], isToday: false, nextMonth: true },
    { date: 29, workouts: [], isToday: false, nextMonth: true },
  ];

  const upcomingWorkouts = [
    { id: '1', type: 'gym', title: 'Core & Abs', date: 'Tomorrow', time: '10:00 AM', duration: '40 min' },
    { id: '2', type: 'running', title: 'Long Run', date: 'Dec 26', time: '7:00 AM', duration: '60 min' },
  ];

  // Theme configurations
  const themes = {
    material: {
      bg: 'bg-gradient-to-br from-purple-50 to-blue-50',
      header: 'bg-gradient-to-br from-[#6750A4] to-[#4e3a8f] text-white',
      navBtn: 'hover:bg-white/20',
      dayToday: 'bg-gradient-to-br from-[#6750A4] to-[#5544a0] text-white',
      dayActive: 'bg-white hover:bg-purple-50',
      dayInactive: 'bg-white/50 text-gray-400',
      dotToday: 'bg-white',
      dotGym: 'bg-blue-500',
      dotRun: 'bg-green-500',
      upcomingTitle: 'text-gray-600',
      cardBg: 'bg-white',
      cardShadow: 'shadow-md',
      iconGym: 'bg-gradient-to-br from-blue-100 to-blue-200',
      iconRun: 'bg-gradient-to-br from-green-100 to-green-200',
      iconGymText: 'text-blue-600',
      iconRunText: 'text-green-600',
      titleText: 'text-[#1C1B1F]',
      subtitleText: 'text-gray-600',
      fabBg: 'bg-gradient-to-r from-[#6750A4] to-[#5544a0] text-white hover:from-[#7965b3] hover:to-[#6855b0]',
    },
    glassmorphism: {
      bg: 'bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400',
      header: 'bg-white/20 backdrop-blur-xl text-white border-b border-white/20',
      navBtn: 'hover:bg-white/20',
      dayToday: 'bg-white/60 backdrop-blur-md text-white border border-white/40',
      dayActive: 'bg-white/30 backdrop-blur-md hover:bg-white/40 border border-white/20',
      dayInactive: 'bg-white/10 backdrop-blur-sm text-white/40 border border-white/10',
      dotToday: 'bg-white',
      dotGym: 'bg-blue-300',
      dotRun: 'bg-green-300',
      upcomingTitle: 'text-white/90',
      cardBg: 'bg-white/30 backdrop-blur-lg border border-white/20',
      cardShadow: 'shadow-xl',
      iconGym: 'bg-white/50 backdrop-blur-md border border-white/30',
      iconRun: 'bg-white/50 backdrop-blur-md border border-white/30',
      iconGymText: 'text-blue-700',
      iconRunText: 'text-green-700',
      titleText: 'text-white',
      subtitleText: 'text-white/80',
      fabBg: 'bg-white/40 backdrop-blur-xl text-gray-900 border border-white/30 hover:bg-white/60',
    },
    dark: {
      bg: 'bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950',
      header: 'bg-gradient-to-br from-slate-800 to-slate-900 text-white border-b border-slate-700',
      navBtn: 'hover:bg-slate-700',
      dayToday: 'bg-blue-600 text-white',
      dayActive: 'bg-slate-800 hover:bg-slate-700 border border-slate-600',
      dayInactive: 'bg-slate-900 text-slate-600 border border-slate-800',
      dotToday: 'bg-white',
      dotGym: 'bg-blue-400',
      dotRun: 'bg-green-400',
      upcomingTitle: 'text-slate-400',
      cardBg: 'bg-slate-800 border border-slate-700',
      cardShadow: 'shadow-lg',
      iconGym: 'bg-blue-500/20 border border-blue-500/30',
      iconRun: 'bg-green-500/20 border border-green-500/30',
      iconGymText: 'text-blue-400',
      iconRunText: 'text-green-400',
      titleText: 'text-white',
      subtitleText: 'text-slate-400',
      fabBg: 'bg-blue-600 text-white hover:bg-blue-500',
    },
    neo: {
      bg: 'bg-gradient-to-br from-emerald-50 to-cyan-50',
      header: 'bg-gradient-to-br from-emerald-500 to-cyan-500 text-white',
      navBtn: 'hover:bg-white/20',
      dayToday: 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg',
      dayActive: 'bg-white hover:bg-emerald-50 border-2 border-emerald-100',
      dayInactive: 'bg-white/50 text-gray-400 border border-emerald-100',
      dotToday: 'bg-white',
      dotGym: 'bg-cyan-500',
      dotRun: 'bg-emerald-500',
      upcomingTitle: 'text-gray-600',
      cardBg: 'bg-white border-2 border-emerald-100',
      cardShadow: 'shadow-lg',
      iconGym: 'bg-gradient-to-br from-cyan-100 to-cyan-200 shadow-md',
      iconRun: 'bg-gradient-to-br from-emerald-100 to-emerald-200 shadow-md',
      iconGymText: 'text-cyan-600',
      iconRunText: 'text-emerald-600',
      titleText: 'text-gray-900',
      subtitleText: 'text-gray-600',
      fabBg: 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:from-emerald-600 hover:to-cyan-600',
    },
    vibrant: {
      bg: 'bg-gradient-to-br from-orange-100 via-pink-100 to-rose-100',
      header: 'bg-gradient-to-br from-orange-500 via-pink-500 to-rose-500 text-white',
      navBtn: 'hover:bg-white/20',
      dayToday: 'bg-gradient-to-r from-orange-500 to-pink-500 text-white',
      dayActive: 'bg-white/80 hover:bg-white border border-pink-200',
      dayInactive: 'bg-white/30 text-gray-400',
      dotToday: 'bg-white',
      dotGym: 'bg-pink-500',
      dotRun: 'bg-orange-500',
      upcomingTitle: 'text-gray-700',
      cardBg: 'bg-white/80 backdrop-blur-sm',
      cardShadow: 'shadow-lg',
      iconGym: 'bg-gradient-to-br from-pink-200 to-rose-300',
      iconRun: 'bg-gradient-to-br from-orange-200 to-amber-300',
      iconGymText: 'text-pink-700',
      iconRunText: 'text-orange-700',
      titleText: 'text-gray-900',
      subtitleText: 'text-gray-600',
      fabBg: 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600',
    },
  };

  const theme = themes[variant];

  return (
    <div className={`flex flex-col h-full ${theme.bg}`}>
      {/* Header */}
      <div className={`${theme.header} px-4 py-4`}>
        <h1 className="text-2xl mb-4">Plan</h1>
        
        {/* Month Navigator */}
        <div className="flex items-center justify-between mb-4">
          <button className={`p-2 ${theme.navBtn} rounded-lg transition-colors`}>
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-lg">{currentMonth}</h2>
          <button className={`p-2 ${theme.navBtn} rounded-lg transition-colors`}>
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {days.map((day) => (
            <div key={day} className="text-center text-xs opacity-80 py-1">
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="px-4 pt-4 pb-2">
        <div className="grid grid-cols-7 gap-1">
          {dates.map((item, index) => (
            <button
              key={index}
              className={`aspect-square rounded-lg p-1 flex flex-col items-center justify-center text-sm relative ${
                item.isToday
                  ? theme.dayToday
                  : item.nextMonth
                  ? theme.dayActive
                  : theme.dayInactive
              }`}
            >
              <span>{item.date}</span>
              {item.workouts.length > 0 && (
                <div className="flex gap-0.5 mt-0.5">
                  {item.workouts.map((type, i) => (
                    <div
                      key={i}
                      className={`w-1 h-1 rounded-full ${
                        item.isToday
                          ? theme.dotToday
                          : type === 'gym'
                          ? theme.dotGym
                          : theme.dotRun
                      }`}
                    />
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Upcoming Workouts */}
      <div className="px-4 py-4 flex-1 overflow-auto">
        <h3 className={`text-sm ${theme.upcomingTitle} mb-3`}>Upcoming</h3>
        <div className="space-y-2">
          {upcomingWorkouts.map((workout) => (
            <div
              key={workout.id}
              className={`${theme.cardBg} rounded-2xl p-4 ${theme.cardShadow}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  workout.type === 'gym' ? theme.iconGym : theme.iconRun
                }`}>
                  {workout.type === 'gym' ? (
                    <Dumbbell className={theme.iconGymText} size={20} />
                  ) : (
                    <Play className={theme.iconRunText} size={20} />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className={`${theme.titleText} mb-1`}>{workout.title}</h4>
                  <p className={`${theme.subtitleText} text-sm`}>
                    {workout.date} • {workout.time} • {workout.duration}
                  </p>
                </div>
              </div>
            </div>
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
