import { ethers, run } from "hardhat";

async function main() {

  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  const transactionResponse = await simpleStorage.store(1);
  const transactionReceipt = await transactionResponse.wait();
  console.log(transactionReceipt);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
.then()
.catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
