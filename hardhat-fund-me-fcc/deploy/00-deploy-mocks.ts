import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains, DECIMALS, INITIAL_ANSWER } from "../helper-hardhat-config";

const deployMocks =  async ({ network, deployments, getNamedAccounts }: HardhatRuntimeEnvironment) => {
    const { deploy, log } = deployments;
    const  { deployer } = await getNamedAccounts();

    if (developmentChains.includes(network.name)) {
        log('Local netowrk detected! Deploying network');
        await deploy('MockV3Aggregator', {
            contract: 'MockV3Aggregator',
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER]
        });
        log('Mocks deployed');
        log('------------------------------------------------');
    }
}

export default deployMocks;
deployMocks.tags = ['all', 'mocks']; 