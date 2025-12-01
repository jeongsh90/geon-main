gsap.registerPlugin(ScrollTrigger);

$(function () {

    /* ==========================================
       VISUAL 섹션
    ========================================== */
    gsap.to(".visual", {
        scale: 0.85,
        borderRadius: "120px",
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".visual",
            start: "top top",
            end: "bottom top",
            scrub: true,
        },
    });


    /* ==========================================
       HISTORY 섹션
    ========================================== */
    $(".history .history-list").each(function () {
        const $wrap = $(this).find(".content-info .item-wrap");
        const $container = $(this).find(".content-info");
        if (!$wrap.length || !$container.length) return;

        const totalHeight = $wrap[0].scrollHeight;
        const moveY = totalHeight - $container[0].clientHeight;

        gsap.to($wrap[0], {
            y: -moveY,
            ease: "none",
            scrollTrigger: {
                trigger: this,
                start: "top top",
                end: "+=" + moveY,
                pin: true,
                scrub: true,
                anticipatePin: 1,
            },
        });
    });

    // 연도 고정
    $(".history .history-list").each(function () {
        const $yearBox = $(this).find(".content-year");
        if (!$yearBox.length) return;

        ScrollTrigger.create({
            trigger: this,
            start: "top top+=200",
            end: "bottom bottom",
            pin: $yearBox[0],
            pinSpacing: false,
            anticipatePin: 1,
        });
    });

    // 연도 애니메이션
    $(".history .history-list .content-year h3").each(function () {
        gsap.from(this, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: this,
                start: "top 70%",
                toggleActions: "play none none reverse",
            },
        });
    });

    // 리스트 아이템 등장
    $(".history .history-list .content-info .item").each(function () {
        gsap.from(this, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: this,
                start: "top 70%",
                toggleActions: "play none none reverse",
            },
        });
    });


    /* ==========================================
       CI 섹션
    ========================================== */
    const tlCi = gsap.timeline({
        scrollTrigger: {
            trigger: ".ci .sec1",
            start: "top 80%",
            toggleActions: "play none none reverse",
        },
    });

    tlCi
        .from(".ci .sec1 .content-img", {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
        })
        .from(".ci .sec1 .content-color", {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
        }, "-=0.4")
        .from(".ci .sec1 .content-color .item", {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.075,
            ease: "power2.out",
        }, "-=0.3");

    gsap.utils.toArray(".ci .sec1 .content-txt").forEach((el, i) => {
        gsap.from(el, {
            y: 50,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: el,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
            delay: i * 0.3,
        });
    });

    $(".ci .sec1 .content-color .item").on("click", function () {
        const text = $(this).find("span").text().trim();
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
            alert("복사되었습니다: " + text);
        }).catch(() => {
            console.error("복사 실패");
        });
    });


    /* ==========================================
       LOCATION 섹션 (stack-up effect + last longer)
    ========================================== */
    const $locations = gsap.utils.toArray(".sec-location");

    $locations.forEach((section, i) => {
        const next = $locations[i + 1];

        if (!next) {
            ScrollTrigger.create({
                trigger: section,
                start: "top top",
                end: "+=" + window.innerHeight * 1.015,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
            });
        }
        else {
            ScrollTrigger.create({
                trigger: section,
                start: "top top",
                endTrigger: next,
                end: "top top",
                pin: true,
                pinSpacing: false,
                anticipatePin: 1,
            });
        }
    });

    $locations.forEach((section) => {
        gsap.from(section, {
            opacity: 0,
            yPercent: 10,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top 90%",
                end: "top 60%",
                scrub: true,
            },
        });
    });



});


gsap.registerPlugin(ScrollTrigger);

$(function () {

    /* ==========================================
       BUSINESS TAB + SCROLL TO INTRO (AUTO)
    ========================================== */

    $(".business-nav ul li").on("click", function () {

        $(".business-nav ul li").removeClass("on");
        $(this).addClass("on");

        const index = $(this).index();
        const $tabContents = $(".tab-content");

        $tabContents.removeClass("on").hide();
        const $currentTab = $tabContents.eq(index).addClass("on").fadeIn(300);

        // ★ sec1 GSAP 재생성
        setTimeout(() => {
            initBusinessSec1();
            ScrollTrigger.refresh();
        }, 120);

        // intro 이동
        const $targetIntro = $currentTab.find(".intro").first();

        if ($targetIntro.length) {
            if (window.smoother) {
                smoother.scrollTo($targetIntro[0], true, "center top");
            } else {
                $("html, body").animate({
                    scrollTop: $targetIntro.offset().top
                }, 600);
            }
        }

    });


    /* ==========================================
       FOOTER 감지 → NAV 숨김
    ========================================== */

    ScrollTrigger.create({
        trigger: "#footer",
        start: "top bottom",
        end: "bottom bottom",
        onEnter: () => $(".business-nav").addClass("off"),
        onLeaveBack: () => $(".business-nav").removeClass("off")
    });

    /* 최초 실행 */
    initBusinessSec1();
});



/* ==========================================
   business01 sec1 : item 순차 등장 (함수화)
========================================== */

let businessSec1TL = null;

function initBusinessSec1() {

    // 기존 TL 제거
    if (businessSec1TL) {
        businessSec1TL.scrollTrigger.kill(true);
        businessSec1TL.kill();
        businessSec1TL = null;
    }

    // ★ 핵심 수정: 현재 on 된 탭 내부에서 sec1을 찾음
    let sec = document.querySelector(".tab-content.on .sec1");
    let items = gsap.utils.toArray(".tab-content.on .sec1 .item");

    if (!sec || items.length === 0) return;

    // 새로운 TL 생성
    businessSec1TL = gsap.timeline({
        scrollTrigger: {
            trigger: sec,
            start: "top top",
            end: "+=" + (items.length * 250),
            scrub: true,
            pin: true,
            anticipatePin: 1
        }
    });

    items.forEach((item, i) => {
        businessSec1TL.from(item, {
            x: 100,
            opacity: .5,
            duration: 1,
            ease: "power2.ease"
        }, i);
    });
}
