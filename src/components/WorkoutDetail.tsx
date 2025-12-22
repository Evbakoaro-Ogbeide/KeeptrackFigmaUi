import { ArrowLeft, Calendar, Clock, Dumbbell, TrendingUp, Edit2, Trash2 } from 'lucide-react';

interface WorkoutDetailProps {
  workoutId: string | null;
  onBack: () => void;
}

export function WorkoutDetail({ workoutId, onBack }: WorkoutDetailProps) {
  // Mock data - in real app would fetch based on workoutId
  const workout = {
    id: workoutId,
    type: 'gym',
    title: 'Upper Body Strength',
    date: 'November 27, 2024',
    time: '9:30 AM',
    duration: '45 min',
    exercises: [
      { name: 'Bench Press', sets: 4, reps: 8, weight: 80 },
      { name: 'Incline Dumbbell Press', sets: 3, reps: 10, weight: 30 },
      { name: 'Cable Flyes', sets: 3, reps: 12, weight: 25 },
      { name: 'Overhead Press', sets: 4, reps: 8, weight: 50 },
      { name: 'Lateral Raises', sets: 3, reps: 12, weight: 15 },
      { name: 'Tricep Pushdowns', sets: 3, reps: 12, weight: 35 },
      { name: 'Bicep Curls', sets: 3, reps: 10, weight: 20 },
      { name: 'Hammer Curls', sets: 3, reps: 10, weight: 18 },
    ],
    notes: 'Great workout! Felt strong on bench press. Might increase weight next session.',
  };

  return (
    <div className="min-h-full bg-[#F5F5F5]">
      {/* Top App Bar */}
      <div className="bg-[#6750A4] text-white px-4 py-4">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl flex-1">Workout Details</h1>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Edit2 size={20} />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Trash2 size={20} />
          </button>
        </div>

        {/* Workout Header */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <Dumbbell size={24} />
            </div>
            <div>
              <h2 className="text-2xl mb-1">{workout.title}</h2>
              <div className="flex items-center gap-4 text-sm opacity-90">
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  {workout.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={16} />
                  {workout.time}
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
              <div className="text-2xl mb-1">{workout.duration}</div>
              <div className="text-xs opacity-90">Duration</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
              <div className="text-2xl mb-1">{workout.exercises.length}</div>
              <div className="text-xs opacity-90">Exercises</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
              <div className="text-2xl mb-1">24</div>
              <div className="text-xs opacity-90">Total Sets</div>
            </div>
          </div>
        </div>
      </div>

      {/* Exercises List */}
      <div className="p-4 space-y-3 -mt-4">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-gray-900">Exercises</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {workout.exercises.map((exercise, index) => (
              <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#6750A4]/10 flex items-center justify-center text-[#6750A4]">
                      {index + 1}
                    </div>
                    <h4 className="text-gray-900">{exercise.name}</h4>
                  </div>
                </div>
                <div className="ml-11 flex items-center gap-4 text-sm text-gray-600">
                  <span>{exercise.sets} sets</span>
                  <span>×</span>
                  <span>{exercise.reps} reps</span>
                  <span>×</span>
                  <span>{exercise.weight} kg</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-[#6750A4]" size={20} />
            <h3 className="text-gray-900">Performance</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
              <span className="text-gray-700">Volume</span>
              <span className="text-gray-900">2,850 kg</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
              <span className="text-gray-700">Average Rest Time</span>
              <span className="text-gray-900">90 sec</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
              <span className="text-gray-700">Intensity</span>
              <span className="text-gray-900">High</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {workout.notes && (
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-gray-900 mb-3">Notes</h3>
            <p className="text-gray-600">{workout.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
