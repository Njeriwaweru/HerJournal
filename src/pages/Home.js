import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

const Home = () => {
    const navigate = useNavigate();

    return (
    <div className="min-h-screen flex flex-col  bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
      
      <h1 className="text-3xl font-bold text-center mt-6 md:text-5xl">
        HerJournal🌸
      </h1>
      <div className="flex flex-col justify-center items-center mt-56">
        <h2 className="text-4xl text-center font-bold md:text-6xl">
          Reflect. Grow. Shine
        </h2>
        <p className="mt-16 text-xl font-medium md:text-2xl">
          Track your mood. <br /> Write your thoughts. <br /> Set small goals.
        </p>
        <button
          className="bg-pink-500 text-white mt-32 w-56 px-6 py-5 rounded-full shadow-md hover:bg-pink-600 transition"
          onClick={() => navigate("/mood-tracker")}
        >
          Get Started
        </button>
      </div>
    </div>
    )
}

export default Home;