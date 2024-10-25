import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey
} from "@solana/web3.js"
import "dotenv/config"
import { getKeypairFromEnvironment } from "@solana-developers/helpers"

const suppliedToPublickey = process.argv[2] || null ;

if(!suppliedToPublickey){
    console.log("Please provide a public key to send to");
    process.exit(1);
}

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`suppliedToPublickey: ${suppliedToPublickey}`);

const toPubkey = new PublicKey(suppliedToPublickey);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

console.log(
    `Loaded our keypair and sender public key`
);

const transaction = new Transaction();

const LAMPORTS_TO_SEND = 500;

const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey,
    lamports: LAMPORTS_TO_SEND
});

transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair]);

console.log(`Finished! Sent lamports to the address ${toPubkey}`);
console.log(`Transaction signature is ${signature}!`);