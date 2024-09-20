// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Inferencer} from "../src/functioning.sol";

contract CounterScript is Script {
    Inferencer public inferencer;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        inferencer = new Inferencer(1,2,3,4);

        vm.stopBroadcast();
    }
}
