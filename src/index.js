import { createWeb3Modal, defaultConfig } from "@web3modal/ethers";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    if (!window.walletConnectPlugin) {
      console.error("walletConnectPlugin is not defined");
      return;
    }
    const projectId = window.walletConnectPlugin?.projectId ?? "";

    // Create your application's metadata object
    const pluginMetadata = window.walletConnectPlugin.metadata ?? {};
    const metadata = {
      name: pluginMetadata.name ?? "",
      description: pluginMetadata.description ?? "",
      url: pluginMetadata.url ?? "", // url must match your domain & subdomain
      icons: pluginMetadata.icons ?? [""],
    };

    // Create Ethers config
    const ethersConfig = defaultConfig({
      /*Required*/
      metadata,

      /*Optional*/
      enableEIP6963: true, // true by default
      enableInjected: true, // true by default
      enableCoinbase: true, // true by default
      ...(window.walletConnectPlugin.defaultRpcUrl ? { rpcUrl: window.walletConnectPlugin.defaultRpcUrl } : {}), // used for the Coinbase SDK
      ...(window.walletConnectPlugin.defaultChainId ? { defaultChainId: window.walletConnectPlugin.defaultChainId } : {}), // used for the Coinbase SDK 
    });

    const modal = createWeb3Modal({
      ethersConfig,
      chains: window.walletConnectPlugin.chains ?? [{}],
      projectId,
      enableAnalytics: true, // Optional - defaults to your Cloud configuration
      enableOnramp: true, // Optional - false as default
    });
    window.modal = modal;

    async function connectWallet() {
      modal.open();
    }

    document.getElementById("connect").addEventListener("click", connectWallet);
  } catch (error) {
    console.error(error);
  }

}); 
