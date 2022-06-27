import { task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import config from "./config/config";

task("verify-token", "Verifies Token Contract")
    .setAction(
        async (args, hre) => {
            await hre.run("verify:verify", {
                address: config.tokenAddress,
                constructorArguments: [config.name, config.symbol],
                contract: "contracts/KLOUD.sol:KLOUD"
            });
        }
    );

task("verify-minter", "Verifies minter Contract")
    .setAction(
        async (args, hre) => {
            await hre.run("verify:verify", {
                address: config.minterAddress,
                constructorArguments: [config.tokenAddress, config.payees, config.shares],
                contract: "contracts/Minter.sol:Minter"
            });
        }
    );

task("verify-auction", "Verifies auction Contract")
    .setAction(
        async (args, hre) => {
            await hre.run("verify:verify", {
                address: config.auctionAddress,
                constructorArguments: [
                    config.tokenAddress,
                    config.wethAddress,
                    config.timeBuffer,
                    config.reservePrice,
                    config.minBidIncrementPercentage,
                    config.duration,
                ],
                contract: "contracts/NounsAuctionHouse.sol:NounsAuctionHouse"
            });
        }
    );

