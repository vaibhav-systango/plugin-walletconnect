import { createWeb3Modal, defaultConfig } from "@web3modal/ethers";
const projectId = "7c2144f0bd609bdae7c2f253510d317d";

document.addEventListener("DOMContentLoaded", async () => {
  // 2. Set chains
  const sepolia = {
    chainId: 11155111,
    name: "Sepolia",
    currency: "ETH",
    explorerUrl: "https://sepolia.etherscan.io",
    rpcUrl: "https://divine-soft-snowflake.ethereum-sepolia.quiknode.pro/b29c4bc8d75d8755fca06f038936bee3f406cdf3/",
  };

  // 3. Create your application's metadata object
  const metadata = {
    name: "My Website",
    description: "My Website description",
    url: "https://mywebsite.com", // url must match your domain & subdomain
    icons: ["https://avatars.mywebsite.com/"],
  };

  // 4. Create Ethers config
  const ethersConfig = defaultConfig({
    /*Required*/
    metadata,

    /*Optional*/
    enableEIP6963: true, // true by default
    enableInjected: true, // true by default
    enableCoinbase: true, // true by default
    rpcUrl: "https://divine-soft-snowflake.ethereum-sepolia.quiknode.pro/b29c4bc8d75d8755fca06f038936bee3f406cdf3", // used for the Coinbase SDK
    defaultChainId: 11155111, // used for the Coinbase SDK
  });

  const modal = createWeb3Modal({
    ethersConfig,
    chains: [sepolia],
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    enableOnramp: true, // Optional - false as default
  });
  window.modal = modal;

  async function connectWallet() {
    modal.open();
  }

  document.getElementById("connect").addEventListener("click", connectWallet);
});
