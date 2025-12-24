import { Dumbbell, Play, Plus, Clock, ChevronRight } from 'lucide-react';

interface DashboardVariantProps {
  onViewWorkout: (id: string) => void;
  onCreateWorkout: () => void;
}

export function DashboardVariant({ onViewWorkout, onCreateWorkout }: DashboardVariantProps) {
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
    <div className="flex flex-col h-full bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Top App Bar - Today */}
      <div className="bg-gradient-to-br from-[#6750A4] to-[#4e3a8f] text-white px-4 py-6">
        <h1 className="text-2xl mb-1">FitTrack</h1>
        <p className="text-sm opacity-90 mb-4">Today - December 24, 2025</p>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/25 backdrop-blur-sm rounded-xl p-3">
            <div className="text-3xl mb-1">12</div>
            <div className="text-xs opacity-90">This Week</div>
          </div>
          <div className="bg-white/25 backdrop-blur-sm rounded-xl p-3">
            <div className="text-3xl mb-1">8.5</div>
            <div className="text-xs opacity-90">Avg Hours</div>
          </div>
          <div className="bg-white/25 backdrop-blur-sm rounded-xl p-3">
            <div className="text-3xl mb-1">47</div>
            <div className="text-xs opacity-90">Total Days</div>
          </div>
        </div>
      </div>

      {/* Next Session */}
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[#1C1B1F]">Next Session</h2>
          <button className="text-[#6750A4] text-sm">View all</button>
        </div>

        <button
          onClick={() => onViewWorkout(nextSession.id)}
          className="w-full bg-white rounded-2xl p-4 shadow-lg shadow-purple-200/30 hover:shadow-xl transition-shadow text-left border-l-4 border-l-[#6750A4]"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                {nextSession.type === 'gym' ? (
                  <Dumbbell className="text-blue-600" size={24} />
                ) : (
                  <Play className="text-[#6750A4]" size={24} />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-[#1C1B1F] mb-1">{nextSession.title}</h3>
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
            <ChevronRight size={20} className="text-gray-600" />
          </div>
        </button>
      </div>

      {/* Previous Session */}
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[#1C1B1F]">Previous Session</h2>
          <button className="text-[#6750A4] text-sm">View all</button>
        </div>

        <button
          onClick={() => onViewWorkout(previousSession.id)}
          className="w-full bg-white rounded-2xl p-4 shadow-lg shadow-purple-200/30 hover:shadow-xl transition-shadow text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                previousSession.type === 'gym' 
                  ? 'bg-gradient-to-br from-blue-100 to-blue-200' 
                  : 'bg-gradient-to-br from-green-100 to-green-200'
              }`}>
                {previousSession.type === 'gym' ? (
                  <Dumbbell className="text-blue-600" size={24} />
                ) : (
                  <Play className="text-green-600" size={24} />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-[#1C1B1F] mb-1">{previousSession.title}</h3>
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
            <ChevronRight size={20} className="text-gray-600" />
          </div>
        </button>
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
