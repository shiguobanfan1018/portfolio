import { lazy, Suspense, useEffect, useState } from "react";
import "./BelowBackdrop.css";

/* 碎片场按需加载：首屏不下载这段 WebGPU 代码，滚下来才开始拉 */
const AeroShards = lazy(() => import("./AeroShards.jsx"));

/**
 * 头图下方的背景层
 * —— 固定在视口里，只覆盖首屏之外的内容区（首屏自己有 WebGL 纤维，不叠第二层）。
 * 滚过首屏时淡入，滚回首屏时淡出并暂停渲染。
 */
export default function BelowBackdrop() {
  const [shown, setShown] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return undefined;

    const io = new IntersectionObserver(
      ([entry]) => setShown(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-12% 0px 0px 0px" }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  /* 挂载一次就不再卸载，来回滚动不会重新初始化 GPU 资源 */
  useEffect(() => {
    if (shown) setMounted(true);
  }, [shown]);

  /* 空闲期预取碎片场代码：现在它在滚过首屏那一刻才开始下载 225KB 的
     chunk 并初始化 WebGPU，正好砸出滚动长帧。提前拉好，滚过去只做初始化。 */
  useEffect(() => {
    let id;
    let t;
    const start = () => {
      import("./AeroShards.jsx").catch(() => {});
    };
    /* 等页面 load 完再排期：这段 225KB 的代码不能在首屏和 HTML/CSS/字体抢带宽 */
    const schedule = () => {
      if (typeof window.requestIdleCallback === "function") {
        id = window.requestIdleCallback(start, { timeout: 8000 });
      } else {
        t = window.setTimeout(start, 5000);
      }
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.cancelIdleCallback?.(id);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <div
      className={`backdrop${shown ? " is-on" : ""}${failed ? " is-fallback" : ""}`}
      aria-hidden="true"
    >
      {mounted && (
        <Suspense fallback={null}>
          <AeroShards
            shardColor="#6b5c44"
            accentColor="#e9d0a6"
            placement="full"
            material="glass"
            markers="none"
            count={220}
            shardSize={0.8}
            spread={1}
            twist={1.2}
            billow={0.9}
            speed={0.3}
            scale={1.05}
            depthOfField={0.65}
            glow={0.45}
            grain={0.04}
            vignette={0.62}
            intro={false}
            mouseInteraction
            mouseStrength={0.45}
            parallax={0.3}
            pulseOnClick={false}
            holdToGather={false}
            dpr={1.5}
            paused={!shown}
            onError={() => setFailed(true)}
          />
        </Suspense>
      )}
      <span className="backdrop__veil" />
    </div>
  );
}
