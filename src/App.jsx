import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import Seller from './components/Seller.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import AddProducts from './components/AddProducts.jsx';
import { UserAuthContextProvider } from './context/UserAuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoutes.jsx';

export class App extends React.Component {
  render() {
    return (
      <HashRouter>
      <UserAuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/seller" element={<ProtectedRoute><Seller /></ProtectedRoute>} />
          <Route path="/sellerlogin" element={<Login />} />
          <Route path="/sellersignup" element={<SignUp />} />
          <Route path="/addproducts" element={<ProtectedRoute><AddProducts /></ProtectedRoute>} />
        </Routes>
        </UserAuthContextProvider>
      </HashRouter>
    );
  }
}

export default App;
