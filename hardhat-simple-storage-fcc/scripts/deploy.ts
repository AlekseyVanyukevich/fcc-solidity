import * as hre from 'hardhat';

async function main() {
  const SimpleStorageFactory = await hre.ethers.getContractFactory('SimpleStorage');

  console.log('Deploying contract...');
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Contract address ${simpleStorage.address}`);

  if (hre.network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }
  
  const currentValue = await simpleStorage.retrieve();
  console.log(`Current Value is: ${currentValue}`);

  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated value is: ${updatedValue}`);
}

const verify = async (contractAddress: string, args: any[]) => {
  console.log('Verifying contract...');
  try {
    await hre.run('verify:verify', {
      address: contractAddress,
      constructorArguments: args
    });
  } catch (e: any) {
    if (e.message.toLowerCase().includes('already verified')) {
      console.log('Already Verified!');
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
