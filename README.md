<p align="center">
  <img src="images/logo.svg" width="96" height="96" alt="心愿纪 WishCraft Logo">
</p>

<h1 align="center">心愿纪 · WishCraft</h1>

<p align="center">
  <b>温暖明亮声光动效 · 专属生日贺卡定制工坊</b>
</p>

<p align="center">
  <a href="https://wlmworld.top/cards/"><img src="https://img.shields.io/badge/Online%20Demo-%E5%9C%A8%E7%BA%BF%E6%BC%94%E7%A4%BA-ff694b?style=flat-square&logo=googlechrome&logoColor=white" alt="Online Demo"></a>
  <img src="https://img.shields.io/badge/Dependencies-Zero%20Dependency-2ed573?style=flat-square" alt="Zero Dependencies">
  <img src="https://img.shields.io/badge/Audio-Web%20Audio%20API-38bdf8?style=flat-square" alt="Web Audio API">
  <img src="https://img.shields.io/badge/License-MIT-f59e0b?style=flat-square" alt="License">
</p>

---

## 📖 项目简介

**心愿纪 (WishCraft)** 是一款轻量、现代、充满欢庆氛围与独特声光互动的在线生日贺卡生成工具。

彻底告别传统沉闷暗色或简单换皮的贺卡模板，以**阳光明亮的珍珠白与晨曦暖金**为基调，深度打造 **5 款完全不同的专属交互实体**（吹灭蜡烛、烟花盛放、热气球飞升、惊喜礼物盒、幸运星漂流瓶）。

输入寿星姓名、寄语和祝福日期，即可一键生成**纯离线独立单文件 HTML** 或**微信/QQ卡片专属分享短链**。

* 🌐 **线上体验地址**：[https://wlmworld.top/cards/](https://wlmworld.top/cards/)
* 📦 **示例贺卡独立文件**：查看开箱即用的 [demo-birthday-card.html](demo-birthday-card.html)

---

## ✨ 核心特性

### 1. 🎪 5 款独立实体互动主题（不仅是换色，而是完全不同的实体与交互）

| 主题名称 | 专属实体元素 | 专属交互体验 | 专属配套声效与粒子 |
| :--- | :--- | :--- | :--- |
| **🍰 甜蜜蛋糕** (`cake`) | 双层草莓奶油蛋糕与跳动烛火 | 点击吹灭跳动蜡烛，升起轻烟许愿 | 柔和吹气音效、彩色糖果糖粒粒子 |
| **🎆 璀璨烟花** (`fireworks`) | 庆典金色火箭发射台与引信火花 | 点击多发连续升空，在星空绚丽盛放 | 升空鸣笛与清脆爆炸声、金色落星闪粉 |
| **🎈 云端热气球** (`balloon`) | 晴空飘云、雪山群峰与彩虹条纹气球 | 点击喷火升空加速，飞向雪山云端 | 清澈上升泛音旋律、冉冉上升彩色派对气球 |
| **🎁 魔法礼物盒** (`giftbox`) | 扎着金色丝带蝴蝶结的立体礼盒 | 点击盒盖弹开，萌趣小熊公仔跳跃而出 | 欢快八音盒滑音、欢庆彩带与爱心光芒 |
| **⭐ 许愿幸运星瓶** (`starjar`) | 塞着软木塞的发光复古折纸星玻璃瓶 | 点击轻晃玻璃瓶，星光流转飘向远方星海 | 空灵叮咚水晶音、旋转发光五角折纸幸运星 |

### 2. 💌 3D 仿真火漆信封交互
* 接收者打开贺卡时，首先映入眼帘的是对应主题印记的火漆信封。
* 点击火漆印章：信封优雅向上翻开、彩屑四溢、生日八音盒旋律悠然响起、贺卡缓缓升起展开，仪式感拉满。

### 3. 🎵 纯原生 Web Audio API 合成音效（零外部 MP3 依赖）
* 纯浏览器原生代码实时合成清脆空灵的《祝你生日快乐》八音盒旋律。
* 配套吹灭蜡烛风声、烟火升空炸裂、魔法开启滑音，体积轻量（无需加载几兆的外部音频文件），100% 离线可用。

### 4. 🚀 双模分享与查看方式
1. **生成并下载独立 HTML 贺卡**：
   - 自动将样式、SVG 矢量实体、粒子引擎与音频合成器编译为单份自包含 `.html` 文件。
   - **无需任何服务器后端**，通过微信、QQ、邮件发送给好友，对方双击即可直接在浏览器畅玩。
2. **复制在线分享链接**：
   - 数据通过紧凑元组与 URL-Safe 编码打包（无冗长 `%2F` `%3D` 乱码，短小精炼）。
   - 在微信内置浏览器打开后，点击右上角 `···` ➔ **「发送给朋友」**，可自动唤起微信原生精美小卡片气泡（附带标题与封面图）。

---

## 📂 项目结构

```text
WishCraft/
├── index.html               # 贺卡定制工作台（明亮工作台、表单配置、5款实体切换、实时双向仿真预览）
├── card.html                # 在线查看端（动态解析 URL 数据、挂载对应实体、支持微信分享指引）
├── demo-birthday-card.html  # 预编译生成的独立单文件示例贺卡（开箱即用体验）
├── images/
│   ├── logo.svg             # 矢量生日蛋糕 Logo
│   ├── logo.png             # 高清栅格 Logo
│   └── share-cover.jpg      # 微信 / QQ 社交分享卡片专用 300x300 高清封面
├── css/
│   ├── app.css              # 工作台界面样式（晨曦暖阳调性、珍珠白仿真手机外框）
│   └── card-themes.css      # 5款明亮主题、5大独立实体 SVG 动画、仿真拆信动效库
├── js/
│   ├── audio-synth.js       # Web Audio API 八音盒乐曲与多主题互动音效合成器
│   ├── particles.js         # 阳光多形态 Canvas 粒子引擎（糖粒/烟花/上升气球/彩带/五角星）
│   ├── card-generator.js    # 实体组件 HTML 生成器、URL 紧凑编解码器与独立单文件编译器
│   ├── bundle-assets.js     # 本地 file:// 协议免服务运行兜底静态资源包
│   └── app.js               # 主工作台事件监听、双向数据绑定与实体挂载控制
└── build_demo.py            # 单文件示例与离线资源包构建编译脚本
```

---

## 🛠️ 快速启动

本项目为纯前端静态工程，无需 Node.js 或构建工具，直接通过任意静态服务器即可运行：

### 方式 1：Python 本地预览
```bash
# 进入项目目录
cd greetingsCard

# 启动简易 HTTP 服务
python -m http.server 3000
```
访问：
* **制作工作台**：`http://localhost:3000/index.html`
* **贺卡展示页**：`http://localhost:3000/card.html`
* **独立单文件示例**：`http://localhost:3000/demo-birthday-card.html`

### 方式 2：Nginx 部署配置
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /www/wwwroot/cards;
    index index.html;

    # 静态文件长效缓存
    location ~* \.(css|js|jpg|jpeg|png|svg|ico)$ {
        expires 7d;
        add_header Cache-Control "public, no-transform";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 📱 微信 / QQ 社交卡片气泡配置提示

为确保在微信/QQ中转发时呈现出带有标题和缩略图的原生卡片：
1. 项目已在 `card.html` 中配置完整的 Open Graph Protocol 规范标签；
2. 封面图固定部署于 `/images/share-cover.jpg`（尺寸建议 300×300 像素以上）；
3. **在微信中转发技巧**：将链接发送至微信后，点开网页 ➔ 点击右上角 **「···」** ➔ 选择 **「发送给朋友」**，微信即可自动生成精美卡片气泡。

---

## 📄 开源协议

本项目基于 [MIT License](LICENSE) 开源。欢迎 Star、Fork 与二次创作定制！
