import { useState } from 'react';
import { ArrowLeft, Plus, X, Dumbbell, Play } from 'lucide-react';

interface CreateWorkoutProps {
  onBack: () => void;
  onSave: () => void;
}

export function CreateWorkout({ onBack, onSave }: CreateWorkoutProps) {
  const [workoutType, setWorkoutType] = useState<'gym' | 'running'>('gym');
  const [exercises, setExercises] = useState([
    { id: '1', name: '', sets: '', reps: '', weight: '' }
  ]);

  const addExercise = () => {
    setExercises([...exercises, { id: Date.now().toString(), name: '', sets: '', reps: '', weight: '' }]);
  };

  const removeExercise = (id: string) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  return (
    <div className="min-h-full bg-[#F5F5F5]">
      {/* Top App Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft size={24} className="text-gray-900" />
          </button>
          <h1 className="text-xl text-gray-900 flex-1">New Workout</h1>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-[#6750A4] text-white rounded-full hover:bg-[#7965b3] transition-colors"
          >
            Save
          </button>
        </div>

        {/* Workout Type Selector */}
        <div className="flex gap-2">
          <button
            onClick={() => setWorkoutType('gym')}
            className={`flex-1 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 ${
              workoutType === 'gym'
                ? 'bg-[#6750A4] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Dumbbell size={20} />
            Gym Session
          </button>
          <button
            onClick={() => setWorkoutType('running')}
            className={`flex-1 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 ${
              workoutType === 'running'
                ? 'bg-[#6750A4] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Play size={20} />
            Running
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-4 space-y-4">
        {/* Basic Info Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-gray-900 mb-4">Basic Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Workout Name</label>
              <input
                type="text"
                placeholder="e.g., Upper Body Strength"
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#6750A4] outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#6750A4] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Time</label>
                <input
                  type="time"
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#6750A4] outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Workout Details */}
        {workoutType === 'gym' ? (
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-900">Exercises</h2>
              <button
                onClick={addExercise}
                className="p-2 bg-[#6750A4] text-white rounded-full hover:bg-[#7965b3] transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {exercises.map((exercise, index) => (
                <div key={exercise.id} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-600">Exercise {index + 1}</span>
                    {exercises.length > 1 && (
                      <button
                        onClick={() => removeExercise(exercise.id)}
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <X size={20} className="text-gray-600" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Exercise name"
                      className="w-full px-3 py-2 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#6750A4] outline-none"
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="number"
                        placeholder="Sets"
                        className="w-full px-3 py-2 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#6750A4] outline-none"
                      />
                      <input
                        type="number"
                        placeholder="Reps"
                        className="w-full px-3 py-2 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#6750A4] outline-none"
                      />
                      <input
                        type="number"
                        placeholder="Weight"
                        className="w-full px-3 py-2 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#6750A4] outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h2 className="text-gray-900 mb-4">Running Details</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Distance (km)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="5.0"
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#6750A4] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Duration (min)</label>
                  <input
                    type="number"
                    placeholder="30"
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#6750A4] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Average Pace (min/km)</label>
                <input
                  type="text"
                  placeholder="6:00"
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#6750A4] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Route Type</label>
                <select className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#6750A4] outline-none">
                  <option>Road</option>
                  <option>Trail</option>
                  <option>Track</option>
                  <option>Treadmill</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Notes */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-gray-900 mb-4">Notes</h2>
          <textarea
            placeholder="Add any additional notes about your workout..."
            rows={4}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#6750A4] outline-none resize-none"
          />
        </div>
      </div>
    </div>
  );
}
