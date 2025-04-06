import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Personalized Training Plans for Athletes
        </h1>
        <p className="text-xl text-gray-600">
          Get custom training plans tailored to your sport or fitness goals
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="card hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Sport-Specific Training</h2>
          <p className="text-gray-600 mb-6">
            Get a personalized training plan for your specific sport. Improve your skills, 
            technique, and performance with targeted exercises and drills.
          </p>
          <ul className="text-gray-600 mb-6 list-disc list-inside">
            <li>Cricket</li>
            <li>Football</li>
            <li>Tennis</li>
            <li>Swimming</li>
            <li>And many more...</li>
          </ul>
          <Link to="/sport-training" className="btn-primary inline-block">
            Create Sport Plan
          </Link>
        </div>
        
        <div className="card hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Workout Training</h2>
          <p className="text-gray-600 mb-6">
            Create a custom workout plan based on your age, gender, fitness level, 
            and target muscle groups. Achieve your fitness goals with structured workouts.
          </p>
          <ul className="text-gray-600 mb-6 list-disc list-inside">
            <li>Full body workouts</li>
            <li>Target specific muscle groups</li>
            <li>Customized for your fitness level</li>
            <li>Adaptable to your schedule</li>
          </ul>
          <Link to="/workout-plan" className="btn-primary inline-block">
            Create Workout Plan
          </Link>
        </div>
      </div>
      
      <div className="card bg-blue-50 border border-blue-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Use Our Training Planner?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Personalized Plans</h3>
            <p className="text-gray-600">
              Get training plans tailored to your specific needs and goals.
            </p>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Expert Guidance</h3>
            <p className="text-gray-600">
              Plans based on proven training methodologies and best practices.
            </p>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600">
              Clear metrics to measure your improvement over time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;