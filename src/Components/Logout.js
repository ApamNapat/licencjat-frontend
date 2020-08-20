import React from 'react';
import {Redirect} from "react-router-dom";


const Logout = () => {
    console.log("xyz")
    return <Redirect to={"/xyz/abc"}/>;
}

export default Logout;