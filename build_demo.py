import json

def build():
    with open('css/card-themes.css', 'r', encoding='utf-8') as f:
        css = f.read()
    with open('js/audio-synth.js', 'r', encoding='utf-8') as f:
        audio = f.read()
    with open('js/particles.js', 'r', encoding='utf-8') as f:
        particles = f.read()

    # 1. 更新 bundle-assets.js 用于离线/本地协议
    bundle_code = f"""// 离线/本地文件协议兜底静态资源包
window.CARD_ASSETS = {{
    css: {json.dumps(css, ensure_ascii=False)},
    audioJs: {json.dumps(audio, ensure_ascii=False)},
    particlesJs: {json.dumps(particles, ensure_ascii=False)}
}};
"""
    with open('js/bundle-assets.js', 'w', encoding='utf-8') as f:
        f.write(bundle_code)
    print("Updated js/bundle-assets.js")

    # 2. 生成 demo-birthday-card.html 示例独立单文件
    hero_cake_html = """
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
                </div>
    """

    demo_html = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>送给 晓华 的生日贺卡 🎂</title>
    <meta name="description" content="送给 晓华 的生日祝福：愿你的岁月中，生活明朗，万物可爱，生辰安康，万事尽欢！🎂✨">
    <meta property="og:type" content="website">
    <meta property="og:title" content="💌 送给 晓华 的生日贺卡 🎂">
    <meta property="og:description" content="愿你的岁月中，生活明朗，万物可爱，生辰安康，万事尽欢！🎂✨">
    <meta property="og:image" content="https://wlmworld.top/cards/images/share-cover.jpg">
    <meta itemprop="name" content="💌 送给 晓华 的生日贺卡 🎂">
    <meta itemprop="description" content="愿你的岁月中，生活明朗，万物可爱，生辰安康，万事尽欢！🎂✨">
    <meta itemprop="image" content="https://wlmworld.top/cards/images/share-cover.jpg">
    <style>
        * {{ box-sizing: border-box; margin: 0; padding: 0; }}
        body, html {{
            width: 100%;
            height: 100%;
            font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Segoe UI", Roboto, sans-serif;
            overflow-x: hidden;
        }}
        {css}
    </style>
</head>
<body class="theme-cake">
    <!-- 微信/QQ 网页分享气泡专用隐藏缩略图 (绝对路径加速爬虫抓取) -->
    <div style="display:none;font-size:0;line-height:0;margin:0;padding:0;overflow:hidden;width:0;height:0;">
        <img src="https://wlmworld.top/cards/images/share-cover.jpg" width="300" height="300" alt="生日贺卡">
    </div>

    <div class="card-scene">
        <canvas id="particleCanvas" class="particle-canvas"></canvas>

        <button id="musicBtn" class="music-toggle-btn" title="播放/暂停生日音乐" aria-label="音乐开关">
            <span>🎵</span>
        </button>

        <div id="envelopeWrapper" class="envelope-wrapper">
            <div class="envelope-box">
                <div class="envelope-flap"></div>
                <div class="wax-seal">
                    <span class="seal-icon">🎂</span>
                    <span class="seal-hint">拆开</span>
                </div>
                <div class="envelope-pocket"></div>
                <div class="envelope-intro-text">
                    <span>💌 送给 <b>晓华</b> 的生日心意 · 点击拆开</span>
                </div>
            </div>

            <main class="card-main">
                <div class="card-inner-frame">
                    <div class="card-badge">SWEET BIRTHDAY</div>

                    <div class="card-title-wrap">
                        <h1 class="card-title">祝 晓华 生日快乐！</h1>
                        <p class="card-subtitle">愿所有美好都如约而至</p>
                    </div>

                    {hero_cake_html}

                    <div class="card-message-box">
                        <p class="card-message-text">愿你的岁月中，生活明朗，万物可爱，生辰安康，万事尽欢！🎂✨</p>
                    </div>

                    <div class="card-footer">
                        <div class="card-date-wrap">
                            <span class="card-date">📅 2026-10-15</span>
                        </div>
                        <div class="card-sender">
                            <div class="card-sender-label">祝福寄语来自</div>
                            <div class="card-sender-name">爱你的朋友</div>
                        </div>
                    </div>
                </div>
            </main>
        </div>

        <div id="wishToast" class="wish-toast">
            <span>✨ 🎂 蜡烛已吹灭！愿你所求皆所愿，岁岁平安！ ✨</span>
        </div>
    </div>

    <script>{audio}</script>
    <script>{particles}</script>
    <script>
        (function() {{
            const theme = 'cake';
            const canvas = document.getElementById('particleCanvas');
            const envelopeWrapper = document.getElementById('envelopeWrapper');
            const heroScene = document.getElementById('heroScene');
            const heroHint = document.getElementById('heroHint');
            const wishToast = document.getElementById('wishToast');
            const musicBtn = document.getElementById('musicBtn');

            const particles = new CardParticleSystem(canvas, theme);
            particles.start();

            const player = new BirthdayAudioPlayer();

            let opened = false;
            envelopeWrapper.addEventListener('click', function(e) {{
                if (opened) return;
                opened = true;
                envelopeWrapper.classList.add('is-opening');
                player.start();
                musicBtn.classList.add('is-playing');

                const rect = envelopeWrapper.getBoundingClientRect();
                particles.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 70);

                setTimeout(() => {{
                    envelopeWrapper.classList.remove('is-opening');
                    envelopeWrapper.classList.add('is-opened');
                }}, 600);
            }});

            musicBtn.addEventListener('click', function(e) {{
                e.stopPropagation();
                const playing = player.toggle();
                musicBtn.classList.toggle('is-playing', playing);
            }});

            if (heroScene) {{
                heroScene.addEventListener('click', function(e) {{
                    e.stopPropagation();
                    const cakeWrap = heroScene.querySelector('.cake-wrapper');
                    if (cakeWrap && !cakeWrap.classList.contains('is-blown')) {{
                        cakeWrap.classList.add('is-blown');
                        heroHint.textContent = '🎉 愿望已送达宇宙！';
                        player.playBlowSound();
                        const rect = heroScene.getBoundingClientRect();
                        particles.burst(rect.left + rect.width / 2, rect.top + 20, 50);
                    }}
                    wishToast.classList.add('show');
                    setTimeout(() => {{
                        wishToast.classList.remove('show');
                    }}, 3500);
                }});
            }}
        }})();
    </script>
</body>
</html>"""

    with open('demo-birthday-card.html', 'w', encoding='utf-8') as f:
        f.write(demo_html)
    print("Updated demo-birthday-card.html")

if __name__ == '__main__':
    build()
