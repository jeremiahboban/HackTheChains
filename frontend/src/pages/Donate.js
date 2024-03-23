import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { connect } from "../components/WalletAdapter";

export function Donate() {
    const [connected, setConnected] = useState(false);
    const [connection, setConnection] = useState(null);

    useEffect(() => {
        const connectWallet = async () => {
            const adapter = await connect();
            if (adapter) {
                setConnected(true);
                setConnection(adapter);
            }
        };
        connectWallet();
    }, []);

    const handleConnectWallet = async () => {
        const adapter = await connect();
        if (adapter) {
            setConnected(true);
            setConnection(adapter);
        }
    };

    return (
        <div>
            <NavBar active="donate" />
          
        </div>
    );
}

export default Donate;
