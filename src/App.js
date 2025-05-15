import "./App.css"

import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import {BrowserRouter as Router, Routes} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import useUserRoutes from "./components/routes/userRoutes";
import useAdminRoutes from "./components/routes/adminRoutes";
import ChatBot from "./components/chatbot/ChatBot";


function App() {
  const userRoutes=useUserRoutes();
  const adminRoutes=useAdminRoutes()
  return (
    <Router>
    <div className="App">
      <Toaster position="top-center"/>
   
     <Header/>

     <div className="container">
      <Routes>
    
        {userRoutes}
        {adminRoutes}
        </Routes>
    
     </div>
     <ChatBot/>
     <Footer/>
    </div>
    </Router>
  );
}

export default App;
