import React, { useState, useMemo } from 'react';
import { TrendingUp, Award, Target, Flame, Activity, Dumbbell, Library, ChevronDown, ChevronUp, Filter, Calendar as CalendarIcon, Clock } from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { DesignVariant } from '../VariantSwitcher';

interface StatsPageEnhancedProps {
  variant: DesignVariant;
}

type TimePeriod = 'week' | 'month' | 'year';
type TabView = 'overview' | 'charts' | 'records' | 'goals';

export function StatsPageEnhanced({ variant }: StatsPageEnhancedProps) {
  const [activeTab, setActiveTab] = useState<TabView>('overview');
  const [showFilters, setShowFilters] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [volumePeriod, setVolumePeriod] = useState<TimePeriod>('month');
  
  // Filter states
  const [selectedExercise, setSelectedExercise] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [dateRangeStart, setDateRangeStart] = useState<string>('');
  const [dateRangeEnd, setDateRangeEnd] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');

  // Mock data
  const stats = {
    streak: 7,
    totalWorkouts: 47,
    thisMonth: 18,
    totalHours: '42.5'
  };

  const volumeData = [
    { date: '1/1', volume: 4500 },
    { date: '1/8', volume: 5200 },
    { date: '1/15', volume: 4800 },
    { date: '1/22', volume: 6100 },
    { date: '1/29', volume: 5500 },
  ];

  const muscleGroupData = [
    { group: 'Chest', totalSets: 45 },
    { group: 'Back', totalSets: 52 },
    { group: 'Legs', totalSets: 38 },
    { group: 'Shoulders', totalSets: 30 },
    { group: 'Arms', totalSets: 35 },
  ];

  const categoryData = [
    { category: 'Compound', totalSets: 85 },
    { category: 'Isolation', totalSets: 65 },
    { category: 'Cardio', totalSets: 30 },
    { category: 'Core', totalSets: 20 },
  ];

  const recentPRs = [
    { id: '1', exercise: 'Bench Press', weight: 100, reps: 5, date: '2026-01-28' },
    { id: '2', exercise: 'Squat', weight: 140, reps: 5, date: '2026-01-25' },
    { id: '3', exercise: 'Deadlift', weight: 180, reps: 3, date: '2026-01-22' },
  ];

  const oneRepMaxPRs = [
    { id: '1', exercise: 'Bench Press', weight: 120, date: '2026-01-15' },
    { id: '2', exercise: 'Squat', weight: 160, date: '2026-01-10' },
    { id: '3', exercise: 'Deadlift', weight: 200, date: '2026-01-05' },
  ];

  const bestExercises = [
    { name: 'Bench Press', totalVolume: 12500, totalSets: 24, avgWeight: 95 },
    { name: 'Squat', totalVolume: 15800, totalSets: 20, avgWeight: 125 },
    { name: 'Deadlift', totalVolume: 18200, totalSets: 18, avgWeight: 155 },
    { name: 'Overhead Press', totalVolume: 8400, totalSets: 22, avgWeight: 65 },
    { name: 'Rows', totalVolume: 9600, totalSets: 26, avgWeight: 80 },
  ];

  const uniqueExercises = ['Bench Press', 'Squat', 'Deadlift', 'Overhead Press', 'Rows', 'Pull-ups', 'Dips'];
  const uniqueCategories = ['Compound', 'Isolation', 'Cardio', 'Core'];
  const workoutTypes = ['Gym', 'Running', 'Sprint'];

  const avgVolume = 5200; // kg
  const workoutsPerWeek = 4.2;

  const hasActiveFilters = selectedExercise || selectedCategory || dateRangeStart || dateRangeEnd || selectedType;

  // Theme configurations
  const themes = {
    material: {
      bg: 'bg-gradient-to-br from-purple-50 to-blue-50',
      header: 'bg-gradient-to-br from-[#6750A4] to-[#4e3a8f] text-white',
      cardBg: 'bg-white',
      cardShadow: 'shadow-md',
      titleText: 'text-[#1C1B1F]',
      subtitleText: 'text-gray-600',
      activeNav: 'text-[#6750A4]',
      navBorder: 'border-gray-300',
      chartGrid: '#e5e7eb',
      chartAxis: '#6b7280',
    },
    glassmorphism: {
      bg: 'bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400',
      header: 'bg-white/20 backdrop-blur-xl text-white border-b border-white/20',
      cardBg: 'bg-white/30 backdrop-blur-lg border border-white/20',
      cardShadow: 'shadow-xl',
      titleText: 'text-white',
      subtitleText: 'text-white/80',
      activeNav: 'text-white',
      navBorder: 'border-white/30',
      chartGrid: '#ffffff40',
      chartAxis: '#ffffff90',
    },
    dark: {
      bg: 'bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950',
      header: 'bg-gradient-to-br from-slate-800 to-slate-900 text-white border-b border-slate-700',
      cardBg: 'bg-slate-800 border border-slate-700',
      cardShadow: 'shadow-lg',
      titleText: 'text-white',
      subtitleText: 'text-slate-400',
      activeNav: 'text-blue-400',
      navBorder: 'border-slate-600',
      chartGrid: '#374151',
      chartAxis: '#9ca3af',
    },
    neo: {
      bg: 'bg-gradient-to-br from-emerald-50 to-cyan-50',
      header: 'bg-gradient-to-br from-emerald-500 to-cyan-500 text-white',
      cardBg: 'bg-white border-2 border-emerald-100',
      cardShadow: 'shadow-lg',
      titleText: 'text-gray-900',
      subtitleText: 'text-gray-600',
      activeNav: 'text-emerald-600',
      navBorder: 'border-emerald-200',
      chartGrid: '#d1fae5',
      chartAxis: '#6b7280',
    },
    vibrant: {
      bg: 'bg-gradient-to-br from-orange-100 via-pink-100 to-rose-100',
      header: 'bg-gradient-to-br from-orange-500 via-pink-500 to-rose-500 text-white',
      cardBg: 'bg-white/80 backdrop-blur-sm',
      cardShadow: 'shadow-lg',
      titleText: 'text-gray-900',
      subtitleText: 'text-gray-600',
      activeNav: 'text-orange-600',
      navBorder: 'border-orange-200',
      chartGrid: '#fed7aa',
      chartAxis: '#6b7280',
    },
  };

  const theme = themes[variant];

  const getMuscleGroupColor = (group: string) => {
    const colors: Record<string, string> = {
      'Chest': '#ef4444',
      'Back': '#3b82f6',
      'Legs': '#10b981',
      'Shoulders': '#f59e0b',
      'Arms': '#8b5cf6',
      'Core': '#ec4899',
    };
    return colors[group] || '#6b7280';
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Compound': '#6750A4',
      'Isolation': '#3b82f6',
      'Cardio': '#10b981',
      'Core': '#f59e0b',
    };
    return colors[category] || '#6b7280';
  };

  return (
    <div className={`flex flex-col h-full ${theme.bg}`}>
      {/* Header */}
      <div className={`${theme.header} px-4 py-4`}>
        <h1 className="text-2xl mb-2">Stats</h1>
        <p className="text-sm opacity-80">Your fitness journey</p>
      </div>

      {/* Filters Toggle */}
      <div className="px-4 pt-3">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`w-full flex items-center justify-between ${theme.cardBg} rounded-xl px-4 py-2.5 ${theme.cardShadow} mb-3`}
        >
          <div className="flex items-center gap-2">
            <Filter size={16} className={theme.activeNav} />
            <span className={`text-sm font-medium ${theme.titleText}`}>
              Filters {hasActiveFilters && `(${[selectedExercise, selectedCategory, dateRangeStart, dateRangeEnd, selectedType].filter(Boolean).length})`}
            </span>
          </div>
          {showFilters ? <ChevronUp size={16} className={theme.titleText} /> : <ChevronDown size={16} className={theme.titleText} />}
        </button>

        {/* Collapsible Filters */}
        {showFilters && (
          <div className={`${theme.cardBg} rounded-xl p-4 ${theme.cardShadow} mb-3`}>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-xs ${theme.subtitleText} mb-1 block`}>Exercise</label>
                  <select
                    value={selectedExercise}
                    onChange={(e) => setSelectedExercise(e.target.value)}
                    className={`w-full text-xs px-2 py-1.5 ${theme.bg} rounded-lg border ${theme.navBorder} ${theme.titleText}`}
                  >
                    <option value="">All</option>
                    {uniqueExercises.map(exercise => (
                      <option key={exercise} value={exercise}>{exercise}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`text-xs ${theme.subtitleText} mb-1 block`}>Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={`w-full text-xs px-2 py-1.5 ${theme.bg} rounded-lg border ${theme.navBorder} ${theme.titleText}`}
                  >
                    <option value="">All</option>
                    {uniqueCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-xs ${theme.subtitleText} mb-1 block`}>Start Date</label>
                  <input
                    type="date"
                    value={dateRangeStart}
                    onChange={(e) => setDateRangeStart(e.target.value)}
                    className={`w-full text-xs px-2 py-1.5 ${theme.bg} rounded-lg border ${theme.navBorder} ${theme.titleText}`}
                  />
                </div>
                <div>
                  <label className={`text-xs ${theme.subtitleText} mb-1 block`}>End Date</label>
                  <input
                    type="date"
                    value={dateRangeEnd}
                    onChange={(e) => setDateRangeEnd(e.target.value)}
                    className={`w-full text-xs px-2 py-1.5 ${theme.bg} rounded-lg border ${theme.navBorder} ${theme.titleText}`}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-xs ${theme.subtitleText} mb-1 block`}>Workout Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className={`w-full text-xs px-2 py-1.5 ${theme.bg} rounded-lg border ${theme.navBorder} ${theme.titleText}`}
                  >
                    <option value="">All</option>
                    {workoutTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    setSelectedExercise('');
                    setSelectedCategory('');
                    setDateRangeStart('');
                    setDateRangeEnd('');
                    setSelectedType('');
                  }}
                  className={`text-xs ${theme.activeNav} hover:underline`}
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="px-4">
        <div className={`flex gap-1 ${theme.cardBg} rounded-xl p-1 ${theme.cardShadow}`}>
          {(['overview', 'charts', 'records', 'goals'] as TabView[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-[#6750A4] text-white'
                  : theme.titleText
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto px-4 py-4 pb-20">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Volume & PR Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className={`${theme.cardBg} rounded-xl p-4 ${theme.cardShadow}`}>
                <TrendingUp size={18} className="text-blue-500 mb-2" />
                <div className={`text-2xl font-bold ${theme.titleText}`}>8.2t</div>
                <div className={`text-xs ${theme.subtitleText}`}>Volume This Week</div>
              </div>
              <div className={`${theme.cardBg} rounded-xl p-4 ${theme.cardShadow}`}>
                <CalendarIcon size={18} className="text-purple-500 mb-2" />
                <div className={`text-2xl font-bold ${theme.titleText}`}>26.5t</div>
                <div className={`text-xs ${theme.subtitleText}`}>Volume This Month</div>
              </div>
              <div className={`${theme.cardBg} rounded-xl p-4 ${theme.cardShadow}`}>
                <Award size={18} className="text-green-500 mb-2" />
                <div className={`text-base font-bold ${theme.titleText}`}>Deadlift</div>
                <div className={`text-lg font-bold ${theme.activeNav}`}>200kg</div>
                <div className={`text-xs ${theme.subtitleText}`}>Latest 1RM PR</div>
              </div>
              <div className={`${theme.cardBg} rounded-xl p-4 ${theme.cardShadow}`}>
                <Target size={18} className="text-orange-500 mb-2" />
                <div className={`text-base font-bold ${theme.titleText}`}>Bench Press</div>
                <div className={`text-lg font-bold ${theme.activeNav}`}>100kg × 5</div>
                <div className={`text-xs ${theme.subtitleText}`}>Latest Set PR</div>
              </div>
            </div>

            {/* Performance Highlights */}
            <div className={`${theme.cardBg} rounded-xl p-4 ${theme.cardShadow}`}>
              <h3 className={`${theme.titleText} mb-3 text-sm font-semibold flex items-center gap-2`}>
                <Activity size={18} className={theme.activeNav} />
                Performance Highlights
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${theme.subtitleText}`}>Avg Volume/Workout</span>
                  <span className={`text-sm font-semibold ${theme.titleText}`}>
                    {(avgVolume / 1000).toFixed(1)}t
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${theme.subtitleText}`}>Workouts/Week</span>
                  <span className={`text-sm font-semibold ${theme.titleText}`}>
                    {workoutsPerWeek.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${theme.subtitleText}`}>Recent PRs</span>
                  <span className={`text-sm font-semibold ${theme.titleText}`}>
                    {recentPRs.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Recent PRs */}
            <div className={`${theme.cardBg} rounded-xl p-4 ${theme.cardShadow}`}>
              <h3 className={`${theme.titleText} mb-3 text-sm font-semibold flex items-center gap-2`}>
                <Award size={18} className={theme.activeNav} />
                Recent Personal Records
              </h3>
              <div className="space-y-2">
                {recentPRs.map((pr) => (
                  <div key={pr.id} className={`p-3 ${theme.bg} rounded-lg flex justify-between items-center`}>
                    <div>
                      <div className={`text-sm font-medium ${theme.titleText}`}>{pr.exercise}</div>
                      <div className={`text-xs ${theme.subtitleText}`}>
                        {new Date(pr.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className={`text-sm font-semibold ${theme.activeNav}`}>
                      {pr.weight}kg × {pr.reps}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Exercises */}
            <div className={`${theme.cardBg} rounded-xl p-4 ${theme.cardShadow}`}>
              <h3 className={`${theme.titleText} mb-3 text-sm font-semibold flex items-center gap-2`}>
                <Dumbbell size={18} className={theme.activeNav} />
                Top 5 Exercises
              </h3>
              <div className="space-y-2">
                {bestExercises.map((exercise, index) => (
                  <div key={exercise.name} className={`p-3 ${theme.bg} rounded-lg`}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold ${theme.activeNav} w-5`}>#{index + 1}</span>
                        <span className={`text-sm ${theme.titleText}`}>{exercise.name}</span>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-semibold ${theme.titleText}`}>
                          {(exercise.totalVolume / 1000).toFixed(1)}t
                        </div>
                        <div className={`text-xs ${theme.subtitleText}`}>
                          {exercise.totalSets} sets
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Charts Tab */}
        {activeTab === 'charts' && (
          <div className="space-y-4">
            {/* Volume Trends */}
            <div className={`${theme.cardBg} rounded-xl p-4 ${theme.cardShadow}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`${theme.titleText} text-sm font-semibold flex items-center gap-2`}>
                  <TrendingUp size={18} className={theme.activeNav} />
                  Volume Trends
                </h3>
                <select
                  value={volumePeriod}
                  onChange={(e) => setVolumePeriod(e.target.value as TimePeriod)}
                  className={`text-xs px-2 py-1 ${theme.bg} rounded-lg border ${theme.navBorder} ${theme.titleText}`}
                >
                  <option value="week">Weekly</option>
                  <option value="month">Monthly</option>
                  <option value="year">Yearly</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={volumeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.chartGrid} />
                  <XAxis dataKey="date" stroke={theme.chartAxis} style={{ fontSize: '10px' }} />
                  <YAxis stroke={theme.chartAxis} style={{ fontSize: '10px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: variant === 'dark' ? '#1e1e1e' : '#fff',
                      border: '1px solid #6750A4',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Line type="monotone" dataKey="volume" stroke="#6750A4" strokeWidth={2} dot={{ fill: '#6750A4' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Muscle Group Balance */}
            <div className={`${theme.cardBg} rounded-xl p-4 ${theme.cardShadow}`}>
              <h3 className={`${theme.titleText} mb-4 text-sm font-semibold flex items-center gap-2`}>
                <Dumbbell size={18} className={theme.activeNav} />
                Muscle Group Balance
              </h3>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={muscleGroupData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry: any) => `${entry.group} ${((entry.totalSets / 200) * 100).toFixed(0)}%`}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="totalSets"
                  >
                    {muscleGroupData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getMuscleGroupColor(entry.group)} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: variant === 'dark' ? '#1e1e1e' : '#fff',
                      border: '1px solid #6750A4',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {muscleGroupData.map((stat) => (
                  <div key={stat.group} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded" 
                        style={{ backgroundColor: getMuscleGroupColor(stat.group) }}
                      />
                      <span className={theme.titleText}>{stat.group}</span>
                    </div>
                    <span className={theme.subtitleText}>{stat.totalSets} sets</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Distribution */}
            <div className={`${theme.cardBg} rounded-xl p-4 ${theme.cardShadow}`}>
              <h3 className={`${theme.titleText} mb-4 text-sm font-semibold flex items-center gap-2`}>
                <Library size={18} className={theme.activeNav} />
                Exercise Categories
              </h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.chartGrid} />
                  <XAxis dataKey="category" stroke={theme.chartAxis} style={{ fontSize: '10px' }} />
                  <YAxis stroke={theme.chartAxis} style={{ fontSize: '10px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: variant === 'dark' ? '#1e1e1e' : '#fff',
                      border: '1px solid #6750A4',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="totalSets" fill="#6750A4">
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getCategoryColor(entry.category)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Records Tab */}
        {activeTab === 'records' && (
          <div className="space-y-4">
            {/* One Rep Max */}
            <div className={`${theme.cardBg} rounded-xl p-4 ${theme.cardShadow}`}>
              <h3 className={`${theme.titleText} mb-3 text-sm font-semibold flex items-center gap-2`}>
                <Award size={18} className={theme.activeNav} />
                One Rep Max (1RM)
              </h3>
              <div className="space-y-2">
                {oneRepMaxPRs.map((pr) => (
                  <div key={pr.id} className={`p-3 ${theme.bg} rounded-lg flex justify-between items-center`}>
                    <div>
                      <div className={`text-sm font-medium ${theme.titleText}`}>{pr.exercise}</div>
                      <div className={`text-xs ${theme.subtitleText}`}>
                        {new Date(pr.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className={`text-sm font-semibold ${theme.activeNav}`}>
                      {pr.weight}kg
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* All PRs List */}
            <div className={`${theme.cardBg} rounded-xl p-4 ${theme.cardShadow}`}>
              <h3 className={`${theme.titleText} mb-3 text-sm font-semibold flex items-center gap-2`}>
                <TrendingUp size={18} className={theme.activeNav} />
                All Personal Records
              </h3>
              <div className="space-y-2">
                {recentPRs.map((pr) => (
                  <div key={pr.id} className={`p-3 ${theme.bg} rounded-lg flex justify-between items-center`}>
                    <div>
                      <div className={`text-sm font-medium ${theme.titleText}`}>{pr.exercise}</div>
                      <div className={`text-xs ${theme.subtitleText}`}>
                        {new Date(pr.date).toLocaleDateString()} • {pr.reps} reps
                      </div>
                    </div>
                    <div className={`text-sm font-semibold ${theme.activeNav}`}>
                      {pr.weight}kg
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Goals Tab */}
        {activeTab === 'goals' && (
          <div className="space-y-4">
            <div className={`${theme.cardBg} rounded-xl p-4 ${theme.cardShadow}`}>
              <h3 className={`${theme.titleText} mb-4 text-sm font-semibold flex items-center gap-2`}>
                <Target size={18} className={theme.activeNav} />
                Active Goals
              </h3>
              <div className="space-y-4">
                {/* 7-Day Streak */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm ${theme.titleText}`}>7-Day Streak</span>
                    <span className={`text-xs ${theme.subtitleText}`}>{Math.min(stats.streak, 7)}/7 days</span>
                  </div>
                  <div className={`h-2 ${theme.bg} rounded-full overflow-hidden`}>
                    <div 
                      className="h-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all"
                      style={{ width: `${Math.min((stats.streak / 7) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                
                {/* Monthly Goal */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm ${theme.titleText}`}>Monthly Goal (12 workouts)</span>
                    <span className={`text-xs ${theme.subtitleText}`}>{stats.thisMonth}/12 workouts</span>
                  </div>
                  <div className={`h-2 ${theme.bg} rounded-full overflow-hidden`}>
                    <div 
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all"
                      style={{ width: `${Math.min((stats.thisMonth / 12) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className={`${theme.cardBg} rounded-xl p-4 ${theme.cardShadow}`}>
              <h3 className={`${theme.titleText} mb-3 text-sm font-semibold flex items-center gap-2`}>
                <Award size={18} className={theme.activeNav} />
                Achievements Unlocked
              </h3>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1 px-3 py-2 bg-purple-100 dark:bg-purple-900 rounded-lg text-xs">
                  <Award size={14} className="text-purple-600 dark:text-purple-300" />
                  <span className="text-purple-800 dark:text-purple-200">10 Workouts</span>
                </div>
                <div className="flex items-center gap-1 px-3 py-2 bg-orange-100 dark:bg-orange-900 rounded-lg text-xs">
                  <Flame size={14} className="text-orange-600 dark:text-orange-300" />
                  <span className="text-orange-800 dark:text-orange-200">7-Day Streak</span>
                </div>
                <div className="flex items-center gap-1 px-3 py-2 bg-green-100 dark:bg-green-900 rounded-lg text-xs">
                  <Award size={14} className="text-green-600 dark:text-green-300" />
                  <span className="text-green-800 dark:text-green-200">5 PRs</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}