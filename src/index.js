import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';

document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.createElement('button');
    connectButton.id = 'connect';
    connectButton.innerText = 'Connect Wallet';
    document.body.appendChild(connectButton);

    async function connectWallet() {
        const providerOptions = {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    infuraId: "0ff0a0411a3974d14009049b0ce36fda"
                }
            }
        };

        const web3Modal = new Web3Modal({
            cacheProvider: false,
            providerOptions,
        });

        const instance = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(instance);

        // Now you can use ethers.js methods
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        console.log(address);
    }

    document.getElementById('connect').addEventListener('click', connectWallet);
});
