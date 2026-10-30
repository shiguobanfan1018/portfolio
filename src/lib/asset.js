/**
 * asset.js —— 把 public/ 里的资源路径转成「构建基址感知」的地址
 *
 * 站点可能部署在子路径下（GitHub Pages 的 /<仓库名>/），
 * 代码里若写死 "/hero-bg.mp4"，请求会打到域名根目录而不是仓库目录，导致 404。
 * 统一走这里：asset("/hero-bg.mp4") → import.meta.env.BASE_URL + "hero-bg.mp4"
 */
const BASE = import.meta.env.BASE_URL || "/";

export const asset = (path) =>
  `${BASE}${String(path || "").replace(/^\/+/, "")}`;
