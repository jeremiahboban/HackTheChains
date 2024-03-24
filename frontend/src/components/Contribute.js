import React, { useState, useEffect, useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
    ConnectionProvider,
    WalletProvider,
    useWallet,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import moment from "moment";

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
    const [signatures, setSignatures] = useState([]);
    const [profitArray, setProfitArray] = useState([]);
    const [blockTimes, setBlockTimes] = useState([]);
    const [donorAddresses, setDonorAddresses] = useState([]);
    const [transactionFees, setTransactionFees] = useState([]);

    useEffect(() => {
        if (!publicKey) return;

        async function fetchTransactionHistory() {
            try {
                const response = await fetch(`https://api.devnet.solana.com/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        jsonrpc: "2.0",
                        id: 1,
                        method: "getConfirmedSignaturesForAddress2",
                        params: [publicKey.toBase58()],
                    }),
                });

                const responseData = await response.json();
                const transactions = responseData.result;
                let blocktimeTemp = [];
                let profitTemp = [];
                let signatureTemp = [];
                let donorTemp = [];
                let feesTemp = [];

                if (Array.isArray(transactions)) {
                    const detailedTransactions = await Promise.all(
                        transactions.map(async (transaction) => {
                            const txResponse = await fetch(
                                `https://api.devnet.solana.com/`,
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        jsonrpc: "2.0",
                                        id: 1,
                                        method: "getTransaction",
                                        params: [transaction["signature"]],
                                    }),
                                }
                            );

                            const txData = await txResponse.json();
                            console.log("txResponse:", JSON.stringify(txData));

                            const donorAddress =
                                txData?.result.transaction.message
                                    .accountKeys[0] || "N/A";
                            let profit = 0;
                            if (
                                donorAddress ===
                                "5QUmmoVQYRgnzj562PP1p1BiTD3dmmqVbSmKGMqwoSKV"
                            ) {
                                profit =
                                    -1 * txData?.result.meta.postBalances[1] +
                                        txData?.result.meta.preBalances[1] ||
                                    "N/A";
                            } else {
                                profit =
                                    txData?.result.meta.postBalances[1] -
                                        txData?.result.meta.preBalances[1] ||
                                    "N/A";
                            }
                            const signature =
                                txData?.result.transaction.signatures[0] ||
                                "N/A";

                            const blockTime =
                                txData?.result?.blockTime || "N/A";

                            const fee = txData?.result.meta.fee || "N/A";

                            signatureTemp.push(signature);
                            profitTemp.push(profit);
                            blocktimeTemp.push(blockTime);
                            donorTemp.push(donorAddress);
                            feesTemp.push(fee);
                        })
                    );

                    setSignatures(signatureTemp);
                    setProfitArray(profitTemp);
                    setBlockTimes(blocktimeTemp);
                    setDonorAddresses(donorTemp);
                    setTransactionFees(feesTemp);

                    setTransactionHistory(detailedTransactions);
                } else {
                    console.error(
                        "Invalid transaction history data:",
                        transactions
                    );
                }

                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching transaction history:", error);
                setIsLoading(false);
            }
        }

        fetchTransactionHistory();
    }, [publicKey]);

    useEffect(() => {
        console.log("signatures", signatures);
        console.log("profitArray", profitArray);
        console.log("blockTimes", blockTimes);
        console.log("donorAddresses", donorAddresses);
        console.log("transactionFees", transactionFees);
        localStorage.setItem("profitArray", JSON.stringify(profitArray));
        localStorage.setItem(
            "transactionFees",
            JSON.stringify(transactionFees)
        );
    }, [signatures, profitArray, blockTimes, donorAddresses]);

    return (
        <div className="App">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="min-w-full p-6 bg-white rounded-lg shadow-xl">
                    <h2 className="text-2xl font-bold mb-4">
                        Transaction History
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Time
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Donor Address
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Amount (USD)
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Signature
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {signatures.map((signature, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {moment
                                                .unix(
                                                    Math.round(
                                                        blockTimes[index]
                                                    )
                                                )
                                                .format("YYYY-MM-DD HH:mm:ss")}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {donorAddresses[index]}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            
                                            {(
                                                profitArray[index] *
                                                0.000000001 *
                                                176.84
                                            ).toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {signature}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};
