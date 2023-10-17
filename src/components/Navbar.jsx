import React from "react"
import { Link, NavLink } from "react-router-dom"
import "../index.css"
import  ReactLogo  from "../assets/logo.svg"


export default function Navbar() {

    const [showNav, setShowNav] = React.useState(false);

    const toggleNav = () => {
        setShowNav(!showNav);
    }
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "white"
    }

    return (
        <header className={`navbar ${showNav ? "show-nav" : ""}`}>
             {/* <Link className="logo" to="/">#EasyEdit</Link> */}
            <Link className="logo" to="/"><button className="collapsible-button" onClick={toggleNav}>
                {/* <span className="menu-icon"> */}
                     <img src={ReactLogo} alt="React Logo" />
                {/* </span> */}
            </button> </Link>
            <nav>
                <NavLink
                    to="/about"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    About
                </NavLink>
                <NavLink
                    to="/form"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Start Editing
                </NavLink>
                <NavLink
                    to="/contact"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Contact
                </NavLink>
            </nav>
        </header>
    )
}