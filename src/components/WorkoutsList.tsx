import { useState } from 'react';
import { Dumbbell, Play, Filter, Search, Plus } from 'lucide-react';

interface WorkoutsListProps {
  onViewWorkout: (id: string) => void;
  onCreateWorkout: () => void;
}

export function WorkoutsList({ onViewWorkout, onCreateWorkout }: WorkoutsListProps) {
  const [filterType, setFilterType] = useState<'all' | 'gym' | 'running'>('all');

  const workouts = [
    {
      id: '1',
      type: 'gym',
      title: 'Upper Body Strength',
      date: 'Today, 9:30 AM',
      duration: '45 min',
      exercises: 8,
    },
    {
      id: '2',
      type: 'running',
      title: 'Morning Run',
      date: 'Yesterday, 6:45 AM',
      duration: '32 min',
      distance: '5.2 km',
    },
    {
      id: '3',
      type: 'gym',
      title: 'Leg Day',
      date: 'Nov 25, 5:00 PM',
      duration: '52 min',
      exercises: 6,
    },
    {
      id: '4',
      type: 'running',
      title: 'Evening Jog',
      date: 'Nov 24, 6:30 PM',
      duration: '28 min',
      distance: '4.1 km',
    },
    {
      id: '5',
      type: 'gym',
      title: 'Full Body Workout',
      date: 'Nov 23, 10:00 AM',
      duration: '60 min',
      exercises: 10,
    },
    {
      id: '6',
      type: 'running',
      title: 'Interval Training',
      date: 'Nov 22, 7:00 AM',
      duration: '35 min',
      distance: '6.0 km',
    },
    {
      id: '7',
      type: 'gym',
      title: 'Core & Abs',
      date: 'Nov 21, 4:30 PM',
      duration: '30 min',
      exercises: 7,
    },
    {
      id: '8',
      type: 'running',
      title: 'Long Distance Run',
      date: 'Nov 20, 6:00 AM',
      duration: '65 min',
      distance: '10.5 km',
    },
  ];

  const filteredWorkouts = filterType === 'all' 
    ? workouts 
    : workouts.filter(w => w.type === filterType);

  return (
    <div className="min-h-full bg-[#F5F5F5]">
      {/* Top App Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <h1 className="text-xl text-gray-900 mb-4">All Workouts</h1>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search workouts..."
            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl border-0 focus:ring-2 focus:ring-[#6750A4] outline-none"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-full transition-colors ${
              filterType === 'all'
                ? 'bg-[#6750A4] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType('gym')}
            className={`px-4 py-2 rounded-full transition-colors flex items-center gap-2 ${
              filterType === 'gym'
                ? 'bg-[#6750A4] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Dumbbell size={16} />
            Gym
          </button>
          <button
            onClick={() => setFilterType('running')}
            className={`px-4 py-2 rounded-full transition-colors flex items-center gap-2 ${
              filterType === 'running'
                ? 'bg-[#6750A4] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Play size={16} />
            Running
          </button>
        </div>
      </div>

      {/* Workouts List */}
      <div className="p-4 space-y-3">
        {filteredWorkouts.map((workout) => (
          <button
            key={workout.id}
            onClick={() => onViewWorkout(workout.id)}
            className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow text-left"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  workout.type === 'gym' ? 'bg-blue-100' : 'bg-green-100'
                }`}>
                  {workout.type === 'gym' ? (
                    <Dumbbell className="text-blue-600" size={24} />
                  ) : (
                    <Play className="text-green-600" size={24} />
                  )}
                </div>
                <div>
                  <h3 className="text-gray-900 mb-1">{workout.title}</h3>
                  <p className="text-gray-600 text-sm">{workout.date}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600 ml-15">
              <span>⏱️ {workout.duration}</span>
              {workout.type === 'gym' ? (
                <span>💪 {workout.exercises} exercises</span>
              ) : (
                <span>📍 {workout.distance}</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* FAB */}
      <button
        onClick={onCreateWorkout}
        className="fixed bottom-20 right-4 w-14 h-14 bg-[#6750A4] text-white rounded-2xl shadow-lg hover:bg-[#7965b3] transition-colors flex items-center justify-center"
      >
        <Plus size={28} />
      </button>
    </div>
  );
}
