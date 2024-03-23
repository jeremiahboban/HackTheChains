import React, { useEffect, useState } from 'react';
import { fetchBalance } from './solanaService';

function SolanaComponent() {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    async function fetchSolanaBalance() {
      const publicKey = 'YOUR_SOLANA_PUBLIC_KEY';
      const balance = await fetchBalance(publicKey);
      setBalance(balance);
    }
    fetchSolanaBalance();
  }, []);

  return (
    <div>
      <h2>Solana Account Balance:</h2>
      <p>{balance}</p>
    </div>
  );
}

export default SolanaComponent;
