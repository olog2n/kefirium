import hre from 'hardhat'
import { KefiriumERC721 } from '../typechain-types'
import { expect, use } from 'chai'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { BigNumber } from 'ethers'
// import { MerkleTree } from ''
// import { keccak256 } from 'ethers/lib/utils'

const { deployments, ethers, network } = hre
const ZERO_ADDRESS = ethers.constants.AddressZero

const OWNER = 0
const USER = 1

describe("KefiriumERC721", function () {
    let owner: SignerWithAddress
    let user: SignerWithAddress

    let kefirium: KefiriumERC721

    const baseSetup = deployments.createFixture(
        async ({ deployments, ethers }, options) => {
            await deployments.fixture(["KefiriumERC721"])

            owner = (await ethers.getSigners())[OWNER]
            user = (await ethers.getSigners())[USER]

            kefirium = await ethers.getContract("KefiriumERC721", owner)
        }
    )

    const timestamp = async () => {
        let blockNumber = await ethers.provider.getBlockNumber()
        let block = await ethers.provider.getBlock(blockNumber) 

        return block.timestamp
    }

    describe("Method: setMerkleRoot", function() {
        it("Negative", async() => {

        })

        it("Positive", async() => {

        })
    }) 

    describe("Method: mint", function() {
        it("Negative", async() => {

        })

        it("Positive", async() => {
            
        })
    }) 

    describe("Method: mintBatch", function() {
        it("Negative", async() => {

        })

        it("Positive", async() => {
            
        })
    }) 

    describe("Method: withdraw", function() {
        it("Negative", async() => {

        })

        it("Positive", async() => {
            
        })
    }) 
})
