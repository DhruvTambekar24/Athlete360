import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GENDERS = ["male", "female", "other"];
const FITNESS_LEVELS = ["beginner", "intermediate", "advanced", "athlete"];
const TARGET_MUSCLE_GROUPS = [
  { value: "full_body", label: "Full Body" },
  { value: "upper_body", label: "Upper Body" },
  { value: "lower_body", label: "Lower Body" },
  { value: "core", label: "Core" },
  { value: "chest", label: "Chest" },
  { value: "back", label: "Back" },
  { value: "shoulders", label: "Shoulders" },
  { value: "legs", label: "Legs" },
  { value: "arms", label: "Arms" }
];

function WorkoutPlanPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    fitness_level: "",
    target_muscle_group: "",
    workout_duration: 45,
    goals: "",
    limitations: ""
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ["age", "workout_duration"].includes(name) ? parseInt(value) : value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.age || !formData.gender || !formData.fitness_level || 
        !formData.target_muscle_group || !formData.workout_duration) {
      alert('Please fill all required fields');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await axios.post('http://localhost:8000/api/workouts/plan', formData);
      navigate('/plan-result', { 
        state: { 
          planType: 'workout',
          result: response.data
        } 
      });
    } catch (error) {
      console.error('Error generating workout plan:', error);
      alert('Failed to generate workout plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Custom Workout Plan</h1>
        <p className="text-gray-600">
          Create a personalized workout plan based on your preferences
        </p>
      </div>
      
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="age" className="form-label">
              Age <span className="text-red-500">*</span>
            </label>
            <input 
              type="number" 
              id="age" 
              name="age" 
              min="12" 
              max="100"
              value={formData.age}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="gender" className="form-label">
              Gender <span className="text-red-500">*</span>
            </label>
            <select 
              id="gender" 
              name="gender" 
              value={formData.gender}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">-- Select gender --</option>
              {GENDERS.map(gender => (
                <option key={gender} value={gender}>
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="fitness_level" className="form-label">
              Fitness Level <span className="text-red-500">*</span>
            </label>
            <select 
              id="fitness_level" 
              name="fitness_level" 
              value={formData.fitness_level}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">-- Select fitness level --</option>
              {FITNESS_LEVELS.map(level => (
                <option key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="target_muscle_group" className="form-label">
              Target Muscle Group <span className="text-red-500">*</span>
            </label>
            <select 
              id="target_muscle_group" 
              name="target_muscle_group" 
              value={formData.target_muscle_group}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">-- Select target muscle group --</option>
              {TARGET_MUSCLE_GROUPS.map(group => (
                <option key={group.value} value={group.value}>
                  {group.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="workout_duration" className="form-label">
              Workout Duration (minutes) <span className="text-red-500">*</span>
            </label>
            <input 
              type="number" 
              id="workout_duration" 
              name="workout_duration" 
              min="10" 
              max="180"
              value={formData.workout_duration}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="goals" className="form-label">Goals (Optional)</label>
            <textarea 
              id="goals" 
              name="goals" 
              rows="2"
              value={formData.goals}
              onChange={handleChange}
              className="form-input"
              placeholder="E.g., weight loss, muscle gain, toning, etc."
            ></textarea>
          </div>
          
          <div className="mb-6">
            <label htmlFor="limitations" className="form-label">Limitations or Injuries (Optional)</label>
            <textarea 
              id="limitations" 
              name="limitations" 
              rows="2"
              value={formData.limitations}
              onChange={handleChange}
              className="form-input"
              placeholder="E.g., knee injury, lower back pain, etc."
            ></textarea>
          </div>
          
          <div className="flex justify-end">
            <button 
              type="submit" 
              className="btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Generating Plan...' : 'Generate Workout Plan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WorkoutPlanPage;