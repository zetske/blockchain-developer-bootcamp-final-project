// We import Chai to use its assertion functions here.
import { expect } from "./chai-setup";

// we import our utilities
import { setupUsers, setupUser } from "./utils";

// We import the hardhat environment fields we are planning to use
import {
  ethers,
  deployments,
  getNamedAccounts,
  getUnnamedAccounts,
} from "hardhat";

// we create a setup function that can be called by every test and setup variables for easy to read tests
async function setup() {
  // it first ensures the deployment is executed and reset (use of evm_snapshot for faster tests)
  await deployments.fixture(["MyNFT"]);

  // we get an instantiated contract in the form of a ethers.js Contract instance:
  const contracts = {
    MyNFT: await ethers.getContract("MyNFT"),
  };

  // we get the relevant accounts by name
  const { tokenOwner, ticketCrew, ticketHolder1, ticketHolder2 } =
    await getNamedAccounts();

  // Get the unnammedAccounts (which are basically all accounts not named in the config,
  // This is useful for tests as you can be sure they have not been given tokens for example)
  // We then use the utilities function to generate user objects
  // These object allow you to write things like `users[0].Token.transfer(....)`
  const users = await setupUsers(await getUnnamedAccounts(), contracts);
  // finally we return the whole object (including the tokenOwner setup as a User object)
  return {
    ...contracts,
    users,
    tokenOwner: await setupUser(tokenOwner, contracts),
    ticketCrew: await setupUser(ticketCrew, contracts),
    ticketHolder1: await setupUser(ticketHolder1, contracts),
    ticketHolder2: await setupUser(ticketHolder2, contracts),
  };
}

// we define the first token ID here which will be used for most minting tests
// we usually only mint one token and thus we expect the token ID to be one
const FIRST_TOKEN_ID = 1;

// `describe` receives the name of a section of your test suite, and a callback.
// The callback must define the tests of that section. This callback can't be
// an async function.
describe("MyNFT contract", function () {
  // You can nest describe calls to create subsections.
  describe("Deployment", function () {
    // `it` is another Mocha function. This is the one you use to define your
    // tests. It receives the test name, and a callback function.
    // If the callback function is async, Mocha will `await` it.
    it("Should set the right name", async function () {
      const { MyNFT } = await setup();
      expect(await MyNFT.name()).to.equal("MyNFT");
    });
    it("Only minter can set token uri", async function () {
      const { MyNFT, ticketCrew, ticketHolder1 } = await setup();
      await MyNFT.addURIAdmin(ticketCrew.address, true, true);
      await expect(ticketHolder1.MyNFT.setTokenURI("test")).to.be.revertedWith(
        "Not active minter"
      );
    });
  });

  describe("Minting", function () {
    it("Should mint 1 token successfully", async function () {
      // do setup
      const { MyNFT, ticketCrew, ticketHolder1 } = await setup();
      // add minter
      await MyNFT.addURIAdmin(ticketCrew.address, true, true);
      // mint NFT
      const mintTx = await ticketCrew.MyNFT.mintNFT(ticketHolder1.address);
      // ensure mint transaction came from ticketCrew
      expect(mintTx.from).to.eq(ticketCrew.address);
      // ensure mint transaction includes a transaction hash
      expect(mintTx).to.have.property("hash");
    });
    it("Should show correct balance after mint", async function () {
      // do setup
      const { MyNFT, ticketCrew, ticketHolder1 } = await setup();
      // add minter
      await MyNFT.addURIAdmin(ticketCrew.address, true, true);
      // mint NFT
      await ticketCrew.MyNFT.mintNFT(ticketHolder1.address);
      // 1 mint should equal a balance of 1
      expect(await ticketCrew.MyNFT.balanceOf(ticketHolder1.address)).to.eq(
        "1"
      );
    });
    it("Should show correct balance after 2 mints", async function () {
      // do setup
      const { MyNFT, ticketCrew, ticketHolder1 } = await setup();
      // add minter
      await MyNFT.addURIAdmin(ticketCrew.address, true, true);
      // mint NFT
      await ticketCrew.MyNFT.mintNFT(ticketHolder1.address);
      await ticketCrew.MyNFT.mintNFT(ticketHolder1.address);
      // after 2 mints we expect a balance of 2
      expect(await ticketCrew.MyNFT.balanceOf(ticketHolder1.address)).to.eq(
        "2"
      );
    });
    it("Should emit a Transfer event on successfull mint", async function () {
      // do setup
      const { MyNFT, ticketCrew, ticketHolder1 } = await setup();
      // add minter
      await MyNFT.addURIAdmin(ticketCrew.address, true, true);
      // expect a transfer event on minting
      await expect(ticketCrew.MyNFT.mintNFT(ticketHolder1.address))
        .to.emit(MyNFT, "Transfer")
        .withArgs(
          ethers.constants.AddressZero,
          ticketHolder1.address,
          FIRST_TOKEN_ID
        );
    });
  });

  describe("Transfer tokens", function () {
    it("Should transfer from one address to another", async function () {
      // do setup
      const { MyNFT, ticketCrew, ticketHolder1, ticketHolder2 } = await setup();
      // add minter
      await MyNFT.addURIAdmin(ticketCrew.address, true, true);
      // mint nft and ensure the token id emitted matches our expectations
      await expect(ticketCrew.MyNFT.mintNFT(ticketHolder1.address))
        .to.emit(MyNFT, "Transfer")
        .withArgs(
          ethers.constants.AddressZero,
          ticketHolder1.address,
          FIRST_TOKEN_ID
        );
      // validate the ownership of the token before transfer
      const ownerAddress = await ticketCrew.MyNFT.ownerOf(FIRST_TOKEN_ID);
      expect(ownerAddress).to.eq(ticketHolder1.address);
      expect(ownerAddress).to.not.eq(ticketHolder2.address);
      // transfer from one ticket holder to another
      await ticketHolder1.MyNFT.transferFrom(
        ticketHolder1.address,
        ticketHolder2.address,
        FIRST_TOKEN_ID
      );
      // validate ownership after transfer
      const ownerAfterTransfer = await ticketCrew.MyNFT.ownerOf(FIRST_TOKEN_ID);
      expect(ownerAfterTransfer).to.eq(ticketHolder2.address);
      expect(ownerAfterTransfer).to.not.eq(ticketHolder1.address);
    });
    it("Should fail transfer on invalid ownership", async function () {
      // do setup
      const { MyNFT, ticketCrew, ticketHolder1, ticketHolder2 } = await setup();
      // add minter
      await MyNFT.addURIAdmin(ticketCrew.address, true, true);
      // mint nft and ensure the token id emitted matches our expectations
      await expect(ticketCrew.MyNFT.mintNFT(ticketHolder1.address))
        .to.emit(MyNFT, "Transfer")
        .withArgs(
          ethers.constants.AddressZero,
          ticketHolder1.address,
          FIRST_TOKEN_ID
        );
      // validate the ownership of the token
      const ownerAddress = await ticketCrew.MyNFT.ownerOf(FIRST_TOKEN_ID);
      expect(ownerAddress).to.eq(ticketHolder1.address);
      expect(ownerAddress).to.not.eq(ticketHolder2.address);
      // transfer from one ticket holder to another
      await expect(
        ticketHolder2.MyNFT.transferFrom(
          ticketHolder2.address,
          ticketHolder1.address,
          FIRST_TOKEN_ID
        )
      ).to.be.revertedWith("ERC721: transfer caller is not owner nor approved");
    });
  });
});
