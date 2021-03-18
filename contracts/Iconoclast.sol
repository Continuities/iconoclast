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

  mapping ( uint256 => string ) private _originalURIs;
  
  constructor() ERC721("Pile of Ashes", "ASH") Ownable() {}

  function burn(address contractAddress, uint256 tokenId) external returns (uint256) {

    ERC721 tokenContract = ERC721(contractAddress);

    // Only allow people to burn their own tokens
    require(tokenContract.ownerOf(tokenId) == msg.sender, "Caller does not own the provided token");

    string memory original = tokenContract.tokenURI(tokenId);

    _tokenIds.increment();

    uint256 ashesId = _tokenIds.current();
    string memory tokenURI = string(abi.encodePacked("https://iconoclast.itsmichael.info/", Strings.toString(ashesId)));
    _safeMint(msg.sender, ashesId);
    _setTokenURI(ashesId, tokenURI);
    _originalURIs[ashesId] = original;

    // Burn it
    tokenContract.transferFrom(msg.sender, address(0xDEAD), tokenId);

    emit Burnt(ashesId);
    return ashesId;
  }

  function originalURI(uint256 tokenId) external view returns (string memory) {
    require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
    return _originalURIs[tokenId];
  }
}
