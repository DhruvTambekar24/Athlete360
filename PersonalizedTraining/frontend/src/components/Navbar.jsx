import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold">Athletic Training Planner</span>
          </Link>
          
          <div className="flex space-x-4">
            <NavLink to="/" current={location.pathname === "/"}>Home</NavLink>
            <NavLink to="/sport-training" current={location.pathname === "/sport-training"}>Sport Training</NavLink>
            <NavLink to="/workout-plan" current={location.pathname === "/workout-plan"}>Workout Plan</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, current, children }) {
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        current 
          ? 'bg-gray-900 text-white' 
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      {children}
    </Link>
  );
}

export default Navbar;