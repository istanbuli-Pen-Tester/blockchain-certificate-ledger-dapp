// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateLedger {
    
    // Define Owner (Registration Department)
    address public owner;
    
    // Define Verification Authorities (as per requirement #1)
    address public departmentHead;
    address public dean;
    address public president;
    
    // Minimum fee (0.05 ETH)
    uint256 public constant REGISTRATION_FEE = 0.05 ether;
    
    // Struct to hold Certificate Details
    struct Certificate {
        string studentName;
        string specialization;
        uint256 academicAvg;
        address presidentAddress;
        bool isIssued;
        uint256 timestamp;
    }
    
    // Struct to record Fee Transactions (for transparency - requirement #4, #5)
    struct FeeTransaction {
        address payer;
        uint256 amount;
        uint256 date;
    }
    
    // STORAGE
    
    // Mapping to link a Wallet Address to a Certificate
    mapping(address => Certificate) public certificates;
    
    // Mapping to track if student has paid fee
    mapping(address => bool) public hasPaidFee;
    
    // Array to store all fee history
    FeeTransaction[] public feeHistory;
    
    // EVENTS (LOGGING)
    
    event CertificateIssued(address indexed studentAddress, string name);
    event FeePaid(address indexed payer, uint256 amount);
    event FundsWithdrawn(address indexed owner, uint256 amount);
    event AuthoritiesUpdated(address departmentHead, address dean, address president);
    
    // CONSTRUCTOR
    
    constructor(
        address _departmentHead,
        address _dean,
        address _president
    ) {
        owner = msg.sender; // Registration Department
        departmentHead = _departmentHead;
        dean = _dean;
        president = _president;
    }
    
    // MODIFIERS (SECURITY)
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Access Denied: Only owner can perform this action");
        _;
    }
    
    // Requirement #7: Prevent zero-value transactions
    modifier nonZeroValue() {
        require(msg.value > 0, "Cannot send zero value");
        _;
    }
    
    // FUNCTIONS
    
    // PAY REGISTRATION FEE (Student Action - Requirement #2)
    function payRegistrationFee() public payable nonZeroValue {
        require(msg.value >= REGISTRATION_FEE, "Insufficient fee: Must pay at least 0.05 ETH");
        require(!hasPaidFee[msg.sender], "Fee already paid for this address");
        
        // Mark as paid
        hasPaidFee[msg.sender] = true;
        
        // Record the transaction for transparency (Requirement #4)
        feeHistory.push(FeeTransaction({
            payer: msg.sender,
            amount: msg.value,
            date: block.timestamp
        }));
        
        emit FeePaid(msg.sender, msg.value);
    }
    
    // ISSUE CERTIFICATE (Owner Action - Requirement #1)
    // Note: This assumes offline verification by the three authorities has occurred
    function issueCertificate(
        address targetStudentAddress,
        string memory _name,
        string memory _specialization,
        uint256 _avg
    ) public onlyOwner {
        // Validation: Ensure student has paid the fee
        require(hasPaidFee[targetStudentAddress], "Student has not paid registration fee");
        
        // Validation: Ensure certificate doesn't already exist
        require(!certificates[targetStudentAddress].isIssued, "Certificate already issued for this address");
        
        // Validation: Ensure authorities are set
        require(president != address(0), "President address not set");
        
        // Create the Certificate (Requirement #3, #8)
        certificates[targetStudentAddress] = Certificate({
            studentName: _name,
            specialization: _specialization,
            academicAvg: _avg,
            presidentAddress: president,
            isIssued: true,
            timestamp: block.timestamp
        });
        
        emit CertificateIssued(targetStudentAddress, _name);
    }
    
    // GET CERTIFICATE (Public View - Requirement #3, #8)
    function getCertificate(address studentAddress) public view returns (
        string memory studentName,
        string memory specialization,
        uint256 academicAvg,
        address presidentAddress,
        bool isIssued,
        uint256 timestamp
    ) {
        Certificate memory cert = certificates[studentAddress];
        require(cert.isIssued, "No certificate issued for this address");
        
        return (
            cert.studentName,
            cert.specialization,
            cert.academicAvg,
            cert.presidentAddress,
            cert.isIssued,
            cert.timestamp
        );
    }
    
    // GET ALL FEE TRANSACTIONS (Requirement #5 - Transparency)
    function getAllFeeTransactions() public view returns (FeeTransaction[] memory) {
        return feeHistory;
    }
    
    // GET STUDENT'S FEE TRANSACTIONS (Requirement #5)
    function getMyFeeTransactions() public view returns (FeeTransaction[] memory) {
        // Count transactions for this student
        uint256 count = 0;
        for (uint256 i = 0; i < feeHistory.length; i++) {
            if (feeHistory[i].payer == msg.sender) {
                count++;
            }
        }
        
        // Create array of student's transactions
        FeeTransaction[] memory myTransactions = new FeeTransaction[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < feeHistory.length; i++) {
            if (feeHistory[i].payer == msg.sender) {
                myTransactions[index] = feeHistory[i];
                index++;
            }
        }
        
        return myTransactions;
    }
    
    // GET FEE TRANSACTION COUNT
    function getFeeTransactionCount() public view returns (uint256) {
        return feeHistory.length;
    }
    
    // CHECK IF STUDENT HAS PAID FEE
    function hasStudentPaidFee(address studentAddress) public view returns (bool) {
        return hasPaidFee[studentAddress];
    }
    
    // WITHDRAW FEES (Admin Action - Requirement #6)
    function withdrawFees() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds available to withdraw");
        
        (bool success, ) = payable(owner).call{value: balance}("");
        require(success, "Transfer failed");
        
        emit FundsWithdrawn(owner, balance);
    }
    
    // UPDATE VERIFICATION AUTHORITIES (Owner only)
    function setAuthorities(
        address _departmentHead,
        address _dean,
        address _president
    ) public onlyOwner {
        require(_departmentHead != address(0), "Invalid department head address");
        require(_dean != address(0), "Invalid dean address");
        require(_president != address(0), "Invalid president address");
        
        departmentHead = _departmentHead;
        dean = _dean;
        president = _president;
        
        emit AuthoritiesUpdated(_departmentHead, _dean, _president);
    }
    
    // GET CONTRACT BALANCE
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
    
    // CHECK IF CERTIFICATE EXISTS
    function hasCertificate(address studentAddress) public view returns (bool) {
        return certificates[studentAddress].isIssued;
    }
}