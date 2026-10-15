/**
 * 贺卡数据编解码、单文件 HTML 独立编译器与导出器
 * 包含 5 款明亮光鲜主题与各自独特的交互实体（蛋糕、烟花、热气球、礼物盒、许愿星瓶）
 */

const CardGenerator = {
    // 5 款各具特色的实体交互模板
    templates: [
        {
            id: 'cake',
            name: '甜蜜蛋糕',
            desc: '草莓奶油 · 点亮与吹灭蜡烛',
            badge: 'SWEET BIRTHDAY',
            previewGradient: 'linear-gradient(135deg, #ffe3e3, #ff7675)',
            accentColor: '#ff7675',
            icon: '🎂',
            hintText: '✨ 点击吹灭蜡烛许愿',
            wishResponse: '🎂 蜡烛已吹灭！愿你所求皆所愿，岁岁平安！'
        },
        {
            id: 'fireworks',
            name: '璀璨烟花',
            desc: '盛大绽放 · 绚丽烟火盛宴',
            badge: 'SPARKLING FIESTA',
            previewGradient: 'linear-gradient(135deg, #fef3c7, #f59e0b)',
            accentColor: '#f59e0b',
            icon: '🎆',
            hintText: '✨ 点击燃放绚丽生日烟花',
            wishResponse: '🎆 璀璨烟花绽放！祝你前程繁花似锦，光彩夺目！'
        },
        {
            id: 'balloon',
            name: '云端热气球',
            desc: '雪山云端 · 飞向壮阔远方',
            badge: 'SKY ADVENTURE',
            previewGradient: 'linear-gradient(135deg, #e0f2fe, #38bdf8)',
            accentColor: '#38bdf8',
            icon: '🎈',
            hintText: '✨ 点击飞向雪山云端',
            wishResponse: '🎈 热气球飞向雪山云端！愿你的人生壮阔明朗！'
        },
        {
            id: 'giftbox',
            name: '魔法礼物盒',
            desc: '惊喜公仔 · 开启萌趣礼遇',
            badge: 'SPECIAL SURPRISE',
            previewGradient: 'linear-gradient(135deg, #fce7f3, #ec4899)',
            accentColor: '#ec4899',
            icon: '🎁',
            hintText: '✨ 点击弹出惊喜公仔',
            wishResponse: '🧸 惊喜公仔为你送福！愿生活每天都有甜蜜小确幸！'
        },
        {
            id: 'starjar',
            name: '许愿幸运星瓶',
            desc: '心愿漂流 · 随风飘向远方',
            badge: 'LUCKY STAR WISHES',
            previewGradient: 'linear-gradient(135deg, #f3e8ff, #a855f7)',
            accentColor: '#a855f7',
            icon: '⭐',
            hintText: '✨ 点击让心愿飞向远方',
            wishResponse: '⭐ 许愿瓶载着心愿飘向星海！愿你所有愿望都成真！'
        }
    ],

    // 生成实体 Hero HTML
    getHeroHtml(themeId) {
        switch (themeId) {
            case 'fireworks':
                return `
                <div id="heroScene" class="hero-scene-container" data-hero="fireworks" title="点击燃放绚丽烟花">
                    <div class="fireworks-wrapper">
                        <svg class="firework-rocket-svg" viewBox="0 0 100 90">
                            <ellipse cx="50" cy="82" rx="42" ry="7" fill="#fbbf24" opacity="0.3" />
                            <rect x="24" y="38" width="14" height="44" rx="4" fill="#f59e0b" transform="rotate(-15 31 60)" />
                            <polygon points="20,38 31,18 42,38" fill="#ef4444" transform="rotate(-15 31 60)" />
                            <rect x="62" y="38" width="14" height="44" rx="4" fill="#3b82f6" transform="rotate(15 69 60)" />
                            <polygon points="58,38 69,18 80,38" fill="#10b981" transform="rotate(15 69 60)" />
                            <rect x="42" y="30" width="16" height="52" rx="4" fill="#ef4444" />
                            <polygon points="38,30 50,8 62,30" fill="#f59e0b" />
                            <path d="M 42 45 Q 50 48 58 45" stroke="#ffd700" stroke-width="2" fill="none" />
                            <path d="M 42 60 Q 50 63 58 60" stroke="#ffd700" stroke-width="2" fill="none" />
                        </svg>
                        <svg class="firework-bloom-art" viewBox="0 0 120 120">
                            <g transform="translate(60,60)">
                                <circle cx="0" cy="0" r="10" fill="#ffd700" />
                                <circle cx="0" cy="0" r="4" fill="#ffffff" />
                                <path d="M 0 -12 L 0 -48 M 0 12 L 0 48 M -12 0 L -48 0 M 12 0 L 48 0" stroke="#ff4757" stroke-width="3" stroke-linecap="round" />
                                <path d="M -9 -9 L -36 -36 M 9 9 L 36 36 M 9 -9 L 36 -36 M -9 9 L -36 36" stroke="#ffa502" stroke-width="2.5" stroke-linecap="round" />
                                <path d="M -5 -11 L -22 -44 M 5 11 L 22 44 M 11 -5 L 44 -22 M -11 5 L -44 22" stroke="#2ed573" stroke-width="2" stroke-linecap="round" />
                                <path d="M -11 -5 L -44 -22 M 11 5 L 44 22 M -5 11 L -22 44 M 5 -11 L 22 -44" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
                                <circle class="bloom-spark-dot" cx="0" cy="-52" r="3.5" fill="#ffd700" />
                                <circle class="bloom-spark-dot" cx="0" cy="52" r="3.5" fill="#ffd700" />
                                <circle class="bloom-spark-dot" cx="-52" cy="0" r="3.5" fill="#ffd700" />
                                <circle class="bloom-spark-dot" cx="52" cy="0" r="3.5" fill="#ffd700" />
                                <circle class="bloom-spark-dot" cx="-39" cy="-39" r="3" fill="#ff4757" />
                                <circle class="bloom-spark-dot" cx="39" cy="39" r="3" fill="#ff4757" />
                                <circle class="bloom-spark-dot" cx="39" cy="-39" r="3" fill="#ffa502" />
                                <circle class="bloom-spark-dot" cx="-39" cy="39" r="3" fill="#ffa502" />
                            </g>
                        </svg>
                    </div>
                    <span id="heroHint" class="hero-interactive-hint">✨ 点击燃放绚丽生日烟花</span>
                </div>`;

            case 'balloon':
                return `
                <div id="heroScene" class="hero-scene-container" data-hero="balloon" title="点击热气球飞向雪山云端">
                    <div class="balloon-wrapper">
                        <svg class="snow-mountains-svg" viewBox="0 0 150 75">
                            <circle cx="120" cy="22" r="14" fill="#fde047" opacity="0.8" />
                            <polygon points="50,75 88,24 125,75" fill="#94a3b8" />
                            <polygon points="88,24 76,40 88,36 96,42 100,38" fill="#ffffff" />
                            <polygon points="85,75 120,16 150,75" fill="#64748b" />
                            <polygon points="120,16 108,32 120,28 128,34 135,30" fill="#ffffff" />
                            <polygon points="0,75 40,32 75,75" fill="#cbd5e1" />
                            <polygon points="40,32 30,44 40,40 48,46 54,42" fill="#ffffff" />
                            <path d="M 0 70 Q 20 62 40 70 Q 65 60 90 70 Q 120 62 150 70 L 150 75 L 0 75 Z" fill="#ffffff" opacity="0.9" />
                        </svg>
                        <svg class="balloon-wind-trail" viewBox="0 0 60 40" width="60" height="40">
                            <path d="M 10 35 Q 25 10 45 25" stroke="#bae6fd" stroke-width="2" stroke-linecap="round" fill="none" stroke-dasharray="4,4" />
                        </svg>
                        <div class="hot-air-balloon-group">
                            <svg viewBox="0 0 100 110" style="width:100%;height:100%;">
                                <path d="M 50 8 C 20 8 18 50 38 72 L 62 72 C 82 50 80 8 50 8 Z" fill="#38bdf8" />
                                <path d="M 50 8 C 32 8 30 50 43 72 L 57 72 C 70 50 68 8 50 8 Z" fill="#fbbf24" />
                                <path d="M 50 8 C 41 8 39 50 47 72 L 53 72 C 61 50 59 8 50 8 Z" fill="#f43f5e" />
                                <line x1="42" y1="72" x2="44" y2="82" stroke="#78716c" stroke-width="1.2" />
                                <line x1="58" y1="72" x2="56" y2="82" stroke="#78716c" stroke-width="1.2" />
                                <rect x="43" y="82" width="14" height="12" rx="2" fill="#d97706" stroke="#92400e" stroke-width="0.8" />
                                <path d="M 43 86 L 57 86" stroke="#b45309" stroke-width="0.8" />
                            </svg>
                        </div>
                    </div>
                    <span id="heroHint" class="hero-interactive-hint">✨ 点击飞向雪山云端</span>
                </div>`;

            case 'giftbox':
                return `
                <div id="heroScene" class="hero-scene-container" data-hero="giftbox" title="点击拆开神秘礼盒">
                    <div class="giftbox-wrapper">
                        <div class="toy-doll-wrapper">
                            <div class="doll-sparkles">
                                <span>✨</span><span>🎉</span>
                            </div>
                            <svg viewBox="0 0 100 100" style="width:100%;height:100%;">
                                <circle cx="32" cy="30" r="12" fill="#d97706" />
                                <circle cx="32" cy="30" r="6" fill="#fde68a" />
                                <circle cx="68" cy="30" r="12" fill="#d97706" />
                                <circle cx="68" cy="30" r="6" fill="#fde68a" />
                                <circle cx="50" cy="50" r="28" fill="#f59e0b" />
                                <polygon points="50,12 40,32 60,32" fill="#ef4444" />
                                <circle cx="50" cy="11" r="3.5" fill="#fde047" />
                                <path d="M 42 26 L 58 26" stroke="#ffffff" stroke-width="1.8" />
                                <ellipse cx="34" cy="56" rx="4" ry="2.5" fill="#f43f5e" opacity="0.6" />
                                <ellipse cx="66" cy="56" rx="4" ry="2.5" fill="#f43f5e" opacity="0.6" />
                                <circle cx="41" cy="46" r="3.5" fill="#1e293b" />
                                <circle cx="42" cy="45" r="1" fill="#ffffff" />
                                <circle cx="59" cy="46" r="3.5" fill="#1e293b" />
                                <circle cx="60" cy="45" r="1" fill="#ffffff" />
                                <ellipse cx="50" cy="56" rx="9" ry="7" fill="#fef3c7" />
                                <polygon points="50,52 46,50 54,50" fill="#78350f" />
                                <path d="M 50 53 L 50 57 M 47 57 Q 50 60 53 57" stroke="#78350f" stroke-width="1.5" stroke-linecap="round" fill="none" />
                                <ellipse cx="23" cy="62" rx="7" ry="6" fill="#d97706" transform="rotate(-20 23 62)" />
                                <ellipse cx="77" cy="62" rx="7" ry="6" fill="#d97706" transform="rotate(20 77 62)" />
                            </svg>
                        </div>
                        <svg class="giftbox-box-base" viewBox="0 0 100 80">
                            <ellipse cx="50" cy="74" rx="42" ry="6" fill="#be185d" opacity="0.15" />
                            <rect x="22" y="28" width="56" height="46" rx="4" fill="#f43f5e" />
                            <rect x="46" y="28" width="8" height="46" fill="#ffd700" />
                            <rect x="22" y="48" width="56" height="6" fill="#ffd700" />
                            <g class="giftbox-lid-group">
                                <rect x="18" y="16" width="64" height="14" rx="3" fill="#e11d48" />
                                <rect x="46" y="16" width="8" height="14" fill="#ffd700" />
                                <path d="M 50 16 C 38 0 26 6 44 14 Z" fill="#ffd700" />
                                <path d="M 50 16 C 62 0 74 6 56 14 Z" fill="#ffd700" />
                                <circle cx="50" cy="16" r="3.5" fill="#f59e0b" />
                            </g>
                        </svg>
                    </div>
                    <span id="heroHint" class="hero-interactive-hint">✨ 点击弹出惊喜公仔</span>
                </div>`;

            case 'starjar':
                return `
                <div id="heroScene" class="hero-scene-container" data-hero="starjar" title="点击许愿瓶飘向远方">
                    <div class="starjar-wrapper">
                        <svg class="star-drift-trail" viewBox="0 0 80 50">
                            <path d="M 15 40 Q 40 25 70 8" stroke="#c084fc" stroke-width="1.8" stroke-dasharray="3,4" fill="none" opacity="0.7" />
                            <polygon points="35,28 37,31 41,31 38,33 39,37 35,35 31,37 32,33 29,31 33,31" fill="#fde047" opacity="0.8" />
                            <polygon points="58,16 60,18 63,18 61,20 62,23 58,21 55,23 56,20 53,18 56,18" fill="#f472b6" opacity="0.85" />
                            <circle cx="72" cy="7" r="2.5" fill="#ffd700" />
                        </svg>
                        <div class="starjar-main-bottle">
                            <svg viewBox="0 0 100 110" style="width:100%;height:100%;">
                                <ellipse cx="50" cy="98" rx="34" ry="6" fill="#7e22ce" opacity="0.15" />
                                <polygon points="42,20 58,20 56,12 44,12" fill="#d97706" />
                                <rect x="40" y="20" width="20" height="6" rx="2" fill="rgba(255,255,255,0.7)" stroke="#c084fc" stroke-width="1.5" />
                                <path d="M 40 26 C 24 34 22 78 30 92 C 36 98 64 98 70 92 C 78 78 76 34 60 26 Z" fill="rgba(243, 232, 255, 0.55)" stroke="#c084fc" stroke-width="1.8" />
                                <path d="M 30 38 Q 26 62 32 86" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.85" />
                                <g class="starjar-star-glow">
                                    <polygon points="50,48 52,53 57,53 53,56 55,61 50,58 45,61 47,56 43,53 48,53" fill="#fbbf24" />
                                    <polygon points="40,68 42,72 47,72 43,75 45,79 40,76 35,79 37,75 33,72 38,72" fill="#f472b6" />
                                    <polygon points="60,65 61,69 65,69 62,71 63,75 60,73 57,75 58,71 55,69 59,69" fill="#38bdf8" />
                                    <polygon points="50,82 51,86 56,86 52,88 54,92 50,90 46,92 48,88 44,86 49,86" fill="#34d399" />
                                </g>
                            </svg>
                        </div>
                    </div>
                    <span id="heroHint" class="hero-interactive-hint">✨ 点击让心愿飞向远方</span>
                </div>`;

            case 'cake':
            default:
                return `
                <div id="heroScene" class="hero-scene-container" data-hero="cake" title="点击吹灭蜡烛">
                    <div class="cake-wrapper">
                        <svg viewBox="0 0 100 90" style="width:100%;height:100%;">
                            <path class="candle-flame" d="M 50 10 Q 55 2 50 0 Q 45 2 50 10" fill="#ffa502" />
                            <ellipse class="candle-flame" cx="50" cy="7" rx="2.5" ry="4" fill="#ff4757" />
                            <rect x="47" y="10" width="6" height="20" rx="2" fill="#fff" stroke="#ff7675" stroke-width="0.8" />
                            <path d="M 30 38 Q 35 34 40 38 Q 45 42 50 38 Q 55 34 60 38 Q 65 42 70 38 L 70 34 Q 50 30 30 34 Z" fill="#fff" />
                            <rect x="30" y="34" width="40" height="22" rx="4" fill="#ff9ff3" />
                            <path d="M 30 42 Q 40 46 50 42 Q 60 46 70 42 L 70 45 Q 50 50 30 45 Z" fill="#feca57" />
                            <rect x="18" y="56" width="64" height="28" rx="6" fill="#f368e0" />
                            <path d="M 18 64 Q 28 68 38 64 Q 48 60 58 64 Q 68 68 82 64 L 82 68 Q 50 78 18 68 Z" fill="#ffffff" />
                            <ellipse cx="50" cy="85" rx="46" ry="5" fill="#dfe6e9" />
                        </svg>
                        <div class="smoke-puff"></div>
                    </div>
                    <span id="heroHint" class="hero-interactive-hint">✨ 点击吹灭蜡烛许愿</span>
                </div>`;
        }
    },

    // 常用预设祝福语
    presetWishes: {
        warm: [
            "愿你的岁月中，生活明朗，万物可爱，生辰安康，万事尽欢！🎂✨",
            "愿你眼里有星光，身旁有清风，心中有暖阳，所有温暖与美好都如约而至！💐",
            "岁岁常欢愉，年年皆胜意！愿新的一岁里，所求皆所愿，所行化坦途！🎈"
        ],
        humor: [
            "恭喜你升级到最新版本！系统提示：颜值+100%，暴富概率提升999%！🥳🎉",
            "听说今天过生日的人都会变得更好看、更有钱，果然看你就知道是真的！🍰💰",
            "无论几岁，快乐万岁！愿你永远长不大，兜里有糖，眼里有光！🚀✨"
        ],
        poetic: [
            "愿如初升之阳，明媚绚烂；愿如皎白之月，温润从容。生辰吉乐，岁岁平安。🌙",
            "愿你心中有梦，脚下有路，不负韶华，不负春秋。生辰吉瑞，顺遂无忧。🍃",
            "花看半开，酒饮微醺；愿你历尽千帆，归来仍是明媚少年。🌸"
        ],
        sweet: [
            "亲爱的，感谢生命中遇见你。愿把所有的星光与温柔都送给你！生日快乐！💖",
            "在所有微风吹过的日子里，今天的风最温柔。祝你生日快乐，我的挚友！🍰💕"
        ]
    },

    // 安全紧凑 UTF-8 URL-Safe Base64 编码 (大幅缩短链接长度，去除冗余 key 与 %2F %3D 乱码)
    encodeCardData(data) {
        try {
            // 使用紧凑元组: [recipient, sender, date, message, theme, badge]
            const compactArr = [
                data.recipient || '',
                data.sender || '',
                data.date || '',
                data.message || '',
                data.theme || 'cake',
                data.badge || ''
            ];
            const jsonStr = JSON.stringify(compactArr);
            const utf8Bytes = encodeURIComponent(jsonStr).replace(/%([0-9A-F]{2})/g, (match, p1) => {
                return String.fromCharCode('0x' + p1);
            });
            // 转换为 URL-safe Base64: 无需二次 encodeURIComponent，不含 +, /, =
            return btoa(utf8Bytes)
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');
        } catch (e) {
            console.error('编码失败', e);
            return '';
        }
    },

    // 安全 UTF-8 URL-Safe Base64 解码 (双向兼容紧凑数组与旧版 JSON 对象)
    decodeCardData(encodedStr) {
        try {
            if (!encodedStr) return null;
            // 兼容可能经过浏览器 URL 转义或原生传入的字符串
            let raw = decodeURIComponent(encodedStr);
            let base64 = raw.replace(/-/g, '+').replace(/_/g, '/');
            while (base64.length % 4) {
                base64 += '=';
            }
            const binaryStr = atob(base64);
            const jsonStr = decodeURIComponent(Array.prototype.map.call(binaryStr, (c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            const parsed = JSON.parse(jsonStr);

            // 1. 若为紧凑数组格式
            if (Array.isArray(parsed)) {
                return {
                    recipient: parsed[0] || '朋友',
                    sender: parsed[1] || '好友',
                    date: parsed[2] || '',
                    message: parsed[3] || '',
                    theme: parsed[4] || 'cake',
                    badge: parsed[5] || ''
                };
            }
            // 2. 若为旧版完整对象格式
            if (typeof parsed === 'object' && parsed !== null) {
                return parsed;
            }
            return null;
        } catch (e) {
            console.error('解码失败', e);
            return null;
        }
    },

    // 生成分享 URL (干净简短，无任何 % 转义字符)
    generateShareUrl(cardData) {
        const encoded = this.encodeCardData(cardData);
        const baseUrl = window.location.href.split('?')[0].replace(/index\.html$/, '') + 'card.html';
        return `${baseUrl}?d=${encoded}`;
    },

    // 编译纯单文件自包含 HTML（无需任何网络依赖，明亮光鲜，完美独立运行）
    generateStandaloneHtml(cardData, cssContent, audioSynthJs, particlesJs) {
        const theme = cardData.theme || 'cake';
        const recipientName = cardData.recipient || '朋友';
        const senderName = cardData.sender || '好友';
        const dateStr = cardData.date || '特别的一天';
        const message = (cardData.message || '祝你生日快乐，万事顺遂！').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const badge = cardData.badge || 'HAPPY BIRTHDAY';
        const heroHtml = this.getHeroHtml(theme);

        const currentTpl = this.templates.find(t => t.id === theme) || this.templates[0];
        const wishResponse = currentTpl.wishResponse;

        return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="description" content="送给 ${recipientName} 的生日祝福：${message.substring(0, 50)}">
    <!-- 微信 / QQ 社交分享卡片规范 -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="💌 送给 ${recipientName} 的生日贺卡 🎂">
    <meta property="og:description" content="${message.substring(0, 50)}">
    <meta property="og:image" content="https://wlmworld.top/cards/images/share-cover.jpg">
    <meta itemprop="name" content="💌 送给 ${recipientName} 的生日贺卡 🎂">
    <meta itemprop="description" content="${message.substring(0, 50)}">
    <meta itemprop="image" content="https://wlmworld.top/cards/images/share-cover.jpg">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body, html {
            width: 100%;
            height: 100%;
            font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Segoe UI", Roboto, sans-serif;
            overflow-x: hidden;
        }
        ${cssContent}
    </style>
</head>
<body class="theme-${theme}">
    <!-- 微信/QQ 网页分享气泡专用隐藏缩略图 (绝对路径加速爬虫抓取) -->
    <div style="display:none;font-size:0;line-height:0;margin:0;padding:0;overflow:hidden;width:0;height:0;">
        <img src="https://wlmworld.top/cards/images/share-cover.jpg" width="300" height="300" alt="生日贺卡">
    </div>

    <div class="card-scene">
        <!-- 粒子画布 -->
        <canvas id="particleCanvas" class="particle-canvas"></canvas>

        <!-- 音乐播放开关 -->
        <button id="musicBtn" class="music-toggle-btn" title="播放/暂停生日音乐" aria-label="音乐开关">
            <span>🎵</span>
        </button>

        <!-- 拆信与贺卡容器 -->
        <div id="envelopeWrapper" class="envelope-wrapper">
            <!-- 信封外层 -->
            <div class="envelope-box">
                <div class="envelope-flap"></div>
                <div class="wax-seal">
                    <span class="seal-icon">${currentTpl.icon}</span>
                    <span class="seal-hint">拆开</span>
                </div>
                <div class="envelope-pocket"></div>
                <div class="envelope-intro-text">
                    <span>💌 送给 <b>${recipientName}</b> 的生日心意 · 点击拆开</span>
                </div>
            </div>

            <!-- 贺卡内部实体 -->
            <main class="card-main">
                <div class="card-inner-frame">
                    <div class="card-badge">${badge}</div>

                    <div class="card-title-wrap">
                        <h1 class="card-title">祝 ${recipientName} 生日快乐！</h1>
                        <p class="card-subtitle">愿所有美好都如约而至</p>
                    </div>

                    <!-- 独立实体交互组件 -->
                    ${heroHtml}

                    <!-- 祝贺语内容 -->
                    <div class="card-message-box">
                        <p class="card-message-text">${message}</p>
                    </div>

                    <!-- 贺卡落款 -->
                    <div class="card-footer">
                        <div class="card-date-wrap">
                            <span class="card-date">📅 ${dateStr}</span>
                        </div>
                        <div class="card-sender">
                            <div class="card-sender-label">祝福寄语来自</div>
                            <div class="card-sender-name">${senderName}</div>
                        </div>
                    </div>
                </div>
            </main>
        </div>

        <!-- 愿望达成飘屏提示 -->
        <div id="wishToast" class="wish-toast">
            <span>✨ ${wishResponse} ✨</span>
        </div>
    </div>

    <script>
        ${audioSynthJs}
    </script>
    <script>
        ${particlesJs}
    </script>
    <script>
        (function() {
            const theme = "${theme}";
            const canvas = document.getElementById('particleCanvas');
            const envelopeWrapper = document.getElementById('envelopeWrapper');
            const heroScene = document.getElementById('heroScene');
            const heroHint = document.getElementById('heroHint');
            const wishToast = document.getElementById('wishToast');
            const musicBtn = document.getElementById('musicBtn');

            const particles = new CardParticleSystem(canvas, theme);
            particles.start();

            const player = new BirthdayAudioPlayer();

            // 拆信封
            let opened = false;
            envelopeWrapper.addEventListener('click', function(e) {
                if (opened) return;
                opened = true;
                envelopeWrapper.classList.add('is-opening');
                player.start();
                musicBtn.classList.add('is-playing');

                const rect = envelopeWrapper.getBoundingClientRect();
                particles.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 70);

                setTimeout(() => {
                    envelopeWrapper.classList.remove('is-opening');
                    envelopeWrapper.classList.add('is-opened');
                }, 600);
            });

            // 音乐开关
            musicBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const playing = player.toggle();
                musicBtn.classList.toggle('is-playing', playing);
            });

            // 各主题独特实体交互逻辑
            let heroTriggered = false;
            if (heroScene) {
                heroScene.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const rect = heroScene.getBoundingClientRect();
                    const cx = rect.left + rect.width / 2;
                    const cy = rect.top + rect.height / 2;

                    switch (theme) {
                        case 'cake': {
                            const cakeWrap = heroScene.querySelector('.cake-wrapper');
                            if (cakeWrap && !cakeWrap.classList.contains('is-blown')) {
                                cakeWrap.classList.add('is-blown');
                                heroHint.textContent = '🎉 愿望已送达宇宙！';
                                player.playBlowSound();
                                particles.burst(cx, cy - 20, 50);
                            }
                            break;
                        }
                        case 'fireworks': {
                            const fwWrap = heroScene.querySelector('.fireworks-wrapper');
                            if (fwWrap) {
                                fwWrap.classList.add('is-blooming');
                            }
                            player.playFireworkSound();
                            particles.launchFirework(cx, 70);
                            particles.launchFirework(cx - 50, 100);
                            particles.launchFirework(cx + 50, 85);
                            heroHint.textContent = '🎆 盛大烟火绚丽绽放！';
                            break;
                        }
                        case 'balloon': {
                            const balloonWrap = heroScene.querySelector('.balloon-wrapper');
                            if (balloonWrap) {
                                balloonWrap.classList.add('is-flying-away');
                            }
                            player.playMagicSparkleSound();
                            particles.burst(cx, cy, 45);
                            heroHint.textContent = '🎈 热气球飞向雪山云端！';
                            break;
                        }
                        case 'giftbox': {
                            const giftWrap = heroScene.querySelector('.giftbox-wrapper');
                            if (giftWrap) {
                                giftWrap.classList.add('is-opened');
                            }
                            player.playMagicSparkleSound();
                            particles.burst(cx, cy - 25, 55);
                            heroHint.textContent = '🧸 萌趣公仔跳出来啦！';
                            break;
                        }
                        case 'starjar': {
                            const jarWrap = heroScene.querySelector('.starjar-wrapper');
                            if (jarWrap) {
                                jarWrap.classList.add('is-drifting-away');
                            }
                            player.playMagicSparkleSound();
                            particles.burst(cx, cy, 50);
                            heroHint.textContent = '⭐ 许愿瓶乘着星光飘向远方！';
                            break;
                        }
                    }

                    wishToast.classList.add('show');
                    setTimeout(() => {
                        wishToast.classList.remove('show');
                    }, 3500);
                });
            }
        })();
    </script>
</body>
</html>`;
    }
};

window.CardGenerator = CardGenerator;
