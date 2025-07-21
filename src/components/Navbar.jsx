import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
   return (
       <nav className="navbar">
           <div className="navbar-logo">
               <Link to="/">CareSync</Link>
           </div>
           <ul className="navbar-links">
               <li><Link to="/dashboard">Dashboard</Link></li>
               <li><Link to="/appointments">Appointments</Link></li>
               <li><Link to="/prescriptions">Prescriptions</Link></li>
           </ul>
           <div className="navbar-auth">
               <Link to="/login">Login</Link>
               <Link to="/register">Register</Link>
           </div>
       </nav>
   );
};

export default Navbar;