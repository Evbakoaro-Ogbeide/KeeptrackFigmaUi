import { ArrowLeft, Plus, Dumbbell, Play, Filter, Search } from 'lucide-react';

interface WorkoutsStandardProps {
  onViewWorkout: (id: string) => void;
  onCreateWorkout: () => void;
}

export function WorkoutsStandard({ onViewWorkout, onCreateWorkout }: WorkoutsStandardProps) {
  const workouts = [
    { id: '1', type: 'running', title: 'Morning Run', date: 'Dec 24, 2025', duration: '32 min', detail: '5.2 km', completed: true },
    { id: '2', type: 'gym', title: 'Upper Body Strength', date: 'Dec 22, 2025', duration: '55 min', detail: '9 exercises', completed: true },
    { id: '3', type: 'running', title: 'Evening Jog', date: 'Dec 21, 2025', duration: '25 min', detail: '4.1 km', completed: true },
    { id: '4', type: 'gym', title: 'Core & Abs', date: 'Dec 20, 2025', duration: '40 min', detail: '7 exercises', completed: false },
    { id: '5', type: 'gym', title: 'Leg Day', date: 'Dec 18, 2025', duration: '50 min', detail: '8 exercises', completed: true },
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#6750A4] to-[#4e3a8f] text-white px-4 py-4">
        <h1 className="text-2xl mb-4">Workouts</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={20} />
          <input
            type="text"
            placeholder="Search workouts..."
            className="w-full bg-white/20 backdrop-blur-sm text-white placeholder-white/60 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:bg-white/30"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 py-3 flex gap-2 border-b border-purple-200 bg-white/50">
        <button className="px-4 py-2 bg-gradient-to-r from-[#6750A4] to-[#5544a0] text-white rounded-full text-sm">
          All
        </button>
        <button className="px-4 py-2 bg-white text-gray-600 rounded-full text-sm hover:bg-purple-50">
          Gym
        </button>
        <button className="px-4 py-2 bg-white text-gray-600 rounded-full text-sm hover:bg-purple-50">
          Running
        </button>
        <button className="px-4 py-2 bg-white text-gray-600 rounded-full text-sm hover:bg-purple-50">
          <Filter size={16} />
        </button>
      </div>

      {/* Workouts List */}
      <div className="flex-1 overflow-auto px-4 py-4">
        <div className="space-y-3">
          {workouts.map((workout) => (
            <button
              key={workout.id}
              onClick={() => onViewWorkout(workout.id)}
              className="w-full bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow text-left"
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  workout.type === 'gym'
                    ? 'bg-gradient-to-br from-blue-100 to-blue-200'
                    : 'bg-gradient-to-br from-green-100 to-green-200'
                }`}>
                  {workout.type === 'gym' ? (
                    <Dumbbell className="text-blue-600" size={24} />
                  ) : (
                    <Play className="text-green-600" size={24} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[#1C1B1F]">{workout.title}</h3>
                    {workout.completed && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                        Completed
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{workout.date}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{workout.duration}</span>
                    <span>{workout.detail}</span>
                  </div>
                </div>
              </div>
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
