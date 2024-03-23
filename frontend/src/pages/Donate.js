import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter
} from "@solana/wallet-adapter-wallets";
import React, {useMemo} from 'react';
import '@solana/wallet-adapter-react-ui/styles.css';

function Donate() {
  return (
    <div>
      
      <div>
       <Context>
     </Context>
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
      new TorusWalletAdapter()
    ],
    []
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

const Content = () => {
  return (
    <div className="App">
      <WalletMultiButton />
    </div>
  )
}
