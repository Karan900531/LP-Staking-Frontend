import { configureChains, createConfig } from "wagmi";
import { w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { bscTestnet, mainnet, bsc } from "wagmi/chains";

export const chains = [mainnet, bsc, bscTestnet];
export const projectId = "4af4492230df1c074def2de12bdbbb0a";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
