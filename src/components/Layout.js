import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  Heart, 
  BookOpen, 
  Target, 
  BarChart3, 
  Menu, 
  X,
  Sparkles,
  User,
  Settings,
  Calendar,
  Bell
} from "lucide-react";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home", icon: <Home className="w-5 h-5" />, color: "from-pink-500 to-rose-500" },
    { path: "/mood-tracker", label: "Mood", icon: <Heart className="w-5 h-5" />, color: "from-purple-500 to-indigo-500" },
    { path: "/reflection", label: "Reflection", icon: <BookOpen className="w-5 h-5" />, color: "from-blue-500 to-cyan-500" },
    { path: "/goal", label: "Goals", icon: <Target className="w-5 h-5" />, color: "from-emerald-500 to-green-500" },
  ];

  // Get current page title
  const getPageTitle = () => {
    const item = navItems.find(item => item.path === location.pathname);
    return item ? item.label : "Dashboard";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10">
        {/* Desktop Navigation */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled 
              ? "bg-white/90 backdrop-blur-lg shadow-lg" 
              : "bg-transparent"
          }`}
        >
          <div className="container mx-auto px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3 group">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition"></div>
                  <img
                    src={Logo}
                    alt="HerJournal"
                    className="relative w-12 h-12 rounded-2xl object-cover border-4 border-white shadow-lg"
                  />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    HerJournal
                  </h1>
                  <p className="text-xs text-gray-500">🌸 Your wellness journey</p>
                </div>
              </Link>

              {/* Navigation Links */}
              <div className="flex items-center space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="relative group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 ${
                        location.pathname === item.path
                          ? "text-white shadow-lg"
                          : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                      }`}
                      style={{
                        background: location.pathname === item.path 
                          ? `linear-gradient(135deg, var(--tw-gradient-stops))`
                          : ''
                      }}
                    >
                      <div className={location.pathname === item.path ? "text-white" : "text-gray-400"}>
                        {item.icon}
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </motion.div>
                    
                    {/* Active Indicator */}
                    {location.pathname === item.path && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-t-full"
                      />
                    )}
                  </Link>
                ))}
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white/50 rounded-xl transition"
                >
                  <Bell className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white/50 rounded-xl transition"
                >
                  <Calendar className="w-5 h-5" />
                </motion.button>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                >
                  <button className="p-2 bg-white rounded-full">
                    <User className="w-5 h-5 text-gray-700" />
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Mobile Header */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={`lg:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled 
              ? "bg-white/95 backdrop-blur-lg shadow-lg" 
              : "bg-white"
          }`}
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Mobile Logo */}
              <Link to="/" className="flex items-center space-x-3">
                <img
                  src={Logo}
                  alt="HerJournal"
                  className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow"
                />
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    HerJournal
                  </h1>
                  <p className="text-xs text-gray-500">{getPageTitle()}</p>
                </div>
              </Link>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden fixed top-16 inset-x-0 z-40 bg-white/95 backdrop-blur-lg shadow-xl mx-4 rounded-2xl overflow-hidden"
            >
              <div className="p-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="block"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02, x: 5 }}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl my-1 transition-all ${
                        location.pathname === item.path
                          ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <div className={location.pathname === item.path ? "text-white" : "text-gray-400"}>
                        {item.icon}
                      </div>
                      <span className="font-medium">{item.label}</span>
                      {location.pathname === item.path && (
                        <motion.div
                          layoutId="mobileActive"
                          className="ml-auto w-2 h-2 bg-white rounded-full"
                        />
                      )}
                    </motion.div>
                  </Link>
                ))}
                
                {/* Additional Mobile Links */}
                <div className="border-t border-gray-100 mt-2 pt-2">
                  <Link to="/insights" onClick={() => setIsMenuOpen(false)}>
                    <motion.div
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl my-1 text-gray-600 hover:bg-gray-50"
                    >
                      <BarChart3 className="w-5 h-5 text-gray-400" />
                      <span className="font-medium">Insights</span>
                    </motion.div>
                  </Link>
                  <Link to="/settings" onClick={() => setIsMenuOpen(false)}>
                    <motion.div
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl my-1 text-gray-600 hover:bg-gray-50"
                    >
                      <Settings className="w-5 h-5 text-gray-400" />
                      <span className="font-medium">Settings</span>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Navigation for Mobile */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-gray-100 shadow-2xl">
          <div className="grid grid-cols-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative py-4 flex flex-col items-center justify-center"
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded-full transition-all ${
                    location.pathname === item.path
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
                      : "text-gray-400"
                  }`}
                >
                  {item.icon}
                </motion.div>
                <span className={`text-xs mt-1 ${
                  location.pathname === item.path 
                    ? "font-semibold text-gray-800" 
                    : "text-gray-500"
                }`}>
                  {item.label}
                </span>
                
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="bottomActive"
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-b-full"
                  />
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className={`pt-16 lg:pt-24 ${isMenuOpen ? 'lg:pt-24' : ''}`}>
          {/* Page Title for Desktop */}
          <div className="hidden lg:block container mx-auto px-8 pt-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">{getPageTitle()}</h1>
                  <p className="text-gray-600 mt-2">
                    {location.pathname === "/" && "Welcome back! Track your mood, write reflections, and achieve your goals."}
                    {location.pathname === "/mood-tracker" && "How are you feeling today? Select your current mood to begin."}
                    {location.pathname === "/reflection" && "Take a moment to reflect on your day. What's on your mind?"}
                    {location.pathname === "/goal" && "Set and track your personal goals. Dream big, start small!"}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl shadow-lg hover:shadow-xl transition"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Daily Check-in</span>
                </motion.button>
              </div>
              
              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Mood Entries</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {JSON.parse(localStorage.getItem("moodHistory") || "[]").length}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Reflections</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {JSON.parse(localStorage.getItem("reflections") || "[]").length}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Active Goals</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {JSON.parse(localStorage.getItem("goals") || "[]").filter(g => !g.completed).length}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Page Content */}
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="pb-20 lg:pb-8"
          >
            <Outlet />
          </motion.div>
        </main>

        {/* Floating Action Button for Mobile */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="lg:hidden fixed bottom-20 right-4 z-40 w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full shadow-2xl flex items-center justify-center"
          onClick={() => navigate("/mood-tracker")}
        >
          <Heart className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
};

export default Layout;