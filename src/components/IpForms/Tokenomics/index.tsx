import React from "react";
import "./Tokenomics.scss";

const Tokenomics: React.FC = () => {
  return (
    <div className="tokenomics-wrapper">
      <h1>Tokenomics</h1>
      <div className="quadrillion-supply">
        <h5>1. Quadrillion supply</h5>
        <h5>(1, 000, 000, 000, 000, 000)</h5>
      </div>
      <div className="line">
        <p>10% LP POOL</p>
        <p>20% FOR IDO at MOMOv2 lanuchpad</p>
        <p>20% for farming rewards</p>
        <p>10% Team</p>
        <p>10% development</p>
        <p>10% Marketing</p>
        <p>10% Exchange listing</p>
        <p>10% Reserve</p>
      </div>
    </div>
  );
};

export default Tokenomics;
