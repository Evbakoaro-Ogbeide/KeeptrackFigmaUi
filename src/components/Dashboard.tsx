import { Dumbbell, Play, TrendingUp, Calendar, Plus, Clock, ChevronRight } from 'lucide-react';

interface DashboardProps {
  onViewWorkout: (id: string) => void;
  onCreateWorkout: () => void;
}

export function Dashboard({ onViewWorkout, onCreateWorkout }: DashboardProps) {
  const nextSession = {
    id: '4',
    type: 'gym',
    title: 'Core & Abs',
    date: 'Tomorrow, 10:00 AM',
    duration: '40 min',
    exercises: 7,
  };

  const previousSession = {
    id: '1',
    type: 'running',
    title: 'Morning Run',
    date: 'Yesterday, 6:45 AM',
    duration: '32 min',
    distance: '5.2 km',
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5]">
      {/* Top App Bar - Today */}
      <div className="bg-[#6750A4] text-white px-4 py-6">
        <h1 className="text-2xl mb-1">FitTrack</h1>
        <p className="text-sm opacity-90 mb-4">Today - December 21, 2025</p>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <div className="text-3xl mb-1">12</div>
            <div className="text-xs opacity-90">This Week</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <div className="text-3xl mb-1">8.5</div>
            <div className="text-xs opacity-90">Avg Hours</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <div className="text-3xl mb-1">47</div>
            <div className="text-xs opacity-90">Total Days</div>
          </div>
        </div>
      </div>

      {/* Next Session */}
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-gray-900">Next Session</h2>
          <button className="text-[#6750A4] text-sm">View all</button>
        </div>

        <button
          onClick={() => onViewWorkout(nextSession.id)}
          className="w-full bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow text-left border-l-4 border-[#6750A4]"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-purple-100">
                {nextSession.type === 'gym' ? (
                  <Dumbbell className="text-[#6750A4]" size={24} />
                ) : (
                  <Play className="text-[#6750A4]" size={24} />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 mb-1">{nextSession.title}</h3>
                <div className="flex items-center gap-1 text-gray-600 text-sm mb-2">
                  <Clock size={14} />
                  <span>{nextSession.date}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{nextSession.duration}</span>
                  {nextSession.type === 'gym' ? (
                    <span>{nextSession.exercises} exercises</span>
                  ) : (
                    <span>{nextSession.distance}</span>
                  )}
                </div>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400 ml-2" />
          </div>
        </button>
      </div>

      {/* Previous Session */}
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-gray-900">Previous Session</h2>
          <button className="text-[#6750A4] text-sm">View all</button>
        </div>

        <button
          onClick={() => onViewWorkout(previousSession.id)}
          className="w-full bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                previousSession.type === 'gym' ? 'bg-blue-100' : 'bg-green-100'
              }`}>
                {previousSession.type === 'gym' ? (
                  <Dumbbell className="text-blue-600" size={24} />
                ) : (
                  <Play className="text-green-600" size={24} />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 mb-1">{previousSession.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{previousSession.date}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{previousSession.duration}</span>
                  {previousSession.type === 'gym' ? (
                    <span>{previousSession.exercises} exercises</span>
                  ) : (
                    <span>{previousSession.distance}</span>
                  )}
                </div>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400 ml-2" />
          </div>
        </button>
      </div>

      {/* FAB */}
      <button
        onClick={onCreateWorkout}
        className="fixed bottom-20 right-4 max-w-md w-14 h-14 bg-[#6750A4] text-white rounded-2xl shadow-lg hover:bg-[#7965b3] transition-colors flex items-center justify-center"
      >
        <Plus size={28} />
      </button>
    </div>
  );
}