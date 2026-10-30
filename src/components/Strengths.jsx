import Chapter from "./Chapter.jsx";
import SplitText from "./SplitText.jsx";
import { strengths } from "../data/site.js";
import "./Strengths.css";

export default function Strengths() {
  return (
    <section className="section section--hairline" id="strengths">
      <div className="container">
        <Chapter index="03" label="Strengths" time="01:12" />

        <div className="st__head">
          <h2 className="h2">
            <SplitText as="span" className="split--block" text="个人能力" stagger={44} />
            <SplitText
              as="span"
              className="split--block split--em"
              text="是练出来的"
              stagger={44}
              delay={150}
            />
          </h2>
          <p className="st__note" data-reveal data-reveal-delay="90">
            没有什么天生的手感。能拿出来的都是磨出来的：一张长图改到第七版，一秒钟的镜头调几十帧，评测口径从 70% 对齐到 95%。下面六条，每一条背后都有这样的过程。
          </p>
        </div>

        <div className="st__grid">
          {strengths.map((s, i) => (
            <article
              className="st-card"
              key={s.index}
              data-reveal
              data-reveal-delay={i * 60}
            >
              <span className="st-card__index">{s.index}</span>
              <h3 className="st-card__title">
                <SplitText text={s.title} stagger={22} />
              </h3>
              <p className="st-card__desc">{s.desc}</p>
              <ul className="st-card__tags">
                {s.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
