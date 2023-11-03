import React, { useEffect, useState } from "react";
import { ReactComponent as Close } from "../../../assets/icons/close.svg";
import { ReactComponent as ExternalLink } from "../../../assets/icons/external-link.svg";
import "./StakeLpToken.scss";
import { useFormik } from "formik";
import { useAccount, useChainId } from "wagmi";

import { stakeLpToken } from "../../../utils/lpstaking";

interface IStacke {
  onClose: () => void;
  balance: number;
  userInfo: string;
}

const initialValues = { amount: "" };

const StakeLpToken: React.FC<IStacke> = ({ onClose, balance, userInfo }) => {
  const chainId = useChainId();
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => handleSubmit(values),
  });
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      // deposit?.({
      //   args: [0, parseEther(formik.values.amount.toString())],
      // });
      if (!address) return;

      setLoading(true);
      await stakeLpToken(address, chainId, formik.values.amount.toString());

      onClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stakelp-token-wrapper">
      <form onSubmit={formik.handleSubmit}>
        <div className="stakelp-token-head">
          <h1>Stake LP tokens</h1>
          <div style={{ cursor: "pointer" }} onClick={onClose}>
            <Close color="gray" width={18} height={18} />
          </div>
        </div>
        <div className="stakelp-flex-item">
          <p>Your staked</p>
          <h5>{userInfo} LP</h5>
        </div>
        <div className="stake-box">
          <div>
            <p>Stake</p>
            <h5>
              <input
                name="amount"
                type="number"
                placeholder="0.0"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </h5>
          </div>
          <div>
            <p className="mobdiffer">
              Balance {new Intl.NumberFormat("en-US", { maximumFractionDigits: 6 }).format(balance)}{" "}
              LP
            </p>
            <div
              className="max-btn mobdiffer"
              onClick={() => formik.setFieldValue("amount", balance.toString())}
            >
              <h6>Max</h6>
            </div>
          </div>
        </div>
        <div className="flex-content">
          <div>
            {/* <p>Total stake</p> */}
            <p>Staking period</p>
            {/* <p>Unstake / Harvest time</p> */}
          </div>
          <div>
            {/* <h5>{formik.values.amount} LP</h5> */}
            <h5>14 days</h5>
            {/* <h5>Nov 6, 2023 10:08 PM</h5> */}
          </div>
        </div>
        <div className="flex-btn">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button disabled={loading} type="submit">
            {loading ? "Deposting..." : "Confirm"}
          </button>
        </div>
      </form>
      <div className="get-PATRICK-text">
        <p>Get PATRICK - ETH LP</p>
        <ExternalLink color="#bd9f3a" width={16} height={16} />
      </div>
    </div>
  );
};

export default StakeLpToken;
