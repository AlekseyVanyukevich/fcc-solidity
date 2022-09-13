import 'dotenv/config';
import { ethers } from "ethers";
import * as fs from "fs-extra";

async function main() {
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!);
    const encryptedJSONKey = await wallet.encrypt(process.env.PRIVATE_KEY_PASSWORD!, process.env.PRIVATE_KEY);
    fs.writeFileSync('./.encryptedKey.json', encryptedJSONKey);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });