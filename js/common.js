gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
const smoother = ScrollSmoother.create({
    wrapper: ".smooth-wrapper",
    content: ".smooth-content",
    smooth: 1.5,
    effects: true
});

// prev / next 버튼
const $prevBtn = $(".page-prev");
const $nextBtn = $(".page-next");
const allSections = gsap.utils.toArray(".sec");
let currentIndex = 0;
function updatePageButtons(index) {
    currentIndex = index;
    $prevBtn.toggleClass("off", currentIndex === 0);
    $nextBtn.toggleClass("off", currentIndex === allSections.length - 1);
}

$(allSections).each(function (i, sec) {
    ScrollTrigger.create({
        trigger: sec,
        start: "top center",
        end: "bottom center",
        onEnter: () => updatePageButtons(i),
        onEnterBack: () => updatePageButtons(i)
    });
});

$prevBtn.on("click", function (e) {
    e.preventDefault();
    if (currentIndex > 0) {
        currentIndex -= 1;
        smoother.scrollTo(allSections[currentIndex], true, "top top");
    }
});

$nextBtn.on("click", function (e) {
    e.preventDefault();
    if (currentIndex < allSections.length - 1) {
        currentIndex += 1;
        smoother.scrollTo(allSections[currentIndex], true, "top top");
    }
});

// intro 텍스트 애니메이션
$(".intro").each(function () {
    const $intro = $(this);
    const spans = $intro.find("p span").toArray();
    const total = spans.length;
    const introHeight = $intro.outerHeight();

    $(spans).each(function (i, span) {
        gsap.fromTo(span,
            { backgroundSize: "0% 100%" },
            {
                backgroundSize: "100% 100%",
                ease: "none",
                scrollTrigger: {
                    trigger: $intro[0],
                    start: "top+=" + (i * (introHeight / total)) + " center",
                    end: "top+=" + ((i + 0.5) * (introHeight / total)) + " center",
                    scrub: true,
                }
            }
        );
    });
});


$(function () {
    $(".location .sec-location .content-wrap").each(function () {
        gsap.from(this, {
            y: 50,             // 아래에서 위로 살짝
            opacity: 0,        // 투명도 0 → 1
            duration: 0.8,     // 시간
            ease: "power2.out",
            scrollTrigger: {
                trigger: this,
                start: "top 80%",   // 화면의 80% 지점에 닿으면 시작
                toggleActions: "play none none reverse"
            }
        });
    });
});