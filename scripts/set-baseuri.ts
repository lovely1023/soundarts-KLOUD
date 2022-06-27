import { task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import { Logger } from "tslog";
import config from "./config/config";
import { KLOUD } from "../dist/types";


const logger: Logger = new Logger();

task("set-baseuri", "set BaseUri")
    .addParam("baseuri", "Base URI to Set")
    .setAction(
        async (args, hre) => {
            const instance = await hre.ethers.getContractAt("KLOUD", config.tokenAddress);

            await instance.setBaseURI(args.baseuri);
        }
    );

task("set-tokenuri", "set one TokenUri")
    .addParam("tokenid", "Token ID")
    .addParam("tokenuri", "Token URI to Set")
    .setAction(
        async (args, hre) => {
            const instance = await hre.ethers.getContractAt("KLOUD", config.tokenAddress) as KLOUD;

            await instance.setTokenURI(args.tokenid, args.tokenuri);
        }
    );
