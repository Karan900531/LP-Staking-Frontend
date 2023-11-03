import React, { useState } from "react";
import PairsHeader from "./PairsHeader";
import PairsTable from "./PairsTable";
import "./PairsList.scss";

const PairsList: React.FC = () => {
  const [selectedInterval, setSelectedInterval] = useState("24h");
  const [selectedType, setSelectedType] = useState("pairs");

  return (
    <div>
      <PairsHeader
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedInterval={selectedInterval}
        setSelectedInterval={setSelectedInterval}
      />
      {
        {
          pairs: <PairsTable />,
          gainers: <PairsTable />,
          losers: <PairsTable />,
          updated: <PairsTable />,
        }[selectedType]
      }
    </div>
  );
};

export default PairsList;
