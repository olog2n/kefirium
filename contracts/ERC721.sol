// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Consecutive.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KefiriumERC721 is ERC721Consecutive, Pausable, Ownable {
    uint256 public constant BASE_ETH_VALUE = 0.01 ether;

    bytes32 public merkleRoot;

    modifier onlyPaymentOrWhitelisted(bytes32[] memory merkleProof_) {
        if (_verify(msg.sender, merkleProof_) == false)
            require(msg.value >= BASE_ETH_VALUE, "Kefirium: Wrong payment value");
        _;
    }

    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {}

    //USER-INTERACTION

    function mint(bytes32[] memory merkleProof_) 
    external 
    payable 
    whenNotPaused 
    onlyPaymentOrWhitelisted(merkleProof_) {
        _mintConsecutive(msg.sender, 1);
    }

    function mintBatch(
        uint96 amount_,
        bytes32[] memory merkleProof_
    ) external payable whenNotPaused onlyPaymentOrWhitelisted(merkleProof_) {
        require(amount_ > 0, "Kefirium: Wrong amount");
        _mintConsecutive(msg.sender, amount_);
    }

    //ADMIN-INTERACTION

    function setMerkleRoot(bytes32 root_) external onlyOwner {
        merkleRoot = root_;
    }

    function adminMint() external onlyOwner {
        _mintConsecutive(msg.sender, 1);
    }

    function adminMintBatch(uint96 amount_) external onlyOwner {
        require(amount_ > 0, "Kefirium: Wrong amount");
        _mintConsecutive(msg.sender, amount_);
    }

    function withdraw() external onlyOwner {
        (bool success, ) = payable(msg.sender).call{value: address(this).balance}("");

        require(success, "Kefirium: Transfer failed");
    }

    function _verify(address _target, bytes32[] memory _merkleProof) internal view returns (bool) {
        bytes32 node = keccak256(abi.encodePacked(_target));
        return (MerkleProof.verify(_merkleProof, merkleRoot, node));
    }
}
