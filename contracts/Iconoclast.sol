//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Iconoclast is ERC721, Ownable {

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  
  constructor() ERC721("Pile of Ashes", "ASH") Ownable() {

  }

  function burn(address receiver, string memory tokenURI) external returns (uint256) {
    _tokenIds.increment();

    uint256 newNftTokenId = _tokenIds.current();
    _mint(receiver, newNftTokenId);
    _setTokenURI(newNftTokenId, tokenURI);

    return newNftTokenId;
  }
}
