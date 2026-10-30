import SplitText from "./SplitText.jsx";
import { me } from "../data/site.js";
import { asset } from "../lib/asset.js";
import "./Contact.css";

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact__glow" aria-hidden="true" />

      <div className="container contact__inner">
        <div className="chapter contact__chapter" data-reveal>
          <span className="chapter__idx">04</span>
          <span className="chapter__rule" />
          <span className="chapter__label">Contact</span>
          <span className="chapter__time">01:48</span>
        </div>

        <div className="contact__body">
          <h2 className="contact__title">
            <SplitText
              as="span"
              className="split--block"
              text="以视觉传递想法"
              stagger={52}
            />
            <span className="contact__line">
              <SplitText as="span" text="用设计" stagger={52} delay={220} />
              <SplitText
                as="span"
                className="contact__serif"
                text="创造价值"
                stagger={52}
                delay={400}
              />
            </span>
          </h2>

          <p className="contact__thanks" data-reveal data-reveal-delay="80">
            谢谢各位的观看
          </p>

          <div className="contact__actions" data-reveal data-reveal-delay="140">
            <a className="contact-card" href={`tel:${me.phone}`}>
              <span className="contact-card__label">Phone</span>
              <strong className="contact-card__value">{me.phone}</strong>
              <span className="contact-card__hint">点击拨打</span>
            </a>

            <a className="contact-card" href={`mailto:${me.email}`}>
              <span className="contact-card__label">Email</span>
              <strong className="contact-card__value">{me.email}</strong>
              <span className="contact-card__hint">点击发送邮件</span>
            </a>
          </div>

          <ul className="contact__meta" data-reveal data-reveal-delay="200">
            <li>品牌视觉 VIS 规范</li>
            <li>版式海报 文创设计</li>
            <li>二维动画 短视频剪辑</li>
          </ul>
        </div>
      </div>

      <footer className="contact__foot">
        <div className="container contact__foot-inner">
          <span className="contact__copy">© 2026 {me.name}　个人作品集</span>
          <div className="contact__foot-links">
            {/* 把简历放到 public/resume.pdf，这个链接就能直接下载 */}
            <a href={asset("/resume.pdf")} download>
              下载简历 PDF
            </a>
            <a href="#home">回到顶部 ↑</a>
          </div>
        </div>
      </footer>
    </section>
  );
}
