import React, { useState, useEffect, useMemo } from "react";
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
    PublicKey,
    Transaction,
} from "@solana/web3.js";

function Contribute() {
    return (
        <Context>
            <Content />
        </Context>
    );
}

export default Contribute;

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
    const [transactionHistory, setTransactionHistory] = useState([]);
    const { publicKey } = useWallet();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!publicKey) return;

        async function fetchTransactionHistory() {
            try {
                const response = await fetch(
                    `https://api.devnet.solana.com/`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            jsonrpc: '2.0',
                            id: 1,
                            method: 'getConfirmedSignaturesForAddress2',
                            params: [publicKey.toBase58(), { limit: 10 }],
                        }),
                    }
                );

                const responseData = await response.json();
                const transactions = responseData.result;

                if (Array.isArray(transactions)) {
                    const detailedTransactions = await Promise.all(
                        transactions.map(async (signature) => {
                            const txResponse = await fetch(
                                `https://api.devnet.solana.com/`,
                                {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        jsonrpc: '2.0',
                                        id: 1,
                                        method: 'getConfirmedTransaction',
                                        params: [signature],
                                    }),
                                }
                            );
                            const txData = await txResponse.json();
                            return txData.result;
                        })
                    );
                    setTransactionHistory(detailedTransactions);
                } else {
                    console.error('Invalid transaction history data:', transactions);
                }

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching transaction history:', error);
                setIsLoading(false);
            }
        }

        fetchTransactionHistory();
    }, [publicKey]);

    return (
        <div className="App">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
                    <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
                    <ul>
                        {transactionHistory.map((transaction, index) => (
                            <li key={index}>
                                <span>Transaction ID: {transaction?.signatures?.[0] || 'N/A'}</span>
                                <br />
                                <span>Sender: {transaction?.message?.accountKeys?.[0] || 'N/A'}</span>
                                <br />
                                <span>Receiver: {transaction?.message?.accountKeys?.[1] || 'N/A'}</span>
                                <br />
                                {/* Add more details as needed */}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
    
    
};