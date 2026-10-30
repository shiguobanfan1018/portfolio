import { useEffect, useRef, useState } from "react";
import Chapter from "./Chapter.jsx";
import SplitText from "./SplitText.jsx";
import { works, posters } from "../data/site.js";
import { asset } from "../lib/asset.js";
import SpecularButton from "./SpecularButton.jsx";
import "./Works.css";

function ArrowUpRight({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SoundOn() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <path d="M3 6v4h2.4L9 13V3L5.4 6H3Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M11.4 5.6a3.4 3.4 0 0 1 0 4.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function SoundOff() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <path d="M3 6v4h2.4L9 13V3L5.4 6H3Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="m11.2 6.4 3 3.2M14.2 6.4l-3 3.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function Play() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
      <path d="M5.2 3.4 12.4 8l-7.2 4.6V3.4Z" fill="currentColor" />
    </svg>
  );
}

/* ── 视频卡：默认静音循环，可开声音，也可点开整段成片 ── */
function VideoBlock({ media, onOpen, paused }) {
  const ref = useRef(null);
  const wasPlaying = useRef(false);
  const [muted, setMuted] = useState(true);

  /* 弹层打开时卡里的循环片停住（避免两层声音叠在一起），关掉再接着播 */
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (paused) {
      wasPlaying.current = !v.paused;
      v.pause();
    } else if (wasPlaying.current) {
      wasPlaying.current = false;
      v.play().catch(() => {});
    }
  }, [paused]);

  /* 卡片里只播一段 4 秒的循环小片（189KB），完整成片在点「播放成片」时才下 */
  const wrapRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (v && inView && !paused) v.play().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    if (!v.muted) v.play().catch(() => {});
    setMuted(v.muted);
  };

  const open = () => {
    onOpen?.();
  };

  return (
    <div
      ref={wrapRef}
      className="work__media work__media--video"
      style={{ aspectRatio: media.ratio }}
      data-reveal="img"
      data-parallax="2.2"
    >
      <video
        ref={ref}
        className="work__video"
        src={inView ? media.loopSrc || media.src : undefined}
        poster={media.poster}
        autoPlay
        muted
        loop
        playsInline
        preload={inView ? "auto" : "none"}
      />
      <div className="work__actions">
        <SpecularButton
          className="work__act work__act--play"
          onClick={open}
          type="button"
          aria-label={`播放完整版：${media.caption || "成片"}`}
          size="sm"
          radius={15}
          tint="#f4f1e9"
          tintOpacity={0.07}
          blur={8}
          textColor="rgba(246, 244, 233, 0.92)"
          lineColor="#ffffff"
          baseColor="#57524c"
          intensity={0.9}
          idleIntensity={0.3}
          shineSize={9}
          shineFade={32}
          thickness={1}
          glow={0.7}
          proximity={180}
        >
          <Play />
          <span>{media.openLabel || "播放成片"}</span>
        </SpecularButton>
        <SpecularButton
          className="work__act work__sound"
          onClick={toggle}
          type="button"
          aria-label={muted ? "打开声音" : "关闭声音"}
          size="sm"
          radius={15}
          tint="#f4f1e9"
          tintOpacity={0.07}
          blur={8}
          textColor="rgba(246, 244, 233, 0.92)"
          lineColor="#ffffff"
          baseColor="#57524c"
          intensity={0.9}
          idleIntensity={0.26}
          shineSize={9}
          shineFade={32}
          thickness={1}
          glow={0.7}
          proximity={180}
        >
          {muted ? <SoundOff /> : <SoundOn />}
          <span>{muted ? "静音" : "声音"}</span>
        </SpecularButton>
      </div>
      <span className="work__cap">{media.caption}</span>
    </div>
  );
}

/* ── 图片卡：长图悬停上下浏览，点击铺开整张 ── */
function ImageBlock({ media, onZoom }) {
  if (media.pan) {
    return (
      <div
        className="work__media work__media--pan"
        data-reveal="img"
        data-reveal-media="off"
        role="button"
        tabIndex={0}
        aria-label="查看完整长图"
        onClick={onZoom}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onZoom();
          }
        }}
      >
        <div className="work__pan">
          <img src={media.src} alt={media.caption || ""} loading="lazy" decoding="async" />
        </div>
        <span className="work__cap">{media.caption}</span>
        <span className="work__zoom" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="4.6" stroke="currentColor" strokeWidth="1.4" />
            <path d="M10.6 10.6 14 14M7 5.2v3.6M5.2 7h3.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          看全图
        </span>
      </div>
    );
  }
  return (
    <div
      className="work__media"
      style={{ aspectRatio: media.ratio }}
      data-reveal="img"
      data-parallax="2.6"
    >
      <img
        className="work__shot"
        src={media.src}
        alt={media.caption || ""}
        loading="lazy"
        decoding="async"
        style={{ objectPosition: media.position || "center" }}
      />
      <span className="work__scrim" />
      <span className="work__cap">{media.caption}</span>
    </div>
  );
}

/* ── 数据卡：没有可公开的画面时，用真实数据撑住版面 ── */
function DataBlock({ work }) {
  return (
    <div className="work__media work__media--data" style={{ aspectRatio: work.media.ratio }}>
      <div className="data-panel">
        <div className="data-panel__head">
          <span>Evaluation Report</span>
          <span className="data-panel__live">
            <b />
            Tlabel
          </span>
        </div>

        <div className="data-panel__facts">
          {work.facts.map((f) => (
            <div className="data-fact" key={f.label}>
              <span className="data-fact__value">
                {f.value}
                <i>{f.unit}</i>
              </span>
              <span className="data-fact__label">{f.label}</span>
            </div>
          ))}
        </div>

        <span className="data-panel__label">五维评测口径 5 Dimensions</span>

        <ul className="data-panel__dims">
          {work.dimensions.map((d, i) => (
            <li key={d}>
              <span className="data-dim__bar" style={{ width: `${100 - i * 9}%` }} />
              <span className="data-dim__name">{d}</span>
            </li>
          ))}
        </ul>

        <div className="data-panel__foot">
          <span>SOP 红线 → 落档 → 归因 → 理由 → 剔除</span>
          <span>2026.09 — 2026.10</span>
        </div>
      </div>
    </div>
  );
}

/* ── 查看器：图片整张铺开滚轮看；视频铺满带控件播放。Esc / 点背景关闭 ── */
function Viewer({ item, onClose }) {
  const videoRef = useRef(null);
  const isVideo = item.type === "video";
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      /* 关掉弹层就彻底停，不留后台声音 */
      const v = videoRef.current;
      if (v) {
        v.pause();
        v.removeAttribute("src");
        v.load();
      }
    };
  }, [onClose]);

  /* 浏览器可能拦掉有声自动播放：先试有声，被拒就静音接着播，实在不行把控件留给用户 */
  useEffect(() => {
    if (!isVideo) return;
    const v = videoRef.current;
    if (!v) return;
    const p = v.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => {
        v.muted = true;
        const retry = v.play();
        if (retry && typeof retry.catch === "function") retry.catch(() => setBlocked(true));
      });
    }
  }, [isVideo, item.src]);

  return (
    <div
      className="viewer"
      role="dialog"
      aria-modal="true"
      aria-label={item.label}
      onClick={onClose}
    >
      <div className="viewer__bar" onClick={(e) => e.stopPropagation()}>
        <span className="viewer__label">{item.label}</span>
        <span className="viewer__hint">
          {isVideo
            ? blocked
              ? "点播放键开始　Esc 关闭"
              : "播放中　点击背景或 Esc 关闭"
            : item.poster
              ? "点击背景或 Esc 关闭"
              : "滚轮上下浏览　Esc 关闭"}
        </span>
        <SpecularButton
          className="viewer__close"
          type="button"
          onClick={onClose}
          size="sm"
          radius={16}
          tint="#f4f1e9"
          tintOpacity={0.06}
          blur={8}
          textColor="rgba(244, 241, 233, 0.9)"
          lineColor="#ffffff"
          baseColor="#57524c"
          intensity={0.9}
          idleIntensity={0.24}
          shineSize={9}
          shineFade={34}
          thickness={1}
          glow={0.75}
          proximity={200}
        >
          关闭
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
            <path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </SpecularButton>
      </div>

      <figure
        className={`viewer__box${isVideo ? " viewer__box--video" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {isVideo ? (
          <video
            ref={videoRef}
            className="viewer__video"
            src={item.src}
            poster={item.poster}
            controls
            autoPlay
            playsInline
            preload="auto"
          />
        ) : (
          <img
            src={item.src}
            alt={item.label}
            className={item.poster ? "viewer__img viewer__img--poster" : "viewer__img"}
          />
        )}
        <figcaption className="viewer__cap">{item.note}</figcaption>
      </figure>
    </div>
  );
}

/* ── 海报位：点开铺满屏幕看原尺寸；没有文件时显示空位 ── */
function PosterSlot({ poster, onZoom }) {
  const [failed, setFailed] = useState(false);

  return (
    <figure
      className={`poster${failed ? " poster--empty" : ""}`}
      role={failed ? undefined : "button"}
      tabIndex={failed ? undefined : 0}
      aria-label={failed ? undefined : `放大查看 ${poster.title}`}
      onClick={failed ? undefined : onZoom}
      onKeyDown={(e) => {
        if (failed) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onZoom();
        }
      }}
    >
      {!failed ? (
        <>
          <img
            src={poster.image}
            alt={poster.title}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
          />
          <span className="poster__zoom" aria-hidden="true">
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="4.6" stroke="currentColor" strokeWidth="1.4" />
              <path d="M10.6 10.6 14 14M7 5.2v3.6M5.2 7h3.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            放大
          </span>
        </>
      ) : (
        <div className="poster__slot">
          <span className="poster__plus" aria-hidden="true">
            +
          </span>
          <span className="poster__slot-idx">{poster.index}</span>
          <span className="poster__slot-tag">待补充</span>
          <span className="poster__slot-hint">把海报放进 public/posters/ 即自动显示</span>
        </div>
      )}
      <figcaption className="poster__cap">
        <span>{poster.index}　{poster.title}</span>
        <i>{poster.note}</i>
      </figcaption>
    </figure>
  );
}

export default function Works() {
  const [viewer, setViewer] = useState(null);

  return (
    <>
      <section className="section section--hairline" id="works">
        <div className="container">
          <Chapter index="02" label="Selected Works" time="00:48" />

          <div className="works__head">
            <h2 className="h2">
              <SplitText as="span" className="split--block" text="四件作品" stagger={44} />
              <SplitText
                as="span"
                className="split--block split--em"
                text="四个真实交付"
                stagger={44}
                delay={150}
              />
            </h2>
            <p className="works__note" data-reveal data-reveal-delay="90">
              动画、品牌、文创、AI 评测——四件完全不同的事，各自对应一项能立刻上手的工作能力。
              每张卡片都标了我在里面的真实角色、工具和最后拿到的结果。
            </p>
          </div>

          <div className="works__list">
            {works.map((w, i) => (
              <article
                className={`work work--${w.accent}`}
                id={`work-${w.id}`}
                key={w.id}
                data-reveal
                data-reveal-delay={i * 60}
              >
                <div className="work__media-col">
                  {w.media.type === "video" && (
                    <VideoBlock
                      media={w.media}
                      paused={!!viewer}
                      onOpen={() =>
                        setViewer({
                          type: "video",
                          src: w.media.src,
                          poster: w.media.poster,
                          label: w.title,
                          note: w.media.caption,
                        })
                      }
                    />
                  )}
                  {w.media.type === "image" && (
                    <ImageBlock
                      media={w.media}
                      onZoom={() =>
                        setViewer({
                          src: w.media.src,
                          label: w.title,
                          note: w.media.caption,
                        })
                      }
                    />
                  )}
                  {w.media.type === "data" && <DataBlock work={w} />}

                  {w.gallery && (
                    <div className="work__gallery">
                      {w.gallery.map((g, gi) => (
                        <figure
                          className="work__thumb"
                          key={g.src}
                          data-reveal="img"
                          data-reveal-delay={gi * 110}
                        >
                          <img src={g.src} alt={g.label} loading="lazy" decoding="async" />
                          <figcaption>{g.label}</figcaption>
                        </figure>
                      ))}
                    </div>
                  )}

                  {/* 原件入口：手册 PDF / 源文件，放在整组图下方 */}
                  {w.links && (
                    <div className="work__files">
                      {w.links.map((l) => (
                        <a
                          className="file-link"
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span className="file-link__tag">PDF</span>
                          <span className="file-link__text">
                            <strong>{l.label}</strong>
                            <i>{l.meta}</i>
                          </span>
                          <ArrowUpRight size={13} />
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <div className="work__info">
                  <div className="work__idx-row">
                    <span className="work__index">{w.index}</span>
                    <span className="work__metric">{w.metric}</span>
                  </div>

                  <h3 className="work__title">
                    <SplitText text={w.title} stagger={24} />
                  </h3>
                  <p className="work__sub">{w.subtitle}</p>
                  <p className="work__desc">{w.desc}</p>

                  <ul className="work__hl">
                    {w.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>

                  <dl className="work__meta">
                    <div>
                      <dt>时间</dt>
                      <dd>{w.year}</dd>
                    </div>
                    <div>
                      <dt>角色</dt>
                      <dd>{w.role}</dd>
                    </div>
                    <div>
                      <dt>工具</dt>
                      <dd>{w.tools}</dd>
                    </div>
                    <div>
                      <dt>类别</dt>
                      <dd>{w.category}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
          </div>

          {/* 海报墙：四张竖版海报 */}
          <div className="posters" data-reveal>
            <div className="posters__head">
              <h3 className="posters__title">海报与平面</h3>
              <p className="posters__note">
                四张竖版海报 四种字体处理
                <span> 透视网格 路径绕排 混合轴 扁平插画 练的是用版式和字体把一句话钉进画面</span>
              </p>
            </div>

            <div className="posters__grid" data-stagger-group=".poster">
              {posters.map((p) => (
                <PosterSlot
                  poster={p}
                  key={p.id}
                  onZoom={() =>
                    setViewer({
                      src: p.image,
                      label: `${p.index}　${p.title}`,
                      note: p.note,
                      poster: true,
                    })
                  }
                />
              ))}
            </div>
          </div>

          <div className="works__more" data-reveal>
            <span className="works__more-label">另附</span>
            <p>
              2024.12 静态校园官网网页实训（HTML / HBuilder X，独立完成架构规划与多页面搭建）；
              以及若干课堂版式与微场景练习，可按需补进作品集。
            </p>
            <a className="works__more-link" href={asset("/resume.pdf")} target="_blank" rel="noreferrer">
              完整简历 PDF <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </section>

      {viewer && <Viewer item={viewer} onClose={() => setViewer(null)} />}
    </>
  );
}
