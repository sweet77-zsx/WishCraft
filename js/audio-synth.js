/**
 * Web Audio API 八音盒旋律与互动音效合成器
 * 纯原生合成，零外部音频资源，100% 离线高保真运行
 */
class BirthdayAudioPlayer {
    constructor() {
        this.ctx = null;
        this.isPlaying = false;
        this.loop = true;
        this.currentTimeout = null;
        this.volume = 0.35;
        
        // 音符频率映射 (Hz)
        this.notes = {
            'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
            'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
            'C6': 1046.50
        };

        // 生日快乐歌谱 (音符, 拍数)
        this.melody = [
            ['G4', 0.75], ['G4', 0.25], ['A4', 1.0], ['G4', 1.0], ['C5', 1.0], ['B4', 2.0],
            ['G4', 0.75], ['G4', 0.25], ['A4', 1.0], ['G4', 1.0], ['D5', 1.0], ['C5', 2.0],
            ['G4', 0.75], ['G4', 0.25], ['G5', 1.0], ['E5', 1.0], ['C5', 1.0], ['B4', 1.0], ['A4', 1.5],
            ['F5', 0.75], ['F5', 0.25], ['E5', 1.0], ['C5', 1.0], ['D5', 1.0], ['C5', 2.5]
        ];

        this.bpm = 104;
    }

    initContext() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    // 播放单个清脆音乐盒音符
    playMusicBoxTone(freq, startTime, duration) {
        if (!this.ctx || !freq) return;

        const osc1 = this.ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(freq, startTime);

        const osc2 = this.ctx.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(freq * 2, startTime);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.0001, startTime);
        gain.gain.linearRampToValueAtTime(this.volume, startTime + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + Math.max(duration * 1.5, 0.8));

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.ctx.destination);

        osc1.start(startTime);
        osc2.start(startTime);

        const stopTime = startTime + Math.max(duration * 1.5, 0.8) + 0.1;
        osc1.stop(stopTime);
        osc2.stop(stopTime);
    }

    // 播放互动音效：吹蜡烛轻风声
    playBlowSound() {
        this.initContext();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const bufferSize = this.ctx.sampleRate * 0.4;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(800, now);
        filter.frequency.exponentialRampToValueAtTime(200, now + 0.35);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        noise.start(now);
    }

    // 播放互动音效：烟花升空与绽放
    playFireworkSound() {
        this.initContext();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        // 升空哨音
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(1400, now + 0.3);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);

        // 爆炸清脆声
        setTimeout(() => {
            if (!this.ctx) return;
            const t = this.ctx.currentTime;
            const chord = [523.25, 659.25, 783.99, 1046.50];
            chord.forEach(freq => {
                this.playMusicBoxTone(freq, t, 0.4);
            });
        }, 300);
    }

    // 播放互动音效：魔法礼物盒开启 / 气球升空 / 许愿星瓶
    playMagicSparkleSound() {
        this.initContext();
        if (!this.ctx) return;
        const notes = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51];
        const now = this.ctx.currentTime;
        notes.forEach((freq, idx) => {
            this.playMusicBoxTone(freq, now + idx * 0.06, 0.3);
        });
    }

    start() {
        this.initContext();
        if (this.isPlaying) return;
        this.isPlaying = true;
        this._playMelodyIndex(0);
    }

    _playMelodyIndex(index) {
        if (!this.isPlaying) return;

        if (index >= this.melody.length) {
            if (this.loop) {
                this.currentTimeout = setTimeout(() => {
                    this._playMelodyIndex(0);
                }, 1500);
            } else {
                this.isPlaying = false;
            }
            return;
        }

        const [noteName, beats] = this.melody[index];
        const freq = this.notes[noteName];
        const beatDuration = 60 / this.bpm;
        const noteDuration = beats * beatDuration;

        const now = this.ctx.currentTime;
        this.playMusicBoxTone(freq, now, noteDuration);

        this.currentTimeout = setTimeout(() => {
            this._playMelodyIndex(index + 1);
        }, noteDuration * 1000);
    }

    stop() {
        this.isPlaying = false;
        if (this.currentTimeout) {
            clearTimeout(this.currentTimeout);
            this.currentTimeout = null;
        }
    }

    toggle() {
        if (this.isPlaying) {
            this.stop();
            return false;
        } else {
            this.start();
            return true;
        }
    }
}

window.BirthdayAudioPlayer = BirthdayAudioPlayer;
