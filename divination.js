document.addEventListener('DOMContentLoaded', () => {
    const divineButton = document.getElementById('divine-button');
    
    divineButton.addEventListener('click', () => {
        divineHexagram();
    });
});

// 易经六十四卦数据
const hexagrams = [
    {
        name: "乾卦",
        symbol: "䷀",
        interpretation: "乾为天，象征创造、力量和主动。乾卦代表着刚健、主动和创造的力量，是万物之始。此时应该积极主动，勇往直前，但也要注意刚柔并济，不可过于刚强。适合开创事业，积极进取，但需防过于冒进。"
    },
    {
        name: "坤卦",
        symbol: "䷁",
        interpretation: "坤为地，象征包容、柔顺和被动。坤卦代表着柔顺、包容和承载的力量，是万物之母。此时应该以柔克刚，顺势而为，厚德载物。适合耐心等待，积蓄力量，不可强求。"
    },
    {
        name: "屯卦",
        symbol: "䷂",
        interpretation: "屯卦象征困难、险阻和新生的开始。此卦表示事物初创时期，困难重重，但也蕴含着生机。此时需要坚定信念，克服困难，稳步前进。不宜急躁冒进，应循序渐进。"
    },
    {
        name: "蒙卦",
        symbol: "䷃",
        interpretation: "蒙卦象征蒙昧、启蒙和教育。此卦表示需要启蒙和教育，去除蒙昧，增长智慧。此时应该虚心学习，接受指导，不断进步。适合求学、求知和新技能的学习。"
    },
    {
        name: "需卦",
        symbol: "䷄",
        interpretation: "需卦象征等待、耐心和积蓄。此卦表示需要耐心等待时机，不可轻举妄动。此时应该保持耐心，积蓄力量，等待最佳时机。适合做长期规划，不宜急于求成。"
    },
    {
        name: "讼卦",
        symbol: "䷅",
        interpretation: "讼卦象征争讼、冲突和纠纷。此卦表示可能有争执和冲突，需要谨慎处理。此时应该以和为贵，尽量避免冲突，寻求和解。不适合争斗，适合协商解决。"
    },
    {
        name: "师卦",
        symbol: "䷆",
        interpretation: "师卦象征军队、纪律和领导。此卦表示需要有组织、有纪律的行动，以及正确的领导。此时应该团结一致，听从指挥，严守纪律。适合团队合作和有组织的活动。"
    },
    {
        name: "比卦",
        symbol: "䷇",
        interpretation: "比卦象征亲密、团结和合作。此卦表示需要与他人建立亲密关系，团结合作。此时应该与人和谐相处，互相帮助，共同进步。适合建立合作关系和友谊。"
    },
    {
        name: "小畜卦",
        symbol: "䷈",
        interpretation: "小畜卦象征小有积蓄、暂时停滞。此卦表示暂时的停滞和小有积蓄，需要等待更好的时机。此时应该保持耐心，小有积累，不宜大动。适合小规模积累，不适合大规模行动。"
    },
    {
        name: "履卦",
        symbol: "䷉",
        interpretation: "履卦象征行走、实践和谨慎。此卦表示需要小心谨慎地前进，实践自己的计划。此时应该脚踏实地，稳步前进，不可冒进。适合实践计划，需要谨慎行事。"
    },
    {
        name: "泰卦",
        symbol: "䷊",
        interpretation: "泰卦象征通泰、和谐和成功。此卦表示天地交融，万物通达，是最吉祥的卦象之一。此时应该把握机遇，积极进取，必有所成。适合开始新事业，进行重要决策。"
    },
    {
        name: "否卦",
        symbol: "䷋",
        interpretation: "否卦象征闭塞、不通和困难。此卦表示天地不交，万物不通，情况不利。此时应该保持耐心，坚守正道，等待转机。不宜有大的行动，宜静不宜动。"
    },
    {
        name: "同人卦",
        symbol: "䷌",
        interpretation: "同人卦象征和谐、合作和团结。此卦表示与他人和谐相处，团结合作。此时应该开放心态，与他人合作，共同进步。适合团队工作和社交活动。"
    },
    {
        name: "大有卦",
        symbol: "䷍",
        interpretation: "大有卦象征大有收获、成功和富足。此卦表示大的收获和成功，是吉祥的卦象。此时应该把握机遇，必有所获。适合投资、创业和大的行动。"
    },
    {
        name: "谦卦",
        symbol: "䷎",
        interpretation: "谦卦象征谦虚、谦逊和包容。此卦表示应该保持谦虚的态度，不自满，不骄傲。此时应该虚心学习，尊重他人，必有所得。适合学习和社交。"
    },
    {
        name: "豫卦",
        symbol: "䷏",
        interpretation: "豫卦象征安逸、喜悦和准备。此卦表示安逸和喜悦，但也需要做好准备。此时应该享受生活，但不放松警惕。适合休闲娱乐，但也需要为未来做准备。"
    },
    {
        name: "随卦",
        symbol: "䷐",
        interpretation: "随卦象征跟随、顺应和适应。此卦表示需要顺应时势，跟随正确的方向。此时应该灵活应变，随顺时势，不可固执。适合适应环境和变化。"
    },
    {
        name: "蛊卦",
        symbol: "䷑",
        interpretation: "蛊卦象征腐败、问题和整顿。此卦表示存在问题，需要整顿和改革。此时应该勇于面对问题，进行改革，整顿秩序。适合解决问题和改革。"
    },
    {
        name: "临卦",
        symbol: "䷒",
        interpretation: "临卦象征来临、面对和监督。此卦表示事情即将来临，需要做好准备。此时应该积极主动，迎接挑战，把握时机。适合面对新情况和新挑战。"
    },
    {
        name: "观卦",
        symbol: "䷓",
        interpretation: "观卦象征观察、审视和了解。此卦表示需要仔细观察，深入了解情况。此时应该保持冷静，仔细观察，不急于行动。适合观察和了解情况。"
    },
    {
        name: "噬嗑卦",
        symbol: "䷔",
        interpretation: "噬嗑卦象征咬合、决断和执行。此卦表示需要决断和执行，解决问题。此时应该果断行动，解决问题，不可犹豫。适合处理问题和执行决策。"
    },
    {
        name: "贲卦",
        symbol: "䷕",
        interpretation: "贲卦象征装饰、美化和文化。此卦表示需要美化装饰，提升文化内涵。此时应该注重外表，提升内在，全面发展。适合美化环境和提升自我。"
    },
    {
        name: "剥卦",
        symbol: "䷖",
        interpretation: "剥卦象征剥落、腐蚀和衰退。此卦表示可能有剥落和衰退的趋势。此时应该保持警惕，防止剥落，坚守根本。不适合扩张，适合保守。"
    },
    {
        name: "复卦",
        symbol: "䷗",
        interpretation: "复卦象征回归、恢复和重生。此卦表示事情将回归正轨，恢复生机。此时应该把握机会，恢复正轨，重新开始。适合重新开始和恢复。"
    },
    {
        name: "无妄卦",
        symbol: "䷘",
        interpretation: "无妄卦象征无妄、真诚和本真。此卦表示应该保持真诚，不虚伪，不妄想。此时应该坚守本心，真诚待人，不做无谓的妄想。适合真诚交往和保持本真。"
    },
    {
        name: "大畜卦",
        symbol: "䷙",
        interpretation: "大畜卦象征大积蓄、大准备和等待。此卦表示大的积蓄和准备，需要耐心等待。此时应该积蓄力量，做好准备，等待最佳时机。适合长期规划和准备。"
    },
    {
        name: "颐卦",
        symbol: "䷚",
        interpretation: "颐卦象征颐养、养生和自给。此卦表示需要颐养身心，自给自足。此时应该关注健康，颐养身心，不求外物。适合养生和自我提升。"
    },
    {
        name: "大过卦",
        symbol: "䷛",
        interpretation: "大过卦象征大有过错、危机和转机。此卦表示可能有大过错或危机，但也有转机。此时应该谨慎行事，避免犯错，把握转机。适合危机处理和转机把握。"
    },
    {
        name: "坎卦",
        symbol: "䷜",
        interpretation: "坎卦象征险阻、困难和危险。此卦表示有险阻和困难，需要谨慎应对。此时应该保持警惕，克服困难，不冒险。适合处理困难和危险。"
    },
    {
        name: "离卦",
        symbol: "䷝",
        interpretation: "离卦象征光明、文明和附着。此卦表示光明和文明，需要依附正确的事物。此时应该追求光明，文明行事，依附正确的方向。适合学习和追求光明。"
    },
    {
        name: "咸卦",
        symbol: "䷞",
        interpretation: "咸卦象征感应、交流和互动。此卦表示需要相互感应，交流和互动。此时应该开放心态，与人交流，相互感应。适合交流和互动。"
    },
    {
        name: "恒卦",
        symbol: "䷟",
        interpretation: "恒卦象征恒常、持久和坚持。此卦表示需要保持恒常，坚持不懈。此时应该持之以恒，坚持不懈，不可半途而废。适合长期坚持的事情。"
    },
    {
        name: "遁卦",
        symbol: "䷠",
        interpretation: "遁卦象征退避、隐退和避开。此卦表示需要退避和隐退，避开不利的情况。此时应该退避三舍，隐退自保，不可强求。适合避开不利情况。"
    },
    {
        name: "大壮卦",
        symbol: "䷡",
        interpretation: "大壮卦象征强壮、力量和行动。此卦表示强壮有力，可以采取行动。此时应该发挥力量，积极行动，把握时机。适合积极行动和发挥力量。"
    },
    {
        name: "晋卦",
        symbol: "䷢",
        interpretation: "晋卦象征前进、晋升和发展。此卦表示可以前进和晋升，有发展空间。此时应该把握机会，积极前进，必有发展。适合晋升和发展。"
    },
    {
        name: "明夷卦",
        symbol: "䷣",
        interpretation: "明夷卦象征光明受损、困难和忍耐。此卦表示光明受损，有困难，需要忍耐。此时应该保持耐心，渡过难关，不可冒进。适合忍耐和等待。"
    },
    {
        name: "家人卦",
        symbol: "䷤",
        interpretation: "家人卦象征家庭、亲情和和谐。此卦表示家庭和谐，亲情重要。此时应该重视家庭，维护亲情，保持和谐。适合家庭事务和亲情维护。"
    },
    {
        name: "睽卦",
        symbol: "䷥",
        interpretation: "睽卦象征背离、分歧和矛盾。此卦表示可能有背离和分歧，需要调和。此时应该求同存异，调和矛盾，避免激化。适合处理分歧和矛盾。"
    },
    {
        name: "蹇卦",
        symbol: "䷦",
        interpretation: "蹇卦象征困难、障碍和停滞。此卦表示有困难和障碍，进展停滞。此时应该保持耐心，克服困难，不可急躁。适合处理困难和障碍。"
    },
    {
        name: "解卦",
        symbol: "䷧",
        interpretation: "解卦象征解除、缓解和解决。此卦表示可以解除困难和缓解问题。此时应该把握机会，解决问题，解除困难。适合解决困难和问题。"
    },
    {
        name: "损卦",
        symbol: "䷨",
        interpretation: "损卦象征损失、减少和牺牲。此卦表示可能有损失和减少，需要有所牺牲。此时应该接受损失，有所牺牲，以换取更大的收获。适合有舍有得。"
    },
    {
        name: "益卦",
        symbol: "䷩",
        interpretation: "益卦象征增益、收益和帮助。此卦表示可以有增益和收益，得到帮助。此时应该把握机会，寻求增益，接受帮助。适合寻求收益和帮助。"
    },
    {
        name: "夬卦",
        symbol: "䷪",
        interpretation: "夬卦象征决断、决定和分离。此卦表示需要做出决断和决定，可能有分离。此时应该果断决策，不畏分离，勇往直前。适合决断和决定。"
    },
    {
        name: "姤卦",
        symbol: "䷫",
        interpretation: "姤卦象征相遇、邂逅和结合。此卦表示可能有不期而遇的邂逅和结合。此时应该开放心态，迎接相遇，把握缘分。适合相遇和结合。"
    },
    {
        name: "萃卦",
        symbol: "䷬",
        interpretation: "萃卦象征聚集、汇合和集中。此卦表示事物聚集，人才汇合。此时应该聚集力量，集中精力，共同努力。适合团队合作和力量集中。"
    },
    {
        name: "升卦",
        symbol: "䷭",
        interpretation: "升卦象征上升、提升和发展。此卦表示可以上升和提升，有发展机会。此时应该把握机会，积极上升，不断发展。适合提升和发展。"
    },
    {
        name: "困卦",
        symbol: "䷮",
        interpretation: "困卦象征困境、困难和束缚。此卦表示处于困境，受到束缚。此时应该保持耐心，寻找出路，不绝望。适合处理困境和寻找出路。"
    },
    {
        name: "井卦",
        symbol: "䷯",
        interpretation: "井卦象征井水、滋养和源源不断。此卦表示有源源不断的滋养和支持。此时应该感恩珍惜，善用资源，不断滋养。适合获取支持和滋养。"
    },
    {
        name: "革卦",
        symbol: "䷰",
        interpretation: "革卦象征变革、改革和创新。此卦表示需要变革和改革，进行创新。此时应该勇于变革，敢于创新，不墨守成规。适合改革和创新。"
    },
    {
        name: "鼎卦",
        symbol: "䷱",
        interpretation: "鼎卦象征鼎盛、稳固和新陈代谢。此卦表示事物鼎盛，稳固有力，但有新陈代谢。此时应该把握鼎盛，稳固基础，顺应变化。适合稳固和发展。"
    },
    {
        name: "震卦",
        symbol: "䷲",
        interpretation: "震卦象征震动、雷动和警觉。此卦表示有震动和变动，需要保持警觉。此时应该保持警觉，应对变动，不可大意。适合应对变动和保持警觉。"
    },
    {
        name: "艮卦",
        symbol: "䷳",
        interpretation: "艮卦象征停止、静止和稳定。此卦表示需要停止和静止，保持稳定。此时应该适可而止，保持稳定，不宜轻举妄动。适合静止和稳定。"
    },
    {
        name: "渐卦",
        symbol: "䷴",
        interpretation: "渐卦象征渐进、逐渐和有序。此卦表示事情需要渐进，不可急于求成。此时应该循序渐进，有序发展，不急躁。适合渐进和有序发展。"
    },
    {
        name: "归妹卦",
        symbol: "䷵",
        interpretation: "归妹卦象征归宿、结合和回归。此卦表示找到归宿，有所结合和回归。此时应该寻找归宿，结合自身，回归本源。适合寻找归宿和回归。"
    },
    {
        name: "丰卦",
        symbol: "䷶",
        interpretation: "丰卦象征丰盛、富足和繁荣。此卦表示丰盛富足，繁荣昌盛。此时应该把握丰盛，保持富足，促进繁荣。适合把握富足和促进繁荣。"
    },
    {
        name: "旅卦",
        symbol: "䷷",
        interpretation: "旅卦象征旅行、漂泊和临时。此卦表示可能在旅行或漂泊，处于临时状态。此时应该适应环境，保持灵活，不安于现状。适合旅行和适应新环境。"
    },
    {
        name: "巽卦",
        symbol: "䷸",
        interpretation: "巽卦象征顺从、柔顺和进入。此卦表示需要顺从和柔顺，可以进入新的领域。此时应该柔顺适应，进入新境，不强求。适合适应和进入新环境。"
    },
    {
        name: "兑卦",
        symbol: "䷹",
        interpretation: "兑卦象征喜悦、交流和开放。此卦表示有喜悦和交流，需要开放心态。此时应该享受喜悦，开放交流，不封闭。适合交流分享和享受喜悦。"
    },
    {
        name: "涣卦",
        symbol: "䷺",
        interpretation: "涣卦象征涣散、消散和释放。此卦表示事物涣散，消散释放。此时应该接受涣散，释放压力，不强求统一。适合释放压力和接受变化。"
    },
    {
        name: "节卦",
        symbol: "䷻",
        interpretation: "节卦象征节制、节约和适度。此卦表示需要节制和节约，保持适度。此时应该有所节制，节约资源，不过度。适合节制和节约。"
    },
    {
        name: "中孚卦",
        symbol: "䷼",
        interpretation: "中孚卦象征诚信、信任和真诚。此卦表示需要保持诚信和信任，真诚待人。此时应该诚信为本，信任他人，真诚相待。适合建立信任和保持诚信。"
    },
    {
        name: "小过卦",
        symbol: "䷽",
        interpretation: "小过卦象征小有过错、谨慎和修正。此卦表示可能有小过错，需要谨慎和修正。此时应该谨慎行事，及时修正，避免小错变大。适合谨慎和修正。"
    },
    {
        name: "既济卦",
        symbol: "䷾",
        interpretation: "既济卦象征已完成、成功和稳定。此卦表示事情已经完成，成功稳定。此时应该保持稳定，巩固成果，不骄傲自满。适合巩固成果和保持稳定。"
    },
    {
        name: "未济卦",
        symbol: "䷿",
        interpretation: "未济卦象征未完成、继续和新的开始。此卦表示事情尚未完成，需要继续努力。此时应该继续努力，不放弃，迎接新的开始。适合继续努力和新的开始。"
    }
];

// 随机抽取一卦
function divineHexagram() {
    // 随机选择一卦
    const randomIndex = Math.floor(Math.random() * hexagrams.length);
    const selectedHexagram = hexagrams[randomIndex];
    
    // 获取DOM元素
    const hexagramResult = document.getElementById('hexagram-result');
    const hexagramName = document.getElementById('hexagram-name');
    const hexagramSymbol = document.getElementById('hexagram-symbol');
    const hexagramInterpretation = document.getElementById('hexagram-interpretation');
    
    // 显示结果
    hexagramName.textContent = selectedHexagram.name;
    hexagramSymbol.textContent = selectedHexagram.symbol;
    hexagramInterpretation.textContent = selectedHexagram.interpretation;
    
    // 显示结果区域
    hexagramResult.style.display = 'block';
    
    // 添加动画效果
    hexagramResult.style.opacity = '0';
    setTimeout(() => {
        hexagramResult.style.transition = 'opacity 1s';
        hexagramResult.style.opacity = '1';
    }, 100);
}

// 返回主页
function goBack() {
    window.location.href = 'index.html';
}