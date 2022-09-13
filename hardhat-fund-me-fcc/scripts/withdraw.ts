import { getNamedAccounts, ethers } from 'hardhat';
import { FundMe } from '../typechain-types';

const main = async () => {
    const deployer = (await getNamedAccounts()).deployer;
    const fundMe : FundMe = await ethers.getContract('FundMe', deployer);
    console.log('Funding contract...');
    const transactionResponse = await fundMe.withdraw();
    await transactionResponse.wait(1);
    console.log('withdrawed!'); 
}

main()
.then(() => process.exit(0))
.catch(error => {
    console.error(error);
    process.exit(1);
});