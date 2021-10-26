// import truffle contract artifact 
const SmartContract = artifacts.require('SmartContract');

contract('SmartContract', () => {
    // test that contract was properly deployed
    it('Contract was properly deployed', async () => {
        // grab contract instance
        const smartContract = await SmartContract.deployed();

        // check that contract address is not empty
        assert(smartContract.address != '')
    });

    /*
    // simple test template
	it('description of test', async () => {
		// wait for contract to be deployed
		const contractName = await ContractName.deployed();
		// create dummy data
		var data = 'data';
		// send dummy data to contract setter
		await contractName.send_data(data);
		// get dummy data from contract getter
		const result = await contractName.get_data();
		// check actual result matches expected result
		assert(result === data);
	});
    */
});