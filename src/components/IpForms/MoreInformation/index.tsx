import React from "react";
import { ReactComponent as ExternalLink } from "../../../assets/icons/external-link.svg";
import "./MoreInformation.scss";

const MoreInformation: React.FC = () => {
  return (
    <div className="more-information-wrapper">
      <h1>More information</h1>
      <div className="more-information-content">
        <div className="more-information-texts">
          <a href="https://app.uniswap.org/swap" className="flex-item">
            <p>Uniswap</p>
            <ExternalLink />
          </a>
          <a href="/" className="flex-item">
            <p>Get PATRICK</p>
            <ExternalLink />
          </a>
        </div>
        <div className="more-information-texts">
          <a
            href="https://etherscan.io/address/0x82bf4533eeb922f463158a090cbfa81770a7cd14#code"
            className="flex-item"
          >
            <p>View Contact</p>
            <ExternalLink />
          </a>
          {/* <a href="/" className="flex-item">
            <p>Dextools</p>
            <ExternalLink />
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default MoreInformation;
