import { BigNumber } from '@ethersproject/bignumber';
import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react';

import contract from '@/contracts/SoccerSol.json';

import { nftSetting, nftStatus } from '../types';

const contractAddress = '0x11f110CDE549De477d80Acf190192b565d93f5FC';
// const contractAddress = '0x23149ce067947143b92fb728179a511ba4e1dfc5';
declare global {
  interface Window {
    ethereum: any;
  }
}
const abi = contract.output.abi;

export const Mint = () => {
  const [count, setCount] = useState(1);

  const [currentAccount, setCurrentAccount] = useState(null);
  const [nftSetting, setnftSetting] = useState<nftSetting>();
  const [nftStatus, setnftStatus] = useState<nftStatus>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  useEffect(() => {
    getSettings();
  }, [currentAccount]);

  const getSettings = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        // window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(ethereum);
        const nftContract = new ethers.Contract(contractAddress, abi, provider);

        console.log(1);
        const Setting = await nftContract.getSetting();
        console.log('2', Setting);
        if (Setting[0] == 0) {
          // Mintstep is 0
          setnftSetting({
            ...nftSetting,
            mintStep: Number(Setting[0]),

            salePrice: Number(Setting[2] / 1000000000000000000), // Decimal is 18
            totalLimit: Number(Setting[3]),
            currentMint: Number(Setting[5]),
            mintLimit: Number(Setting[4]),
          });
          console.log(2);
        } else if (Setting[0] == 1) {
          // Mintstep is 1
          setnftSetting({
            ...nftSetting,
            mintStep: Number(Setting[0]),
            salePrice: Number(Setting[1] / 1000000000000000000), // Decimal is  18
            totalLimit: Number(Setting[3]),
            currentMint: Number(Setting[5]),
            mintLimit: Number(Setting[4]),
          });
          console.log(3);
        }
        console.log(3);
        const Status = await nftContract.getAccountStatus(currentAccount, { gasLimit: 3000000 });
        console.log(4);
        setnftStatus({
          ...nftStatus,
          presaleCount: Number(Status[0]),
          publicsaleCount: Number(Status[1]),
        });
        console.log(5);

        console.log(`Setting`, Setting);
        console.log(`Status`, Status);
        console.log(`nftSetting`, nftSetting?.mintStep);
        console.log(`nftStatus`, nftStatus?.presaleCount);
      } else {
        console.log('Ethereum object does not exist');
      }
    } catch (err) {
      console.log(err);
    }
  };
  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log('Make sure you have Metamask installed!');
      return;
    } else {
      console.log("Wallet exists! We're ready to go!");
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log('Found an authorized account: ', account);
      setCurrentAccount(account);
    } else {
      console.log('No authorized account found');
    }
  };

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert('Please install Metamask!');
    }

    try {
      //   await window.ethereum.enable();
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Found an account! Address: ', accounts[0]);
      //   window.ethereum.on('accountsChanged', function (accounts) {
      //     // Time to reload your interface with accounts[0]!
      //     console.log(accounts[0]);
      //   });
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const mintNftHandler = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);

        console.log('Initialize payment');
        const cost = count * Number(nftSetting?.salePrice);

        // Mint
        try {
          let nftTxn;
          console.log(`nftSetting`, nftSetting);
          console.log(`nftStatus`, nftStatus);
          if (nftSetting?.mintStep == 0) {
            // Presale
            if (nftStatus?.presaleCount == 5) {
              // In case already premint max limit
              alert('You already minted limit amount of presale');
            } else {
              console.log('presale', cost);
              nftTxn = await nftContract.mintPresale(count, {
                value: ethers.utils.parseEther(cost.toString()),
                gasLimit: 10000000,
              });
              console.log('Preminting... please wait');
              setLoading(true);
              await nftTxn.wait();
              setLoading(false);
              console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
            }
          } else if (nftSetting?.mintStep == 1) {
            // PublicSale
            if (nftStatus?.publicsaleCount == 5) {
              // In case already publicmint max limit
              alert('You already minted limit amount of publicsale');
            } else {
              console.log('publicsale', cost);
              nftTxn = await nftContract.mintPublic(count, {
                value: ethers.utils.parseEther(cost.toString()),
                gasLimit: 10000000,
              });
              console.log('Publicminting... please wait');
              setLoading(true);
              await nftTxn.wait();
              setLoading(false);
              console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
            }
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log('Ethereum object does not exist');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const connectWalletButton = () => {
    // checkWalletIsConnected();
    return (
      <button
        onClick={connectWalletHandler}
        className="hidden w-40 p-6 px-10 py-3 mt-10 text-2xl font-bold text-center text-white bg-blue-600 rounded-tl-2xl rounded-br-2xl lg:block hover:bg-blue-500"
      >
        Connect
      </button>
    );
  };

  const mintNftButton = () => {
    // If Minting
    if (loading) {
      return (
        <button
          onClick={mintNftHandler}
          className="hidden w-40 p-6 px-10 py-3 mt-10 text-2xl font-bold text-center text-gray-800 bg-gray-500 rounded-tl-2xl rounded-br-2xl lg:block hover:cursor-wait"
          disabled
        >
          Minting...
        </button>
      );
    }
    //
    else {
      return (
        <button
          onClick={mintNftHandler}
          className="hidden w-40 p-6 px-10 py-3 mt-10 text-2xl font-bold text-center text-white bg-green-600 rounded-tl-2xl rounded-br-2xl lg:block hover:bg-green-500"
        >
          Mint
        </button>
      );
    }
  };

  return (
    <div className="flex flex-col justify-center p-10 bg-black ">
      <div className="flex flex-col p-10 m-auto text-center bg-gradient-to-tr from-green-900 to-green-300 rounded-3xl">
        <p className="p-3 text-xl text-white">Total availabe NFT’s: {nftSetting?.totalLimit} </p>
        <p className="p-3 text-xl text-white">Total minted NFT’s: {nftSetting?.mintLimit}</p>
        <p className="px-32 py-6 text-xl bg-gray-100 rounded-full bg-opacity-80 ">
          Price per NFT: {nftSetting?.salePrice}
        </p>
        <div className="flex align-middle">
          <div className="flex flex-row mt-10 bg-gray-100 rounded-full bg-opacity-80">
            <button
              className="p-5 text-4xl text-green-900"
              style={{ outline: 'none' }}
              onClick={() => setCount(count == 1 ? count : count - 1)}
            >
              -
            </button>
            <p className="p-6 text-2xl ">{count}</p>
            <button
              className="p-5 text-4xl text-green-900"
              style={{ outline: 'none' }}
              onClick={() => setCount(count == nftSetting?.mintLimit ? count : count + 1)}
            >
              +
            </button>
          </div>
          <button
            className="p-5 mt-10 text-4xl text-green-900 "
            style={{ outline: 'none' }}
            onClick={() => setCount(Number(nftSetting?.mintLimit))}
          >
            MAX
          </button>
        </div>
        <p className="p-6 mt-10 text-xl bg-gray-100 rounded-full bg-opacity-80 ">
          Total price: {nftSetting?.salePrice ? nftSetting.salePrice * count : 0}
          ETH
        </p>
        <div className="flex flex-row justify-between">
          {currentAccount ? mintNftButton() : connectWalletButton()}
        </div>
      </div>
    </div>
  );
};
