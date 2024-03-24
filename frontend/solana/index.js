import { Connection, clusterApiUrl } from '@solana/web3.js';

const connection = new Connection(clusterApiUrl('devnet'));

import { Transaction, SystemProgram, PublicKey } from '@solana/web3.js';

const fromPublicKey = new PublicKey('sender public key');
const toPublicKey = new PublicKey('recipient public key');
const lamportsToSend = 1000000; // Amount in lamports (1 SOL = 1000000000 lamports)

const transaction = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: fromPublicKey,
    toPubkey: toPublicKey,
    lamports: lamportsToSend,
  })
);

import { Keypair } from '@solana/web3.js';

const senderKeypair = Keypair.fromSecretKey(secretKeyBuffer);
transaction.recentBlockhash = (
  await connection.getLatestBlockhash()
).blockhash;
transaction.sign(senderKeypair);

const signature = await connection.sendTransaction(transaction);
console.log('Transaction signature:', signature);

