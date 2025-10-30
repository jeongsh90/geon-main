// sec1 효과
gsap.to(".sec1", {
    borderRadius: "120px",
    scale: 0.85,
    transformOrigin: "center center",
    ease: "none",
    scrollTrigger: {
        trigger: ".sec1",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// sec2 고정 + 가로 스크롤
$(window).on("load", function () {
    const ul = $(".sec2 .content-list ul")[0];
    const wrap = $(".sec2 .content-list .link-wrap")[0];
    if (!ul || !wrap) return;

    const ulWidth = ul.scrollWidth;
    const wrapWidth = wrap.clientWidth;
    const moveX = ulWidth - wrapWidth;

    gsap.to(ul, {
        x: -moveX,
        ease: "none",
        scrollTrigger: {
            trigger: ".sec2",
            start: "top top",
            end: () => "+=" + moveX,
            scrub: true,
            pin: true,
            anticipatePin: 1
        }
    });
});

// sec3 고정
ScrollTrigger.create({
    trigger: ".sec3",
    start: "top top",
    end: "+=100%",
    pin: true,
    anticipatePin: 1
});

// 카드 숫자 애니메이션
$(".sec3 .card p span").each(function () {
    const $span = $(this);
    const finalValue = parseInt($span.text().replace(/,/g, ""), 10);
    $span.text("0");

    ScrollTrigger.create({
        trigger: $span[0],
        start: "top 80%",
        once: true,
        onEnter: () => {
            gsap.fromTo($span[0],
                { innerText: 0 },
                {
                    innerText: finalValue,
                    duration: 1.75,
                    ease: "power1.out",
                    snap: { innerText: 1 },
                    onUpdate: function () {
                        $span.text(Math.floor($span[0].innerText));
                    }
                }
            );
        }
    });
});

gsap.from(".sec3 .content-card .card", {
    x: -100,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    stagger: 0.2,
    scrollTrigger: {
        trigger: ".sec3 .content-card",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});

// 배경 전환
gsap.set(".bg-item span", {
    right: "inherit",
    left: 0,
    top: "50%",
    transform: "translate(-50%, -50%) scale(.85)",
    opacity: 0,
});

ScrollTrigger.create({
    trigger: "#sec2",
    start: "top center",
    onEnter: () => {
        gsap.to(".bg-item span", {
            duration: 1.2,
            left: 0,
            top: "50%",
            transform: "translate(-50%, -50%) scale(.85)",
            opacity: 1,
            ease: "power2.out"
        });
    },
    onLeaveBack: () => {
        gsap.to(".bg-item span", {
            duration: 1.2,
            left: 0,
            top: "50%",
            transform: "translate(-50%, -50%) scale(.85)",
            opacity: 0,
            ease: "power2.out"
        });
    }
});

ScrollTrigger.create({
    trigger: "#sec3",
    start: "top center",
    onEnter: () => {
        gsap.to(".bg-item span", {
            duration: 1.2,
            left: "50%",
            top: 0,
            transform: "translate(-50%, -50%) scale(1.25)",
            ease: "power2.out"
        });
    },
    onLeaveBack: () => {
        gsap.to(".bg-item span", {
            duration: 1.2,
            left: 0,
            top: "50%",
            transform: "translate(-50%, -50%) scale(.85)",
            ease: "power2.out"
        });
    }
});

// sec4 고정
$(window).on("load", function () {
    ScrollTrigger.create({
        trigger: ".sec4",
        start: "top top",
        end: "+=100%",
        pin: true,
        anticipatePin: 1,
        scrub: true
    });
});

// 섹션 네비게이션
$(".sec-nav a").on("click", function (e) {
    e.preventDefault();
    const targetSelector = $(this).data("target");
    const target = $(targetSelector)[0];
    if (target) smoother.scrollTo(target, true, "top top");
});

const $navItems = $(".sec-nav li");
const navSections = gsap.utils.toArray("#sec1, #sec2, #sec3, #sec4, #footer");

function setActiveNav(targetSelector) {
    $navItems.each(function () {
        const $link = $(this).find("a");
        $(this).toggleClass("on", $link.length && $link.data("target") === targetSelector);
    });
}

$(navSections).each(function (i, sec) {
    const secId = "#" + sec.id;
    ScrollTrigger.create({
        trigger: sec,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveNav(secId),
        onEnterBack: () => setActiveNav(secId)
    });
});
