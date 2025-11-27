













// Bài 3: Game Đoán Số
let secretNumber;
let attempts;
let gameActive = true; // Biến kiểm soát trạng thái game

// 1. Logic generate random (1-100)
const generateRandomNumber = () => {
    // Math.random() [0, 1) * 100 = [0, 100)
    // Math.floor(...) = [0, 99]
    // + 1 = [1, 100]
    return Math.floor(Math.random() * 100) + 1;
};

// Khởi tạo trò chơi
const startNewGame = () => {
    secretNumber = generateRandomNumber();
    attempts = 0;
    gameActive = true;

    // Reset UI
    document.getElementById('guessInput').value = '';
    document.getElementById('message').textContent = 'Bắt đầu đoán nào!';
    document.getElementById('countDisplay').textContent = attempts;
    document.getElementById('submitGuessBtn').disabled = false;
    document.getElementById('newGameBtn').style.display = 'none';
    document.getElementById('confettiContainer').innerHTML = ''; // Xóa confetti cũ
    document.getElementById('guessInput').focus(); // Tự động focus vào input
    
    // Console log số bí mật (chỉ cho mục đích kiểm tra)
    console.log('Số bí mật (DEBUG):', secretNumber); 
};

// Hiển thị Confetti Animation
const triggerConfetti = (count) => {
    const container = document.getElementById('confettiContainer');
    // Danh sách màu ngẫu nhiên
    const colors = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff', '#f90', '#09f'];

    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Ngẫu nhiên vị trí bắt đầu (từ trên xuống, trải rộng)
        const xStart = Math.random() * 100 + 'vw';
        const yStart = Math.random() * -50 + 'px'; // Bắt đầu từ ngoài màn hình phía trên
        
        // Ngẫu nhiên vị trí kết thúc (rơi rộng hơn)
        const xEnd = Math.random() * 200 - 50 + 'vw'; 

        // Gán màu và biến CSS
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.setProperty('--x-start', xStart);
        confetti.style.setProperty('--y-start', yStart);
        confetti.style.setProperty('--x-end', xEnd);

        container.appendChild(confetti);
        
        // Tối ưu DOM: Xóa confetti sau khi animation kết thúc
        setTimeout(() => confetti.remove(), 3000); 
    }
};

// Xử lý logic đoán
const checkGuess = () => {
    if (!gameActive) return;

    const inputElement = document.getElementById('guessInput');
    
    // 2. Logic xử lý input để tránh lỗi (validation)
    const guess = parseInt(inputElement.value);
    
    // Kiểm tra đầu vào (validation)
    if (isNaN(guess) || guess < 1 || guess > 100) {
        document.getElementById('message').textContent = '⚠️ Vui lòng nhập một số nguyên hợp lệ từ 1 đến 100.';
        inputElement.value = ''; 
        inputElement.focus();
        return; // Dừng hàm nếu input lỗi
    }

    attempts++;
    document.getElementById('countDisplay').textContent = attempts;

    let message = '';
    
    if (guess === secretNumber) {
        message = `🎉 CHÚC MỪNG! Bạn đã đoán đúng số ${secretNumber} sau ${attempts} lần thử!`;
        gameActive = false; // Ngừng game
        document.getElementById('submitGuessBtn').disabled = true;
        document.getElementById('newGameBtn').style.display = 'block';
        
        // Kích hoạt Confetti
        triggerConfetti(50);
    } else if (guess < secretNumber) {
        message = 'Quá thấp! Thử lại.';
    } else {
        message = 'Quá cao! Thử lại.';
    }

    document.getElementById('message').textContent = message;
    inputElement.value = ''; // Xóa input sau khi đoán
    inputElement.focus();
};

// Khởi tạo Game
function initGuessGame() {
    startNewGame();

    const submitBtn = document.getElementById('submitGuessBtn');
    const newGameBtn = document.getElementById('newGameBtn');
    const inputElement = document.getElementById('guessInput');

    if (submitBtn) {
        submitBtn.addEventListener('click', checkGuess);
    }
    if (newGameBtn) {
        newGameBtn.addEventListener('click', startNewGame);
    }
    if (inputElement) {
        inputElement.addEventListener('keypress', (e) => {
            // Cho phép người dùng nhấn Enter để đoán
            if (e.key === 'Enter') {
                checkGuess();
            }
        });
    }
}
