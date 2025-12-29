// 答题应用逻辑
let currentChapter = null;
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let selectedOptions = [];
let isAnswered = false;
let currentMode = null; // 'chapter' 或 'random'
let questionStates = []; // 存储每道题的答题状态

// 复习模式变量
let reviewQuestions = [];
let reviewQuestionIndex = 0;
let reviewChapter = null;
let reviewMode = null; // 'random' 或 'chapter'

// 题型练习变量
let currentType = null; // 'singleChoice', 'multipleChoice', 'judgment'
let typeMode = null; // 'random' 或 'chapter'

// 初始化应用
function init() {
    renderChapterList();
    loadVisitCount();
}

// 加载访问次数统计
async function loadVisitCount() {
    const visitCountElement = document.getElementById('visitCount');

    try {
        // 使用固定的 key 统计全部用户访问次数（不因 URL 变化而分散）
        const pageKey = 'fang-quiz-neural-network';

        // 获取并增加计数
        const response = await fetch(`https://api.countapi.xyz/hit/${pageKey}/visits`);
        const data = await response.json();

        if (data.value !== undefined) {
            // 使用动画效果显示数字
            animateNumber(visitCountElement, 0, data.value, 1000);
        } else {
            visitCountElement.textContent = '统计中...';
        }
    } catch (error) {
        console.warn('访问计数器加载失败:', error);
        visitCountElement.textContent = '统计不可用';
    }
}

// 数字动画效果
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const range = end - start;

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // 使用 easeOutQuart 缓动函数
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + range * easeProgress);

        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// 渲染章节列表
function renderChapterList() {
    const chapterList = document.getElementById('chapterList');
    chapterList.innerHTML = '';

    for (const chapter in questionsData) {
        const data = questionsData[chapter];
        const totalCount = (data.singleChoice?.length || 0) +
                         (data.multipleChoice?.length || 0) +
                         (data.judgment?.length || 0);

        const chapterDiv = document.createElement('div');
        chapterDiv.className = 'chapter-card';

        const btn = document.createElement('button');
        btn.className = 'chapter-btn';
        btn.onclick = () => startChapterMode(chapter);
        btn.innerHTML = `
            <div class="chapter-name">${chapter}</div>
            <div class="chapter-count">${totalCount}题</div>
        `;

        // 添加复习按钮
        const reviewBtn = document.createElement('button');
        reviewBtn.className = 'chapter-review-btn';
        reviewBtn.onclick = () => startChapterReview(chapter);
        reviewBtn.innerHTML = '📖 复习';
        reviewBtn.title = '复习此章节';

        chapterDiv.appendChild(btn);
        chapterDiv.appendChild(reviewBtn);
        chapterList.appendChild(chapterDiv);
    }
}

// 开始随机模式
function startRandomMode() {
    currentMode = 'random';
    currentChapter = '随机练习';
    currentQuestions = getAllQuestions();
    shuffleArray(currentQuestions);

    startQuiz();
}

// 开始章节模式
function startChapterMode(chapter) {
    currentMode = 'chapter';
    currentChapter = chapter;
    currentQuestions = getChapterQuestions(chapter);
    shuffleArray(currentQuestions);

    startQuiz();
}

// 获取所有题目
function getAllQuestions() {
    const allQuestions = [];

    for (const chapter in questionsData) {
        const data = questionsData[chapter];

        if (data.singleChoice) {
            data.singleChoice.forEach(q => {
                allQuestions.push({ ...q, chapter, type: 'singleChoice' });
            });
        }
        if (data.multipleChoice) {
            data.multipleChoice.forEach(q => {
                allQuestions.push({ ...q, chapter, type: 'multipleChoice' });
            });
        }
        if (data.judgment) {
            data.judgment.forEach(q => {
                allQuestions.push({ ...q, chapter, type: 'judgment' });
            });
        }
    }

    return allQuestions;
}

// 获取章节题目
function getChapterQuestions(chapter) {
    const data = questionsData[chapter];
    const questions = [];

    if (data.singleChoice) {
        data.singleChoice.forEach(q => {
            questions.push({ ...q, chapter, type: 'singleChoice' });
        });
    }
    if (data.multipleChoice) {
        data.multipleChoice.forEach(q => {
            questions.push({ ...q, chapter, type: 'multipleChoice' });
        });
    }
    if (data.judgment) {
        data.judgment.forEach(q => {
            questions.push({ ...q, chapter, type: 'judgment' });
        });
    }

    return questions;
}

// 数组洗牌
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 开始答题
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    // 初始化每道题的状态
    questionStates = currentQuestions.map(() => ({
        answered: false,
        selectedOptions: [],
        isCorrect: false
    }));

    showPage('quizPage');
    document.getElementById('chapterTitle').textContent = currentChapter;
    updateScore();
    loadQuestion();
}

// 加载题目
function loadQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    const state = questionStates[currentQuestionIndex];

    // 如果该题已答过，恢复状态
    if (state.answered) {
        isAnswered = true;
        selectedOptions = [...state.selectedOptions];
    } else {
        isAnswered = false;
        selectedOptions = [];
    }

    // 更新题目信息
    const typeNames = {
        'singleChoice': '单选题',
        'multipleChoice': '多选题',
        'judgment': '判断题'
    };
    document.getElementById('questionType').textContent = typeNames[question.type];
    document.getElementById('questionNumber').textContent =
        `第 ${currentQuestionIndex + 1} / ${currentQuestions.length} 题`;
    document.getElementById('progressInfo').textContent =
        `${currentQuestionIndex + 1} / ${currentQuestions.length}`;

    // 设置题目文本
    document.getElementById('questionText').textContent = question.question;

    // 显示或隐藏图片
    const imageContainer = document.getElementById('questionImage');
    imageContainer.innerHTML = '';

    if (question.img) {
        const img = document.createElement('img');
        img.src = question.img;
        img.alt = '题目配图';
        img.onerror = function() {
            console.warn('图片加载失败:', question.img);
            this.style.display = 'none';
        };
        imageContainer.appendChild(img);
        imageContainer.style.display = 'block';
    } else {
        imageContainer.style.display = 'none';
    }

    // 渲染选项
    renderOptions(question);

    // 如果已答过，恢复选项状态和显示反馈
    if (state.answered) {
        restoreAnsweredState(question, state);
    } else {
        document.getElementById('feedbackContainer').classList.add('hidden');
        // 新题目时隐藏导航按钮
        const navContainer = document.querySelector('.quiz-navigation');
        if (navContainer) {
            navContainer.style.display = 'none';
        }
    }

    // 更新导航按钮状态
    updateQuizNavigation();
}

// 恢复已答题状态
function restoreAnsweredState(question, state) {
    const options = document.querySelectorAll('.option');

    // 恢复选中状态
    options.forEach((opt, i) => {
        if (state.selectedOptions.includes(i)) {
            opt.classList.add('selected');
            const radio = opt.querySelector('.option-radio');
            if (radio) radio.classList.add('selected');
        }
    });

    // 禁用所有选项
    options.forEach(opt => opt.classList.add('disabled'));

    // 禁用提交按钮
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.5';
        submitBtn.style.cursor = 'not-allowed';
    }

    // 标记正确答案
    const correctAnswer = question.answer;
    if (question.type === 'singleChoice' || question.type === 'judgment') {
        const correctIndex = correctAnswer.charCodeAt(0) - 65;
        if (options[correctIndex]) {
            options[correctIndex].classList.add('correct');
        }
    } else {
        const correctArray = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
        correctArray.forEach(letter => {
            const index = letter.charCodeAt(0) - 65;
            if (options[index]) {
                options[index].classList.add('correct');
            }
        });
    }

    // 标记错误选项
    if (!state.isCorrect) {
        state.selectedOptions.forEach(i => {
            const letter = String.fromCharCode(65 + i);
            if (!isCorrectAnswer(question, letter)) {
                options[i].classList.add('wrong');
            }
        });
    }

    // 显示反馈
    showFeedback(state.isCorrect, question, false);

    // 显示导航按钮
    const navContainer = document.querySelector('.quiz-navigation');
    if (navContainer) {
        navContainer.style.display = 'flex';
    }
}

// 渲染选项
function renderOptions(question) {
    const container = document.getElementById('optionsContainer');
    container.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.onclick = () => selectOption(index, question.type);

        const radio = document.createElement('div');
        radio.className = 'option-radio';

        const text = document.createElement('div');
        text.className = 'option-text';
        text.textContent = option;

        optionDiv.appendChild(radio);
        optionDiv.appendChild(text);
        container.appendChild(optionDiv);
    });

    // 多选题添加提交按钮
    if (question.type === 'multipleChoice') {
        const submitBtn = document.createElement('button');
        submitBtn.className = 'submit-btn';
        submitBtn.textContent = '提交答案';
        submitBtn.onclick = () => submitAnswer();
        container.appendChild(submitBtn);
    }
}

// 选择选项
function selectOption(index, type) {
    if (isAnswered) return;

    const options = document.querySelectorAll('.option');

    if (type === 'singleChoice' || type === 'judgment') {
        // 单选和判断题：单选
        selectedOptions = [index];
        options.forEach((opt, i) => {
            opt.classList.toggle('selected', i === index);
            const radio = opt.querySelector('.option-radio');
            radio.classList.toggle('selected', i === index);
        });

        // 自动提交
        submitAnswer();
    } else {
        // 多选题：多选
        const idx = selectedOptions.indexOf(index);
        if (idx > -1) {
            selectedOptions.splice(idx, 1);
        } else {
            selectedOptions.push(index);
        }

        options.forEach((opt, i) => {
            opt.classList.toggle('selected', selectedOptions.includes(i));
            const radio = opt.querySelector('.option-radio');
            radio.classList.toggle('selected', selectedOptions.includes(i));
        });
    }
}

// 提交答案（用于多选题）
function submitAnswer() {
    if (isAnswered) return;

    isAnswered = true;
    const question = currentQuestions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');

    // 禁用所有选项和提交按钮
    options.forEach(opt => opt.classList.add('disabled'));
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.5';
        submitBtn.style.cursor = 'not-allowed';
    }

    let isCorrect = false;
    const correctAnswer = question.answer;
    const selectedLetters = selectedOptions.map(i => String.fromCharCode(65 + i)); // A, B, C, D

    if (question.type === 'singleChoice' || question.type === 'judgment') {
        // 单选和判断题
        isCorrect = selectedLetters[0] === correctAnswer;
    } else {
        // 多选题
        const correctArray = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
        const selectedArray = selectedLetters.sort();
        const correctSorted = correctArray.sort();

        isCorrect = selectedArray.length === correctSorted.length &&
                   selectedArray.every((val, i) => val === correctSorted[i]);
    }

    // 保存答题状态
    questionStates[currentQuestionIndex] = {
        answered: true,
        selectedOptions: [...selectedOptions],
        isCorrect: isCorrect
    };

    // 显示结果
    if (isCorrect) {
        correctAnswers++;
        score += 5;
        showFeedback(true, question, true);
        // 正确答案后延迟自动跳转
        setTimeout(() => nextQuizQuestion(), 800);
    } else {
        wrongAnswers++;
        showFeedback(false, question, false);

        // 标记正确答案
        if (question.type === 'singleChoice' || question.type === 'judgment') {
            const correctIndex = correctAnswer.charCodeAt(0) - 65;
            options[correctIndex].classList.add('correct');
        } else {
            const correctArray = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
            correctArray.forEach(letter => {
                const index = letter.charCodeAt(0) - 65;
                if (options[index]) {
                    options[index].classList.add('correct');
                }
            });
        }

        // 标记错误选项
        selectedOptions.forEach(i => {
            const letter = String.fromCharCode(65 + i);
            if (!isCorrectAnswer(question, letter)) {
                options[i].classList.add('wrong');
            }
        });
    }

    updateScore();
}

// 检查是否是正确答案
function isCorrectAnswer(question, letter) {
    if (Array.isArray(question.answer)) {
        return question.answer.includes(letter);
    }
    return question.answer === letter;
}

// 显示反馈
function showFeedback(isCorrect, question, autoSkip = false) {
    const container = document.getElementById('feedbackContainer');
    const icon = document.getElementById('feedbackIcon');
    const text = document.getElementById('feedbackText');
    const correctDiv = document.getElementById('correctAnswer');
    const navContainer = container.querySelector('.quiz-navigation');

    container.classList.remove('hidden', 'correct', 'wrong');
    container.classList.add(isCorrect ? 'correct' : 'wrong');

    icon.textContent = isCorrect ? '✓' : '✗';

    if (autoSkip) {
        text.textContent = '回答正确！即将进入下一题...';
        // 隐藏导航按钮
        if (navContainer) {
            navContainer.style.display = 'none';
        }
    } else {
        text.textContent = isCorrect ? '回答正确！' : '回答错误';
        // 显示导航按钮
        if (navContainer) {
            navContainer.style.display = 'flex';
        }
    }

    if (!isCorrect) {
        let correctText = '正确答案：';
        if (Array.isArray(question.answer)) {
            correctText += question.answer.join('、');
        } else {
            correctText += question.answer;
        }
        correctDiv.textContent = correctText;
    } else {
        correctDiv.textContent = '';
    }
}

// 下一题（自动完成检测）
function nextQuestion() {
    // 检查是否所有题都已答完
    const allAnswered = questionStates.every(state => state.answered);
    if (allAnswered) {
        showResult();
        return;
    }

    // 找到下一道未答的题
    for (let i = currentQuestionIndex + 1; i < currentQuestions.length; i++) {
        if (!questionStates[i].answered) {
            currentQuestionIndex = i;
            loadQuestion();
            return;
        }
    }

    // 如果后面的题都已答完，检查前面有没有未答的
    for (let i = 0; i < currentQuestionIndex; i++) {
        if (!questionStates[i].answered) {
            currentQuestionIndex = i;
            loadQuestion();
            return;
        }
    }

    // 所有题都答完了
    showResult();
}

// 上一题（答题模式导航）
function prevQuizQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

// 下一题（答题模式导航）
function nextQuizQuestion() {
    if (currentQuestionIndex < currentQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        // 如果是最后一题，检查是否全部答完
        const allAnswered = questionStates.every(state => state.answered);
        if (allAnswered) {
            showResult();
        }
    }
}

// 更新答题导航按钮状态
function updateQuizNavigation() {
    const prevBtn = document.querySelector('.quiz-prev-btn');
    const nextBtn = document.querySelector('.quiz-next-btn');

    if (!prevBtn || !nextBtn) return;

    prevBtn.disabled = currentQuestionIndex === 0;
    prevBtn.style.opacity = currentQuestionIndex === 0 ? '0.5' : '1';
    prevBtn.style.cursor = currentQuestionIndex === 0 ? 'not-allowed' : 'pointer';

    // 最后一题时，如果全部答完则禁用下一题按钮
    const isLast = currentQuestionIndex === currentQuestions.length - 1;
    const allAnswered = questionStates.every(state => state.answered);

    if (isLast && allAnswered) {
        nextBtn.disabled = true;
        nextBtn.style.opacity = '0.5';
        nextBtn.style.cursor = 'not-allowed';
        nextBtn.textContent = '完成';
    } else {
        nextBtn.disabled = false;
        nextBtn.style.opacity = '1';
        nextBtn.style.cursor = 'pointer';
        nextBtn.textContent = '下一题 →';
    }
}

// 更新分数显示
function updateScore() {
    document.getElementById('currentScore').textContent = score;
}

// 显示结果页面
function showResult() {
    showPage('resultPage');

    const total = currentQuestions.length;
    const accuracy = total > 0 ? Math.round((correctAnswers / total) * 100) : 0;

    document.getElementById('totalQuestions').textContent = total;
    document.getElementById('correctCount').textContent = correctAnswers;
    document.getElementById('wrongCount').textContent = wrongAnswers;
    document.getElementById('accuracy').textContent = accuracy + '%';
}

// 返回首页
function goHome() {
    showPage('homePage');
}

// 重试当前模式
function retryMode() {
    if (currentMode === 'random') {
        startRandomMode();
    } else {
        startChapterMode(currentChapter);
    }
}

// 显示指定页面
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// ============ 复习模式功能 ============

// 开始随机复习
function startRandomReview() {
    reviewMode = 'random';
    reviewChapter = '随机复习';
    reviewQuestions = getAllQuestions();
    shuffleArray(reviewQuestions);
    reviewQuestionIndex = 0;

    showPage('reviewPage');
    loadReviewQuestion();
}

// 开始章节复习
function startChapterReview(chapter) {
    reviewMode = 'chapter';
    reviewChapter = chapter;
    reviewQuestions = getChapterQuestions(chapter);
    shuffleArray(reviewQuestions);
    reviewQuestionIndex = 0;

    showPage('reviewPage');
    loadReviewQuestion();
}

// 加载复习题目
function loadReviewQuestion() {
    const question = reviewQuestions[reviewQuestionIndex];

    // 更新题目信息
    const typeNames = {
        'singleChoice': '单选题',
        'multipleChoice': '多选题',
        'judgment': '判断题'
    };
    document.getElementById('reviewQuestionType').textContent = typeNames[question.type];
    document.getElementById('reviewQuestionNumber').textContent =
        `第 ${reviewQuestionIndex + 1} / ${reviewQuestions.length} 题`;
    document.getElementById('reviewProgressInfo').textContent =
        `${reviewQuestionIndex + 1} / ${reviewQuestions.length}`;
    document.getElementById('reviewChapterTitle').textContent = reviewChapter;

    // 设置题目文本
    document.getElementById('reviewQuestionText').textContent = question.question;

    // 显示或隐藏图片
    const imageContainer = document.getElementById('reviewQuestionImage');
    imageContainer.innerHTML = '';

    if (question.img) {
        const img = document.createElement('img');
        img.src = question.img;
        img.alt = '题目配图';
        img.onerror = function() {
            console.warn('图片加载失败:', question.img);
            this.style.display = 'none';
        };
        imageContainer.appendChild(img);
        imageContainer.style.display = 'block';
    } else {
        imageContainer.style.display = 'none';
    }

    // 渲染选项
    renderReviewOptions(question);

    // 显示正确答案
    let answerText = '';
    if (Array.isArray(question.answer)) {
        answerText = question.answer.join('、');
    } else {
        answerText = question.answer;
    }
    document.getElementById('reviewAnswer').textContent = answerText;

    // 显示解析
    document.getElementById('reviewExplanation').textContent = question.explanation || '暂无解析';

    // 更新导航按钮状态
    updateReviewNavigation();
}

// 渲染复习模式的选项
function renderReviewOptions(question) {
    const container = document.getElementById('reviewOptionsContainer');
    container.innerHTML = '';

    // 获取正确答案数组
    const correctAnswers = Array.isArray(question.answer) ? question.answer : [question.answer];

    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        const letter = String.fromCharCode(65 + index); // A, B, C, D
        const isCorrect = correctAnswers.includes(letter);

        optionDiv.className = 'review-option';
        if (isCorrect) {
            optionDiv.classList.add('correct');
        }

        const letterSpan = document.createElement('span');
        letterSpan.className = 'review-option-letter';
        letterSpan.textContent = letter + '.';

        const textSpan = document.createElement('span');
        textSpan.className = 'review-option-text';
        textSpan.textContent = option;

        const checkMark = document.createElement('span');
        checkMark.className = 'review-check-mark';
        checkMark.textContent = isCorrect ? '✓' : '';

        optionDiv.appendChild(letterSpan);
        optionDiv.appendChild(textSpan);
        optionDiv.appendChild(checkMark);
        container.appendChild(optionDiv);
    });
}

// 更新复习导航按钮状态
function updateReviewNavigation() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    prevBtn.disabled = reviewQuestionIndex === 0;
    prevBtn.style.opacity = reviewQuestionIndex === 0 ? '0.5' : '1';
    prevBtn.style.cursor = reviewQuestionIndex === 0 ? 'not-allowed' : 'pointer';

    nextBtn.disabled = reviewQuestionIndex === reviewQuestions.length - 1;
    nextBtn.style.opacity = reviewQuestionIndex === reviewQuestions.length - 1 ? '0.5' : '1';
    nextBtn.style.cursor = reviewQuestionIndex === reviewQuestions.length - 1 ? 'not-allowed' : 'pointer';
}

// 上一题
function prevReviewQuestion() {
    if (reviewQuestionIndex > 0) {
        reviewQuestionIndex--;
        loadReviewQuestion();
    }
}

// 下一题
function nextReviewQuestion() {
    if (reviewQuestionIndex < reviewQuestions.length - 1) {
        reviewQuestionIndex++;
        loadReviewQuestion();
    }
}

// ============ 题型练习功能 ============

// 显示题型选择页面
function showTypeSelectionPage() {
    showPage('typePage');
    updateTypeCounts();
}

// 更新各题型题目数量
function updateTypeCounts() {
    const counts = getTypeCounts();
    document.getElementById('singleCount').textContent = `${counts.singleChoice} 题`;
    document.getElementById('multipleCount').textContent = `${counts.multipleChoice} 题`;
    document.getElementById('judgmentCount').textContent = `${counts.judgment} 题`;
}

// 获取各题型题目总数
function getTypeCounts() {
    const counts = {
        singleChoice: 0,
        multipleChoice: 0,
        judgment: 0
    };

    for (const chapter in questionsData) {
        const data = questionsData[chapter];
        if (data.singleChoice) counts.singleChoice += data.singleChoice.length;
        if (data.multipleChoice) counts.multipleChoice += data.multipleChoice.length;
        if (data.judgment) counts.judgment += data.judgment.length;
    }

    return counts;
}

// 显示题型模式选择页面（选择随机或章节）
function showTypeModeSelection(type) {
    currentType = type;
    const typeNames = {
        'singleChoice': '单选题',
        'multipleChoice': '多选题',
        'judgment': '判断题'
    };
    document.getElementById('typeModeTitle').textContent = typeNames[type] + '练习';
    renderTypeChapterList(type);
    showPage('typeModePage');
}

// 渲染题型章节列表
function renderTypeChapterList(type) {
    const chapterList = document.getElementById('typeChapterList');
    chapterList.innerHTML = '';

    for (const chapter in questionsData) {
        const data = questionsData[chapter];
        let count = 0;

        if (type === 'singleChoice' && data.singleChoice) {
            count = data.singleChoice.length;
        } else if (type === 'multipleChoice' && data.multipleChoice) {
            count = data.multipleChoice.length;
        } else if (type === 'judgment' && data.judgment) {
            count = data.judgment.length;
        }

        if (count === 0) continue;

        const chapterDiv = document.createElement('div');
        chapterDiv.className = 'chapter-card';

        const btn = document.createElement('button');
        btn.className = 'chapter-btn';
        btn.onclick = () => startTypeChapterMode(chapter, type);
        btn.innerHTML = `
            <div class="chapter-name">${chapter}</div>
            <div class="chapter-count">${count}题</div>
        `;

        chapterDiv.appendChild(btn);
        chapterList.appendChild(chapterDiv);
    }
}

// 开始题型随机模式
function startTypeRandomMode() {
    typeMode = 'random';
    currentMode = 'type';
    currentChapter = getTypeDisplayName(currentType) + '随机练习';
    currentQuestions = getTypeQuestions(currentType, null);
    shuffleArray(currentQuestions);

    startQuiz();
}

// 开始题型章节模式
function startTypeChapterMode(chapter, type) {
    typeMode = 'chapter';
    currentMode = 'type';
    currentType = type;
    currentChapter = chapter + ' - ' + getTypeDisplayName(type);
    currentQuestions = getTypeQuestions(type, chapter);
    shuffleArray(currentQuestions);

    startQuiz();
}

// 获取题型显示名称
function getTypeDisplayName(type) {
    const names = {
        'singleChoice': '单选题',
        'multipleChoice': '多选题',
        'judgment': '判断题'
    };
    return names[type] || type;
}

// 按题型获取题目（所有章节或指定章节）
function getTypeQuestions(type, chapter) {
    const questions = [];

    if (chapter) {
        // 指定章节
        const data = questionsData[chapter];
        if (data && data[type]) {
            data[type].forEach(q => {
                questions.push({ ...q, chapter, type });
            });
        }
    } else {
        // 所有章节
        for (const ch in questionsData) {
            const data = questionsData[ch];
            if (data && data[type]) {
                data[type].forEach(q => {
                    questions.push({ ...q, chapter: ch, type });
                });
            }
        }
    }

    return questions;
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
