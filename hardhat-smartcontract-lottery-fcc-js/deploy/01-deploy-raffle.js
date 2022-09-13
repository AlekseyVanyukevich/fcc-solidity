const { ethers } = require("hardhat");
const { networkConfig, developmentChains } = require("../helper-hardhat.config");
const { verify } = require('../utils/verify');

const VRF_SUB_FUND_AMOUNT = ethers.utils.parseEther("2");
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = async ({ getNamedAccounts, deployments, network }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;

    let vrfCoordinatorV2Mock;
    let vrfCoordinatorV2Address;
    let subscriptionId;
    if (developmentChains.includes(network.name)) {
        vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock");
        vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address;

        const transactionResponse = await vrfCoordinatorV2Mock.createSubscription();
        const transactionReceipt = await transactionResponse.wait();
        subscriptionId = transactionReceipt.events[0].args.subId;
        await vrfCoordinatorV2Mock.fundSubscription(subscriptionId, VRF_SUB_FUND_AMOUNT);
    } else {
        vrfCoordinatorV2Address = networkConfig[chainId].vrfCoordinatorV2;
        subscriptionId = networkConfig[chainId].subscriptionId;
    }
    const { entranceFee, gasLane, callbackGasLimit, interval } = networkConfig[chainId];

    const args = [vrfCoordinatorV2Address, entranceFee, gasLane, subscriptionId, callbackGasLimit, interval]

    const raffle = await deploy("Raffle", {
        from: deployer,
        args,
        log: true,
        waitConfirmation: networkConfig[chainId].blockConfirmations || 1
    });

    if (developmentChains.includes(network.name)) {
        await vrfCoordinatorV2Mock.addConsumer(subscriptionId, raffle.address);
        log('Consumer is added');
    }

    if (!developmentChains.includes(network.name) && ETHERSCAN_API_KEY) {
        log("Veryfing...");
        await verify(raffle.address, args);
    }
}

module.exports.tags = ["all", "raffle"];