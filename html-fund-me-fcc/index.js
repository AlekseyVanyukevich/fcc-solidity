import { abi, contractAddress } from './constants.js';

const connectButton = document.getElementById('connectButton');
const fundButton = document.getElementById('fundButton');
const fundInput = document.getElementById('fund');
const balanceButton = document.getElementById('balanceButton');
const withdrawButton = document.getElementById('withdrawButton');

const connect = async () => {
    if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        connectButton.innerHTML = 'Connected';
    } else {
        connectButton.innerHTML = 'Please install MetaMask';

    }
}

const fund = async () => {
    if (!window.ethereum) {
        return;
    }
    const ethAmount = fundInput.value;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
        const transactionResponse = await contract.fund({ value: ethers.utils.parseEther(ethAmount) });
        await listedForTxMine(transactionResponse, provider);
    } catch (e) {
        console.log('Error');
    }
}

const withdraw = async () => {
    if (!window.ethereum) {
        return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
        const transactionResponse = await contract.withdraw();
        await listedForTxMine(transactionResponse, provider);
    }  catch (e) {
        console.log('Error');
    }
}

const getBalance = async () => {
    if (!window.ethereum) {
        return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(contractAddress);
    console.log(ethers.utils.formatEther(balance));
}

const listedForTxMine = (transactionResponse, provider) => {
    console.log(`Mining ${transactionResponse.hash}`);

    return new Promise((res) => {
        provider.once(transactionResponse.hash, (transactionReceipt) => {
            console.log(`Completed with ${transactionReceipt.confirmations} confirmations`);
            res();
        });
    });
}

connectButton.addEventListener('click', connect);
fundButton.addEventListener('click', fund);
balanceButton.addEventListener('click', getBalance);
withdrawButton.addEventListener('click', withdraw);

// main()
//     .then(() => {

//     });

