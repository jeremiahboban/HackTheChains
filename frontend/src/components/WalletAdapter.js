import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { WalletContext } from "@solana/wallet-adapter-react";
import { useContext } from "react";

const network = WalletAdapterNetwork.Devnet; // Change to Mainnet or Testnet as needed

const connect = async () => {
  try {
    const phantomWallet = new PhantomWalletAdapter();
    await phantomWallet.connect();
    return phantomWallet;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const useWalletAdapter = () => {
  const { wallets, select } = useContext(WalletContext);

  // Assuming you're using only one wallet adapter, you can directly return it
  return wallets[0];
};

export { connect, useWalletAdapter };
