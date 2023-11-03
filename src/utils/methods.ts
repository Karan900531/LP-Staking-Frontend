import { stakingAddress, tokenAddress, RPC_URL } from "./address";
import { ethers, formatEther, MaxUint256, parseEther } from "ethers";

import StakingAbi from "../utils/abis/staking.json";
import ERC20Abi from "../utils/abis/ERC20ABI.json";

const getSigner = async (address: string) => {
  const win = window as any;
  const provider = new ethers.BrowserProvider(win.ethereum);
  const signer = await provider.getSigner(address);
  return signer;
};

export const stakeToken = async (address: string, chainId: number, amount: string) => {
  const signer = await getSigner(address);

  const tokenContract = new ethers.Contract(
    tokenAddress[chainId as keyof typeof tokenAddress],
    ERC20Abi,
    signer
  );

  // Approve the staking contract to spend tokens with delegate and numTokens parameters
  const approveTx = await tokenContract.approve(
    stakingAddress[chainId as keyof typeof stakingAddress],
    parseEther(amount)
  );
  await approveTx.wait();

  const contract = new ethers.Contract(
    stakingAddress[chainId as keyof typeof stakingAddress],
    StakingAbi,
    signer
  );

  // Stake the tokens
  const stakeTx = await contract.stake(parseEther(amount));
  await stakeTx.wait();
};

export const unStakeToken = async (address: any, chainId: number) => {
  const signer = await getSigner(address);
  const contract = new ethers.Contract(
    stakingAddress[chainId as keyof typeof stakingAddress],
    StakingAbi,
    signer
  );
  const stakeAmount = await contract.getStakedAmount(address);
  const tx = await contract.unstake(stakeAmount);
  await tx.wait();
};

export const claimRewards = async (address: string, chainId: number) => {
  const signer = await getSigner(address);
  const contract = new ethers.Contract(
    stakingAddress[chainId as keyof typeof stakingAddress],
    StakingAbi,
    signer
  );

  const tx = await contract.claimRewards();
  await tx.wait();
};

export const getTokenHolders = async (chainId: number) => {
  const provider = new ethers.JsonRpcProvider(RPC_URL[chainId as keyof typeof RPC_URL]);
  const contract = new ethers.Contract(
    stakingAddress[chainId as keyof typeof stakingAddress],
    StakingAbi,
    provider
  );

  const totalusers = await contract.getTotalUsers();

  return Number(totalusers.toString());
};

export const getTokenStaked = async (chainId: number) => {
  const provider = new ethers.JsonRpcProvider(RPC_URL[chainId as keyof typeof RPC_URL]);
  const contract = new ethers.Contract(
    stakingAddress[chainId as keyof typeof stakingAddress],
    StakingAbi,
    provider
  );

  const totalStaked = await contract.getTotalStaked();
  return Number(formatEther(totalStaked));
};

export const getApy = async (chainId: number) => {
  const provider = new ethers.JsonRpcProvider(RPC_URL[chainId as keyof typeof RPC_URL]);
  const contract = new ethers.Contract(
    stakingAddress[chainId as keyof typeof stakingAddress],
    StakingAbi,
    provider
  );

  const apy = await contract.getAPY();
  return Number(apy.toString());
};

export const getUserReward = async (address: string, chainId: number) => {
  const signer = await getSigner(address);
  const contract = new ethers.Contract(
    stakingAddress[chainId as keyof typeof stakingAddress],
    StakingAbi,
    signer
  );

  const reward = await contract.getReward(address);
  return Number(formatEther(reward));
};

export const getStakedAmount = async (address: string, chainId: number) => {
  const signer = await getSigner(address);
  const contract = new ethers.Contract(
    stakingAddress[chainId as keyof typeof stakingAddress],
    StakingAbi,
    signer
  );
  const stakeAmount = await contract.getStakedAmount(address);
  return Number(formatEther(stakeAmount));
};

export const getTimeLeftToClaim = async (address: string, chainId: number) => {
  const signer = await getSigner(address);
  const contract = new ethers.Contract(
    stakingAddress[chainId as keyof typeof stakingAddress],
    StakingAbi,
    signer
  );

  const userStakingInfo = await contract.users(address);
  const lastClaimTimestamp = userStakingInfo.lastClaimTimestamp;
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  const timePassedSinceLastClaim = BigInt(currentTime) - BigInt(lastClaimTimestamp);

  const rewardCycleDays = await contract.getRewardCycleDays();
  const ONE_DAY_IN_SECONDS = BigInt(86400);

  if (timePassedSinceLastClaim >= rewardCycleDays * ONE_DAY_IN_SECONDS) {
    return BigInt(0); // User can claim rewards now
  }

  const timeLeftInSeconds = rewardCycleDays * ONE_DAY_IN_SECONDS - timePassedSinceLastClaim;
  return timeLeftInSeconds.toString();
};
