document.addEventListener('DOMContentLoaded', () => {
    // 初始化游戏
    initGame();
    
    // 事件监听器
    document.getElementById('new-game-btn').addEventListener('click', newGame);
    document.getElementById('hint-btn').addEventListener('click', showHint);
    document.getElementById('answer-btn').addEventListener('click', showAnswer);
    document.getElementById('check-btn').addEventListener('click', checkAnswer);
    document.getElementById('expression').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
});

// 游戏状态
let currentCards = [];
let solution = [];
let timerInterval;
let seconds = 0;
let gameHistory = [];

// 初始化游戏
function initGame() {
    newGame();
    startTimer();
    loadGameHistory();
}

// 开始新游戏
function newGame() {
    resetTimer();
    generateCards();
    renderCards();
    clearInput();
    hideMessage();
    
    // 查找解决方案
    solution = findSolution(currentCards);
}

// 生成四张随机卡牌
function generateCards() {
    currentCards = [];
    for (let i = 0; i < 4; i++) {
        currentCards.push(Math.floor(Math.random() * 10) + 1);
    }
}

// 渲染卡牌
function renderCards() {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';
    
    currentCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.textContent = card;
        cardElement.id = `card-${index}`;
        
        // 根据不同的卡牌值设置不同的颜色
        if (card <= 3) {
            cardElement.classList.add('card-low');
        } else if (card <= 7) {
            cardElement.classList.add('card-medium');
        } else {
            cardElement.classList.add('card-high');
        }
        
        cardsContainer.appendChild(cardElement);
    });
}

// 检查答案
function checkAnswer() {
    const expression = document.getElementById('expression').value;
    
    if (!expression) {
        showMessage('请输入计算式');
        return;
    }
    
    // 检查是否使用了所有卡牌
    const usedCards = extractNumbers(expression);
    if (!arraysEqual(usedCards.sort(), currentCards.sort())) {
        showMessage('请使用所有卡牌，且每张牌只能使用一次');
        return;
    }
    
    try {
        // 计算表达式的结果
        const result = eval(expression);
        
        if (Math.abs(result - 24) < 0.0001) {
            showMessage('正确！你成功计算出24点！', 'success');
            stopTimer();
            addToHistory(currentCards, expression, true);
        } else {
            showMessage(`结果是 ${result}，不是24，请再试一次`, 'error');
        }
    } catch (e) {
        showMessage('计算式格式错误，请检查括号和运算符', 'error');
    }
}

// 从表达式中提取数字
function extractNumbers(expression) {
    const regex = /\d+/g;
    const matches = expression.match(regex);
    return matches ? matches.map(Number) : [];
}

// 比较两个数组是否相等
function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

// 显示提示
function showHint() {
    if (!solution || solution.length === 0) {
        showMessage('这组数字可能无解，试试新游戏吧');
        return;
    }
    
    const hint = solution[0];
    const partialExpression = hint.substring(0, hint.length / 2);
    showMessage(`提示: 尝试使用 ${partialExpression}...`);
}

// 显示答案
function showAnswer() {
    if (!solution || solution.length === 0) {
        showMessage('这组数字可能无解，试试新游戏吧');
        return;
    }
    
    showMessage(`答案: ${solution[0]}`);
    document.getElementById('expression').value = solution[0];
    addToHistory(currentCards, solution[0], false);
}

// 查找24点解决方案
function findSolution(cards) {
    // 所有可能的运算符
    const operators = ['+', '-', '*', '/'];
    
    // 所有可能的数字排列
    const permutations = getPermutations(cards);
    
    // 对每种排列尝试所有可能的运算符组合和括号位置
    for (const perm of permutations) {
        for (const op1 of operators) {
            for (const op2 of operators) {
                for (const op3 of operators) {
                    // 尝试不同的括号组合
                    const expressions = [
                        `${perm[0]}${op1}${perm[1]}${op2}${perm[2]}${op3}${perm[3]}`,
                        `(${perm[0]}${op1}${perm[1]})${op2}${perm[2]}${op3}${perm[3]}`,
                        `${perm[0]}${op1}(${perm[1]}${op2}${perm[2]})${op3}${perm[3]}`,
                        `${perm[0]}${op1}${perm[1]}${op2}(${perm[2]}${op3}${perm[3]})`,
                        `(${perm[0]}${op1}${perm[1]})${op2}(${perm[2]}${op3}${perm[3]})`,
                        `((${perm[0]}${op1}${perm[1]})${op2}${perm[2]})${op3}${perm[3]}`,
                        `(${perm[0]}${op1}(${perm[1]}${op2}${perm[2]}))${op3}${perm[3]}`,
                        `${perm[0]}${op1}((${perm[1]}${op2}${perm[2]})${op3}${perm[3]})`,
                        `${perm[0]}${op1}(${perm[1]}${op2}(${perm[2]}${op3}${perm[3]}))`
                    ];
                    
                    for (const expr of expressions) {
                        try {
                            const result = eval(expr);
                            if (Math.abs(result - 24) < 0.0001) {
                                // 返回找到的第一个解
                                return [expr];
                            }
                        } catch (e) {
                            // 忽略计算错误，继续尝试其他表达式
                        }
                    }
                }
            }
        }
    }
    
    return []; // 没有找到解
}

// 获取数组的所有排列
function getPermutations(array) {
    const result = [];
    
    if (array.length === 1) {
        return [array.slice()];
    }
    
    for (let i = 0; i < array.length; i++) {
        const current = array[i];
        const remaining = [...array.slice(0, i), ...array.slice(i + 1)];
        const remainingPermutations = getPermutations(remaining);
        
        for (const perm of remainingPermutations) {
            result.push([current, ...perm]);
        }
    }
    
    return result;
}

// 清空输入
function clearInput() {
    document.getElementById('expression').value = '';
}

// 显示消息
function showMessage(msg, type = 'info') {
    const messageEl = document.getElementById('message');
    messageEl.textContent = msg;
    messageEl.className = 'message';
    messageEl.classList.add(type);
    messageEl.style.display = 'block';
}

// 隐藏消息
function hideMessage() {
    const messageEl = document.getElementById('message');
    messageEl.style.display = 'none';
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

// 游戏历史功能
function addToHistory(cards, expression, solved) {
    const historyItem = {
        cards: [...cards],
        expression,
        solved,
        time: new Date().toLocaleTimeString()
    };
    
    gameHistory.unshift(historyItem);
    
    // 限制历史记录数量
    if (gameHistory.length > 10) {
        gameHistory.pop();
    }
    
    // 保存到本地存储
    localStorage.setItem('game24History', JSON.stringify(gameHistory));
    
    // 更新显示
    renderHistory();
}

function loadGameHistory() {
    const savedHistory = localStorage.getItem('game24History');
    if (savedHistory) {
        gameHistory = JSON.parse(savedHistory);
        renderHistory();
    }
}

function renderHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    
    if (gameHistory.length === 0) {
        historyList.innerHTML = '<p>暂无游戏记录</p>';
        return;
    }
    
    gameHistory.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        const cardsText = item.cards.join(', ');
        const statusIcon = item.solved ? '✅' : '❌';
        
        historyItem.innerHTML = `
            <div class="history-cards">[${cardsText}]</div>
            <div class="history-expression">${item.expression}</div>
            <div class="history-status">${statusIcon} ${item.time}</div>
        `;
        
        historyList.appendChild(historyItem);
    });
}

// 返回主页
function goBack() {
    window.location.href = 'index.html';
}