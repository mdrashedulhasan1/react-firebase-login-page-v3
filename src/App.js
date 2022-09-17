import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import About from './components/About/About';
import Login from './components/Login/Login';
import Navbar from './components/Shared/Navbar';
import Register from './components/Login/Register';
import RequireAuth from './components/Login/RequireAuth';
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/about" element={
          <RequireAuth>
            <About></About>
          </RequireAuth>
        } />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/signup" element={<Register></Register>} />
      </Routes>
    </div>
  );
}

export default App;
