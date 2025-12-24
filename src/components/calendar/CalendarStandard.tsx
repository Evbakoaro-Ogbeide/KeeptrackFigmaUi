import { ChevronLeft, ChevronRight, Plus, Dumbbell, Play } from 'lucide-react';
import { useState } from 'react';

interface CalendarStandardProps {
  onCreateWorkout: () => void;
}

export function CalendarStandard({ onCreateWorkout }: CalendarStandardProps) {
  const [currentMonth] = useState('December 2025');
  
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dates = [
    { date: 25, workouts: [], isToday: false },
    { date: 26, workouts: [], isToday: false },
    { date: 27, workouts: [], isToday: false },
    { date: 28, workouts: [], isToday: false },
    { date: 29, workouts: [], isToday: false },
    { date: 30, workouts: [], isToday: false },
    { date: 1, workouts: [], isToday: false, nextMonth: true },
    
    { date: 2, workouts: [], isToday: false, nextMonth: true },
    { date: 3, workouts: [], isToday: false, nextMonth: true },
    { date: 4, workouts: [], isToday: false, nextMonth: true },
    { date: 5, workouts: [], isToday: false, nextMonth: true },
    { date: 6, workouts: [], isToday: false, nextMonth: true },
    { date: 7, workouts: [], isToday: false, nextMonth: true },
    { date: 8, workouts: [], isToday: false, nextMonth: true },
    
    { date: 9, workouts: [], isToday: false, nextMonth: true },
    { date: 10, workouts: [], isToday: false, nextMonth: true },
    { date: 11, workouts: [], isToday: false, nextMonth: true },
    { date: 12, workouts: [], isToday: false, nextMonth: true },
    { date: 13, workouts: [], isToday: false, nextMonth: true },
    { date: 14, workouts: [], isToday: false, nextMonth: true },
    { date: 15, workouts: [], isToday: false, nextMonth: true },
    
    { date: 16, workouts: [], isToday: false, nextMonth: true },
    { date: 17, workouts: [], isToday: false, nextMonth: true },
    { date: 18, workouts: ['gym'], isToday: false, nextMonth: true },
    { date: 19, workouts: [], isToday: false, nextMonth: true },
    { date: 20, workouts: ['gym'], isToday: false, nextMonth: true },
    { date: 21, workouts: ['running'], isToday: false, nextMonth: true },
    { date: 22, workouts: ['gym'], isToday: false, nextMonth: true },
    
    { date: 23, workouts: [], isToday: false, nextMonth: true },
    { date: 24, workouts: ['running'], isToday: true, nextMonth: true },
    { date: 25, workouts: ['gym'], isToday: false, nextMonth: true },
    { date: 26, workouts: [], isToday: false, nextMonth: true },
    { date: 27, workouts: [], isToday: false, nextMonth: true },
    { date: 28, workouts: [], isToday: false, nextMonth: true },
    { date: 29, workouts: [], isToday: false, nextMonth: true },
  ];

  const upcomingWorkouts = [
    { id: '1', type: 'gym', title: 'Core & Abs', date: 'Tomorrow', time: '10:00 AM', duration: '40 min' },
    { id: '2', type: 'running', title: 'Long Run', date: 'Dec 26', time: '7:00 AM', duration: '60 min' },
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#6750A4] to-[#4e3a8f] text-white px-4 py-4">
        <h1 className="text-2xl mb-4">Plan</h1>
        
        {/* Month Navigator */}
        <div className="flex items-center justify-between mb-4">
          <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-lg">{currentMonth}</h2>
          <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {days.map((day) => (
            <div key={day} className="text-center text-xs opacity-80 py-1">
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="px-4 pt-4 pb-2">
        <div className="grid grid-cols-7 gap-1">
          {dates.map((item, index) => (
            <button
              key={index}
              className={`aspect-square rounded-lg p-1 flex flex-col items-center justify-center text-sm relative ${
                item.isToday
                  ? 'bg-gradient-to-br from-[#6750A4] to-[#5544a0] text-white'
                  : item.nextMonth
                  ? 'bg-white hover:bg-purple-50'
                  : 'bg-white/50 text-gray-400'
              }`}
            >
              <span>{item.date}</span>
              {item.workouts.length > 0 && (
                <div className="flex gap-0.5 mt-0.5">
                  {item.workouts.map((type, i) => (
                    <div
                      key={i}
                      className={`w-1 h-1 rounded-full ${
                        item.isToday
                          ? 'bg-white'
                          : type === 'gym'
                          ? 'bg-blue-500'
                          : 'bg-green-500'
                      }`}
                    />
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Upcoming Workouts */}
      <div className="px-4 py-4 flex-1 overflow-auto">
        <h3 className="text-sm text-gray-600 mb-3">Upcoming</h3>
        <div className="space-y-2">
          {upcomingWorkouts.map((workout) => (
            <div
              key={workout.id}
              className="bg-white rounded-2xl p-4 shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  workout.type === 'gym'
                    ? 'bg-gradient-to-br from-blue-100 to-blue-200'
                    : 'bg-gradient-to-br from-green-100 to-green-200'
                }`}>
                  {workout.type === 'gym' ? (
                    <Dumbbell className="text-blue-600" size={20} />
                  ) : (
                    <Play className="text-green-600" size={20} />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-[#1C1B1F] mb-1">{workout.title}</h4>
                  <p className="text-gray-600 text-sm">
                    {workout.date} • {workout.time} • {workout.duration}
                  </p>
                </div>
              </div>
            </div>
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
