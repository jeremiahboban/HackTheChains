import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Donate from "./pages/Donate";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter
} from "@solana/wallet-adapter-wallets";
import React, {useMemo} from 'react';
import '@solana/wallet-adapter-react-ui/styles.css';
import Contributions from "./pages/Contributions";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/contributions" element={<Contributions />} />
          </Routes>
      </BrowserRouter>
    </div>
    
   );
 }
 
 export default App;
 
 