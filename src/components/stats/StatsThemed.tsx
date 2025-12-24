import { TrendingUp, Calendar, Clock, Award, Target, Flame } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';
import { DesignVariant } from '../VariantSwitcher';

interface StatsThemedProps {
  variant: DesignVariant;
}

export function StatsThemed({ variant }: StatsThemedProps) {
  const weeklyData = [
    { day: 'Mon', workouts: 2, duration: 85 },
    { day: 'Tue', workouts: 1, duration: 45 },
    { day: 'Wed', workouts: 2, duration: 90 },
    { day: 'Thu', workouts: 1, duration: 55 },
    { day: 'Fri', workouts: 2, duration: 80 },
    { day: 'Sat', workouts: 1, duration: 60 },
    { day: 'Sun', workouts: 1, duration: 40 },
  ];

  const monthlyProgress = [
    { week: 'W1', count: 8 },
    { week: 'W2', count: 10 },
    { week: 'W3', count: 12 },
    { week: 'W4', count: 11 },
  ];

  const stats = [
    { label: 'Workout Streak', value: '7 days', icon: Flame, color: 'from-orange-400 to-orange-600' },
    { label: 'Total Workouts', value: '47', icon: Target, color: 'from-purple-400 to-purple-600' },
    { label: 'This Month', value: '18', icon: Calendar, color: 'from-blue-400 to-blue-600' },
    { label: 'Total Hours', value: '42.5', icon: Clock, color: 'from-green-400 to-green-600' },
  ];

  // Theme configurations
  const themes = {
    material: {
      bg: 'bg-gradient-to-br from-purple-50 to-blue-50',
      header: 'bg-gradient-to-br from-[#6750A4] to-[#4e3a8f] text-white',
      cardBg: 'bg-white',
      cardShadow: 'shadow-md',
      titleText: 'text-[#1C1B1F]',
      subtitleText: 'text-gray-600',
      iconAccent: 'text-[#6750A4]',
      chartGrid: '#e5e7eb',
      chartAxis: '#6b7280',
      barColor: '#6750A4',
      lineColor: '#6750A4',
    },
    glassmorphism: {
      bg: 'bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400',
      header: 'bg-white/20 backdrop-blur-xl text-white border-b border-white/20',
      cardBg: 'bg-white/30 backdrop-blur-lg border border-white/20',
      cardShadow: 'shadow-xl',
      titleText: 'text-white',
      subtitleText: 'text-white/80',
      iconAccent: 'text-white',
      chartGrid: '#ffffff40',
      chartAxis: '#ffffff90',
      barColor: '#ffffff',
      lineColor: '#ffffff',
    },
    dark: {
      bg: 'bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950',
      header: 'bg-gradient-to-br from-slate-800 to-slate-900 text-white border-b border-slate-700',
      cardBg: 'bg-slate-800 border border-slate-700',
      cardShadow: 'shadow-lg',
      titleText: 'text-white',
      subtitleText: 'text-slate-400',
      iconAccent: 'text-blue-400',
      chartGrid: '#374151',
      chartAxis: '#9ca3af',
      barColor: '#3b82f6',
      lineColor: '#3b82f6',
    },
    neo: {
      bg: 'bg-gradient-to-br from-emerald-50 to-cyan-50',
      header: 'bg-gradient-to-br from-emerald-500 to-cyan-500 text-white',
      cardBg: 'bg-white border-2 border-emerald-100',
      cardShadow: 'shadow-lg',
      titleText: 'text-gray-900',
      subtitleText: 'text-gray-600',
      iconAccent: 'text-emerald-600',
      chartGrid: '#d1fae5',
      chartAxis: '#6b7280',
      barColor: '#10b981',
      lineColor: '#06b6d4',
    },
    vibrant: {
      bg: 'bg-gradient-to-br from-orange-100 via-pink-100 to-rose-100',
      header: 'bg-gradient-to-br from-orange-500 via-pink-500 to-rose-500 text-white',
      cardBg: 'bg-white/80 backdrop-blur-sm',
      cardShadow: 'shadow-lg',
      titleText: 'text-gray-900',
      subtitleText: 'text-gray-600',
      iconAccent: 'text-orange-600',
      chartGrid: '#fed7aa',
      chartAxis: '#6b7280',
      barColor: '#f97316',
      lineColor: '#ec4899',
    },
  };

  const theme = themes[variant];

  return (
    <div className={`flex flex-col h-full ${theme.bg}`}>
      {/* Header */}
      <div className={`${theme.header} px-4 py-4`}>
        <h1 className="text-2xl mb-2">Stats</h1>
        <p className="text-sm opacity-80">Your fitness journey</p>
      </div>

      <div className="flex-1 overflow-auto px-4 py-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`bg-gradient-to-br ${stat.color} text-white rounded-2xl p-4 shadow-lg`}
              >
                <Icon size={20} className="mb-2 opacity-90" />
                <div className="text-3xl mb-1">{stat.value}</div>
                <div className="text-xs opacity-90">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Weekly Activity */}
        <div className={`${theme.cardBg} rounded-2xl p-4 ${theme.cardShadow} mb-4`}>
          <h3 className={`${theme.titleText} mb-4 flex items-center gap-2`}>
            <TrendingUp size={20} className={theme.iconAccent} />
            Weekly Activity
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.chartGrid} />
              <XAxis dataKey="day" stroke={theme.chartAxis} fontSize={12} />
              <YAxis stroke={theme.chartAxis} fontSize={12} />
              <Bar dataKey="workouts" fill={theme.barColor} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Progress */}
        <div className={`${theme.cardBg} rounded-2xl p-4 ${theme.cardShadow} mb-4`}>
          <h3 className={`${theme.titleText} mb-4 flex items-center gap-2`}>
            <Calendar size={20} className={theme.iconAccent} />
            Monthly Progress
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={monthlyProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.chartGrid} />
              <XAxis dataKey="week" stroke={theme.chartAxis} fontSize={12} />
              <YAxis stroke={theme.chartAxis} fontSize={12} />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke={theme.lineColor} 
                strokeWidth={3} 
                dot={{ fill: theme.lineColor, r: 4 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Personal Records */}
        <div className={`${theme.cardBg} rounded-2xl p-4 ${theme.cardShadow}`}>
          <h3 className={`${theme.titleText} mb-3 flex items-center gap-2`}>
            <Award size={20} className={theme.iconAccent} />
            Personal Records
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={theme.subtitleText}>Longest Streak</span>
              <span className={theme.titleText}>14 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={theme.subtitleText}>Most Workouts/Week</span>
              <span className={theme.titleText}>12 sessions</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={theme.subtitleText}>Longest Run</span>
              <span className={theme.titleText}>12.5 km</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
