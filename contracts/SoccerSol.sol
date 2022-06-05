// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

/// @title A contract for SoccerSol
/// @author LouisLee
/// @notice NFT Minting
contract SoccerSol is ERC721, Ownable, ReentrancyGuard {
  using SafeMath for uint256;
  using SafeMath for uint16;
  using SafeMath for uint8;
  uint16 private _tokenId;

  // Team wallet
  address[] teamWalletList = [
    0x3BAC9BB01B0a80ad6966403Fd83526D0611671d5, // Wallet 1 address => SC Developer
    0x804161E270eB0D412501de2244EE94a60e4DD4f4, // Wallet 2 address => Art Developer
    0xCAc35a5B2d47e3D2BDa9bd14b14D5FF71a34F1c2 // Wallet 3 address => Web Developer
  ];

  mapping(address => uint8) teamWalletPercent;

  // Mint Counter for Each Wallet
  mapping(address => uint8) addressPreSaleCountMap; // Up to 5
  mapping(address => uint8) addressPublicSaleCountMap; // Up to 5

  // Minting Limitation
  uint16 public preSaleDiscountLimit = 100;

  // changable=>setTotalLimit()
  uint16 public totalLimit = 566;
  uint16 public totalSupply = 566;
  /**
   * Mint Step flag
   * 0:   preSale,
   * 1:   publicSale
   * 2:   paused
   */
  uint8 public mintStep = 0;

  // Mint Price
  uint256 public preSalePrice = 0.05 ether; // presale price
  uint256 public publicSalePrice = 0.08 ether; // publicsale price

  // BaseURI (real)
  string private realBaseURI =
    'https://gateway.pinata.cloud/ipfs/QmRiNsuRoYQmSAnvziBHSY4xHN43BHxgjvnoDxKyQQQ8Un/';

  // mint limit per account
  uint8 private mintLimit = 5;

  constructor() ERC721('soccerSol', 'SSol') {
    teamWalletPercent[teamWalletList[0]] = 33; // Wallet 1 percent
    teamWalletPercent[teamWalletList[1]] = 33; // Wallet 2 percent
    teamWalletPercent[teamWalletList[2]] = 34; // Wallet 3 percent
  }

  event Mint(
    address indexed _from,
    uint8 _mintStep,
    uint256 _tokenId,
    uint256 _mintPrice,
    uint8 _mintCount,
    uint8 _preSaleCount,
    uint8 _publicSaleCount
  );

  event Setting(
    uint8 _mintStep,
    uint256 _preSlalePrice,
    uint256 _publicSalePrice,
    uint16 _totalLimit,
    uint8 mintLimit,
    uint256 _tokenId,
    uint16 totalSupply
  );

  /**
   * Override tokenURI
   */
  function tokenURI(uint256 tokenId) public view override returns (string memory) {
    require(_exists(tokenId), 'Token does not exist');
    return string(abi.encodePacked(_baseURI(), Strings.toString(tokenId), '.json'));
  }

  /**
   * Override baseUri
   */
  function _baseURI() internal view virtual override returns (string memory) {
    return realBaseURI;
  }

  /**
   * Override setbaseuri
   */
  function setBaseTokenURI(string memory baseTokenURI) public onlyOwner {
    realBaseURI = baseTokenURI;
  }

  /**
   * Presale
   * mintStep:    0
   * mintCount:   Up to 5
   */
  function mintPresale(uint8 _mintCount) external payable nonReentrant returns (uint256) {
    require(
      msg.sender != address(0) &&
        (mintStep == 0) &&
        (_mintCount > 0) &&
        (_mintCount <= mintLimit) &&
        (addressPreSaleCountMap[msg.sender] + _mintCount <= mintLimit) &&
        (_mintCount <= preSaleDiscountLimit) &&
        (msg.value == (preSalePrice * _mintCount))
    );

    for (uint8 i = 0; i < _mintCount; i++) {
      _tokenId++;
      _safeMint(msg.sender, _tokenId);
    }

    addressPreSaleCountMap[msg.sender] += _mintCount;
    preSaleDiscountLimit -= _mintCount;
    totalLimit -= _mintCount;
    if (preSaleDiscountLimit == 0) {
      mintStep = 1;
    }
    emit Mint(
      msg.sender,
      mintStep,
      _tokenId,
      preSalePrice,
      _mintCount,
      addressPreSaleCountMap[msg.sender],
      addressPublicSaleCountMap[msg.sender]
    );

    return _tokenId;
  }

  /**
   * Public Sale
   * mintStep:    3
   * mintCount:   Up to 5
   */
  function mintPublic(uint8 _mintCount) external payable nonReentrant returns (uint256) {
    require(
      msg.sender != address(0) &&
        (mintStep == 1) &&
        (_mintCount > 0) &&
        (_mintCount <= mintLimit) &&
        (addressPublicSaleCountMap[msg.sender] + _mintCount <= mintLimit) &&
        (_mintCount <= totalLimit) &&
        (msg.value == (publicSalePrice * _mintCount))
    );

    for (uint8 i = 0; i < _mintCount; i++) {
      _tokenId++;
      _safeMint(msg.sender, _tokenId);
    }

    addressPublicSaleCountMap[msg.sender] += _mintCount;
    totalLimit -= _mintCount;

    emit Mint(
      msg.sender,
      mintStep,
      _tokenId,
      publicSalePrice,
      _mintCount,
      addressPreSaleCountMap[msg.sender],
      addressPublicSaleCountMap[msg.sender]
    );

    return _tokenId;
  }

  /**
   * Set status of mintStep
   * mintStep:    0 - freeMint,
   *              1 - preSale 1: discount,
   *              2 - paused
   */
  function setMintStep(uint8 _mintStep) external onlyOwner returns (uint8) {
    require(_mintStep >= 0 && _mintStep <= 2);
    mintStep = _mintStep;
    emit Setting(
      mintStep,
      publicSalePrice,
      preSalePrice,
      totalLimit,
      mintLimit,
      _tokenId,
      totalSupply
    );
    return mintStep;
  }

  // Get Balance
  function getBalance() external view onlyOwner returns (uint256) {
    return address(this).balance;
  }

  // Withdraw
  function withdraw() external onlyOwner {
    require(address(this).balance != 0);

    uint256 balance = address(this).balance;

    for (uint8 i = 0; i < teamWalletList.length - 1; i++) {
      payable(teamWalletList[i]).transfer(
        balance.div(100).mul(teamWalletPercent[teamWalletList[i]])
      );
    }
    payable(teamWalletList[2]).transfer(address(this).balance);
  }

  /**
   * Get TokenList by sender
   */
  function getTokenList(address account) external view returns (uint256[] memory) {
    require(msg.sender != address(0));
    require(account != address(0));

    address selectedAccount = msg.sender;
    if (owner() == msg.sender) selectedAccount = account;

    uint256 count = balanceOf(selectedAccount);
    uint256[] memory tokenIdList = new uint256[](count);

    if (count == 0) return tokenIdList;

    uint256 cnt = 0;
    for (uint256 i = 1; i < (_tokenId + 1); i++) {
      if (_exists(i) && (ownerOf(i) == selectedAccount)) {
        tokenIdList[cnt++] = i;
      }

      if (cnt == count) break;
    }

    return tokenIdList;
  }

  /**
   * Get Setting
   *  0 :     mintStep
   *  1 :     publicSalePrice
   *  2 :     preSalePrice
   *  3 :     totalLimit
   *  4 :     mintLimit
   */
  function getSetting() external view returns (uint256[] memory) {
    uint256[] memory setting = new uint256[](7);
    setting[0] = mintStep;
    setting[1] = publicSalePrice;
    setting[2] = preSalePrice;
    setting[3] = totalLimit;
    setting[4] = mintLimit;
    setting[5] = _tokenId;
    setting[6] = totalSupply;
    return setting;
  }

  /**
   * Get Status by sender
   *  0 :     presaleCount
   *  1 :     publicSaleCount
   */
  function getAccountStatus(address account) external view returns (uint8[] memory) {
    require(msg.sender != address(0));
    require(account != address(0));

    address selectedAccount = msg.sender;
    if (owner() == msg.sender) selectedAccount = account;

    uint8[] memory status = new uint8[](3);

    if (balanceOf(selectedAccount) == 0) return status;

    status[0] = addressPreSaleCountMap[selectedAccount];
    status[1] = addressPublicSaleCountMap[selectedAccount];

    return status;
  }

  function addSupply(uint8 supply) external onlyOwner returns (uint16) {
    totalLimit += supply;
    totalSupply += supply;
    return totalSupply;
  }
}
