import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import {
    WalletModalProvider,
    WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import React, { useMemo } from "react";
import "@solana/wallet-adapter-react-ui/styles.css";
import NavBar from "../components/NavBar";
import Transact from "../components/Transact";

function Donate() {
    return (
        <div>
            <div>
                <Context></Context>
            </div>
        </div>
    );
}

export default Donate;

const Context = ({ children }) => {
    // const network = WalletAdapterNetwork.Devnet;
    // const endpoint = useMemo(() => clusterApiUrl(network), [network])
    const endpoint = "http://localhost:8899"; // local cluster override

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            new TorusWalletAdapter(),
        ],
        []
    );

    return (
        <>
            <NavBar />
            <div className="flex flex-row">
                <div className="bg-white w-1/2 py-10">
                    <div className="max-w-4xl mx-5 px-6 lg:px-10">
                        <h2 className="text-3xl font-bold mb-6 text-blue-500">
                            How Donating Works
                        </h2>
                        <p className="text-lg">
                            Thank you for deciding to donate to our cause. To
                            donate we strictly use
                        </p>
                        <p className="text-lg mb-6">
                            SOL to maintain anonymity and transparency. Please
                            follow the steps below to donate.
                        </p>
                        <p className="text-lg">
                            <ol className="list-decimal">
                                <li className="mb-2 ml-12">
                                    Connect your wallet to the Solana
                                    blockchain.
                                </li>
                                <li className="mb-2 ml-12">
                                    Select the amount you would like to donate.
                                </li>
                                <li className="ml-12">
                                    Click the donate button to complete the
                                    transaction.
                                </li>
                            </ol>
                        </p>
                    </div>
                </div>
                <img className="w-1/2 max-h-500" src={"logo.png"} />
            </div>
            <div>
                <Transact />
            </div>
        </>
    );
};
