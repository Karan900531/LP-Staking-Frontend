import { tokenAddress } from "./address";
import { ethers, formatEther, formatUnits } from "ethers";

import ERC20Abi from "../utils/abis/ERC20ABI.json";
import { erc20ABI } from "wagmi";

const getSigner = async (address: string) => {
  const win = window as any;
  const provider = new ethers.BrowserProvider(win.ethereum);
  const signer = await provider.getSigner(address);
  return signer;
};

export const getUserBalance = async (address: string, chainId: number) => {
  const signer = await getSigner(address);
  const contract = new ethers.Contract(
    tokenAddress[chainId as keyof typeof tokenAddress],
    ERC20Abi,
    signer
  );

  const balance = await contract.balanceOf(address);
  return Number(formatEther(balance));
};

export const getTokenInfo = async (address: string, tokenAddress: string) => {
  const signer = await getSigner(address);

  const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, signer);

  const balance = await tokenContract.balanceOf(address);
  const symbol = await tokenContract.symbol();
  const decimals = await tokenContract.decimals();

  return {
    symbol,
    decimals: decimals.toString(),
    balance: Number(formatUnits(balance.toString(), decimals)),
    tokenAddress,
  };
};

export const getIsValidToken = async (address: string, tokenAddress: string) => {
  const signer = await getSigner(address);

  const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, signer);

  try {
    await tokenContract.totalSupply();
    return true;
  } catch (error) {
    return false;
  }
};
