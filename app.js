// Alamat kontrak dan ABI
const contractAddress = "0x8bb4A2d0c46f3e73A90f7E427Fe68d98A2643cA3"; // Ganti dengan alamat kontrak sebenarnya
const contractABI = [[{"inputs":[{"internalType":"address","name":"_logic","type":"address"},{"internalType":"address","name":"admin_","type":"address"},{"internalType":"bytes","name":"_data","type":"bytes"}],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beacon","type":"address"}],"name":"BeaconUpgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"stateMutability":"payable","type":"fallback"},{"stateMutability":"payable","type":"receive"}]]; // Tempelkan ABI kontrak di sini

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

            // Debugging: Cek ABI dan Alamat Kontrak
            console.log("ABI:", contractABI);
            console.log("Alamat kontrak:", contractAddress);

            // Inisialisasi kontrak
            contract = new web3.eth.Contract(contractABI, contractAddress);

            // Debugging: Cek apakah contract.methods berfungsi dan menampilkan metode yang ada
            console.log("Contract methods available:", contract.methods);
        } catch (error) {
            document.getElementById("status").innerText = "Gagal menghubungkan wallet!";
            console.error(error);
        }
    } else {
        alert("Metamask tidak ditemukan!");
    }
}

// Fungsi untuk menulis ke kontrak (memanggil fungsi `release`)
async function writeContract() {
    const tokenAddress = document.getElementById("inputValue").value;
    if (!tokenAddress) {
        alert("Masukkan alamat token!");
        return;
    }

    // Debugging: Cek nilai tokenAddress dan akun pengguna
    console.log("Token Address:", tokenAddress);
    console.log("User Account:", userAccount);

    try {
        // Memanggil fungsi release di smart contract
        const result = await contract.methods.release(tokenAddress).send({ from: userAccount });
        document.getElementById("status").innerText = "Transaksi berhasil: " + result.transactionHash;
        console.log("Transaksi berhasil:", result);
    } catch (error) {
        document.getElementById("status").innerText = "Gagal mengirim transaksi: " + error.message;
        console.error("Error saat mengirim transaksi:", error);
    }
}
