import { task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import { Logger } from "tslog";const csv = require("csv-parser");
import { writeFileSync, createReadStream, readFileSync } from 'fs';
import { ethers } from "ethers";

const logger: Logger = new Logger();



task("get-provenance", "Generate Provenance Hash")
    .setAction(
        async (args, hre) => {
            const fileString = readFileSync(`./provenance/fullData.json`, "utf-8");
            const hash = ethers.utils.id(fileString);

            writeFileSync(`./provenance/provenance.txt`, hash);

            logger.info(`Provenance ${hash}`);
        }
    );

task("metadata-with-offset", "Generate offset files")
    .setAction(
        async (args, hre) => {

          const fileString = readFileSync(`./provenance/fullData.json`, "utf-8");
          const metaArray = JSON.parse(fileString);

          const startingIndex = 2;
          logger.info(`startingIndex: ${startingIndex}`);

          for (let index = 0; index < 5000; index++) {
            const idx = index + 1;
            const offsetLocation = (idx - 1 + startingIndex - 1) % 5000;
            let res = metaArray[offsetLocation];
            res.name = `#${idx}`;
            res.description = "KLOUD is the artistical embodiment of limitless creativity in anonymity. With this NFT drop, the collector enters the KLOUD, owning a unique visual & musical art piece derived from the generative algorithm that is KLOUD x HOOKER x COMPUTER. Holding one of these NFTs grants future access to KLOUD metaverse events.";
            res.image = `https://soundarts-nft.s3.amazonaws.com/KLOUD_2021_5000_20000_FRAME0/${offsetLocation}.png`;
            res.animation_url = `https://soundarts-nft.s3.amazonaws.com/KLOUD_2021_5000_20000/${offsetLocation}.mp4`;
            
            writeFileSync(`./provenance/meta/${idx}`, JSON.stringify(res, null, 4));
            logger.info(`Metadata written to: ./provenance/meta/${idx}`);
          }

        }
    );