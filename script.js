// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 画廊图片懒加载
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }
        });
    });

    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
});

// 特色卡片动画
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// 移动端菜单
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = '☰';
    
    const mobileMenu = document.createElement('div');
    mobileMenu.classList.add('mobile-menu');
    
    const navLinks = document.querySelector('.nav-links').cloneNode(true);
    mobileMenu.appendChild(navLinks);
    
    document.body.appendChild(mobileMenu);
    nav.appendChild(mobileMenuBtn);
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
};

// 检查是否为移动设备
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// 添加页面加载动画
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// 音乐播放器功能
const musicList = [
    {
        title: 'Triumphant Victory',
        file: 'music/Triumphant Victory.mp3'
    },
    {
        title: 'GameMusic1',
        file: 'music/GameMusic1.mp3'
    },
    {
        title: 'MenuMusic',
        file: 'music/MenuMusic.mp3'
    },
    {
        title: 'The Battle Unfolds',
        file: 'music/The Battle Unfolds.mp3'
    },
    {
        title: 'The Rise of the Kingdom',
        file: 'music/The Rise of the Kingdom.mp3'
    }
];

let currentMusic = 0;
const audioPlayer = document.getElementById('audioPlayer');
const musicTitle = document.getElementById('musicTitle');
const playPauseBtn = document.getElementById('playPauseMusic');
const prevBtn = document.getElementById('prevMusic');
const nextBtn = document.getElementById('nextMusic');

function loadMusic(index) {
    if (index < 0) index = musicList.length - 1;
    if (index >= musicList.length) index = 0;
    currentMusic = index;
    audioPlayer.src = musicList[index].file;
    musicTitle.textContent = musicList[index].title;
    audioPlayer.play();
    playPauseBtn.textContent = '⏸️';
}

playPauseBtn.onclick = function() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = '⏸️';
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = '▶️';
    }
};

prevBtn.onclick = function() {
    loadMusic(currentMusic - 1);
};

nextBtn.onclick = function() {
    loadMusic(currentMusic + 1);
};

audioPlayer.onended = function() {
    loadMusic(currentMusic + 1);
};

// 初始化播放器
if (musicList.length > 0) {
    loadMusic(0);
    playPauseBtn.textContent = '▶️';
}

audioPlayer.addEventListener('play', function() {
    playPauseBtn.textContent = '⏸️';
});
audioPlayer.addEventListener('pause', function() {
    playPauseBtn.textContent = '▶️';
});

// 进度条和音量调节
const progressBar = document.getElementById('music-progress');
const volumeBar = document.getElementById('music-volume');

audioPlayer.addEventListener('timeupdate', function() {
    if (!isNaN(audioPlayer.duration)) {
        progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    }
});

progressBar.addEventListener('input', function() {
    if (!isNaN(audioPlayer.duration)) {
        audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
    }
});

volumeBar.addEventListener('input', function() {
    audioPlayer.volume = volumeBar.value;
});

// 初始化音量
volumeBar.value = 1;
audioPlayer.volume = 1;

// 点击网页任意部分播放音乐（只触发一次）
(function(){
    let musicStarted = false;
    function startMusic() {
        if (!musicStarted) {
            audioPlayer.play();
            musicStarted = true;
            document.removeEventListener('click', startMusic);
        }
    }
    document.addEventListener('click', startMusic);
})();

// 多语言切换功能
const langData = {
    zh: {
        title: '中世纪冒险：埃尔登法环',
        subtitle: '踏入中世纪奇幻世界，化身勇者，探索神秘魔域，挑战强大魔物，书写属于你的冒险传奇！',
        btnJoin: '立即加入冒险',
        btnTrailer: '观看史诗预告',
        nav: ['首页', '特色', '画廊', '团队介绍'],
        features: ['中世纪搜打撤冒险', '独特的游戏机制', '史诗级Boss战'],
        featuresDesc: [
            '体验硬核搜刮、战斗与撤离，感受中世纪世界的高风险高回报冒险乐趣。',
            '融合搜刮、战斗、撤离与阵营博弈，带来紧张刺激且策略丰富的中世纪冒险体验。',
            '与巨龙、恶魔等强大魔物激战，挑战极限，赢取稀有装备与荣耀。'
        ],
        gallery: '冒险画廊',
        team: '团队介绍',
        featuresTitle: '游戏特色',
    },
    en: {
        title: 'Medieval Adventure: Elden Ring',
        subtitle: 'Step into a medieval fantasy world, become a hero, explore mysterious realms, challenge mighty monsters, and write your own legendary adventure!',
        btnJoin: 'Join the Adventure',
        btnTrailer: 'Watch Epic Trailer',
        nav: ['Home', 'Features', 'Gallery', 'Team'],
        features: ['Medieval Raid & Escape', 'Unique Game Mechanics', 'Epic Boss Battles'],
        featuresDesc: [
            'Experience hardcore looting, combat, and extraction for high-risk, high-reward medieval fun.',
            'Blending looting, combat, extraction, and faction strategy for a tense and strategic adventure.',
            'Battle dragons, demons, and mighty monsters for rare loot and glory.'
        ],
        gallery: 'Gallery',
        team: 'Team',
        featuresTitle: 'Game Features',
    },
    jp: {
        title: '中世アドベンチャー：エルデンリング',
        subtitle: '中世のファンタジー世界に足を踏み入れ、勇者となり、神秘的な魔域を探索し、強大な魔物に挑み、自分だけの冒険伝説を刻もう！',
        btnJoin: '冒険に参加',
        btnTrailer: '壮大な予告編を見る',
        nav: ['ホーム', '特徴', 'ギャラリー', 'チーム'],
        features: ['中世レイド＆脱出', '独自のゲームメカニクス', '壮大なボス戦'],
        featuresDesc: [
            'ハードコアな略奪、戦闘、脱出を体験し、中世世界のハイリスク・ハイリターンな冒険を楽しもう。',
            '略奪、戦闘、脱出、陣営戦略を融合し、緊張感と戦略性に富んだ冒険を実現。',
            'ドラゴンや悪魔などの強大な魔物と戦い、レア装備と栄光を手に入れよう。'
        ],
        gallery: 'ギャラリー',
        team: 'チーム',
        featuresTitle: 'ゲームの特徴',
    }
};

function setLang(lang) {
    // 标题
    document.title = langData[lang].title + ' - 官方网站';
    document.querySelector('.logo').textContent = langData[lang].title;
    document.querySelector('.hero-content h1').textContent = langData[lang].title;
    document.querySelector('.hero-content p').textContent = langData[lang].subtitle;
    // 按钮
    document.querySelector('.cta-buttons .btn.primary').textContent = langData[lang].btnJoin;
    document.querySelector('.cta-buttons .btn.secondary').textContent = langData[lang].btnTrailer;
    // 导航
    const navLinks = document.querySelectorAll('.nav-links li a');
    langData[lang].nav.forEach((txt, i) => {
        if(navLinks[i]) navLinks[i].textContent = txt;
    });
    // 游戏特色
    const featureTitles = document.querySelectorAll('#features .feature-card h3');
    const featureDescs = document.querySelectorAll('#features .feature-card p');
    langData[lang].features.forEach((txt, i) => {
        if(featureTitles[i]) featureTitles[i].textContent = txt;
    });
    langData[lang].featuresDesc.forEach((txt, i) => {
        if(featureDescs[i]) featureDescs[i].textContent = txt;
    });
    // 画廊标题
    document.querySelector('#gallery h2').textContent = langData[lang].gallery;
    // 团队介绍标题
    document.querySelector('#team h2').textContent = langData[lang].team;
    // 游戏特色标题
    document.querySelector('#features h2').textContent = langData[lang].featuresTitle || langData[lang].features[0];
}

document.getElementById('lang-switch').addEventListener('change', function() {
    setLang(this.value);
});
// 默认中文
setLang('zh'); 