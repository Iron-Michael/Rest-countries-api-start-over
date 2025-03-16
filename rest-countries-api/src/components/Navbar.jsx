import React from 'react'
import moonMode from '../assets/moon-svgrepo-com.svg'
import Moon from '../assets/moon'

const Navbar = () => {
  return (
    <div className="navigation-bg">
        <div className="box-navigation">
            <div>Where in the world? </div>
            <div style={{display:"flex",justifyContent:"center",}}> <Moon /> Dark Mode</div>
        </div>

    </div>
  )
}

export default Navbar