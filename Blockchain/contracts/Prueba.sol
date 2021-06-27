// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Prueba {
    uint256 cantidad;
    string nombre;
    string cuenta1;
    string cuenta2;

    function set(uint256 x, string memory a, string memory b, string memory c) public {
        cantidad = x;
        nombre = a;
        cuenta1 = b;
        cuenta2 = c;
    }

    function getCantidad() public view returns (uint256) {
        return cantidad;
    }

    function getNombre() public view returns (string memory) {
        return nombre;
    }

    function getCuenta1() public view returns (string memory) {
        return cuenta1;
    }

    function getCuenta2() public view returns (string memory) {
        return cuenta2;
    }
}
