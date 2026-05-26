/* =========================================================
   Auth — Firebase Authentication (email / password)
   ---------------------------------------------------------
   Firebase is initialized by firebase-init.js (it decrypts the
   config first). useAuth() waits for window.__FIREBASE_READY__,
   then subscribes to auth state. The component API is unchanged:
   { user, error, setError, register, login, logout, ready }.

   - Account + credentials: handled by Firebase (cloud).
   - Per-user learning progress: still localStorage, keyed by email
     (see useProgress in app.jsx). Not synced across devices.
   ========================================================= */

function mapUser(u) {
  if (!u) return null;
  return {
    uid: u.uid,
    email: u.email,
    name: u.displayName || (u.email ? u.email.split("@")[0] : "学习者"),
  };
}

function authErrorMessage(code) {
  switch (code) {
    case "auth/invalid-email":         return "邮箱格式不对";
    case "auth/missing-password":
    case "auth/weak-password":         return "密码至少 6 位";
    case "auth/email-already-in-use":  return "该邮箱已注册,请直接登录";
    case "auth/user-not-found":        return "找不到该用户,请先注册";
    case "auth/wrong-password":
    case "auth/invalid-credential":    return "邮箱或密码错误";
    case "auth/too-many-requests":     return "尝试过于频繁,请稍后再试";
    case "auth/network-request-failed":return "网络异常,请检查连接";
    case "auth/operation-not-allowed": return "邮箱登录未启用 — 需在 Firebase 控制台 Authentication 里开启 Email/Password";
    case "auth/configuration-not-found":
                                       return "认证未配置 — 请检查 Firebase 设置与授权域名";
    default:                           return "操作失败:" + (code || "未知错误");
  }
}

function useAuth() {
  const [user, setUser]   = React.useState(null);
  const [error, setError] = React.useState(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    let unsub = null;
    let alive = true;
    (async () => {
      const ok = await window.__FIREBASE_READY__;
      if (!alive) return;
      if (!ok) {
        setReady(true);
        setError("认证服务未就绪:配置未解锁(本地缺少 firebase-key.local.js,或线上未 unlock)");
        return;
      }
      unsub = firebase.auth().onAuthStateChanged((u) => {
        setUser(mapUser(u));
        setReady(true);
      });
    })();
    return () => { alive = false; if (unsub) unsub(); };
  }, []);

  const ensureReady = async () => {
    const ok = await window.__FIREBASE_READY__;
    if (!ok) { setError("认证服务未就绪,请稍后重试"); return false; }
    return true;
  };

  const register = async ({ email, name, password }) => {
    setError(null);
    email = (email || "").trim().toLowerCase();
    if (!email || !email.includes("@")) { setError("邮箱格式不对"); return false; }
    if (!password || password.length < 6) { setError("密码至少 6 位"); return false; }
    if (!(await ensureReady())) return false;
    try {
      const cred = await firebase.auth().createUserWithEmailAndPassword(email, password);
      if (name && cred.user) {
        try { await cred.user.updateProfile({ displayName: name }); } catch (e) {}
      }
      setUser(mapUser(firebase.auth().currentUser));
      return true;
    } catch (e) {
      setError(authErrorMessage(e.code));
      return false;
    }
  };

  const login = async ({ email, password }) => {
    setError(null);
    email = (email || "").trim().toLowerCase();
    if (!email || !password) { setError("请输入邮箱和密码"); return false; }
    if (!(await ensureReady())) return false;
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      return true;
    } catch (e) {
      setError(authErrorMessage(e.code));
      return false;
    }
  };

  const logout = async () => {
    try { await firebase.auth().signOut(); } catch (e) {}
    setUser(null);
  };

  return { user, error, setError, register, login, logout, ready };
}

/* ============== Auth Modal ============== */

const AuthModal = ({ open, onClose, mode = "login", onModeChange, auth, courseHint }) => {
  const [form, setForm] = React.useState({ email: "", name: "", password: "" });
  const [busy, setBusy] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      auth.setError(null);
      setForm({ email: "", name: "", password: "" });
      setBusy(false);
    }
  }, [open, mode]);

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    const ok = mode === "login" ? await auth.login(form) : await auth.register(form);
    setBusy(false);
    if (ok) onClose();
  };

  return (
    <div className="auth-backdrop" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-x" onClick={onClose} aria-label="关闭">×</button>

        <div className="auth-left">
          <div className="auth-eyebrow">
            <span className="swatch" />
            <span>{mode === "login" ? "WELCOME BACK" : "JOIN THE COHORT"}</span>
          </div>
          <h2 className="auth-title">
            {mode === "login" ? (
              <><span className="cn">登入。</span><br/><em>resume.</em></>
            ) : (
              <><span className="cn">注册。</span><br/><em>begin.</em></>
            )}
          </h2>
          <p className="auth-blurb">
            {courseHint
              ? <>你正要打开 <strong>《{courseHint}》</strong> 的细节——讲义、必读论文、作业与自测清单。这部分对登录用户开放。</>
              : <>登录后可解锁全部课程的讲义、论文清单与作业。账号由 <strong>Firebase</strong> 托管,你的学习进度保存在本机浏览器。</>
            }
          </p>

          <ul className="auth-bullets">
            <li><span className="b-mark">▣</span> 解锁全部课程的细节</li>
            <li><span className="b-mark">▣</span> 进度按账号本地保存</li>
            <li><span className="b-mark">▣</span> 账号由 Firebase 安全托管</li>
          </ul>
        </div>

        <form className="auth-right" onSubmit={submit}>
          <div className="auth-tabs">
            <button type="button"
              className={mode === "login" ? "active" : ""}
              onClick={() => onModeChange("login")}>登录 / login</button>
            <button type="button"
              className={mode === "register" ? "active" : ""}
              onClick={() => onModeChange("register")}>注册 / register</button>
          </div>

          {mode === "register" && (
            <label className="auth-field">
              <span>显示名 · Name</span>
              <input
                type="text" required
                placeholder="e.g. 自学者"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>
          )}

          <label className="auth-field">
            <span>邮箱 · Email</span>
            <input
              type="email" required autoFocus
              placeholder="student@edu.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>

          <label className="auth-field">
            <span>密码 · Password {mode === "register" && <em style={{opacity:.55}}>(≥ 6 位)</em>}</span>
            <input
              type="password" required
              placeholder="••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </label>

          {auth.error && (
            <div className="auth-error">⚠ {auth.error}</div>
          )}

          <button type="submit" className="btn btn-accent" disabled={busy}
            style={{ marginTop: 16, justifyContent: "center", opacity: busy ? 0.7 : 1 }}>
            {busy ? "请稍候…" : (mode === "login" ? "登录 →" : "注册并登录 →")}
          </button>

          <div className="auth-note">
            ⚠ 使用邮箱 + 密码注册。账号与登录由 Firebase 处理,仅用于保存学习进度。
          </div>
        </form>
      </div>
    </div>
  );
};

/* ============== Locked overlay for course detail ============== */

const LoginGate = ({ course, onOpen }) => {
  const m = MODULES.find(mm => mm.id === course.moduleId);
  return (
    <div className="lockwall">
      <div className="lockwall-bg" aria-hidden="true">
        <div className="lockwall-zh">{course.zh}</div>
        <div className="lockwall-en">{course.en}.</div>
      </div>
      <div className="lockwall-card">
        <div className="lock-eyebrow mono">
          <span>⌥</span>
          <span>LOCKED · 需要登录</span>
        </div>
        <div className="lock-code mono">{course.code} · {m.zh}</div>
        <h3 className="lock-title">
          <span className="cn">这一页对登录用户开放。</span>
          <br/>
          <em>You're seeing the catalog. The real notes are behind a free login.</em>
        </h3>
        <p className="lock-body">
          游客可以查看路线图、模块概览与课程清单。<strong>讲义、必读论文、作业与自测清单</strong>需要登录——
          账号与登录由 Firebase 处理,仅用于按账号保存你的学习进度。
        </p>
        <div className="lock-cta">
          <button className="btn btn-accent" onClick={() => onOpen("login")}>已注册 · 登录</button>
          <button className="btn" onClick={() => onOpen("register")}>新来的 · 注册</button>
        </div>
        <div className="lock-meta mono">
          <div><span>SECTIONS</span><strong>07</strong></div>
          <div><span>PAPERS</span><strong>{course.papers.length}</strong></div>
          <div><span>PROJECTS</span><strong>{course.assignments.length}</strong></div>
          <div><span>WEEKS</span><strong>{course.weeks}</strong></div>
        </div>
      </div>
    </div>
  );
};

window.useAuth = useAuth;
window.AuthModal = AuthModal;
window.LoginGate = LoginGate;
