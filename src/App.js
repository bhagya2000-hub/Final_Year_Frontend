import "./App.css";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useUserRoutes from "./components/routes/userRoutes";
import useAdminRoutes from "./components/routes/adminRoutes";
import ChatBot from "./components/chatbot/ChatBot";
import PredictPage from "./components/predict/Predict";
import ProtectedRoute from "./components/routes/ProtectedRoute"; // Make sure you have this component

function App() {
  const userRoutes = useUserRoutes();
  const adminRoutes = useAdminRoutes();
  
  return (
    <Router>
      <div className="App">
        <Toaster position="top-center"/>
        <Header />
        
        <div className="container">
          <Routes>
            {/* Existing routes */}
            {userRoutes}
            {adminRoutes}
            
            {/* Add Predict route - protected if you want only logged-in users */}
            <Route 
              path="/predict" 
              element={
                <ProtectedRoute>
                  <PredictPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
        
        <ChatBot />
        <Footer />
      </div>
    </Router>
  );
}

export default App;