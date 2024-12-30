import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <a href="/">Home</a>
      {user?.role === "seller" && <a href="/seller/products">My Products</a>}
      {user?.role === "customer" && <a href="/cart">Cart</a>}
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <a href="/login">Login</a>
      )}
    </nav>
  );
};

export default Navbar;
