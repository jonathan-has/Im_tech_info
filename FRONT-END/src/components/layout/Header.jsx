import React, { useState } from "react";
import logo from "../../assets/images/logo/logo.png";
import { Link } from "react-router-dom";
import { FaSearch, FaMoon, FaBars } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

export const Header = () => {
  const [menu, setMenu] = useState(false);
  function burger() {
    if (menu === false) {
      setMenu(true);
    } else {
      setMenu(false);
    }
  }
  let iconBurger;
  let menuClass;
  if (menu === true) {
    iconBurger = <FaX size={30} />;
    menuClass = "block";
  } else {
    iconBurger = <FaBars size={30} />;
    menuClass = "hidden";
  }
  return (

    <header className="fixed top-0 w-full h-20 bg-blue-950 flex items-center justify-around z-50">


      <Link to="/">
        <div className="flex items-center">

          <img 
            src={logo}
            className="w-20 h-16"
            alt="logo"
          />

          <h1 className="text-white font-bold">
            <span>IM </span>TECH INFO
          </h1>

        </div>
      </Link>



      <nav className="hidden lg:flex gap-5">

        <Link className="text-white font-bold" to="/">
          Home
        </Link>

        <Link className="text-white font-bold" to="/Formations">
          Formations
        </Link>

        <Link className="text-white font-bold" to="/Supports">
          Supports
        </Link>

        <Link className="text-white font-bold" to="/Propos">
          A propos
        </Link>

        <Link className="text-white font-bold" to="/Contact">
          Contact
        </Link>

      </nav>
      <div className="hidden lg:flex gap-2">

        <Link to="/Login">
          <button className="cursor-pointer duration-200 active:scale-95 border text-white p-2 rounded">
            Se connecter
          </button>
        </Link>


        <Link to="/Register">
          <button className="cursor-pointer duration-200 active:scale-95 bg-blue-600 text-white p-2 rounded">
            S'inscrire
          </button>
        </Link>

      </div>



      <button 
        onClick={burger}
        className="lg:hidden text-white"
      >
        {iconBurger}
      </button>



      <div className={"lg:hidden absolute top-20 left-0 w-full h-screen bg-blue-950 " + menuClass}>

        <div className="flex flex-col items-center gap-7 pt-10">

          <Link className="text-white duration-300 hover:border-b-2  border-green-500" to="/">
            Home
          </Link>

          <Link className="text-white duration-300 hover:border-b-2  border-green-500" to="/Formations">
            Formations
          </Link>

          <Link className="text-white duration-300 hover:border-b-2  border-green-500" to="/Supports">
            Supports
          </Link>

          <Link className="text-white duration-300 hover:border-b-2  border-green-500" to="/Contact">
            Contact
          </Link>
          <Link className="text-white duration-300 hover:border-b-2  border-green-500" to="/Login">
            Se connecter
          </Link>
          <Link className="text-white duration-300 hover:border-b-2  border-green-500" to="/Register">
            S'inscrire
          </Link>
        </div>

      </div>


    </header>
  );
};