import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { getHashedNameSync, getDomainKeySync, getNameAccountKeySync, NameRegistryState } from '@bonfida/spl-name-service';

// const suppliedPublicKey = process.argv[2];
// if(!suppliedPublicKey){
//     throw new Error("Provide a valid public key to heck the balance!");
// }

//const publicKey = new PublicKey("3prf8edB1ZTyJWeG1u7zrx4Dqd3x3rsdToNW2gyCPJzW");

const connection = new Connection("https://api.mainnet-beta.solana.com");

async function checkBalance(domain:string) {
    try{
        const { pubkey } = getDomainKeySync(domain);

        // const nameAccountKey = getNameAccountKeySync(hashedName,undefined);
        const registry = await NameRegistryState.retrieve(connection, pubkey);
         if(registry.nftOwner != null){
            const balanceInLamports = await connection.getBalance(registry.nftOwner);
            const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
            console.log(
                `Finished! The balance for the wallet at address ${domain} is ${balanceInSOL}`
            );
         }
         console.log(`nft ${registry.nftOwner?.toBase58}`)
    }
    catch(error){
        console.log("Issue while resolving domain", error);
    }
    
}

checkBalance('mccann.sol');



