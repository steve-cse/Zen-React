import Signup from "./pages/Signup/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword"
import Landing from "./pages/Landing/Landing";
function App() {
  return (

   
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              ></Route>
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword/>}/>
              <Route path='/' element={<Landing/>} />
            </Routes>
          </AuthProvider>
        </Router>
     

  );
}

export default App;
