/* =========================================================
   Pages — Home / Module / Course / About
   ========================================================= */

// ============== Ticker ==============
const Ticker = () => {
  // build a long string by repeating courses twice (so animation loops seamlessly)
  const items = [...COURSES, ...COURSES];
  return (
    <div className="ticker">
      <div className="ticker-track">
        {items.map((c, i) => (
          <span key={i} className="ticker-item">
            <span className="pip" />
            <span className="code">{c.code}</span>
            <span className="nm">{c.zh}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span style={{ opacity: 0.6 }}>{c.credits} CR</span>
          </span>
        ))}
      </div>
    </div>
  );
};

// ============== HOME ==============
const HomePage = ({ progress, toggleProgress, nav, user, onLogin }) => {
  const doneCount = Object.values(progress).filter(Boolean).length;
  const total = COURSES.length;
  const pct = Math.round((doneCount / total) * 100);
  const doneCredits = COURSES.filter(c => progress[c.id]).reduce((s, c) => s + c.credits, 0);

  return (
    <div className="page">
      <section className="hero container">
        <div className="hero-eyebrow">
          <span className="swatch" />
          <span>2026 · CURRICULUM v0.3</span>
          {user ? (
            <span style={{ marginLeft: "auto", opacity: 0.7 }}>WELCOME, {user.name.toUpperCase()}</span>
          ) : (
            <span style={{ marginLeft: "auto", opacity: 0.7 }}>GUEST MODE · 游客模式</span>
          )}
        </div>
        <h1 className="hero-title">
          <span className="cn">不上学,</span><br/>
          <span className="cn">也能</span> <span className="accent">学完</span><br/>
          <span>an entire</span> <em>AI master's.</em>
        </h1>
        <p className="hero-sub dropcap">
          这是一份把硕士级 AI 课程体系拆成 16 门、120 学分的自学地图——
          数学、系统、机器学习、前沿,四条主线,两年走完。
          每一门课配讲义、必读论文、作业与自测,勾选完成,云端同步。
        </p>
        <div className="cta-row">
          {user ? (
            <button className="btn btn-accent" onClick={() => nav("#/m/m1")}>
              从 M01 开始 →
            </button>
          ) : (
            <button className="btn btn-accent" onClick={() => onLogin && onLogin("register")}>
              注册解锁课程 →
            </button>
          )}
          <button className="btn" onClick={() => nav("#/about")}>
            如何使用
          </button>
          <button className="btn" onClick={() => document.getElementById("roadmap").scrollIntoView({ behavior: "smooth", block: "start" })}>
            看完整路线图 ↓
          </button>
        </div>

        <div className="hero-meta">
          <div className="cell">
            <div className="v">04</div>
            <div className="l">Modules · 模块</div>
          </div>
          <div className="cell">
            <div className="v">16</div>
            <div className="l">Courses · 课程</div>
          </div>
          <div className="cell">
            <div className="v">120</div>
            <div className="l">Credits · 学分</div>
          </div>
          <div className="cell">
            <div className="v">~100</div>
            <div className="l">Weeks · 周</div>
          </div>
        </div>

        <div className="bigbar" style={{ marginTop: 64 }}>
          <div className="left">
            <div className="lbl">Your progress · 你的进度</div>
            <div className="pct">
              <span className="accent">{pct}</span>
              <span style={{ fontSize: 36, color: "var(--muted)" }}>%</span>
            </div>
          </div>
          <div className="right">
            <div><strong>{doneCount}</strong> / {total} courses</div>
            <div><strong>{doneCredits}</strong> / {COURSES.reduce((s,c)=>s+c.credits,0)} credits</div>
            <div style={{ marginTop: 6 }}>Firebase · 跨设备同步</div>
          </div>
        </div>
        <div className="linebar"><div className="fill" style={{ width: `${pct}%` }} /></div>
      </section>

      <Ticker />

      {/* ROADMAP */}
      <section id="roadmap" className="section">
        <div className="container">
          <div className="sect-head">
            <div className="num">§ 01 / ROADMAP</div>
            <div className="title">
              <span className="cn">学习路线图</span>
              <span style={{ marginLeft: 14, opacity: 0.5 }}>The Map.</span>
            </div>
            <div className="aside">drag eyes left → right · top → bottom</div>
          </div>
        </div>
        <div className="roadmap-key container">
          <div className="item"><span className="sw" /> 未开始 / not started</div>
          <div className="item"><span className="sw done" /> 已完成 / done</div>
          <div className="item"><span className="sw" style={{ borderStyle: "dashed", borderColor: "var(--ink)" }} /> 横线 = 模块主线</div>
          <div className="item"><span className="sw" style={{ background: "transparent", border: "0", position: "relative" }}>
            <svg width="12" height="12" style={{ position: "absolute", inset: 0 }}><line x1="0" y1="12" x2="12" y2="0" stroke="var(--ink)" strokeDasharray="2 2"/></svg>
          </span> 虚线 = 跨模块先修</div>
        </div>
        <div className="roadmap-wrap bare">
          <div className="container">
            <Roadmap progress={progress} onCourseClick={(id) => nav(`#/c/${id}`)} />
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className="section">
        <div className="container">
          <div className="sect-head">
            <div className="num">§ 02 / MODULES</div>
            <div className="title">
              <span className="cn">四条主线</span>
              <span style={{ marginLeft: 14, opacity: 0.5 }}>Four tracks.</span>
            </div>
            <div className="aside">click any to enter</div>
          </div>
          <div className="module-grid">
            {MODULES.map((m) => {
              const cs = COURSES.filter((c) => c.moduleId === m.id);
              const done = cs.filter((c) => progress[c.id]).length;
              const isAccent = m.accent === "accent";
              return (
                <div
                  key={m.id}
                  className={`mod-card ${isAccent ? "has-accent" : ""}`}
                  onClick={() => nav(`#/m/${m.id}`)}
                >
                  <div className="topline">
                    <span className="module-no">{m.code}</span>
                    <span>{m.credits} 学分 · {m.weeks}</span>
                  </div>
                  <div className="mod-zh">{m.zh}</div>
                  <div className="mod-en">{m.en}.</div>
                  <div className="mod-desc">{m.tagline} {m.description}</div>
                  <div className="mod-foot">
                    <span>{cs.length} 门课</span>
                    <span><strong>{done}</strong> / {cs.length} 完成</span>
                    <span style={{ marginLeft: "auto" }}>→ 进入</span>
                  </div>
                  <div className="corner">{["i","ii","iii","iv"][MODULES.indexOf(m)]}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sect-head">
            <div className="num">§ 03 / PHILOSOPHY</div>
            <div className="title">
              <span className="cn">怎么用这份地图</span>
            </div>
            <div className="aside">three rules</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: "1px solid var(--ink)" }}>
            {[
              {
                no: "01",
                zh: "顺序不是法律。",
                en: "Order is a suggestion.",
                body: "M01-M04 是建议的依赖关系,但你可以从感兴趣的地方切入,再回头补数学。先有兴趣,再有耐心。"
              },
              {
                no: "02",
                zh: "读论文是关键。",
                en: "Papers are the texture.",
                body: "教材给你框架,论文给你最近五年的肌理。每门课都配 1–4 篇必读,先读 abstract 与 figure,再看正文。"
              },
              {
                no: "03",
                zh: "做项目,不是听课。",
                en: "Build, don't watch.",
                body: "每门课配 2-3 个动手项目。听 10 节课不如复现 1 篇论文;复现 1 篇论文不如把它跑到比 baseline 好。"
              }
            ].map((p, i) => (
              <div key={i} style={{
                padding: "32px 28px",
                borderRight: i < 2 ? "1px solid var(--ink)" : "none",
                background: i === 1 ? "var(--surface)" : "transparent"
              }}>
                <div className="mono" style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.16em" }}>{p.no}</div>
                <div style={{ fontFamily: "Noto Serif SC, serif", fontSize: 28, fontWeight: 500, marginTop: 24 }}>{p.zh}</div>
                <div style={{ fontFamily: "var(--f-display)", fontStyle: "italic", color: "var(--muted)", fontSize: 18, marginTop: 4 }}>{p.en}</div>
                <p style={{ marginTop: 18, color: "var(--ink-soft)", fontSize: 15 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <span>AI 自学成才 · self-taught AI</span>
        <span>{`{ ${doneCount}/${total} } · 云端同步`}</span>
        <span>github · MIT · v0.3</span>
      </footer>
    </div>
  );
};

// ============== MODULE PAGE ==============
const ModulePage = ({ moduleId, progress, toggleProgress, nav, user, onLogin }) => {
  const m = MODULES.find((x) => x.id === moduleId);
  if (!m) return <div className="container" style={{ padding: 80 }}>未找到模块。</div>;
  const cs = COURSES.filter((c) => c.moduleId === moduleId);
  const done = cs.filter((c) => progress[c.id]).length;
  const isAccent = m.accent === "accent";
  const idx = MODULES.findIndex((x) => x.id === moduleId);

  return (
    <div className="page">
      <div className="container">
        <div className="breadcrumb">
          <a onClick={() => nav("#/")}>首页</a>
          <span className="sep">/</span>
          <a onClick={() => nav("#/")}>Modules</a>
          <span className="sep">/</span>
          <span style={{ color: "var(--ink)" }}>{m.code}</span>
        </div>

        <section style={{ padding: "48px 0 32px", position: "relative" }}>
          <div className="watermark fill" style={{
            top: 20, right: -20,
            fontSize: "clamp(180px, 28vw, 380px)",
            opacity: isAccent ? 0.18 : 0.12,
            color: isAccent ? "var(--accent)" : "var(--ink)"
          }}>
            {["I", "II", "III", "IV"][idx]}
          </div>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--muted)", position: "relative" }}>
            MODULE {m.code} · {idx + 1} OF {MODULES.length}
          </div>
          <h1 style={{
            position: "relative",
            zIndex: 1,
            fontFamily: "Noto Serif SC, serif",
            fontSize: "clamp(48px, 7vw, 96px)",
            fontWeight: 500,
            lineHeight: 0.95,
            margin: "16px 0 12px",
            letterSpacing: "-0.02em"
          }}>
            {m.zh}.
          </h1>
          <div style={{
            position: "relative",
            zIndex: 1,
            fontFamily: "var(--f-display)",
            fontStyle: "italic",
            fontSize: 36,
            color: isAccent ? "var(--accent)" : "var(--muted)"
          }}>
            {m.en}.
          </div>
          <p style={{ marginTop: 24, fontSize: 18, color: "var(--ink-soft)", maxWidth: 720, lineHeight: 1.6 }}>
            <span style={{ fontFamily: "Noto Serif SC, serif", fontSize: 22, color: "var(--ink)" }}>
              「{m.tagline}」
            </span>
            <br /><br />
            {m.description}
          </p>

          {/* meta strip */}
          <div style={{
            marginTop: 40,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            border: "1px solid var(--ink)"
          }}>
            {[
              ["COURSES · 课程", `${cs.length}`],
              ["CREDITS · 学分", `${m.credits}`],
              ["DURATION · 时长", m.weeks],
              ["PROGRESS · 进度", `${done} / ${cs.length}`]
            ].map(([k, v], i) => (
              <div key={i} style={{
                padding: "20px 18px",
                borderRight: i < 3 ? "1px solid var(--hairline)" : "none"
              }}>
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.16em", color: "var(--muted)" }}>{k}</div>
                <div style={{ fontFamily: "var(--f-display)", fontStyle: "italic", fontSize: 40, marginTop: 6 }}>{v}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: "32px 0 80px" }}>
          <div className="sect-head" style={{ marginBottom: 0 }}>
            <div className="num">§ COURSES</div>
            <div className="title">
              <span className="cn">课程清单</span>
            </div>
            <div className="aside">click to enter · check to mark done</div>
          </div>
          <div className="course-list">
            {cs.map((c, i) => {
              const isDone = !!progress[c.id];
              return (
                <div
                  key={c.id}
                  className={`course-row ${isDone ? "done" : ""}`}
                  onClick={() => nav(`#/c/${c.id}`)}
                >
                  <div className="num">{c.code}</div>
                  <div className="name">
                    <div className="zh">{c.zh}</div>
                    <div className="en">{c.en}</div>
                  </div>
                  <div className="meta">
                    <strong>{c.credits}</strong> 学分<br />
                    <strong>{c.weeks}</strong> 周
                  </div>
                  <div className="meta">
                    {c.prereq.length === 0 ? "无先修" : `先修 ${c.prereq.length}`}
                  </div>
                  <div className={`tag ${c.tag.includes("旗舰") ? "acc" : ""}`}>{c.tag}</div>
                  <div
                    className={`check-cell ${isDone ? "checked" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!user) { onLogin && onLogin("login", c.zh); return; }
                      toggleProgress(c.id);
                    }}
                    title={user ? "标记完成" : "登录后可标记进度"}
                  >
                    {isDone ? "✓" : ""}
                  </div>
                </div>
              );
            })}
          </div>

          {/* prev / next module */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 64, paddingTop: 24, borderTop: "1px solid var(--hairline)" }}>
            {idx > 0 ? (
              <button className="btn" onClick={() => nav(`#/m/${MODULES[idx - 1].id}`)}>
                ← {MODULES[idx - 1].code} · {MODULES[idx - 1].zh}
              </button>
            ) : <span />}
            {idx < MODULES.length - 1 ? (
              <button className="btn btn-primary" onClick={() => nav(`#/m/${MODULES[idx + 1].id}`)}>
                {MODULES[idx + 1].code} · {MODULES[idx + 1].zh} →
              </button>
            ) : <span />}
          </div>
        </section>
      </div>
    </div>
  );
};

// ============== COURSE PAGE ==============
const CoursePage = ({ courseId, progress, toggleProgress, nav }) => {
  const c = COURSES.find((x) => x.id === courseId);
  if (!c) return <div className="container" style={{ padding: 80 }}>未找到课程。</div>;
  const m = MODULES.find((mm) => mm.id === c.moduleId);
  const isDone = !!progress[c.id];
  const [activeSection, setActiveSection] = React.useState("goal");

  React.useEffect(() => {
    const handler = () => {
      const sections = ["goal", "prereq", "outline", "resources", "papers", "assignments", "checklist"];
      let current = "goal";
      for (const s of sections) {
        const el = document.getElementById(`s-${s}`);
        if (el && el.getBoundingClientRect().top < 200) current = s;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [courseId]);

  const tocs = [
    ["goal", "01 · 课程目标"],
    ["prereq", "02 · 先修依赖"],
    ["outline", "03 · 知识大纲"],
    ["resources", "04 · 资源清单"],
    ["papers", "05 · 必读论文"],
    ["assignments", "06 · 作业项目"],
    ["checklist", "07 · 自测清单"]
  ];

  const goTo = (sid) => {
    const el = document.getElementById(`s-${sid}`);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
    }
  };

  // sibling courses
  const sibs = COURSES.filter(x => x.moduleId === c.moduleId);
  const ci = sibs.findIndex(x => x.id === c.id);
  const prev = sibs[ci - 1];
  const next = sibs[ci + 1];

  return (
    <div className="page">
      <div className="container">
        <div className="breadcrumb">
          <a onClick={() => nav("#/")}>首页</a>
          <span className="sep">/</span>
          <a onClick={() => nav(`#/m/${m.id}`)}>{m.code} {m.zh}</a>
          <span className="sep">/</span>
          <span style={{ color: "var(--ink)" }}>{c.code}</span>
        </div>

        <div className="course-layout">
          {/* TOC sidebar */}
          <aside className="course-toc">
            <div className="toc-label">目录 · contents</div>
            {tocs.map(([sid, lbl]) => (
              <a
                key={sid}
                className={activeSection === sid ? "active" : ""}
                onClick={() => goTo(sid)}
              >
                {lbl}
              </a>
            ))}
            <div style={{ marginTop: 28, paddingTop: 14, borderTop: "1px solid var(--hairline)" }}>
              <div className="toc-label" style={{ marginBottom: 8 }}>同模块 · siblings</div>
              {sibs.map((s) => (
                <a
                  key={s.id}
                  onClick={() => nav(`#/c/${s.id}`)}
                  className={s.id === c.id ? "active" : ""}
                  style={{ fontFamily: "Noto Serif SC, serif", fontSize: 13 }}
                >
                  {s.code} {s.zh}
                </a>
              ))}
            </div>
          </aside>

          {/* MAIN body */}
          <article className="course-body" style={{ position: "relative" }}>
            <div className="watermark fill" style={{
              top: -30, left: -120,
              fontSize: "clamp(180px, 24vw, 320px)",
              letterSpacing: "-0.04em",
              color: "var(--hairline)",
              fontStyle: "normal",
              fontFamily: "var(--f-mono)",
              fontWeight: 600,
              opacity: 0.9,
              zIndex: 0,
              pointerEvents: "none"
            }}>
              {c.code.replace("CS-", "")}
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", color: "var(--muted)" }}>
              {c.code} · {m.zh}
            </div>
            <h1 className="course-header-zh">{c.zh}</h1>
            <div className="course-header-en">— {c.en}.</div>

            <div className="course-tagrow">
              <span><strong>{c.credits}</strong> 学分</span>
              <span><strong>{c.weeks}</strong> 周</span>
              <span>{c.tag}</span>
              <span style={{ marginLeft: "auto" }}>{c.prereq.length === 0 ? "无先修" : `先修 ${c.prereq.length} 门`}</span>
            </div>

            <section id="s-goal" className="cs-block">
              <h2><span className="idx">01</span> <span className="cn">课程目标 / Goal</span></h2>
              <p>{c.goal}</p>
            </section>

            <section id="s-prereq" className="cs-block">
              <h2><span className="idx">02</span> <span className="cn">先修依赖 / Prerequisites</span></h2>
              {c.prereq.length === 0 ? (
                <p>这是入门课,没有强制先修。建议有基本的编程能力(Python / 命令行)。</p>
              ) : (
                <ol className="list-ordered">
                  {c.prereq.map(pid => {
                    const p = COURSES.find(x => x.id === pid);
                    return (
                      <li key={pid} onClick={() => nav(`#/c/${pid}`)} style={{ cursor: "pointer" }}>
                        <span>
                          <span style={{ fontFamily: "Noto Serif SC, serif", fontSize: 18, fontWeight: 500 }}>{p.zh}</span>
                          <span className="mono" style={{ marginLeft: 12, fontSize: 11, color: "var(--muted)" }}>{p.code} · {p.en}</span>
                        </span>
                      </li>
                    );
                  })}
                </ol>
              )}
            </section>

            <section id="s-outline" className="cs-block">
              <h2><span className="idx">03</span> <span className="cn">知识大纲 / Outline</span></h2>
              <ol className="list-ordered">
                {c.outline.map((o, i) => <li key={i}>{o}</li>)}
              </ol>
            </section>

            <section id="s-resources" className="cs-block">
              <h2><span className="idx">04</span> <span className="cn">资源清单 / Resources</span></h2>
              {c.resources.length === 0 ? (
                <p style={{ color: "var(--muted)" }}>这门课的资源仍在收集中。</p>
              ) : (
                <div className="resource-grid">
                  {c.resources.map((r, i) => (
                    <a key={i} className="resource-card" href={r.url} target="_blank" rel="noopener noreferrer">
                      <div className="kind">{r.type === "video" ? "▶ Video / 课程" : "▣ Book / 教材"}</div>
                      <div className="rt">{r.title}</div>
                    </a>
                  ))}
                </div>
              )}
            </section>

            <section id="s-papers" className="cs-block">
              <h2><span className="idx">05</span> <span className="cn">必读论文 / Papers</span></h2>
              {c.papers.length === 0 ? (
                <p style={{ color: "var(--muted)" }}>本课为基础课程,以教材为主。</p>
              ) : c.papers.map((p, i) => (
                <a key={i} className="paper" href={p.url} target="_blank" rel="noopener noreferrer">
                  <span className="ref">[{String(i+1).padStart(2,"0")}]</span>
                  <span className="pt">{p.title}</span>
                  <span className="venue">{p.venue}</span>
                </a>
              ))}
            </section>

            <section id="s-assignments" className="cs-block">
              <h2><span className="idx">06</span> <span className="cn">作业与项目 / Assignments</span></h2>
              <ol className="list-ordered">
                {c.assignments.map((a, i) => <li key={i}>{a}</li>)}
              </ol>
            </section>

            <section id="s-checklist" className="cs-block">
              <h2><span className="idx">07</span> <span className="cn">自测清单 / Self-check</span></h2>
              <ul className="checklist">
                {c.checklist.map((q, i) => <li key={i}>{q}</li>)}
              </ul>
            </section>

            {/* navigate prev/next */}
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 80, paddingTop: 24, borderTop: "1px solid var(--ink)" }}>
              {prev ? (
                <button className="btn" onClick={() => nav(`#/c/${prev.id}`)}>← {prev.zh}</button>
              ) : <span />}
              {next ? (
                <button className="btn btn-primary" onClick={() => nav(`#/c/${next.id}`)}>{next.zh} →</button>
              ) : (
                <button className="btn btn-primary" onClick={() => nav(`#/m/${m.id}`)}>回到 {m.code} →</button>
              )}
            </div>
            </div>
          </article>

          {/* RIGHT ASIDE */}
          <aside className="course-aside">
            <div className="row"><span className="k">CODE</span><span className="v mono">{c.code}</span></div>
            <div className="row"><span className="k">MODULE</span><span className="v">{m.code}</span></div>
            <div className="row"><span className="k">CREDITS</span><span className="v">{c.credits}</span></div>
            <div className="row"><span className="k">DURATION</span><span className="v">{c.weeks} 周</span></div>
            <div className="row"><span className="k">PREREQ</span><span className="v">{c.prereq.length || "—"}</span></div>
            <div className="row"><span className="k">PAPERS</span><span className="v">{c.papers.length}</span></div>
            <div className="row"><span className="k">PROJECTS</span><span className="v acc">{c.assignments.length}</span></div>

            <button
              className={`toggle-done ${isDone ? "done" : ""}`}
              onClick={() => toggleProgress(c.id)}
            >
              <span>{isDone ? "✓ 已完成" : "□ 标记完成"}</span>
              <span style={{ opacity: 0.6 }}>☁ Firebase</span>
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
};

// ============== ABOUT ==============
const AboutPage = ({ nav }) => (
  <div className="page">
    <div className="container">
      <div className="breadcrumb">
        <a onClick={() => nav("#/")}>首页</a>
        <span className="sep">/</span>
        <span style={{ color: "var(--ink)" }}>About</span>
      </div>

      <section style={{ padding: "60px 0 0" }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--muted)" }}>ABOUT · 关于</div>
        <h1 style={{
          fontFamily: "Noto Serif SC, serif",
          fontSize: "clamp(48px, 8vw, 110px)",
          fontWeight: 500,
          lineHeight: 0.95,
          margin: "16px 0 0",
          letterSpacing: "-0.02em"
        }}>
          为什么<span style={{ color: "var(--accent)" }}>自己学</span>?
        </h1>
        <div style={{ fontFamily: "var(--f-display)", fontStyle: "italic", fontSize: 36, color: "var(--muted)", marginTop: 12 }}>
          Because the textbook isn't keeping up.
        </div>
      </section>

      <div className="about-grid">
        <div>
          <h3><span className="cn">这是什么</span></h3>
          <p>
            一个面向有编程背景的自学者的 AI 路线图。我们把通常需要 2 年完成的硕士级课程拆成
            <strong> 4 个模块、16 门课、120 学分</strong>,每门课配置教材、视频、论文、作业与自测。
          </p>
          <p>
            不卖课、不收钱、不发证书。它只是一份你可以打开、关上、再打开的地图。
          </p>
        </div>
        <div>
          <h3><span className="cn">如何使用</span></h3>
          <p>
            <strong>1.</strong> 从首页路线图开始,看完 16 门课的位置与依赖。<br/>
            <strong>2.</strong> 选一门感兴趣的课,把它的资源清单走完。<br/>
            <strong>3.</strong> 完成作业,勾选「已完成」。进度按账号保存在云端(Firebase),登录后自动跨设备同步;未登录时暂存本地。<br/>
            <strong>4.</strong> 如果某门课让你卡住,回到它的先修补一补;如果某门课你已经会了,直接跳过。
          </p>
        </div>
        <div>
          <h3><span className="cn">如何贡献</span></h3>
          <p>
            内容由 Markdown 驱动,源代码托管在 GitHub。提 PR 修订一条论文链接、补充一个新教材、纠正一条作业描述——
            都是有价值的贡献。
          </p>
        </div>
        <div>
          <h3><span className="cn">不承诺什么</span></h3>
          <p>
            不承诺你学完能进 OpenAI、不承诺这套路线 5 年不过时、也不承诺 ChatGPT 能替你做完。
            它能做的,只是把你愿意付出的时间用在更有效的地方。
          </p>
        </div>
      </div>

      <footer className="footer">
        <span>AI 自学成才</span>
        <span>v0.3 · 2026</span>
        <span>MIT License</span>
      </footer>
    </div>
  </div>
);

window.HomePage = HomePage;
window.ModulePage = ModulePage;
window.CoursePage = CoursePage;
window.AboutPage = AboutPage;
