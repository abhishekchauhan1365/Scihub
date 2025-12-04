import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  LayoutDashboard, 
  MessageCircleQuestion, 
  LogOut, 
  Menu,
  X,
  Atom
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'Explore Topics', path: '/topics', icon: <BookOpen size={20} /> },
    { label: 'Ask Doubts', path: '/doubts', icon: <MessageCircleQuestion size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white p-4 flex justify-between items-center shadow-sm z-20">
        <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xl">
          <Atom />
          <span>SciHub</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed md:relative top-0 left-0 h-full w-64 bg-white border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out z-10
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 hidden md:flex items-center space-x-2 text-indigo-600 font-bold text-2xl">
          <Atom size={32} />
          <span>SciHub</span>
        </div>

        <div className="p-4 md:p-6">
          <div className="mb-6 p-4 bg-indigo-50 rounded-xl">
            <p className="text-sm text-indigo-600 font-semibold">Welcome back,</p>
            <p className="font-bold text-gray-800 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 mt-1">{user?.xp} XP Earned</p>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 w-full p-6 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 text-red-500 hover:bg-red-50 w-full px-4 py-3 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
      
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-0 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};
