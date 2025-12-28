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

// 复习模式变量
let reviewQuestions = [];
let reviewQuestionIndex = 0;
let reviewChapter = null;
let reviewMode = null; // 'random' 或 'chapter'

// 初始化应用
function init() {
    renderChapterList();
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

    showPage('quizPage');
    document.getElementById('chapterTitle').textContent = currentChapter;
    updateScore();
    loadQuestion();
}

// 加载题目
function loadQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    isAnswered = false;
    selectedOptions = [];

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

    // 清空反馈
    document.getElementById('feedbackContainer').classList.add('hidden');

    // 渲染选项
    renderOptions(question);
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

    // 显示结果
    if (isCorrect) {
        correctAnswers++;
        score += 5;
        showFeedback(true, question, true); // 传入true表示自动跳转
        // 正确答案后延迟自动跳转
        setTimeout(() => nextQuestion(), 800);
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
    const nextBtn = container.querySelector('.next-btn');

    container.classList.remove('hidden', 'correct', 'wrong');
    container.classList.add(isCorrect ? 'correct' : 'wrong');

    icon.textContent = isCorrect ? '✓' : '✗';

    if (autoSkip) {
        text.textContent = '回答正确！即将进入下一题...';
        // 隐藏下一题按钮
        if (nextBtn) {
            nextBtn.style.display = 'none';
        }
    } else {
        text.textContent = isCorrect ? '回答正确！' : '回答错误';
        // 显示下一题按钮
        if (nextBtn) {
            nextBtn.style.display = 'block';
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

// 下一题
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex >= currentQuestions.length) {
        showResult();
    } else {
        loadQuestion();
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

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
