let w;
let mode;
let loadFlag = false;

document.addEventListener('DOMContentLoaded', function () {
    w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    mode = w < 768;

    // #reason .flowing のシームレスループ生成
    document.querySelectorAll('#reason .flowing').forEach(function (el) {
        const text = el.innerHTML.trim();
        const inner = document.createElement('div');
        inner.className = 'flowing-inner';
        inner.innerHTML = '<span>' + text + '</span><span>' + text + '</span>';
        el.innerHTML = '';
        el.appendChild(inner);
    });

    // IntersectionObserver でフェードアニメーション
    const fadeTargets = document.querySelectorAll('.js-fade-up');
    if (fadeTargets.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animation-on');
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '-150px 0px', threshold: 0 });

        fadeTargets.forEach(el => observer.observe(el));
    }

    // flow-list アコーディオン
    const flowList = document.getElementById('flow-list');
    if (!flowList) return;

    flowList.querySelectorAll('.l_col-head').forEach(function (head) {
        head.setAttribute('tabindex', '0');

        const section = head.closest('section');
        const body = section ? section.querySelector('.body') : head.nextElementSibling;
        if (!body) return;

        body.style.overflow = 'hidden';
        body.style.display = 'block';
        body.style.transition = 'max-height 360ms ease';
        body.style.maxHeight = head.classList.contains('active') ? 'none' : '0';

        function openBody() {
            head.classList.add('active');
            body.style.maxHeight = 'none';
            const naturalH = body.scrollHeight;
            body.style.maxHeight = '0';
            body.offsetHeight; // reflow
            requestAnimationFrame(() => {
                body.style.maxHeight = naturalH + 'px';
            });
            const onEnd = () => {
                if (head.classList.contains('active')) body.style.maxHeight = 'none';
                body.removeEventListener('transitionend', onEnd);
            };
            body.addEventListener('transitionend', onEnd);
        }

        function closeBody() {
            head.classList.remove('active');
            body.style.maxHeight = body.scrollHeight + 'px';
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    body.style.maxHeight = '0';
                });
            });
        }

        function toggle() {
            head.classList.contains('active') ? closeBody() : openBody();
        }

        head.addEventListener('click', toggle);
        head.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
        });
    });
});


$(function () {

    /**
     * スクロール
     */
    $(window).on('scroll', function () {
        returnTopBtn();

        if (loadFlag) {
            const scrolled = $(window).scrollTop() > 0;
            $('header').toggleClass('scroll', scrolled);
        }
    });

    /**
     * ハンバーガーメニュー
     */
    $('#menu-btn').on('click', function () {
        const isActive = $(this).hasClass('active');
        $(this).toggleClass('active', !isActive);
        switchFixed(isActive ? 0 : 1);
        $('header').children('nav').toggleClass('open', !isActive);
    });

    /**
     * モバイルナビ：リンク押下でメニューを閉じる
     */
    $('header nav a').on('click', function () {
        if (!mode) return;

        const href = $(this).attr('href') || '';

        // メニューを閉じる
        $('#menu-btn').removeClass('active');
        $('header').children('nav').removeClass('open');

        // /#section 形式の同一ページアンカー
        if (href.startsWith('/#')) {
            const hash = href.slice(1); // "/#about" → "#about"
            const target = document.querySelector(hash);
            // body固定を解除（スクロール位置は遷移先に委ねる）
            $('body').css({ top: 0, height: 'auto' });
            $('html').removeClass('fixed');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            return false;
        }

        // 別ページへのリンクはbody固定を解除して通常遷移
        switchFixed();
    });


    /*
    **  TOPへ戻る
    --------------------------------------------- */
    let scrollPos = 0;
    let timer_pagetop;
    const topBtn = $('#page-top');
    topBtn.hide();

    const returnTopBtn = () => {
        if (mode) { return; }
        clearTimeout(timer_pagetop);
        const currentTop = $(window).scrollTop();
        if (currentTop < scrollPos) {
            topBtn.fadeIn();
        } else {
            topBtn.fadeOut();
        }
        scrollPos = currentTop;
        timer_pagetop = setTimeout(() => topBtn.stop(true).fadeOut(), 6000);
    };


    /*
    **  viewport 375以下固定
    --------------------------------------------- */
    $(window).on('orientationchange resize', function () {
        const vp = 375;
        const outerW = window.outerWidth;
        const content = outerW <= vp
            ? `width=${vp},user-scalable=no,shrink-to-fit=yes`
            : 'width=device-width,initial-scale=1.0';
        $("meta[name='viewport']").attr('content', content);
    }).trigger('resize');


    /**
     * リサイズ
     */
    $(window).on('resize', function () {
        w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        if (w >= 768) {
            if ($('#menu-btn').hasClass('active')) {
                $('#menu-btn').removeClass('active');
                switchFixed();
                $('header').children('nav').removeClass('open');
            }
            if (mode) { mode = false; }
        } else {
            if (!mode) {
                mode = true;
                $('#menu-btn').removeClass('active');
                switchFixed();
            }
        }
    });

});


/**
 * load
 */
$(window).on('load', function () {
    loadFlag = true;
});


/**
 * switchFixed
 * スクロール禁止と解除
 */
function switchFixed(flag = 0) {
    if (flag) {
        $('body').css('top', $(window).scrollTop() * -1);
        $('body').css('height', $(window).scrollTop() + $(window).height());
        $('html').addClass('fixed');
    } else {
        const returnTop = parseInt($('body').css('top')) * -1 || 0;
        $('body').css({ top: 0, height: 'auto' });
        $('html').removeClass('fixed');
        $(window).scrollTop(returnTop);
    }
}
