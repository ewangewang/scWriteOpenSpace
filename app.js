
// Alamat kontrak dan ABI
const contractAddress = "0x8bb4a2d0c46f3e73a90f7e427fe68d98a2643ca3"; // Ganti dengan alamat kontrak
const contractABI = [{"inputs":[{"internalType":"address","name":"_logic","type":"address"},{"internalType":"address","name":"admin_","type":"address"},{"internalType":"bytes","name":"_data","type":"bytes"}],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beacon","type":"address"}],"name":"BeaconUpgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"stateMutability":"payable","type":"fallback"},{"stateMutability":"payable","type":"receive"}]; // Masukkan ABI di sini

let web3;
let contract;
let userAccount;

// Fungsi untuk menghubungkan wallet
async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            document.getElementById("status").innerText = "Wallet terhubung: " + userAccount;
            contract = new web3.eth.Contract(contractABI, contractAddress);
        } catch (error) {
            document.getElementById("status").innerText = "Gagal menghubungkan wallet!";
            console.error(error);
        }
    } else {
        alert("Metamask tidak ditemukan!");
    }
}

// Fungsi untuk menulis kontrak
async function writeContract() {
    const tokenAddress = document.getElementById("inputValue").value;
    if (!tokenAddress) {
        alert("Masukkan alamat token!");
        return;
    }
    try {
        console.log(contract.methods)
        const result = await contract.methods.release(tokenAddress).send({ from: userAccount });
        document.getElementById("status").innerText = "Transaksi berhasil: " + result.transactionHash;
    } catch (error) {
        document.getElementById("status").innerText = "Gagal mengirim transaksi!";
        console.error(error);
    }
}

