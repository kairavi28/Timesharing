import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import Home from './components/homepage';
import Sample from './components/sample';
import Bidding from './components/bidding';
import Marketplace from "./components/marketplace";
import BaseNav from "./components/nav";
import ContractHelper from './components/_ContractHelper';
import houseOne from "./assets/house-1.jpeg"
import houseTwo from "./assets/house-2.jpeg"
import houseThree from "./assets/house-3.jpeg"
import houseFour from "./assets/house-4.jpeg"
import { useEffect, useState } from 'react';

const appHistory = createBrowserHistory();

const mockDataBidding = [];

const mockDataProject = [
  { pid: 1, pName: 'The Exquisite Beach House in Vancouver', avail: true, totalSupply: 1000, pImg: houseOne },
  { pid: 2, pName: 'The Royal Villa in Florida', avail: true, totalSupply: 2500, pImg: houseTwo },
  { pid: 3, pName: 'The Palm Residency in California', avail: true, totalSupply: 7300, pImg: houseThree },
  { pid: 4, pName: 'Beautiful Luxurious Bunglow in Alberta', avail: true, totalSupply: 6120, pImg: houseFour }
];

const fillMockData = async (accounts) => {

  for (let item of mockDataProject) {
    //inserting mock data into BLC
    await marketplace.createNewPorject(
      item.pName,
      item.totalSupply
      , {
        from: accounts[0]
      });
  }

}

let marketplace = undefined;

function App() {

  const [loading, setLoading] = useState(true);
  useEffect(() => {

    const initContracts = async () => {
      const contracts = await ContractHelper.init();
      marketplace = await contracts.Marketplace.deployed();
      const accounts = await ContractHelper.getAccounts();

      try {
        //do not init if theres something available
        const total = await marketplace.totalProjects();
        const length = window.web3.utils.BN(total).toNumber();
        if (!length) fillMockData(accounts);

        for (let i = 0; i < length; i++) {
          const info = await marketplace.projectInfo(i);
          if (mockDataProject[i]) {
            mockDataProject[i].totalSupply = window.web3.utils.BN(info.totalSupply).toNumber();
          }
          else {
            mockDataProject.push(
              {
                pid: i + 1,
                pName: info.projectName,
                totalSupply: window.web3.utils.BN(info.totalSupply).toNumber(),
                avail: true,
                pImg: houseThree
              })
          }
        }

      }
      catch (e) {
        fillMockData(accounts);
      }

      setLoading(false);
    }

    if (!(marketplace && marketplace.address)) {
      initContracts();
    }
    else setLoading(false);
  }, []);

  return (
    <>
      <BaseNav />
      {loading ? 'Loading....' :
        <BrowserRouter history={appHistory}>
          <Switch>

            <Route exact path='/' component={Home} />
            <Route exact path='/sample' component={Sample} />
            <Route exact path='/bidding' component={() => <Bidding mockData={mockDataBidding} marketplace={marketplace} />} />
            <Route exact path='/marketplace' component={() => <Marketplace mockData={mockDataProject} marketplace={marketplace} />} />

          </Switch>
        </BrowserRouter>
      }
    </>
  );
}


export default App;
