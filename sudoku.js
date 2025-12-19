document.addEventListener('DOMContentLoaded', () => {
    // 初始化游戏
    initGame();
    
    // 事件监听器
    document.getElementById('new-game-btn').addEventListener('click', newGame);
    document.getElementById('check-btn').addEventListener('click', checkSolution);
    document.getElementById('hint-btn').addEventListener('click', showHint);
    document.getElementById('difficulty').addEventListener('change', newGame);
});

// 游戏状态
let currentPuzzle = [];
let solution = [];
let timerInterval;
let seconds = 0;

// 初始化游戏
function initGame() {
    createBoard();
    newGame();
    startTimer();
}

// 创建游戏板
function createBoard() {
    const board = document.getElementById('sudoku-board');
    board.innerHTML = '';
    
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.className = 'sudoku-cell';
            cell.id = `cell-${i}-${j}`;
            
            // 添加粗边框以划分3x3的方块
            if (i % 3 === 0 && i !== 0) cell.classList.add('border-top');
            if (j % 3 === 0 && j !== 0) cell.classList.add('border-left');
            
            cell.addEventListener('click', () => selectCell(i, j));
            cell.addEventListener('input', (e) => handleInput(i, j, e));
            board.appendChild(cell);
        }
    }
    
    // 添加数字选择器
    const numberPad = document.createElement('div');
    numberPad.className = 'number-pad';
    
    for (let i = 1; i <= 9; i++) {
        const numBtn = document.createElement('button');
        numBtn.className = 'num-btn';
        numBtn.textContent = i;
        numBtn.addEventListener('click', () => fillSelectedCell(i));
        numberPad.appendChild(numBtn);
    }
    
    const clearBtn = document.createElement('button');
    clearBtn.className = 'num-btn clear';
    clearBtn.textContent = '清空';
    clearBtn.addEventListener('click', clearSelectedCell);
    numberPad.appendChild(clearBtn);
    
    board.appendChild(numberPad);
}

// 开始新游戏
function newGame() {
    const difficulty = document.getElementById('difficulty').value;
    resetTimer();
    
    // 根据难度生成数独谜题
    generatePuzzle(difficulty);
    
    // 渲染游戏板
    renderBoard();
    
    // 隐藏消息
    hideMessage();
}

// 生成数独谜题
function generatePuzzle(difficulty) {
    // 首先生成一个完整的数独解
    solution = generateCompleteSudoku();
    
    // 根据难度移除一些数字
    currentPuzzle = JSON.parse(JSON.stringify(solution)); // 深拷贝
    
    let cellsToRemove;
    switch (difficulty) {
        case 'easy':
            cellsToRemove = 35;
            break;
        case 'medium':
            cellsToRemove = 45;
            break;
        case 'hard':
            cellsToRemove = 55;
            break;
        default:
            cellsToRemove = 35;
    }
    
    // 随机移除指定数量的数字
    let removed = 0;
    while (removed < cellsToRemove) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        
        if (currentPuzzle[row][col] !== 0) {
            currentPuzzle[row][col] = 0;
            removed++;
        }
    }
}

// 生成完整的数独解
function generateCompleteSudoku() {
    // 简单的方法：使用预设的数独解
    const solutions = [
        // 预设的数独解
        [
            [5,3,4,6,7,8,9,1,2],
            [6,7,2,1,9,5,3,4,8],
            [1,9,8,3,4,2,5,6,7],
            [8,5,9,7,6,1,4,2,3],
            [4,2,6,8,5,3,7,9,1],
            [7,1,3,9,2,4,8,5,6],
            [9,6,1,5,3,7,2,8,4],
            [2,8,7,4,1,9,6,3,5],
            [3,4,5,2,8,6,1,7,9]
        ],
        [
            [1,2,3,4,5,6,7,8,9],
            [4,5,6,7,8,9,1,2,3],
            [7,8,9,1,2,3,4,5,6],
            [2,3,4,5,6,7,8,9,1],
            [5,6,7,8,9,1,2,3,4],
            [8,9,1,2,3,4,5,6,7],
            [3,4,5,6,7,8,9,1,2],
            [6,7,8,9,1,2,3,4,5],
            [9,1,2,3,4,5,6,7,8]
        ]
    ];
    
    // 随机选择一个解
    const randomIndex = Math.floor(Math.random() * solutions.length);
    return solutions[randomIndex];
}

// 渲染游戏板
function renderBoard() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            cell.textContent = '';
            cell.classList.remove('selected', 'fixed', 'error', 'hint');
            
            if (currentPuzzle[i][j] !== 0) {
                cell.textContent = currentPuzzle[i][j];
                cell.classList.add('fixed'); // 固定的数字，不可修改
            }
        }
    }
}

// 选择单元格
let selectedCell = null;
function selectCell(row, col) {
    // 如果是固定的数字，不能选择
    if (currentPuzzle[row][col] !== 0 && document.getElementById(`cell-${row}-${col}`).classList.contains('fixed')) {
        return;
    }
    
    // 清除之前的选择
    document.querySelectorAll('.selected').forEach(cell => {
        cell.classList.remove('selected');
    });
    
    // 选择当前单元格
    selectedCell = { row, col };
    document.getElementById(`cell-${row}-${col}`).classList.add('selected');
}

// 填充选中的单元格
function fillSelectedCell(num) {
    if (!selectedCell) return;
    
    const { row, col } = selectedCell;
    if (currentPuzzle[row][col] !== 0 && document.getElementById(`cell-${row}-${col}`).classList.contains('fixed')) {
        return;
    }
    
    currentPuzzle[row][col] = num;
    document.getElementById(`cell-${row}-${col}`).textContent = num;
    
    // 检查是否正确
    if (num !== solution[row][col]) {
        document.getElementById(`cell-${row}-${col}`).classList.add('error');
    } else {
        document.getElementById(`cell-${row}-${col}`).classList.remove('error');
    }
    
    // 检查是否完成
    checkCompletion();
}

// 清空选中的单元格
function clearSelectedCell() {
    if (!selectedCell) return;
    
    const { row, col } = selectedCell;
    if (currentPuzzle[row][col] !== 0 && document.getElementById(`cell-${row}-${col}`).classList.contains('fixed')) {
        return;
    }
    
    currentPuzzle[row][col] = 0;
    document.getElementById(`cell-${row}-${col}`).textContent = '';
    document.getElementById(`cell-${row}-${col}`).classList.remove('error');
}

// 处理输入
function handleInput(row, col, e) {
    const value = e.target.textContent;
    if (value && !isNaN(value) && value >= 1 && value <= 9) {
        fillSelectedCell(parseInt(value));
    } else {
        clearSelectedCell();
    }
}

// 显示提示
function showHint() {
    if (!selectedCell) {
        showMessage('请先选择一个单元格');
        return;
    }
    
    const { row, col } = selectedCell;
    if (currentPuzzle[row][col] !== 0 && document.getElementById(`cell-${row}-${col}`).classList.contains('fixed')) {
        showMessage('这是一个固定的数字');
        return;
    }
    
    // 显示正确答案
    currentPuzzle[row][col] = solution[row][col];
    document.getElementById(`cell-${row}-${col}`).textContent = solution[row][col];
    document.getElementById(`cell-${row}-${col}`).classList.remove('error');
    document.getElementById(`cell-${row}-${col}`).classList.add('hint');
    
    // 检查是否完成
    checkCompletion();
}

// 检查解决方案
function checkSolution() {
    let hasError = false;
    
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            
            if (currentPuzzle[i][j] !== 0) {
                if (currentPuzzle[i][j] !== solution[i][j]) {
                    cell.classList.add('error');
                    hasError = true;
                } else {
                    cell.classList.remove('error');
                }
            }
        }
    }
    
    if (hasError) {
        showMessage('有些数字不正确，已标记为红色');
    } else {
        const isEmpty = currentPuzzle.some(row => row.some(cell => cell === 0));
        if (isEmpty) {
            showMessage('目前没有错误，但还没有完成');
        } else {
            showMessage('恭喜你，完成了数独！');
        }
    }
}

// 检查是否完成
function checkCompletion() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (currentPuzzle[i][j] !== solution[i][j]) {
                return false;
            }
        }
    }
    
    showMessage('恭喜你，完成了数独！');
    stopTimer();
    return true;
}

// 计时器功能
function startTimer() {
    resetTimer();
    timerInterval = setInterval(() => {
        seconds++;
        updateTimerDisplay();
    }, 1000);
}

function resetTimer() {
    stopTimer();
    seconds = 0;
    updateTimerDisplay();
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
}

function updateTimerDisplay() {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    document.getElementById('timer').textContent = 
        `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// 显示消息
function showMessage(msg) {
    const messageEl = document.getElementById('message');
    messageEl.textContent = msg;
    messageEl.style.display = 'block';
}

// 隐藏消息
function hideMessage() {
    const messageEl = document.getElementById('message');
    messageEl.style.display = 'none';
}

// 返回主页
function goBack() {
    window.location.href = 'index.html';
}