import React, { useCallback, useEffect, useState } from "react";
import EthIcon from "../../../assets/icons/eth.png";
import "./EthForm.scss";
import LayoutModule from "../../Modal";
import StakeLpToken from "../StakeLpToken";
import { useWeb3Modal } from "@web3modal/react";
import { erc20ABI, useAccount, useChainId, useNetwork, useSwitchNetwork } from "wagmi";
import Withdraw from "./Withdraw";
import { getBalance, getUserInfo } from "../../../utils/lpstaking";

const EthForm: React.FC = () => {
  const [active, setIsActive] = useState(false);
  const [userInfo, setUserInfo] = useState("0");
  const [balance, setBalance] = useState(0);
  const chainId = useChainId();
  const { switchNetwork } = useSwitchNetwork();
  const { chain } = useNetwork();
  const { open } = useWeb3Modal();
  const { address } = useAccount();

  const handleGetData = useCallback(async () => {
    if (!address) return;

    try {
      setUserInfo(await getUserInfo(address, chainId));
      setBalance(await getBalance(address, chainId));
    } catch (error) {
      console.log(error);
    }
  }, [address, chainId]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  const handleOpenToggle = () => {
    setIsActive(true);
  };

  const handleCloseToggle = () => {
    setIsActive(false);
  };

  return (
    <div className="eth-form-wrapper">
      <div className="eth-heading">
        <img src={EthIcon} width={100} height={58}></img>
        <h1>ETH / PATRICK</h1>
      </div>
      <div className="flex-content">
        <div>
          <p>Reward Per Block</p>
          {/* <p>Total Liquidity@</p> */}
          <p>Staking period</p>
        </div>
        <div>
          <h5>1 PATRICK</h5>
          {/* <h5>$83.9783</h5> */}
          <h5>14 days</h5>
        </div>
      </div>
      <Withdraw userInfo={userInfo} />
      <div className="eth-lp-text">
        <p>PATRICK - ETH LP Staked</p>
        <h5>0</h5>
      </div>
      <div className="switch-btn">
        {!address ? (
          <button onClick={open}>Connect wallet</button>
        ) : chain?.unsupported ? (
          <button onClick={() => switchNetwork && switchNetwork(chainId)}>
            Switch to Ethereum
          </button>
        ) : (
          <button onClick={handleOpenToggle}>Deposit</button>
        )}
      </div>
      {active && (
        <LayoutModule handleToggle={handleOpenToggle} className="layout-module">
          <StakeLpToken onClose={handleCloseToggle} balance={balance} userInfo={userInfo} />
        </LayoutModule>
      )}
    </div>
  );
};

export default EthForm;
