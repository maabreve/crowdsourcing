import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import './styles/app.css';
import './styles/tailwind.css';

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import User from "./models/User";

import UserContext from './contexts/user-context';

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          const loggedUser: User = {
            fullName: resObject.user.fullName,
            picture: resObject.user.picture,
            email: resObject.user.email,
            googleId: resObject.user.googleId,
          };
          setUser(loggedUser);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <>
          <NavBar />
          <Routes>
            <Route path="/" element={user ? <Home /> : <Login />} />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </>
      </BrowserRouter>
    </UserContext.Provider>

  );
};

export default App;
