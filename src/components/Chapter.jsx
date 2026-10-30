/**
 * 章节头 —— 全站的「时间轴」母题：编号 / 横线 / 标签 / 时间码
 */
export default function Chapter({ index, label, time }) {
  return (
    <div className="chapter" data-reveal>
      <span className="chapter__idx">{index}</span>
      <span className="chapter__rule" />
      <span className="chapter__label">{label}</span>
      <span className="chapter__time">{time}</span>
    </div>
  );
}
