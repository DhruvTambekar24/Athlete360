import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

function PlanResultPage() {
  const location = useLocation();
  const [planData, setPlanData] = useState(null);
  const [planType, setPlanType] = useState('');
  
  useEffect(() => {
    if (location.state?.result) {
      setPlanData(location.state.result);
      setPlanType(location.state.planType || '');
    }
  }, [location]);
  
  if (!planData) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">No Plan Generated</h1>
        <p className="text-gray-600 mb-6">
          Please generate a training plan first.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/sport-training" className="btn-primary">
            Create Sport Training Plan
          </Link>
          <Link to="/workout-plan" className="btn-primary">
            Create Workout Plan
          </Link>
        </div>
      </div>
    );
  }
  
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {planType === 'sport' 
            ? `${planData.sport.charAt(0).toUpperCase() + planData.sport.slice(1)} Training Plan` 
            : 'Custom Workout Plan'}
        </h1>
        <div className="flex gap-2">
          <button onClick={handlePrint} className="btn-secondary">
            Print Plan
          </button>
          <Link to={planType === 'sport' ? '/sport-training' : '/workout-plan'} className="btn-primary">
            Create New Plan
          </Link>
        </div>
      </div>
      
      <div className="card mb-8 print:shadow-none" id="plan-content">
        {planType === 'sport' && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Plan Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><span className="font-medium">Sport:</span> {planData.sport.charAt(0).toUpperCase() + planData.sport.slice(1)}</p>
                <p><span className="font-medium">Training Hours:</span> {planData.hours_per_week} hours per week</p>
              </div>
            </div>
          </div>
        )}
        
        {planType === 'workout' && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Plan Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><span className="font-medium">Target:</span> {planData.target_muscle_group}</p>
                <p><span className="font-medium">Duration:</span> {planData.duration} minutes per session</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="markdown-content">
          <ReactMarkdown>
            {planType === 'sport' ? planData.training_plan : planData.workout_plan}
          </ReactMarkdown>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Tips for Success</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Start slowly and gradually increase intensity</li>
          <li>Listen to your body and rest when needed</li>
          <li>Stay hydrated and maintain proper nutrition</li>
          <li>Track your progress to stay motivated</li>
          <li>Consult with a healthcare professional before starting any new training program</li>
        </ul>
      </div>
      
      <div className="text-center text-gray-600">
        <p>
          This plan was generated specifically for your needs. 
          For professional guidance, consider consulting with a certified trainer.
        </p>
      </div>
    </div>
  );
}

export default PlanResultPage;