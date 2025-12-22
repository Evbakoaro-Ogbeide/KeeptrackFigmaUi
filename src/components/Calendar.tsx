import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

interface CalendarProps {
  onCreateWorkout: () => void;
}

export function Calendar({ onCreateWorkout }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  // Mock workout data for calendar
  const workoutDays = [5, 7, 10, 12, 15, 18, 20, 22, 25, 27];

  return (
    <div className="min-h-full bg-[#F5F5F5]">
      {/* Top App Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <h1 className="text-xl text-gray-900 mb-4">Plan Your Week</h1>

        {/* Month Navigator */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft size={24} className="text-gray-900" />
          </button>
          <h2 className="text-gray-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronRight size={24} className="text-gray-900" />
          </button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-sm text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="grid grid-cols-7 gap-2">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}

            {/* Days of the month */}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const isToday = 
                day === new Date().getDate() &&
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getFullYear() === new Date().getFullYear();
              const hasWorkout = workoutDays.includes(day);

              return (
                <button
                  key={day}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center transition-colors relative ${
                    isToday
                      ? 'bg-[#6750A4] text-white'
                      : hasWorkout
                      ? 'bg-green-50 text-gray-900 hover:bg-green-100'
                      : 'hover:bg-gray-100 text-gray-900'
                  }`}
                >
                  <span className="text-sm">{day}</span>
                  {hasWorkout && !isToday && (
                    <div className="absolute bottom-1 w-1 h-1 rounded-full bg-green-500" />
                  )}
                  {hasWorkout && isToday && (
                    <div className="absolute bottom-1 w-1 h-1 rounded-full bg-white" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Upcoming Workouts */}
        <div className="mt-6">
          <h3 className="text-gray-900 mb-3">Upcoming This Week</h3>
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-gray-900">Upper Body Strength</h4>
                  <p className="text-sm text-gray-600">Tomorrow, 9:00 AM</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  💪
                </div>
              </div>
              <div className="text-sm text-gray-600">8 exercises • ~45 min</div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-gray-900">Morning Run</h4>
                  <p className="text-sm text-gray-600">Friday, 6:30 AM</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  🏃
                </div>
              </div>
              <div className="text-sm text-gray-600">5 km • ~30 min</div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-gray-900">Leg Day</h4>
                  <p className="text-sm text-gray-600">Saturday, 4:00 PM</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  🦵
                </div>
              </div>
              <div className="text-sm text-gray-600">6 exercises • ~50 min</div>
            </div>
          </div>
        </div>
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
