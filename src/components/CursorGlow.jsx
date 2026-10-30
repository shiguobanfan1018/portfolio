import { useEffect, useState } from "react";
import GlowCursor from "./GlowCursor.jsx";
import "./GlowCursor.css";
import "./CursorGlow.css";

/**
 * 首屏光标光带（只挂在 Hero 里）
 * —— 铺满首屏的一层 canvas，鼠标划过时留下香槟色的流体拖尾，慢慢冷却淡去。
 * 出了首屏这一块就不再接收指针，滚走时 IntersectionObserver 会停掉 rAF。
 * 只有精确指针（鼠标 / 触控板）才加载；触屏设备直接跳过，不白跑 GPU。
 */
export default function CursorGlow() {
  const [fine, setFine] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setFine(mq.matches);
    const onChange = (e) => setFine(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* 等首屏那束纤维先初始化完，再编译这边十几个着色器，免得抢主线程 */
  useEffect(() => {
    if (!fine) return undefined;
    const start = () => setReady(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 1200 });
      return () => window.cancelIdleCallback?.(id);
    }
    const timer = window.setTimeout(start, 700);
    return () => clearTimeout(timer);
  }, [fine]);

  if (!fine || !ready) return null;

  return (
    <div className="cursor-glow" aria-hidden="true">
      <GlowCursor
        color="#e3c69a"
        secondaryColor="#4a3d29"
        intensity={0.95}
        trailWidth={2.2}
        linger={1}
        glow={0.8}
        hotspot={0.3}
        followSpeed={0.55}
        grain={0.05}
        clickBurst
        quality="high"
        theme="dark"
        maxDevicePixelRatio={1.5}
      />
    </div>
  );
}
