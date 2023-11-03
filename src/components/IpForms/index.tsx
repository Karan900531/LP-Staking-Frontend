import React from "react";
import EthForm from "./EthForm";
import MoreInformation from "./MoreInformation";

const IpForm: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: "24px",
        justifyContent: "center",
        flexWrap: "wrap",
        marginTop: "52px",
      }}
    >
      <div>
        <EthForm />
        <MoreInformation />
      </div>
      {/* <div>
        <TokenDetails />
        <Tokenomics />
      </div> */}
    </div>
  );
};

export default IpForm;
