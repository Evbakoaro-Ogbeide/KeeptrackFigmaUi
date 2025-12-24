import { TrendingUp, Calendar, Clock, Award, Target, Flame } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';

export function StatsStandard() {
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

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#6750A4] to-[#4e3a8f] text-white px-4 py-4">
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
        <div className="bg-white rounded-2xl p-4 shadow-md mb-4">
          <h3 className="text-[#1C1B1F] mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-[#6750A4]" />
            Weekly Activity
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Bar dataKey="workouts" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6750A4" />
                  <stop offset="100%" stopColor="#5544a0" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Progress */}
        <div className="bg-white rounded-2xl p-4 shadow-md mb-4">
          <h3 className="text-[#1C1B1F] mb-4 flex items-center gap-2">
            <Calendar size={20} className="text-[#6750A4]" />
            Monthly Progress
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={monthlyProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Line type="monotone" dataKey="count" stroke="#6750A4" strokeWidth={3} dot={{ fill: '#6750A4', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Personal Records */}
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <h3 className="text-[#1C1B1F] mb-3 flex items-center gap-2">
            <Award size={20} className="text-[#6750A4]" />
            Personal Records
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Longest Streak</span>
              <span className="text-[#1C1B1F]">14 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Most Workouts/Week</span>
              <span className="text-[#1C1B1F]">12 sessions</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Longest Run</span>
              <span className="text-[#1C1B1F]">12.5 km</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
