import React, { useState } from 'react'
import Navbar from './Navbar'
import DisplayInformation from './DisplayInformation';

const Foundation = () => {

  const [isDarkMode, setIsDarkMode] = useState(true);
  return (
    <div className={isDarkMode?"bg-foundation-dark":"bg-foundation-light"}>
        <Navbar  isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>

        <DisplayInformation isDarkMode={isDarkMode}/>
    </div>
  )
}

export default Foundation