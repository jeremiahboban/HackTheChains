import React from "react";
import NavBar from "../components/NavBar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Contribute from "../components/Contribute";
import Transactions from "../components/GetLedger";

export default function Contributions() {
    return (
        <>
            <NavBar active="contributions" />
            <Contribute />
        </>
    );
}
