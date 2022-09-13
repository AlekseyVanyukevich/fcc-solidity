export const VERIFICATION_CONFIRMATION : { [key: string]: number } = {
    hardhat: 1,
    rinkeby: 6
}


export const NETWORK_CONFIG = {
    4: {
        name: 'rinkeby',
        vrfCoordinatorV2: '0x6168499c0cFfCaCD319c818142124B7A15E857ab'
    }
}

export const DEVELOPMENT_CHAINS = ['hardhat', 'localhost'];