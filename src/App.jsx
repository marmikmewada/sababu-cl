import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Services from './pages/services/Services';
import Contact from './pages/contact/Contact';
import Membership from './pages/membership/Membership';
import Register from './pages/authentication/Register';
import ProfilePage from './pages/profile/ProfilePage';
import Login from './pages/authentication/Login';
import useStore from './zustand/store'; // Adjust the import path as necessary
import EditUser from './pages/profile/EditUser';
import EditMember from './pages/profile/EditMember';
import EditHousehold from './pages/profile/EditHousehold';
// import EditProfile from './pages/profile/EditProfile';

function App() {
  const { initializeStore } = useStore(); // Destructure initializeStore from useStore

  useEffect(() => {
    initializeStore(); // Run initializeStore on component mount
  }, [initializeStore]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services/*" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/app/profile" element={<ProfilePage />} />
        <Route path="/app/membership" element={<Membership />} />
        <Route path="/app/users/register" element={<Register />} />
        <Route path="/app/users/login" element={<Login />} />
        {/* <Route path="/app/user/edit" element={<EditProfile />} /> */}
        <Route path="/app/user/edit" element={<EditUser/>} />
        <Route path="/app/member/edit" element={<EditMember/>} />
        <Route path="/app/household/edit" element={<EditHousehold/>}/>

      </Routes>
    </>
  );
}

export default App;
