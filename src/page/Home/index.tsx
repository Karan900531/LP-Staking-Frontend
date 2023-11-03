import React, { useCallback, useEffect, useState } from "react";
import etherLogo from "../../assets/icons/ether.png";
import bscLogo from "../../assets/icons/bsc.png";
import nexusLogo from "../../assets/images/sidebarLogo.png";
import "./Home.scss";
// import backgroundImage from '../../assets/images/bg.png';

import styled from "styled-components";
import { useWeb3Modal } from "@web3modal/react";
// import PairsList from "../../components/PairsList";
// import Dropdown from "../../components/Dropdown";
import {
  claimRewards,
  getApy,
  getTimeLeftToClaim,
  getStakedAmount,
  getTokenHolders,
  getTokenStaked,
  getUserReward,
  stakeToken,
  unStakeToken,
} from "../../utils/methods";
import { useAccount, useChainId } from "wagmi";
import { getUserBalance } from "../../utils/tokenContract";

const Home: React.FC = () => {
  const { open } = useWeb3Modal();
  const { address } = useAccount();
  const chain = useChainId();
  const [status, setStatus] = useState<{
    status: "PENDING" | "ERROR" | "SUCCESS";
    message: string;
  } | null>(null);
  const [amount, setAmount] = useState("");
  const [stakedAmount, setStakedAmount] = useState(0);
  const [rewardAmount, setRewardAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [totalStaked, setTotalStaked] = useState(0);
  const [apy, setApy] = useState(0);
  const [totalTokenHolders, setTotalTokenHolders] = useState(0);
  const [rewardLeft, setRewardLeft] = useState(0);

  const [selectedList, setSelectedList] = useState<{
    label: string;
    leftIcon?: string;
  } | null>({
    label: "BNB",
    leftIcon: bscLogo,
  });

  const [isBelowMinStake, setIsBelowMinStake] = useState(false);

  const [selectedwNexus, setSelectedwNexus] = useState<{
    label: string;
    leftIcon?: string;
  } | null>({
    label: "PATRIK",
    leftIcon: nexusLogo,
  });

  const [selectedFromList, setSelectedFromList] = useState<{
    label: string;
    leftIcon?: string;
  } | null>({
    label: "ETH",
    leftIcon: etherLogo,
  });

  const handleGetData = useCallback(async () => {
    try {
      if (!address || !chain) return;
      setBalance(await getUserBalance(address, chain));
      setStakedAmount(await getStakedAmount(address, chain));
      const rewardTimeLeft = await getTimeLeftToClaim(address, chain);
      setRewardLeft(Number(rewardTimeLeft.toString()));

      setRewardAmount(await getUserReward(address, chain));
    } catch (error) {
      console.log(error);
    }
  }, [address, chain]);

  const handleGetContractData = useCallback(async () => {
    try {
      setTotalTokenHolders(await getTokenHolders(chain));
      setTotalStaked(await getTokenStaked(chain));
      setApy(await getApy(chain));
    } catch (error) {
      console.log(error);
    }
  }, [chain]);

  useEffect(() => {
    handleGetData();
    handleGetContractData();
  }, [handleGetData, handleGetContractData]);

  const MainDiv = styled.div`
    width: 100%;
    height: auto;

    padding-top: 0px;
    display: flex;
    padding-bottom: 30px;
    justify-content: center;
    align-items: center;
  `;

  const Explore = styled.div`
    width: 100%;
    height: auto;
    padding-top: 0;
    padding-bottom: 50px;
    display: flex;
    align-items: center;
    justify-content: center;

    h2 {
      font-weight: 500;
      text-align: center;
      font-size: 26px;
    }

    .divisions {
      width: 70%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 30px;

      .stakeblock {
        background-size: cover;
        background-repeat: no-repeat;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0px 0px 7px 0px rgba(189, 159, 58, 0.6);

        p {
          font-size: 14px;
        }

        .web3-btn {
          display: flex;
          justify-content: center;
          button {
            background-color: #bd9f3a;
            color: #fff;
            border: 1px solid #fff;
            outline: none;
            font-family: var(--font-medium);
            border-radius: 7px;
            padding: 12px 14px;
            width: 100%;
            margin: 30px 0;
            cursor: pointer;
          }
        }

        h2 {
          text-align: left;
          font-size: 25px;
          margin-top: 20px;
          font-weight: 500;
        }
      }
    }

    @media (max-width: 767px) {
      .divisions {
        width: 98%;

        grid-template-columns: 1fr;
        row-gap: 30px;
      }
    }
  `;

  const InnerDiv = styled.div`
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: auto;
    padding: 30px 0;
    border-radius: 10px;
    box-shadow: 0px 0px 7px 0px rgba(189, 159, 58, 0.6);

    h2 {
      font-weight: 500;
      text-align: center;
      font-size: 22px;
    }
    h3 {
      font-weight: 400;
      font-size: 20px;
      text-align: center;
    }
    hr {
      color: var(--over-all-bg-clr);
      margin: 20px 0;
    }

    .divtwo {
      display: grid;
      grid-template-columns: 40% 15% 40%;
      column-gap: 10px;
      padding: 0 20px 0 20px;
    }

    .divthree {
      display: grid;
      width: 100%;
      grid-template-columns: 1fr;
      column-gap: 10px;
      padding: 0 20px 0 20px;
    }

    .divthreemain {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .newblock {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .arrowtag {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: #3aa54d;
      box-shadow: 0px 0px 10px rgba(58, 165, 77, 0.6);
    }

    .searbarh {
      background: var(--drop-down-clr);
      border-radius: 8px;
      max-width: 100%;
      max-height: 50px;
      display: flex;
      margin-top: 10px;
      width: 100%;
      @media (max-width: 992px) {
      }

      input {
        outline: none;
        border: none;
        background: transparent;
        padding: 12px 12px;
        color: var(--white-clr);
        width: 100%;

        font-size: 14px;
        &::placeholder {
          color: var(--search-clr);
        }
        /* Styles for the .searbar when input inside it is in focus */
      }
    }

    .web3-btn {
      display: flex;
      justify-content: center;
      button {
        background-color: #bd9f3a;
        color: #fff;
        border: 1px solid #fff;
        outline: none;
        font-family: var(--font-medium);
        border-radius: 7px;
        padding: 12px 14px;
        width: 100%;
        margin: 30px 0;
        cursor: pointer;
      }
    }

    @media (max-width: 767px) {
      width: 100%;

      .divthree {
        display: grid;
        width: 100%;
        grid-template-columns: 1fr;
        column-gap: 10px;
        padding: 0 20px 0 20px;
      }

      .web3-btn {
        display: flex;
        justify-content: center;
        button {
          background-color: #bd9f3a;
          color: #fff;
          border: 1px solid #fff;
          outline: none;
          font-family: var(--font-medium);
          border-radius: 7px;
          padding: 12px 14px;
          width: 100%;
          margin: 30px 0;
          cursor: pointer;
        }
      }
    }
  `;

  const rewardLeftInSeconds = Number(rewardLeft);
  const secondsInADay = 86400; // 60 seconds * 60 minutes * 24 hours

  const rewardLeftInDays = rewardLeftInSeconds / secondsInADay;

  const integerPart = Math.floor(rewardLeftInDays);

  const handleCloseModal = () => {
    setTimeout(() => setStatus(null), 5000);
    setTimeout(() => {
      handleGetData();
      handleGetContractData();
    }, 2000);
  };

  const handleStake = async () => {
    try {
      if (!address) return alert("connect wallet");

      if (isBelowMinStake) {
        return alert("Minimum Stake Amount is 80000000 PATRIK");
      }

      setStatus({ status: "PENDING", message: "Staking your amount..." });
      await stakeToken(address, chain, amount);
      setStatus({ status: "SUCCESS", message: "Staked successfully" });
    } catch (error) {
      console.log(error);
      setStatus({ status: "ERROR", message: "Transaction failed" });
    } finally {
      handleCloseModal();
    }
  };

  const handleUnstake = async () => {
    try {
      if (!address) return alert("connect wallet");
      setStatus({ status: "PENDING", message: "Unstaking your amount..." });
      await unStakeToken(address, chain);
      setStatus({ status: "SUCCESS", message: "Unstaked successfully" });
    } catch (error) {
      console.log(error);
      setStatus({ status: "ERROR", message: "Transaction failed" });
    } finally {
      handleCloseModal();
    }
  };

  const handleClaim = async () => {
    try {
      if (!address) return alert("connect wallet");

      setStatus({
        status: "PENDING",
        message: "Claiming your reward. please wait...",
      });
      await claimRewards(address, chain);
      setStatus({ status: "SUCCESS", message: "Claimed successfully" });
    } catch (error) {
      console.log(error);
      setStatus({ status: "ERROR", message: "Transaction failed" });
    } finally {
      handleCloseModal();
    }
  };

  return (
    <div className="pad">
      <div className="topdivchangedstyle">
        <div className="blockhead">
          <div className="newblock">
            <div className="blocktop">
              <p>Total PATRIK Staked</p>
              <h2>
                {new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 4,
                }).format(Number(totalStaked))}{" "}
                PATRIK
              </h2>
            </div>
            <div className="blocktop" style={{ marginTop: "20px" }}>
              <p>Total Participants</p>
              <h2>{totalTokenHolders}</h2>
            </div>
            <div className="newgridupdate">
          <div className="blocktop">
              <p>APY</p>
              <h2>{apy} %</h2>
            </div>
            <div className="blocktop">
              <p>Min. Lock Period</p>
              <h2>14 DAYS</h2>
            </div>
          </div>
          </div>
         
          <div className="innerstakecontainers">
            <div className="divthreemains">
              <div className="divthreemain">
                <div className="divthree">
                  <h2
                    style={{
                      textAlign: "center",
                      color: "#e7bd33",
                      fontWeight: "500",
                      fontSize: "25px",
                    }}
                  >
                    Stake PATRIK BATEMAN
                  </h2>
                  <hr style={{ borderColor: "#e7bd33", marginBottom: "50px" }} />
                  <div>
                    PATRIK Amount to Stake
                    <br />
                    <div className="searbarh">
                      <input
                        type="amount"
                        placeholder="0.00 PATRIK"
                        value={amount}
                        onChange={(e) => {
                          setAmount(e.target.value);
                          setIsBelowMinStake(Number(e.target.value) < 80000000);
                        }}
                      />
                      <div
                        className="searchBar-icons"
                        style={{
                          paddingTop: "7px",
                          paddingRight: "15px",
                          cursor: "pointer",
                        }}
                        onClick={() => setAmount(balance.toString())}
                      >
                        MAX
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="divthreemain">
                <div className="divthree">
                  <div className="web3-btn">
                    <button onClick={handleStake} disabled={isBelowMinStake}>
                      {isBelowMinStake ? "Min Stake Amt is 80000000 PATRIK" : "Stake"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MainDiv></MainDiv>

      <Explore>
        <div className="divisions">
          <div className="stakeblock">
            <h2
              style={{ textAlign: "center", color: "#e7bd33", fontWeight: "500", fontSize: "25px" }}
            >
              Your PATRIK Rewards
            </h2>
            <hr style={{ borderColor: "#e7bd33", marginTop: "20px", marginBottom: "50px" }} />{" "}
            <h2>
              {new Intl.NumberFormat("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 4,
              }).format(rewardAmount)}{" "}
              PATRIK
            </h2>
            <h2 style={{ fontSize: 16, fontWeight: 400 }}>
              Time Left for Reward Claim :&nbsp;
              <span style={{ fontWeight: 500 }}>
                {new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 4,
                }).format(Number(integerPart))}{" "}
                Days
              </span>
            </h2>
            <div className="web3-btn">
              <button onClick={handleClaim}>Claim Rewards</button>
            </div>
          </div>
          <div className="stakeblock">
            <h2
              style={{ textAlign: "center", color: "#e7bd33", fontWeight: "500", fontSize: "25px" }}
            >
              Your Staked PATRIK
            </h2>
            <hr style={{ borderColor: "#e7bd33", marginTop: "20px", marginBottom: "50px" }} />{" "}
            <h2>
              {new Intl.NumberFormat("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 4,
              }).format(Number(stakedAmount))}{" "}
              PATRIK
            </h2>
            <div className="web3-btn">
              <button onClick={handleUnstake}>Unstake</button>
            </div>
          </div>
        </div>
      </Explore>
      {status && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3 className={status.status.toLowerCase()}>{status.status}</h3>
            <p>{status.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
