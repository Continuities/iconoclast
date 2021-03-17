//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Iconoclast is ERC721, Ownable {

  event Burnt(uint256);

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

    // Burn it
    tokenContract.transferFrom(msg.sender, address(0xDEAD), tokenId);

    emit Burnt(ashesId);
  }

  function mint() external returns (uint256) {
    _tokenIds.increment();
    uint256 ashesId = _tokenIds.current();
    _safeMint(msg.sender, ashesId);
    string memory uri = string(abi.encodePacked("https://iconoclast.itsmichael.info/", Strings.toString(ashesId)));
    _setTokenURI(ashesId, uri);
    return ashesId;
  }
}
