import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { DashboardVariant } from './components/DashboardVariant';
import { DashboardMaterial } from './components/dashboard/DashboardMaterial';
import { DashboardGlass } from './components/dashboard/DashboardGlass';
import { DashboardDark } from './components/dashboard/DashboardDark';
import { DashboardNeo } from './components/dashboard/DashboardNeo';
import { DashboardVibrant } from './components/dashboard/DashboardVibrant';
import { WorkoutsThemed } from './components/workouts/WorkoutsThemed';
import { CalendarThemed } from './components/calendar/CalendarThemed';
import { StatsThemed } from './components/stats/StatsThemed';
import { MiscThemed } from './components/MiscThemed';
import { CreateWorkout } from './components/CreateWorkout';
import { WorkoutDetail } from './components/WorkoutDetail';
import { VariantSwitcher, DesignVariant } from './components/VariantSwitcher';
import { themes } from './lib/themes';
import { Home, Calendar as CalendarIcon, TrendingUp, ListChecks, MoreHorizontal } from 'lucide-react';

type Screen = 'dashboard' | 'workouts' | 'calendar' | 'stats' | 'misc' | 'create' | 'detail';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(null);
  const [variant, setVariant] = useState<DesignVariant>('material');

  const theme = themes[variant];

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
        switch (variant) {
          case 'material':
            return <DashboardMaterial onViewWorkout={handleViewWorkout} onCreateWorkout={() => setCurrentScreen('create')} />;
          case 'glassmorphism':
            return <DashboardGlass onViewWorkout={handleViewWorkout} onCreateWorkout={() => setCurrentScreen('create')} />;
          case 'dark':
            return <DashboardDark onViewWorkout={handleViewWorkout} onCreateWorkout={() => setCurrentScreen('create')} />;
          case 'neo':
            return <DashboardNeo onViewWorkout={handleViewWorkout} onCreateWorkout={() => setCurrentScreen('create')} />;
          case 'vibrant':
            return <DashboardVibrant onViewWorkout={handleViewWorkout} onCreateWorkout={() => setCurrentScreen('create')} />;
          default:
            return <DashboardMaterial onViewWorkout={handleViewWorkout} onCreateWorkout={() => setCurrentScreen('create')} />;
        }
      case 'workouts':
        return <WorkoutsThemed variant={variant} onViewWorkout={handleViewWorkout} onCreateWorkout={() => setCurrentScreen('create')} />;
      case 'calendar':
        return <CalendarThemed variant={variant} onCreateWorkout={() => setCurrentScreen('create')} />;
      case 'stats':
        return <StatsThemed variant={variant} />;
      case 'misc':
        return <MiscThemed variant={variant} />;
      case 'create':
        return <CreateWorkout onBack={handleBackToDashboard} onSave={handleBackToWorkouts} />;
      case 'detail':
        return <WorkoutDetail workoutId={selectedWorkoutId} onBack={handleBackToWorkouts} />;
      default:
        return <DashboardMaterial onViewWorkout={handleViewWorkout} onCreateWorkout={() => setCurrentScreen('create')} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-50 to-blue-50 max-w-md mx-auto relative">
      {/* Variant Switcher */}
      <VariantSwitcher currentVariant={variant} onVariantChange={setVariant} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-20">
        {renderScreen()}
      </div>

      {/* Bottom Navigation Bar */}
      {currentScreen !== 'create' && currentScreen !== 'detail' && (
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur-md border-t border-purple-200 safe-area-inset-bottom">
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