import React, { useState, useCallback, useMemo } from "react";
import {
    WalletAdapterNetwork,
    WalletNotConnectedError,
} from "@solana/wallet-adapter-base";
import {
    ConnectionProvider,
    WalletProvider,
    useWallet,
} from "@solana/wallet-adapter-react";
import {
    WalletModalProvider,
    WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
    clusterApiUrl,
    Transaction,
    SystemProgram,
    LAMPORTS_PER_SOL,
    PublicKey,
} from "@solana/web3.js";
import { Connection } from "@metaplex/js";
import { Buffer } from "buffer";
window.Buffer = window.Buffer || require("buffer").Buffer;

function Transact() {
    return (
        <Context>
            <Content />
        </Context>
    );
}

export default Transact;

const Context = ({ children }) => {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

const Content = () => {
    const [lamports, setLamports] = useState(0.1);
    const [wallet, setWallet] = useState(
        "5QUmmoVQYRgnzj562PP1p1BiTD3dmmqVbSmKGMqwoSKV"
    );

    const { publicKey, sendTransaction } = useWallet();
    const connection = useMemo(
        () => new Connection(clusterApiUrl("devnet")),
        []
    );

    const onClick = useCallback(async () => {
        if (!publicKey) throw new WalletNotConnectedError();

        const lamportsToSend = lamports * LAMPORTS_PER_SOL;

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey(wallet),
                lamports: lamportsToSend,
            })
        );

        const signature = await sendTransaction(transaction, connection);
        await connection.confirmTransaction(signature, "processed");
    }, [publicKey, sendTransaction, connection, lamports, wallet]);

    const handleLamportsChange = (e) => {
        setLamports(parseFloat(e.target.value));
    };

    const handleWalletChange = (e) => {
        setWallet(e.target.value);
    };

    return (
        <div className="App">
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold mb-4">Solana Transaction</h2>

                <WalletMultiButton />

                <p>&nbsp;</p>
                <div className="mb-4">
                    <label htmlFor="lamports" className="block text-gray-700">
                        Amount (SOL):
                    </label>
                    <input
                        id="lamports"
                        value={lamports}
                        type="number"
                        onChange={handleLamportsChange}
                        className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>

                <button
                    onClick={onClick}
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Donate Now
                </button>
            </div>
        </div>
    );
};
