import React, { useState } from "react";
import { useAccount, useChainId } from "wagmi";
import { withdraw } from "../../../utils/lpstaking";

const Withdraw = ({ userInfo }: { userInfo: string }) => {
  const chainId = useChainId();
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    try {
      if (!address) return;

      setLoading(true);
      await withdraw(address, chainId, userInfo);

      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reward-border">
      <div className="reward-text">
        <p>Total Deposit</p>
        <h5>
          {userInfo
            ? new Intl.NumberFormat("en-US", { maximumFractionDigits: 6 }).format(Number(userInfo))
            : 0}
        </h5>
      </div>
      <div className="btn">
        <button disabled={loading || Number(userInfo) === 0} onClick={() => handleWithdraw()}>
          {loading ? "Withdrawing.." : "Withdraw"}
        </button>
      </div>
    </div>
  );
};

export default Withdraw;
