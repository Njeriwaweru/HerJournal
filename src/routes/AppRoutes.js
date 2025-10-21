import { Route, Routes } from "react-router-dom";
import MoodTracker from "../pages/MoodTracker";
import Home from "../pages/Home";
import Layout from "../components/Layout";
import Reflection from "../pages/Reflection";
import Goal from "../pages/Goal";

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />     {/* default route */}
            <Route path="/mood-tracker" element={<MoodTracker />} />
            <Route path="/reflection" element={<Reflection />} />
            <Route path="/goal" element={<Goal />} />
        </Route>
    </Routes>
  );
};

export default AppRoutes;
