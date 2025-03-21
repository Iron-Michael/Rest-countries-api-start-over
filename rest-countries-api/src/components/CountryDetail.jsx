import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../CountryDetail.css'
const CountryDetail = ({ isDarkMode }) => {
   const { countryName } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    async function fetchCountryDetails() {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setCountry(data[0]);

        // ดึงข้อมูลของประเทศที่ติดกับ border
        if (data[0].borders) {
          const borders = data[0].borders;
          const borderData = await Promise.all(
            borders.map(async (border) => {
              const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
              const borderJson = await borderResponse.json();
              return borderJson[0].name.common;
            })
          );
          setBorderCountries(borderData);
        }
      } catch (error) {
        console.error("Error fetching country details:", error);
      }
    }
    fetchCountryDetails();
  }, [countryName]);

  if (!country) return <p>Loading...</p>;
  return (
    <div className={isDarkMode ? 'country-detail-dark' : 'country-detail-light'}>
      <div className='position-back-button'>
      <button onClick={() => navigate(-1)} className={isDarkMode?"back-button-dark":"back-button-light"}>⬅ Back</button>
       </div> 
      <div className="country-container">
        <div className='space-image-display'>
        <img src={country.flags.png} className="country-flag" alt="flag" />
        </div>
        <div className="country-info">
          <h2 style={{textAlign:"left"}}>{country.name.common}</h2>
          <p><strong>Native Name:</strong> {Object.values(country.name.nativeName)[0].common}</p>
          <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Sub Region:</strong> {country.subregion}</p>
          <p><strong>Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}</p>
          <p><strong>Languages:</strong> {Object.values(country.languages).join(", ")}</p>
          <p><strong>Currencies:</strong> {Object.values(country.currencies).map(c => c.name).join(", ")}</p>
          <p><strong>Border Countries:</strong></p>
          <div className="border-countries">
            {borderCountries.length > 0 ? borderCountries.map(border => (
              <button
                key={border}
                onClick={() => navigate(`/country/${border}`)}
                className="border-button"
              >
                {border}
              </button>
            )) : <span>No Border Countries</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
