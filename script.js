document.addEventListener('DOMContentLoaded', () => {
    const appSelect = document.getElementById('app-select');
    const goButton = document.getElementById('go-button');
    
    goButton.addEventListener('click', () => {
        const selectedApp = appSelect.value;
        
        if (selectedApp === 'game-2048') {
            window.location.href = 'game2048.html';
        } else if (selectedApp === 'divination') {
            window.location.href = 'divination.html';
        } else if (selectedApp === 'sudoku') {
            window.location.href = 'sudoku.html';
        } else if (selectedApp === 'game24') {
            window.location.href = 'game24.html';
        } else if (selectedApp === 'detective') {
            window.location.href = 'detective.html';
        } else if (selectedApp === 'surprise') {
            window.location.href = 'surprise.html';
        } else {
            showMessage('请选择一个应用');
        }
    });
    
    function showMessage(message) {
        // 创建消息提示元素
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);
        
        // 3秒后自动移除消息
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 3000);
    }
});