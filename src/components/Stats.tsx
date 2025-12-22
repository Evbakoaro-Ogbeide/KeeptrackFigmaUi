import { TrendingUp, TrendingDown, Calendar, Dumbbell, Play } from 'lucide-react';

export function Stats() {
  const weeklyData = [
    { day: 'Mon', value: 45 },
    { day: 'Tue', value: 60 },
    { day: 'Wed', value: 30 },
    { day: 'Thu', value: 55 },
    { day: 'Fri', value: 40 },
    { day: 'Sat', value: 70 },
    { day: 'Sun', value: 50 },
  ];

  const maxValue = Math.max(...weeklyData.map(d => d.value));

  return (
    <div className="min-h-full bg-[#F5F5F5]">
      {/* Top App Bar */}
      <div className="bg-[#6750A4] text-white px-4 py-6 pb-8">
        <h1 className="text-2xl mb-6">Your Progress</h1>

        {/* Time Period Selector */}
        <div className="flex gap-2 mb-4">
          <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm">
            Week
          </button>
          <button className="px-4 py-2 hover:bg-white/10 rounded-full text-sm transition-colors">
            Month
          </button>
          <button className="px-4 py-2 hover:bg-white/10 rounded-full text-sm transition-colors">
            Year
          </button>
        </div>
      </div>

      <div className="px-4 -mt-4 space-y-4">
        {/* Weekly Overview */}
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <h2 className="text-gray-900 mb-4">This Week</h2>
          
          {/* Bar Chart */}
          <div className="flex items-end justify-between gap-2 h-40 mb-4">
            {weeklyData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center flex-1">
                  <div
                    className="w-full bg-[#6750A4] rounded-t-lg transition-all hover:bg-[#7965b3]"
                    style={{ height: `${(item.value / maxValue) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600">{item.day}</span>
              </div>
            ))}
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
            <div>
              <div className="text-gray-600 text-sm mb-1">Total Time</div>
              <div className="text-gray-900 text-xl">5.8h</div>
            </div>
            <div>
              <div className="text-gray-600 text-sm mb-1">Workouts</div>
              <div className="text-gray-900 text-xl">12</div>
            </div>
            <div>
              <div className="text-gray-600 text-sm mb-1">Streak</div>
              <div className="text-gray-900 text-xl">7 days</div>
            </div>
          </div>
        </div>

        {/* Activity Breakdown */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-gray-900 mb-4">Activity Breakdown</h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Dumbbell size={16} className="text-blue-600" />
                  </div>
                  <span className="text-gray-900">Gym Sessions</span>
                </div>
                <span className="text-gray-900">8</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '67%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Play size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-900">Running</span>
                </div>
                <span className="text-gray-900">4</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '33%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="text-green-600" size={20} />
              </div>
              <span className="text-gray-600">Avg Duration</span>
            </div>
            <div className="text-2xl text-gray-900 mb-1">42 min</div>
            <div className="text-sm text-green-600">+5 min from last week</div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Calendar className="text-purple-600" size={20} />
              </div>
              <span className="text-gray-600">Consistency</span>
            </div>
            <div className="text-2xl text-gray-900 mb-1">85%</div>
            <div className="text-sm text-purple-600">Great job!</div>
          </div>
        </div>

        {/* Running Stats */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Play className="text-green-600" size={20} />
            <h2 className="text-gray-900">Running Stats</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-gray-600 text-sm mb-1">Total Distance</div>
              <div className="text-gray-900 text-xl mb-1">24.8 km</div>
              <div className="text-sm text-green-600 flex items-center gap-1">
                <TrendingUp size={14} />
                +3.2 km
              </div>
            </div>
            <div>
              <div className="text-gray-600 text-sm mb-1">Avg Pace</div>
              <div className="text-gray-900 text-xl mb-1">5:42/km</div>
              <div className="text-sm text-green-600 flex items-center gap-1">
                <TrendingUp size={14} />
                -0:15/km
              </div>
            </div>
            <div>
              <div className="text-gray-600 text-sm mb-1">Longest Run</div>
              <div className="text-gray-900 text-xl">10.5 km</div>
            </div>
            <div>
              <div className="text-gray-600 text-sm mb-1">Total Time</div>
              <div className="text-gray-900 text-xl">2h 21m</div>
            </div>
          </div>
        </div>

        {/* Gym Stats */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Dumbbell className="text-blue-600" size={20} />
            <h2 className="text-gray-900">Gym Stats</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-gray-600 text-sm mb-1">Total Volume</div>
              <div className="text-gray-900 text-xl mb-1">22,850 kg</div>
              <div className="text-sm text-green-600 flex items-center gap-1">
                <TrendingUp size={14} />
                +2,100 kg
              </div>
            </div>
            <div>
              <div className="text-gray-600 text-sm mb-1">Total Sets</div>
              <div className="text-gray-900 text-xl mb-1">192</div>
              <div className="text-sm text-green-600 flex items-center gap-1">
                <TrendingUp size={14} />
                +15 sets
              </div>
            </div>
            <div>
              <div className="text-gray-600 text-sm mb-1">Avg Weight</div>
              <div className="text-gray-900 text-xl">35 kg</div>
            </div>
            <div>
              <div className="text-gray-600 text-sm mb-1">Total Time</div>
              <div className="text-gray-900 text-xl">6h 15m</div>
            </div>
          </div>
        </div>

        {/* Personal Records */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <h2 className="text-gray-900 mb-4">Recent Personal Records 🏆</h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl">
              <div>
                <div className="text-gray-900">Bench Press</div>
                <div className="text-sm text-gray-600">85 kg × 8 reps</div>
              </div>
              <div className="text-sm text-gray-600">2 days ago</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl">
              <div>
                <div className="text-gray-900">5K Run</div>
                <div className="text-sm text-gray-600">27:30 min</div>
              </div>
              <div className="text-sm text-gray-600">5 days ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
