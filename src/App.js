import Signup from "./pages/Signup/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Landing from "./pages/Landing/Landing";
import PilatesPracticeBeginner from "./pages/Practice/Pilates/Pilates-Practice-Beginner";
import YogaPracticeBeginner from "./pages/Practice/Yoga/Yoga-Practice-Beginner";
import YogaPracticeIntermediate from "./pages/Practice/Yoga/Yoga-Practice-Intermediate";
import YogaLearnBeginner from "./pages/Learn/Yoga/Yoga-Beginner";
import YogaLearnIntermediate from "./pages/Learn/Yoga/Yoga-Intermediate";
import PilatesLearnBeginner from "./pages/Learn/Pilates/Pilates-Learn-Beginner";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            exact
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/pilates-practice-beginner"
            element={
              <PrivateRoute>
                <PilatesPracticeBeginner />
              </PrivateRoute>
            }
          />
          <Route
            path="/yoga-practice-beginner"
            element={
              <PrivateRoute>
                <YogaPracticeBeginner />
              </PrivateRoute>
            }
          />
          <Route
            path="/yoga-practice-intermediate"
            element={
              <PrivateRoute>
                <YogaPracticeIntermediate />
              </PrivateRoute>
            }
          />
          <Route
            path="/yoga-learn-beginner"
            element={
              <PrivateRoute>
                <YogaLearnBeginner />
              </PrivateRoute>
            }
          />
          <Route
            path="/yoga-learn-intermediate"
            element={
              <PrivateRoute>
                <YogaLearnIntermediate />
              </PrivateRoute>
            }
          />
          <Route
            path="/pilates-learn-beginner"
            element={
              <PrivateRoute>
                <PilatesLearnBeginner />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Landing />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
