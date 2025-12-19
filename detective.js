document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.getElementById('back-button');
    const caseSelect = document.getElementById('case-select');
    const startButton = document.getElementById('start-case');
    const caseContent = document.getElementById('case-content');
    const suspectsContainer = document.getElementById('suspects-container');
    const cluesContainer = document.getElementById('clues-container');
    const resultContainer = document.getElementById('result-container');
    const hintButton = document.getElementById('hint-button');
    const hintText = document.getElementById('hint-text');
    
    // 案件数据
    const cases = [
        {
            title: "博物馆失窃案",
            description: `昨晚10点至凌晨2点期间，市博物馆的珍贵钻石"星辰之泪"被盗。
            
博物馆安保严密，只有馆长、副馆长、保安队长和清洁工四人拥有进入展厅的权限。
            
据监控显示，昨晚10点保安队长巡逻后离开，10:30副馆长离开，11:00清洁工进入，11:30离开，馆长一直工作到午夜才离开。
            
今早发现钻石被盗，保险柜有被技术开启的痕迹，展厅内没有明显搏斗痕迹。
            
警方调查发现，副馆长最近负债累累，保安队长有赌博记录，清洁工的儿子需要大笔医疗费，馆长最近购买了高额保险。`,
            suspects: [
                { name: "张馆长", description: "博物馆馆长，工作狂，一直工作到午夜", isGuilty: false, reason: "馆长虽然购买了保险，但没有技术背景打开保险柜，且他一直工作到午夜，有机会但不是最佳时间。" },
                { name: "李副馆长", description: "副馆长，最近负债累累，10:30离开", isGuilty: false, reason: "副馆长确实有经济动机，但他在清洁工之前离开，且缺乏开锁技术。" },
                { name: "王保安队长", description: "保安队长，有赌博记录，10点离开", isGuilty: false, reason: "保安队长最早离开，虽然有赌博记录，但不太可能返回而不被发现。" },
                { name: "赵清洁工", description: "清洁工，儿子需要医疗费，11:00-11:30在展厅", isGuilty: true, reason: "清洁工的儿子需要医疗费提供了强烈动机。他在11:00-11:30期间独自在展厅，有足够时间作案。他作为清洁工，对博物馆布局和安保系统了如指掌，很可能掌握开锁技术。保险柜被技术性开启也支持这一推断。" }
            ],
            hints: [
                "谁在展厅里独自待了30分钟？",
                "技术性开启保险柜需要什么技能？",
                "谁最了解博物馆的安保系统？"
            ]
        },
        {
            title: "庄园密室杀人案",
            description: `昨晚，富商陈先生被发现死在自己封闭的书房内。
            
书房门窗从内部反锁，没有强行闯入的痕迹。法医鉴定死亡时间为晚上8-10点。
            
现场发现一杯未喝完的咖啡，检测含有安眠药成分。
            
有四人在案发时间段内可能在庄园：陈太太、陈先生的商业伙伴、管家和私人医生。
            
陈太太声称与丈夫争吵后一直待在卧室；商业伙伴称在客厅等候；管家称在厨房准备宵夜；医生称在客房休息。
            
调查发现，陈先生最近打算更改遗嘱，剥夺商业伙伴的继承权。管家最近被发现偷拿庄园物品。陈太太有外遇。医生被查出曾挪用公款。`,
            suspects: [
                { name: "陈太太", description: "与丈夫争吵后一直待在卧室", isGuilty: false, reason: "陈太太虽然有外遇，但夫妻争吵后立即被怀疑，反而可能不是凶手。她没有机会进入密室放置安眠药。" },
                { name: "李商业伙伴", description: "将被剥夺继承权，在客厅等候", isGuilty: false, reason: "商业伙伴有强烈动机，但没有技术能力制造密室假象，且他在客厅容易被目击。" },
                { name: "王管家", description: "偷拿庄园物品，在厨房准备宵夜", isGuilty: false, reason: "管家确实有小偷小摸的行为，但这与谋杀不符。他在厨房工作，有时间接触咖啡。" },
                { name: "张医生", description: "挪用公款，在客房休息", isGuilty: true, reason: "医生有安眠药的获取渠道，知道如何使用而不留下痕迹。他作为医生，了解人体对药物的反应，能够准确计算剂量。他声称在客房休息，但实际有足够时间作案。制造密室假象需要一定的技术知识，医生更具备这种能力。" }
            ],
            hints: [
                "安眠药通常谁能轻易获取？",
                "谁能准确计算药物剂量？",
                "制造密室假象需要什么知识？"
            ]
        },
        {
            title: "珠宝店抢劫案",
            description: `昨晚11点，市中心珠宝店发生抢劫案。
            
店主被袭击昏迷，店内价值300万的珠宝被盗。
            
现场监控显示，三名蒙面劫匪在10分钟内完成作案，驾驶一辆黑色面包车逃离。
            
警方在附近发现被遗弃的面包车，车上有四人的指纹和DNA：店主的前妻、店员、供应商和保险理赔员。
            
调查发现：店主最近与前妻因离婚财产分配激烈争吵；店员刚被举报偷窃；供应商的货款被拖欠；保险理赔员最近处理过店主的理赔申请，发现店里有作假嫌疑。
            
现场还发现一个掉落的耳钉，据鉴定属于某女性嫌疑人。`,
            suspects: [
                { name: "前妻王女士", description: "因离婚财产分配与店主争吵", isGuilty: false, reason: "前妻虽然因财产分配争吵，但作为女性不太可能是三名蒙面劫匪之一。耳钉确实可能是她的，但可能是早些时候留下的。" },
                { name: "店员小李", description: "刚被举报偷窃，熟悉店内情况", isGuilty: false, reason: "店员确实有偷窃行为，但这种小偷小摸与大规模抢劫不符。他熟悉店内情况，但缺乏组织如此复杂犯罪的能力。" },
                { name: "供应商张先生", description: "货款被拖欠，有经济动机", isGuilty: false, reason: "供应商有经济动机，但作为生意人，不太可能亲自参与抢劫，风险太大。更可能通过法律途径解决货款问题。" },
                { name: "保险理赔员赵女士", description: "发现店里有作假嫌疑，熟悉保险流程", isGuilty: true, reason: "保险理赔员发现店内作假，可能试图掩盖自己的错误判断或获取更多证据。掉落的耳钉属于她，证明她曾到过现场。作为保险专业人士，她了解抢劫案的理赔流程和警方调查方法，可能设计这次抢劫以获取保险金或掩盖其他问题。她有足够专业知识组织这样一次看似专业的抢劫。" }
            ],
            hints: [
                "三名劫匪中是否有女性？",
                "谁对保险理赔最了解？",
                "掉落的耳钉属于谁？"
            ]
        },
        {
            title: "神秘绑架案",
            description: `三天前，富商之女小美被绑架，绑匪要求500万赎金。
            
绑匪通过加密电话与家属联系，不允许报警。
            
昨天，赎金按照指示在某公园垃圾桶被取走，但人质未被释放。
            
四名嫌疑人：小美的继母、家庭教师、司机关叔和小美的同学兼好友小琳。
            
继母最近被查出挪用公司资金；家庭教师暗恋小美，最近被辞退；司机关叔负债累累；小琳最近与小美因感情问题争吵。
            
调查发现，绑匪知道很多家庭内部信息，包括生活作息、财产状况等。
            
赎金被取走后，警方追踪到一通来自某网吧的电话，通话人疑似小琳。`,
            suspects: [
                { name: "继母李女士", description: "挪用公司资金，急需用钱", isGuilty: false, reason: "继母确实有经济问题，但作为继母，绑架继女风险极大，一旦被发现将失去一切。她更可能直接从丈夫那里要钱。" },
                { name: "家庭教师张老师", description: "暗恋小美，最近被辞退", isGuilty: false, reason: "家庭教师虽暗恋小美，但这与绑架行为不符。他被辞退后可能有报复心理，但不太可能策划如此复杂的绑架案。" },
                { name: "司机关叔", description: "负债累累，熟悉家庭情况", isGuilty: false, reason: "司机关叔确实负债且了解家庭情况，但作为老司机，与家庭关系密切，绑架小美会让他失去工作，风险收益不成比例。" },
                { name: "小琳", description: "小美的同学兼好友，最近与小美争吵", isGuilty: true, reason: "小琳作为小美的好友，了解家庭内部情况和生活作息。她们最近的争吵可能提供了动机。网吧的电话显示她有参与痕迹。年轻人可能出于冲动或嫉妒策划绑架，并低估了后果。她了解小美的喜好和习惯，更容易实施绑架而不引起怀疑。" }
            ],
            hints: [
                "谁最了解家庭内部信息？",
                "网吧电话属于谁？",
                "绑匪为什么知道这么多生活细节？"
            ]
        }
    ];
    
    let currentCase = null;
    let currentHintIndex = 0;
    
    // 事件监听器
    backButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    
    startButton.addEventListener('click', startCase);
    hintButton.addEventListener('click', showHint);
    
    // 开始案件
    function startCase() {
        const caseIndex = parseInt(caseSelect.value);
        currentCase = cases[caseIndex];
        currentHintIndex = 0;
        
        // 重置界面
        resultContainer.style.display = 'none';
        hintText.style.display = 'none';
        
        // 显示案件描述
        displayCase();
        
        // 显示嫌疑人
        displaySuspects();
        
        // 显示线索
        displayClues();
    }
    
    // 显示案件描述
    function displayCase() {
        const caseHTML = `
            <div class="case-description">
                <h2>${currentCase.title}</h2>
                <div class="case-text">
                    ${currentCase.description.split('\n').map(line => `<p>${line}</p>`).join('')}
                </div>
            </div>
        `;
        caseContent.innerHTML = caseHTML;
    }
    
    // 显示嫌疑人
    function displaySuspects() {
        const suspectsHTML = `
            <h2>嫌疑人</h2>
            <div class="suspects-grid">
                ${currentCase.suspects.map((suspect, index) => `
                    <div class="suspect-card" data-index="${index}">
                        <h3>${suspect.name}</h3>
                        <p>${suspect.description}</p>
                        <button class="accuse-button">指认凶手</button>
                    </div>
                `).join('')}
            </div>
        `;
        suspectsContainer.innerHTML = suspectsHTML;
        
        // 为每个"指认凶手"按钮添加事件监听器
        const accuseButtons = document.querySelectorAll('.accuse-button');
        accuseButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                accuseSuspect(index);
            });
        });
    }
    
    // 显示线索
    function displayClues() {
        const cluesHTML = `
            <h2>线索分析</h2>
            <div class="clues-list">
                <p>仔细阅读案件描述，分析每个嫌疑人的动机和机会。注意案件中的时间线和关键细节。</p>
            </div>
        `;
        cluesContainer.innerHTML = cluesHTML;
    }
    
    // 指认嫌疑人
    function accuseSuspect(index) {
        const suspect = currentCase.suspects[index];
        
        // 显示结果
        let resultHTML = `
            <div class="result-card ${suspect.isGuilty ? 'correct' : 'incorrect'}">
                <h2>${suspect.isGuilty ? '✓ 正确！' : '✗ 错误！'}</h2>
                <p>你指认了 <strong>${suspect.name}</strong>。</p>
                <p>${suspect.isGuilty ? '恭喜你，成功破案！' : '很遗憾，这不是真正的凶手。'}</p>
                <div class="explanation">
                    <h3>案件解析：</h3>
                    <p>${suspect.reason}</p>
                </div>
            </div>
        `;
        resultContainer.innerHTML = resultHTML;
        resultContainer.style.display = 'block';
    }
    
    // 显示提示
    function showHint() {
        if (!currentCase || currentHintIndex >= currentCase.hints.length) {
            return;
        }
        
        hintText.textContent = currentCase.hints[currentHintIndex];
        hintText.style.display = 'block';
        currentHintIndex++;
        
        if (currentHintIndex >= currentCase.hints.length) {
            hintButton.disabled = true;
            hintButton.textContent = '没有更多提示';
        }
    }
    
    // 初始化第一个案件
    startCase();
});