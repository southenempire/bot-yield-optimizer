// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract BotYieldVault is Ownable, ReentrancyGuard {
    IERC20 public usdtToken;
    address public aiKeeper;
    
    uint256 public constant PERFORMANCE_FEE_BPS = 150; // 1.5%

    mapping(address => uint256) public botBalances;
    mapping(address => uint256) public usdtBalances;

    event DepositBOT(address indexed user, uint256 amount);
    event WithdrawBOT(address indexed user, uint256 amount);
    event DepositUSDT(address indexed user, uint256 amount);
    event WithdrawUSDT(address indexed user, uint256 amount);
    event YieldDistributed(uint256 botAmount, uint256 usdtAmount);

    modifier onlyKeeper() {
        require(msg.sender == aiKeeper, "Only AI Keeper");
        _;
    }

    constructor(address _usdtToken, address _aiKeeper) Ownable(msg.sender) {
        usdtToken = IERC20(_usdtToken);
        aiKeeper = _aiKeeper;
    }

    function setKeeper(address _newKeeper) external onlyOwner {
        aiKeeper = _newKeeper;
    }

    // --- DEPOSITS ---

    function depositBOT() external payable nonReentrant {
        require(msg.value > 0, "Must deposit > 0");
        botBalances[msg.sender] += msg.value;
        emit DepositBOT(msg.sender, msg.value);
    }

    function depositUSDT(uint256 amount) external nonReentrant {
        require(amount > 0, "Must deposit > 0");
        require(usdtToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        usdtBalances[msg.sender] += amount;
        emit DepositUSDT(msg.sender, amount);
    }

    // --- WITHDRAWALS ---

    function withdrawBOT(uint256 amount) external nonReentrant {
        require(botBalances[msg.sender] >= amount, "Insufficient BOT balance");
        botBalances[msg.sender] -= amount;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");
        emit WithdrawBOT(msg.sender, amount);
    }

    function withdrawUSDT(uint256 amount) external nonReentrant {
        require(usdtBalances[msg.sender] >= amount, "Insufficient USDT balance");
        usdtBalances[msg.sender] -= amount;
        require(usdtToken.transfer(msg.sender, amount), "Transfer failed");
        emit WithdrawUSDT(msg.sender, amount);
    }

    // --- AI STRATEGY EXECUTION ---
    
    // The AI backend will call this to move funds to the active strategy (e.g. BDex)
    // For now, this is a placeholder that allows the Keeper to call any contract.
    function executeStrategy(address target, bytes calldata data, uint256 value) external onlyKeeper nonReentrant returns (bytes memory) {
        (bool success, bytes memory result) = target.call{value: value}(data);
        require(success, "Strategy execution failed");
        return result;
    }

    // Allow vault to receive BOT
    receive() external payable {}
}
