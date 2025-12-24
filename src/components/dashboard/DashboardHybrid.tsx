import { Dumbbell, Play, Plus, Clock, ChevronRight, Calendar } from 'lucide-react';

interface DashboardHybridProps {
  onViewWorkout: (id: string) => void;
  onCreateWorkout: () => void;
}

export function DashboardHybrid({ onViewWorkout, onCreateWorkout }: DashboardHybridProps) {
  const nextSession = {
    id: '4',
    type: 'gym',
    title: 'Core & Abs',
    date: 'Tomorrow',
    time: '10:00 AM',
    duration: '40 min',
    exercises: 7,
  };

  const recentSessions = [
    { id: '1', type: 'running', title: 'Morning Run', date: 'Yesterday', duration: '32m', detail: '5.2 km' },
    { id: '2', type: 'gym', title: 'Upper Body', date: 'Dec 22', duration: '55m', detail: '9 exercises' },
    { id: '3', type: 'running', title: 'Evening Jog', date: 'Dec 21', duration: '25m', detail: '4.1 km' },
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Compact Header with Stats */}
      <div className="bg-gradient-to-br from-[#6750A4] to-[#4e3a8f] text-white px-4 py-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl mb-1">FitTrack</h1>
            <p className="text-sm opacity-80">Today - December 24, 2025</p>
          </div>
        </div>
        
        {/* Inline Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <div className="text-2xl mb-1">12</div>
            <div className="text-xs opacity-90">This Week</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <div className="text-2xl mb-1">8.5</div>
            <div className="text-xs opacity-90">Avg Hours</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <div className="text-2xl mb-1">47</div>
            <div className="text-xs opacity-90">Total Days</div>
          </div>
        </div>
      </div>

      {/* Hero Next Session Card */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm text-gray-600">Up Next</h2>
          <button className="text-[#6750A4] text-sm">View schedule</button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-purple-200/40 overflow-hidden">
          <div className="p-6">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${
                nextSession.type === 'gym'
                  ? 'bg-gradient-to-br from-blue-100 to-blue-200'
                  : 'bg-gradient-to-br from-green-100 to-green-200'
              }`}>
                {nextSession.type === 'gym' ? (
                  <Dumbbell className="text-blue-600" size={36} />
                ) : (
                  <Play className="text-green-600" size={36} />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="text-center mb-4">
              <h3 className="text-2xl text-[#1C1B1F] mb-2">{nextSession.title}</h3>
              <div className="flex items-center justify-center gap-2 text-gray-600 mb-3">
                <Calendar size={16} />
                <span>{nextSession.date} • {nextSession.time}</span>
              </div>
              
              {/* Stats */}
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-1 text-gray-600">
                  <Clock size={16} />
                  <span>{nextSession.duration}</span>
                </div>
                <div className="text-gray-600">
                  {nextSession.exercises} exercises
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => onViewWorkout(nextSession.id)}
              className="w-full bg-gradient-to-r from-[#6750A4] to-[#5544a0] text-white py-3 rounded-2xl hover:from-[#7965b3] hover:to-[#6855b0] transition-all shadow-md"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Recent Sessions - Compact List */}
      <div className="px-4 pb-4 flex-1">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm text-gray-600">Recent Activity</h2>
          <button className="text-[#6750A4] text-sm">View all</button>
        </div>

        <div className="space-y-2">
          {recentSessions.map((session) => (
            <button
              key={session.id}
              onClick={() => onViewWorkout(session.id)}
              className="w-full bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-sm hover:shadow-md transition-all text-left flex items-center gap-3"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                session.type === 'gym'
                  ? 'bg-gradient-to-br from-blue-100 to-blue-200'
                  : 'bg-gradient-to-br from-green-100 to-green-200'
              }`}>
                {session.type === 'gym' ? (
                  <Dumbbell className="text-blue-600" size={18} />
                ) : (
                  <Play className="text-green-600" size={18} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm text-[#1C1B1F] truncate">{session.title}</h3>
                <p className="text-xs text-gray-500">{session.date}</p>
              </div>
              <div className="text-right text-xs">
                <div className="text-[#6750A4]">{session.duration}</div>
                <div className="text-gray-500">{session.detail}</div>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </button>
          ))}
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={onCreateWorkout}
        className="fixed bottom-20 right-4 max-w-md w-14 h-14 bg-gradient-to-r from-[#6750A4] to-[#5544a0] text-white rounded-2xl shadow-lg hover:from-[#7965b3] hover:to-[#6855b0] transition-all flex items-center justify-center"
      >
        <Plus size={28} />
      </button>
    </div>
  );
}
