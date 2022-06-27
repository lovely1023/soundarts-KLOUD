import { task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import { Logger } from "tslog";
import config from "./config/config";
import fetch from "node-fetch";

const logger: Logger = new Logger();

const timer = (ms: any) => new Promise(res => setTimeout(res, ms))

task("push-metadata-update", "Ping Opensea")
    .addParam("totalsupply", "Total Supply")
    .setAction(
        async (args, hre) => {
            for (let index = 0; index < args.totalsupply; index++) {
                logger.info(await fetch(`https://api.opensea.io/api/v1/asset/${config.tokenAddress}/${index+1}/?force_update=true`));
                
                // Rate limit friendly.
                await timer(2000);
            }
        }
    );
// validate if needed: https://rinkeby-api.opensea.io/asset/0xe4fd38670733f927018ea4bda88459bdef0a40cb/13/validate/
task("push-metadata-update-testnets", "Ping Opensea")
    .addParam("totalsupply", "Total Supply")
    .setAction(
        async (args, hre) => {
            for (let index = 0; index < args.totalsupply; index++) {
                logger.info(await fetch(`https://testnets-api.opensea.io/api/v1/asset/${config.tokenAddress}/${index+1}/?force_update=true`));
                
                // Rate limit friendly.
                await timer(2000);
            }
            
        }
    );


