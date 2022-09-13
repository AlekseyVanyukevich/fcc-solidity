import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { ethers } from 'hardhat';
import { DEVELOPMENT_CHAINS } from '../helper-hardhat.config';

const BASE_FEE = ethers.utils.parseEther('0.25');
const GAS_PRICE_LINK = 1e9;

export default async ({ deployments, getNamedAccounts, network } : HardhatRuntimeEnvironment) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    if (DEVELOPMENT_CHAINS.includes(network.name)) {
        log('Local network detected! Deploying mocks...');

        await deploy('VRFCoordinatorV2Mock', {
            from: deployer,
            log: true,
            args: [BASE_FEE, GAS_PRICE_LINK],
        });

        log('Mock deplyoyed');
        log('----------------------------------------------------');
    }
}