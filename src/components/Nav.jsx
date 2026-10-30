import { useEffect, useState } from "react";
import { navItems } from "../data/site.js";
import SpecularButton from "./SpecularButton.jsx";
import "./Nav.css";

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`nav${solid ? " is-solid" : ""}${open ? " is-open" : ""}`}>
      <div className="container nav__inner">
        <a className="brand" href="#home" onClick={() => setOpen(false)}>
          <span className="brand__mark">SC</span>
          <span className="brand__word">
            <span className="brand__cn">石超</span>
            <sup className="brand__sup">®</sup>
          </span>
        </a>

        <nav className="nav__links">
          {navItems.map((item) => (
            <a className="nav__link" href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <SpecularButton
            className="nav__cta"
            href="#contact"
            size="sm"
            radius={19}
            tint="#f4f1e9"
            tintOpacity={0.13}
            blur={8}
            textColor="#f4f1e9"
            lineColor="#ffffff"
            baseColor="#6b6358"
            intensity={1}
            idleIntensity={0.4}
            shineSize={12}
            shineFade={40}
            thickness={1.2}
            glow={0.9}
            proximity={240}
          >
            联系我
          </SpecularButton>
          <button
            className="nav__burger"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "关闭菜单" : "打开菜单"}
            aria-expanded={open}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`nav__sheet${open ? " is-open" : ""}`}>
        {navItems.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            className="nav__sheet-link"
            style={{ transitionDelay: `${80 + i * 60}ms` }}
            onClick={() => setOpen(false)}
          >
            <i>{item.index}</i>
            {item.label}
          </a>
        ))}
        <div className="nav__sheet-foot">
          <a href="#contact" onClick={() => setOpen(false)}>
            2047459610@qq.com
          </a>
          <span>19031436153</span>
        </div>
      </div>
    </header>
  );
}
