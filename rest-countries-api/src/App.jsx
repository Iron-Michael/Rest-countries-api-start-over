import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import DisplayInformation from './components/DisplayInformation';
import CountryDetail from './components/CountryDetail';

function App() {
  // โหลดค่าธีมจาก localStorage ถ้ามี (ค่าเริ่มต้น: dark mode)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("isDarkMode") === "false" ? false : true;
  });

  // บันทึกค่าธีมลง localStorage เมื่อเปลี่ยน
  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode);
  }, [isDarkMode]);

  return (
    <Router>
      <div className={isDarkMode ? "bg-foundation-dark" : "bg-foundation-light"}>
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <Routes>
          <Route path="/" element={<DisplayInformation isDarkMode={isDarkMode} />} />
          <Route path="/country/:countryName" element={<CountryDetail isDarkMode={isDarkMode} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
