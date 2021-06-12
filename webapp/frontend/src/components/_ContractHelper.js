import axios from 'axios';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';

const InitWeb3 = async () => {
    let MainProvider = {};
	
	//using Ganache
    MainProvider.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    window.web3 = new Web3(MainProvider.web3Provider);

    return MainProvider;
};

const GetContract = async (MainProvider, name) => {

    let artifact = await axios.get(`http://localhost:3300/${name}`);

    let contract = TruffleContract(artifact.data);
    contract.setProvider(MainProvider.web3Provider)

    return contract
}

const ContractHelper = {
    init: async () => {

        let MainProvider = await InitWeb3();

        return {
            BiddingToken: await GetContract(MainProvider, 'bidding'),
            OwnershipToken: await GetContract(MainProvider, 'ownership'),
            Marketplace: await GetContract(MainProvider, 'marketplace')
        }
    },
    getAccounts: async () => {
        return await window.web3.eth.getAccounts();
    }
}


export default ContractHelper;