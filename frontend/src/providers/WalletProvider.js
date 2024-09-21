import React from "react";
import { createConfig, WagmiProvider } from "wagmi";
import { mainnet, sepolia } from "viem/chains";
import { http } from "viem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

const config = createConfig({
  multiInjectedProviderDiscovery: false,
  chains: [sepolia, mainnet],
  transports: {
    [sepolia.id]: http(),
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

const WalletProvider = ({ children }) => {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "49c5da58-cbd1-4a7b-b21f-7f0951e78404",
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
};

export default WalletProvider;
