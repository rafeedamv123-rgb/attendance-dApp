// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {ERC20} from "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
contract Attendance is ERC20 {
    address public teacher;
    struct Class {
        uint256 timeDuration;
        bool isOpen;
        mapping(address => bool) attendance;
    }
    mapping(uint256 => Class) public classes;
    constructor() ERC20("AttendanceToken", "ATT") {
        teacher = msg.sender;
    }
    modifier onlyTeacher() {
        _checkTeacher();
        _;
    }
    function _checkTeacher() internal view {
        require(msg.sender == teacher, "Only teacher can perform this action");
    }
    function openAttendance(uint256 _timeduration, uint256 _courseCode) external onlyTeacher {
        Class storage newClass = classes[_courseCode];
        newClass.timeDuration = block.timestamp + _timeduration;
        newClass.isOpen = true;
    }
    function closeAttendance(uint256 _courseCode) external onlyTeacher {
       classes[_courseCode].isOpen = false;
    }
    function markAttendance(uint256 _courseCode) external {
        Class storage class = classes[_courseCode];
        require(class.isOpen, "Attendance is not open");
        require(block.timestamp <= class.timeDuration, "Attendance time has expired");
        require(!class.attendance[msg.sender], "Attendance already marked");
        class.attendance[msg.sender] = true;
        _mint(msg.sender, 1 * 10 ** decimals());

    }

}