import { deployments, ethers, getNamedAccounts, network } from 'hardhat';
import { FundMe, MockV3Aggregator } from "../../typechain-types";
import { assert, expect } from 'chai';
import { developmentChains } from '../../helper-hardhat-config';

!developmentChains.includes(network.name) ? describe.skip :
describe('FundMe', function() {
    let fundMe: FundMe;
    let deployer: string;
    let mockV3Aggregator: MockV3Aggregator;
    const sendValue = ethers.utils.parseEther('5');

    beforeEach(async function() {
        // const accounts = ethers.getSigners();
        deployer = (await getNamedAccounts()).deployer;
        await deployments.fixture(['all']);
        fundMe = await ethers.getContract('FundMe', deployer);
        mockV3Aggregator = await ethers.getContract('MockV3Aggregator', deployer);
    });
    
    describe('constructor', async function() {
        it('sets the aggregator addresses correctly', async () => {
            const response = await fundMe.getPriceFeed();
            assert.equal(response, mockV3Aggregator.address);
        });
    });

    describe('fund', () => {
        it('Fails if you don\'t send enough ETH', async () => {
            await expect(fundMe.fund()).to.rejectedWith('FundMe_MinimumETH');
        });

        it('updated the amont funded data structure', async () => {
            await fundMe.fund({ value: sendValue });
            const response = await fundMe.getFundedAmount(deployer);
            assert.equal(sendValue.toString(), response.toString());
        });
        it('Add funder to array of funders', async () => {
            await fundMe.fund({ value: sendValue });
            const response = await fundMe.getFunder(0);
            assert.equal(response, deployer);
        });
    });

    describe('withdraw', () => {
        beforeEach(async () => {
            await fundMe.fund({ value: sendValue });
        });

        it('withdraw ETH from a single funder', async () => {
            // Assert
            const startingFundMeBalance = await fundMe.provider.getBalance(fundMe.address);
            const startingDeployerBalance = await fundMe.provider.getBalance(deployer);

            // Act
            const transactionResponse = await fundMe.withdraw();
            const transactionReceipt = await transactionResponse.wait();

            const  { gasUsed, effectiveGasPrice } = transactionReceipt;
            const gasCost = gasUsed.mul(effectiveGasPrice);

            const endingFundMeBalance = await fundMe.provider.getBalance(fundMe.address);
            const endingDeployerBalance = await fundMe.provider.getBalance(deployer);

            // Assert
            assert.equal(endingFundMeBalance.toString(), '0');
            assert.equal(startingFundMeBalance.add(startingDeployerBalance).toString(),
                endingDeployerBalance.add(gasCost).toString()
                );
        });

        it('allows us to withdraw with multiple funders', async () => {
            const accounts = await ethers.getSigners();

            for (let i = 1; i < 6; i++) {
                const fundMeConnectContract = await fundMe.connect(accounts[i]);

                await fundMeConnectContract.fund({ value: sendValue });
            }

            const startingFundMeBalance = await fundMe.provider.getBalance(fundMe.address);
            const startingDeployerBalance = await fundMe.provider.getBalance(deployer);

            // Act 
            const transactionResponse = await fundMe.withdraw();
            const transactionReceipt = await transactionResponse.wait();

            const  { gasUsed, effectiveGasPrice } = transactionReceipt;
            const gasCost = gasUsed.mul(effectiveGasPrice);

            const endingFundMeBalance = await fundMe.provider.getBalance(fundMe.address);
            const endingDeployerBalance = await fundMe.provider.getBalance(deployer);

            // Assert
            assert.equal(endingFundMeBalance.toString(), '0');
            assert.equal(startingFundMeBalance.add(startingDeployerBalance).toString(),
                endingDeployerBalance.add(gasCost).toString()
                );

            // Assert
            await expect(fundMe.getFunder(0)).to.reverted;

            for (let i = 1; i < 6; i++) {
                assert.equal(await (await fundMe.getFundedAmount(accounts[1].address)).toString(), '0');
            }

        });

        it('only allows the owner to widthdraw', async () => {
            const accounts = await ethers.getSigners();
            const attacker = accounts[1];
            const attackerConnectedCotract = await fundMe.connect(attacker);
            await expect(attackerConnectedCotract.withdraw()).to.be.rejectedWith('FundMe__NotOwner');
        });

        
        it('cheaper withdraw ETH from a single funder', async () => {
            // Assert
            const startingFundMeBalance = await fundMe.provider.getBalance(fundMe.address);
            const startingDeployerBalance = await fundMe.provider.getBalance(deployer);

            // Act
            const transactionResponse = await fundMe.cheaperWidthdraw();
            const transactionReceipt = await transactionResponse.wait();

            const  { gasUsed, effectiveGasPrice } = transactionReceipt;
            const gasCost = gasUsed.mul(effectiveGasPrice);

            const endingFundMeBalance = await fundMe.provider.getBalance(fundMe.address);
            const endingDeployerBalance = await fundMe.provider.getBalance(deployer);

            // Assert
            assert.equal(endingFundMeBalance.toString(), '0');
            assert.equal(startingFundMeBalance.add(startingDeployerBalance).toString(),
                endingDeployerBalance.add(gasCost).toString()
                );
        });

        it('chepear withdraw', async () => {
            const accounts = await ethers.getSigners();

            for (let i = 1; i < 6; i++) {
                const fundMeConnectContract = await fundMe.connect(accounts[i]);

                await fundMeConnectContract.fund({ value: sendValue });
            }

            const startingFundMeBalance = await fundMe.provider.getBalance(fundMe.address);
            const startingDeployerBalance = await fundMe.provider.getBalance(deployer);

            // Act 
            const transactionResponse = await fundMe.cheaperWidthdraw();
            const transactionReceipt = await transactionResponse.wait();

            const  { gasUsed, effectiveGasPrice } = transactionReceipt;
            const gasCost = gasUsed.mul(effectiveGasPrice);

            const endingFundMeBalance = await fundMe.provider.getBalance(fundMe.address);
            const endingDeployerBalance = await fundMe.provider.getBalance(deployer);

            // Assert
            assert.equal(endingFundMeBalance.toString(), '0');
            assert.equal(startingFundMeBalance.add(startingDeployerBalance).toString(),
                endingDeployerBalance.add(gasCost).toString()
                );

            // Assert
            await expect(fundMe.getFunder(0)).to.reverted;

            for (let i = 1; i < 6; i++) {
                assert.equal(await (await fundMe.getFundedAmount(accounts[1].address)).toString(), '0');
            }

        });
    });

});