//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Iconoclast is ERC721, Ownable {

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  
  constructor() ERC721("Pile of Ashes", "ASH") Ownable() {}

  function burn(address contractAddress, uint256 tokenId) external returns (uint256) {

    ERC721 tokenContract = ERC721(contractAddress);

    // Only allow people to burn their own tokens
    require(tokenContract.ownerOf(tokenId) == msg.sender, "Caller does not own the provided token");

    string memory tokenURI = tokenContract.tokenURI(tokenId);

    _tokenIds.increment();

    uint256 ashesId = _tokenIds.current();
    _safeMint(msg.sender, ashesId);
    _setTokenURI(ashesId, tokenURI);

    // Take it
    tokenContract.transferFrom(msg.sender, address(this), tokenId);
    // Burn it
    tokenContract.transferFrom(address(this), address(0xDEAD), tokenId);

    return ashesId;
  }

  function mint() external returns (uint256) {
    _tokenIds.increment();
    uint256 ashesId = _tokenIds.current();
    _safeMint(msg.sender, ashesId);
    return ashesId;
  }
}
