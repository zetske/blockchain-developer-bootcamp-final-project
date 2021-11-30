### Avoiding Common Attacks:

#### Using Specific Compiler Pragma:
Search for `// REF-1 Attack-Vector-Prevention`
I use the specific compiler pragma `pragma solidity 0.8.9` in my contract.

#### Use Modifiers Only for Validation:
Search for `REF-2 Attack-Vector-Prevention`
I am using the modifier onlyMinter to ensure that the minting address is an active minter. This is to allow certain crew of the festival to generate NFTs (entry tickets) for attendees. This is implemented to ensure that ticket sales are even more accessable. OnlyMinter also allows whitelisted minters to set the URI of the token being minted.
