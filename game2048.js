document.addEventListener('DOMContentLoaded', () => {
    initGame();
    setupEventListeners();
});

// 游戏状态
let board = [];
let score = 0;
let bestScore = localStorage.getItem('bestScore') || 0;
let hasWon = false;

// 初始化游戏
function initGame() {
    // 创建4x4的游戏板
    board = Array(4).fill().map(() => Array(4).fill(0));
    score = 0;
    hasWon = false;
    
    // 更新最高分显示
    document.getElementById('best-score').textContent = bestScore;
    
    // 添加两个初始数字
    addNewTile();
    addNewTile();
    
    // 更新界面
    updateDisplay();
}

// 设置事件监听器
function setupEventListeners() {
    // 键盘事件
    document.addEventListener('keydown', handleKeyPress);
    
    // 方向键按钮事件
    document.getElementById('up-button').addEventListener('click', () => move('up'));
    document.getElementById('down-button').addEventListener('click', () => move('down'));
    document.getElementById('left-button').addEventListener('click', () => move('left'));
    document.getElementById('right-button').addEventListener('click', () => move('right'));
    
    // 触摸事件（移动设备）
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
        if (!touchStartX || !touchStartY) return;
        
        let touchEndX = e.changedTouches[0].clientX;
        let touchEndY = e.changedTouches[0].clientY;
        
        let dx = touchEndX - touchStartX;
        let dy = touchEndY - touchStartY;
        
        // 判断滑动方向
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) {
                move('right');
            } else {
                move('left');
            }
        } else {
            if (dy > 0) {
                move('down');
            } else {
                move('up');
            }
        }
    });
}

// 处理键盘按键
function handleKeyPress(e) {
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        move('up');
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        move('down');
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        move('left');
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        move('right');
    }
}

// 移动操作
function move(direction) {
    let moved = false;
    const previousBoard = board.map(row => [...row]);
    
    if (direction === 'left') {
        for (let i = 0; i < 4; i++) {
            const row = board[i].filter(val => val !== 0);
            const merged = mergeTiles(row);
            board[i] = merged.concat(Array(4 - merged.length).fill(0));
        }
    } else if (direction === 'right') {
        for (let i = 0; i < 4; i++) {
            const row = board[i].filter(val => val !== 0);
            const merged = mergeTiles(row.reverse()).reverse();
            board[i] = Array(4 - merged.length).fill(0).concat(merged);
        }
    } else if (direction === 'up') {
        for (let j = 0; j < 4; j++) {
            const column = [];
            for (let i = 0; i < 4; i++) {
                if (board[i][j] !== 0) column.push(board[i][j]);
            }
            const merged = mergeTiles(column);
            for (let i = 0; i < 4; i++) {
                board[i][j] = merged[i] || 0;
            }
        }
    } else if (direction === 'down') {
        for (let j = 0; j < 4; j++) {
            const column = [];
            for (let i = 0; i < 4; i++) {
                if (board[i][j] !== 0) column.push(board[i][j]);
            }
            const merged = mergeTiles(column.reverse()).reverse();
            for (let i = 0; i < 4; i++) {
                board[i][j] = merged[3 - i] || 0;
            }
        }
    }
    
    // 检查是否有移动
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (previousBoard[i][j] !== board[i][j]) {
                moved = true;
                break;
            }
        }
    }
    
    if (moved) {
        addNewTile();
        updateDisplay();
        
        // 检查游戏是否结束
        if (isGameOver()) {
            setTimeout(() => {
                showMessage(`游戏结束！得分: ${score}`);
            }, 300);
        }
        
        // 检查是否获胜
        if (!hasWon && hasWinningTile()) {
            hasWon = true;
            setTimeout(() => {
                showMessage(`恭喜！您达到了1024！得分: ${score}`);
            }, 300);
        }
    }
}

// 合并相邻相同的数字
function mergeTiles(tiles) {
    const merged = [];
    let i = 0;
    
    while (i < tiles.length) {
        if (i < tiles.length - 1 && tiles[i] === tiles[i + 1]) {
            // 合并相同的数字
            const mergedValue = tiles[i] * 2;
            merged.push(mergedValue);
            score += mergedValue;
            i += 2;
        } else {
            merged.push(tiles[i]);
            i++;
        }
    }
    
    return merged;
}

// 添加新的数字方块
function addNewTile() {
    const emptyCells = [];
    
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 0) {
                emptyCells.push({row: i, col: j});
            }
        }
    }
    
    if (emptyCells.length > 0) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        // 90%概率出现2，10%概率出现4
        board[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
    }
}

// 更新显示
function updateDisplay() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    
    // 创建游戏格子
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const cell = document.createElement('div');
            cell.className = 'game-cell';
            
            if (board[i][j] !== 0) {
                cell.textContent = board[i][j];
                cell.classList.add(`tile-${board[i][j]}`);
            }
            
            gameBoard.appendChild(cell);
        }
    }
    
    // 更新分数
    document.getElementById('score').textContent = score;
    
    // 更新最高分
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('bestScore', bestScore);
        document.getElementById('best-score').textContent = bestScore;
    }
}

// 检查游戏是否结束
function isGameOver() {
    // 检查是否有空格
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 0) return false;
        }
    }
    
    // 检查是否有可合并的相邻格子
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const current = board[i][j];
            
            // 检查右边
            if (j < 3 && current === board[i][j + 1]) return false;
            
            // 检查下边
            if (i < 3 && current === board[i + 1][j]) return false;
        }
    }
    
    return true;
}

// 检查是否有获胜的方块（达到1024）
function hasWinningTile() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] >= 1024) return true;
        }
    }
    return false;
}

// 开始新游戏
function newGame() {
    initGame();
}

// 返回主页
function goBack() {
    window.location.href = 'index.html';
}

// 显示消息
function showMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        document.body.removeChild(messageDiv);
    }, 3000);
}