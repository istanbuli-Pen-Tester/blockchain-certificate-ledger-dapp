/* ========================================
   CERTIFICATE LEDGER DAPP - JAVASCRIPT
   ======================================== */

/* VARIABLES */
// IMPORTANT: Replace these after deployment
const contractAddress = "0x546E66147487D8E5A4FF0fb85bfD451b750815F9"; // Replace with your deployed contract address from Remix
//ABI from remix
const contractABI = [
    
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_departmentHead",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_dean",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_president",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "departmentHead",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "dean",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "president",
				"type": "address"
			}
		],
		"name": "AuthoritiesUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "studentAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "CertificateIssued",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "payer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "FeePaid",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "FundsWithdrawn",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "REGISTRATION_FEE",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "certificates",
		"outputs": [
			{
				"internalType": "string",
				"name": "studentName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "specialization",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "academicAvg",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "presidentAddress",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "isIssued",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "dean",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "departmentHead",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "feeHistory",
		"outputs": [
			{
				"internalType": "address",
				"name": "payer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "date",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllFeeTransactions",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "payer",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "date",
						"type": "uint256"
					}
				],
				"internalType": "struct CertificateLedger.FeeTransaction[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "studentAddress",
				"type": "address"
			}
		],
		"name": "getCertificate",
		"outputs": [
			{
				"internalType": "string",
				"name": "studentName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "specialization",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "academicAvg",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "presidentAddress",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "isIssued",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getContractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getFeeTransactionCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMyFeeTransactions",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "payer",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "date",
						"type": "uint256"
					}
				],
				"internalType": "struct CertificateLedger.FeeTransaction[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "studentAddress",
				"type": "address"
			}
		],
		"name": "hasCertificate",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasPaidFee",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "studentAddress",
				"type": "address"
			}
		],
		"name": "hasStudentPaidFee",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "targetStudentAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_specialization",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_avg",
				"type": "uint256"
			}
		],
		"name": "issueCertificate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "payRegistrationFee",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "president",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_departmentHead",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_dean",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_president",
				"type": "address"
			}
		],
		"name": "setAuthorities",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawFees",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}

];

let web3;
let contract;
let currentAccount;
let isOwner = false;

/* ========================================
   1. INITIALIZATION ON PAGE LOAD
   ======================================== */
window.addEventListener('load', async () => {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        
        // Initialize Web3
        web3 = new Web3(window.ethereum);
        
        // Initialize contract instance
        contract = new web3.eth.Contract(contractABI, contractAddress);
        
        // Listen for account changes
        window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length > 0) {
                currentAccount = accounts[0];
                updateUI();
            } else {
                currentAccount = null;
                updateUI();
            }
        });
        
        // Listen for chain changes
        window.ethereum.on('chainChanged', () => {
            window.location.reload();
        });
        
    } else {
        alert('Please install MetaMask to use this DApp!');
        console.error('MetaMask not detected');
    }
});

/* ========================================
   2. WALLET CONNECTION
   ======================================== */
async function connectWallet() {
    try {
        // Request account access
        const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
        });
        
        currentAccount = accounts[0];
        console.log('Connected account:', currentAccount);
        
        // Update UI
        await updateUI();
        
        alert(`Wallet Connected!\nAddress: ${currentAccount}`);
        
    } catch (error) {
        console.error('Error connecting wallet:', error);
        alert('Failed to connect wallet: ' + error.message);
    }
}

/* ========================================
   3. UPDATE UI BASED ON USER ROLE
   ======================================== */
async function updateUI() {
    if (!currentAccount) {
        // User not connected
        document.getElementById('userAddress').innerText = 'Not Connected';
        document.getElementById('connectBtn').innerText = 'Connect Wallet';
        hideElement('adminPanel');
        return;
    }
    
    // Display connected address
    const shortAddress = `${currentAccount.slice(0, 6)}...${currentAccount.slice(-4)}`;
    document.getElementById('userAddress').innerText = shortAddress;
    document.getElementById('connectBtn').innerText = 'Connected';
    
    // Check if user is the owner (admin)
    try {
        const owner = await contract.methods.owner().call();
        isOwner = (currentAccount.toLowerCase() === owner.toLowerCase());
        
        if (isOwner) {
            showElement('adminPanel');
            console.log('Admin access granted');
        } else {
            hideElement('adminPanel');
        }
    } catch (error) {
        console.error('Error checking owner:', error);
    }
}

/* ========================================
   4. PAY REGISTRATION FEE (STUDENT)
   ======================================== */
async function payFee() {
    if (!currentAccount) {
        alert('Please connect your wallet first!');
        return;
    }
    
    try {
        // Show loading
        showLoading('payFeeBtn');
        
        // Convert 0.05 ETH to Wei
        const feeInWei = web3.utils.toWei('0.05', 'ether');
        
        // Check if already paid
        const hasPaid = await contract.methods.hasStudentPaidFee(currentAccount).call();
        if (hasPaid) {
            alert('You have already paid the registration fee!');
            hideLoading('payFeeBtn');
            return;
        }
        
        // Send transaction
        const receipt = await contract.methods.payRegistrationFee().send({
            from: currentAccount,
            value: feeInWei,
            gas: 300000
        });
        
        console.log('Payment receipt:', receipt);
        
        alert('✅ Payment Successful!\nTransaction Hash: ' + receipt.transactionHash);
        
    } catch (error) {
        console.error('Payment error:', error);
        alert('❌ Payment Failed: ' + error.message);
    } finally {
        hideLoading('payFeeBtn');
    }
}

/* ========================================
   5. GET CERTIFICATE (PUBLIC VIEW)
   ======================================== */
async function getCertificate() {
    const address = document.getElementById('searchAddress').value.trim();
    
    if (!address || !web3.utils.isAddress(address)) {
        alert('Please enter a valid Ethereum address!');
        return;
    }
    
    try {
        // Show loading
        showLoading('searchBtn');
        
        // Call contract to get certificate
        const cert = await contract.methods.getCertificate(address).call();
        
        if (cert.isIssued) {
            // Display certificate data
            document.getElementById('dispName').innerText = cert.studentName;
            document.getElementById('dispSpecialization').innerText = cert.specialization;
            document.getElementById('dispAvg').innerText = cert.academicAvg;
            document.getElementById('dispPresident').innerText = cert.presidentAddress;
            document.getElementById('dispDate').innerText = new Date(cert.timestamp * 1000).toLocaleDateString();
            document.getElementById('dispStudentAddress').innerText = address;
            
            // Show certificate card
            showElement('certificateCard');
            
            console.log('Certificate found:', cert);
        } else {
            alert('No certificate found for this address');
            hideElement('certificateCard');
        }
        
    } catch (error) {
        console.error('Error fetching certificate:', error);
        alert('Error: ' + error.message);
        hideElement('certificateCard');
    } finally {
        hideLoading('searchBtn');
    }
}

/* ========================================
   6. ISSUE CERTIFICATE (ADMIN ONLY)
   ======================================== */
async function issueCertificate() {
    if (!currentAccount || !isOwner) {
        alert('Only the admin can issue certificates!');
        return;
    }
    
    // Get form inputs
    const studentAddr = document.getElementById('studentAddress').value.trim();
    const studentName = document.getElementById('studentName').value.trim();
    const specialization = document.getElementById('specialization').value.trim();
    const avgGrade = document.getElementById('avgGrade').value.trim();
    
    // Validation
    if (!studentAddr || !web3.utils.isAddress(studentAddr)) {
        alert('Please enter a valid student Ethereum address!');
        return;
    }
    
    if (!studentName || !specialization || !avgGrade) {
        alert('Please fill in all fields!');
        return;
    }
    
    const avgNumber = parseFloat(avgGrade);
    if (isNaN(avgNumber) || avgNumber < 0 || avgNumber > 100) {
        alert('Please enter a valid average grade (0-100)!');
        return;
    }
    
    try {
        // Show loading
        showLoading('issueBtn');
        
        // Check if student has paid fee
        const hasPaid = await contract.methods.hasStudentPaidFee(studentAddr).call();
        if (!hasPaid) {
            alert('Student has not paid the registration fee yet!');
            hideLoading('issueBtn');
            return;
        }
        
        // Check if certificate already exists
        const hasCert = await contract.methods.hasCertificate(studentAddr).call();
        if (hasCert) {
            alert('Certificate already issued for this address!');
            hideLoading('issueBtn');
            return;
        }
        
        // Send transaction
        const receipt = await contract.methods.issueCertificate(
            studentAddr,
            studentName,
            specialization,
            Math.floor(avgNumber)
        ).send({
            from: currentAccount,
            gas: 500000
        });
        
        console.log('Certificate issued:', receipt);
        
        alert('✅ Certificate Issued Successfully!\nTransaction Hash: ' + receipt.transactionHash);
        
        // Clear form
        document.getElementById('issueForm').reset();
        
    } catch (error) {
        console.error('Error issuing certificate:', error);
        alert('❌ Failed to issue certificate: ' + error.message);
    } finally {
        hideLoading('issueBtn');
    }
}

/* ========================================
   7. LOAD FEE HISTORY (TRANSPARENCY)
   ======================================== */
async function loadFeeHistory() {
    try {
        showLoading('loadHistoryBtn');
        
        // Get all fee transactions
        const transactions = await contract.methods.getAllFeeTransactions().call();
        
        const tableBody = document.getElementById('feeTableBody');
        tableBody.innerHTML = ''; // Clear existing rows
        
        if (transactions.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">No transactions yet</td></tr>';
            return;
        }
        
        // Create table rows
        transactions.forEach((tx, index) => {
            const row = document.createElement('tr');
            
            const ethAmount = web3.utils.fromWei(tx.amount, 'ether');
            const date = new Date(tx.date * 1000).toLocaleString();
            const shortAddr = `${tx.payer.slice(0, 6)}...${tx.payer.slice(-4)}`;
            
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${shortAddr}</td>
                <td>${ethAmount} ETH</td>
                <td>${date}</td>
            `;
            
            tableBody.appendChild(row);
        });
        
        showElement('feeHistoryTable');
        
    } catch (error) {
        console.error('Error loading fee history:', error);
        alert('Error loading fee history: ' + error.message);
    } finally {
        hideLoading('loadHistoryBtn');
    }
}

/* ========================================
   8. LOAD MY FEE TRANSACTIONS (STUDENT)
   ======================================== */
async function loadMyTransactions() {
    if (!currentAccount) {
        alert('Please connect your wallet first!');
        return;
    }
    
    try {
        showLoading('loadMyTxBtn');
        
        const myTransactions = await contract.methods.getMyFeeTransactions().call({
            from: currentAccount
        });
        
        const tableBody = document.getElementById('myTxTableBody');
        tableBody.innerHTML = '';
        
        if (myTransactions.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="3" style="text-align: center;">No transactions found</td></tr>';
            return;
        }
        
        myTransactions.forEach((tx, index) => {
            const row = document.createElement('tr');
            const ethAmount = web3.utils.fromWei(tx.amount, 'ether');
            const date = new Date(tx.date * 1000).toLocaleString();
            
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${ethAmount} ETH</td>
                <td>${date}</td>
            `;
            
            tableBody.appendChild(row);
        });
        
        showElement('myTransactionsTable');
        
    } catch (error) {
        console.error('Error loading my transactions:', error);
        alert('Error: ' + error.message);
    } finally {
        hideLoading('loadMyTxBtn');
    }
}

/* ========================================
   9. WITHDRAW FEES (ADMIN ONLY)
   ======================================== */
async function withdrawFees() {
    if (!currentAccount || !isOwner) {
        alert('Only the admin can withdraw fees!');
        return;
    }
    
    if (!confirm('Are you sure you want to withdraw all fees?')) {
        return;
    }
    
    try {
        showLoading('withdrawBtn');
        
        const balance = await contract.methods.getContractBalance().call();
        const ethBalance = web3.utils.fromWei(balance, 'ether');
        
        if (parseFloat(ethBalance) === 0) {
            alert('No funds to withdraw!');
            hideLoading('withdrawBtn');
            return;
        }
        
        const receipt = await contract.methods.withdrawFees().send({
            from: currentAccount,
            gas: 200000
        });
        
        console.log('Withdrawal receipt:', receipt);
        
        alert(`✅ Successfully withdrew ${ethBalance} ETH!\nTransaction Hash: ${receipt.transactionHash}`);
        
        // Update contract balance display
        await updateContractBalance();
        
    } catch (error) {
        console.error('Error withdrawing fees:', error);
        alert('❌ Withdrawal failed: ' + error.message);
    } finally {
        hideLoading('withdrawBtn');
    }
}

/* ========================================
   10. UPDATE CONTRACT BALANCE DISPLAY
   ======================================== */
async function updateContractBalance() {
    try {
        const balance = await contract.methods.getContractBalance().call();
        const ethBalance = web3.utils.fromWei(balance, 'ether');
        document.getElementById('contractBalance').innerText = `${ethBalance} ETH`;
    } catch (error) {
        console.error('Error fetching contract balance:', error);
    }
}

/* ========================================
   11. DOWNLOAD CERTIFICATE AS IMAGE
   ======================================== */
function downloadCertificate() {
    // This function would need html2canvas library
    // For now, we'll show how to implement it
    
    const certificateCard = document.getElementById('certificateCard');
    
    if (!certificateCard || certificateCard.style.display === 'none') {
        alert('No certificate to download!');
        return;
    }
    
    // Using html2canvas (you need to include this library in your HTML)
    if (typeof html2canvas !== 'undefined') {
        html2canvas(certificateCard).then(canvas => {
            const link = document.createElement('a');
            link.download = 'certificate.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    } else {
        alert('Please include html2canvas library to download certificates');
    }
}

/* ========================================
   12. UTILITY FUNCTIONS
   ======================================== */
function showElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) element.style.display = 'block';
}

function hideElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) element.style.display = 'none';
}

function showLoading(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.disabled = true;
        button.dataset.originalText = button.innerText;
        button.innerText = 'Loading...';
    }
}

function hideLoading(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.disabled = false;
        if (button.dataset.originalText) {
            button.innerText = button.dataset.originalText;
        }
    }
}

/* ========================================
   13. EVENT LISTENERS FOR ENTER KEY
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Allow pressing Enter in search field
    const searchInput = document.getElementById('searchAddress');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                getCertificate();
            }
        });
    }
});


