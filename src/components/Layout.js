import { Link, Outlet } from "react-router-dom";
import Logo from "../assets/logo.png";

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="flex justify-between p-2 items-center rounded-md shadow-lg bg-pink-300">
                <div className="flex items-center space-x-4">
                    <img
                        src={Logo}
                        alt="HerJournal"
                        className="w-6 rounded-full object-cover ml-4 mt-2 md:w-10 "
                    />
                    <h1 className="font-medium">HerJournal🌸</h1>
                </div>
                <div className=" flex gap-7 mr-36 font-medium text-lg">
                    <Link to="/">Home</Link>
                    <Link to="/mood-tracker">Mood</Link>
                    <Link to="/reflection">Reflection</Link>
                    <Link to="/goal">Goals</Link>
                </div>
            </nav>

            {/* Page content */}
            <main>
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 text-center py-3">
                © 2025 HerJournal
            </footer>
        </div>
    )
}

export default Layout;