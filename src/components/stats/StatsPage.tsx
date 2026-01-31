import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme, getThemeConfig } from '../../contexts/ThemeContext';
import { TrendingUp, Award, Target, Flame, Activity, Dumbbell, Library, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { firestoreService, prService } from '../../services';
import { WorkoutSession, PersonalRecord } from '../../models';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  aggregateVolumeByPeriod,
  calculateMuscleGroupBalance,
  getPRProgression,
  calculateAverageVolume,
  calculateWorkoutsPerWeek,
  getBestExercisesByVolume,
  compareCustomPeriods,
} from '../../utils/statsCalculations';
import { getMuscleGroupColor } from '../../utils/exerciseCategories';
import { 
  calculateCategoryStats, 
  getCategoryColor,
  calculateLibraryLinkageCoverage 
} from '../../utils/libraryAnalytics';

const MILLISECONDS_PER_DAY = 86400000;

type TimePeriod = 'week' | 'month' | 'year';
type TabView = 'overview' | 'charts' | 'records' | 'goals';

export const StatsPage: React.FC = () => {
  const { user } = useAuth();
  const { theme: themeVariant } = useTheme();
  const theme = getThemeConfig(themeVariant);
  const [workoutSessions, setWorkoutSessions] = useState<WorkoutSession[]>([]);
  const [personalRecords, setPersonalRecords] = useState<PersonalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [volumePeriod, setVolumePeriod] = useState<TimePeriod>('month');
  const [activeTab, setActiveTab] = useState<TabView>('overview');
  
  // Collapsible states
  const [showFilters, setShowFilters] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  
  // Filter states
  const [selectedExercise, setSelectedExercise] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [dateRangeStart, setDateRangeStart] = useState<string>('');
  const [dateRangeEnd, setDateRangeEnd] = useState<string>('');
  
  // Period comparison states
  const [period1Start, setPeriod1Start] = useState<string>('');
  const [period1End, setPeriod1End] = useState<string>('');
  const [period2Start, setPeriod2Start] = useState<string>('');
  const [period2End, setPeriod2End] = useState<string>('');

  useEffect(() => {
    if (user) {
      loadWorkoutStats(user.id);
    }
  }, [user]);

  const loadWorkoutStats = async (userId: string) => {
    setLoading(true);
    try {
      const sessions = await firestoreService.getCollection<WorkoutSession>(
        'workoutSessions',
        [
          firestoreService.whereEqual('userId', userId),
          firestoreService.orderByField('date', 'desc')
        ]
      );
      setWorkoutSessions(sessions);

      const prs = await prService.getUserPRs(userId);
      setPersonalRecords(prs);
    } catch (error) {
      console.error('Failed to load workout stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    const completedSessions = workoutSessions.filter(s => !s.isPlanned);
    const totalWorkouts = completedSessions.length;
    const totalHours = completedSessions.reduce((sum, s) => sum + (s.durationMinutes || 0), 0) / 60;
    
    const now = new Date();
    const thisMonthSessions = completedSessions.filter(s => {
      const sessionDate = new Date(s.date);
      return sessionDate.getMonth() === now.getMonth() && 
             sessionDate.getFullYear() === now.getFullYear();
    });

    const sortedDates = completedSessions
      .map(s => new Date(s.date).toDateString())
      .filter((date, index, arr) => arr.indexOf(date) === index)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    
    let streak = 0;
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - MILLISECONDS_PER_DAY).toDateString();
    
    if (sortedDates[0] === today || sortedDates[0] === yesterday) {
      streak = 1;
      for (let i = 1; i < sortedDates.length; i++) {
        const prevDate = new Date(sortedDates[i - 1]);
        const currDate = new Date(sortedDates[i]);
        const diffDays = Math.floor((prevDate.getTime() - currDate.getTime()) / MILLISECONDS_PER_DAY);
        if (diffDays === 1) {
          streak++;
        } else {
          break;
        }
      }
    }

    return {
      totalWorkouts,
      totalHours: totalHours.toFixed(1),
      thisMonth: thisMonthSessions.length,
      streak
    };
  };

  const stats = calculateStats();

  // Filter workouts and PRs based on selected filters
  const filteredWorkoutSessions = useMemo(() => {
    return workoutSessions.filter(session => {
      if (dateRangeStart && new Date(session.date) < new Date(dateRangeStart)) return false;
      if (dateRangeEnd && new Date(session.date) > new Date(dateRangeEnd)) return false;
      
      if (selectedExercise) {
        const hasExercise = session.exercises?.some(ex => 
          ex.name.toLowerCase() === selectedExercise.toLowerCase()
        );
        if (!hasExercise) return false;
      }
      
      if (selectedCategory) {
        const hasCategory = session.exercises?.some(ex => 
          ex.category === selectedCategory
        );
        if (!hasCategory) return false;
      }
      
      return true;
    });
  }, [workoutSessions, selectedExercise, selectedCategory, dateRangeStart, dateRangeEnd]);

  const filteredPersonalRecords = useMemo(() => {
    return personalRecords.filter(pr => {
      if (dateRangeStart && new Date(pr.date) < new Date(dateRangeStart)) return false;
      if (dateRangeEnd && new Date(pr.date) > new Date(dateRangeEnd)) return false;
      if (selectedExercise && pr.exerciseName.toLowerCase() !== selectedExercise.toLowerCase()) return false;
      return true;
    });
  }, [personalRecords, selectedExercise, dateRangeStart, dateRangeEnd]);

  const uniqueExercises = useMemo(() => {
    const exercises = new Set<string>();
    workoutSessions.forEach(session => {
      session.exercises?.forEach(ex => exercises.add(ex.name));
    });
    return Array.from(exercises).sort();
  }, [workoutSessions]);

  const uniqueCategories = useMemo(() => {
    const categories = new Set<string>();
    workoutSessions.forEach(session => {
      session.exercises?.forEach(ex => {
        if (ex.category) categories.add(ex.category);
      });
    });
    return Array.from(categories).sort();
  }, [workoutSessions]);

  // Prepare chart data
  const volumeData = aggregateVolumeByPeriod(filteredWorkoutSessions, volumePeriod);
  const muscleGroupData = calculateMuscleGroupBalance(filteredWorkoutSessions);
  const prProgressionData = getPRProgression(filteredPersonalRecords);
  const avgVolume = calculateAverageVolume(filteredWorkoutSessions);
  const workoutsPerWeek = calculateWorkoutsPerWeek(filteredWorkoutSessions);
  const bestExercises = getBestExercisesByVolume(filteredWorkoutSessions, 5);
  const categoryStats = calculateCategoryStats(filteredWorkoutSessions);
  const libraryCoverage = calculateLibraryLinkageCoverage(filteredWorkoutSessions);
  
  const recentPRs = useMemo(() => {
    const hasFilters = selectedExercise || selectedCategory || dateRangeStart || dateRangeEnd;
    const limit = hasFilters ? 10 : 3;
    return filteredPersonalRecords
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  }, [filteredPersonalRecords, selectedExercise, selectedCategory, dateRangeStart, dateRangeEnd]);

  const oneRepMaxPRs = useMemo(() => {
    return filteredPersonalRecords
      .filter(pr => pr.workoutType === 'gym' && pr.reps === 1)
      .sort((a, b) => (b.weight || 0) - (a.weight || 0))
      .slice(0, 5);
  }, [filteredPersonalRecords]);

  const setMaxPRs = useMemo(() => {
    return filteredPersonalRecords
      .filter(pr => pr.workoutType === 'gym' && pr.reps && pr.reps >= 6 && pr.weight && pr.weight > 0)
      .sort((a, b) => (b.weight || 0) - (a.weight || 0))
      .slice(0, 5);
  }, [filteredPersonalRecords]);

  const bodyweightPRs = useMemo(() => {
    return filteredPersonalRecords
      .filter(pr => pr.prType === 'bodyweight_reps')
      .sort((a, b) => (b.reps || 0) - (a.reps || 0))
      .slice(0, 5);
  }, [filteredPersonalRecords]);

  const periodComparisonData = useMemo(() => {
    if (!showComparison || !period1Start || !period1End || !period2Start || !period2End) {
      return null;
    }
    return compareCustomPeriods(workoutSessions, period1Start, period1End, period2Start, period2End);
  }, [showComparison, period1Start, period1End, period2Start, period2End, workoutSessions]);

  const formatTime = (seconds: number): string => {
    return seconds < 60 
      ? `${seconds.toFixed(2)}s` 
      : `${Math.floor(seconds / 60)}:${(seconds % 60).toFixed(2)}`;
  };

  const hasActiveFilters = selectedExercise || selectedCategory || dateRangeStart || dateRangeEnd;

  return (
    <div className={`flex flex-col h-screen ${theme.bg} max-w-md mx-auto`}>
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
              Filters {hasActiveFilters && `(${[selectedExercise, selectedCategory, dateRangeStart, dateRangeEnd].filter(Boolean).length})`}
            </span>
          </div>
          {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
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
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    setSelectedExercise('');
                    setSelectedCategory('');
                    setDateRangeStart('');
                    setDateRangeEnd('');
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
                  ? `${theme.activeNav} bg-[#6750A4] text-white`
                  : theme.titleText
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto px-4 py-4 pb-20">
        {loading ? (
          <div className={`${theme.cardBg} rounded-2xl p-6 text-center ${theme.cardShadow}`}>
            <p className={theme.subtitleText}>Loading stats...</p>
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                {/* Compact Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className={`${theme.cardBg} rounded-xl p-4 ${theme.cardShadow}`}>
                    <Flame size={20} className="text-orange-500 mb-2" />
                    <div className={`text-2xl font-bold ${theme.titleText}`}>{stats.streak}</div>
                    <div className={`text-xs ${theme.subtitleText}`}>Day Streak</div>
                  </div>
                  <div className={`${theme.cardBg} rounded-xl p-4 ${theme.cardShadow}`}>
                    <Target size={20} className="text-purple-500 mb-2" />
                    <div className={`text-2xl font-bold ${theme.titleText}`}>{stats.totalWorkouts}</div>
                    <div className={`text-xs ${theme.subtitleText}`}>Total Workouts</div>
                  </div>
                  <div className={`${theme.cardBg} rounded-xl p-4 ${theme.cardShadow}`}>
                    <Activity size={20} className="text-blue-500 mb-2" />
                    <div className={`text-2xl font-bold ${theme.titleText}`}>{stats.thisMonth}</div>
                    <div className={`text-xs ${theme.subtitleText}`}>This Month</div>
                  </div>
                  <div className={`${theme.cardBg} rounded-xl p-4 ${theme.cardShadow}`}>
                    <TrendingUp size={20} className="text-green-500 mb-2" />
                    <div className={`text-2xl font-bold ${theme.titleText}`}>{stats.totalHours}h</div>
                    <div className={`text-xs ${theme.subtitleText}`}>Total Hours</div>
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
                        {avgVolume > 0 ? `${(avgVolume / 1000).toFixed(1)}t` : 'N/A'}
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
                {recentPRs.length > 0 && (
                  <div className={`${theme.cardBg} rounded-xl p-4 ${theme.cardShadow}`}>
                    <h3 className={`${theme.titleText} mb-3 text-sm font-semibold flex items-center gap-2`}>
                      <Award size={18} className={theme.activeNav} />
                      Recent Personal Records
                    </h3>
                    <div className="space-y-2">
                      {recentPRs.slice(0, 3).map((pr) => (
                        <div key={pr.id} className={`p-3 ${theme.bg} rounded-lg flex justify-between items-center`}>
                          <div>
                            <div className={`text-sm font-medium ${theme.titleText}`}>{pr.exerciseName}</div>
                            <div className={`text-xs ${theme.subtitleText}`}>
                              {new Date(pr.date).toLocaleDateString()}
                            </div>
                          </div>
                          <div className={`text-sm font-semibold ${theme.activeNav}`}>
                            {pr.workoutType === 'gym' ? (
                              <span>
                                {pr.weight}kg {pr.reps && pr.reps > 1 ? `× ${pr.reps}` : ''}
                              </span>
                            ) : pr.workoutType === 'sprint' && pr.time ? (
                              <span>{formatTime(pr.time)}</span>
                            ) : null}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Top Exercises */}
                {bestExercises.length > 0 && (
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
                )}
              </div>
            )}

            {/* Charts Tab */}
            {activeTab === 'charts' && (
              <div className="space-y-4">
                {/* Volume Trends */}
                {volumeData.length > 0 && (
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
                        <CartesianGrid strokeDasharray="3 3" stroke={themeVariant === 'dark' ? '#444' : '#ddd'} />
                        <XAxis 
                          dataKey="date" 
                          stroke={themeVariant === 'dark' ? '#888' : '#666'}
                          style={{ fontSize: '10px' }}
                          tickFormatter={(value) => {
                            if (volumePeriod === 'year') return value;
                            const date = new Date(value);
                            if (isNaN(date.getTime())) return value;
                            return `${date.getMonth() + 1}/${date.getDate()}`;
                          }}
                        />
                        <YAxis stroke={themeVariant === 'dark' ? '#888' : '#666'} style={{ fontSize: '10px' }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: themeVariant === 'dark' ? '#1e1e1e' : '#fff',
                            border: '1px solid #6750A4',
                            borderRadius: '8px',
                            fontSize: '12px'
                          }}
                        />
                        <Line type="monotone" dataKey="volume" stroke="#6750A4" strokeWidth={2} dot={{ fill: '#6750A4' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* Muscle Group Balance */}
                {muscleGroupData.length > 0 && (
                  <div className={`${theme.cardBg} rounded-xl p-4 ${theme.cardShadow}`}>
                    <h3 className={`${theme.titleText} mb-4 text-sm font-semibold flex items-center gap-2`}>
                      <Dumbbell size={18} className={theme.activeNav} />
                      Muscle Group Balance
                    </h3>
                    <ResponsiveContainer width="100%" height={180}>
                      <PieChart>
                        <Pie
                          data={muscleGroupData.map(d => ({ ...d, name: d.group }))}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(entry: { name?: string; percent?: number }) => 
                            `${entry.name || ''} ${((entry.percent || 0) * 100).toFixed(0)}%`
                          }
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
                            backgroundColor: themeVariant === 'dark' ? '#1e1e1e' : '#fff',
                            border: '1px solid #6750A4',
                            borderRadius: '8px',
                            fontSize: '12px'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 space-y-2">
                      {muscleGroupData.slice(0, 5).map((stat) => (
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
                )}

                {/* Category Distribution */}
                {categoryStats.length > 0 && (
                  <div className={`${theme.cardBg} rounded-xl p-4 ${theme.cardShadow}`}>
                    <h3 className={`${theme.titleText} mb-4 text-sm font-semibold flex items-center gap-2`}>
                      <Library size={18} className={theme.activeNav} />
                      Exercise Categories
                    </h3>
                    <ResponsiveContainer width="100%" height={180}>
                      <BarChart data={categoryStats.slice(0, 8)}>
                        <CartesianGrid strokeDasharray="3 3" stroke={themeVariant === 'dark' ? '#444' : '#ddd'} />
                        <XAxis 
                          dataKey="category" 
                          stroke={themeVariant === 'dark' ? '#888' : '#666'}
                          style={{ fontSize: '10px' }}
                          angle={-45}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis stroke={themeVariant === 'dark' ? '#888' : '#666'} style={{ fontSize: '10px' }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: themeVariant === 'dark' ? '#1e1e1e' : '#fff',
                            border: '1px solid #6750A4',
                            borderRadius: '8px',
                            fontSize: '12px'
                          }}
                        />
                        <Bar dataKey="totalSets" fill="#6750A4">
                          {categoryStats.slice(0, 8).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getCategoryColor(entry.category)} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                    {libraryCoverage.total > 0 && (
                      <div className="mt-4 pt-3 border-t" style={{ borderColor: themeVariant === 'dark' ? '#444' : '#ddd' }}>
                        <div className="flex justify-between items-center text-xs">
                          <span className={theme.subtitleText}>Library Coverage</span>
                          <span className={theme.titleText}>
                            {libraryCoverage.linked}/{libraryCoverage.total} ({libraryCoverage.percentage.toFixed(0)}%)
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Period Comparison */}
                <div className={`${theme.cardBg} rounded-xl p-4 ${theme.cardShadow}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`${theme.titleText} text-sm font-semibold flex items-center gap-2`}>
                      <TrendingUp size={18} className={theme.activeNav} />
                      Period Comparison
                    </h3>
                    <button
                      onClick={() => setShowComparison(!showComparison)}
                      className={`text-xs px-3 py-1 rounded ${showComparison ? theme.activeNav : theme.subtitleText}`}
                    >
                      {showComparison ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  
                  {showComparison && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className={`text-xs ${theme.subtitleText} mb-1 block font-semibold`}>Period 1</label>
                          <input
                            type="date"
                            value={period1Start}
                            onChange={(e) => setPeriod1Start(e.target.value)}
                            placeholder="Start"
                            className={`w-full text-xs px-2 py-1.5 ${theme.bg} rounded-lg border ${theme.navBorder} ${theme.titleText} mb-1`}
                          />
                          <input
                            type="date"
                            value={period1End}
                            onChange={(e) => setPeriod1End(e.target.value)}
                            placeholder="End"
                            className={`w-full text-xs px-2 py-1.5 ${theme.bg} rounded-lg border ${theme.navBorder} ${theme.titleText}`}
                          />
                        </div>
                        <div>
                          <label className={`text-xs ${theme.subtitleText} mb-1 block font-semibold`}>Period 2</label>
                          <input
                            type="date"
                            value={period2Start}
                            onChange={(e) => setPeriod2Start(e.target.value)}
                            placeholder="Start"
                            className={`w-full text-xs px-2 py-1.5 ${theme.bg} rounded-lg border ${theme.navBorder} ${theme.titleText} mb-1`}
                          />
                          <input
                            type="date"
                            value={period2End}
                            onChange={(e) => setPeriod2End(e.target.value)}
                            placeholder="End"
                            className={`w-full text-xs px-2 py-1.5 ${theme.bg} rounded-lg border ${theme.navBorder} ${theme.titleText}`}
                          />
                        </div>
                      </div>

                      {periodComparisonData && (
                        <div className="pt-3 border-t space-y-2" style={{ borderColor: themeVariant === 'dark' ? '#444' : '#ddd' }}>
                          {[
                            { label: 'Workouts', p1: periodComparisonData.period1.workouts, p2: periodComparisonData.period2.workouts, change: periodComparisonData.comparison.workouts },
                            { label: 'Volume', p1: `${(periodComparisonData.period1.volume / 1000).toFixed(1)}t`, p2: `${(periodComparisonData.period2.volume / 1000).toFixed(1)}t`, change: periodComparisonData.comparison.volume },
                            { label: 'Avg Sets', p1: periodComparisonData.period1.avgSets.toFixed(1), p2: periodComparisonData.period2.avgSets.toFixed(1), change: periodComparisonData.comparison.avgSets },
                          ].map((item) => (
                            <div key={item.label} className="flex justify-between items-center text-xs">
                              <span className={theme.subtitleText}>{item.label}</span>
                              <div className="flex items-center gap-2">
                                <span className={theme.titleText}>{item.p1} → {item.p2}</span>
                                <span className={`font-semibold ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                  {item.change >= 0 ? '+' : ''}{item.change.toFixed(1)}%
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Records Tab */}
            {activeTab === 'records' && (
              <div className="space-y-4">
                {/* One Rep Max */}
                {oneRepMaxPRs.length > 0 && (
                  <div className={`${theme.cardBg} rounded-xl p-4 ${theme.cardShadow}`}>
                    <h3 className={`${theme.titleText} mb-3 text-sm font-semibold flex items-center gap-2`}>
                      <Award size={18} className={theme.activeNav} />
                      One Rep Max (1RM)
                    </h3>
                    <div className="space-y-2">
                      {oneRepMaxPRs.map((pr) => (
                        <div key={pr.id} className={`p-3 ${theme.bg} rounded-lg flex justify-between items-center`}>
                          <div>
                            <div className={`text-sm font-medium ${theme.titleText}`}>{pr.exerciseName}</div>
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
                )}

                {/* Set Max */}
                {setMaxPRs.length > 0 && (
                  <div className={`${theme.cardBg} rounded-xl p-4 ${theme.cardShadow}`}>
                    <h3 className={`${theme.titleText} mb-3 text-sm font-semibold flex items-center gap-2`}>
                      <Award size={18} className={theme.activeNav} />
                      Set Max (6+ Reps)
                    </h3>
                    <div className="space-y-2">
                      {setMaxPRs.map((pr) => (
                        <div key={pr.id} className={`p-3 ${theme.bg} rounded-lg flex justify-between items-center`}>
                          <div>
                            <div className={`text-sm font-medium ${theme.titleText}`}>{pr.exerciseName}</div>
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
                )}

                {/* Bodyweight Max Reps */}
                {bodyweightPRs.length > 0 && (
                  <div className={`${theme.cardBg} rounded-xl p-4 ${theme.cardShadow}`}>
                    <h3 className={`${theme.titleText} mb-3 text-sm font-semibold flex items-center gap-2`}>
                      <Award size={18} className={theme.activeNav} />
                      Bodyweight Max Reps
                    </h3>
                    <div className="space-y-2">
                      {bodyweightPRs.map((pr) => (
                        <div key={pr.id} className={`p-3 ${theme.bg} rounded-lg flex justify-between items-center`}>
                          <div>
                            <div className={`text-sm font-medium ${theme.titleText}`}>{pr.exerciseName}</div>
                            <div className={`text-xs ${theme.subtitleText}`}>
                              {new Date(pr.date).toLocaleDateString()}
                            </div>
                          </div>
                          <div className={`text-sm font-semibold ${theme.activeNav}`}>
                            {pr.reps} reps
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* PR Progression */}
                {prProgressionData.length > 0 && (
                  <div className={`${theme.cardBg} rounded-xl p-4 ${theme.cardShadow}`}>
                    <h3 className={`${theme.titleText} mb-4 text-sm font-semibold flex items-center gap-2`}>
                      <TrendingUp size={18} className={theme.activeNav} />
                      PR Progression
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={prProgressionData.slice(-10)}>
                        <CartesianGrid strokeDasharray="3 3" stroke={themeVariant === 'dark' ? '#444' : '#ddd'} />
                        <XAxis 
                          dataKey="exerciseName" 
                          stroke={themeVariant === 'dark' ? '#888' : '#666'}
                          style={{ fontSize: '10px' }}
                          angle={-45}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis stroke={themeVariant === 'dark' ? '#888' : '#666'} style={{ fontSize: '10px' }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: themeVariant === 'dark' ? '#1e1e1e' : '#fff',
                            border: '1px solid #6750A4',
                            borderRadius: '8px',
                            fontSize: '12px'
                          }}
                        />
                        <Bar dataKey="value" fill="#6750A4" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {oneRepMaxPRs.length === 0 && setMaxPRs.length === 0 && bodyweightPRs.length === 0 && (
                  <div className={`${theme.cardBg} rounded-xl p-6 text-center ${theme.cardShadow}`}>
                    <p className={`text-sm ${theme.subtitleText}`}>
                      No personal records found{hasActiveFilters && ' for selected filters'}
                    </p>
                  </div>
                )}
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
                    {stats.totalWorkouts >= 10 && (
                      <div className="flex items-center gap-1 px-3 py-2 bg-purple-100 dark:bg-purple-900 rounded-lg text-xs">
                        <Award size={14} className="text-purple-600 dark:text-purple-300" />
                        <span className="text-purple-800 dark:text-purple-200">10 Workouts</span>
                      </div>
                    )}
                    {stats.totalWorkouts >= 50 && (
                      <div className="flex items-center gap-1 px-3 py-2 bg-blue-100 dark:bg-blue-900 rounded-lg text-xs">
                        <Award size={14} className="text-blue-600 dark:text-blue-300" />
                        <span className="text-blue-800 dark:text-blue-200">50 Workouts</span>
                      </div>
                    )}
                    {stats.streak >= 7 && (
                      <div className="flex items-center gap-1 px-3 py-2 bg-orange-100 dark:bg-orange-900 rounded-lg text-xs">
                        <Flame size={14} className="text-orange-600 dark:text-orange-300" />
                        <span className="text-orange-800 dark:text-orange-200">7-Day Streak</span>
                      </div>
                    )}
                    {personalRecords.length >= 5 && (
                      <div className="flex items-center gap-1 px-3 py-2 bg-green-100 dark:bg-green-900 rounded-lg text-xs">
                        <Award size={14} className="text-green-600 dark:text-green-300" />
                        <span className="text-green-800 dark:text-green-200">5 PRs</span>
                      </div>
                    )}
                  </div>
                  {stats.totalWorkouts < 10 && stats.streak < 7 && personalRecords.length < 5 && (
                    <p className={`text-sm ${theme.subtitleText} text-center mt-4`}>
                      Keep training to unlock achievements!
                    </p>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
