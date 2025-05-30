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
const kanbanBubble = document.getElementById('kanban-bubble');

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

// 显示气泡
function showBubble() {
    if (audioPlayer.paused) {
        kanbanBubble.style.display = 'block';
        kanbanBubble.style.animation = 'bubbleFadeIn 0.3s ease-out';
    }
}

// 隐藏气泡
function hideBubble() {
    kanbanBubble.style.animation = 'bubbleFadeOut 0.3s ease-out';
    setTimeout(() => {
        kanbanBubble.style.display = 'none';
    }, 300);
}

// 监听音乐播放状态
audioPlayer.addEventListener('play', function() {
    hideBubble();
    playPauseBtn.textContent = '⏸️';
});

audioPlayer.addEventListener('pause', function() {
    showBubble();
    playPauseBtn.textContent = '▶️';
});

// 页面加载时检查音乐状态
window.addEventListener('load', () => {
    if (audioPlayer.paused) {
        showBubble();
    }
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
        title: '奇幻冒险：爱转圈圈的祥飞和偷走时间的飞熊',
        subtitle: '踏入中世纪奇幻世界，化身勇者，探索神秘魔域，挑战强大魔物，书写属于你的冒险传奇！',
        btnJoin: '立即加入冒险',
        btnTrailer: '观看史诗预告',
        nav: ['首页', '特色', '画廊', '团队介绍'],
        features: ['中世纪搜打撤冒险', '独特的游戏机制', '史诗级Boss战'],
        featuresDesc: [
            '体验硬核搜刮、战斗与撤离，感受中世纪世界的高风险高回报冒险乐趣',
            '融合搜刮、战斗、撤离与概率博弈的中世纪奇幻冒险，紧张刺激的同时不乏休闲',
            '与巨龙、恶魔等强大魔物激战，挑战极限，赢取稀有装备与荣耀'
        ],
        gallery: '冒险画廊',
        team: '团队介绍',
        featuresTitle: '游戏特色',
        teamDesc: [
            '专注核心玩法与系统架构，热爱奇幻世界构建',
            '负责关卡设计与玩法创新，兼顾部分系统开发',
            '世界观与剧情设定，致力于打造沉浸式冒险体验',
            '角色与怪物设计，擅长中世纪奇幻风格插画',
            '场景与UI美术，负责整体美术风格统一与细节打磨'
        ],
        followUs: "关注我们",
        weibo: "官方微博",
        wechat: "官方微信",
        bilibili: "B站",
        contactUs: "联系我们",
        email: "邮箱：adventure@fantasy.com",
        copyright: "© 2025 奇幻冒险：爱转圈圈的祥飞和偷走时间的飞熊. 保留所有权利。",
        musicCopyright: "游戏内原生态音乐均由<a href=\"https://www.suno.ai\" target=\"_blank\" class=\"suno-link\"><i class=\"fas fa-music\"></i>Suno</a>生成.音乐版权保留所有权利",
        twitter: "推特",
        discord: "Discord"
    },
    en: {
        title: 'Fantasy Adventure: Xiangfei the Spinner and Feixiong the Time Thief',
        subtitle: 'Step into a medieval fantasy world, become a hero, explore mysterious realms, challenge mighty monsters, and write your own legendary adventure!',
        btnJoin: 'Join the Adventure',
        btnTrailer: 'Watch Epic Trailer',
        nav: ['Home', 'Features', 'Gallery', 'Team'],
        features: ['Medieval Raid & Escape', 'Unique Game Mechanics', 'Epic Boss Battles'],
        featuresDesc: [
            'Experience hardcore looting, combat, and extraction for high-risk, high-reward medieval fun',
            'A medieval fantasy adventure blending looting, combat, extraction, and probability-based gameplay, offering both intense excitement and casual enjoyment',
            'Battle dragons, demons, and mighty monsters for rare loot and glory'
        ],
        gallery: 'Gallery',
        team: 'Team',
        featuresTitle: 'Game Features',
        teamDesc: [
            'Focuses on core gameplay and system architecture, passionate about fantasy world building',
            'Responsible for level design and gameplay innovation, also handles system development',
            'Worldview and story setting, dedicated to creating immersive adventure experiences',
            'Character and monster design, specializes in medieval fantasy style illustration',
            'Scene and UI art, responsible for overall art style consistency and detail refinement'
        ],
        followUs: "Follow Us",
        weibo: "Weibo",
        wechat: "WeChat",
        bilibili: "Bilibili",
        contactUs: "Contact Us",
        email: "Email: adventure@fantasy.com",
        copyright: "© 2025 Fantasy Adventure: Xiangfei the Spinner and Feixiong the Time Thief. All rights reserved.",
        musicCopyright: "All in-game music is generated by <a href=\"https://www.suno.ai\" target=\"_blank\" class=\"suno-link\"><i class=\"fas fa-music\"></i>Suno</a>. Music copyrights reserved.",
        twitter: "Twitter",
        discord: "Discord"
    },
    jp: {
        title: '中世アドベンチャー：エルデンリング',
        subtitle: '中世のファンタジー世界に足を踏み入れ、勇者となり、神秘的な魔域を探索し、強大な魔物に挑み、自分だけの冒険伝説を刻もう！',
        btnJoin: '冒険の旅に参加する',
        btnTrailer: '壮大な予告編を見る',
        nav: ['ホーム', '特徴', 'ギャラリー', 'チーム'],
        features: ['中世レイド＆脱出', '独自のゲームメカニクス', '壮大なボス戦'],
        featuresDesc: [
            'ハードコアな略奪、戦闘、脱出を体験し、中世世界のハイリスク・ハイリターンな冒険を楽しもう',
            '略奪、戦闘、脱出と確率要素を融合した中世ファンタジー冒険。緊張感とリラックス感の両立を実現',
            'ドラゴンや悪魔などの強大な魔物と戦い、レア装備と栄光を手に入れよう'
        ],
        gallery: 'ギャラリー',
        team: 'チーム',
        featuresTitle: 'ゲームの特徴',
        teamDesc: [
            'コアゲームプレイとシステム設計に注力し、ファンタジー世界構築を愛好',
            'ステージデザインとゲームプレイ革新を担当し、システム開発も兼任',
            '世界観とストーリー設定を担当し、没入感のある冒険体験を追求',
            'キャラクターとモンスターデザインを担当し、中世ファンタジー風イラストを得意とする',
            'シーンとUIアートを担当し、全体的な美術スタイルの統一と細部の磨き上げを担当'
        ],
        followUs: "フォローする",
        weibo: "微博",
        wechat: "WeChat",
        bilibili: "Bilibili",
        contactUs: "お問い合わせ",
        email: "メール：adventure@fantasy.com",
        copyright: "© 2025 ファンタジーアドベンチャー：回転好きの祥飛と時間泥棒の飛熊. All rights reserved.",
        musicCopyright: "ゲーム内の音楽はすべて<a href=\"https://www.suno.ai\" target=\"_blank\" class=\"suno-link\"><i class=\"fas fa-music\"></i>Suno</a>によって生成されています。音楽の著作権はすべて保留されています。",
        twitter: "Twitter",
        discord: "Discord"
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
    // 团队介绍描述
    const teamDescs = document.querySelectorAll('#team .feature-card p');
    langData[lang].teamDesc.forEach((txt, i) => {
        if(teamDescs[i]) teamDescs[i].textContent = txt;
    });
    // 页脚内容
    document.querySelector('footer .follow-us').textContent = langData[lang].followUs;
    document.querySelector('footer .twitter span').textContent = langData[lang].twitter;
    document.querySelector('footer .discord span').textContent = langData[lang].discord;
    document.querySelector('footer .bilibili span').textContent = langData[lang].bilibili;
    document.querySelector('footer .contact-us').textContent = langData[lang].contactUs;
    document.querySelector('footer .email').textContent = langData[lang].email;
    document.querySelector('footer .copyright').textContent = langData[lang].copyright;
    document.querySelector('footer .music-copyright').innerHTML = langData[lang].musicCopyright;
}

document.getElementById('lang-switch').addEventListener('change', function() {
    setLang(this.value);
});
// 默认中文
setLang('zh'); 