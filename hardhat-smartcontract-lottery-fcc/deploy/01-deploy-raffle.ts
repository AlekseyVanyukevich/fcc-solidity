import { HardhatRuntimeEnvironment } from "hardhat/types";
import { VERIFICATION_CONFIRMATION, DEVELOPMENT_CHAINS } from '../helper-hardhat.config';

export default async ({ network, deployments, getNamedAccounts, ethers }: HardhatRuntimeEnvironment) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    let vrfCoordinatorV2Address;

    if (DEVELOPMENT_CHAINS.includes(network.name)) {
        const vrfCoordinatorV2Mock = await ethers.getContract('VRFCoordinatorV2Mock');

        vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address;
    }

    const raffle = await deploy('Raffle', {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: VERIFICATION_CONFIRMATION[network.name] || 1
    });
}