import { task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import { Logger } from "tslog";
import { ethers } from "ethers";

const logger: Logger = new Logger();

task("send-eth", "Sends eth to address")
    .addParam("address", "Address to send to")
    .addParam("amount", "Amount to send")
    .setAction(
        async (args, hre) => {
            const [signer] = await hre.ethers.getSigners();
            // const signer = new ethers.Wallet(process.env.TEST_PAYEE_0_KEY as string);
            // const provider = ethers.getDefaultProvider("goerli");

            // const tx = await signer.connect(provider).sendTransaction({
            const tx = await signer.sendTransaction({
                to: args.address,
                value: hre.ethers.utils.parseEther(args.amount)
            });

            logger.info(tx);
        }
    );