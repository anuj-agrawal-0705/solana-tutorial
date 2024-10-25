import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

// const suppliedPublicKey = process.argv[2];
// if(!suppliedPublicKey){
//     throw new Error("Provide a valid public key to heck the balance!");
// }

const publicKey = new PublicKey("3prf8edB1ZTyJWeG1u7zrx4Dqd3x3rsdToNW2gyCPJzW");

const connection = new Connection("https://api.devnet.solana.com", "confirmed");



const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
    `Finished! The balance for the wallet at address ${publicKey} is ${balanceInLamports}`
);
