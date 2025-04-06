import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SportTrainingPage from './pages/SportTrainingPage';
import WorkoutPlanPage from './pages/WorkoutPlanPage';
import PlanResultPage from './pages/PlanResultPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto py-8 px-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sport-training" element={<SportTrainingPage />} />
          <Route path="/workout-plan" element={<WorkoutPlanPage />} />
          <Route path="/plan-result" element={<PlanResultPage />} />
        </Routes>
      </main>
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; {new Date().getFullYear()} Athletic Training Planner</p>
      </footer>
    </div>
  );
}

export default App;