import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SPORTS = [
  "cricket", "football", "hockey", "kabaddi", "tennis", 
  "wrestling", "volleyball", "kho kho", "archery", 
  "swimming", "badminton", "basketball", "athletics"
];

const EXPERIENCE_LEVELS = ["beginner", "intermediate", "advanced", "professional"];

function SportTrainingPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    sport: "",
    hours_per_week: 5,
    age: "",
    experience_level: "",
    focus_areas: ""
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'hours_per_week' ? parseInt(value) : value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.sport || !formData.hours_per_week) {
      alert('Please select a sport and specify weekly training hours');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await axios.post('http://localhost:8000/api/sports/training-plan', formData);
      navigate('/plan-result', { 
        state: { 
          planType: 'sport',
          result: response.data
        } 
      });
    } catch (error) {
      console.error('Error generating training plan:', error);
      alert('Failed to generate training plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Sport-Specific Training Plan</h1>
        <p className="text-gray-600">
          Create a customized training plan for your sport
        </p>
      </div>
      
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="sport" className="form-label">Select Sport <span className="text-red-500">*</span></label>
            <select 
              id="sport" 
              name="sport" 
              value={formData.sport}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">-- Select a sport --</option>
              {SPORTS.map(sport => (
                <option key={sport} value={sport}>
                  {sport.charAt(0).toUpperCase() + sport.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="hours_per_week" className="form-label">
              Training Hours Per Week <span className="text-red-500">*</span>
            </label>
            <input 
              type="number" 
              id="hours_per_week" 
              name="hours_per_week" 
              min="1" 
              max="40"
              value={formData.hours_per_week}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="age" className="form-label">Age (Optional)</label>
            <input 
              type="number" 
              id="age" 
              name="age" 
              min="5" 
              max="100"
              value={formData.age}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="experience_level" className="form-label">Experience Level (Optional)</label>
            <select 
              id="experience_level" 
              name="experience_level" 
              value={formData.experience_level}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">-- Select experience level --</option>
              {EXPERIENCE_LEVELS.map(level => (
                <option key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-6">
            <label htmlFor="focus_areas" className="form-label">Focus Areas (Optional)</label>
            <textarea 
              id="focus_areas" 
              name="focus_areas" 
              rows="3"
              value={formData.focus_areas}
              onChange={handleChange}
              className="form-input"
              placeholder="E.g., batting technique, footwork, endurance, etc."
            ></textarea>
          </div>
          
          <div className="flex justify-end">
            <button 
              type="submit" 
              className="btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Generating Plan...' : 'Generate Training Plan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SportTrainingPage;