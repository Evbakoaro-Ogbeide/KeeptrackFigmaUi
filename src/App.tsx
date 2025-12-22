import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { WorkoutsList } from './components/WorkoutsList';
import { CreateWorkout } from './components/CreateWorkout';
import { WorkoutDetail } from './components/WorkoutDetail';
import { Calendar } from './components/Calendar';
import { Stats } from './components/Stats';
import { Misc } from './components/Misc';
import { Home, Calendar as CalendarIcon, TrendingUp, ListChecks, MoreHorizontal } from 'lucide-react';

type Screen = 'dashboard' | 'workouts' | 'calendar' | 'stats' | 'misc' | 'create' | 'detail';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(null);

  const handleViewWorkout = (id: string) => {
    setSelectedWorkoutId(id);
    setCurrentScreen('detail');
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
  };

  const handleBackToWorkouts = () => {
    setCurrentScreen('workouts');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard onViewWorkout={handleViewWorkout} onCreateWorkout={() => setCurrentScreen('create')} />;
      case 'workouts':
        return <WorkoutsList onViewWorkout={handleViewWorkout} onCreateWorkout={() => setCurrentScreen('create')} />;
      case 'calendar':
        return <Calendar onCreateWorkout={() => setCurrentScreen('create')} />;
      case 'stats':
        return <Stats />;
      case 'misc':
        return <Misc />;
      case 'create':
        return <CreateWorkout onBack={handleBackToDashboard} onSave={handleBackToWorkouts} />;
      case 'detail':
        return <WorkoutDetail workoutId={selectedWorkoutId} onBack={handleBackToWorkouts} />;
      default:
        return <Dashboard onViewWorkout={handleViewWorkout} onCreateWorkout={() => setCurrentScreen('create')} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F5F5F5] max-w-md mx-auto">
      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-20">
        {renderScreen()}
      </div>

      {/* Bottom Navigation Bar */}
      {currentScreen !== 'create' && currentScreen !== 'detail' && (
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 safe-area-inset-bottom">
          <nav className="flex items-center justify-around h-16 px-2">
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                currentScreen === 'dashboard' ? 'text-[#6750A4]' : 'text-gray-600'
              }`}
            >
              <Home size={24} />
              <span className="text-xs mt-1">Home</span>
            </button>

            <button
              onClick={() => setCurrentScreen('workouts')}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                currentScreen === 'workouts' ? 'text-[#6750A4]' : 'text-gray-600'
              }`}
            >
              <ListChecks size={24} />
              <span className="text-xs mt-1">Workouts</span>
            </button>

            <button
              onClick={() => setCurrentScreen('calendar')}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                currentScreen === 'calendar' ? 'text-[#6750A4]' : 'text-gray-600'
              }`}
            >
              <CalendarIcon size={24} />
              <span className="text-xs mt-1">Plan</span>
            </button>

            <button
              onClick={() => setCurrentScreen('stats')}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                currentScreen === 'stats' ? 'text-[#6750A4]' : 'text-gray-600'
              }`}
            >
              <TrendingUp size={24} />
              <span className="text-xs mt-1">Stats</span>
            </button>

            <button
              onClick={() => setCurrentScreen('misc')}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                currentScreen === 'misc' ? 'text-[#6750A4]' : 'text-gray-600'
              }`}
            >
              <MoreHorizontal size={24} />
              <span className="text-xs mt-1">More</span>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}