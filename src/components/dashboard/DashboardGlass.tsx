import { Dumbbell, Play, Plus, Clock, ChevronRight, Calendar } from 'lucide-react';

interface DashboardGlassProps {
  onViewWorkout: (id: string) => void;
  onCreateWorkout: () => void;
}

export function DashboardGlass({ onViewWorkout, onCreateWorkout }: DashboardGlassProps) {
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
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">
      {/* Header with Stats */}
      <div className="bg-white/20 backdrop-blur-xl text-white px-4 py-5 border-b border-white/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl mb-1">FitTrack</h1>
            <p className="text-sm opacity-90">Today - December 24, 2025</p>
          </div>
        </div>
        
        {/* Inline Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/30 backdrop-blur-md rounded-2xl p-3 border border-white/20">
            <div className="text-2xl mb-1">12</div>
            <div className="text-xs opacity-90">This Week</div>
          </div>
          <div className="bg-white/30 backdrop-blur-md rounded-2xl p-3 border border-white/20">
            <div className="text-2xl mb-1">8.5</div>
            <div className="text-xs opacity-90">Avg Hours</div>
          </div>
          <div className="bg-white/30 backdrop-blur-md rounded-2xl p-3 border border-white/20">
            <div className="text-2xl mb-1">47</div>
            <div className="text-xs opacity-90">Total Days</div>
          </div>
        </div>
      </div>

      {/* Hero Next Session Card */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm text-white/90">Up Next</h2>
          <button className="text-white text-sm">View schedule</button>
        </div>

        <div className="bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-2xl overflow-hidden">
          <div className="p-6">
            <div className="flex justify-center mb-4">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${
                nextSession.type === 'gym'
                  ? 'bg-white/50 backdrop-blur-md border border-white/30'
                  : 'bg-white/50 backdrop-blur-md border border-white/30'
              }`}>
                {nextSession.type === 'gym' ? (
                  <Dumbbell className="text-blue-700" size={36} />
                ) : (
                  <Play className="text-green-700" size={36} />
                )}
              </div>
            </div>

            <div className="text-center mb-4">
              <h3 className="text-2xl text-gray-900 mb-2">{nextSession.title}</h3>
              <div className="flex items-center justify-center gap-2 text-gray-700 mb-3">
                <Calendar size={16} />
                <span>{nextSession.date} • {nextSession.time}</span>
              </div>
              
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-1 text-gray-700">
                  <Clock size={16} />
                  <span>{nextSession.duration}</span>
                </div>
                <div className="text-gray-700">
                  {nextSession.exercises} exercises
                </div>
              </div>
            </div>

            <button
              onClick={() => onViewWorkout(nextSession.id)}
              className="w-full bg-white/60 backdrop-blur-md text-gray-900 py-3 rounded-2xl hover:bg-white/80 transition-all shadow-lg border border-white/40"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="px-4 pb-4 flex-1">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm text-white/90">Recent Activity</h2>
          <button className="text-white text-sm">View all</button>
        </div>

        <div className="space-y-2">
          {recentSessions.map((session) => (
            <button
              key={session.id}
              onClick={() => onViewWorkout(session.id)}
              className="w-full bg-white/30 backdrop-blur-lg rounded-xl p-3 border border-white/20 hover:bg-white/40 transition-all text-left flex items-center gap-3"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white/40 backdrop-blur-md border border-white/30`}>
                {session.type === 'gym' ? (
                  <Dumbbell className="text-blue-700" size={18} />
                ) : (
                  <Play className="text-green-700" size={18} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm text-white truncate">{session.title}</h3>
                <p className="text-xs text-white/80">{session.date}</p>
              </div>
              <div className="text-right text-xs">
                <div className="text-white">{session.duration}</div>
                <div className="text-white/80">{session.detail}</div>
              </div>
              <ChevronRight size={16} className="text-white/60" />
            </button>
          ))}
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={onCreateWorkout}
        className="fixed bottom-20 right-4 max-w-md w-14 h-14 bg-white/40 backdrop-blur-xl text-gray-900 rounded-2xl shadow-xl border border-white/30 hover:bg-white/60 transition-all flex items-center justify-center"
      >
        <Plus size={28} />
      </button>
    </div>
  );
}
