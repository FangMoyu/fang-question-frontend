# 神经网络知识答题平台

一个纯前端静态Web答题应用，支持单选题、多选题、判断题三种题型。

## 功能特性

- **章节练习**：按8个章节分别练习
- **随机练习**：从所有题目中随机抽取
- **即时反馈**：答题后立即显示正确/错误及正确答案
- **进度跟踪**：显示当前进度和得分
- **结果统计**：完成后显示正确率统计
- **响应式设计**：支持PC和移动端

## 快速开始

### 本地运行

```bash
# 方式1：直接用浏览器打开
# 双击 index.html 文件即可

# 方式2：使用构建脚本
npm run build
npm run serve
```

### 构建生产版本

```bash
# 构建项目到 dist 目录
npm run build

# 预览构建结果
npm run serve
# 或
npm run preview
```

构建完成后，`dist` 目录包含所有用于部署的文件：
```
dist/
├── index.html          # 主页面（带版本号）
├── styles.css          # 样式文件
├── app.js              # 应用逻辑
├── questions.js        # 题目数据
└── build-info.json     # 构建信息
```

## 部署方法

### 方法一：直接部署 dist 目录

将整个 `dist` 目录上传到Web服务器：

```bash
# 使用 scp 上传到服务器
scp -r dist/* user@server:/var/www/html/

# 或使用 rsync
rsync -avz dist/ user@server:/var/www/html/
```

### 方法二：Nginx 部署

1. 安装 Nginx
```bash
# Ubuntu/Debian
sudo apt install nginx

# CentOS/RHEL
sudo yum install nginx
```

2. 配置 Nginx

编辑 `/etc/nginx/sites-available/quiz`：
```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/quiz/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 启用 gzip 压缩
    gzip on;
    gzip_types text/css application/javascript;

    # 缓存静态资源
    location ~* \.(css|js|jpg|png|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

3. 启用配置
```bash
sudo ln -s /etc/nginx/sites-available/quiz /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 方法三：Apache 部署

1. 安装 Apache
```bash
# Ubuntu/Debian
sudo apt install apache2

# CentOS/RHEL
sudo yum install httpd
```

2. 创建虚拟主机配置

编辑 `/etc/apache2/sites-available/quiz.conf`：
```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /var/www/quiz/dist

    <Directory /var/www/quiz/dist>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted

        # 启用重写规则
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>

    # 启用压缩
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/html text/css application/javascript
    </IfModule>
</VirtualHost>
```

3. 启用站点
```bash
sudo a2ensite quiz
sudo systemctl reload apache2
```

### 方法四：云服务部署

#### Vercel (推荐)

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
cd dist
vercel
```

或直接访问 [vercel.com](https://vercel.com) 拖拽 `dist` 文件夹。

#### Netlify

```bash
# 安装 Netlify CLI
npm i -g netlify-cli

# 部署
cd dist
netlify deploy --prod
```

或直接访问 [netlify.com](https://netlify.com) 拖拽 `dist` 文件夹。

#### GitHub Pages

1. 创建 `docs` 目录
2. 将 dist 目录内容复制到 docs
3. 推送到 GitHub
4. 在仓库设置中启用 GitHub Pages，选择 `docs` 分支

### 方法五：Docker 部署

创建 `Dockerfile`：
```dockerfile
FROM nginx:alpine
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

构建并运行：
```bash
docker build -t quiz-platform .
docker run -d -p 80:80 quiz-platform
```

## 项目结构

```
fang-question-frontend/
├── src/                    # 源文件（可选）
├── dist/                   # 构建输出目录（用于部署）
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   ├── questions.js
│   └── build-info.json
├── index.html             # 开发用入口
├── styles.css             # 样式源文件
├── questions.js           # 题目数据（163题）
├── app.js                 # 应用逻辑
├── build.js               # 构建脚本
├── package.json           # 项目配置
└── README.md              # 说明文档
```

## 更新题库

题目数据存储在 `questions.js` 文件中，格式如下：

```javascript
const questionsData = {
    "第一章": {
        singleChoice: [...],   // 单选题
        multipleChoice: [...],  // 多选题
        judgment: [...]         // 判断题
    },
    // ...
};
```

修改题目后重新构建即可：
```bash
npm run build
```

## 浏览器兼容性

- Chrome/Edge (推荐)
- Firefox 60+
- Safari 12+
- 移动端浏览器

## 性能优化建议

1. **启用 CDN**：将静态资源托管到 CDN
2. **启用压缩**：使用 Nginx/Apache 的 gzip 压缩
3. **设置缓存**：为 CSS/JS 设置长期缓存
4. **使用 HTTPS**：提升安全性和性能

## 技术栈

- HTML5
- CSS3 (Flexbox, Grid, Animations)
- 原生 JavaScript (ES6+)
- 无框架依赖

## 开发

```bash
# 克隆项目
git clone <repository-url>

# 进入项目目录
cd fang-question-frontend

# 运行本地服务器
npx http-server -p 8080

# 或使用 Python
python -m http.server 8080
```

访问 http://localhost:8080

## 版本控制

每次构建会生成带版本号的资源引用，例如：
```html
<link rel="stylesheet" href="styles.css?v=1766847992796">
<script src="questions.js?v=1766847992796"></script>
```

这有助于在部署后强制用户获取最新版本。

## 许可证

MIT License

## 更新日志

- **v1.0.0** (2024-12-27)
  - 初始版本发布
  - 支持8章163道题目
  - 完整的答题和统计功能
