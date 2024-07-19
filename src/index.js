import { createWeb3Modal, defaultConfig } from "@web3modal/ethers";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    if (!wc_config) {
      console.error("Error: 'wc_config' is not defined. Please ensure that you have defined 'wc_config' with the necessary configuration settings to use WalletConnect features.");
      return;
    }
    const projectId = wc_config.walletConnectPlugin?.projectId ?? "";

    // Create your application's metadata object
    const pluginMetadata = wc_config.walletConnectPlugin.metadata ?? {};
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
      ...(wc_config.walletConnectPlugin.defaultRpcUrl ? { rpcUrl: wc_config.walletConnectPlugin.defaultRpcUrl } : {}), // used for the Coinbase SDK
      ...(wc_config.walletConnectPlugin.defaultChainId ? { defaultChainId: wc_config.walletConnectPlugin.defaultChainId } : {}), // used for the Coinbase SDK 
    });

    const modal = createWeb3Modal({
      ethersConfig,
      chains: wc_config.walletConnectPlugin.chains ?? [{}],
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
