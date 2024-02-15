import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Home.css';
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";

function SellerNav() {
    const { logOut, user } = useUserAuth();
  console.log("User in LoggedIn: ", user);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
      alert("You have been logged out!");
    } catch (error) {
      console.log(error.message);
    }
  };

    return (
        <>
            <div className='nav'>
                <div className='nav__logo'>MSKart</div>
                <div className='nav__menu'>
                    <NavLink exact to='/' activeClassName="active">Home</NavLink>
                    <NavLink to='/seller' activeClassName="active">Seller</NavLink>
                    <NavLink to='/sellerlogin' activeClassName="active">Login</NavLink>
                    <NavLink to='/sellersignup' activeClassName="active">SignUP</NavLink>
                    <NavLink to='/addproducts' activeClassName="active">Add Products</NavLink>
                </div>
                
                <div className="nav__right">
                {user && <div>Logged in as {user.email}</div>}
                {user && <button className="btn btn-danger" onClick={handleLogout}>Sign Out</button>}
                </div>
                
            </div>
        </>
    );
}

export default SellerNav;
