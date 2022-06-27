import { task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import { Logger } from "tslog";
import config from "./config/config";
import { ethers } from "ethers";
import { BaseToken, Minter, NounsAuctionHouse } from "../dist/types";

const logger: Logger = new Logger();

task("set-price", "Sets Price for Minter Contract")
    .addParam("etherprice", "Price in ether")
    .setAction(
        async (args, hre) => {
            const instance = await hre.ethers.getContractAt("Minter", config.minterAddress) as Minter;
            await instance.setPrice(ethers.utils.parseEther(args.etherprice));   
        }
    );

task("grant-minter-role", "Sets minter as MINTER_ROLE for token")
    .setAction(
        async (args, hre) => {
            const instance = await hre.ethers.getContractAt("KLOUD", config.tokenAddress) as BaseToken;
            await instance.grantRole(await instance.MINTER_ROLE(), config.minterAddress);
        }
    );

task("set-max-supply", "Sets maxSupply on token")
    .addParam("maxsupply", "Sets token maxSupply")
    .setAction(
        async (args, hre) => {
            const instance = await hre.ethers.getContractAt("KLOUD", config.tokenAddress) as BaseToken;
            await instance.setMaxSupply(args.maxsupply);
        }
    );

task("start-signed-mint", "Starts the whitelist signed mint sale")
    .setAction(
        async (args, hre) => {
            const minterInstance = await hre.ethers.getContractAt("Minter", config.minterAddress) as Minter;
            await minterInstance.flipSignedMintState();
        }
    );


task("set-max-per-block", "Max purchase per address per block")
    .addParam("max", "Sets maxBlockPurchase")
    .setAction(
        async (args, hre) => {
            const minterInstance = await hre.ethers.getContractAt("Minter", config.minterAddress) as Minter;
            await minterInstance.setMaxBlockPurchase(args.max);
        }
    );

task("set-max-per-wallet", "Max purchase per address per wallet")
    .addParam("max", "Sets maxWalletPurchase")
    .setAction(
        async (args, hre) => {
            const minterInstance = await hre.ethers.getContractAt("Minter", config.minterAddress) as Minter;
            await minterInstance.setMaxWalletPurchase(args.max);
        }
    );

task("set-minter-signer", "Sets the address who approves whitelist participants")
    .setAction(
        async (args, hre) => {
            const minterInstance = await hre.ethers.getContractAt("Minter", config.minterAddress) as Minter;
            await minterInstance.setMintSigner(config.minterSigner);
        }
    );

task("start-mint", "Starts the mint sale")
    .setAction(
        async (args, hre) => {
            const minterInstance = await hre.ethers.getContractAt("Minter", config.minterAddress) as Minter;
            await minterInstance.flipSaleState();
        }
    );

task("reserve-one", "Reserved 1 token for auction")
    .setAction(
        async (args, hre) => {
            const minterInstance = await hre.ethers.getContractAt("Minter", config.minterAddress) as Minter;
            await minterInstance.reserveTokens(1);
        }
    );

task("send-to-auction", "Sends token to auction contract")
    .addParam("tokenid", "Token id to transfer")
    .setAction(
        async (args, hre) => {
            const [deployer]  = await hre.ethers.getSigners();
            const token = await hre.ethers.getContractAt("KLOUD", config.tokenAddress) as BaseToken;
            await token.transferFrom(deployer.address, config.auctionAddress, args.tokenid);
        }
    );

task("create-auction", "Starts auction")
    .addParam("tokenid", "Token id to sell")
    .setAction(
        async (args, hre) => {
            const auction = await hre.ethers.getContractAt("NounsAuctionHouse", config.auctionAddress) as NounsAuctionHouse;
            await auction.createAuction(args.tokenid);
        }
    );

task("settle-auction", "Settles auction")
    .setAction(
        async (args, hre) => {
            const auction = await hre.ethers.getContractAt("NounsAuctionHouse", config.auctionAddress) as NounsAuctionHouse;
            await auction.settleAuction();
        }
    );