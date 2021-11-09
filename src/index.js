import Web3 from 'web3';
import SmartContract from '../build/contracts/SmartContract.json';

let web3;
let smartContract;

// initialize web3
const initWeb3 = () => {
    return new Promise((resolve, reject) => {
        // https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents
        // new metamask version
        if (typeof window.ethereum !== 'undefined') {
            web3 = new Web3(window.ethereum);
            // new version has extra security
            window.ethereum.enable().then(() => {
                resolve(
                    new Web3(window.ethereum));
            }).catch(e => {
                reject(e)
            });
            return;
        }
        // https://www.trufflesuite.com/docs/truffle/getting-started/truffle-with-metamask#using-metamask-with-ganache-cli
        // old metamask version
        if (typeof window.web3 !== 'undefined') {
            return resolve(
                new Web3(window.web3.currentProvider));
        }
        // no metamask version (use ganache)
        resolve(new Web3('http://localhost:8545'));
    });
};

// initialize smart contract 
// https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html
const initContract = () => {
    const deploymentKey = Object.keys(SmartContract.networks)[0];

    return new web3.eth.Contract(
        SmartContract.abi,
        SmartContract.networks[deploymentKey].address);
};

const initApp = () => {
    const $setData = document.getElementById('setData');
    const $data = document.getElementById('data');
    let accounts = [];

    // get contract accounts
    // https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html#getaccounts
    web3.eth.getAccounts().then(_accounts => {
        accounts = _accounts;
    });
    
    const getData = () => {
        // call method inside smart contract
        // https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#methods-mymethod-call
        smartContract.methods.get_data().call().then(result => {
            $data.innerHTML = result;
        });
    };

    // metamask should have some user trigger to load
    $setData.addEventListener('submit', (e) => {
        e.preventDefault();  // stop form from submiting to browser
        const data = e.target.elements[0].value;
    
        // send data to blockchain
        // https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#methods-mymethod-send
        smartContract.methods
            .set_data(data).send({from: accounts[0]}).then(getData);
    });
};

// wait for document content to load
document.addEventListener('DOMContentLoaded', () => {

    initWeb3().then(_web3 => {
        // initialize web3 as return from function
        web3 = _web3;
        // initialize smart contract
        smartContract = initContract();
        // initialize application
        initApp();
    }).catch(e => console.log(e.message));
});