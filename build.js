const fs = require('fs');
const path = require('path');

// 构建配置
const config = {
    sourceDir: __dirname,
    distDir: path.join(__dirname, 'dist'),
    files: [
        'index.html',
        'styles.css',
        'questions.js',
        'app.js'
    ],
    directories: [
        'image'
    ]
};

// 清理dist目录
function cleanDist() {
    console.log('🧹 清理dist目录...');
    if (fs.existsSync(config.distDir)) {
        fs.rmSync(config.distDir, { recursive: true, force: true });
    }
    fs.mkdirSync(config.distDir, { recursive: true });
    console.log('✅ dist目录已清理并创建');
}

// 复制文件到dist目录
function copyFiles() {
    console.log('📦 复制文件到dist目录...');

    config.files.forEach(file => {
        const sourcePath = path.join(config.sourceDir, file);
        const distPath = path.join(config.distDir, file);

        if (fs.existsSync(sourcePath)) {
            fs.copyFileSync(sourcePath, distPath);
            const stats = fs.statSync(distPath);
            console.log(`  ✓ ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
        } else {
            console.warn(`  ⚠ 警告: ${file} 不存在`);
        }
    });
}

// 复制目录到dist目录
function copyDirectories() {
    console.log('📁 复制目录到dist目录...');

    config.directories.forEach(dir => {
        const sourcePath = path.join(config.sourceDir, dir);
        const distPath = path.join(config.distDir, dir);

        if (fs.existsSync(sourcePath)) {
            // 递归复制目录
            copyDirectoryRecursive(sourcePath, distPath);
            const stats = getDirectorySize(distPath);
            console.log(`  ✓ ${dir}/ (${(stats / 1024).toFixed(2)} KB)`);
        } else {
            console.warn(`  ⚠ 警告: ${dir}/ 不存在`);
        }
    });
}

// 递归复制目录
function copyDirectoryRecursive(source, target) {
    // 创建目标目录
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target, { recursive: true });
    }

    // 读取源目录内容
    const files = fs.readdirSync(source);

    files.forEach(file => {
        const sourcePath = path.join(source, file);
        const targetPath = path.join(target, file);
        const stat = fs.statSync(sourcePath);

        if (stat.isDirectory()) {
            // 递归复制子目录
            copyDirectoryRecursive(sourcePath, targetPath);
        } else {
            // 复制文件
            fs.copyFileSync(sourcePath, targetPath);
        }
    });
}

// 计算目录大小
function getDirectorySize(dirPath) {
    let totalSize = 0;

    function calculateSize(path) {
        const stats = fs.statSync(path);
        if (stats.isDirectory()) {
            const files = fs.readdirSync(path);
            files.forEach(file => {
                calculateSize(dirPath + '/' + file);
            });
        } else {
            totalSize += stats.size;
        }
    }

    calculateSize(dirPath);
    return totalSize;
}

// 添加缓存破坏参数到HTML中的JS和CSS引用
function updateHTMLReferences() {
    console.log('🔄 更新HTML文件引用...');

    const htmlPath = path.join(config.distDir, 'index.html');
    let html = fs.readFileSync(htmlPath, 'utf-8');

    // 生成版本号（使用时间戳）
    const version = Date.now();

    // 更新CSS引用
    html = html.replace(
        /href="styles\.css"/,
        `href="styles.css?v=${version}"`
    );

    // 更新JS引用
    html = html.replace(
        /src="questions\.js"/,
        `src="questions.js?v=${version}"`
    );
    html = html.replace(
        /src="app\.js"/,
        `src="app.js?v=${version}"`
    );

    fs.writeFileSync(htmlPath, html, 'utf-8');
    console.log(`  ✓ 已添加版本号: ${version}`);
}

// 创建构建信息文件
function createBuildInfo() {
    console.log('📝 生成构建信息...');

    const buildInfo = {
        version: '1.0.0',
        buildDate: new Date().toISOString(),
        buildTime: new Date().toLocaleString('zh-CN'),
        environment: 'production',
        files: config.files
    };

    const buildInfoPath = path.join(config.distDir, 'build-info.json');
    fs.writeFileSync(buildInfoPath, JSON.stringify(buildInfo, null, 2), 'utf-8');
    console.log('  ✓ build-info.json 已创建');
}

// 计算总大小
function calculateTotalSize() {
    let totalSize = 0;

    // 计算文件大小
    config.files.forEach(file => {
        const filePath = path.join(config.distDir, file);
        if (fs.existsSync(filePath)) {
            const stats = fs.statSync(filePath);
            totalSize += stats.size;
        }
    });

    // 计算目录大小
    config.directories.forEach(dir => {
        const dirPath = path.join(config.distDir, dir);
        if (fs.existsSync(dirPath)) {
            totalSize += getDirectorySize(dirPath);
        }
    });

    return totalSize;
}

// 主构建函数
function build() {
    console.log('\n🚀 开始构建...\n');

    try {
        cleanDist();
        copyFiles();
        copyDirectories();
        updateHTMLReferences();
        createBuildInfo();

        const totalSize = calculateTotalSize();

        console.log('\n✨ 构建完成！');
        console.log('\n📊 构建统计:');
        console.log(`  - 输出目录: ${config.distDir}`);
        console.log(`  - 文件数量: ${config.files.length}`);
        console.log(`  - 总大小: ${(totalSize / 1024).toFixed(2)} KB`);
        console.log('\n💡 使用以下命令预览:');
        console.log('  npm run serve');
        console.log('\n📦 dist目录内容已准备好部署！\n');

    } catch (error) {
        console.error('\n❌ 构建失败:', error.message);
        process.exit(1);
    }
}

// 运行构建
build();
