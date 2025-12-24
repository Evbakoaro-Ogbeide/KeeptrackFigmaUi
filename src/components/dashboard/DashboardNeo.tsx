import { Dumbbell, Play, Plus, Clock, ChevronRight, Calendar } from 'lucide-react';

interface DashboardNeoProps {
  onViewWorkout: (id: string) => void;
  onCreateWorkout: () => void;
}

export function DashboardNeo({ onViewWorkout, onCreateWorkout }: DashboardNeoProps) {
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
    <div className="flex flex-col h-full bg-gradient-to-br from-emerald-50 to-cyan-50">
      {/* Header with Stats */}
      <div className="bg-gradient-to-br from-emerald-500 to-cyan-500 text-white px-4 py-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl mb-1">FitTrack</h1>
            <p className="text-sm opacity-80">Today - December 24, 2025</p>
          </div>
        </div>
        
        {/* Inline Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-3 shadow-lg">
            <div className="text-2xl mb-1 text-emerald-600">12</div>
            <div className="text-xs text-emerald-700">This Week</div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-lg">
            <div className="text-2xl mb-1 text-cyan-600">8.5</div>
            <div className="text-xs text-cyan-700">Avg Hours</div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-lg">
            <div className="text-2xl mb-1 text-teal-600">47</div>
            <div className="text-xs text-teal-700">Total Days</div>
          </div>
        </div>
      </div>

      {/* Hero Next Session Card */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm text-gray-600">Up Next</h2>
          <button className="text-emerald-600 text-sm">View schedule</button>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl shadow-emerald-200/50 overflow-hidden border-2 border-emerald-100">
          <div className="p-6">
            <div className="flex justify-center mb-4">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg ${
                nextSession.type === 'gym'
                  ? 'bg-gradient-to-br from-cyan-100 to-cyan-200'
                  : 'bg-gradient-to-br from-emerald-100 to-emerald-200'
              }`}>
                {nextSession.type === 'gym' ? (
                  <Dumbbell className="text-cyan-600" size={36} />
                ) : (
                  <Play className="text-emerald-600" size={36} />
                )}
              </div>
            </div>

            <div className="text-center mb-4">
              <h3 className="text-2xl text-gray-900 mb-2">{nextSession.title}</h3>
              <div className="flex items-center justify-center gap-2 text-gray-600 mb-3">
                <Calendar size={16} />
                <span>{nextSession.date} • {nextSession.time}</span>
              </div>
              
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

            <button
              onClick={() => onViewWorkout(nextSession.id)}
              className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-3 rounded-2xl hover:from-emerald-600 hover:to-cyan-600 transition-all shadow-lg"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="px-4 pb-4 flex-1">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm text-gray-600">Recent Activity</h2>
          <button className="text-emerald-600 text-sm">View all</button>
        </div>

        <div className="space-y-2">
          {recentSessions.map((session) => (
            <button
              key={session.id}
              onClick={() => onViewWorkout(session.id)}
              className="w-full bg-white rounded-xl p-3 shadow-md hover:shadow-lg transition-all text-left flex items-center gap-3 border border-emerald-100"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                session.type === 'gym'
                  ? 'bg-gradient-to-br from-cyan-100 to-cyan-200'
                  : 'bg-gradient-to-br from-emerald-100 to-emerald-200'
              }`}>
                {session.type === 'gym' ? (
                  <Dumbbell className="text-cyan-600" size={18} />
                ) : (
                  <Play className="text-emerald-600" size={18} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm text-gray-900 truncate">{session.title}</h3>
                <p className="text-xs text-gray-500">{session.date}</p>
              </div>
              <div className="text-right text-xs">
                <div className="text-emerald-600">{session.duration}</div>
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
        className="fixed bottom-20 right-4 max-w-md w-14 h-14 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-2xl shadow-lg hover:from-emerald-600 hover:to-cyan-600 transition-all flex items-center justify-center"
      >
        <Plus size={28} />
      </button>
    </div>
  );
}
