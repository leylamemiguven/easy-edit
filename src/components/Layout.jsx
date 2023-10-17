import React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import '../index.css'
import Footer from "./Footer"

export default function Layout() {
    return (
        <div className="app-wrapper">
            <Navbar />
            <main className="main-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}