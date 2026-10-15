/**
 * 生日贺卡多主题阳光明亮粒子引擎
 * 支持：蛋糕糖屑、盛大烟花、上升气球、魔法彩带、旋转许愿星
 */
class CardParticleSystem {
    constructor(canvas, theme = 'cake') {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.theme = theme;
        this.particles = [];
        this.fireworksRockets = [];
        this.animationId = null;
        this.width = 0;
        this.height = 0;
        this.isActive = false;

        this.initResize();
    }

    initResize() {
        const resize = () => {
            const parent = this.canvas.parentElement;
            if (parent) {
                this.width = this.canvas.width = parent.clientWidth || window.innerWidth;
                this.height = this.canvas.height = parent.clientHeight || window.innerHeight;
            } else {
                this.width = this.canvas.width = window.innerWidth;
                this.height = this.canvas.height = window.innerHeight;
            }
        };
        resize();
        window.addEventListener('resize', resize);
    }

    setTheme(theme) {
        this.theme = theme;
        this.particles = [];
        this.fireworksRockets = [];
        this.spawnInitialParticles();
    }

    start() {
        if (this.isActive) return;
        this.isActive = true;
        this.particles = [];
        this.fireworksRockets = [];
        this.spawnInitialParticles();
        this.animate();
    }

    stop() {
        this.isActive = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    spawnInitialParticles() {
        const count = this.getParticleCount();
        for (let i = 0; i < count; i++) {
            this.particles.push(this.createParticle(true));
        }
    }

    getParticleCount() {
        switch (this.theme) {
            case 'cake': return 45;
            case 'fireworks': return 35;
            case 'balloon': return 30;
            case 'giftbox': return 40;
            case 'starjar': return 45;
            default: return 35;
        }
    }

    createParticle(initial = false) {
        const yPos = initial ? Math.random() * this.height : -20;
        const xPos = Math.random() * this.width;

        switch (this.theme) {
            case 'cake': {
                // 缤纷甜品彩屑与糖粒
                const colors = ['#ff6b8b', '#ffa502', '#2ed573', '#1e90ff', '#ff4757', '#eccc68'];
                return {
                    type: 'cake',
                    x: xPos,
                    y: yPos,
                    width: Math.random() * 8 + 4,
                    height: Math.random() * 10 + 5,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    alpha: Math.random() * 0.7 + 0.3,
                    speedY: Math.random() * 1.8 + 0.8,
                    speedX: Math.random() * 1.2 - 0.6,
                    rotX: Math.random() * Math.PI,
                    rotY: Math.random() * Math.PI,
                    rotSpeedX: Math.random() * 0.05 + 0.02,
                    rotSpeedY: Math.random() * 0.05 + 0.02
                };
            }
            case 'fireworks': {
                // 漫天金色庆典微光与落星
                const colors = ['#f59e0b', '#fbbf24', '#f43f5e', '#ec4899', '#3b82f6'];
                return {
                    type: 'fireworks_spark',
                    x: Math.random() * this.width,
                    y: Math.random() * this.height,
                    size: Math.random() * 3 + 1.5,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    alpha: Math.random() * 0.8 + 0.2,
                    speedY: Math.random() * 0.6 + 0.2,
                    speedX: Math.random() * 0.4 - 0.2,
                    twinkle: Math.random() * Math.PI * 2
                };
            }
            case 'balloon': {
                // 冉冉上升的彩色微型气球
                const colors = ['#ff7675', '#74b9ff', '#55efc4', '#ffeaa7', '#a29bfe'];
                return {
                    type: 'balloon',
                    x: xPos,
                    y: initial ? Math.random() * this.height : this.height + 30,
                    radius: Math.random() * 7 + 6,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    alpha: Math.random() * 0.75 + 0.25,
                    speedY: -(Math.random() * 1.2 + 0.6), // 向上升
                    swing: Math.random() * Math.PI * 2,
                    swingSpeed: Math.random() * 0.03 + 0.02
                };
            }
            case 'giftbox': {
                // 活泼爱心、金色五星与彩色纸花
                const icons = ['heart', 'star', 'ribbon'];
                const colors = ['#ff4d4d', '#ff9f43', '#ff6b81', '#feca57', '#5f27cd'];
                return {
                    type: 'giftbox',
                    subType: icons[Math.floor(Math.random() * icons.length)],
                    x: xPos,
                    y: yPos,
                    size: Math.random() * 10 + 8,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    alpha: Math.random() * 0.8 + 0.2,
                    speedY: Math.random() * 1.6 + 0.7,
                    speedX: Math.random() * 1 - 0.5,
                    rotation: Math.random() * Math.PI * 2,
                    rotSpeed: (Math.random() - 0.5) * 0.05
                };
            }
            case 'starjar': {
                // 唯美发光折纸五角幸运星
                const colors = ['#fbbf24', '#f472b6', '#a78bfa', '#38bdf8', '#34d399'];
                return {
                    type: 'starjar',
                    x: Math.random() * this.width,
                    y: yPos,
                    size: Math.random() * 7 + 5,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    alpha: Math.random() * 0.85 + 0.15,
                    speedY: Math.random() * 0.9 + 0.4,
                    speedX: Math.sin(Math.random() * Math.PI) * 0.8,
                    rotation: Math.random() * Math.PI * 2,
                    rotSpeed: (Math.random() - 0.5) * 0.04
                };
            }
            default:
                return { x: 0, y: 0 };
        }
    }

    // 庆祝爆发特效
    burst(x, y, count = 60) {
        const colors = ['#ff4757', '#ffa502', '#2ed573', '#1e90ff', '#3742fa', '#ff6b81'];
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 8 + 3;
            this.particles.push({
                isBurst: true,
                x: x || this.width / 2,
                y: y || this.height / 2,
                width: Math.random() * 8 + 4,
                height: Math.random() * 10 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: 1,
                speedX: Math.cos(angle) * velocity,
                speedY: Math.sin(angle) * velocity - 2.5,
                gravity: 0.18,
                friction: 0.96,
                rotX: Math.random() * Math.PI,
                rotY: Math.random() * Math.PI,
                rotSpeedX: Math.random() * 0.1,
                rotSpeedY: Math.random() * 0.1,
                life: 1.0,
                decay: Math.random() * 0.018 + 0.01
            });
        }
    }

    // 主动发射烟花火箭
    launchFirework(startX, targetY) {
        const x = startX || Math.random() * (this.width - 100) + 50;
        const target = targetY || (Math.random() * (this.height * 0.35) + 60);
        this.fireworksRockets.push({
            x: x,
            y: this.height + 10,
            targetY: target,
            speedY: -(Math.random() * 4 + 7),
            color: ['#ff4757', '#ffa502', '#00d2d3', '#5f27cd', '#ff9ff3'][Math.floor(Math.random() * 5)]
        });
    }

    // 绘制五角星
    drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, color, alpha) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        const step = Math.PI / spikes;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.shadowBlur = 8;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.restore();
    }

    // 绘制可爱爱心
    drawHeart(ctx, x, y, size, color, alpha) {
        ctx.save();
        ctx.translate(x, y);
        ctx.beginPath();
        const topCurveHeight = size * 0.3;
        ctx.moveTo(0, topCurveHeight);
        ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
        ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size * 1.2);
        ctx.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
        ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.fill();
        ctx.restore();
    }

    animate() {
        if (!this.isActive) return;

        this.ctx.clearRect(0, 0, this.width, this.height);

        // 更新并绘制发射中的烟花火箭
        for (let i = this.fireworksRockets.length - 1; i >= 0; i--) {
            const r = this.fireworksRockets[i];
            r.y += r.speedY;

            // 绘制上升尾迹
            this.ctx.save();
            this.ctx.fillStyle = r.color;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = r.color;
            this.ctx.beginPath();
            this.ctx.arc(r.x, r.y, 3.5, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();

            if (r.y <= r.targetY) {
                // 到达顶点爆炸！
                this.burst(r.x, r.y, 75);
                this.fireworksRockets.splice(i, 1);
            }
        }

        // 更新常规粒子与爆发碎片
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];

            if (p.isBurst) {
                p.x += p.speedX;
                p.y += p.speedY;
                p.speedY += p.gravity;
                p.speedX *= p.friction;
                p.speedY *= p.friction;
                p.rotX += p.rotSpeedX;
                p.rotY += p.rotSpeedY;
                p.life -= p.decay;

                if (p.life <= 0) {
                    this.particles.splice(i, 1);
                    continue;
                }

                this.ctx.save();
                this.ctx.translate(p.x, p.y);
                this.ctx.rotate(p.rotX);
                this.ctx.scale(Math.cos(p.rotY), 1);
                this.ctx.fillStyle = p.color;
                this.ctx.globalAlpha = Math.max(0, p.life);
                this.ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
                this.ctx.restore();
                continue;
            }

            // 各主题独立粒子渲染
            switch (p.type) {
                case 'cake': {
                    p.x += p.speedX;
                    p.y += p.speedY;
                    p.rotX += p.rotSpeedX;
                    p.rotY += p.rotSpeedY;

                    if (p.y > this.height + 20) {
                        Object.assign(p, this.createParticle(false));
                    }

                    this.ctx.save();
                    this.ctx.translate(p.x, p.y);
                    this.ctx.rotate(p.rotX);
                    this.ctx.scale(Math.cos(p.rotY), 1);
                    this.ctx.fillStyle = p.color;
                    this.ctx.globalAlpha = p.alpha;
                    this.ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
                    this.ctx.restore();
                    break;
                }
                case 'fireworks_spark': {
                    p.y += p.speedY;
                    p.x += p.speedX;
                    p.twinkle += 0.05;
                    const a = p.alpha * (0.6 + 0.4 * Math.sin(p.twinkle));

                    if (p.y > this.height + 20) {
                        Object.assign(p, this.createParticle(false));
                    }

                    this.ctx.save();
                    this.ctx.fillStyle = p.color;
                    this.ctx.shadowBlur = 8;
                    this.ctx.shadowColor = p.color;
                    this.ctx.globalAlpha = Math.max(0.1, a);
                    this.ctx.beginPath();
                    this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    this.ctx.fill();
                    this.ctx.restore();
                    break;
                }
                case 'balloon': {
                    p.y += p.speedY;
                    p.swing += p.swingSpeed;
                    p.x += Math.sin(p.swing) * 0.7;

                    if (p.y < -30) {
                        Object.assign(p, this.createParticle(false));
                    }

                    this.ctx.save();
                    this.ctx.translate(p.x, p.y);
                    this.ctx.fillStyle = p.color;
                    this.ctx.globalAlpha = p.alpha;
                    // 气球蛋形
                    this.ctx.beginPath();
                    this.ctx.ellipse(0, 0, p.radius, p.radius * 1.25, 0, 0, Math.PI * 2);
                    this.ctx.fill();
                    // 气球底结
                    this.ctx.beginPath();
                    this.ctx.moveTo(-2, p.radius * 1.25);
                    this.ctx.lineTo(2, p.radius * 1.25);
                    this.ctx.lineTo(0, p.radius * 1.25 + 4);
                    this.ctx.closePath();
                    this.ctx.fill();
                    this.ctx.restore();
                    break;
                }
                case 'giftbox': {
                    p.y += p.speedY;
                    p.x += p.speedX;
                    p.rotation += p.rotSpeed;

                    if (p.y > this.height + 20) {
                        Object.assign(p, this.createParticle(false));
                    }

                    if (p.subType === 'heart') {
                        this.drawHeart(this.ctx, p.x, p.y, p.size, p.color, p.alpha);
                    } else if (p.subType === 'star') {
                        this.drawStar(this.ctx, p.x, p.y, 5, p.size, p.size / 2, p.color, p.alpha);
                    } else {
                        this.ctx.save();
                        this.ctx.translate(p.x, p.y);
                        this.ctx.rotate(p.rotation);
                        this.ctx.fillStyle = p.color;
                        this.ctx.globalAlpha = p.alpha;
                        this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
                        this.ctx.restore();
                    }
                    break;
                }
                case 'starjar': {
                    p.y += p.speedY;
                    p.x += p.speedX;
                    p.rotation += p.rotSpeed;

                    if (p.y > this.height + 20) {
                        Object.assign(p, this.createParticle(false));
                    }

                    this.drawStar(this.ctx, p.x, p.y, 5, p.size, p.size / 2.2, p.color, p.alpha);
                    break;
                }
            }
        }

        this.animationId = requestAnimationFrame(() => this.animate());
    }
}

window.CardParticleSystem = CardParticleSystem;
