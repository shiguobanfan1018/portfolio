/* 顶部播放头：模拟剪辑时间线的进度条
   性能版：不走 React 状态（每帧 setState 会整棵重渲染），
   直接写 transform；滚动总高度只在 resize / 字体加载后量一次，
   而不是每次滚动都读 scrollHeight 强制整页布局。 */
import { useEffect, useRef } from "react";
import "./ScrollProgress.css";

export default function ScrollProgress() {
  const barRef = useRef(null);
  const headRef = useRef(null);
  const maxRef = useRef(1);

  useEffect(() => {
    const bar = barRef.current;
    const head = headRef.current;
    if (!bar || !head) return undefined;

    const measure = () => {
      maxRef.current = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
    };
    measure();

    let raf = 0;
    let last = -1;
    const paint = () => {
      raf = 0;
      const p = Math.min(1, window.scrollY / maxRef.current);
      if (p === last) return; /* 同值帧直接跳过，不碰样式 */
      last = p;
      bar.style.transform = `scaleX(${p})`;
      head.style.left = `${(p * 100).toFixed(2)}%`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    /* 懒加载图片撑高文档后重量一次 */
    document.fonts?.ready?.then(measure);
    window.addEventListener("load", measure);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="progress" aria-hidden="true">
      <span className="progress__bar" ref={barRef} />
      <span className="progress__playhead" ref={headRef} />
    </div>
  );
}
