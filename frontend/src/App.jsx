import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import InvestorDashboard from "./pages/InvestorDashboard";
import BusinessDashboard from "./pages/BusinessDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";


function App() {
  return (
    <BrowserRouter>
      <Routes>  
        <Route path="/" element={<AppLayout />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        <Route path="/business" element={
          <ProtectedRoute role="business">
           <AppLayout>
            <BusinessDashboard />
           </AppLayout>
          </ProtectedRoute>
        } />

        <Route path="/investor" element={
          <ProtectedRoute role="investor">
            <AppLayout>
              <InvestorDashboard />
            </AppLayout>
          </ProtectedRoute>
        } />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
