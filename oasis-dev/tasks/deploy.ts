import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

task("deploy", "Deploys our contract").setAction(
  async (args, hre: HardhatRuntimeEnvironment) => {
    const factory = await hre.ethers.getContractFactory("Lock");
    const contract = await factory.deploy();

    const dt = contract.deploymentTransaction();
    console.log("Deployment Transaction", dt!.hash);

    await contract.waitForDeployment();

    console.log("Contract", await contract.getAddress());
  }
);
