import { http, createConfig } from 'wagmi'
import { arbitrum, arbitrumSepolia } from "wagmi/chains";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { createClient } from 'viem'


const projectId = process.env.REACT_APP_WC_PROJECT_ID;
const metadata = {  
    name: "GEE Miner",
    description: "",
    url: "https://geeraaf.com/",
    icons: ["https://geeraaf.com/"]
    
};

export const config = defaultWagmiConfig({
    chains: process.env.REACT_APP_ENV == "production" ? [arbitrum] : [arbitrumSepolia],
    projectId,
    metadata
});

createWeb3Modal({
    wagmiConfig: config,
    projectId,

});