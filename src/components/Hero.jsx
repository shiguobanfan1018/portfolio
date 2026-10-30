import { useEffect, useRef } from "react";
import SplitText from "./SplitText.jsx";
import CursorGlow from "./CursorGlow.jsx";
import { prefersReduced } from "../lib/motion.js";
import { hero } from "../data/site.js";
import { asset } from "../lib/asset.js";
import SpecularButton from "./SpecularButton.jsx";
import "./Hero.css";

/* 底部数据行用的小图标，线性 13px，和正文一个色阶 */
function HeroIcon({ name }) {
  const box = {
    width: 13,
    height: 13,
    viewBox: "0 0 14 14",
    fill: "none",
    "aria-hidden": "true",
  };
  if (name === "spark") {
    return (
      <svg {...box}>
        <path
          d="M7 1.2 8.45 5.55 12.8 7 8.45 8.45 7 12.8 5.55 8.45 1.2 7 5.55 5.55Z"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (name === "grid") {
    return (
      <svg {...box}>
        <rect x="2" y="2" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.1" />
        <rect x="8" y="2" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.1" />
        <rect x="2" y="8" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.1" />
        <rect x="8" y="8" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.1" />
      </svg>
    );
  }
  return (
    <svg {...box}>
      <circle cx="7" cy="7" r="5.4" stroke="currentColor" strokeWidth="1.1" />
      <path
        d="M4.6 7.1 6.2 8.7 9.5 5.2"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Hero() {
  const videoRef = useRef(null);

  /* 背景片子只在首屏里播：滚出去就暂停，别让它在下面白烧 GPU 和电量。
     系统开了「减弱动态效果」就不自动播，留在封面帧当静态图。 */
  useEffect(() => {
    const v = videoRef.current;
    if (!v || prefersReduced()) return undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else if (!v.paused) {
          v.pause();
        }
      },
      { threshold: 0.02 }
    );
    io.observe(v);

    /* 移动端省流量：系统开了省流量模式就不自动播 */
    const conn = navigator.connection;
    if (conn && conn.saveData) v.pause();

    return () => io.disconnect();
  }, []);

  return (
    <section className="hero" id="home">
      {/* ── 背景：一段四季山野的动画直接铺满，中间不再压任何暗层 ── */}
      <div className="hero__stage" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero__bg"
          src={asset("/hero-bg.mp4")}
          poster={asset("/hero-bg-poster.webp")}
          autoPlay={!prefersReduced()}
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          tabIndex={-1}
        />
        <span className="hero__grain" />
      </div>

      {/* ── 滚动衔接层：平时完全透明，滚离首屏时才由 ScrollTrigger 擦亮 ──
          exit 把亮画面底部融进页面底色，seam 在交界处扫过一道光线 */}
      <span className="hero__exit" aria-hidden="true" />
      <span className="hero__seam" aria-hidden="true" />

      {/* ── 居中：标题 / 双按钮 ── */}
      <div className="container hero__content">
        <h1
          className="hero__title"
          data-intro
          aria-label={`${hero.titleTop}${hero.titleBottom}${hero.titleDim}`}
        >
          <SplitText
            as="span"
            className="split--block"
            text={hero.titleTop}
            stagger={48}
            immediate
          />
          <span className="hero__line">
            <SplitText
              as="span"
              text={hero.titleBottom}
              stagger={48}
              delay={280}
              immediate
            />
            <SplitText
              as="span"
              className="hero__serif"
              text={hero.titleDim}
              stagger={48}
              delay={500}
              immediate
            />
            <i className="hero__dot" aria-hidden="true" />
          </span>
        </h1>

        <div className="hero__actions" data-reveal data-reveal-delay="360">
          <SpecularButton
            className="hero__cta"
            href={hero.ctaPrimary.href}
            size="md"
            radius={24}
            tint="#f4f1e9"
            tintOpacity={0.15}
            blur={10}
            textColor="#f4f1e9"
            lineColor="#ffffff"
            baseColor="#6b6358"
            intensity={1}
            idleIntensity={0.45}
            shineSize={13}
            shineFade={44}
            thickness={1.35}
            glow={1}
            proximity={300}
          >
            {hero.ctaPrimary.label}
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path
                d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </SpecularButton>
          <SpecularButton
            className="hero__cta2"
            href={hero.ctaSecondary.href}
            size="md"
            radius={24}
            tint="#f4f1e9"
            tintOpacity={0.05}
            blur={10}
            textColor="rgba(244, 241, 233, 0.9)"
            lineColor="#ffffff"
            baseColor="#5b564f"
            intensity={0.85}
            idleIntensity={0.24}
            shineSize={10}
            shineFade={38}
            thickness={1.1}
            glow={0.8}
            proximity={260}
          >
            {hero.ctaSecondary.label}
          </SpecularButton>
        </div>
      </div>

      {/* ── 底部：三格数据 + 工具链 / 片花入口 ── */}
      <div className="hero__foot">
        <div className="container hero__stats" data-reveal data-reveal-delay="540">
          {hero.heroStats.map((s) => (
            <div className="hero__stat" key={s.label}>
              <span className="hero__stat-ico">
                <HeroIcon name={s.icon} />
              </span>
              <span className="hero__stat-num">
                <span data-count={s.value}>{s.value}</span>
                <i>{s.unit}</i>
              </span>
              <span className="hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="container hero__sig">
          <a className="hero__scroll" href="#profile">
            <i />
            Scroll
          </a>

          <ul className="hero__tools">
            {hero.toolkit.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <div className="hero__tc">
            <a className="hero__reel" href="#work-shenyi">
              <span className="hero__reel-ico" aria-hidden="true" />
              {hero.reel.label}
            </a>
          </div>
        </div>
      </div>

      {/* ── 光标光带：只铺这一屏，滚出首屏即停 ── */}
      <CursorGlow />
    </section>
  );
}
