import React, { useEffect, useRef, useState } from 'react';
import SearchBox from "../components/SearchBox.jsx";
import FilterByRegion from './FilterByRegion.jsx';
import { useNavigate } from 'react-router-dom';

const DisplayInformation = ({ isDarkMode }) => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [loadCount, setLoadCount] = useState(8);
  const loaderRef = useRef(null);
  const navigate = useNavigate(); 

  const regions = ["Asia", "Europe", "Africa", "Oceania", "Americas"];

  // ดึงข้อมูลประเทศ
  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    }
    fetchCountries();
  }, []);

  // ฟังก์ชันเปลี่ยน region
  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  // ฟังก์ชันเปลี่ยนค่าค้นหา
  const onSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // กรองข้อมูลตาม searchQuery และ selectedRegion
  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedRegion === "" || country.region.toLowerCase().includes(selectedRegion.toLowerCase()))
  );

  // ตั้งค่า observer สำหรับโหลดเพิ่ม
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setLoadCount(prev => prev + 8);
      }
    }, { threshold: 1 });

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, []);

  // **แก้ไข: คำนวณ visibleCountries ตรงนี้แทนการใช้ useEffect**
  const visibleCountries = filteredCountries.slice(0, loadCount);

  return (
    <>
      {/* กล่องค้นหา */}
      <div className='search-and-filter-position'>
      <SearchBox isDarkMode={isDarkMode} onSearchChange={onSearchChange} />
      
      {/* ตัวกรองภูมิภาค */}
      <FilterByRegion isDarkMode={isDarkMode} onRegionChange={handleRegionChange} regions={regions} />
      </div>
      {/* แสดงประเทศ */}
        <div className="country-grid">
      {visibleCountries.map((country, index) => (
        <div key={index}  
          className={isDarkMode ? 'display-information-dark' : 'display-information-light'}
          onClick={() => navigate(`/country/${country.name.common}`)}
      
        >
          <img src={country.flags.png} className='flag-country' alt="flag" />
          <div style={{width:"80%",paddingTop:"20px",paddingBottom:"40px"}}>
            <label className={isDarkMode ? 'country-name-dark' : 'country-name-light'}>
              {country.name.common}
            </label>
            <div className={isDarkMode ? 'label-and-data-dark' : 'label-and-data-light'}>
              <label>Population: </label>
              <label>{country.population.toLocaleString()}</label>
            </div>
            <div className={isDarkMode ? 'label-and-data-dark' : 'label-and-data-light'}>
              <label>Region: </label>
              <label>{country.region}</label>
            </div>
            <div className={isDarkMode ? 'label-and-data-dark' : 'label-and-data-light'}>
              <label>Capital: </label>
              <label>{country.capital ? country.capital[0] : 'N/A'}</label>
            </div>
          </div>
        </div>
      ))}
      </div>
      <div ref={loaderRef}></div>
    </>
  );
};

export default DisplayInformation;
