### Design pattern decisions: 

#### Inheritance and Interfaces: 
The token contract inherits from Openzeppelin contracts and is imported through `@openzeppelin/contracts`. Specifically from the ERC721 contract. This is the standard that I have used to build these contracts. I'm also using `Ownable.sol`, `Counters.sol`, and `ERC721URIStorage.sol`
  

#### Access Control Design Patterns:
My contract implements `Ownable.sol` interface which allows only for the administrative ticket crew to call certain functions on the contract. `AddURIAdmin()` and modifier onlyMinter can be called to whitelist an address to change URI of token. In the context of this project, this would be for an administrative ticket crew member to change the image according to their needs. 
A  allows only a whitelisted minter to change the URI of the token.

