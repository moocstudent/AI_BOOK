/* =========================================================
   App — Router · Theme · Tweaks · Progress storage
   ========================================================= */

const STORAGE_KEY = "ai_self_taught_v1";
const THEME_KEY = "ai_self_taught_theme";

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#ff4d1f",
  "primary": "#0e3a3a",
  "showRoadmapBg": true,
  "compactCourseRows": false,
  "displayFont": "Instrument Serif"
}/*EDITMODE-END*/;

function useHashRoute() {
  const [hash, setHash] = React.useState(window.location.hash || "#/");
  React.useEffect(() => {
    const onHash = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return [hash, (h) => { window.location.hash = h; window.scrollTo({ top: 0 }); }];
}

// Progress storage:
//  - logged in  → Firebase RTDB  /progress/<uid>  (cross-device, per account)
//  - guest / offline → localStorage fallback
function useProgress(user) {
  const uid = user ? user.uid : null;
  const [progress, setProgress] = React.useState({});

  React.useEffect(() => {
    if (!uid) {
      try { setProgress(JSON.parse(localStorage.getItem("ai_progress__guest")) || {}); }
      catch (e) { setProgress({}); }
      return;
    }
    let ref = null, handler = null, alive = true;
    (async () => {
      const ok = await window.__FIREBASE_READY__;
      if (!alive) return;
      if (!ok || typeof firebase === "undefined" || !firebase.database) {
        try { setProgress(JSON.parse(localStorage.getItem("ai_progress__" + uid)) || {}); }
        catch (e) { setProgress({}); }
        return;
      }
      ref = firebase.database().ref("progress/" + uid);
      handler = ref.on("value",
        (snap) => { if (alive) setProgress(snap.val() || {}); },
        (err) => console.error("[progress] read failed:", err && err.code, err && err.message));
    })();
    return () => { alive = false; if (ref && handler) ref.off("value", handler); };
  }, [uid]);

  const toggle = (id) => {
    if (!uid || typeof firebase === "undefined" || !firebase.database) {
      setProgress((p) => {
        const next = { ...p };
        if (next[id]) delete next[id]; else next[id] = true;
        try { localStorage.setItem(uid ? "ai_progress__" + uid : "ai_progress__guest", JSON.stringify(next)); } catch (e) {}
        return next;
      });
      return;
    }
    const turningOff = !!progress[id];
    // Optimistic UI: state flips immediately so the click is visible even if
    // the listener is slow/blocked. The .on('value') listener will reconcile
    // to server truth; if the write fails (rules/App Check), we revert below.
    setProgress((p) => {
      const next = { ...p };
      if (turningOff) delete next[id]; else next[id] = true;
      return next;
    });
    firebase.database().ref("progress/" + uid + "/" + id).set(turningOff ? null : true)
      .catch((e) => {
        console.error("[progress] write failed:", e && e.code, e && e.message);
        setProgress((p) => {
          const next = { ...p };
          if (turningOff) next[id] = true; else delete next[id];
          return next;
        });
      });
  };

  const reset = () => {
    if (!uid || typeof firebase === "undefined" || !firebase.database) {
      setProgress({});
      try { localStorage.removeItem("ai_progress__guest"); } catch (e) {}
      return;
    }
    firebase.database().ref("progress/" + uid).remove()
      .catch((e) => console.error("[progress] reset failed:", e && e.code));
  };

  const markAll = () => {
    if (!uid || typeof firebase === "undefined" || !firebase.database) return;
    const seed = {};
    COURSES.forEach((c) => { seed[c.id] = true; });
    firebase.database().ref("progress/" + uid).set(seed)
      .catch((e) => console.error("[progress] markAll failed:", e && e.code));
  };

  return [progress, toggle, reset, markAll];
}

function useTheme() {
  const [theme, setTheme] = React.useState(() => {
    return localStorage.getItem(THEME_KEY) || "light";
  });
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);
  return [theme, () => setTheme(t => t === "light" ? "dark" : "light")];
}

const Nav = ({ progress, theme, toggleTheme, nav, route, auth, onLogin }) => {
  const done = Object.values(progress).filter(Boolean).length;
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="nav">
      <div className="nav-brand" onClick={() => nav("#/")}>
        <span className="mark">AI/16</span>
        <span>self-taught.</span>
      </div>
      <nav className="nav-links">
        <a className={route === "home" ? "active" : ""} onClick={() => nav("#/")}>路线图</a>
        {MODULES.map((m) => (
          <a key={m.id} className={route === "module" && window.location.hash.includes(m.id) ? "active" : ""} onClick={() => nav(`#/m/${m.id}`)}>
            {m.code}
          </a>
        ))}
        <a className={route === "about" ? "active" : ""} onClick={() => nav("#/about")}>关于</a>
      </nav>
      <div className="nav-right">
        {auth.user && (
          <div className="progress-chip" title="完成进度">
            <span className="dot">{done}</span>
            <span>/ {COURSES.length} 课</span>
          </div>
        )}
        <button className="icon-btn" onClick={toggleTheme} title="切换主题">
          {theme === "light" ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
          )}
        </button>
        {auth.user ? (
          <div ref={menuRef} style={{ position: "relative" }}>
            <button className="user-chip" onClick={() => setMenuOpen(o => !o)}>
              <span className="avatar">{auth.user.name.slice(0,1).toUpperCase()}</span>
              <span>{auth.user.name}</span>
            </button>
            {menuOpen && (
              <div className="user-menu">
                <div className="um-head">
                  <div className="nm">{auth.user.name}</div>
                  <div className="em">{auth.user.email}</div>
                </div>
                <button onClick={() => { setMenuOpen(false); nav("#/about"); }}>关于本站</button>
                <button onClick={() => { setMenuOpen(false); auth.logout(); }}>登出 · sign out</button>
              </div>
            )}
          </div>
        ) : (
          <button className="login-cta" onClick={() => onLogin("login")}>登录 / 注册</button>
        )}
      </div>
    </header>
  );
};

const App = () => {
  const [hash, nav] = useHashRoute();
  const auth = useAuth();
  const [progress, toggleProgress, resetProgress, markAllDone] = useProgress(auth.user);
  const [theme, toggleTheme] = useTheme();
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Auth modal state
  const [authModal, setAuthModal] = React.useState({ open: false, mode: "login", courseHint: null });
  const openLogin = (mode = "login", courseHint = null) => setAuthModal({ open: true, mode, courseHint });
  const closeLogin = () => setAuthModal({ open: false, mode: "login", courseHint: null });

  // Apply tweak vars
  React.useEffect(() => {
    document.documentElement.style.setProperty("--accent", tweaks.accent);
    document.documentElement.style.setProperty("--primary", tweaks.primary);
    const cssFamily = (() => {
      switch (tweaks.displayFont) {
        case "Newsreader":   return `"Newsreader", "Noto Serif SC", serif`;
        case "Fraunces":     return `"Fraunces", "Noto Serif SC", serif`;
        case "EB Garamond":  return `"EB Garamond", "Noto Serif SC", serif`;
        default:             return `"Instrument Serif", "Noto Serif SC", serif`;
      }
    })();
    document.documentElement.style.setProperty("--f-display", cssFamily);
  }, [tweaks]);

  // Parse route
  let route = "home";
  let courseId = null, moduleId = null;
  if (hash.startsWith("#/c/")) { route = "course"; courseId = hash.slice(4); }
  else if (hash.startsWith("#/m/")) { route = "module"; moduleId = hash.slice(4); }
  else if (hash === "#/about") { route = "about"; }

  const screenLabel = (() => {
    if (route === "home") return "01 Home · 路线图";
    if (route === "module") {
      const m = MODULES.find(x => x.id === moduleId);
      return m ? `02 Module · ${m.code} ${m.zh}` : "02 Module";
    }
    if (route === "course") {
      const c = COURSES.find(x => x.id === courseId);
      return c ? `03 Course · ${c.code} ${c.zh}` : "03 Course";
    }
    return "04 About";
  })();

  return (
    <div data-screen-label={screenLabel}>
      <Nav progress={progress} theme={theme} toggleTheme={toggleTheme} nav={nav} route={route} auth={auth} onLogin={(mode) => openLogin(mode)} />
      <div className="running-label">{screenLabel} · AI / 16 · self-taught · 2026</div>
      {route === "home" && <HomePage progress={progress} toggleProgress={toggleProgress} nav={nav} user={auth.user} onLogin={openLogin} />}
      {route === "module" && <ModulePage moduleId={moduleId} progress={progress} toggleProgress={toggleProgress} nav={nav} user={auth.user} onLogin={openLogin} />}
      {route === "course" && (
        auth.user
          ? <CoursePage courseId={courseId} progress={progress} toggleProgress={toggleProgress} nav={nav} />
          : (() => {
              const c = COURSES.find(x => x.id === courseId);
              if (!c) return <div className="container" style={{ padding: 80 }}>未找到课程。</div>;
              const m = MODULES.find(x => x.id === c.moduleId);
              return (
                <div className="container">
                  <div className="breadcrumb">
                    <a onClick={() => nav("#/")}>首页</a>
                    <span className="sep">/</span>
                    <a onClick={() => nav(`#/m/${m.id}`)}>{m.code} {m.zh}</a>
                    <span className="sep">/</span>
                    <span style={{ color: "var(--ink)" }}>{c.code}</span>
                  </div>
                  <LoginGate course={c} onOpen={(mode) => openLogin(mode, c.zh)} />
                </div>
              );
            })()
      )}
      {route === "about" && <AboutPage nav={nav} />}

      <AuthModal
        open={authModal.open}
        mode={authModal.mode}
        onModeChange={(m) => setAuthModal(s => ({ ...s, mode: m }))}
        onClose={closeLogin}
        auth={auth}
        courseHint={authModal.courseHint}
      />

      <TweaksPanel title="Tweaks">
        <TweakSection label="主题色 · Theme">
          <TweakColor
            label="强调色 / Accent"
            value={tweaks.accent}
            onChange={(v) => setTweak("accent", v)}
            options={["#ff4d1f", "#0e3a3a", "#c2185b", "#5b3df5", "#1f7a3a"]}
          />
          <TweakColor
            label="主色 / Primary"
            value={tweaks.primary}
            onChange={(v) => setTweak("primary", v)}
            options={["#0e3a3a", "#1a1a1a", "#0e2a5b", "#5a2d1f"]}
          />
        </TweakSection>
        <TweakSection label="字体 · Type">
          <TweakSelect
            label="标题衬线"
            value={tweaks.displayFont}
            onChange={(v) => setTweak("displayFont", v)}
            options={["Instrument Serif", "Newsreader", "Fraunces", "EB Garamond"]}
          />
        </TweakSection>
        <TweakSection label="数据 · Data">
          <TweakButton label="清空学习进度 · Reset" onClick={resetProgress} />
          <TweakButton label="标记全部完成 · All done" secondary onClick={() => {
            if (!auth.user) { openLogin("login"); return; }
            markAllDone();
          }} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
