import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/fonts.css";
import "./styles/base.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/* 全站字集（≈630KB）挪到首屏之后再下：等 load 完 + 浏览器空闲，
   或者最多 3 秒兜底。首屏那 120KB 的字集已经够渲染，这一段不抢关键路径。 */
const loadRestFonts = () => {
  import("./styles/fonts-rest.css").catch(() => {});
};

if (document.readyState === "complete") {
  const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 300));
  idle(loadRestFonts, { timeout: 2000 });
} else {
  window.addEventListener(
    "load",
    () => {
      const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 300));
      idle(loadRestFonts, { timeout: 2000 });
    },
    { once: true }
  );
  setTimeout(loadRestFonts, 3000);
}
