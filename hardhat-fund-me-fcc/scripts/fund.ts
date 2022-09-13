import { getNamedAccounts, ethers } from 'hardhat';
import { FundMe } from '../typechain-types';

const main = async () => {
    const deployer = (await getNamedAccounts()).deployer;
    const fundMe : FundMe = await ethers.getContract('FundMe', deployer);
    console.log('Funding contract...');
    const transactionResponse = await fundMe.fund({ value: ethers.utils.parseEther('50') });
    await transactionResponse.wait(1);
    console.log('Funeded!'); 
}

main()
.then(() => process.exit(0))
.catch(error => {
    console.error(error);
    process.exit(1);
});