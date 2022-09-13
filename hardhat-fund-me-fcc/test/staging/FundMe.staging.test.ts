import { assert } from 'chai';
import { network, ethers, getNamedAccounts } from 'hardhat';
import { developmentChains } from '../../helper-hardhat-config';
import { FundMe } from '../../typechain-types';

developmentChains.includes(network.name) ? describe.skip :
describe('FundMe', () => {
    let fundMe: FundMe;
    let deployer: string;
    const sendValue = ethers.utils.parseEther('0.05');

    beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer;
        fundMe = await ethers.getContract('FundMe');
    });

    it('allows people to fund and withdraw', async () => {
        await fundMe.fund({ value : sendValue });
        await fundMe.withdraw();
        const endingBalance = await fundMe.provider.getBalance(fundMe.address);
        assert.equal(endingBalance.toString(), '0');
    });
});