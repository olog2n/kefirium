import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { networkConfig } from "../helper-hardhat-config"

const deployERC721: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { deployments, getNamedAccounts, network, ethers } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const name = networkConfig[network.name].kefirium.name;
    const symbol = networkConfig[network.name].kefirium.symbol;

    const args: any[] = [
        name == undefined ? "Kefirium" : name,
        symbol == undefined ? "KEF" : symbol
    ]

    await deploy("KefiriumERC721", {
        from: deployer,
        log: true,
        args: args,
    })
}

export default deployERC721
deployERC721.tags = ["all", "KefiriumERC721"]
