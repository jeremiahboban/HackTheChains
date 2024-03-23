import solanaConnection from './solana';

export async function fetchBalance(publicKey) {
  const balance = await solanaConnection.getBalance(publicKey);
  return balance;
}
