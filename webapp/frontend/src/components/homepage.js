import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import Carousal from './carousal';
import ContractHelper from './_ContractHelper';

const showSomething = async () => {
  const contracts = await ContractHelper.init();
  console.log(await ContractHelper.getAccounts());
  
  const biddingToken = await contracts.BiddingToken.deployed();
  console.log(biddingToken.address);
}

showSomething();


function Homepage() {
  const bg_sm = { backgroundColor: "lightgrey", opacity: '0.8' };

  return (
    <>
      <Container fluid style={bg_sm}>
        <Row>
          <Container>
            <Carousal />
          </Container>
        </Row>
      </Container>
    </>
  );
}


export default Homepage;