import React from "react";
import "./TokenDetails.scss";

const TokenDetails: React.FC = () => {
  return (
    <div className="tokenDetails-wrapper">
      <h1>Token details</h1>
      <div className="token-details-container">
        <div className="token-name">
          <p>Token name</p>
          <p>Symbol</p>
          <p>Decimal</p>
          <p>Blockchain</p>
        </div>
        <div className="token-name">
          <h5>PATRICK</h5>
          <h5>PATRICK</h5>
          <h5>18</h5>
          <h5>ETH (ERC20)</h5>
        </div>
      </div>
    </div>
  );
};

export default TokenDetails;
