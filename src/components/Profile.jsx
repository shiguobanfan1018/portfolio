import { useState } from "react";
import Chapter from "./Chapter.jsx";
import SplitText from "./SplitText.jsx";
import { me, about, stats, timeline, capabilities } from "../data/site.js";
import SpecularButton from "./SpecularButton.jsx";
import "./Profile.css";

function IconPhone() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 2.5h2.2l1 2.6-1.4 1a8.5 8.5 0 0 0 4.1 4.1l1-1.4 2.6 1V12c0 .8-.7 1.5-1.5 1.5C6.9 13.5 2.5 9.1 2.5 4c0-.8.7-1.5 1.5-1.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="3.5" width="12" height="9" rx="1.6" stroke="currentColor" strokeWidth="1.3" />
      <path d="m3 5 5 3.6L13 5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function IconCopy() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M10.5 5.5V4a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 4v5A1.5 1.5 0 0 0 4 10.5h1.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}

export default function Profile() {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(me.email);
    } catch {
      /* 部分浏览器不支持剪贴板，静默忽略 */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="section section--hairline" id="profile">
      <div className="container">
        <Chapter index="01" label="About" time="00:12" />

        <div className="profile__grid">
          <figure className="portrait" data-reveal>
            {/* Q 版全身立绘：关掉图片缩放动画（data-reveal-media="off"），
                只保留容器遮罩揭幕 —— 缩放会把鞋推出卡片 */}
            <div className="portrait__media" data-reveal="img" data-reveal-media="off">
              <span className="portrait__glow" aria-hidden="true" />
              {imgError ? (
                <span className="portrait__mono">SC</span>
              ) : (
                <img
                  src="/portrait-cut.webp"
                  alt={`${me.name} 的个人照片`}
                  width="900"
                  height="1350"
                  loading="lazy"
                  decoding="async"
                  onError={() => setImgError(true)}
                />
              )}
            </div>

            <figcaption className="portrait__plate">
              <span className="portrait__name">{me.name}</span>
              <span className="portrait__en">{me.nameEn}</span>
            </figcaption>

            <div className="portrait__row">
              <span className="portrait__badge">{me.degree}</span>
              <span className="portrait__born">{me.born}</span>
            </div>
          </figure>

          <div className="profile__body">
            <h2 className="h2">
              <SplitText as="span" className="split--block" text="关于我" stagger={44} />
              <span className="split--block">
                <SplitText as="span" text="一个做" stagger={44} delay={140} />
                <SplitText
                  as="span"
                  className="split--em"
                  text="视觉的人"
                  stagger={44}
                  delay={140 + 3 * 44}
                />
              </span>
            </h2>

            <div className="profile__text" data-reveal data-reveal-delay="90">
              {about.map((p) => (
                <p key={p.slice(0, 12)}>{p}</p>
              ))}
            </div>

            <dl className="facts" data-reveal data-reveal-delay="150">
              <div className="facts__row">
                <dt>院校与专业</dt>
                <dd>
                  {me.school}
                  <br />
                  {me.major}
                </dd>
              </div>
              <div className="facts__row">
                <dt>学历与时间</dt>
                <dd>
                  {me.degree} {me.period}
                </dd>
              </div>
              <div className="facts__row">
                <dt>意向岗位</dt>
                <dd>{me.role}</dd>
              </div>
              <div className="facts__row">
                <dt>所在地</dt>
                <dd>{me.city}</dd>
              </div>
            </dl>

            <div className="connect" data-reveal data-reveal-delay="210">
              <a className="connect__item" href={`tel:${me.phone}`}>
                <IconPhone />
                <span>{me.phone}</span>
              </a>
              <a className="connect__item" href={`mailto:${me.email}`}>
                <IconMail />
                <span>{me.email}</span>
              </a>
              <SpecularButton
                className={`connect__item connect__copy${copied ? " is-copied" : ""}`}
                onClick={copyEmail}
                size="sm"
                radius={20}
                tint="#f4f1e9"
                tintOpacity={0.05}
                blur={6}
                textColor="rgba(244, 241, 233, 0.88)"
                lineColor="#ffffff"
                baseColor="#5b564f"
                intensity={0.8}
                idleIntensity={0.22}
                shineSize={9}
                shineFade={34}
                thickness={1}
                glow={0.7}
                proximity={200}
              >
                <IconCopy />
                <span>{copied ? "已复制邮箱" : "复制邮箱"}</span>
              </SpecularButton>
            </div>
          </div>
        </div>

        {/* 作品内容：一眼看到能交付什么 */}
        <div className="caps" data-reveal>
          <div className="caps__head">
            <span className="caps__label">作品内容</span>
            <span className="caps__sub">What I deliver</span>
          </div>

          <ul className="caps__list">
            {capabilities.map((c, i) => (
              <li key={c.label} className="caps__item" style={{ "--i": i }}>
                <a href={c.href}>
                  <span className="caps__num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="caps__name">{c.label}</span>
                  <span className="caps__note">{c.note}</span>
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="caps__arrow">
                    <path
                      d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="stats" data-reveal>
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <span className="stat__value">
                <span data-count={s.value}>{s.value}</span>
                <i>{s.unit}</i>
              </span>
              <span className="stat__label">{s.label}</span>
            </div>
          ))}
        </div>

        <ol className="timeline">
          {timeline.map((item, i) => (
            <li
              className="timeline__item"
              key={item.title}
              data-reveal
              data-reveal-delay={i * 70}
            >
              <span className="timeline__time">{item.time}</span>
              <div className="timeline__body">
                <h3 className="timeline__title">{item.title}</h3>
                <span className="timeline__org">{item.org}</span>
                <p className="timeline__desc">{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
