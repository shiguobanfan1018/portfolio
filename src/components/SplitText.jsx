import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { playChars, prefersReduced } from "../lib/motion.js";

/**
 * 逐字上浮（遮罩 + 压缩归位）
 * 把一段文字拆成单字，每个字被压在遮罩里，先被纵向拉开再压回原位，
 * 按 index 错峰升起 —— 由 GSAP 驱动，缓动统一走 expo.out。
 *
 * props
 *  text       要拆的文字
 *  as         标签名，默认 span
 *  className  追加类名（.split--block 可变成独占一行）
 *  stagger    相邻两字的间隔毫秒
 *  delay      整组的起始延迟（毫秒）
 *  duration   单字时长（秒）
 *  immediate  true = 挂载后立刻播（首屏用）；否则进入视口才播
 */
export default function SplitText({
  text = "",
  as: Tag = "span",
  className = "",
  stagger = 40,
  delay = 0,
  duration = 1.32,
  immediate = false,
}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const chars = el.querySelectorAll(".split__c");
    if (!chars.length || prefersReduced()) return undefined;

    const opts = { stagger: stagger / 1000, delay: delay / 1000, duration };

    /* 初始态压在遮罩下：绘制前就位，不会看到文字闪一下 */
    gsap.set(chars, {
      yPercent: 116,
      scaleY: 1.45,
      opacity: 0,
      transformOrigin: "50% 100%",
    });

    if (immediate) {
      const tween = playChars(chars, opts);
      return () => tween.kill();
    }

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 92%",
      once: true,
      onEnter: () => playChars(chars, opts),
    });

    return () => {
      st.kill();
      gsap.killTweensOf(chars);
    };
  }, [immediate, stagger, delay, duration]);

  return (
    <Tag ref={ref} className={`split ${className}`} aria-label={text}>
      {Array.from(text).map((c, i) => (
        <span className="split__m" key={`${c}-${i}`} aria-hidden="true">
          <span className="split__c">{c === " " ? "\u00A0" : c}</span>
        </span>
      ))}
    </Tag>
  );
}
