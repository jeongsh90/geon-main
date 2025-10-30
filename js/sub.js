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


