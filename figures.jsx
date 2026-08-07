/* =========================================================
   figures.jsx — 课程导读里的讲义插图
   ---------------------------------------------------------
   每门课的 body(导读正文)里,单独一行写:

       @fig c101-svd

   pages.jsx 的 <CourseProse> 会把这一行换成真正的 React 节点
   <Figure name="c101-svd" />,而不是让 marked 当普通文本吞掉。

   所有插图都是不依赖任何库的 SVG,颜色只用设计令牌
   (--ink / --accent / --primary / --muted …),因此浅色深色
   主题、以及 Tweaks 面板改强调色时都会自动跟随。

   加载顺序:data.jsx → figures.jsx → pages.jsx。
   ========================================================= */

const FIGN = {};                        // 图 key -> 组件
const FMK = React.createContext("");    // 每张图独立的箭头 marker id 后缀

/* ---------------- 画布 ---------------- */
// 画布宽度固定 660,高度在布局后按内容实际需要增长(中文换行数不固定)。
function FigFrame({ h = 240, cap, idx, children }) {
  const W = 660;
  const gRef = React.useRef(null);
  const [vh, setVh] = React.useState(h);
  React.useLayoutEffect(() => {
    const g = gRef.current;
    if (!g || !g.getBBox) return;
    try {
      const bb = g.getBBox();
      setVh(Math.max(h, Math.ceil(bb.y + bb.height + 12)));
    } catch (e) { /* 尚未布局 */ }
  });
  React.useEffect(() => { setVh(h); }, [h]);
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <figure className="cfig">
      <svg className="cfig-svg" viewBox={`0 0 ${W} ${vh}`} width="100%"
        preserveAspectRatio="xMidYMid meet" role="img">
        <defs>
          {[["am", "var(--muted)"], ["aa", "var(--accent)"], ["ap", "var(--primary)"]].map(([k, c]) => (
            <marker key={k} id={`${k}${uid}`} viewBox="0 0 10 10" refX="9.2" refY="5"
              markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 Z" fill={c} />
            </marker>
          ))}
        </defs>
        <g ref={gRef}><FMK.Provider value={uid}>{children}</FMK.Provider></g>
      </svg>
      {cap ? (
        <figcaption>
          {idx ? <span className="fno">图 {idx}</span> : null}
          {cap}
        </figcaption>
      ) : null}
    </figure>
  );
}

/* ---------------- 文字换行 ---------------- */
// 每个字形的推进宽度 [西文, 中日韩],按渲染字体量过并留约 5% 余量。
// 中文字形约为西文的两倍宽,所以两种字符必须分开计。
const FW = { tn: [6.3, 10.5], tm: [6.9, 12.2], tk: [6.9, 13.1], ta: [6.9, 13.1], tp: [6.9, 13.1], t: [6.2, 12.7], ts: [5.6, 11.7], tt: [6.8, 13.8] };
const fwide = (ch) => /[⺀-鿿　-〿！-｠]/.test(ch);
function fwrap(s, maxW, c) {
  const [aw, cw] = FW[c] || FW.tn;
  const wOf = (t) => Array.from(t).reduce((a, ch) => a + (fwide(ch) ? cw : aw), 0);
  const toks = [];
  let buf = "";
  for (const ch of s) {
    if (fwide(ch)) { if (buf) toks.push(buf); toks.push(ch); buf = ""; }
    else if (ch === " ") { toks.push(buf + ch); buf = ""; }
    else buf += ch;
  }
  if (buf) toks.push(buf);
  const lines = [];
  let cur = "", curW = 0;
  for (const t of toks) {
    const tw = wOf(t);
    if (curW + tw > maxW && cur.trim()) { lines.push(cur.replace(/\s+$/, "")); cur = ""; curW = 0; }
    cur += t; curW += tw;
  }
  if (cur.trim()) lines.push(cur.replace(/\s+$/, ""));
  return lines;
}

/* ---------------- 基本图元 ---------------- */
// 文字。c = 样式类(t 正文 / ts 小 / tn 注 / tm 等宽 / tk 强调 / ta 橙 / tp 主色 / tt 标题)
// 传 w 就按该宽度折行,每行 14px。
const FT = ({ x, y, c = "t", a = "start", w, children, ...r }) => {
  const flat = Array.isArray(children)
    ? (children.every((k) => typeof k === "string" || typeof k === "number") ? children.join("") : null)
    : (typeof children === "string" ? children : null);
  if (w && flat) {
    const lines = fwrap(flat, w, c);
    if (lines.length > 1) {
      return (
        <text x={x} y={y} textAnchor={a} className={c} {...r}>
          {lines.map((ln, i) => <tspan key={i} x={x} dy={i ? 14 : 0}>{ln}</tspan>)}
        </text>
      );
    }
  }
  return <text x={x} y={y} textAnchor={a} className={c} {...r}>{children}</text>;
};

// 带标签的方框。k = 色调("" | p 主色 | a 强调 | m 灰 | g 虚线)
const FB = ({ x, y, w, h, k = "", t, s, tc = "t", r = 3 }) => {
  const cx = x + w / 2;
  const tl = typeof t === "string" ? fwrap(t, w - 12, tc) : (t !== undefined ? [t] : []);
  const sl = typeof s === "string" ? fwrap(s, w - 12, "tn") : (s !== undefined ? [s] : []);
  const total = tl.length * 14 + sl.length * 13;
  let cy = y + h / 2 - total / 2 + 11;
  const rows = [];
  tl.forEach((ln, i) => { rows.push({ y: cy + i * 14, t: ln, c: tc }); });
  cy += tl.length * 14;
  sl.forEach((ln, i) => { rows.push({ y: cy + i * 13 - 1, t: ln, c: "tn" }); });
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={r} className={`bx ${k}`} />
      {rows.map((row, i) => (
        <text key={i} x={cx} y={row.y} textAnchor="middle" className={row.c}>{row.t}</text>
      ))}
    </g>
  );
};

// 直箭头 / 任意路径箭头
const FA = ({ x1, y1, x2, y2, k = "", d }) => {
  const uid = React.useContext(FMK);
  const mk = k === "a" ? "aa" : k === "p" ? "ap" : "am";
  return <line x1={x1} y1={y1} x2={x2} y2={y2} className={`ln ${k} ${d ? "d" : ""}`}
    markerEnd={`url(#${mk}${uid})`} />;
};
const FAP = ({ d, k = "", dash }) => {
  const uid = React.useContext(FMK);
  const mk = k === "a" ? "aa" : k === "p" ? "ap" : "am";
  return <path d={d} className={`ln ${k} ${dash ? "d" : ""}`} markerEnd={`url(#${mk}${uid})`} />;
};

// 共享一条基线的柱子
const FBars = ({ x, base, bw, gap, vals, hmax, k = "fp", labels, op }) => (
  <g>
    {vals.map((v, i) => {
      const bh = Math.max(1, v * hmax);
      const bx = x + i * (bw + gap);
      return (
        <g key={i}>
          <rect x={bx} y={base - bh} width={bw} height={bh} className={k}
            fillOpacity={op ? op(v, i) : 1} />
          {labels && <text x={bx + bw / 2} y={base + 13} textAnchor="middle" className="tn">{labels[i]}</text>}
        </g>
      );
    })}
  </g>
);

// 采样函数 -> polyline 点串
const fpath = (n, fx, fy) => Array.from({ length: n }, (_, i) => `${fx(i)},${fy(i)}`).join(" ");
// 坐标轴 + 网格线的常用组合
const FAxis = ({ x0, x1, y0, y1, ticks = [], fmt = (v) => v, yf }) => (
  <g>
    {ticks.map((v, i) => (
      <g key={i}>
        <line x1={x0} x2={x1} y1={yf(v)} y2={yf(v)} className="grid" />
        <text x={x0 - 8} y={yf(v) + 4} textAnchor="end" className="tn">{fmt(v)}</text>
      </g>
    ))}
    <line x1={x0} x2={x1} y1={y1} y2={y1} className="axis" />
  </g>
);

window.FIGN = FIGN;
window.FigFrame = FigFrame;
window.FT = FT;
window.FB = FB;
window.FA = FA;
window.FAP = FAP;
window.FBars = FBars;
window.FAxis = FAxis;
window.fpath = fpath;
window.fwrap = fwrap;

/* =========================================================
   <Figure> —— 由 pages.jsx 在遇到 @fig 标记时渲染
   ========================================================= */
function Figure({ name, idx }) {
  const C = FIGN[name];
  if (!C) {
    if (typeof console !== "undefined") console.warn(`[figures] 未知插图: ${name}`);
    return null;
  }
  return <C idx={idx} />;
}
window.Figure = Figure;

/* =========================================================
   M01 · 数理基础
   ========================================================= */

/* c101 线性代数 —— SVD 把任意矩阵拆成 旋转-拉伸-旋转 */
FIGN["c101-svd"] = ({ idx }) => {
  const sv = [1.0, 0.62, 0.34, 0.19, 0.11, 0.06, 0.035, 0.02, 0.012, 0.007];
  return (
    <FigFrame h={244} idx={idx}
      cap="任意矩阵 A 都能写成 UΣVᵀ:先旋转、再沿坐标轴拉伸、最后再旋转一次。奇异值衰减得越快,前 k 项就越能代表整个矩阵——PCA、图像压缩、推荐系统的低秩近似,用的都是同一件事。">
      <FT x={16} y={24} c="tt">A = U Σ Vᵀ:一次线性变换的三个动作</FT>

      <FB x={16} y={46} w={104} h={38} k="m" t="单位圆" s="原始空间" tc="t" />
      <FA x1={122} y1={65} x2={150} y2={65} />
      <FB x={152} y={46} w={104} h={38} t="Vᵀ · 旋转" s="换一组基" tc="t" />
      <FA x1={258} y1={65} x2={286} y2={65} />
      <FB x={288} y={46} w={104} h={38} k="a" t="Σ · 拉伸" s="沿轴缩放 σᵢ" tc="t" />
      <FA x1={394} y1={65} x2={422} y2={65} />
      <FB x={424} y={46} w={104} h={38} t="U · 旋转" s="转到目标空间" tc="t" />
      <FA x1={530} y1={65} x2={558} y2={65} k="p" />
      <FB x={560} y={46} w={84} h={38} k="p" t="椭圆" tc="t" />

      <circle cx={68} cy={128} r="26" className="ln" fill="none" />
      <line x1={68} y1={102} x2={68} y2={154} className="ln f" />
      <line x1={42} y1={128} x2={94} y2={128} className="ln f" />
      <FT x={68} y={172} c="tn" a="middle">半径都是 1</FT>

      <ellipse cx={340} cy={128} rx="44" ry="17" className="ln a" fill="none" />
      <line x1={296} y1={128} x2={384} y2={128} className="ln f" />
      <line x1={340} y1={111} x2={340} y2={145} className="ln f" />
      <FT x={392} y={124} c="ta">σ₁ 长轴</FT>
      <FT x={392} y={140} c="ta">σ₂ 短轴</FT>
      <FT x={340} y={172} c="tn" a="middle">奇异值就是拉伸倍数</FT>

      <FT x={430} y={104} c="t">奇异值衰减</FT>
      <FBars x={430} base={160} bw={16} gap={5} vals={sv} hmax={52} k="fp" op={(v) => 0.3 + v * 0.7} />
      <line x1={430} y1={160} x2={640} y2={160} className="axis" />
      <FT x={430} y={174} c="tn">σ₁</FT>
      <FT x={640} y={174} c="tn" a="end">σ₁₀</FT>
      <FT x={430} y={192} c="tn" w={214}>前 3 个奇异值已经占了能量的九成 —— 这就是低秩近似能压缩的原因。</FT>

      <FT x={16} y={196} c="tn" w={400}>把矩阵只当「数字表格」,算法就像魔法;把它看成空间里的线性变换,SVD、PCA、低秩压缩立刻变成同一个直觉。</FT>
    </FigFrame>
  );
};

/* c101 —— 四个基本子空间 */
FIGN["c101-subspaces"] = ({ idx }) => (
  <FigFrame h={238} idx={idx}
    cap="一个 m×n 矩阵把 ℝⁿ 切成两半、把 ℝᵐ 也切成两半。行空间里的向量被送进列空间,零空间里的向量被压成 0。「这个矩阵能把空间映到哪里、又把什么压扁」——问题的答案全在这张图里。">
    <FT x={16} y={24} c="tt">A : ℝⁿ → ℝᵐ 的四个基本子空间</FT>

    <rect x={16} y={44} width={280} height={168} rx={4} className="bx g" />
    <FT x={26} y={62} c="tm">定义域 ℝⁿ</FT>
    <FB x={32} y={72} w={248} h={54} k="p" t="行空间 row(A)" s="维数 = r,被真正「用上」的那部分输入" tc="t" />
    <FB x={32} y={140} w={248} h={54} k="m" t="零空间 null(A)" s="维数 = n − r,被压成 0 的方向" tc="t" />

    <rect x={364} y={44} width={280} height={168} rx={4} className="bx g" />
    <FT x={374} y={62} c="tm">值域 ℝᵐ</FT>
    <FB x={380} y={72} w={248} h={54} k="a" t="列空间 col(A)" s="维数 = r,Ax 只能落在这里" tc="t" />
    <FB x={380} y={140} w={248} h={54} k="m" t="左零空间 null(Aᵀ)" s="维数 = m − r,永远够不到的地方" tc="t" />

    <FA x1={288} y1={99} x2={372} y2={99} k="p" />
    <FT x={330} y={92} c="tp" a="middle">一一对应</FT>
    <FAP d="M288 167 L 320 167 L 320 118 L 372 118" k="" dash />
    <FT x={330} y={182} c="tn" a="middle">全部映到 0</FT>

    <FT x={16} y={230} c="tn" w={628}>秩 r 是唯一的自由参数:它同时决定了「保留多少信息」和「丢掉多少维度」。奇异值里非零的个数,就是 r。</FT>
  </FigFrame>
);

/* c102 —— 链式法则就是反向传播 */
FIGN["c102-chain"] = ({ idx }) => (
  <FigFrame h={236} idx={idx}
    cap="前向算值、反向算导,BP 算法本质上就是一次组织得很好的链式求导。每个节点只需要知道两件事:自己的局部导数,以及上游传下来的梯度——把两者相乘再往下传,就是全部。">
    <FT x={16} y={24} c="tt">前向 → 求值,反向 ← 求导</FT>

    {[["x", 16], ["w·x", 148], ["σ(·)", 280], ["L(ŷ,y)", 412]].map(([t, x], i) => (
      <g key={i}>
        <FB x={x} y={54} w={112} h={40} k={i === 3 ? "a" : "p"} t={t} tc="tk" />
        {i < 3 && <FA x1={x + 114} y1={74} x2={x + 146} y2={74} k="p" />}
      </g>
    ))}
    <FB x={544} y={54} w={100} h={40} k="a" t="标量 L" tc="tk" />
    <FA x1={526} y1={74} x2={542} y2={74} k="a" />
    <FT x={16} y={44} c="tp">前向传播:一路算到损失</FT>

    <FT x={16} y={124} c="ta">反向传播:一路乘回来</FT>
    {[["∂L/∂x", 16], ["∂L/∂w", 148], ["∂L/∂z", 280], ["∂L/∂ŷ", 412]].map(([t, x], i) => (
      <g key={i}>
        <FB x={x} y={134} w={112} h={40} t={t} tc="tk" />
        {i < 3 && <FA x1={x + 146} y1={154} x2={x + 114} y2={154} k="a" />}
      </g>
    ))}
    <FB x={544} y={134} w={100} h={40} k="a" t="1" tc="tk" />
    <FA x1={542} y1={154} x2={526} y2={154} k="a" />

    <FT x={16} y={202} c="t">每个节点做的事:</FT>
    <FT x={130} y={202} c="tk">上游梯度 × 本地导数 → 传给下游</FT>
    <FT x={16} y={226} c="tn" w={628}>这就是为什么深度网络能自动求导:没有任何一个节点需要知道整张图长什么样,它只需要认识自己的邻居。</FT>
  </FigFrame>
);

/* c102 —— 三个优化器在同一张等高线上的轨迹 */
FIGN["c102-optim"] = ({ idx }) => {
  const CX = 250, CY = 120;
  const track = (n, f) => Array.from({ length: n }, (_, i) => f(i)).map(p => p.join(",")).join(" ");
  const sgd = track(26, (i) => [70 + i * 7.2, CY + 46 * Math.sin(i * 0.9) * Math.exp(-i / 11)]);
  const mom = track(22, (i) => [70 + i * 8.6, CY + 30 * Math.sin(i * 0.55) * Math.exp(-i / 8)]);
  const adam = track(18, (i) => [70 + i * 10.4, CY + 14 * Math.sin(i * 0.4) * Math.exp(-i / 6)]);
  return (
    <FigFrame h={238} idx={idx}
      cap="同一个损失面,三种走法。SGD 在陡峭方向来回震荡;动量把历史速度累积起来,穿过峡谷;Adam 给每个参数一个自适应步长,在稀疏梯度上尤其占便宜。别停在「Adam 比 SGD 好」,要问它到底改了什么。">
      <FT x={16} y={24} c="tt">优化器不是黑盒,是不同的走法</FT>
      {[1, 0.72, 0.48, 0.28, 0.13].map((r, i) => (
        <ellipse key={i} cx={CX} cy={CY} rx={200 * r} ry={62 * r} className="grid" fill="none" />
      ))}
      <circle cx={CX + 200} cy={CY} r="4" className="fp" />
      <FT x={CX + 210} y={CY + 4} c="tp">极小值</FT>

      <polyline className="cv m" points={sgd} />
      <polyline className="cv a" points={mom} />
      <polyline className="cv" points={adam} />

      <FT x={470} y={62} c="tm">— SGD</FT>
      <FT x={470} y={78} c="tn">沿最陡方向,峡谷里来回撞</FT>
      <FT x={470} y={102} c="ta">— Momentum</FT>
      <FT x={470} y={118} c="tn">累积速度,穿过震荡</FT>
      <FT x={470} y={142} c="tp">— Adam</FT>
      <FT x={470} y={158} c="tn">每个参数一个学习率</FT>

      <FT x={16} y={210} c="tn" w={628}>真正该关心的不是求偏导,而是凸性:深度学习的损失面几乎从来不是凸的,所以鞍点、局部极小、学习率调度才有意思。</FT>
    </FigFrame>
  );
};

/* c103 —— 贝叶斯更新 */
FIGN["c103-bayes"] = ({ idx }) => {
  const X0 = 40, X1 = 620, Y1 = 168, H = 108;
  const g = (mu, s, x) => Math.exp(-Math.pow((x - mu) / s, 2) / 2);
  const curve = (mu, s, k) => (
    <polyline className={`cv ${k}`} points={fpath(121, (i) => X0 + i * ((X1 - X0) / 120), (i) => Y1 - H * g(mu, s, X0 + i * ((X1 - X0) / 120)))} />
  );
  return (
    <FigFrame h={236} idx={idx}
      cap="贝叶斯不是一条公式,是一种更新观点的纪律:先验说「我原本以为」,似然说「数据看到了什么」,后验是两者相乘之后的新信念。数据越多,先验的影响越小——但它从不会凭空消失。">
      <FT x={16} y={24} c="tt">后验 ∝ 先验 × 似然</FT>
      {curve(200, 96, "m")}
      {curve(430, 62, "a")}
      {curve(392, 50, "")}
      <line x1={X0} x2={X1} y1={Y1} y2={Y1} className="axis" />
      <FT x={200} y={Y1 - H * 1.0 - 8} c="tm" a="middle">先验</FT>
      <FT x={452} y={Y1 - H - 8} c="ta" a="middle">似然(数据)</FT>
      <FT x={370} y={Y1 - H - 24} c="tp" a="middle">后验</FT>
      <FT x={X0} y={Y1 + 16} c="tn">参数 θ →</FT>

      <FT x={16} y={200} c="t">数据少时:</FT>
      <FT x={104} y={200} c="tn">后验被先验拉着走,结论要谨慎。</FT>
      <FT x={16} y={220} c="t">数据多时:</FT>
      <FT x={104} y={220} c="tn">似然主导,先验的影响被稀释——这正是频率派与贝叶斯派在大样本下结论趋同的原因。</FT>
    </FigFrame>
  );
};

/* c103 —— 抽样分布与置信区间 */
FIGN["c103-clt"] = ({ idx }) => {
  const rows = [[10, 0.31], [30, 0.18], [100, 0.099], [1000, 0.031]];
  return (
    <FigFrame h={228} idx={idx}
      cap="一次测量得到的从来不是真值,而是一个带宽度的区间,宽度按 1/√n 收缩。想把误差减半,样本量要变成四倍——这条平方根定律是所有「我们提升了 3%」类结论必须先过的一关。">
      <FT x={16} y={24} c="tt">标准误 ≈ σ / √n:精度是买来的</FT>
      {rows.map(([n, se], i) => {
        const y = 48 + i * 38;
        const w = se * 900;
        return (
          <g key={i}>
            <FT x={16} y={y + 18} c="t">n = {n}</FT>
            <line x1={330 - w} x2={330 + w} y1={y + 13} y2={y + 13}
              className={`ln ${w > 100 ? "a" : "p"}`} strokeWidth="6" strokeLinecap="round" />
            <circle cx={330} cy={y + 13} r="3" className="fb" stroke="var(--ink)" />
            <FT x={560} y={y + 18} c={w > 100 ? "ta" : "tp"}>±{(se * 100).toFixed(1)}%</FT>
          </g>
        );
      })}
      <line x1={330} y1={40} x2={330} y2={196} className="ln d" />
      <FT x={330} y={210} c="tn" a="middle">真值</FT>
      <FT x={16} y={228} c="tn" w={628}>样本量翻 4 倍,区间才缩一半。这条曲线解释了为什么小样本上的「明显提升」大多是噪声。</FT>
    </FigFrame>
  );
};

/* c104 —— 熵 / 交叉熵 / KL */
FIGN["c104-entropy"] = ({ idx }) => (
  <FigFrame h={240} idx={idx}
    cap="训练分类器时用的交叉熵,可以拆成两块:一块是数据本身固有的不确定性(熵,你无论如何消不掉),另一块才是你的模型偏离真实分布的代价(KL)。优化交叉熵,其实只是在压第二块。">
    <FT x={16} y={24} c="tt">H(p, q) = H(p) + KL(p ‖ q)</FT>

    <rect x={16} y={52} width={430} height={34} rx={3} className="fp" fillOpacity={0.75} />
    <FT x={231} y={74} c="tn" a="middle">H(p) · 数据固有的不确定性 —— 压不掉</FT>
    <rect x={446} y={52} width={198} height={34} rx={3} className="fa" fillOpacity={0.8} />
    <FT x={545} y={74} c="tn" a="middle">KL(p‖q) · 模型的偏差</FT>
    <FT x={16} y={104} c="tk">交叉熵 H(p,q) —— 你实际在最小化的东西</FT>
    <line x1={16} y1={40} x2={16} y2={94} className="ln f" />
    <line x1={644} y1={40} x2={644} y2={94} className="ln f" />

    <FB x={16} y={126} w={200} h={54} k="p" t="熵 H(p)" s="真实分布本身有多难猜" tc="t" />
    <FB x={230} y={126} w={200} h={54} k="a" t="KL 散度" s="q 离 p 有多远,≥ 0" tc="t" />
    <FB x={444} y={126} w={200} h={54} t="互信息 I(X;Y)" s="知道 Y 之后,X 少了多少不确定性" tc="t" />

    <FT x={16} y={204} c="tn" w={628}>三个量都在回答同一个问题:「还剩多少不知道」。KL 不对称——KL(p‖q) 和 KL(q‖p) 惩罚的是完全不同的错误,这一点在变分推断和 RLHF 里会反复咬人。</FT>
  </FigFrame>
);

/* c104 —— 编码长度 = −log p */
FIGN["c104-coding"] = ({ idx }) => {
  const syms = [["A", 0.5, "0"], ["B", 0.25, "10"], ["C", 0.125, "110"], ["D", 0.125, "111"]];
  return (
    <FigFrame h={230} idx={idx}
      cap="高频符号给短码,低频符号给长码,平均码长的下界正好是熵。这条等价关系是信息论的枢纽:压缩率、困惑度、交叉熵损失,量的都是同一件事——你的模型对下一个符号有多惊讶。">
      <FT x={16} y={24} c="tt">最优码长 = −log₂ p,平均码长下界 = 熵</FT>
      <FT x={16} y={50} c="tn">符号</FT>
      <FT x={80} y={50} c="tn">概率 p</FT>
      <FT x={170} y={50} c="tn">−log₂ p</FT>
      <FT x={250} y={50} c="tn">编码</FT>
      <FT x={340} y={50} c="tn">码长</FT>
      {syms.map(([s, p, code], i) => {
        const y = 62 + i * 32;
        const bits = Math.log2(1 / p);
        return (
          <g key={i}>
            <line x1={16} y1={y + 22} x2={644} y2={y + 22} className="grid" />
            <FT x={16} y={y + 16} c="tk">{s}</FT>
            <FT x={80} y={y + 16} c="tm">{p}</FT>
            <FT x={170} y={y + 16} c="tm">{bits}</FT>
            <FT x={250} y={y + 16} c="ta">{code}</FT>
            <rect x={340} y={y + 6} width={bits * 26} height={12} rx={2} className="fp" fillOpacity={0.8} />
            <FT x={470} y={y + 16} c="tn">{bits} bit</FT>
          </g>
        );
      })}
      <FT x={16} y={198} c="t">平均码长 = 0.5·1 + 0.25·2 + 0.125·3 + 0.125·3 = 1.75 bit = H(p)</FT>
      <FT x={16} y={220} c="tn" w={628}>语言模型的困惑度就是 2^交叉熵:它在说「这个模型平均每一步要在多少个等可能选项里犹豫」。</FT>
    </FigFrame>
  );
};
/* =========================================================
   M02 · 编程与系统
   ========================================================= */

/* c201 —— 复杂度增长:n 变大之后谁先崩 */
FIGN["c201-complexity"] = ({ idx }) => {
  const X0 = 62, X1 = 470, Y0 = 46, Y1 = 172, N = 60;
  const xf = (i) => X0 + (i / N) * (X1 - X0);
  const yf = (v) => Y1 - Math.min(1, v) * (Y1 - Y0);
  const cap = 3600;
  const fns = [
    { t: "O(1)", f: () => 1 / cap, k: "cv" },
    { t: "O(log n)", f: (n) => Math.log2(n + 1) / cap, k: "cv" },
    { t: "O(n)", f: (n) => n / cap, k: "cv m" },
    { t: "O(n log n)", f: (n) => (n * Math.log2(n + 1)) / cap, k: "cv m" },
    { t: "O(n²)", f: (n) => (n * n) / cap, k: "cv a" },
  ];
  return (
    <FigFrame h={238} idx={idx}
      cap="算法课真正要教的不是背复杂度,而是养成一种条件反射:看到嵌套循环先问「n 会长到多大」。n=60 时 O(n²) 还很平,n=6000 时它已经比 O(n log n) 慢两个数量级——差别不在代码好不好看,在能不能上线。">
      <FT x={16} y={24} c="tt">同一段数据量,五种代价曲线</FT>
      {[0, 0.5, 1].map((f) => (
        <g key={f}><line x1={X0} x2={X1} y1={yf(f)} y2={yf(f)} className="grid" /></g>
      ))}
      <line x1={X0} x2={X1} y1={Y1} y2={Y1} className="axis" />
      <FT x={X0 - 8} y={Y0 + 6} c="tn" a="end">慢</FT>
      <FT x={X0 - 8} y={Y1} c="tn" a="end">快</FT>
      <FT x={X1} y={Y1 + 16} c="tn" a="end">输入规模 n →</FT>
      {fns.map((fn, i) => (
        <polyline key={i} className={fn.k} points={fpath(N + 1, xf, (j) => yf(fn.f(j * 6)))} />
      ))}
      {fns.map((fn, i) => <FT key={i} x={484} y={62 + i * 22} c={i === 4 ? "ta" : i > 1 ? "tm" : "tp"}>{fn.t}</FT>)}
      <FT x={16} y={202} c="tn" w={628}>工程上的经验线:n ≤ 10⁴ 时 O(n²) 通常还能忍;n ≥ 10⁶ 时只有 O(n) 与 O(n log n) 还活着;超过 10⁸ 就得考虑近似算法或者换个问法。</FT>
    </FigFrame>
  );
};

/* c201 —— 数据结构就是一张取舍表 */
FIGN["c201-structures"] = ({ idx }) => {
  const rows = [
    ["数组 / Array", "O(1)", "O(n)", "O(n)", "缓存友好,随机读最快"],
    ["链表 / List", "O(n)", "O(1)", "O(1)", "指针跳转,缓存最不友好"],
    ["哈希表 / Hash", "O(1)*", "O(1)*", "O(1)*", "均摊 O(1),但无序、最坏退化"],
    ["平衡树 / BST", "O(log n)", "O(log n)", "O(log n)", "有序,范围查询强"],
    ["堆 / Heap", "O(1) 取顶", "O(log n)", "O(log n)", "只关心极值时最省"],
  ];
  return (
    <FigFrame h={228} idx={idx}
      cap="没有一种结构在所有操作上都最优——选型就是在「查、插、删」三列里挑你最在意的那一列。真实系统里还有第四列常被忽略:缓存局部性。数组比链表快,很多时候不是复杂度赢了,是内存布局赢了。">
      <FT x={16} y={24} c="tt">查 / 插 / 删:三列里挑你最在意的</FT>
      {["结构", "查找", "插入", "删除", "真正的取舍"].map((h, i) => (
        <FT key={i} x={[16, 150, 226, 302, 386][i]} y={48} c="tn">{h}</FT>
      ))}
      {rows.map((r, i) => {
        const y = 60 + i * 30;
        return (
          <g key={i}>
            <line x1={16} y1={y + 20} x2={644} y2={y + 20} className="grid" />
            <FT x={16} y={y + 15} c="t">{r[0]}</FT>
            <FT x={150} y={y + 15} c="tm">{r[1]}</FT>
            <FT x={226} y={y + 15} c="tm">{r[2]}</FT>
            <FT x={302} y={y + 15} c="tm">{r[3]}</FT>
            <FT x={386} y={y + 15} c="tn" w={256}>{r[4]}</FT>
          </g>
        );
      })}
      <FT x={16} y={222} c="tn" w={628}>* 哈希表的 O(1) 是均摊值:哈希冲突严重或需要扩容时,单次操作可以退化到 O(n)。写基准测试时要专门构造这种最坏情况。</FT>
    </FigFrame>
  );
};

/* c202 —— Amdahl 定律 */
FIGN["c202-amdahl"] = ({ idx }) => {
  const X0 = 62, X1 = 470, Y0 = 46, Y1 = 172;
  const P = [0.5, 0.9, 0.95, 0.99];
  const sp = (p, n) => 1 / ((1 - p) + p / n);
  const xf = (n) => X0 + (Math.log2(n) / 10) * (X1 - X0);
  const yf = (s) => Y1 - Math.min(1, s / 24) * (Y1 - Y0);
  return (
    <FigFrame h={240} idx={idx}
      cap="并行能给你的加速比,被串行那一小段死死卡住:哪怕 95% 的代码完美并行,上限也只有 20 倍。所以扩机器之前先做的事永远是——把那 5% 找出来。这是分布式训练里最反直觉也最重要的一条。">
      <FT x={16} y={24} c="tt">加速比 = 1 / ((1−p) + p/n)</FT>
      {[0, 0.25, 0.5, 0.75, 1].map((f) => (
        <g key={f}>
          <line x1={X0} x2={X1} y1={yf(f * 24)} y2={yf(f * 24)} className="grid" />
          <FT x={X0 - 8} y={yf(f * 24) + 4} c="tn" a="end">{Math.round(f * 24)}×</FT>
        </g>
      ))}
      <line x1={X0} x2={X1} y1={Y1} y2={Y1} className="axis" />
      {[1, 4, 16, 64, 256, 1024].map((n) => <FT key={n} x={xf(n)} y={Y1 + 15} c="tn" a="middle">{n}</FT>)}
      <FT x={X1} y={Y1 + 30} c="tn" a="end">处理器数 n →</FT>
      {P.map((p, i) => (
        <g key={i}>
          <polyline className={`cv ${i === 3 ? "" : i === 0 ? "a" : "m"}`}
            points={[1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024].map(n => `${xf(n)},${yf(sp(p, n))}`).join(" ")} />
          <FT x={X1 + 8} y={yf(sp(p, 1024)) + 4} c={i === 3 ? "tp" : i === 0 ? "ta" : "tm"}>p = {p}</FT>
        </g>
      ))}
      <FT x={16} y={206} c="tn" w={628}>串行占比 p=50% 时,再多的机器也只有 2 倍。工程含义很直接:先用 profiler 找到串行瓶颈(数据加载、同步屏障、日志写盘),再谈扩容——否则你买的是账单,不是速度。</FT>
    </FigFrame>
  );
};

/* c202 —— 三种并行切法 */
FIGN["c202-parallel"] = ({ idx }) => {
  const panel = (x, title, sub, cells, note, k) => (
    <g>
      <FB x={x} y={44} w={200} h={30} k={k} t={title} tc="t" />
      <FT x={x + 100} y={90} c="tn" a="middle">{sub}</FT>
      {cells}
      <FT x={x} y={192} c="tn" w={200}>{note}</FT>
    </g>
  );
  const box = (x, y, w, h, k, key) => <rect key={key} x={x} y={y} width={w} height={h} rx={2} className={`bx ${k}`} />;
  return (
    <FigFrame h={252} idx={idx}
      cap="模型放不下就切模型,数据太多就切数据。数据并行最简单、通信最少,是默认选择;张量并行切单层矩阵,通信最重,只在单卡装不下一层时用;流水线并行按层切,省通信但有气泡。真实的大规模训练是三者混用。">
      <FT x={16} y={24} c="tt">切数据 · 切张量 · 切层</FT>
      {panel(16, "数据并行", "每卡一份完整模型", [0, 1, 2].map(i => (
        <g key={i}>{box(30 + i * 62, 104, 46, 56, "p", `d${i}`)}
          <text x={53 + i * 62} y={136} textAnchor="middle" className="tn">模型</text>
          <text x={53 + i * 62} y={176} textAnchor="middle" className="tn">批 {i + 1}</text></g>
      )), "通信最少(只同步梯度),最先该试的一种。", "p")}

      {panel(230, "张量并行", "一层被横着切开", [0, 1, 2].map(i => (
        <g key={i}>{box(244 + i * 62, 104, 46, 56, "a", `t${i}`)}
          <text x={267 + i * 62} y={136} textAnchor="middle" className="tn">1/3 层</text></g>
      )).concat([
        <line key="l1" x1={290} y1={132} x2={306} y2={132} className="ln a" />,
        <line key="l2" x1={352} y1={132} x2={368} y2={132} className="ln a" />,
      ]), "每层都要 all-reduce,通信最重,只在单卡装不下一层时用。", "a")}

      {panel(444, "流水线并行", "按层纵向切", [0, 1, 2].map(i => (
        <g key={i}>{box(458, 104 + i * 20, 172, 16, i === 1 ? "m" : "", `p${i}`)}
          <text x={544} y={116 + i * 20} textAnchor="middle" className="tn">第 {i + 1} 段(卡 {i + 1})</text></g>
      )), "通信少,但有流水线气泡;要靠 micro-batch 把气泡压下去。", "")}
    </FigFrame>
  );
};

/* c203 —— GPU 存储层级 */
FIGN["c203-memhier"] = ({ idx }) => {
  const lv = [
    { t: "寄存器 Registers", cap: "~256 KB / SM", bw: 1.0, lat: "~1 周期", k: "fp" },
    { t: "共享内存 Shared", cap: "~228 KB / SM", bw: 0.62, lat: "~20 周期", k: "fp" },
    { t: "L2 Cache", cap: "~50 MB", bw: 0.3, lat: "~200 周期", k: "fmid" },
    { t: "显存 HBM", cap: "40–192 GB", bw: 0.12, lat: "~400 周期", k: "fa" },
    { t: "主机内存 Host", cap: "TB 级", bw: 0.02, lat: "~10⁴ 周期", k: "fm" },
  ];
  return (
    <FigFrame h={244} idx={idx}
      cap="越快的存储越小,越大的存储越慢——中间差了两三个数量级。CUDA 优化的绝大部分工作,本质上就是把数据尽量往上面几层挪、并且让同一份数据被多次复用。算得快从来不是瓶颈,搬得快才是。">
      <FT x={16} y={24} c="tt">容量 ↑ 带宽 ↓:每一层差一个数量级</FT>
      {lv.map((l, i) => {
        const y = 46 + i * 36;
        return (
          <g key={i}>
            <FT x={16} y={y + 20} c="t">{l.t}</FT>
            <FT x={172} y={y + 20} c="tn">{l.cap}</FT>
            <rect x={280} y={y + 8} width={280 * l.bw} height={16} rx={2} className={l.k} fillOpacity={0.85} />
            <FT x={572} y={y + 20} c="tn">{l.lat}</FT>
          </g>
        );
      })}
      <FT x={280} y={40} c="tn">相对带宽 →</FT>
      <FT x={572} y={40} c="tn">访问延迟</FT>
      <FT x={16} y={244} c="tn" w={628}>写 kernel 时的三个基本动作:合并访存(让同一 warp 访问连续地址)、用共享内存做 tiling(把复用的数据搬上来一次)、减少 bank conflict。这三件事解释了大部分手写 kernel 与朴素实现之间的差距。</FT>
    </FigFrame>
  );
};

/* c203 —— Roofline */
FIGN["c203-roofline"] = ({ idx }) => {
  const X0 = 66, X1 = 470, Y0 = 50, Y1 = 168;
  const peak = 1.0, bwSlope = 0.14;
  const xf = (i) => X0 + (i / 60) * (X1 - X0);
  const yf = (v) => Y1 - Math.min(1, v) * (Y1 - Y0);
  const ridge = peak / bwSlope;
  return (
    <FigFrame h={244} idx={idx}
      cap="横轴是「每搬一字节能算多少次」,纵轴是实际达到的算力。斜线段说明你被带宽卡住,平线段说明你被算力卡住。优化之前先定位自己在哪一段——在斜线上再怎么换更强的卡也没用,该做的是提高数据复用。">
      <FT x={16} y={24} c="tt">Roofline:你到底被什么卡住了</FT>
      <line x1={X0} x2={X1} y1={Y1} y2={Y1} className="axis" />
      <line x1={X0} x2={X0} y1={Y0} y2={Y1} className="axis" />
      <polyline className="cv" points={fpath(61, xf, (i) => yf(Math.min(peak, bwSlope * i)))} />
      <line x1={xf(ridge)} x2={xf(ridge)} y1={Y0} y2={Y1} className="ln d" />
      <rect x={X0} y={Y0} width={xf(ridge) - X0} height={Y1 - Y0} className="areaa" />
      <rect x={xf(ridge)} y={Y0} width={X1 - xf(ridge)} height={Y1 - Y0} className="areap" />
      <FT x={(X0 + xf(ridge)) / 2} y={Y0 + 18} c="ta" a="middle">带宽受限</FT>
      <FT x={(X1 + xf(ridge)) / 2} y={Y0 + 18} c="tp" a="middle">算力受限</FT>
      <FT x={X0 - 8} y={yf(peak) + 4} c="tn" a="end">峰值</FT>
      <FT x={X1} y={Y1 + 16} c="tn" a="end">算术强度(FLOP/Byte)→</FT>
      <circle cx={xf(2.4)} cy={yf(bwSlope * 2.4)} r="4" className="fa" />
      <FT x={xf(2.4) + 8} y={yf(bwSlope * 2.4) - 6} c="ta">逐元素算子</FT>
      <circle cx={xf(38)} cy={yf(peak)} r="4" className="fp" />
      <FT x={xf(38) + 8} y={yf(peak) + 14} c="tp">大矩阵乘</FT>
      <FT x={488} y={70} c="t">在斜线上:</FT>
      <FT x={488} y={88} c="tn" w={156}>提高复用、算子融合、换更紧凑的数据类型。</FT>
      <FT x={488} y={128} c="t">在平线上:</FT>
      <FT x={488} y={146} c="tn" w={156}>才轮到换更强的卡、用 Tensor Core。</FT>
      <FT x={16} y={210} c="tn" w={628}>深度学习里绝大多数逐元素算子(激活、归一化、加法)都落在左半边——这就是算子融合能带来大幅提速的原因:它把多次搬运合并成一次。</FT>
    </FigFrame>
  );
};

/* c204 —— 训练系统 vs 推理系统 */
FIGN["c204-trainserve"] = ({ idx }) => (
  <FigFrame h={252} idx={idx}
    cap="训练系统优化的是「单位时间处理多少样本」,推理系统优化的是「单个请求多久返回」——两个目标经常互相打架。批越大吞吐越高,但每个请求等得越久。搞清楚自己在优化哪一个,是 ML 系统课最先要建立的分界。">
    <FT x={16} y={24} c="tt">两套系统,两个完全不同的目标</FT>

    <FB x={16} y={44} w={300} h={28} k="p" t="训练系统 · 目标 = 吞吐" tc="t" />
    {[["数据加载 / 增强", "常见瓶颈,别让 GPU 等 CPU"], ["前向 + 反向", "算力主战场"],
      ["梯度同步 all-reduce", "多卡时的通信瓶颈"], ["检查点 / 容错", "跑几天必须能续"]].map(([t, s], i) => (
      <g key={i}>
        <FB x={16} y={82 + i * 40} w={300} h={32} k="m" t={t} s={s} tc="ts" />
        {i < 3 && <FA x1={166} y1={114 + i * 40} x2={166} y2={122 + i * 40} />}
      </g>
    ))}

    <FB x={344} y={44} w={300} h={28} k="a" t="推理系统 · 目标 = 延迟" tc="t" />
    {[["请求排队 / 动态批处理", "吞吐与延迟的交易发生在这里"], ["KV 缓存管理", "显存的主要消耗者"],
      ["解码循环", "逐 token 生成,带宽受限"], ["流式返回 / 超时", "用户感知的是首字延迟"]].map(([t, s], i) => (
      <g key={i}>
        <FB x={344} y={82 + i * 40} w={300} h={32} k="m" t={t} s={s} tc="ts" />
        {i < 3 && <FA x1={494} y1={114 + i * 40} x2={494} y2={122 + i * 40} k="a" />}
      </g>
    ))}
    <FT x={16} y={252} c="tn" w={628}>一条实用判据:训练关心 GPU 利用率(MFU),推理关心 P95 延迟与每 token 成本。用错指标去优化另一套系统,是这门课最常见的错误。</FT>
  </FigFrame>
);

/* c204 —— 批大小的吞吐/延迟曲线 */
FIGN["c204-batching"] = ({ idx }) => {
  const X0 = 62, X1 = 470, Y0 = 46, Y1 = 168;
  const B = [1, 2, 4, 8, 16, 32, 64, 128];
  const xf = (i) => X0 + (i / (B.length - 1)) * (X1 - X0);
  const thr = (b) => 1 - Math.exp(-b / 22);
  const lat = (b) => 0.12 + b / 150;
  const yf = (v) => Y1 - Math.min(1, v) * (Y1 - Y0);
  return (
    <FigFrame h={238} idx={idx}
      cap="加大批处理,吞吐很快涨到饱和,延迟却一直线性上升。最优点不在曲线的任何一端,而在你的 SLA 上:先定「P95 必须小于多少」,再回头挑能满足它的最大批。">
      <FT x={16} y={24} c="tt">吞吐会饱和,延迟不会</FT>
      {[0, 0.5, 1].map((f) => <line key={f} x1={X0} x2={X1} y1={yf(f)} y2={yf(f)} className="grid" />)}
      <line x1={X0} x2={X1} y1={Y1} y2={Y1} className="axis" />
      {B.map((b, i) => <FT key={b} x={xf(i)} y={Y1 + 15} c="tn" a="middle">{b}</FT>)}
      <FT x={X1} y={Y1 + 30} c="tn" a="end">批大小 →</FT>
      <polyline className="cv" points={B.map((b, i) => `${xf(i)},${yf(thr(b))}`).join(" ")} />
      <polyline className="cv a" points={B.map((b, i) => `${xf(i)},${yf(lat(b))}`).join(" ")} />
      <FT x={X1 + 8} y={yf(thr(128)) + 4} c="tp">吞吐</FT>
      <FT x={X1 + 8} y={yf(lat(128)) + 4} c="ta">延迟</FT>
      <line x1={xf(4)} x2={xf(4)} y1={Y0} y2={Y1} className="ln d" />
      <FT x={xf(4) + 8} y={Y0 + 14} c="tn" w={120}>吞吐已到八成,延迟还很低</FT>
      <FT x={16} y={202} c="tn" w={628}>连续批处理(continuous batching)之所以是大模型推理的关键优化,就是因为它让请求可以随到随入、算完就走,不必等整批对齐——等于把这条延迟曲线压平了一大截。</FT>
    </FigFrame>
  );
};

/* c205 —— MLOps 闭环 */
FIGN["c205-lifecycle"] = ({ idx }) => {
  const nodes = [
    ["数据版本", 60, 70], ["训练 / 实验跟踪", 210, 70], ["评估 / 门禁", 360, 70],
    ["打包 / 注册", 510, 70], ["灰度发布", 510, 168], ["线上监控", 360, 168],
    ["漂移检测", 210, 168], ["回流标注", 60, 168],
  ];
  return (
    <FigFrame h={244} idx={idx}
      cap="模型不是发一次就完事的静态产物,而是一个必须持续转起来的闭环。这张环上任何一个节点断掉,后面所有节点都会慢慢失效——最常断的是右下角那半圈:上线之后没人看,漂移了没人知道。">
      <FT x={16} y={24} c="tt">模型生命周期:一个必须转起来的环</FT>
      {nodes.map(([t, x, y], i) => (
        <g key={i}>
          <FB x={x} y={y} w={126} h={38} k={i === 5 || i === 6 ? "a" : "p"} t={t} tc="t" />
          {i < 3 && <FA x1={x + 128} y1={y + 19} x2={x + 148} y2={y + 19} k="p" />}
          {i > 4 && i < 7 && <FA x1={x - 2} y1={y + 19} x2={x - 22} y2={y + 19} k="a" />}
        </g>
      ))}
      <FAP d="M573 110 L 573 166" k="p" />
      <FAP d="M123 166 L 123 112" k="a" />
      <FT x={590} y={140} c="tn">发布</FT>
      <FT x={16} y={140} c="tn">回流</FT>
      <FT x={16} y={222} c="tn" w={628}>三条硬要求:数据和模型都要有版本(能回滚到任意一天)、评估要做成门禁(不达标不许上线)、线上指标要能回流成下一轮的训练数据。少任何一条,这个环就只是一张图。</FT>
    </FigFrame>
  );
};

/* c205 —— 漂移与回滚 */
FIGN["c205-drift"] = ({ idx }) => {
  const X0 = 62, X1 = 560, Y0 = 52, Y1 = 158, N = 60;
  const xf = (i) => X0 + (i / N) * (X1 - X0);
  const acc = (i) => i < 28 ? 0.88 - i * 0.0008 : (i < 44 ? 0.86 - (i - 28) * 0.012 : 0.87);
  const yf = (v) => Y1 - ((v - 0.6) / 0.32) * (Y1 - Y0);
  return (
    <FigFrame h={240} idx={idx}
      cap="线上模型的效果很少断崖式下跌,它是慢慢滑下去的——这正是它难被发现的原因。等到用户投诉时,通常已经掉了两周。真正管用的不是更强的模型,而是一条一直在跑的评估曲线和一个能一键回滚的版本。">
      <FT x={16} y={24} c="tt">效果不会断崖,它会慢慢滑</FT>
      {[0.6, 0.7, 0.8, 0.9].map((v) => (
        <g key={v}>
          <line x1={X0} x2={X1} y1={yf(v)} y2={yf(v)} className="grid" />
          <FT x={X0 - 8} y={yf(v) + 4} c="tn" a="end">{Math.round(v * 100)}%</FT>
        </g>
      ))}
      <line x1={X0} x2={X1} y1={Y1} y2={Y1} className="axis" />
      <polyline className="cv" points={fpath(N + 1, xf, (i) => yf(acc(i)))} />
      <line x1={X0} x2={X1} y1={yf(0.8)} y2={yf(0.8)} className="ln a d" />
      <FT x={X1 + 6} y={yf(0.8) + 4} c="ta">告警线</FT>
      <rect x={xf(28)} y={Y0} width={xf(44) - xf(28)} height={Y1 - Y0} className="areaa" />
      <FT x={xf(36)} y={Y0 + 16} c="ta" a="middle">分布漂移</FT>
      <FAP d={`M${xf(44)} ${yf(0.71)} L ${xf(46)} ${yf(0.86)}`} k="p" />
      <FT x={xf(47)} y={yf(0.9)} c="tp">回滚 / 重训</FT>
      <FT x={X0} y={Y1 + 16} c="tn">上线</FT>
      <FT x={X1} y={Y1 + 16} c="tn" a="end">时间 →</FT>
      <FT x={16} y={196} c="tn" w={628}>要同时盯三条曲线:输入分布(用户问的东西变了吗)、输出分布(模型的回答风格变了吗)、以及业务指标(点击、转化、投诉)。前两条能让你比第三条早两周发现问题。</FT>
    </FigFrame>
  );
};