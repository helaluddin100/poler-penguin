import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { HashLink } from "react-router-hash-link";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
function Mint() {
  // ==========================mint value ==================
  const [walletConnected, setWalletConnected] = useState(false);

  const [totalMinted, setTotalMinted] = useState(0);
  const [value, setValue] = useState(1);
  const [pagelocation, setPageLocation] = useState(useLocation().pathname);
  // Contract Info
  const CONTRACT_ADDRESS = "0x5fD37fa901cb8b4B52D0D4bd5a3B8105758B141a";
  const CONTRACT_ABI = [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    { inputs: [], name: "ApprovalCallerNotOwnerNorApproved", type: "error" },
    { inputs: [], name: "ApprovalQueryForNonexistentToken", type: "error" },
    { inputs: [], name: "ApprovalToCurrentOwner", type: "error" },
    { inputs: [], name: "ApproveToCaller", type: "error" },
    { inputs: [], name: "BalanceQueryForZeroAddress", type: "error" },
    { inputs: [], name: "MintToZeroAddress", type: "error" },
    { inputs: [], name: "MintZeroQuantity", type: "error" },
    { inputs: [], name: "OwnerQueryForNonexistentToken", type: "error" },
    { inputs: [], name: "TransferCallerNotOwnerNorApproved", type: "error" },
    { inputs: [], name: "TransferFromIncorrectOwner", type: "error" },
    {
      inputs: [],
      name: "TransferToNonERC721ReceiverImplementer",
      type: "error",
    },
    { inputs: [], name: "TransferToZeroAddress", type: "error" },
    { inputs: [], name: "URIQueryForNonexistentToken", type: "error" },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "baseURI",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "freesale",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_mintAmount", type: "uint256" },
      ],
      name: "freesaleMint",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "freesaleSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "getApproved",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "hiddenURI",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "operator", type: "address" },
      ],
      name: "isApprovedForAll",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "maxSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_mintAmount", type: "uint256" },
      ],
      name: "ownerMint",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "ownerOf",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "presale",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "presaleCost",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_mintAmount", type: "uint256" },
      ],
      name: "presaleMint",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "publicsaleCost",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_mintAmount", type: "uint256" },
      ],
      name: "publicsaleMint",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "revealed",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
        { internalType: "bytes", name: "_data", type: "bytes" },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "operator", type: "address" },
        { internalType: "bool", name: "approved", type: "bool" },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bool", name: "_state", type: "bool" }],
      name: "setFreesale",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_supply", type: "uint256" }],
      name: "setFreesaleSupply",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "string", name: "_uri", type: "string" }],
      name: "setHiddenURI",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_supply", type: "uint256" }],
      name: "setMaxSupply",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bool", name: "_state", type: "bool" }],
      name: "setPresale",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_cost", type: "uint256" }],
      name: "setPresaleCost",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_cost", type: "uint256" }],
      name: "setPublicsaleCost",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bool", name: "_state", type: "bool" }],
      name: "setRevealed",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
      name: "supportsInterface",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "tokenURI",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdraw",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
  ];

  // Connect Wallet
  const connectWallet = async () => {
    if (Web3.givenProvider) {
      const providerOptions = {};

      const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
        providerOptions,
      });

      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);

      web3.eth.net.getId();

      const addresses = await web3.eth.getAccounts();
      const address = addresses[0];

      const { ethereum } = window;

      const networkId = await ethereum.request({
        method: "net_version",
      });

      setWalletConnected(true);
    } else {
      window.open(
        `https://metamask.app.link/dapp/polarpenguinsnft.com/${pagelocation}`
      );
    }
  };

  // Fetch
  useEffect(async () => {
    if (Web3.givenProvider) {
      if (walletConnected) {
        const web3 = new Web3(Web3.givenProvider);
        await Web3.givenProvider.enable();

        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

        contract.methods
          .totalSupply()
          .call()
          .then((response) => {
            setTotalMinted(response);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [walletConnected]);

  useEffect(() => {
    axios
      .get(
        "https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=0x5fD37fa901cb8b4B52D0D4bd5a3B8105758B141a&apikey=IV483XY92KQZ74DWB8K19XK27UDUPM6XSS"
      )
      .then(function (response) {
        setTotalMinted(response.data.result);
      });
  }, []);

  // Mint
  const mint = async () => {
    if (value > 0) {
      if (Web3.givenProvider) {
        connectWallet();

        const web3 = new Web3(Web3.givenProvider);
        await Web3.givenProvider.enable();

        const price = 0 * value;
        var tokens = web3.utils.toWei(price.toString(), "ether");
        var bntokens = web3.utils.toBN(tokens);

        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

        const addresses = await web3.eth.getAccounts();
        const address = addresses[0];

        contract.methods
          .presaleMint(value)
          .send({ gasLimit: "300000", from: address, value: bntokens })
          .then((nft) => {
            alert(
              "Congratulations you have successfully minted your POLAR PENGUINS! Check Opensea."
            );

            contract.methods
              .totalSupply()
              .call()
              .then((response) => {
                setTotalMinted(response);
              })
              .catch((err) => {
                console.log(err);
              });

            console.log(nft);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        window.open(
          `https://metamask.app.link/dapp/polarpenguinsnft.com/${pagelocation}`
        );
      }
    } else {
      alert("Please choose quantity");
    }
  };
  // AOS
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <React.Fragment>
      <main className="landing-page">
        <nav>
          <div className="container">
            <a href="/" className="logo">
              <img src="/images/brand/logo.png" alt="" />
            </a>

            <div className="navigation-bar-elements">
              <div className="navigation-bar-elements-left">
                <ul>
                  <li className="active" data-aos="fade-down">
                    <HashLink to="Landing">Home</HashLink>
                  </li>
                </ul>
              </div>

              <div className="navigation-bar-elements-right">
                <div className="social-links">
                  <div
                    className="social-link"
                    data-aos="fade-down"
                    data-aos-delay="400"
                  >
                    <a href="https://discord.gg/6PHpttj47c" target="_blank">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_78_2)">
                          <path
                            d="M16 31.3332C24.4684 31.3332 31.3333 24.4682 31.3333 15.9998C31.3333 7.53147 24.4684 0.666504 16 0.666504C7.53162 0.666504 0.666656 7.53147 0.666656 15.9998C0.666656 24.4682 7.53162 31.3332 16 31.3332Z"
                            stroke="#3BB9FF"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M18.288 15.6C18.288 16.088 17.928 16.488 17.472 16.488C17.024 16.488 16.656 16.088 16.656 15.6C16.656 15.112 17.016 14.712 17.472 14.712C17.928 14.712 18.288 15.112 18.288 15.6ZM14.552 14.712C14.096 14.712 13.736 15.112 13.736 15.6C13.736 16.088 14.104 16.488 14.552 16.488C15.008 16.488 15.368 16.088 15.368 15.6C15.376 15.112 15.008 14.712 14.552 14.712ZM23 9.648V24C20.9846 22.2189 21.6291 22.8085 19.288 20.632L19.712 22.112H10.64C9.736 22.112 9 21.376 9 20.464V9.648C9 8.736 9.736 8 10.64 8H21.36C22.264 8 23 8.736 23 9.648ZM20.72 17.232C20.72 14.656 19.568 12.568 19.568 12.568C18.416 11.704 17.32 11.728 17.32 11.728L17.208 11.856C18.568 12.272 19.2 12.872 19.2 12.872C17.2997 11.8305 15.0674 11.8303 13.224 12.64C12.928 12.776 12.752 12.872 12.752 12.872C12.752 12.872 13.416 12.24 14.856 11.824L14.776 11.728C14.776 11.728 13.68 11.704 12.528 12.568C12.528 12.568 11.376 14.656 11.376 17.232C11.376 17.232 12.048 18.392 13.816 18.448C13.816 18.448 14.112 18.088 14.352 17.784C13.336 17.48 12.952 16.84 12.952 16.84C13.0697 16.9224 13.2638 17.0292 13.28 17.04C14.6303 17.7962 16.5484 18.0439 18.272 17.32C18.552 17.216 18.864 17.064 19.192 16.848C19.192 16.848 18.792 17.504 17.744 17.8C17.984 18.104 18.272 18.448 18.272 18.448C20.04 18.392 20.72 17.232 20.72 17.232V17.232Z"
                            fill="#3BB9FF"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_78_2">
                            <rect width="32" height="32" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </a>
                  </div>

                  <div
                    className="social-link"
                    data-aos="fade-down"
                    data-aos-delay="500"
                  >
                    <a
                      href="https://www.instagram.com/polarpenguins.nft/"
                      target="_blank"
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_1_223)">
                          <path
                            d="M16 31.3332C24.4684 31.3332 31.3333 24.4682 31.3333 15.9998C31.3333 7.53147 24.4684 0.666504 16 0.666504C7.53162 0.666504 0.666656 7.53147 0.666656 15.9998C0.666656 24.4682 7.53162 31.3332 16 31.3332Z"
                            stroke="#3BB9FF"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M16.0018 11.8969C13.7316 11.8969 11.9005 13.7281 11.9005 15.9982C11.9005 18.2684 13.7316 20.0995 16.0018 20.0995C18.2719 20.0995 20.1031 18.2684 20.1031 15.9982C20.1031 13.7281 18.2719 11.8969 16.0018 11.8969ZM16.0018 18.6646C14.5348 18.6646 13.3354 17.4688 13.3354 15.9982C13.3354 14.5276 14.5312 13.3318 16.0018 13.3318C17.4724 13.3318 18.6682 14.5276 18.6682 15.9982C18.6682 17.4688 17.4688 18.6646 16.0018 18.6646ZM21.2275 11.7292C21.2275 12.261 20.7991 12.6858 20.2708 12.6858C19.739 12.6858 19.3142 12.2574 19.3142 11.7292C19.3142 11.2009 19.7426 10.7725 20.2708 10.7725C20.7991 10.7725 21.2275 11.2009 21.2275 11.7292ZM23.9438 12.7001C23.8831 11.4187 23.5904 10.2836 22.6516 9.34835C21.7164 8.41316 20.5813 8.12047 19.2999 8.05622C17.9793 7.98126 14.0207 7.98126 12.7001 8.05622C11.4222 8.1169 10.2871 8.40959 9.34835 9.3448C8.40959 10.28 8.12047 11.415 8.05622 12.6964C7.98126 14.0172 7.98126 17.9756 8.05622 19.2964C8.1169 20.5778 8.40959 21.7129 9.34835 22.6481C10.2871 23.5833 11.4187 23.876 12.7001 23.9402C14.0207 24.0152 17.9793 24.0152 19.2999 23.9402C20.5813 23.8796 21.7164 23.5868 22.6516 22.6481C23.5868 21.7129 23.8796 20.5778 23.9438 19.2964C24.0188 17.9756 24.0188 14.0207 23.9438 12.7001ZM22.2376 20.7134C21.9592 21.4131 21.4202 21.952 20.717 22.234C19.664 22.6516 17.1654 22.5553 16.0018 22.5553C14.8381 22.5553 12.336 22.6481 11.2866 22.234C10.5869 21.9556 10.048 21.4166 9.76595 20.7134C9.34835 19.6604 9.44471 17.1619 9.44471 15.9982C9.44471 14.8346 9.35191 12.3324 9.76595 11.283C10.0444 10.5834 10.5834 10.0444 11.2866 9.7624C12.3396 9.3448 14.8381 9.44115 16.0018 9.44115C17.1654 9.44115 19.6676 9.34835 20.717 9.7624C21.4166 10.0408 21.9556 10.5798 22.2376 11.283C22.6552 12.336 22.5588 14.8346 22.5588 15.9982C22.5588 17.1619 22.6552 19.664 22.2376 20.7134Z"
                            fill="#3BB9FF"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1_223">
                            <rect width="32" height="32" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </a>
                  </div>

                  <div
                    className="social-link"
                    data-aos="fade-down"
                    data-aos-delay="600"
                  >
                    <a href="https://twitter.com/polarp_nft" target="_blank">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_1_220)">
                          <path
                            d="M16 31.3332C24.4684 31.3332 31.3333 24.4682 31.3333 15.9998C31.3333 7.53147 24.4684 0.666504 16 0.666504C7.53162 0.666504 0.666656 7.53147 0.666656 15.9998C0.666656 24.4682 7.53162 31.3332 16 31.3332Z"
                            stroke="#3BB9FF"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M22.5548 12.9544C22.5651 13.0937 22.5651 13.2332 22.5651 13.3726C22.5651 17.6246 19.2197 22.5239 13.1055 22.5239C11.2218 22.5239 9.47191 21.9961 8 21.08C8.26764 21.1098 8.52494 21.1198 8.80288 21.1198C10.3572 21.1198 11.7879 20.612 12.9305 19.7457C11.4689 19.7158 10.2439 18.7897 9.82187 17.5151C10.0278 17.5449 10.2336 17.5649 10.4498 17.5649C10.7484 17.5649 11.0468 17.525 11.3247 17.4553C9.80133 17.1566 8.65875 15.8621 8.65875 14.2987V14.2589C9.10133 14.4978 9.61609 14.6473 10.1616 14.6671C9.26604 14.0896 8.67934 13.1037 8.67934 11.9884C8.67934 11.391 8.844 10.8433 9.13227 10.3653C10.7689 12.317 13.229 13.5916 15.9876 13.7311C15.9361 13.4921 15.9052 13.2432 15.9052 12.9942C15.9052 11.2217 17.3875 9.77783 19.23 9.77783C20.1873 9.77783 21.0519 10.1662 21.6592 10.7936C22.4106 10.6541 23.1311 10.3852 23.7693 10.0169C23.5222 10.7637 22.9973 11.391 22.3076 11.7893C22.9767 11.7196 23.6252 11.5403 24.2222 11.2914C23.7694 11.9287 23.2032 12.4963 22.5548 12.9544Z"
                            fill="#3BB9FF"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1_220">
                            <rect width="32" height="32" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </a>
                  </div>
                </div>

                <button
                  data-aos="fade-down"
                  data-aos-delay="700"
                  onClick={connectWallet}
                >
                  {walletConnected ? "Connected" : "Connect Wallet"}
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="mint-container">
          <h1>Mint Polar Penguins NFTs</h1>

          <div className="mint-box">
            <div className="price">
              <div className="price-img">
                <img src="./images/page-landing/images-img-5.gif" alt="" />
              </div>
              <div className="price-amount">
                <p>Presale Mint Price</p>
                <h2>0.05 ETH Each</h2>
              </div>
            </div>
            <div className="box">
              <div className="count">
                <button
                  onClick={() => {
                    if (value > 1) {
                      setValue(value - 1);
                    }
                  }}
                >
                  <img src="./images/mint-minus.png" alt="" />
                </button>
                <h2>{value}</h2>
                <button
                  onClick={() => {
                    if (value < 5) {
                      setValue(value + 1);
                    }
                  }}
                >
                  <img src="./images/mint-plus.png" alt="" />
                </button>
              </div>
              <div className="max">
                <h2>5 max</h2>
              </div>
            </div>
            <div className="underline"></div>

            <div className="total">
              <h2>TOTAL</h2>
              <h2>{(value * 0.05).toFixed(2)} ETH</h2>
            </div>

            <div className="underline"></div>

            <div className="mint-btn">
              <button className="m-btn-header" onClick={mint}>
                Mint
              </button>
            </div>

            <div className="minted">
              <p>QUANTITY: {totalMinted}/10,000 MINTED</p>
            </div>
          </div>
        </div>

        <section className="community">
          <div className="container">
            <div className="box">
              <h2>
                <span>Join The</span> <br /> Community
              </h2>

              <a href="https://discord.gg/6PHpttj47c" target="_blank">
                <svg
                  width="210"
                  height="65"
                  viewBox="0 0 210 65"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 32.5C1 15.103 15.103 1 32.5 1H177.5C194.897 1 209 15.103 209 32.5C209 49.897 194.897 64 177.5 64H32.5C15.103 64 1 49.897 1 32.5Z"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <circle
                    cx="32.5"
                    cy="32.5"
                    r="31.5"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <path
                    d="M91.0088 32.0869C91.0088 35.6123 90.0029 38.3125 87.9912 40.1875C85.9893 42.0625 83.0938 43 79.3047 43H73.2402V21.584H79.9639C83.46 21.584 86.1748 22.5068 88.1084 24.3525C90.042 26.1982 91.0088 28.7764 91.0088 32.0869ZM86.292 32.2041C86.292 27.6045 84.2607 25.3047 80.1982 25.3047H77.7812V39.25H79.7295C84.1045 39.25 86.292 36.9014 86.292 32.2041ZM94.9053 22.3896C94.9053 20.9346 95.7158 20.207 97.3369 20.207C98.958 20.207 99.7686 20.9346 99.7686 22.3896C99.7686 23.083 99.5635 23.625 99.1533 24.0156C98.7529 24.3965 98.1475 24.5869 97.3369 24.5869C95.7158 24.5869 94.9053 23.8545 94.9053 22.3896ZM99.5635 43H95.0957V26.623H99.5635V43ZM115.691 38.1367C115.691 39.8164 115.105 41.0957 113.934 41.9746C112.771 42.8535 111.028 43.293 108.704 43.293C107.513 43.293 106.497 43.21 105.657 43.0439C104.817 42.8877 104.031 42.6533 103.299 42.3408V38.6494C104.129 39.04 105.062 39.3672 106.097 39.6309C107.142 39.8945 108.06 40.0264 108.851 40.0264C110.472 40.0264 111.282 39.5576 111.282 38.6201C111.282 38.2686 111.175 37.9854 110.96 37.7705C110.745 37.5459 110.374 37.2969 109.847 37.0234C109.319 36.7402 108.616 36.4131 107.737 36.042C106.478 35.5146 105.55 35.0264 104.954 34.5771C104.368 34.1279 103.938 33.6152 103.665 33.0391C103.401 32.4531 103.27 31.7354 103.27 30.8857C103.27 29.4307 103.831 28.3076 104.954 27.5166C106.087 26.7158 107.688 26.3154 109.759 26.3154C111.731 26.3154 113.65 26.7451 115.516 27.6045L114.168 30.8271C113.348 30.4756 112.581 30.1875 111.868 29.9629C111.155 29.7383 110.428 29.626 109.686 29.626C108.367 29.626 107.708 29.9824 107.708 30.6953C107.708 31.0957 107.918 31.4424 108.338 31.7354C108.768 32.0283 109.7 32.4629 111.136 33.0391C112.415 33.5566 113.353 34.04 113.948 34.4893C114.544 34.9385 114.983 35.4561 115.267 36.042C115.55 36.6279 115.691 37.3262 115.691 38.1367ZM125.828 43.293C120.73 43.293 118.182 40.4951 118.182 34.8994C118.182 32.1162 118.875 29.9922 120.262 28.5273C121.648 27.0527 123.636 26.3154 126.224 26.3154C128.118 26.3154 129.817 26.6865 131.321 27.4287L130.003 30.8857C129.3 30.6025 128.646 30.373 128.04 30.1973C127.435 30.0117 126.829 29.9189 126.224 29.9189C123.899 29.9189 122.737 31.5693 122.737 34.8701C122.737 38.0732 123.899 39.6748 126.224 39.6748C127.083 39.6748 127.879 39.5625 128.611 39.3379C129.344 39.1035 130.076 38.7422 130.809 38.2539V42.0771C130.086 42.5361 129.354 42.8535 128.611 43.0293C127.879 43.2051 126.951 43.293 125.828 43.293ZM138.177 34.7822C138.177 36.4033 138.44 37.6289 138.968 38.459C139.505 39.2891 140.374 39.7041 141.575 39.7041C142.767 39.7041 143.621 39.2939 144.139 38.4736C144.666 37.6436 144.93 36.4131 144.93 34.7822C144.93 33.1611 144.666 31.9453 144.139 31.1348C143.611 30.3242 142.747 29.9189 141.546 29.9189C140.354 29.9189 139.495 30.3242 138.968 31.1348C138.44 31.9355 138.177 33.1514 138.177 34.7822ZM149.5 34.7822C149.5 37.4482 148.797 39.5332 147.391 41.0371C145.984 42.541 144.026 43.293 141.517 43.293C139.944 43.293 138.558 42.9512 137.356 42.2676C136.155 41.5742 135.232 40.583 134.588 39.2939C133.943 38.0049 133.621 36.501 133.621 34.7822C133.621 32.1064 134.319 30.0264 135.716 28.542C137.112 27.0576 139.075 26.3154 141.604 26.3154C143.177 26.3154 144.563 26.6572 145.765 27.3408C146.966 28.0244 147.889 29.0059 148.533 30.2852C149.178 31.5645 149.5 33.0635 149.5 34.7822ZM162.332 26.3154C162.938 26.3154 163.44 26.3594 163.841 26.4473L163.504 30.6367C163.143 30.5391 162.703 30.4902 162.186 30.4902C160.76 30.4902 159.646 30.8564 158.846 31.5889C158.055 32.3213 157.659 33.3467 157.659 34.665V43H153.191V26.623H156.575L157.234 29.377H157.454C157.962 28.459 158.646 27.7217 159.505 27.165C160.374 26.5986 161.316 26.3154 162.332 26.3154ZM172 43.293C170.076 43.293 168.562 42.5459 167.459 41.0518C166.365 39.5576 165.818 37.4873 165.818 34.8408C165.818 32.1553 166.375 30.0654 167.488 28.5713C168.611 27.0674 170.154 26.3154 172.117 26.3154C174.178 26.3154 175.75 27.1162 176.834 28.7178H176.98C176.756 27.4971 176.644 26.4082 176.644 25.4512V20.207H181.126V43H177.698L176.834 40.876H176.644C175.628 42.4873 174.08 43.293 172 43.293ZM173.567 39.7334C174.71 39.7334 175.545 39.4014 176.072 38.7373C176.609 38.0732 176.902 36.9453 176.951 35.3535V34.8701C176.951 33.1123 176.678 31.8525 176.131 31.0908C175.594 30.3291 174.715 29.9482 173.494 29.9482C172.498 29.9482 171.722 30.373 171.165 31.2227C170.618 32.0625 170.345 33.2881 170.345 34.8994C170.345 36.5107 170.623 37.7217 171.18 38.5322C171.736 39.333 172.532 39.7334 173.567 39.7334Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M32.5 60C47.6878 60 60 47.6878 60 32.5C60 17.3122 47.6878 5 32.5 5C17.3122 5 5 17.3122 5 32.5C5 47.6878 17.3122 60 32.5 60ZM37.9208 16.8971C40.7533 17.376 43.4619 18.2183 45.9889 19.3579C46.0109 19.3667 46.0291 19.3831 46.0401 19.4042C50.5175 25.8818 52.7274 33.1917 51.9016 41.605C51.8996 41.6228 51.8939 41.6399 51.8848 41.6553C51.8757 41.6707 51.8634 41.6839 51.8487 41.6942C48.8455 43.8822 45.494 45.5468 41.9358 46.6176C41.9108 46.6251 41.884 46.6247 41.8591 46.6164C41.8343 46.6081 41.8126 46.5924 41.7971 46.5714C41.0489 45.5457 40.3685 44.4656 39.7739 43.3309C39.7658 43.3153 39.7611 43.2981 39.7602 43.2805C39.7592 43.2629 39.7621 43.2453 39.7685 43.2289C39.7749 43.2125 39.7847 43.1976 39.7973 43.1853C39.8099 43.173 39.825 43.1635 39.8416 43.1575C40.9201 42.7578 41.9474 42.2772 42.935 41.709C42.9527 41.6986 42.9674 41.6839 42.9779 41.6664C42.9885 41.6488 42.9945 41.6289 42.9955 41.6085C42.9965 41.588 42.9924 41.5677 42.9836 41.5492C42.9747 41.5307 42.9615 41.5147 42.945 41.5026C42.7352 41.349 42.5287 41.1888 42.3306 41.0269C42.3124 41.0125 42.2905 41.0034 42.2675 41.0008C42.2444 40.9982 42.221 41.0021 42.2001 41.0121C35.7902 43.9255 28.766 43.9255 22.2801 41.0121C22.2592 41.0026 22.2361 40.9992 22.2134 41.0021C22.1906 41.005 22.1691 41.0142 22.1513 41.0286C21.9531 41.1888 21.745 41.349 21.5369 41.5026C21.5205 41.5149 21.5075 41.5312 21.4989 41.5498C21.4904 41.5685 21.4866 41.5889 21.4879 41.6094C21.4892 41.6298 21.4956 41.6497 21.5064 41.6671C21.5173 41.6845 21.5323 41.6989 21.5501 41.709C22.5412 42.2725 23.575 42.7574 24.6419 43.1592C24.7113 43.1856 24.7443 43.2649 24.7096 43.3309C24.1283 44.4672 23.4478 45.549 22.6848 46.573C22.6686 46.5933 22.6468 46.6082 22.622 46.6159C22.5973 46.6236 22.5708 46.6236 22.546 46.616C18.994 45.5421 15.6479 43.8783 12.648 41.6942C12.6337 41.6833 12.6219 41.6696 12.6131 41.654C12.6043 41.6384 12.5987 41.6212 12.5968 41.6033C11.9048 34.3264 13.3136 26.957 18.4534 19.4009C18.466 19.381 18.4845 19.3654 18.5062 19.3563C21.0348 18.215 23.7434 17.3727 26.5743 16.8938C26.5998 16.8897 26.626 16.8935 26.6493 16.9048C26.6726 16.916 26.692 16.934 26.7048 16.9565C27.0819 17.6142 27.4221 18.2924 27.7238 18.988C30.7279 18.5391 33.782 18.5391 36.7861 18.988C37.057 18.3604 37.4435 17.566 37.7903 16.9565C37.8032 16.9343 37.8227 16.9166 37.8461 16.906C37.8694 16.8953 37.8956 16.8922 37.9208 16.8971ZM22.1166 33.2413C22.1166 35.4065 23.7269 37.1721 25.6791 37.1721C27.6627 37.1721 29.2416 35.4082 29.2416 33.2413C29.273 31.0893 27.6776 29.3105 25.6791 29.3105C23.6956 29.3105 22.1166 31.0744 22.1166 33.2413ZM35.2881 33.2413C35.2881 35.4065 36.8968 37.1721 38.8506 37.1721C40.8507 37.1721 42.4131 35.4082 42.4131 33.2413C42.4445 31.0893 40.8491 29.3105 38.8506 29.3105C36.8654 29.3105 35.2881 31.0744 35.2881 33.2413Z"
                    fill="white"
                  />
                </svg>
              </a>

              <img
                src="/images/page-landing/community-img-1.png"
                alt=""
                className="community-img-1"
              />

              <img
                src="/images/page-landing/community-bg-element-1.svg"
                alt=""
                className="community-bg-element-1"
              />
              <img
                src="/images/page-landing/community-bg-element-2.svg"
                alt=""
                className="community-bg-element-2"
              />
            </div>
          </div>
        </section>

        <footer>
          <div className="container">
            <div className="social-links">
              <div className="social-link">
                <a href="https://discord.gg/6PHpttj47c" target="_blank">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_78_2)">
                      <path
                        d="M16 31.3332C24.4684 31.3332 31.3333 24.4682 31.3333 15.9998C31.3333 7.53147 24.4684 0.666504 16 0.666504C7.53162 0.666504 0.666656 7.53147 0.666656 15.9998C0.666656 24.4682 7.53162 31.3332 16 31.3332Z"
                        stroke="#3BB9FF"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M18.288 15.6C18.288 16.088 17.928 16.488 17.472 16.488C17.024 16.488 16.656 16.088 16.656 15.6C16.656 15.112 17.016 14.712 17.472 14.712C17.928 14.712 18.288 15.112 18.288 15.6ZM14.552 14.712C14.096 14.712 13.736 15.112 13.736 15.6C13.736 16.088 14.104 16.488 14.552 16.488C15.008 16.488 15.368 16.088 15.368 15.6C15.376 15.112 15.008 14.712 14.552 14.712ZM23 9.648V24C20.9846 22.2189 21.6291 22.8085 19.288 20.632L19.712 22.112H10.64C9.736 22.112 9 21.376 9 20.464V9.648C9 8.736 9.736 8 10.64 8H21.36C22.264 8 23 8.736 23 9.648ZM20.72 17.232C20.72 14.656 19.568 12.568 19.568 12.568C18.416 11.704 17.32 11.728 17.32 11.728L17.208 11.856C18.568 12.272 19.2 12.872 19.2 12.872C17.2997 11.8305 15.0674 11.8303 13.224 12.64C12.928 12.776 12.752 12.872 12.752 12.872C12.752 12.872 13.416 12.24 14.856 11.824L14.776 11.728C14.776 11.728 13.68 11.704 12.528 12.568C12.528 12.568 11.376 14.656 11.376 17.232C11.376 17.232 12.048 18.392 13.816 18.448C13.816 18.448 14.112 18.088 14.352 17.784C13.336 17.48 12.952 16.84 12.952 16.84C13.0697 16.9224 13.2638 17.0292 13.28 17.04C14.6303 17.7962 16.5484 18.0439 18.272 17.32C18.552 17.216 18.864 17.064 19.192 16.848C19.192 16.848 18.792 17.504 17.744 17.8C17.984 18.104 18.272 18.448 18.272 18.448C20.04 18.392 20.72 17.232 20.72 17.232V17.232Z"
                        fill="#3BB9FF"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_78_2">
                        <rect width="32" height="32" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
              </div>

              <div className="social-link">
                <a
                  href="https://www.instagram.com/polarpenguins.nft/"
                  target="_blank"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1_223)">
                      <path
                        d="M16 31.3332C24.4684 31.3332 31.3333 24.4682 31.3333 15.9998C31.3333 7.53147 24.4684 0.666504 16 0.666504C7.53162 0.666504 0.666656 7.53147 0.666656 15.9998C0.666656 24.4682 7.53162 31.3332 16 31.3332Z"
                        stroke="#3BB9FF"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M16.0018 11.8969C13.7316 11.8969 11.9005 13.7281 11.9005 15.9982C11.9005 18.2684 13.7316 20.0995 16.0018 20.0995C18.2719 20.0995 20.1031 18.2684 20.1031 15.9982C20.1031 13.7281 18.2719 11.8969 16.0018 11.8969ZM16.0018 18.6646C14.5348 18.6646 13.3354 17.4688 13.3354 15.9982C13.3354 14.5276 14.5312 13.3318 16.0018 13.3318C17.4724 13.3318 18.6682 14.5276 18.6682 15.9982C18.6682 17.4688 17.4688 18.6646 16.0018 18.6646ZM21.2275 11.7292C21.2275 12.261 20.7991 12.6858 20.2708 12.6858C19.739 12.6858 19.3142 12.2574 19.3142 11.7292C19.3142 11.2009 19.7426 10.7725 20.2708 10.7725C20.7991 10.7725 21.2275 11.2009 21.2275 11.7292ZM23.9438 12.7001C23.8831 11.4187 23.5904 10.2836 22.6516 9.34835C21.7164 8.41316 20.5813 8.12047 19.2999 8.05622C17.9793 7.98126 14.0207 7.98126 12.7001 8.05622C11.4222 8.1169 10.2871 8.40959 9.34835 9.3448C8.40959 10.28 8.12047 11.415 8.05622 12.6964C7.98126 14.0172 7.98126 17.9756 8.05622 19.2964C8.1169 20.5778 8.40959 21.7129 9.34835 22.6481C10.2871 23.5833 11.4187 23.876 12.7001 23.9402C14.0207 24.0152 17.9793 24.0152 19.2999 23.9402C20.5813 23.8796 21.7164 23.5868 22.6516 22.6481C23.5868 21.7129 23.8796 20.5778 23.9438 19.2964C24.0188 17.9756 24.0188 14.0207 23.9438 12.7001ZM22.2376 20.7134C21.9592 21.4131 21.4202 21.952 20.717 22.234C19.664 22.6516 17.1654 22.5553 16.0018 22.5553C14.8381 22.5553 12.336 22.6481 11.2866 22.234C10.5869 21.9556 10.048 21.4166 9.76595 20.7134C9.34835 19.6604 9.44471 17.1619 9.44471 15.9982C9.44471 14.8346 9.35191 12.3324 9.76595 11.283C10.0444 10.5834 10.5834 10.0444 11.2866 9.7624C12.3396 9.3448 14.8381 9.44115 16.0018 9.44115C17.1654 9.44115 19.6676 9.34835 20.717 9.7624C21.4166 10.0408 21.9556 10.5798 22.2376 11.283C22.6552 12.336 22.5588 14.8346 22.5588 15.9982C22.5588 17.1619 22.6552 19.664 22.2376 20.7134Z"
                        fill="#3BB9FF"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1_223">
                        <rect width="32" height="32" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
              </div>

              <div className="social-link">
                <a href="https://twitter.com/polarp_nft" target="_blank">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1_220)">
                      <path
                        d="M16 31.3332C24.4684 31.3332 31.3333 24.4682 31.3333 15.9998C31.3333 7.53147 24.4684 0.666504 16 0.666504C7.53162 0.666504 0.666656 7.53147 0.666656 15.9998C0.666656 24.4682 7.53162 31.3332 16 31.3332Z"
                        stroke="#3BB9FF"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M22.5548 12.9544C22.5651 13.0937 22.5651 13.2332 22.5651 13.3726C22.5651 17.6246 19.2197 22.5239 13.1055 22.5239C11.2218 22.5239 9.47191 21.9961 8 21.08C8.26764 21.1098 8.52494 21.1198 8.80288 21.1198C10.3572 21.1198 11.7879 20.612 12.9305 19.7457C11.4689 19.7158 10.2439 18.7897 9.82187 17.5151C10.0278 17.5449 10.2336 17.5649 10.4498 17.5649C10.7484 17.5649 11.0468 17.525 11.3247 17.4553C9.80133 17.1566 8.65875 15.8621 8.65875 14.2987V14.2589C9.10133 14.4978 9.61609 14.6473 10.1616 14.6671C9.26604 14.0896 8.67934 13.1037 8.67934 11.9884C8.67934 11.391 8.844 10.8433 9.13227 10.3653C10.7689 12.317 13.229 13.5916 15.9876 13.7311C15.9361 13.4921 15.9052 13.2432 15.9052 12.9942C15.9052 11.2217 17.3875 9.77783 19.23 9.77783C20.1873 9.77783 21.0519 10.1662 21.6592 10.7936C22.4106 10.6541 23.1311 10.3852 23.7693 10.0169C23.5222 10.7637 22.9973 11.391 22.3076 11.7893C22.9767 11.7196 23.6252 11.5403 24.2222 11.2914C23.7694 11.9287 23.2032 12.4963 22.5548 12.9544Z"
                        fill="#3BB9FF"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1_220">
                        <rect width="32" height="32" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <img
            src="/images/page-landing/footer-img-1.png"
            alt=""
            className="footer-img-1"
          />
        </footer>
      </main>
    </React.Fragment>
  );
}

export default Mint;
