import * as hre from 'hardhat';
import { assert, expect } from 'chai';
import { SimpleStorage, SimpleStorage__factory } from '../typechain-types';

describe('SimpleStorage', () => {

    let simpleStorageFactory: SimpleStorage__factory;
    let simpleStorage: SimpleStorage;

    beforeEach(async () => {
        simpleStorageFactory = (await hre.ethers.getContractFactory('SimpleStorage')) as SimpleStorage__factory;
        simpleStorage = await simpleStorageFactory.deploy();
    });

    it('Should start with a favorite number 0', async () => {
        const currentValue = await simpleStorage.retrieve();
        const expectedValue = '0';

        assert.equal(currentValue.toString(), expectedValue);
        // expect(currentValue.toString()).to.equal(expectedValue);
    });

    it('Should update when we call store', async () => {
        const expectedValue = '7';
        const transactionResponse = await simpleStorage.store(expectedValue);
        await transactionResponse.wait(1);
        const currentValue = await simpleStorage.retrieve();
        assert.equal(currentValue.toString(), expectedValue);
    });

    it('Should save person', async () => {
        const name = 'Test';
        const favoriteNumber = '5';
        const transactionResponse = await simpleStorage.addPerson(name, favoriteNumber);
        await transactionResponse.wait(1);
        const savedPerson = await simpleStorage.people(0);
        assert.equal(savedPerson.name, name);
        assert.equal(savedPerson.favoriteNumber.toString(), favoriteNumber);
    });

    it('Should map person with his favorite number', async () => {
        const name = 'Test';
        const favoriteNumber = '5';
        const transactionResponse = await simpleStorage.addPerson(name, favoriteNumber);
        await transactionResponse.wait(1);
        const personFavoriteNumber = await simpleStorage.nameToFavoriteNumber(name);
        assert.equal(personFavoriteNumber.toString(), favoriteNumber);
    });
});