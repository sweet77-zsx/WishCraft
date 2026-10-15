/**
 * 生日贺卡工坊 主交互控制逻辑 (支持5大独立实体与明亮温暖声光)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 贺卡全局状态
    const state = {
        recipient: '晓华',
        sender: '爱你的朋友',
        date: new Date().toISOString().split('T')[0],
        message: '愿你的岁月中，生活明朗，万物可爱，生辰安康，万事尽欢！🎂✨',
        theme: 'cake',
        badge: 'SWEET BIRTHDAY',
        previewOpened: false
    };

    // DOM 元素引用
    const elRecipient = document.getElementById('inputRecipient');
    const elSender = document.getElementById('inputSender');
    const elDate = document.getElementById('inputDate');
    const elMessage = document.getElementById('inputMessage');
    const elTemplateGrid = document.getElementById('templateGrid');
    const elPresetTabs = document.getElementById('presetTabs');
    const elPresetList = document.getElementById('presetList');

    // 预览区域 DOM
    const previewContainer = document.getElementById('previewCardScene');
    const previewCanvas = document.getElementById('previewParticleCanvas');
    const previewEnvelope = document.getElementById('previewEnvelopeWrapper');
    const previewIntroName = document.getElementById('previewIntroRecipientName');
    const previewSealIcon = document.getElementById('previewSealIcon');
    const previewTitle = document.getElementById('previewCardTitle');
    const previewBadge = document.getElementById('previewCardBadge');
    const previewMessage = document.getElementById('previewCardMessage');
    const previewDate = document.getElementById('previewCardDate');
    const previewSender = document.getElementById('previewCardSender');
    const previewHeroMount = document.getElementById('previewHeroMount');
    const previewMusicBtn = document.getElementById('previewMusicBtn');
    const previewWishToast = document.getElementById('previewWishToast');

    // 预览形态切换按钮
    const btnFolded = document.getElementById('toggleFolded');
    const btnUnfolded = document.getElementById('toggleUnfolded');

    // 操作按钮
    const btnExportHtml = document.getElementById('btnExportHtml');
    const btnCopyLink = document.getElementById('btnCopyLink');
    const btnFullscreenPreview = document.getElementById('btnFullscreenPreview');
    const globalToast = document.getElementById('globalToast');

    // 初始化粒子与音频
    let particleSystem = new CardParticleSystem(previewCanvas, state.theme);
    particleSystem.start();

    let audioPlayer = new BirthdayAudioPlayer();

    // 浮动通知
    function showToast(msg) {
        globalToast.innerHTML = msg;
        globalToast.classList.add('show');
        setTimeout(() => {
            globalToast.classList.remove('show');
        }, 3200);
    }

    // 渲染模板选择网格
    function renderTemplateGrid() {
        elTemplateGrid.innerHTML = '';
        CardGenerator.templates.forEach(tpl => {
            const card = document.createElement('div');
            card.className = `template-card ${tpl.id === state.theme ? 'active' : ''}`;
            card.dataset.themeId = tpl.id;
            card.innerHTML = `
                <div class="template-swatch" style="background: ${tpl.previewGradient};">
                    <span>${tpl.icon}</span>
                </div>
                <div class="template-name">${tpl.name}</div>
                <span class="template-badge-label">${tpl.desc.split('·')[0]}</span>
            `;
            card.addEventListener('click', () => {
                selectTheme(tpl.id);
            });
            elTemplateGrid.appendChild(card);
        });
    }

    // 挂载与绑定当前主题实体互动组件
    function mountHeroScene(themeId) {
        previewHeroMount.innerHTML = CardGenerator.getHeroHtml(themeId);
        const heroScene = previewHeroMount.querySelector('#heroScene');
        const heroHint = previewHeroMount.querySelector('#heroHint');
        const currentTpl = CardGenerator.templates.find(t => t.id === themeId) || CardGenerator.templates[0];

        if (heroScene) {
            heroScene.addEventListener('click', (e) => {
                e.stopPropagation();
                const rect = heroScene.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;

                switch (themeId) {
                    case 'cake': {
                        const cakeWrap = heroScene.querySelector('.cake-wrapper');
                        if (cakeWrap && !cakeWrap.classList.contains('is-blown')) {
                            cakeWrap.classList.add('is-blown');
                            heroHint.textContent = '🎉 愿望已送达宇宙！';
                            audioPlayer.playBlowSound();
                            particleSystem.burst(cx, cy - 20, 50);
                        }
                        break;
                    }
                    case 'fireworks': {
                        const fwWrap = heroScene.querySelector('.fireworks-wrapper');
                        if (fwWrap) {
                            fwWrap.classList.add('is-blooming');
                        }
                        audioPlayer.playFireworkSound();
                        particleSystem.launchFirework(cx, 70);
                        particleSystem.launchFirework(cx - 50, 100);
                        particleSystem.launchFirework(cx + 50, 85);
                        heroHint.textContent = '🎆 盛大烟火绚丽绽放！';
                        break;
                    }
                    case 'balloon': {
                        const balloonWrap = heroScene.querySelector('.balloon-wrapper');
                        if (balloonWrap) {
                            balloonWrap.classList.add('is-flying-away');
                        }
                        audioPlayer.playMagicSparkleSound();
                        particleSystem.burst(cx, cy, 45);
                        heroHint.textContent = '🎈 热气球飞向雪山云端！';
                        break;
                    }
                    case 'giftbox': {
                        const giftWrap = heroScene.querySelector('.giftbox-wrapper');
                        if (giftWrap) {
                            giftWrap.classList.add('is-opened');
                        }
                        audioPlayer.playMagicSparkleSound();
                        particleSystem.burst(cx, cy - 25, 55);
                        heroHint.textContent = '🧸 萌趣公仔跳出来啦！';
                        break;
                    }
                    case 'starjar': {
                        const jarWrap = heroScene.querySelector('.starjar-wrapper');
                        if (jarWrap) {
                            jarWrap.classList.add('is-drifting-away');
                        }
                        audioPlayer.playMagicSparkleSound();
                        particleSystem.burst(cx, cy, 50);
                        heroHint.textContent = '⭐ 许愿瓶乘着星光飘向远方！';
                        break;
                    }
                }

                // 弹出愿望反馈
                previewWishToast.querySelector('span').textContent = `✨ ${currentTpl.wishResponse} ✨`;
                previewWishToast.classList.add('show');
                setTimeout(() => {
                    previewWishToast.classList.remove('show');
                }, 3500);
            });
        }
    }

    // 切换主题
    function selectTheme(themeId) {
        state.theme = themeId;
        const currentTpl = CardGenerator.templates.find(t => t.id === themeId);
        if (currentTpl) {
            state.badge = currentTpl.badge;
            previewSealIcon.textContent = currentTpl.icon;
        }

        // 更新卡片激活态
        document.querySelectorAll('.template-card').forEach(card => {
            card.classList.toggle('active', card.dataset.themeId === themeId);
        });

        // 更新预览场景主题
        previewContainer.className = `card-scene theme-${themeId}`;
        particleSystem.setTheme(themeId);
        mountHeroScene(themeId);
        updateLivePreview();
    }

    // 渲染快捷祝福语
    let activePresetCategory = 'warm';
    function renderPresetWishes(category = 'warm') {
        activePresetCategory = category;
        const wishes = CardGenerator.presetWishes[category] || [];
        elPresetList.innerHTML = '';

        wishes.forEach(wish => {
            const chip = document.createElement('div');
            chip.className = 'preset-chip';
            chip.textContent = wish;
            chip.addEventListener('click', () => {
                elMessage.value = wish;
                state.message = wish;
                updateLivePreview();
                showToast('✨ 已应用所选祝福语！');
            });
            elPresetList.appendChild(chip);
        });

        document.querySelectorAll('.preset-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.category === category);
        });
    }

    // 更新右侧实时预览
    function updateLivePreview() {
        const recipient = state.recipient || '朋友';
        const sender = state.sender || '好友';
        const date = state.date || '特别的一天';
        const message = state.message || '祝你生日快乐，万事如意！';

        previewIntroName.textContent = recipient;
        previewTitle.textContent = `祝 ${recipient} 生日快乐！`;
        previewBadge.textContent = state.badge;
        previewMessage.textContent = message;
        previewDate.textContent = `📅 ${date}`;
        previewSender.textContent = sender;
    }

    // 绑定表单输入监听
    elRecipient.addEventListener('input', (e) => {
        state.recipient = e.target.value.trim() || '寿星';
        updateLivePreview();
    });

    elSender.addEventListener('input', (e) => {
        state.sender = e.target.value.trim() || '好友';
        updateLivePreview();
    });

    elDate.addEventListener('change', (e) => {
        state.date = e.target.value;
        updateLivePreview();
    });

    elMessage.addEventListener('input', (e) => {
        state.message = e.target.value;
        updateLivePreview();
    });

    elPresetTabs.addEventListener('click', (e) => {
        const tab = e.target.closest('.preset-tab');
        if (tab && tab.dataset.category) {
            renderPresetWishes(tab.dataset.category);
        }
    });

    // 预览形态切换
    btnFolded.addEventListener('click', () => {
        btnFolded.classList.add('active');
        btnUnfolded.classList.remove('active');
        previewEnvelope.classList.remove('is-opened', 'is-opening');
        state.previewOpened = false;
    });

    btnUnfolded.addEventListener('click', () => {
        btnUnfolded.classList.add('active');
        btnFolded.classList.remove('active');
        previewEnvelope.classList.add('is-opened');
        state.previewOpened = true;
    });

    // 预览中信封点击拆开
    previewEnvelope.addEventListener('click', () => {
        if (previewEnvelope.classList.contains('is-opened')) return;

        previewEnvelope.classList.add('is-opening');
        audioPlayer.start();
        previewMusicBtn.classList.add('is-playing');

        const rect = previewEnvelope.getBoundingClientRect();
        particleSystem.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 70);

        setTimeout(() => {
            previewEnvelope.classList.remove('is-opening');
            previewEnvelope.classList.add('is-opened');
            btnUnfolded.classList.add('active');
            btnFolded.classList.remove('active');
            state.previewOpened = true;
        }, 600);
    });

    // 音乐播放按钮
    previewMusicBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isPlaying = audioPlayer.toggle();
        previewMusicBtn.classList.toggle('is-playing', isPlaying);
    });

    // 缓存静态 CSS/JS 内容用于一键打包
    let cachedCss = null;
    let cachedAudioSynthJs = null;
    let cachedParticlesJs = null;

    async function loadResourceFiles() {
        try {
            const [cssRes, audioRes, particlesRes] = await Promise.all([
                fetch('css/card-themes.css'),
                fetch('js/audio-synth.js'),
                fetch('js/particles.js')
            ]);
            cachedCss = await cssRes.text();
            cachedAudioSynthJs = await audioRes.text();
            cachedParticlesJs = await particlesRes.text();
        } catch (e) {
            console.warn('资源加载失败或运行在纯文件协议下，使用内置提取', e);
        }
    }
    loadResourceFiles();

    // 导出单文件 HTML 贺卡
    btnExportHtml.addEventListener('click', async () => {
        btnExportHtml.disabled = true;
        btnExportHtml.innerHTML = '<span>⏳ 正在生成独立 HTML...</span>';

        if (!cachedCss || !cachedAudioSynthJs || !cachedParticlesJs) {
            await loadResourceFiles();
        }

        const finalCss = cachedCss || (window.CARD_ASSETS ? window.CARD_ASSETS.css : '');
        const finalAudioJs = cachedAudioSynthJs || (window.CARD_ASSETS ? window.CARD_ASSETS.audioJs : '');
        const finalParticlesJs = cachedParticlesJs || (window.CARD_ASSETS ? window.CARD_ASSETS.particlesJs : '');

        const standaloneHtml = CardGenerator.generateStandaloneHtml(
            state,
            finalCss,
            finalAudioJs,
            finalParticlesJs
        );

        const blob = new Blob([standaloneHtml], { type: 'text/html;charset=utf-8' });
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const filename = `生日贺卡-${state.recipient || '朋友'}.html`;
        a.href = downloadUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(downloadUrl);

        btnExportHtml.disabled = false;
        btnExportHtml.innerHTML = '<span>🚀 生成并下载独立 HTML 贺卡</span>';

        showToast(`🎉 贺卡文件「${filename}」下载成功！可直接通过微信或邮件发送给好友！`);
    });

    // 复制在线分享链接 (附带精美社交转发文案与卡片指引)
    btnCopyLink.addEventListener('click', () => {
        const shareUrl = CardGenerator.generateShareUrl(state);
        const currentTpl = CardGenerator.templates.find(t => t.id === state.theme) || CardGenerator.templates[0];

        // 构造极具仪式感的社交转发文案 (精简干净短链 + 微信发卡片小技巧)
        const shareText = `💌 送给【${state.recipient || '你'}】的专属生日贺卡！\n` +
                          `✨ ${currentTpl.icon} ${currentTpl.name} · 点击拆开信封：\n` +
                          `👉 ${shareUrl}\n\n` +
                          `💡 微信卡片气泡技巧：在微信中点开上方链接，点击右上角「···」选择「发送给朋友」，即可自动生成精美卡片气泡！`;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(shareText).then(() => {
                showToast('💌 已复制贺卡邀请文案与短链！在微信点开后点右上角「···」即可发送精美卡片！');
            }).catch(() => {
                fallbackCopy(shareText);
            });
        } else {
            fallbackCopy(shareText);
        }
    });

    function fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('💌 已复制贺卡邀请文案与短链！在微信点开后点右上角「···」即可发送精美卡片！');
    }

    // 全屏新窗口预览
    btnFullscreenPreview.addEventListener('click', () => {
        const shareUrl = CardGenerator.generateShareUrl(state);
        window.open(shareUrl, '_blank');
    });

    // 初始启动
    elDate.value = state.date;
    renderTemplateGrid();
    renderPresetWishes('warm');
    mountHeroScene(state.theme);
    updateLivePreview();
});
