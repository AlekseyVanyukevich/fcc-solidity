import { HardhatRuntimeEnvironment } from "hardhat/types"
import { developmentChains, networkConfig, blockConfirmations } from '../helper-hardhat-config';
import { verify } from "../utils/verify";

const deployFundMe = async ({ deployments, getNamedAccounts, network }: HardhatRuntimeEnvironment) => {
    const { deploy, log, get } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;

    let ethUSDPriceFeed; 
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await get('MockV3Aggregator');
        ethUSDPriceFeed = ethUsdAggregator.address;
    } else {
        ethUSDPriceFeed = networkConfig[chainId + ''].ethUSDPriceFeed;
    }
    const args = [ethUSDPriceFeed];
    const fundMe = await deploy('FundMe', {
        from: deployer,
        args,
        log: true,
        waitConfirmations: blockConfirmations[network.name] || 1
    });

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(fundMe.address, args);
    }
    log('---------------------------------------');
}

export default deployFundMe;
deployFundMe.tags = ['all', 'fundMe'];