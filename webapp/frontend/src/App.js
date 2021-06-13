import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/homepage';
import Sample from './components/sample';
import Bidding from './components/bidding';
import ProjManagement from "./components/projectManagement";
import Marketplace from "./components/marketplace";
import BaseNav from "./components/nav";
import ContractHelper from './components/_ContractHelper';
import houseOne from "./assets/house-1.jpeg"
import houseTwo from "./assets/house-2.jpeg"
import houseThree from "./assets/house-3.jpeg"
import houseFour from "./assets/house-4.jpeg"
import { useEffect, useState } from 'react';

const mockDataBidding = [
  { pid: 1, pName: 'Beach House Bidding Option', maxBid: 3400, pImg: houseOne },
  { pid: 2, pName: 'Royal Villa Bidding Option', maxBid: 2800, pImg: houseTwo },
  { pid: 3, pName: 'Residency Bidding Option', maxBid: 5200, pImg: houseThree },
  { pid: 4, pName: 'Luxurious Bunglow Bidding Option', maxBid: 2000, pImg: houseFour }
];

const mockDataProject = [
  { pid: 1, pName: 'The Exquisite Beach House in Vancouver', avail: true, totalSupply: 1000, pImg: houseOne },
  { pid: 2, pName: 'The Royal Villa in Florida', avail: true, totalSupply: 2500, pImg: houseTwo },
  { pid: 3, pName: 'The Palm Residency in California', avail: true, totalSupply: 7300, pImg: houseThree },
  { pid: 4, pName: 'Beautiful Luxurious Bunglow in Alberta', avail: true, totalSupply: 6120, pImg: houseFour }
];

let accounts, marketplace;

function App() {

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const initContracts = async () => {
      const contracts = await ContractHelper.init();
      marketplace = await contracts.Marketplace.deployed();
      accounts = await ContractHelper.getAccounts();
      setLoading(false);
    }

    initContracts();
  })

  return (
    <>
      <BaseNav />
      {loading ? 'Loading....' :
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/sample' component={Sample} />
            <Route exact path='/bidding' component={() => <Bidding mockData={mockDataBidding} marketplace={marketplace} accounts={accounts} />} />
            <Route exact path='/project_management' component={() => <ProjManagement />} />
            <Route exact path='/marketplace' component={() => <Marketplace mockData={mockDataProject} marketplace={marketplace} accounts={accounts} />} />

            {/* <Route  exact path='/2' component={Page2}/>
        <Route  exact path='/3' component={Page3}/> */}
          </Switch>
        </BrowserRouter>
      }
    </>
  );
}


export default App;
