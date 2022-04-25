import Signup from "./pages/Signup/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Landing from "./pages/Landing/Landing";
import PilatesPracticeBeginner from "./pages/Practice/Pilates/Pilates-Practice-Beginner";
import PilatesPracticeIntermediate from "./pages/Practice/Pilates/Pilates-Practice-Intermediate";
import PilatesPracticeAdvanced from "./pages/Practice/Pilates/Pilates-Practice-Advanced";
import YogaPracticeBeginner from "./pages/Practice/Yoga/Yoga-Practice-Beginner";
import YogaPracticeIntermediate from "./pages/Practice/Yoga/Yoga-Practice-Intermediate";
import YogaPracticeAdvanced from "./pages/Practice/Yoga/Yoga-Practice-Advanced";
import YogaLearnBeginner from "./pages/Learn/Yoga/Yoga-Learn-Beginner";
import YogaLearnIntermediate from "./pages/Learn/Yoga/Yoga-Learn-Intermediate";
import YogaLearnAdvanced from "./pages/Learn/Yoga/Yoga-Learn-Advanced";
import PilatesLearnBeginner from "./pages/Learn/Pilates/Pilates-Learn-Beginner";
import PilatesLearnIntermediate from "./pages/Learn/Pilates/Pilates-Learn-Intermediate";
import PilatesLearnAdvanced from "./pages/Learn/Pilates/Pilates-Learn-Advanced";
import SelectionLearn from "./pages/SelectionLearn/SelectionLearn";
import SelectionPractice from "./pages/SelectionPractice/SelectionPractice";
import Tutorials from "./pages/Tutorials/Tutorials";
import FourOhFour from "./pages/FourOhFour/FourOhFour";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
        <Route path="*" element={<FourOhFour/>}/>
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
                <SelectionLearn/>
              </PrivateRoute>
            }
          />
          <Route
            path="/selection-practice"
            element={
              <PrivateRoute>
                <SelectionPractice/>
              </PrivateRoute>
            }
          />
          <Route
            path="/tutorials"
            element={
              <PrivateRoute>
                <Tutorials/>
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
