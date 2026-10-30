import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * 全站动效中枢
 * ---------------------------------------------------------------
 * 节奏在这里定：慢、长距离、指数缓动，不做廉价弹跳。
 * 只动 transform / opacity / clip-path；触发用 IntersectionObserver，
 * 只有「视差」这种需要滚动进度的才交给 ScrollTrigger。
 *
 * 页面侧用属性声明意图，不写 JS：
 *   data-reveal                  普通块，进视口上浮 + 淡入（同屏自动错峰）
 *   data-reveal-delay="120"      给单块额外延迟
 *   data-reveal="img"            图片 / 视频：遮罩自下揭起 + 画面从 1.18 推回原位
 *   data-reveal-media="off"      只揭遮罩、不动内部画面（长图这类自己有位移的）
 *   data-parallax="2.6"          揭幕后随滚动缓慢漂移（幅度上限 3）
 *   data-stagger-group=".poster" 容器内的子项依次揭幕
 *   data-intro                   首屏整块位移 + 压缩归位
 *
 * 用 IO 而不是 ScrollTrigger.batch 的原因：锚点跳转、刷新后恢复滚动位置时，
 * ScrollTrigger 会把「跳过去的元素」判成 already passed，不再触发 onEnter；
 * IO 在 observe 时就会给一次初始状态，怎么跳都不会漏。
 */

export const EASE = {
  out: "expo.out",
  inOut: "expo.inOut",
  soft: "power3.out",
};

const REDUCED = "(prefers-reduced-motion: reduce)";

export const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia(REDUCED).matches;

/* 标题字符：被压在遮罩里，压缩后归位 ─────────────────────── */
export function playChars(chars, { stagger = 0.05, duration = 1.32, delay = 0 } = {}) {
  return gsap.fromTo(
    chars,
    { yPercent: 116, scaleY: 1.45, opacity: 0, transformOrigin: "50% 100%" },
    {
      yPercent: 0,
      scaleY: 1,
      opacity: 1,
      duration,
      ease: "expo.out",
      stagger,
      delay,
      overwrite: true,
      onComplete() {
        gsap.set(chars, { clearProps: "transform,opacity" });
        /* 标记进场完成：CSS 放开遮罩裁切，标题磁吸从这里开始生效 */
        const host = chars[0] && chars[0].closest(".split");
        if (host) host.classList.add("is-done");
      },
    }
  );
}

export function initMotion() {
  if (typeof window === "undefined") return () => {};

  const root = document.documentElement;

  /* 系统开了减少动效：全部直接显示，不留半透明残影 */
  if (prefersReduced()) {
    root.classList.add("motion-off");
    return () => root.classList.remove("motion-off");
  }

  const observers = [];
  const magnetCleanups = [];

  const observe = (targets, onHit, options = {}) => {
    const list = targets.filter(Boolean);
    if (!list.length) return;
    if (!("IntersectionObserver" in window)) {
      onHit(list);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target)
          .sort(
            (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top
          );
        if (!hit.length) return;
        hit.forEach((el) => io.unobserve(el));
        onHit(hit);
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0, ...options }
    );
    list.forEach((el) => io.observe(el));
    observers.push(io);
  };

  const ctx = gsap.context(() => {
    /* ── 1. 首屏整块：位移 + 轻微压缩后归位 ── */
    const intro = document.querySelector("[data-intro]");
    if (intro) {
      gsap.fromTo(
        intro,
        { y: 30, scaleY: 0.94, transformOrigin: "50% 100%" },
        { y: 0, scaleY: 1, duration: 1.7, ease: "expo.out", delay: 0.1 }
      );
    }

    /* ── 1.2 首屏 → 个人介绍：滚动衔接 ──
       亮色视频画面硬切暗色内容区太生硬。离场时分四步走：
       文字先浮走消隐 → 画面微放大下沉（拉出纵深）→ 底部渐隐进页面底色
       → 交界处扫过一道香槟光线；个人介绍整块再轻轻上浮承接。 */
    const heroEl = document.querySelector(".hero");
    const profileEl = document.getElementById("profile");
    if (heroEl && profileEl && !prefersReduced()) {
      gsap.to(".hero__content", {
        y: -84,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: heroEl, start: "top top", end: "52% top", scrub: 0.5 },
      });
      gsap.to(".hero__foot", {
        y: -30,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: heroEl, start: "top top", end: "42% top", scrub: 0.5 },
      });
      gsap.fromTo(
        ".hero__stage",
        { scale: 1 },
        {
          scale: 1.06,
          transformOrigin: "50% 42%",
          ease: "none",
          scrollTrigger: { trigger: heroEl, start: "top top", end: "bottom top", scrub: 0.5 },
        }
      );
      gsap.to(".hero__exit", {
        opacity: 1,
        ease: "none",
        scrollTrigger: { trigger: heroEl, start: "22% top", end: "74% top", scrub: 0.5 },
      });
      gsap.fromTo(
        ".hero__seam",
        { opacity: 0, scaleX: 0.22 },
        {
          opacity: 0.6,
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: heroEl, start: "55% top", end: "bottom top", scrub: 0.5 },
        }
      );
      gsap.fromTo(
        profileEl,
        { y: 42 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: { trigger: profileEl, start: "top bottom", end: "top 62%", scrub: 0.5 },
        }
      );
    }

    /* ── 1.5 数字计数：入场时从 0 滚到真实值 ──
       计数跟块的显影同一条时间线：数字先归零，块浮上来，数字随后滚到位。 */
    const counted = new WeakSet();
    const fmtNum = (v, dp) => (dp > 0 ? v.toFixed(dp) : String(Math.round(v)));

    const countTargets = (scope) => [
      ...(scope.matches && scope.matches("[data-count]") ? [scope] : []),
      ...scope.querySelectorAll("[data-count]"),
    ];

    function prepCounters(scope) {
      countTargets(scope).forEach((el) => {
        if (counted.has(el)) return;
        counted.add(el);
        el.textContent = fmtNum(0, Number(el.dataset.countDecimals || 0));
      });
    }

    function runCounters(scope, delay = 0) {
      countTargets(scope).forEach((el, i) => {
        const target = Number(el.dataset.count);
        if (!Number.isFinite(target)) return;
        const dp = Number(el.dataset.countDecimals || 0);
        const box = { v: 0 };
        gsap.to(box, {
          v: target,
          duration: 1.7,
          ease: "power2.out",
          delay: delay + i * 0.09,
          onUpdate() {
            el.textContent = fmtNum(box.v, dp);
          },
          onComplete() {
            el.textContent = fmtNum(target, dp);
          },
        });
      });
    }

    /* ── 2. 块级显影：同屏一批按进入顺序错峰 ── */
    const blocks = gsap.utils.toArray('[data-reveal]:not([data-reveal="img"])');
    if (blocks.length) {
      /* 数字先归零，免得入场前就先把结果亮出来 */
      blocks.forEach(prepCounters);
      gsap.set(blocks, { opacity: 0, y: 72 });

      const play = (el, i = 0) => {
        const own = Number(el.dataset.revealDelay || 0) / 1000;
        const at = own + i * 0.085;
        runCounters(el, at + 0.18);
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1.32,
          ease: "expo.out",
          delay: at,
          overwrite: true,
          onComplete() {
            gsap.set(el, { clearProps: "transform" });
          },
        });
      };

      /* 首帧就已经在视口里的（首屏按钮、数据行）直接播：
         不等 IO 的首轮回调，免得首屏元素因为字体/图片加载引起的重排被漏掉 */
      const fold = [];
      const rest = [];
      blocks.forEach((el) => {
        (el.getBoundingClientRect().top < window.innerHeight ? fold : rest).push(el);
      });
      fold.forEach((el, i) => play(el, i));
      if (rest.length) observe(rest, (hit) => hit.forEach((el, i) => play(el, i)));
    }

    /* ── 3. 图片：遮罩自下揭起，画面从 1.18 推回原位 ── */
    const shots = gsap.utils.toArray('[data-reveal="img"]');
    shots.forEach((el) => {
      const media = el.querySelector("img, video");
      const drift = el.dataset.parallax;
      const skipMedia = el.dataset.revealMedia === "off";

      const tl = gsap.timeline({
        paused: true,
        onComplete() {
          if (media && !skipMedia) gsap.set(media, { clearProps: "transform" });
          if (drift && media && !skipMedia) addDrift(el, media, drift);
        },
      });

      tl.fromTo(
        el,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.55, ease: "expo.inOut" },
        0
      );

      if (media && !skipMedia) {
        tl.fromTo(
          media,
          { scale: 1.18, yPercent: 2.4 },
          { scale: 1, yPercent: 0, duration: 1.95, ease: "expo.out" },
          0
        );
      }

      observe([el], () => tl.play(), { rootMargin: "0px 0px -12% 0px" });
    });

    /* ── 4. 成组揭幕：海报墙这类「一排卡片」依次擦开 ── */
    gsap.utils.toArray("[data-stagger-group]").forEach((group) => {
      const items = gsap.utils.toArray(
        group.dataset.staggerGroup || ":scope > *",
        group
      );
      if (!items.length) return;

      const tl = gsap.timeline({ paused: true });
      items.forEach((item, i) => {
        const media = item.querySelector("img, video");
        const mask = media || item;
        const cap = item.querySelector("figcaption");
        const at = i * 0.14;

        tl.fromTo(
          mask,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.35, ease: "expo.inOut" },
          at
        );
        if (media) {
          tl.fromTo(
            media,
            { scale: 1.14 },
            { scale: 1, duration: 1.7, ease: "expo.out", clearProps: "transform" },
            at
          );
        }
        if (cap) {
          tl.fromTo(
            cap,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.95, ease: "expo.out" },
            at + 0.42
          );
        }
      });

      observe([group], () => tl.play(), { rootMargin: "0px 0px -10% 0px" });
    });

    /* ── 5. 章节横线：从左侧拉开 ── */
    const rules = gsap.utils.toArray(".chapter__rule");
    rules.forEach((rule) => {
      gsap.set(rule, { scaleX: 0, transformOrigin: "0% 50%" });
    });
    observe(
      rules,
      (hit) => {
        hit.forEach((rule) => {
          gsap.to(rule, { scaleX: 1, duration: 1.35, ease: "expo.out" });
        });
      },
      { rootMargin: "0px 0px -6% 0px" }
    );

    /* 视差的 scrub 预算在 context 里，销毁时一起清 */
    function addDrift(el, media, amount) {
      const a = Math.min(Math.abs(Number(amount) || 0), 3);
      if (!a) return;
      gsap.set(media, { scale: 1.06 });
      gsap.fromTo(
        media,
        { yPercent: -a },
        {
          yPercent: a,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        }
      );
    }
    /* ── 6. 标题磁吸：光标靠近，字被轻轻拽向鼠标；离开后自行缓回 ── */
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      gsap.utils.toArray("h1, h2").forEach((head) => {
        const chars = Array.from(head.querySelectorAll(".split__c"));
        if (!chars.length || chars.length > 40) return;

        /* 幅度跟着字号走：大标题吸得住，小标题不至于晃。
           汉字字身几乎占满字面框，单字位移必须压在 5px 内，否则相邻两字会撞在一起 */
        const fs = parseFloat(window.getComputedStyle(head).fontSize) || 40;
        const MAX = Math.min(5.5, Math.max(3, fs * 0.055));
        const RADIUS = Math.max(90, fs * 2.2);
        const PULL = 0.36;

        const movers = chars.map((c) => ({
          x: gsap.quickTo(c, "x", { duration: 0.65, ease: "power3.out" }),
          y: gsap.quickTo(c, "y", { duration: 0.65, ease: "power3.out" }),
        }));

        let ox = null;
        let mx = 0;
        let my = 0;
        let raf = 0;

        /* 字心相对标题的位置：只量一次，读数不会被自己的 transform 带偏 */
        const measure = () => {
          const base = head.getBoundingClientRect();
          ox = chars.map((c) => {
            const r = c.getBoundingClientRect();
            return {
              x: r.left + r.width / 2 - base.left,
              y: r.top + r.height / 2 - base.top,
            };
          });
        };

        const tick = () => {
          raf = 0;
          if (!ox) return;
          const base = head.getBoundingClientRect();
          for (let i = 0; i < movers.length; i += 1) {
            const dx = mx - (base.left + ox[i].x);
            const dy = my - (base.top + ox[i].y);
            const dist = Math.hypot(dx, dy);
            const fall = dist >= RADIUS ? 0 : 1 - dist / RADIUS;
            const k = PULL * fall * fall;
            movers[i].x(gsap.utils.clamp(-MAX, MAX, dx * k));
            movers[i].y(gsap.utils.clamp(-MAX, MAX, dy * k));
          }
        };

        const onMove = (e) => {
          /* 进场没走完之前不吸：遮罩还合着，量出来的位置也不准 */
          if (head.querySelector(".split:not(.is-done)")) return;
          if (!ox) measure();
          mx = e.clientX;
          my = e.clientY;
          if (!raf) raf = requestAnimationFrame(tick);
        };

        const onLeave = () => {
          if (raf) {
            cancelAnimationFrame(raf);
            raf = 0;
          }
          movers.forEach((m) => {
            m.x(0);
            m.y(0);
          });
        };

        const remeasure = () => {
          ox = null;
        };

        head.addEventListener("pointermove", onMove, { passive: true });
        head.addEventListener("pointerleave", onLeave, { passive: true });
        window.addEventListener("resize", remeasure);

        magnetCleanups.push(() => {
          head.removeEventListener("pointermove", onMove);
          head.removeEventListener("pointerleave", onLeave);
          window.removeEventListener("resize", remeasure);
          if (raf) cancelAnimationFrame(raf);
          gsap.killTweensOf(chars);
          gsap.set(chars, { clearProps: "transform" });
        });
      });
    }
  });

  /* 长图 / 懒加载图片撑高文档后，视差区间要重新量一次 */
  const refresh = () => ScrollTrigger.refresh();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
  window.addEventListener("load", refresh);

  return () => {
    window.removeEventListener("load", refresh);
    observers.forEach((io) => io.disconnect());
    magnetCleanups.forEach((fn) => fn());
    gsap.killTweensOf(gsap.utils.toArray("[data-reveal]"));
    ctx.revert();
    /* 视差那类 scrub 是在动画结束回调里异步建的，context 收不到，单独清一次 */
    ScrollTrigger.getAll().forEach((st) => st.kill());
    root.classList.remove("js-motion");
  };
}
