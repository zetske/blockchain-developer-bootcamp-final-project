//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    uint256 immutable price;
    address payable fundableWallet;
    string uri;

    constructor(
        uint256 _price,
        address treasury,
        string memory _uri
    ) ERC721("MyNFT", "NFT") {
        price = _price;
        fundableWallet = payable(treasury);
        uri = _uri;
        minters[msg.sender].isMinter = true;
        minters[msg.sender].isActive = true;
    }

    // Give minting permission to ticket crew
    // Storage for minter role
    struct Minter {
        bool isMinter; // Is this address a minter
        bool isActive; // Is this address an active minter
    }

    // Storage for minters
    mapping(address => Minter) internal minters;

    modifier onlyMinter() {
        require(
            minters[msg.sender].isMinter && minters[msg.sender].isActive,
            "Not active minter"
        );
        _;
    }

    /**
     * @param   minter Address of the minter
     * @param   hasMinterPermissions If the address has minter permissions. If
     *          false user will not be able to mint, nor will they be able to be
     *          set as the creator of a token
     * @param   isActiveMinter If the minter is an active minter. If they do
     *          not have minter permissions they will not be able to be assigned
     *          as the creator of a token
     */
    function addURIAdmin(
        address minter,
        bool hasMinterPermissions,
        bool isActiveMinter
    ) external onlyOwner {
        minters[minter].isMinter = hasMinterPermissions;
        minters[minter].isActive = isActiveMinter;
    }

    function setTokenURI(string calldata _uri) public onlyMinter {
        uri = _uri;
    }

    // function tokenURI(uint256 tokenId)
    //     public
    //     view
    //     override
    //     returns (string memory)
    // {
    //     return uri;
    // }

    /**
     * @param   recipient Address of the nft receiver
     */
    function mintNFT(address payable recipient)
        public
        payable
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        (bool success, ) = fundableWallet.call{value: msg.value}("");
        require(success, "Failed to send money");
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, uri);

        return newItemId;
    }
}
