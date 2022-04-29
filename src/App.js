import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import DashRoute from "./components/DashRoute/DashRoute";
import Landing from "./pages/Landing/Landing";
import FourOhFour from "./pages/FourOhFour/FourOhFour";
import AboutUs from "./pages/AboutUs/AboutUs";
import AboutUsLanding from "./pages/AboutUsLanding/AboutUsLanding";
import SelectionLearn from "./pages/SelectionLearn/SelectionLearn";
import SelectionPractice from "./pages/SelectionPractice/SelectionPractice";
import loadable from "@loadable/component";

const PilatesPracticeBeginner = loadable(() =>
  import("./pages/Practice/Pilates/Pilates-Practice-Beginner")
);
const PilatesPracticeIntermediate = loadable(() =>
  import("./pages/Practice/Pilates/Pilates-Practice-Intermediate")
);
const PilatesPracticeAdvanced = loadable(() =>
  import("./pages/Practice/Pilates/Pilates-Practice-Advanced")
);
const YogaPracticeBeginner = loadable(() =>
  import("./pages/Practice/Yoga/Yoga-Practice-Beginner")
);
const YogaPracticeIntermediate = loadable(() =>
  import("./pages/Practice/Yoga/Yoga-Practice-Intermediate")
);
const YogaPracticeAdvanced = loadable(() =>
  import("./pages/Practice/Yoga/Yoga-Practice-Advanced")
);
const YogaLearnBeginner = loadable(() =>
  import("./pages/Learn/Yoga/Yoga-Learn-Beginner")
);
const YogaLearnIntermediate = loadable(() =>
  import("./pages/Learn/Yoga/Yoga-Learn-Intermediate")
);
const YogaLearnAdvanced = loadable(() =>
  import("./pages/Learn/Yoga/Yoga-Learn-Advanced")
);
const PilatesLearnBeginner = loadable(() =>
  import("./pages/Learn/Pilates/Pilates-Learn-Beginner")
);
const PilatesLearnIntermediate = loadable(() =>
  import("./pages/Learn/Pilates/Pilates-Learn-Intermediate")
);
const PilatesLearnAdvanced = loadable(() =>
  import("./pages/Learn/Pilates/Pilates-Learn-Advanced")
);

const Tutorials = loadable(() => import("./pages/Tutorials/Tutorials"));

const Instructions = loadable(() => import("./pages/Instructions/Instructions"));

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="*" element={<FourOhFour />} />
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
            path="/pilates-practice-intermediate"
            element={
              <PrivateRoute>
                <PilatesPracticeIntermediate />
              </PrivateRoute>
            }
          />
          <Route
            path="/pilates-practice-advanced"
            element={
              <PrivateRoute>
                <PilatesPracticeAdvanced />
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
            path="/yoga-practice-advanced"
            element={
              <PrivateRoute>
                <YogaPracticeAdvanced />
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
            path="/yoga-learn-advanced"
            element={
              <PrivateRoute>
                <YogaLearnAdvanced />
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
          <Route
            path="/pilates-learn-intermediate"
            element={
              <PrivateRoute>
                <PilatesLearnIntermediate />
              </PrivateRoute>
            }
          />
          <Route
            path="/pilates-learn-advanced"
            element={
              <PrivateRoute>
                <PilatesLearnAdvanced />
              </PrivateRoute>
            }
          />
          <Route
            path="/selection-learn"
            element={
              <PrivateRoute>
                <SelectionLearn />
              </PrivateRoute>
            }
          />
          <Route
            path="/selection-practice"
            element={
              <PrivateRoute>
                <SelectionPractice />
              </PrivateRoute>
            }
          />
          <Route
            path="/tutorials"
            element={
              <PrivateRoute>
                <Tutorials />
              </PrivateRoute>
            }
          />
          <Route
            path="/about"
            element={
              <PrivateRoute>
                <AboutUs />
              </PrivateRoute>
            }
          />
          <Route
            path="/instructions"
            element={
              <PrivateRoute>
                <Instructions />
              </PrivateRoute>
            }
          />
          <Route path="/aboutus" element={<AboutUsLanding />} />
          <Route
            path="/"
            element={
              <DashRoute>
                <Landing />
              </DashRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
