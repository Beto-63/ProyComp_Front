import React from 'react'
//import { Navbar, Container, Offcanvas, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'



function GeneralNav2() {
    return (
        <div>
            <p>Please choose a repository from the list below.</p>
            <ul>
                <li><Link to="/">React</Link></li>
            </ul>
        </div>
    )
}

export default GeneralNav2
