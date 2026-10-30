import { useEffect, useLayoutEffect } from "react";
import Nav from "./components/Nav.jsx";
import BelowBackdrop from "./components/BelowBackdrop.jsx";
import Hero from "./components/Hero.jsx";
import Profile from "./components/Profile.jsx";
import Works from "./components/Works.jsx";
import Strengths from "./components/Strengths.jsx";
import Contact from "./components/Contact.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import { initMotion } from "./lib/motion.js";

export default function App() {
  /* 动效在绘制前就把初始态压好，避免进场前闪一帧 */
  useLayoutEffect(() => initMotion(), []);

  /* 带 #hash 打开链接时（比如简历里直接写 /#works），等页面挂载后再定位 */
  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    const raf = requestAnimationFrame(() =>
      el.scrollIntoView({ behavior: "auto", block: "start" })
    );
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <BelowBackdrop />
        <Hero />
        <Profile />
        <Works />
        <Strengths />
        <Contact />
      </main>
    </>
  );
}
