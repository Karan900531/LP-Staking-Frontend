import { ethers, formatEther, parseEther } from "ethers";

import ERC20_abi from "./abis/ERC20Token.json";
import LPStaking_abi from "./abis/LPStakingABI.json";
import { LP_STAKING_ADDRESS, LP_TOKEN_ADDRESS } from "./address";

async function getERC20Contract(contractAddress: string, address: string) {
  const win = window as any;
  const provider = new ethers.BrowserProvider(win.ethereum);
  const signer = await provider.getSigner(address);

  return new ethers.Contract(contractAddress, ERC20_abi, signer);
}

async function getLpContract(address: string, chainId: number) {
  const win = window as any;
  const provider = new ethers.BrowserProvider(win.ethereum);
  const signer = await provider.getSigner(address);

  return new ethers.Contract(
    LP_STAKING_ADDRESS[chainId as keyof typeof LP_STAKING_ADDRESS],
    LPStaking_abi,
    signer
  );
}

export const setApprove = async (address: string, chainId: number, approveAmount: string) => {
  const token0ERC20 = await getERC20Contract(
    LP_TOKEN_ADDRESS[chainId as keyof typeof LP_TOKEN_ADDRESS] as any,
    address
  );

  const approveTx = await token0ERC20.approve(
    LP_STAKING_ADDRESS[chainId as keyof typeof LP_STAKING_ADDRESS],
    parseEther(approveAmount)
  );
  await approveTx.wait();
};

export const getAllowance = async (address: string, chainId: number) => {
  const token0ERC20 = await getERC20Contract(
    LP_TOKEN_ADDRESS[chainId as keyof typeof LP_TOKEN_ADDRESS] as any,
    address
  );

  const allowance = await token0ERC20.allowance(
    address,
    LP_STAKING_ADDRESS[chainId as keyof typeof LP_STAKING_ADDRESS]
  );

  return Number(formatEther(allowance));
};

export const getBalance = async (address: string, chainId: number) => {
  const token0ERC20 = await getERC20Contract(
    LP_TOKEN_ADDRESS[chainId as keyof typeof LP_TOKEN_ADDRESS] as any,
    address
  );

  const balance = await token0ERC20.balanceOf(address);

  return Number(formatEther(balance));
};

export const stakeLpToken = async (address: string, chainId: number, amount: string) => {
  const allowance = await getAllowance(address, chainId);

  if (allowance < Number(amount)) {
    await setApprove(address, chainId, amount);
  }

  const lpContract = await getLpContract(address, chainId);

  const tx = await lpContract.deposit(0, parseEther(amount));
  await tx.wait();
};

export const getUserInfo = async (address: string, chainId: number) => {
  const lpContract = await getLpContract(address, chainId);

  const data = await lpContract.userInfo(0, address);

  return formatEther(data[0]);
};

export const withdraw = async (address: string, chainId: number, amount: string) => {
  const lpContract = await getLpContract(address, chainId);
  console.log(lpContract);
  console.log(amount);
  const tx = await lpContract.withdraw(0, parseEther(amount));

  await tx.wait();
};
