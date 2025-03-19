import React, { useEffect, useState } from 'react'
import SearchBox from "../components/SearchBox.jsx"
import FilterByRegion from './FilterByRegion.jsx';
const DisplayInformation = ({isDarkMode}) => {


  async function fetchCountries() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,capital,languages,currencies,region");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const countries = await response.json();
        return countries;
    } catch (error) {
        console.error("Error fetching countries:", error);
        return [];
    }
  }

  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); 
   const [selectedRegion, setSelectedRegion] = useState("");
  const regions = ["Asia", "Europe", "Africa", "Oceania", "Americas",""];

  const handleRegionChange = (event) => {

    if (event.target.value === "All"){
      setSelectedRegion("");
    }else{
      setSelectedRegion(event.target.value);
    }
    console.log("Selected region:", event.target.value);
  };

    useEffect(() => {
        async function getCountries() {
            const allCountries = await fetchCountries(); // รอให้ fetch เสร็จก่อน
            setCountries(allCountries); // อัปเดต state
        }
        getCountries();
    }, []);

    console.log("All countries:", countries);


  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by country name
  );

  const filteredByRegions = countries.filter(regions =>
    regions.region.toLowerCase().includes(selectedRegion.toLowerCase())
  )

  const combinedFilteredCountries = filteredCountries.filter(country =>
  filteredByRegions.some(filteredRegion => filteredRegion.name.common === country.name.common)
);



  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update the search query
  };


  return (
    <>
      <SearchBox isDarkMode={isDarkMode} onSearchChange={handleSearchChange}/>
      <FilterByRegion 
      isDarkMode={isDarkMode}  
      onRegionChange={handleRegionChange}
      regions={regions}/>
      {combinedFilteredCountries.map((country, index)=>{
         return (
      <div key={index} className={isDarkMode? 'display-information-dark':'display-information-light'}>
        <div style={{width:"100%"}} >
            <img src=  {country.flags.png} className='flag-country'/>
        </div>


      <div  style={{width:"80%",display:"flex",flexDirection:"column"}} >
        <label className={isDarkMode ?'country-name-dark':'country-name-light'}> {country.name.common}</label>
        <div className={isDarkMode ?'label-and-data-dark':'label-and-data-light'}>
        <label className='native-information'>Population:</label>
        <label className='native-information'>  {country.population} </label>
        </div>
        <div className={isDarkMode ?'label-and-data-dark':'label-and-data-light'}>
        <label className='native-information'>Region:</label>
        <label className='native-information'>  {country.region}  </label>
        </div>
        <div className={isDarkMode ?'label-and-data-dark':'label-and-data-light'}>
        <label className='native-information'>Capital:</label>
        <label className='native-information'> {country.capital ? country.capital[0] : 'N/A'}  </label>
        </div>
      </div>  

      
    </div>
         )
   })}
   </>
  )
}

export default DisplayInformation