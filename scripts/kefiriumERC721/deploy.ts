import {ethers, network} from "hardhat";
import {networkConfig} from "../../helper-hardhat-config";
import fs from "fs";

require("dotenv").config();

async function main() {
  const [deployer] = await ethers.getSigners();

  const contracts = JSON.parse(fs.readFileSync("./contracts.json", 'utf8'));
  
  const name = networkConfig[network.name].kefirium.name
  const symbol = networkConfig[network.name].kefirium.symbol 

  const KefiriumERC721 = await ethers.getContractFactory("KefiriumERC721", deployer);
  console.log("Deploying KefiriumERC721...");

  const kefiriumERC721 = await KefiriumERC721.deploy(
    name,
    symbol,
  );

  await kefiriumERC721.deployed();

  console.log("KefiriumERC721 deployed to:", kefiriumERC721.address);

  contracts[network.name].kefiriumERC721 = {address: kefiriumERC721.address}
  fs.writeFileSync("./contracts.json", JSON.stringify(contracts));
}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
