import React, {useEffect, useState} from 'react';
import {wait} from "@testing-library/user-event/dist/utils";
import axios from "axios";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [cartData,setCartData] = useState([]);
    const [cartDataUpdated, setCartDataUpdated] = useState(false);
    const [cartProds,setCartProds] = useState([]);
    const [cartId, setCartId] = useState("none");
    const login = async (username,cartDataParam) => {
        setCartData(cartDataParam);


        setUsername(username);

        setIsLoggedIn(true);



    };


    useEffect(() => {
       if(cartData)

       {
           console.log("se seteaza");
           setCartId(cartData.id);
           setCartProds(cartData.cartProducts);
           if(cartId)
           console.log(cartId);
       }


    }, [cartData,cartId]);
    const logout = () => {
        setUsername('');
        setIsLoggedIn(false);
        setCartData([]);
        setCartDataUpdated(false);
    };

    const value = {
        isLoggedIn,
        username,
        login,
        logout,
        cartData,
        cartDataUpdated,
        setCartData,
        setCartDataUpdated,
        cartProds,
        setCartProds,
        cartId
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
