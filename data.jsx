// 课程体系数据 —— 4 模块 / 20 门课
// 所有 resources/papers URL 均经过 WebFetch 实际核验(2026-05-26);
// 全部为开源/免费合法资源(官方课程、作者免费书、开源教材、arXiv、CC 授权);
// 原版权书已替换为同主题的开源/免费替代。前端对 url:null 仍兼容(.nolink 灰态)。

const MODULES = [
  {
    id: "m1",
    code: "M01",
    zh: "数理基础",
    en: "Mathematical Foundations",
    tagline: "把 AI 的语法学会,才能听懂它说什么。",
    description:
      "线性代数 · 多元微积分 · 概率统计 · 信息论。重点不是做题,而是把每一个公式翻译成几何与计算图上的直觉。",
    weeks: "22 ~ 28 周",
    credits: 28,
    accent: "primary",
  },
  {
    id: "m2",
    code: "M02",
    zh: "编程与系统",
    en: "Programming & Systems",
    tagline: "模型不只是数学,它在物理世界里跑。",
    description:
      "算法、数据结构、并行与分布式、GPU 与 ML 系统、MLOps。构建从单机到集群、再到生产环境跑模型的全栈工程能力。",
    weeks: "25 ~ 32 周",
    credits: 34,
    accent: "primary",
  },
  {
    id: "m3",
    code: "M03",
    zh: "机器学习与深度学习",
    en: "Machine Learning & Deep Learning",
    tagline: "核心引擎:从感知机到扩散模型的全部肌肉。",
    description:
      "经典机器学习、深度学习、强化学习、概率图模型、生成式 AI。每门课对应一类范式,论文阅读与复现是主线。",
    weeks: "28 ~ 36 周",
    credits: 39,
    accent: "primary",
  },
  {
    id: "m4",
    code: "M04",
    zh: "前沿与应用",
    en: "Frontiers & Applications",
    tagline: "把武器装上,走进真实的研究现场。",
    description:
      "NLP、CV、大语言模型、AI 安全与对齐、大模型应用工程、研究方法与 Capstone。读 2018-2025 的关键论文,做端到端的项目。",
    weeks: "30 ~ 40 周",
    credits: 43,
    accent: "accent",
  },
];

const COURSES = [
  // ============ Module 1: 数理基础 ============
  {
    id: "c101",
    code: "CS-101",
    moduleId: "m1",
    zh: "线性代数",
    en: "Linear Algebra",
    credits: 7,
    weeks: 6,
    prereq: [],
    tag: "必修",
    goal:
      "把矩阵从「数表」升级为「线性变换」,理解特征分解、SVD、伪逆、正交投影背后的几何与算法。",
    body: `**线性代数是机器学习的母语。** 你之后会反复遇到的每一个对象——一张图片、一段文本的嵌入、一个神经网络的权重——本质上都是向量与矩阵;而训练、降维、注意力机制,本质上都是在对这些矩阵做变换。如果把矩阵只当成"数字表格",很多算法会显得像魔法;一旦你能把它看成**空间里的线性变换**,它们就变成了直觉。

这门课的主线,是从"解方程"走向"看变换"。前半程你会重新理解向量空间、基与四个基本子空间——它们回答的是"一个矩阵能把空间映到哪里、又把什么压扁成零"。后半程进入**特征分解**与 **SVD**:前者解释一个变换的"固有方向",后者把任意矩阵拆成"旋转—拉伸—旋转",是 PCA、推荐系统、低秩压缩共同的数学内核。

### 怎么学最有效

别陷在手算行列式里。每学一个概念,都用 NumPy 把它"画"出来——对一张图片做 SVD、看奇异值衰减、把协方差矩阵的特征向量叠在散点图上。当你能对着一个矩阵说出"它在空间里做了什么",这门课就通了。

最常见的坑,是跳过几何直觉、直接背公式——那样到了深度学习里会处处卡壳。建议先用 **3Blue1Brown** 的可视化建立直觉,再用 **MIT 18.06** 补严谨性,两者配合效率最高。`,
    outline: [
      "向量空间 · 子空间 · 基与维度",
      "线性变换的四个基本子空间",
      "特征值 · 特征向量 · 谱定理",
      "SVD 与低秩近似",
      "正定矩阵与二次型",
      "数值稳定性与条件数",
    ],
    resources: [
      { type: "video", title: "MIT 18.06 — Gilbert Strang", url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/" },
      { type: "book",  title: "Mathematics for Machine Learning (Ch.2-4)", url: "https://mml-book.github.io/" },
      { type: "video", title: "MIT 18.065 — Matrix Methods (Strang)", url: "https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/" },
      { type: "book",  title: "Introduction to Applied Linear Algebra (VMLS) · Boyd & Vandenberghe", url: "https://web.stanford.edu/~boyd/vmls/" },
    ],
    papers: [
      { title: "Singular Value Decomposition (SVD) — 几何直觉详解", venue: "Gregory Gundersen, 2018", url: "https://gregorygundersen.com/blog/2018/12/10/svd/" },
    ],
    assignments: [
      "手写实现 PCA 与 SVD,并在 MNIST 上对比 sklearn",
      "推导并实现最小二乘 normal equation vs QR 分解",
      "用 SVD 做图像压缩,可视化奇异值衰减",
    ],
    checklist: [
      "能不查公式写出 SVD 的几何解释",
      "解释为什么 PCA 等价于协方差矩阵的特征分解",
      "知道何时该用 LU / QR / Cholesky / SVD",
    ],
  },
  {
    id: "c102",
    code: "CS-102",
    moduleId: "m1",
    zh: "多元微积分与最优化",
    en: "Multivariate Calculus & Optimization",
    credits: 7,
    weeks: 6,
    prereq: ["c101"],
    tag: "必修",
    goal:
      "梯度 · 雅可比 · Hessian 的真正含义;凸优化基本理论与一阶/二阶方法的工程取舍。",
    body: `**微积分是机器学习的"方向感"。** 你在训练任何模型时,核心问题只有一个:如何让损失函数下降得又快又稳?回答这个问题,需要你真正理解梯度——它不只是"导数的向量版",而是在告诉你:在当前这个点,哪个方向让函数上升最陡。把这个几何感建立起来,后面的优化器才不会像黑盒。

这门课的主线,是从**多元链式法则**出发,打通它与**反向传播**的等价性——你会发现 BP 算法本质上就是一次精心组织的链式求导。然后课程进入**凸优化**的核心地带:凸集、凸函数的判定,以及一阶方法(**梯度下降**、**SGD**、**Momentum**、**Adam**)为什么在工程上比二阶方法更受欢迎。最后通过**拉格朗日对偶**和 **KKT 条件**理解约束优化的语言——这是你读 SVM、RLHF 相关论文时绕不开的基础。

### 怎么学最有效

先跟 **MIT 18.02** 把多元微分的几何直觉建好,再读 **Boyd 凸优化**前几章理解凸性的结构意义。学优化器时不要停留在"Adam 比 SGD 好"的结论,而要问:为什么**自适应学习率**在稀疏梯度上有优势?用 **PyTorch** 手写一遍梯度下降、把梯度值打印出来对照公式,直觉会快很多。

最常见的坑是把"学会求偏导"当成目标,其实导数只是工具,**凸性与非凸性的区别**才是你要真正关心的事:深度学习的损失面几乎不是凸的,所以局部极小值、鞍点、学习率调度这些话题才有意思。带着"为什么"去学,比刷题快得多。`,
    outline: [
      "多元链式法则与反向传播的等价性",
      "凸集 · 凸函数 · 凸优化基本性质",
      "梯度下降族:SGD / Momentum / Adam",
      "拉格朗日对偶与 KKT 条件",
      "牛顿法 · 拟牛顿 · L-BFGS",
      "约束优化与投影梯度",
    ],
    resources: [
      { type: "video", title: "Stanford EE364A — Boyd Convex Optimization", url: "https://web.stanford.edu/class/ee364a/" },
      { type: "book",  title: "Convex Optimization · Boyd & Vandenberghe", url: "https://web.stanford.edu/~boyd/cvxbook/" },
      { type: "video", title: "MIT 18.02 — Multivariable Calculus", url: "https://ocw.mit.edu/courses/18-02-multivariable-calculus-fall-2007/" },
      { type: "book",  title: "Mathematics for Machine Learning (Ch.5-7)", url: "https://mml-book.github.io/" },
    ],
    papers: [
      { title: "Adam: A Method for Stochastic Optimization", venue: "ICLR 2015", url: "https://arxiv.org/abs/1412.6980" },
      { title: "An Overview of Gradient Descent Optimization Algorithms", venue: "Ruder, 2016", url: "https://arxiv.org/abs/1609.04747" },
    ],
    assignments: [
      "用 numpy 从零实现反向传播(标量、向量、张量三个版本)",
      "实现并对比 SGD / Momentum / Adam 在 Rosenbrock 上的轨迹",
      "在凸 QP 上用 CVXPY 求解并验证 KKT 条件",
    ],
    checklist: [
      "看到任何 loss 函数,能徒手画出梯度场",
      "解释 Adam 的偏置修正项为何存在",
      "能判断一个优化问题是否凸",
    ],
  },
  {
    id: "c103",
    code: "CS-103",
    moduleId: "m1",
    zh: "概率论与数理统计",
    en: "Probability & Mathematical Statistics",
    credits: 7,
    weeks: 6,
    prereq: ["c101"],
    tag: "必修",
    goal: "测度直觉、极大似然、贝叶斯推断、集中不等式——为后面 ML 提供概率语言。",
    body: `**概率论是机器学习的"不确定性语言"。** 模型从来不输出"确定答案",它输出的是**分布**——某个类别的概率、某段文本的似然、某个预测的置信区间。如果你对概率只有高中水平的直觉,读 ML 论文时会像在看天书:损失函数为什么是负对数似然?正则化为什么等价于先验?这门课就是给你补上这套语言。

课程从**概率空间与随机变量**出发,建立严谨但不绕弯的直觉,然后系统梳理常见**分布族**——高斯、伯努利、Dirichlet——以及它们为什么会成为彼此的**共轭先验**。核心枢纽是三种推断范式的对比:**MLE**、**MAP** 与完整的**贝叶斯推断**,你会看到它们本质上是同一条公式在不同假设下的变体。接着 **EM 算法**用"隐变量"的视角把很多看似无关的方法统一起来。后半段的**集中不等式**(Markov、Chebyshev、Hoeffding)则是泛化理论的基石。

### 怎么学最有效

推荐用 **Seeing Theory** 把分布与贝叶斯更新可视化一遍,再跟 **MIT 6.012** 把公式的来龙去脉理清楚。学 MLE 时一定要亲手推导一次高斯分布的参数估计,感受"最大化似然"和"最小化均方误差"在这里为何是同一件事。

最常见的坑是把概率当"频率"来理解,碰到贝叶斯就蒙圈。建议一开始就把"概率是对不确定性的度量"这个信念装进去,先验和后验就会变得非常自然。**假设检验**与 **Bootstrap** 不要跳过——它们是你判断"模型改进是否显著"的实用工具。`,
    outline: [
      "概率空间 · 随机变量 · 期望与方差",
      "常见分布族与共轭先验",
      "极大似然 · MAP · 贝叶斯",
      "EM 算法",
      "集中不等式:Markov / Chebyshev / Hoeffding",
      "假设检验 · Bootstrap",
    ],
    resources: [
      { type: "video", title: "MIT RES.6-012 — Introduction to Probability (Tsitsiklis)", url: "https://ocw.mit.edu/courses/res-6-012-introduction-to-probability-spring-2018/" },
      { type: "video", title: "MIT 18.650 — Statistics for Applications (Rigollet)", url: "https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/" },
      { type: "video", title: "Seeing Theory — Brown University (交互可视化)", url: "https://seeing-theory.brown.edu/" },
      { type: "book",  title: "Mathematics for Machine Learning (Ch.6)", url: "https://mml-book.github.io/" },
      { type: "book",  title: "Think Stats (2nd ed.) · Allen Downey (开源)", url: "https://greenteapress.com/thinkstats2/thinkstats2.pdf" },
    ],
    papers: [
      { title: "Variational Inference: A Review for Statisticians", venue: "JASA 2017", url: "https://arxiv.org/abs/1601.00670" },
    ],
    assignments: [
      "推导 GMM 的 EM 更新并在合成数据上实现",
      "Bootstrap 实现 95% 置信区间并与解析解对比",
    ],
    checklist: [
      "区分频率派与贝叶斯派在「参数」上的语义差异",
      "能写出 EM 的 E 步与 M 步的一般形式",
    ],
  },
  {
    id: "c104",
    code: "CS-104",
    moduleId: "m1",
    zh: "信息论",
    en: "Information Theory",
    credits: 7,
    weeks: 5,
    prereq: ["c103"],
    tag: "选修",
    goal: "熵、互信息、KL 散度——理解为什么交叉熵是损失函数的默认选项,为 VAE 与扩散模型打基础。",
    body: `**信息论是机器学习的"度量衡"。** 你每次训练分类器都在最小化**交叉熵**,每次读到 VAE 都会碰到 **KL 散度**,扩散模型的证明里也藏着**互信息**的身影——但如果不知道这些概念从哪来、为什么这样定义,用起来就像在念咒语。信息论给你一套自洽的度量体系:信息、不确定性、两个分布之间的距离,全都可以精确地"算"。

这门课以**香农熵**为起点——熵衡量的是"你有多不确定",条件熵、联合熵、**链式法则**是它的自然延伸。**互信息**告诉你两个变量共享了多少信息,**数据处理不等式**则给出一个深刻结论:经过任何处理,信息只会减少不会增加。另一条主线是 **KL 散度**与 **Jensen 不等式**——它们是变分推断、扩散模型数学推导的真正基础。信道容量与编码定理来自 **Shannon 1948** 那篇划时代论文,即使你不做通信,理解"极限在哪里"的思维方式本身就很值钱。

### 怎么学最有效

跟 **MIT 6.441** 的讲义结合 **Shannon 原始论文**是最经典的路线——原文其实写得相当易读。学每个概念时问自己:它在 ML 里对应什么?**Huffman 编码**帮你理解熵为什么是压缩的下界;**率失真理论**帮你理解信息瓶颈方法为何有意义。

最常见的坑是死记 KL 散度的公式却不理解它**不对称**的含义——正向 KL 与反向 KL 在变分推断里会产生完全不同的行为。把这个不对称性用图画出来,直觉就锁住了。`,
    outline: [
      "熵、条件熵、联合熵与链式法则",
      "互信息与数据处理不等式",
      "KL 散度与 Jensen 不等式",
      "信道容量与信道编码定理(Shannon 第二定理)",
      "无损压缩:Huffman / 算术编码 / Lempel-Ziv",
      "率失真理论与有损压缩下界",
    ],
    resources: [
      { type: "video", title: "MIT 6.441 — Information Theory", url: "https://ocw.mit.edu/courses/6-441-information-theory-spring-2016/" },
      { type: "book",  title: "MIT 6.441 Information Theory — Lecture Notes (Polyanskiy & Wu)", url: "https://ocw.mit.edu/courses/6-441-information-theory-spring-2016/pages/lecture-notes/" },
    ],
    papers: [
      { title: "A Mathematical Theory of Communication", venue: "Shannon, 1948", url: "https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf" },
    ],
    assignments: [
      "手推二元对称信道(BSC)的信道容量公式并用 Python 画出 C vs. p 曲线",
      "实现 Huffman 编码器,验证平均码长接近熵下界",
      "用 PyTorch 计算两个高斯分布的 KL 散度,对比解析值",
    ],
    checklist: [
      "能从定义推出 I(X;Y) = H(X) − H(X|Y)",
      "能解释为何 KL 散度非负(Jensen 不等式),及其在 VAE ELBO 中的角色",
      "能写出率失真函数 R(D) 的定义并说明物理意义",
    ],
  },

  // ============ Module 2: 编程与系统 ============
  {
    id: "c201",
    code: "CS-201",
    moduleId: "m2",
    zh: "算法与数据结构",
    en: "Algorithms & Data Structures",
    credits: 7,
    weeks: 6,
    prereq: [],
    tag: "必修",
    goal: "掌握常见算法范式(分治、DP、贪心)及经典图算法,能分析复杂度,理解 NP-完全性归约。",
    body: `**算法是你解决问题时的思维脚手架。** AI 工程师很容易觉得算法课和深度学习关系不大——"不就是调模型嘛"。但真实工作里,数据预处理、图结构建模、搜索剪枝、调度优化,随时都在考验你能不能把问题分解干净、把复杂度控制在可接受的范围。更重要的是,**动态规划**、**贪心**、**图算法**这些范式本身就是思维训练:你会更自然地把大问题拆成子问题、找到递推关系、证明局部最优能导向全局最优。

课程核心是三大范式:**分治**教你递归地把问题砍小;**动态规划**教你识别重叠子问题、用记忆化换时间;**贪心**教你在什么条件下敢于"只看眼前"。图算法是另一个重镇:**BFS/DFS** 是遍历骨架,**Dijkstra** 处理带权最短路,**最小生成树**则是贪心思想的经典战场。后段的**复杂度分析**与 **P-NP** 理论给你全局视野:哪些问题有高效算法,哪些理论上就很难,哪些只能退而求**近似算法**。

### 怎么学最有效

**Jeff Erickson Algorithms** 讲义免费、清晰、例子好,是这门课最佳的文字伴侣;**MIT 6.006** 的视频把分析过程讲得很透。每道题先在纸上画清楚"状态是什么、转移是什么"再写代码——跳过这步直接敲键盘是 DP 学不会的头号原因。

最常见的坑是把算法当题库来背,刷了很多题但换个问法就不会。正确姿势是问"这道题属于哪个范式、为什么",把模式抽出来,而不是把解法记住。`,
    outline: [
      "分治:归并排序、快速选择、主定理",
      "动态规划:最优子结构、背包、序列比对",
      "贪心:最小生成树(Kruskal/Prim)、Huffman",
      "图算法:BFS/DFS、Dijkstra、Bellman-Ford、强连通分量",
      "复杂度分析:摊还分析、P/NP/NP-完全",
      "近似算法:顶点覆盖、TSP 2-近似",
    ],
    resources: [
      { type: "video", title: "MIT 6.006 — Introduction to Algorithms", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/" },
      { type: "video", title: "MIT 6.046J — Design and Analysis of Algorithms", url: "https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/" },
      { type: "video", title: "Princeton Algorithms (Sedgewick) — Coursera", url: "https://www.coursera.org/learn/algorithms-part1" },
      { type: "book",  title: "Algorithms · Jeff Erickson (免费开源书)", url: "https://jeffe.cs.illinois.edu/teaching/algorithms/" },
    ],
    papers: [],
    assignments: [
      "实现 Dijkstra(优先队列版)并对随机图测试正确性与时间复杂度",
      "用 DP 解 LeetCode 编辑距离(72)并写出状态转移方程推导",
      "证明独立集问题 NP-完全(从 3-SAT 归约)并写出归约函数",
    ],
    checklist: [
      "给出任意递归式能用主定理或递归树分析时间复杂度",
      "能写出 Bellman-Ford 更新规则并解释为何可检测负环",
      "能区分 NP-完全与 NP-难,并举例近似算法的近似比",
    ],
  },
  {
    id: "c202",
    code: "CS-202",
    moduleId: "m2",
    zh: "并行与分布式计算",
    en: "Parallel & Distributed Computing",
    credits: 7,
    weeks: 6,
    prereq: ["c201"],
    tag: "必修",
    goal: "理解多核/GPU/集群并行模型,掌握 CAP 与 Raft,能用 Spark 处理大规模数据,了解分布式训练拓扑。",
    body: `**并行与分布式是让计算"跑起来"的工程地基。** 单块 GPU 训不动大模型,单台机器跑不了 PB 级数据——现代 AI 系统的规模决定了你迟早要面对多核、多卡、多机的现实。但并行不是"加机器就好",它有自己的陷阱:通信开销、同步瓶颈、一致性问题。这门课帮你建立一个清醒的直觉:什么时候并行有效,什么时候它在帮倒忙。

课程从**并行模型**出发,用 **Amdahl 定律**给你一盆冷水——串行部分的比例决定了加速的上限,这个上限往往比你想象的低。然后进入分布式系统的核心困境:**CAP 定理**告诉你一致性、可用性、分区容忍不可能同时满足;**Raft 共识协议**是目前最易理解的工程级解法。**MapReduce** 和 **Spark** 是大数据处理的两代范式。课程压轴的**分布式深度学习**把上述概念全部激活:数据并行、张量并行、流水线并行三种拓扑各有适用场景,梯度同步的通信开销是性能调优的主战场。

### 怎么学最有效

**MIT 6.5840**(原 6.824)是这个领域公认最好的课,Raft 的 Lab 实现是"真正理解共识"的最短路径——不写一遍很难有感觉。**Spark** 官方文档加上几个真实数据集的练习,会让你快速理解懒执行和 DAG 调度的价值。

最常见的坑是把并行当成"自动加速"的魔法。每学一个新概念都问:通信在哪里?瓶颈在哪里?同步点在哪里?带着这三个问题看分布式训练的论文,你会发现它们都在反复回答同一组取舍。`,
    outline: [
      "并行模型:Amdahl 定律、数据并行 vs 任务并行、共享内存 vs 消息传递",
      "CAP 定理与一致性级别(线性一致、最终一致)",
      "MapReduce 编程模型与 Shuffle/Sort",
      "Raft 共识:领导选举、日志复制、安全性",
      "Apache Spark:RDD / DataFrame / Catalyst",
      "分布式 DL 训练:数据并行(AllReduce)、张量并行、流水线并行",
    ],
    resources: [
      { type: "video", title: "MIT 6.5840 (原 6.824) — Distributed Systems", url: "https://pdos.csail.mit.edu/6.824/" },
      { type: "book",  title: "Apache Spark 官方文档", url: "https://spark.apache.org/docs/latest/" },
      { type: "video", title: "MIT 6.852J — Distributed Algorithms", url: "https://ocw.mit.edu/courses/6-852j-distributed-algorithms-fall-2009/" },
    ],
    papers: [
      { title: "MapReduce: Simplified Data Processing on Large Clusters", venue: "OSDI 2004", url: "https://storage.googleapis.com/gweb-research2023-media/pubtools/4449.pdf" },
      { title: "In Search of an Understandable Consensus Algorithm (Raft)", venue: "USENIX ATC 2014", url: "https://raft.github.io/raft.pdf" },
      { title: "Efficient Large-Scale Language Model Training on GPU Clusters (Megatron-LM)", venue: "SC 2021", url: "https://arxiv.org/abs/2104.04473" },
    ],
    assignments: [
      "用 PySpark 实现 PageRank,在 Wikipedia 子图上验证收敛",
      "实现 Raft 领导选举(可参考 MIT 6.5840 Lab),通过分区/重启场景测试",
      "用 PyTorch DDP 训练 ResNet-50,记录 1/2/4 GPU 吞吐量与通信开销",
    ],
    checklist: [
      "能用状态机图解释 Raft 领导选举全流程,包括分裂投票处理",
      "能说明 CAP 中 CP vs AP 在网络分区时的行为差异",
      "能解释 Ring-AllReduce 如何在 N 卡同步梯度,通信复杂度多少",
    ],
  },
  {
    id: "c203",
    code: "CS-203",
    moduleId: "m2",
    zh: "GPU 编程与 CUDA",
    en: "GPU Programming with CUDA",
    credits: 7,
    weeks: 5,
    prereq: ["c201"],
    tag: "选修",
    goal: "从 SM/warp 出发,掌握内存合并访问与共享内存优化;手写 tiled GEMM;用 Triton 接入 PyTorch。",
    body: `**GPU 不是更快的 CPU——它是一台以"大量同时"换"超深流水"的并行机器。** 第一次看到几千个核心时,直觉往往是"多线程就行",但真正的门槛在于:你得学会以 **warp** 为思维单位,把计算组织成能让硬件"不堵车"的形状。掌握这门课,意味着你能亲手写出比 PyTorch 默认路径快数倍的算子——这是通往 LLM 训练加速、自定义推理内核的必经之路。

GPU 的核心挑战从不是计算力不够,而是**内存带宽**。**合并访问**(coalescing)与**共享内存**的使用方式,决定了你的核函数是榨干硬件还是让它空转。课程从 **SM / warp / 占用率**的硬件模型出发,带你把 **GEMM** 从最朴素的实现一步步优化到 tiled、再到借助 **Tensor Core** 的版本——每一步都有可量化的性能跃升,直觉由此生长。

### 怎么学最有效

**NVIDIA CUDA 文档**是随手查阅的地图,**GPU MODE** 社区的讲座帮你看到"别人踩过的坑在哪"。建议每个优化手法都自己 profile 一遍:用 **Nsight Compute** 看内存事务和 warp 效率,数字会告诉你直觉对不对。之后学 **Triton** 时你会感受到它把很多手动对齐的细节自动化了——这不是捷径,而是你理解底层之后才能真正驾驭的抽象层。

最常见的坑:以为写完能跑就行、从不看 profiler,结果优化了假性能;第二个坑是把共享内存当万能膏药乱塞,反而引入 bank conflict。先诊断、再动手,是 GPU 编程的铁律。`,
    outline: [
      "GPU 硬件模型:SM、warp、线程块调度、占用率",
      "内存层次:全局 / 共享 / 寄存器,合并访问(coalescing)",
      "GEMM 优化:naive → tiled(共享内存)→ tensor core (wmma)",
      "Triton 编程模型:tile 抽象、autotuning、与 CUDA 对比",
      "异步流与流水线:CUDA streams、cuBLAS/cuDNN 集成",
      "自定义 PyTorch 算子:C++ extension、torch.compile",
    ],
    resources: [
      { type: "book",  title: "NVIDIA CUDA C++ Programming Guide", url: "https://docs.nvidia.com/cuda/cuda-programming-guide/" },
      { type: "video", title: "GPU MODE Lectures", url: "https://github.com/gpu-mode/lectures" },
      { type: "book",  title: "Triton Language & Compiler", url: "https://github.com/triton-lang/triton" },
      { type: "book",  title: "Programming on Parallel Machines: GPU, Multicore, Clusters · Matloff (免费)", url: "https://heather.cs.ucdavis.edu/parprocbook" },
    ],
    papers: [
      { title: "FlashAttention: Fast and Memory-Efficient Exact Attention", venue: "NeurIPS 2022", url: "https://arxiv.org/abs/2205.14135" },
    ],
    assignments: [
      "用 CUDA C 实现 naive → tiled GEMM,用 nsight 测吞吐量,达到 cuBLAS 70% 性能",
      "用 Triton 实现 softmax kernel,与 PyTorch 原生比较精度与速度",
      "封装自定义 PyTorch C++ extension(fused bias+ReLU),用 autograd 验证梯度",
    ],
    checklist: [
      "能解释 warp divergence 成因及如何避免",
      "能说明 tiled GEMM 中 shared memory 的加载/计算/存储流水及 bank conflict 规避",
      "给定寄存器和 shared memory 用量,能估算 SM 占用率",
    ],
  },
  {
    id: "c204",
    code: "CS-204",
    moduleId: "m2",
    zh: "机器学习系统",
    en: "Machine Learning Systems",
    credits: 7,
    weeks: 6,
    prereq: ["c202", "c203"],
    tag: "必修",
    goal: "从训练到推理的全栈系统观:编译器、调度器、量化、服务。",
    body: `**一个模型从训练到用户手里,中间隔着一整套你看不见的"机器"。** 这门课讲的就是那套机器——编译器怎么把计算图变成高效指令、推理引擎怎么把延迟压到极限、量化怎么在精度损失可控的前提下缩小模型。理解这一层,你才能真正解释"为什么同一个模型在不同硬件上速度差十倍",也才能做出有工程价值的系统决策。

**自动微分**是起点——不是背公式,而是理解计算图的前向/反向是怎么被追踪和调度的。之后你会进入图编译器的世界:**XLA**、**TVM**、**Inductor** 各代表一种设计哲学,核心问题都是"如何把数学算子映射到硬件最擅长的操作序列"。CMU 的 **10-414** 课程把这段路径讲得异常清晰,值得跟着走一遍。

### 推理侧是另一个战场

训练优化和推理优化的思路截然不同。推理关注延迟与吞吐的权衡,**KV cache** 管理是 LLM 推理的核心瓶颈,**vLLM** 的 **PagedAttention** 则把操作系统的分页内存思想搬进了 attention 计算。量化、蒸馏、剪枝三件套各有适用场景,别当黑盒工具,理解每种方法在"精度-速度-内存"三角里押的是哪一边。

最常见的坑是把系统课当纯理论来读。这门课每个模块都该有一个能跑起来的实验——哪怕是最简单的自动微分玩具实现,也比只看 PPT 扎实十倍。`,
    outline: [
      "自动微分:前向/反向模式、计算图、算子融合",
      "图编译器:XLA(HLO)、TVM(Relay/TE/TIR)、torch.compile + Inductor",
      "量化 · 蒸馏 · 剪枝",
      "推理引擎:连续批处理、KV cache、投机解码",
      "vLLM 与 PagedAttention",
      "训练框架对比与 fault tolerance",
    ],
    resources: [
      { type: "video", title: "CMU 10-414/714 — Deep Learning Systems", url: "https://dlsyscourse.org" },
      { type: "book",  title: "Apache TVM 官方文档", url: "https://tvm.apache.org/docs/" },
      { type: "book",  title: "vLLM 官方网站", url: "https://vllm.ai" },
    ],
    papers: [
      { title: "TVM: An Automated End-to-End Optimizing Compiler for Deep Learning", venue: "OSDI 2018", url: "https://arxiv.org/abs/1802.04799" },
      { title: "Efficient Memory Management for LLM Serving with PagedAttention (vLLM)", venue: "SOSP 2023", url: "https://arxiv.org/abs/2309.06180" },
      { title: "FlashAttention: Fast and Memory-Efficient Exact Attention", venue: "NeurIPS 2022", url: "https://arxiv.org/abs/2205.14135" },
    ],
    assignments: [
      "用 numpy 实现微型自动微分库(参考 dlsyscourse hw0/1),验证 MLP 梯度正确性",
      "用 torch.compile 编译一个 Transformer block,查看 Inductor 生成的 Triton kernel",
      "部署 vLLM 服务 7B 模型,对比有/无 PagedAttention 的吞吐量与显存",
    ],
    checklist: [
      "能画出训练 step 的端到端时间线",
      "能解释 TVM 中 Schedule 与 Compute 分离设计,以及 autoTVM/Ansor 搜索",
      "能解释 KV cache 碎片化及 PagedAttention 如何用分页解决",
    ],
  },
  {
    id: "c205",
    code: "CS-205",
    moduleId: "m2",
    zh: "MLOps 与模型生产化",
    en: "MLOps & Production ML",
    credits: 6,
    weeks: 4,
    prereq: ["c301"],
    tag: "必修",
    goal: "搭建端到端 ML 流水线;掌握数据/模型版本、自动化训练、容器化部署与线上监控,达到 Google MLOps Level-2 成熟度。",
    body: `**"能跑的 demo"和"能上生产的系统"之间,有一条很多人从未真正越过的鸿沟。** 在实验里你可以手动跑训练、用文件夹管版本、凭感觉判断模型好坏;但在生产环境里,数据在变、模型在迭代、流量在波动——没有自动化流水线兜底,任何一个环节出错你都不会第一时间知道。这门课教你把那道鸿沟填平。

MLOps 的核心不是某个工具,而是一种**可复现、可追溯、可自动触发**的工程习惯。从 **DVC** 管数据版本、**MLflow** 或 **W&B** 追踪实验,到训练流水线的自动化调度,每一块都是在把"手工操作"变成"有记录的机器行为"。Google 的 **Rules of ML** 与 **Made With ML** 是两份极好的参照——前者告诉你大规模系统里哪些直觉是错的,后者给你一套可落地的工程框架。

### 分水岭在监控

容器化部署和 CI/CD 让模型"上线"变得可重复;但真正考验系统的是上线之后:数据分布悄悄漂移了、新版本在某个人群上效果下滑了——你能不能第一时间发现?监控与数据漂移检测是很多课程忽略、却最常出事的地方。按 Google 的成熟度模型,**Level-2** 的标志就是"训练和部署都由流水线自动完成,人只负责策略"。

学这门课最有效的方式是找一个真实小项目,把 demo→版本管理→自动训练→容器部署→监控这整条链路亲手走一遍,哪怕规模很小,肌肉记忆会告诉你每个工具在哪个位置发力。`,
    outline: [
      "数据版本与特征工程流水线(DVC、Feature Store)",
      "实验追踪与模型注册(MLflow、W&B)",
      "训练流水线自动化与超参调优(Kubeflow、Ray Train)",
      "模型打包与容器化部署(Docker、BentoML/Triton、REST/gRPC)",
      "CI/CD for ML:代码 + 数据 + 模型三层测试、GitHub Actions",
      "线上监控与数据漂移检测、再训练触发",
    ],
    resources: [
      { type: "video", title: "Made With ML — MLOps Course", url: "https://madewithml.com/courses/mlops/" },
      { type: "video", title: "Full Stack Deep Learning — LLM Bootcamp", url: "https://fullstackdeeplearning.com/llm-bootcamp/" },
      { type: "book",  title: "Rules of Machine Learning · Google (MLOps 最佳实践)", url: "https://developers.google.com/machine-learning/guides/rules-of-ml/" },
      { type: "book",  title: "Google Cloud — MLOps Whitepaper", url: "https://docs.cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning" },
      { type: "book",  title: "MLflow Documentation", url: "https://mlflow.org/docs/latest/index.html" },
      { type: "book",  title: "Weights & Biases Documentation", url: "https://docs.wandb.ai/guides/" },
      { type: "book",  title: "DVC Documentation", url: "https://doc.dvc.org/" },
    ],
    papers: [],
    assignments: [
      "用 DVC 追踪数据集两个版本,MLflow 记录不同超参实验,生成对比报告",
      "GitHub Actions 流水线:push → 训练 → 评估 → 达标自动注册到 MLflow Model Registry",
      "部署 FastAPI 推理服务,接入 W&B Monitoring 模拟漂移并触发告警",
    ],
    checklist: [
      "能画出 Google MLOps Level-0/1/2 区别,指出自己项目处于哪级",
      "能解释为什么仅代码版本管理不够,DVC 如何用 git-like 语义管理数据/模型",
      "能写出完整 CI/CD for ML 的 GitHub Actions YAML",
    ],
  },

  // ============ Module 3: 机器学习与深度学习 ============
  {
    id: "c301",
    code: "CS-301",
    moduleId: "m3",
    zh: "机器学习",
    en: "Machine Learning",
    credits: 8,
    weeks: 8,
    prereq: ["c102", "c103"],
    tag: "必修",
    goal: "从线性模型到集成方法,建立监督/非监督/半监督的统一视角。",
    body: `**机器学习是整张 AI 地图上的第一门"真功夫"。** 之前你可能学了数学、学了 Python,感觉都是在磨刀——这门课开始正式用刀。从线性回归到梯度提升树,你建立的不只是一套算法清单,而是一种思维方式:给定一个问题,怎么判断数据长什么形状、选什么归纳偏置、用什么指标衡量"学得好不好"。

课程主线是从简单到复杂地展开监督学习的核心族群:**线性/逻辑回归**告诉你正则化的本质是在偏差与方差之间取舍;**SVM 与核方法**让你看到"把数据映射到高维"的威力;**决策树→随机森林→GBDT** 展示集成方法如何把弱学习器叠成强模型。斯坦福 **CS229** 与 **ISLP** 是这条路上公认最好的两份地图,各有侧重——前者数学推导严谨,后者统计直觉丰富。

### 理论侧不要绕开

**VC 维**和泛化理论看起来抽象,但它给你一个关键直觉:模型容量、数据量、泛化误差之间存在可量化的关系。不理解这一点,你调参时就只能靠运气。非监督部分的**聚类与降维**同样重要——它训练你在没有标签时依然能从数据里读出结构。

最常见的坑有两个:一是跳过特征工程直接堆模型,垃圾进垃圾出;二是只会调包、不能解释模型为什么在这个数据集上失效。每个算法都亲手实现一遍核心逻辑、再用库版本验证,是最快建立真实理解的路径。`,
    outline: [
      "线性 / 逻辑回归 · 正则化",
      "SVM 与核方法",
      "决策树 · 随机森林 · GBDT",
      "聚类与降维",
      "VC 维与泛化理论",
      "特征工程与数据偏差",
    ],
    resources: [
      { type: "video", title: "Stanford CS229 — Andrew Ng", url: "https://cs229.stanford.edu/" },
      { type: "video", title: "Machine Learning Specialization — Andrew Ng (Coursera)", url: "https://www.coursera.org/specializations/machine-learning-introduction" },
      { type: "book",  title: "An Introduction to Statistical Learning (ISLP)", url: "https://www.statlearning.com/" },
      { type: "book",  title: "The Elements of Statistical Learning · Hastie et al.", url: "https://hastie.su.domains/ElemStatLearn/" },
      { type: "book",  title: "scikit-learn User Guide", url: "https://scikit-learn.org/stable/user_guide.html" },
    ],
    papers: [
      { title: "Statistical Modeling: The Two Cultures", venue: "Breiman, 2001", url: "https://projecteuclid.org/journals/statistical-science/volume-16/issue-3/Statistical-Modeling--The-Two-Cultures/10.1214/ss/1009213726.full" },
      { title: "XGBoost: A Scalable Tree Boosting System", venue: "KDD 2016", url: "https://arxiv.org/abs/1603.02754" },
      { title: "Random Forests", venue: "Breiman, 2001", url: "https://www.stat.berkeley.edu/~breiman/randomforest2001.pdf" },
    ],
    assignments: [
      "在 Kaggle 完成一个端到端比赛(银牌目标)",
      "实现 SVM 的 SMO 算法",
      "用 NumPy 从零实现逻辑回归(正规方程 + 梯度下降),与 sklearn 对照",
    ],
    checklist: [
      "能解释 bias-variance tradeoff",
      "看到一个新数据集能给出 baseline 三步走",
      "能解释为何随机森林比单树稳,Boosting 与 Bagging 的本质区别",
    ],
  },
  {
    id: "c302",
    code: "CS-302",
    moduleId: "m3",
    zh: "深度学习",
    en: "Deep Learning",
    credits: 9,
    weeks: 8,
    prereq: ["c301", "c204"],
    tag: "必修",
    goal: "把神经网络看成可微分编程;从 CNN 到 Transformer 的设计哲学,能用 PyTorch 训练并调试。",
    body: `**神经网络的本质是可微分的程序——你在设计的不是规则,而是一个能从数据里自动发现规则的计算结构。** 一旦接受这个视角,反向传播就不再神秘:它只是链式法则在计算图上的机械应用。这门课的目标是让你能用 **PyTorch** 亲手搭出主流架构,理解每个设计决策背后的直觉,并在训练不收敛时知道从哪里开始排查。

课程沿着历史脉络展开,也是沿着直觉脉络展开:**MLP** 教你理解前向计算与梯度流;**CNN** 告诉你"局部性与平移不变性"这两个归纳偏置为什么让图像任务变得可解;**RNN/LSTM** 让你看到序列建模的挑战——梯度消失不是 bug 而是架构缺陷,这个认识直接引出了 **Attention 机制**。**Transformer** 是当前几乎所有大模型的骨架,理解它的设计哲学比记住参数量重要一百倍。

### 调试能力和架构理解同等重要

**Dropout**、**Batch Norm**、**Layer Norm** 不是魔法,每一个都在解决训练过程中具体的不稳定性——知道"为什么加"才知道"什么时候不加"。迁移学习是现实项目里最常用的技巧,但很多人只会复制粘贴 fine-tune 代码,不理解冻结哪些层、学习率怎么分层设置背后的逻辑。

**d2l.ai** 提供从零推导到代码实现的完整路径;**fast.ai** 用自顶向下方式让你先跑起来再深入;Karpathy 的 **Zero to Hero** 是目前最好的"手写 GPT"体验——三条路各有优势,交叉使用、互相印证。最大的坑是只看不练,神经网络的直觉必须从 loss 曲线和梯度数值里磨出来。`,
    outline: [
      "MLP · 反向传播 · 初始化",
      "卷积神经网络与归纳偏置",
      "RNN / LSTM / GRU",
      "Attention 与 Transformer",
      "正则化:Dropout · BN · LN",
      "迁移学习与微调",
    ],
    resources: [
      { type: "book",  title: "Dive into Deep Learning (d2l.ai)", url: "https://d2l.ai/" },
      { type: "book",  title: "Deep Learning Book · Goodfellow, Bengio, Courville", url: "https://www.deeplearningbook.org/" },
      { type: "video", title: "Practical Deep Learning for Coders · fast.ai", url: "https://course.fast.ai/" },
      { type: "video", title: "Neural Networks: Zero to Hero · Karpathy", url: "https://karpathy.ai/zero-to-hero.html" },
      { type: "book",  title: "PyTorch 官方教程", url: "https://docs.pytorch.org/tutorials/" },
    ],
    papers: [
      { title: "Attention Is All You Need", venue: "NeurIPS 2017", url: "https://arxiv.org/abs/1706.03762" },
      { title: "Deep Residual Learning for Image Recognition (ResNet)", venue: "CVPR 2016", url: "https://arxiv.org/abs/1512.03385" },
      { title: "Batch Normalization", venue: "ICML 2015", url: "https://arxiv.org/abs/1502.03167" },
      { title: "Sequence to Sequence Learning with Neural Networks", venue: "NeurIPS 2014", url: "https://arxiv.org/abs/1409.3215" },
    ],
    assignments: [
      "用 PyTorch 从零实现 MLP 在 MNIST 上训练,手写前/反向传播",
      "复现 ResNet-18 在 CIFAR-10 达到 >93%,对比去掉残差连接的退化",
      "实现字符级 Transformer 解码器,在莎士比亚或中文语料上采样生成",
    ],
    checklist: [
      "能用一段话向非技术朋友解释 attention",
      "知道为什么深网络需要残差连接",
      "能徒手画出 Scaled Dot-Product Attention 计算流程",
    ],
  },
  {
    id: "c303",
    code: "CS-303",
    moduleId: "m3",
    zh: "强化学习",
    en: "Reinforcement Learning",
    credits: 8,
    weeks: 7,
    prereq: ["c302"],
    tag: "必修",
    goal: "MDP · 价值函数 · 策略梯度 · 离线 RL · RLHF 的来龙去脉。",
    body: `**强化学习是 AI 里最接近"自主决策"本质的领域**——不靠标注数据,而是让 Agent 在与环境的反复互动中摸索出最优行为。它是 AlphaGo 的核心,也是让现代大模型学会"对人类有用"的 **RLHF** 技术的直接来源。理解强化学习,你就理解了 GPT 系列为什么能对话而不只是续写。

一切从 **MDP(马尔可夫决策过程)**开始:状态、动作、奖励、转移。**Bellman 方程**告诉你"当前价值等于即时奖励加上未来价值的折扣",这一个等式就派生出 **TD learning**、**Q-learning**、**SARSA** 这条经典路线。第二条主线是**策略梯度**——不估值函数,直接对策略求梯度。**A2C/PPO** 把稳定性推到可用级别,**Actor-Critic** 则把两条路合流:Critic 降方差,Actor 更新策略。

### RLHF 为什么突然重要

大模型时代,**离线 RL 与模仿学习**提供了从人类示范中蒸馏行为的工具,而 **RLHF** 用偏好排序训练奖励模型、再用 PPO 微调语言模型——这正是 InstructGPT/ChatGPT 对齐管线的核心。学完这门课,你会真正理解"对齐"不是魔法,是工程。

入门推荐 **Sutton & Barto** 经典教材配合 **David Silver** 的公开课,代码实践跟着 **OpenAI Spinning Up** 走。最常见的坑:过早纠结采样效率的数字细节,却忽视了 Bellman 方程的直觉推导——先把等式的意义想透,算法都是自然延伸。`,
    outline: [
      "MDP 与 Bellman 方程",
      "TD 学习 · Q-learning · SARSA",
      "策略梯度 · A2C · PPO",
      "Actor-Critic 与模型基础 RL",
      "离线 RL · 模仿学习",
      "RLHF 与对齐",
    ],
    resources: [
      { type: "book",  title: "Reinforcement Learning: An Introduction · Sutton & Barto", url: "http://incompleteideas.net/book/RLbook2020.pdf" },
      { type: "video", title: "David Silver RL Course (UCL/DeepMind)", url: "https://davidstarsilver.wordpress.com/teaching/" },
      { type: "video", title: "OpenAI Spinning Up", url: "https://spinningup.openai.com/en/latest/" },
      { type: "video", title: "Berkeley CS285 — Deep RL", url: "https://rail.eecs.berkeley.edu/deeprlcourse/" },
    ],
    papers: [
      { title: "Playing Atari with Deep Reinforcement Learning (DQN)", venue: "Mnih et al., 2013", url: "https://arxiv.org/abs/1312.5602" },
      { title: "Proximal Policy Optimization Algorithms (PPO)", venue: "Schulman et al., 2017", url: "https://arxiv.org/abs/1707.06347" },
      { title: "Asynchronous Methods for Deep RL (A3C)", venue: "ICML 2016", url: "https://arxiv.org/abs/1602.01783" },
      { title: "Mastering Chess and Shogi by Self-Play (AlphaZero)", venue: "Silver et al., 2017", url: "https://arxiv.org/abs/1712.01815" },
      { title: "Training language models to follow instructions (InstructGPT)", venue: "NeurIPS 2022", url: "https://arxiv.org/abs/2203.02155" },
    ],
    assignments: [
      "在 Gymnasium 上跑通 DQN,从 CartPole → LunarLander → Atari Breakout",
      "用 Spinning Up 的 PPO 在 MuJoCo HalfCheetah/Ant 训练连续控制策略",
      "实现 RLHF 简化版:reward model + PPO 微调小型 LM",
    ],
    checklist: [
      "能徒手写出贝尔曼最优方程并证明值迭代收敛",
      "能解释 DQN 中经验回放和目标网络分别解决什么问题",
      "能区分 on-policy(PPO/A2C)与 off-policy(DQN/SAC)的数据使用",
    ],
  },
  {
    id: "c304",
    code: "CS-304",
    moduleId: "m3",
    zh: "概率图模型",
    en: "Probabilistic Graphical Models",
    credits: 7,
    weeks: 6,
    prereq: ["c103"],
    tag: "选修",
    goal: "贝叶斯网络与马尔可夫随机场;精确与近似推断;为 VAE 与现代生成模型打理论底。",
    body: `**概率图模型(PGM)是把概率论和图论缝合在一起的语言。** 当你面对一堆变量、它们彼此影响、你只观测到其中一部分时,PGM 给你一张地图:哪些变量有因果方向,哪些只是相关,怎样高效推断你看不到的部分。这套工具在 VAE、扩散模型、因果推断里反复出现,是读懂现代生成模型论文的必要底层。

图分两族。**有向图(贝叶斯网络)**用箭头表达条件依赖,适合建模因果或时序结构;**无向图(马尔可夫随机场 MRF)**用势函数表达对称约束,常见于图像分割。两种图都回答同一个问题:给定模型结构,如何表示联合分布,如何高效拆解它。

### 推断:从精确到近似的蜕变

**变量消除**是精确推断的基础操作,代价随图的复杂度指数增长。一旦图变复杂,精确推断就不可行,于是引出两条近似路线:**变分推断(VI)**把后验近似为一个简单分布、转化成优化问题;**MCMC** 则用采样逼近——它们的取舍(速度 vs 精度)是你要建立的核心直觉。**隐变量模型与 VAE** 正是变分推断的直接应用:用 ELBO 目标把难处理的后验变成可微优化。

推荐 **Stanford CS228** 的讲义,条理极清晰。最常见的坑是跳过图的独立性推导直接看算法——条件独立的 d-分离规则如果不吃透,后面的推断步骤就只是背公式。每读一个公式,先在小图上手画一遍,直觉来得更快。`,
    outline: [
      "有向图(贝叶斯网络):条件独立、d-分离、因式分解",
      "无向图(MRF):团势函数、配分函数、Ising 模型",
      "精确推断:变量消除、Sum-Product、Junction Tree",
      "近似推断:变分推断(ELBO、均场)、MCMC(MH、Gibbs)",
      "隐变量模型与 VAE:EM 算法、变分自编码器推导",
      "结构学习:得分法(BIC)、约束法(PC 算法)",
    ],
    resources: [
      { type: "video", title: "Stanford CS228 — Probabilistic Graphical Models", url: "https://ermongroup.github.io/cs228/" },
      { type: "book",  title: "Stanford CS228 — Course Notes (Kuleshov & Ermon)", url: "https://ermongroup.github.io/cs228-notes/" },
      { type: "book",  title: "Mathematics for Machine Learning (Ch.8 概率建模)", url: "https://mml-book.github.io/" },
    ],
    papers: [
      { title: "Auto-Encoding Variational Bayes (VAE)", venue: "ICLR 2014", url: "https://arxiv.org/abs/1312.6114" },
    ],
    assignments: [
      "手推贝叶斯网络上变量消除的完整计算过程,对比置信传播,分析复杂度",
      "推导均场变分推断 ELBO 更新公式,在 GMM 上代码验证收敛",
      "复现 VAE 训练(编码器/解码器/重参数化),在 MNIST 上可视化隐空间插值",
    ],
    checklist: [
      "给定贝叶斯网络,能立即写出联合概率因式分解并判断条件独立",
      "能推导 ELBO = 重建项 − KL 散度,解释最大化 ELBO 与后验近似的关系",
      "能说明 Gibbs 与 MH 的适用场景差异",
    ],
  },
  {
    id: "c305",
    code: "CS-305",
    moduleId: "m3",
    zh: "生成式 AI:扩散模型与多模态",
    en: "Generative AI",
    credits: 7,
    weeks: 5,
    prereq: ["c302"],
    tag: "必修",
    goal: "GAN/VAE/扩散模型原理,理解 Stable Diffusion 与多模态生成,能用 Diffusers 完成文本引导生成。",
    body: `**生成式 AI 在短短几年内经历了三次范式跃迁**——从 **GAN** 的对抗博弈,到 **VAE** 的隐变量压缩,再到**扩散模型**的逐步去噪——每次跃迁都带来质量和可控性的飞跃。今天你在 Stable Diffusion 里输入一句话生成一张图,背后是这三代技术的融合结晶。这门课让你不只会用,还能读懂它为什么能工作。

扩散模型的核心直觉出乎意料地简单:**DDPM** 先把图像一步步加噪到纯高斯噪声(前向过程),再训练网络学会逐步去噪(反向过程)。真正的工程魔法在加速采样的 **DDIM** 和把去噪解释为梯度流的 **Score Matching**。**潜空间扩散(LDM)**把扩散过程搬进 VAE 压缩后的潜空间,这正是 **Stable Diffusion** 能在消费级 GPU 上运行的关键。

### 多模态:图文如何对齐

**CLIP** 用对比学习把图像和文字投影到同一个语义空间——这是文本引导生成的基础设施。**ControlNet** 在扩散模型上叠加条件分支,让姿态图、边缘图、深度图都能精确控制生成。学完这些,你对"提示词工程"的理解会从玄学变成几何直觉。

实践跟着 **Hugging Face Diffusion 课**和 **Diffusers** 库走,从文本生图到图生图逐步上手,**Lilian Weng** 的博客是理论补充的最佳伴侣。最常见的坑:急着调参数却没理解采样器的本质,遇到质量问题无从下手——先把前向/反向过程的意义想透再动代码。`,
    outline: [
      "生成模型基础:VAE、GAN(极小极大博弈、模式坍塌)",
      "扩散模型:DDPM 前向/反向数学推导、噪声预测网络",
      "DDIM 确定性采样与 Score Matching",
      "Latent Diffusion(LDM)与 Stable Diffusion 全流程",
      "CLIP 视觉-语言对齐与文本条件生成",
      "ControlNet 与多模态控制",
    ],
    resources: [
      { type: "video", title: "Hugging Face Diffusion Models Course", url: "https://huggingface.co/learn/diffusion-course/en/unit0/1" },
      { type: "book",  title: "Lilian Weng — What are Diffusion Models?", url: "https://lilianweng.github.io/posts/2021-07-11-diffusion-models/" },
      { type: "book",  title: "Hugging Face Diffusers Documentation", url: "https://huggingface.co/docs/diffusers/" },
    ],
    papers: [
      { title: "Generative Adversarial Networks", venue: "Goodfellow et al., 2014", url: "https://arxiv.org/abs/1406.2661" },
      { title: "Auto-Encoding Variational Bayes (VAE)", venue: "Kingma & Welling, 2013", url: "https://arxiv.org/abs/1312.6114" },
      { title: "Denoising Diffusion Probabilistic Models (DDPM)", venue: "NeurIPS 2020", url: "https://arxiv.org/abs/2006.11239" },
      { title: "High-Resolution Image Synthesis with Latent Diffusion (Stable Diffusion)", venue: "Rombach et al., 2021", url: "https://arxiv.org/abs/2112.10752" },
      { title: "Learning Transferable Visual Models from Natural Language Supervision (CLIP)", venue: "Radford et al., 2021", url: "https://arxiv.org/abs/2103.00020" },
      { title: "Hierarchical Text-Conditional Image Generation (DALL-E 2)", venue: "Ramesh et al., 2022", url: "https://arxiv.org/abs/2204.06125" },
    ],
    assignments: [
      "从零实现 DDPM(PyTorch)在 MNIST/CIFAR-10 上训练,记录 FID 随步数变化",
      "用 Diffusers 加载 Stable Diffusion,探索 CFG scale、negative prompt、ControlNet",
      "实现条件 GAN(cGAN)与 CycleGAN,与扩散模型在同一数据集 FID 对比",
    ],
    checklist: [
      "能推导 VAE 的 ELBO,解释重参数化技巧必要性",
      "能用公式描述 DDPM 前向加噪与反向去噪",
      "能解释为何 LDM 在潜空间扩散而非像素空间",
    ],
  },

  // ============ Module 4: 前沿与应用 ============
  {
    id: "c401",
    code: "CS-401",
    moduleId: "m4",
    zh: "自然语言处理",
    en: "Natural Language Processing",
    credits: 7,
    weeks: 7,
    prereq: ["c302"],
    tag: "必修",
    goal: "从 n-gram 到 BERT 到 LLM:语言建模史与现代任务范式。",
    body: `**自然语言处理是让机器理解和生成人类语言的工程**——也是当前 AI 热潮的直接核心。从 **n-gram** 语言模型到 **word2vec** 词嵌入,再到 **BERT** 的双向预训练,再到如今的大语言模型,这条演化线索本身就是一部 AI 工程史。理解这条线,你才能判断每个新模型"新在哪里"。

语言建模的本质是预测:给你前面的词,预测下一个。这个看似简单的目标驱动了整个领域。**分词与 embedding** 解决"把词变成向量";**Seq2Seq + Attention** 解决"把序列映射到序列"(机器翻译、摘要);**BERT** 把双向上下文建模推向极致,奠定了预训练-微调范式。你会发现后来的几乎一切都是对这个范式的扩展或挑战。

### 任务视角:NLP 不只是聊天

**序列标注**处理命名实体识别和词性标注;**信息抽取**从非结构文本中提炼事实;**问答与摘要**把理解和生成合并为一个任务。**评测体系**——BLEU、ROUGE、人工评估——是你判断模型好坏的刻度尺,也是论文里最容易被误读的部分。

推荐主线跟 **Stanford CS224N** 走,配合 **Hugging Face NLP 课**做代码实践,两者节奏互补。最常见的坑:把 BERT 微调当黑盒调包,不理解注意力机制的计算图——一旦出问题就无从调试。亲手实现一个迷你 Attention,比读十遍公式管用。`,
    outline: [
      "分词 · embedding · word2vec / GloVe",
      "序列标注 · 依存解析",
      "Seq2Seq + Attention",
      "Encoder-Decoder 与 BERT 系列(MLM/NSP)",
      "信息抽取 · 问答 · 摘要",
      "评测体系与数据集",
    ],
    resources: [
      { type: "video", title: "Stanford CS224N — NLP with Deep Learning", url: "http://web.stanford.edu/class/cs224n" },
      { type: "video", title: "Hugging Face NLP Course", url: "https://huggingface.co/learn/nlp-course/chapter1/1" },
      { type: "book",  title: "Speech and Language Processing (3rd ed. draft) · Jurafsky & Martin (作者免费)", url: "https://web.stanford.edu/~jurafsky/slp3/" },
    ],
    papers: [
      { title: "Efficient Estimation of Word Representations in Vector Space (word2vec)", venue: "Mikolov et al., 2013", url: "https://arxiv.org/abs/1301.3781" },
      { title: "Neural Machine Translation by Jointly Learning to Align and Translate (Bahdanau Attention)", venue: "ICLR 2015", url: "https://arxiv.org/abs/1409.0473" },
      { title: "BERT: Pre-training of Deep Bidirectional Transformers", venue: "NAACL 2019", url: "https://arxiv.org/abs/1810.04805" },
    ],
    assignments: [
      "在 SQuAD 上微调 BERT 达到论文水平",
      "实现一个 BPE tokenizer",
      "复现一个基于 Bahdanau Attention 的 seq2seq 翻译模型",
    ],
    checklist: [
      "对比 BPE / WordPiece / SentencePiece",
      "能解释 BERT 的 MLM 与 NSP 目标",
      "能推导 Scaled Dot-Product Attention 的时间复杂度",
    ],
  },
  {
    id: "c402",
    code: "CS-402",
    moduleId: "m4",
    zh: "计算机视觉",
    en: "Computer Vision",
    credits: 7,
    weeks: 7,
    prereq: ["c302"],
    tag: "必修",
    goal: "从经典几何到大模型时代;分类、检测、分割、生成的关键里程碑。",
    body: `**计算机视觉教机器"看懂"图像**——从像素到物体、从静态图到视频、从分类到生成。它既是 AI 最早取得突破的领域(ImageNet 竞赛),也是当下最活跃的前沿(视觉大模型 **SAM**、多模态视觉语言模型)。学这门课,你会亲眼看到深度学习如何一层层把原始像素变成语义。

经典路线从**图像形成与滤波**开始:理解卷积不只是矩阵运算,而是在图像上滑动的"特征探测器"。**CNN** 把这个直觉堆叠成层级结构——低层检测边缘,高层识别物体部件,这个层级观是理解所有视觉模型的钥匙。**现代 backbone**(ResNet、EfficientNet)解决的核心问题是"怎么让网络更深却不退化"。

### 从识别到理解:任务升级三步

**目标检测**(**R-CNN** 到 **YOLO** 到 **DETR**)要求同时回答"是什么"和"在哪里";**语义与实例分割**(**FCN**、**U-Net**、**Mask R-CNN**)要求精确到像素级。**ViT(视觉 Transformer)**打破了 CNN 的归纳偏置,用纯注意力机制在大数据下重塑了整个领域;**SAM(Segment Anything)**则把分割推向通用基础模型时代。

推荐主线跟 **Stanford CS231N** 走——作业设计是同类课里最硬核的。最常见的坑:把检测、分割当全新知识学,其实它们共享同一套特征提取主干,差别只在"头部"设计。先吃透分类,后面的任务会快很多。`,
    outline: [
      "图像形成 · 滤波 · 特征",
      "CNN 与现代 backbone(ResNet、EfficientNet)",
      "检测:R-CNN 系列、YOLO、DETR",
      "分割:FCN、U-Net、Mask R-CNN",
      "视频与多视图",
      "Vision Transformer 与 SAM",
    ],
    resources: [
      { type: "video", title: "Stanford CS231N — Deep Learning for Computer Vision", url: "https://cs231n.stanford.edu/" },
      { type: "book",  title: "Dive into Deep Learning — Computer Vision", url: "https://d2l.ai/" },
      { type: "video", title: "Practical Deep Learning for Coders · fast.ai", url: "https://course.fast.ai/" },
    ],
    papers: [
      { title: "Faster R-CNN: Towards Real-Time Object Detection with RPN", venue: "NeurIPS 2015", url: "https://arxiv.org/abs/1506.01497" },
      { title: "Fully Convolutional Networks for Semantic Segmentation (FCN)", venue: "CVPR 2015", url: "https://arxiv.org/abs/1411.4038" },
      { title: "An Image is Worth 16x16 Words (ViT)", venue: "ICLR 2021", url: "https://arxiv.org/abs/2010.11929" },
      { title: "Swin Transformer: Hierarchical ViT using Shifted Windows", venue: "ICCV 2021", url: "https://arxiv.org/abs/2103.14030" },
      { title: "Microsoft COCO: Common Objects in Context", venue: "ECCV 2014", url: "https://arxiv.org/abs/1405.0312" },
    ],
    assignments: [
      "复现 ViT-B/16 在 ImageNet-1k 子集上",
      "在 CIFAR-100 上微调预训练 ResNet-50,记录学习率/frozen layer 对结果的影响",
      "用 torchvision Faster R-CNN 在自定义小数据集上微调,可视化检测框",
    ],
    checklist: [
      "对比 CNN 与 ViT 的归纳偏置",
      "理解为什么 detection 的 NMS 必要",
      "能解释 mAP@0.5 与 mAP@0.5:0.95 计算差异",
    ],
  },
  {
    id: "c403",
    code: "CS-403",
    moduleId: "m4",
    zh: "大语言模型",
    en: "Large Language Models",
    credits: 9,
    weeks: 9,
    prereq: ["c401", "c303"],
    tag: "必修 · 旗舰",
    goal: "Scaling Laws · 预训练 · SFT · RLHF · 推理优化 · Agent。",
    body: `**大语言模型是整个 AI 浪潮的核心引擎。** 你在其他课里学到的概率、线性代数、反向传播,在这里都汇聚成一件具体的事:一个模型读进文字、预测下一个词,然后涌现出推理、写作、编程的能力。这门课的旗舰地位不是因为它最难,而是因为它是整张地图的中心——学完它,你才知道每条路通往哪里。

从 **Scaling Laws** 开始,你会理解为什么"更大的模型、更多的数据"不是蛮力,而是有规律可循的工程决策。预训练之后是对齐:先用 **SFT** 让模型学会"按指令说话",再用 **RLHF** 或 **DPO** 让它学会"说人类想听的话"。推理阶段的 **KV cache**、**Speculative Decoding**、**MoE** 架构则告诉你同样的模型如何跑得更快、更省钱。最后是 **Agent** 与工具调用——这是大模型从"聊天框"变成"能干活的系统"的关键一步。

### 怎么学最有效

Andrej Karpathy 的 **Zero to Hero** 是这门课最好的伴侣:跟着他从零用几百行代码搭一个小 GPT,你对 Transformer 的理解会从"大概知道"变成"真的懂"。评测部分不要跳过——**MMLU**、**HumanEval**、**Chatbot Arena** 背后的设计哲学,会让你学会批判性地看待任何"模型排行榜"。

最常见的坑有两个:一是只看论文公式、从不动手跑代码;二是跳过预训练直接玩应用,遇到奇怪行为时完全不知道根源在哪。建议**先把小 GPT 从头跑通,再往上叠每一层能力**,这样每个新概念都有根可寻。`,
    outline: [
      "Scaling Laws 与数据配方",
      "预训练:架构、优化器、并行训练",
      "SFT 与指令数据",
      "RLHF / DPO / 偏好对齐",
      "推理时:KV cache · speculative · MoE",
      "工具使用与 Agent",
      "评测:MMLU · HumanEval · Arena",
    ],
    resources: [
      { type: "video", title: "Neural Networks: Zero to Hero · Karpathy", url: "https://karpathy.ai/zero-to-hero.html" },
      { type: "video", title: "Hugging Face NLP Course (含 LLM 章节)", url: "https://huggingface.co/learn/nlp-course/chapter1/1" },
      { type: "book",  title: "Dive into Deep Learning — Attention/Transformer", url: "https://d2l.ai/" },
    ],
    papers: [
      { title: "Scaling Laws for Neural Language Models", venue: "Kaplan et al., 2020", url: "https://arxiv.org/abs/2001.08361" },
      { title: "Training Compute-Optimal Large Language Models (Chinchilla)", venue: "NeurIPS 2022", url: "https://arxiv.org/abs/2203.15556" },
      { title: "LLaMA: Open and Efficient Foundation Language Models", venue: "Touvron et al., 2023", url: "https://arxiv.org/abs/2302.13971" },
      { title: "Direct Preference Optimization (DPO)", venue: "NeurIPS 2023", url: "https://arxiv.org/abs/2305.18290" },
      { title: "Language Models are Few-Shot Learners (GPT-3)", venue: "NeurIPS 2020", url: "https://arxiv.org/abs/2005.14165" },
      { title: "Training language models to follow instructions (InstructGPT)", venue: "NeurIPS 2022", url: "https://arxiv.org/abs/2203.02155" },
    ],
    assignments: [
      "跟随 Karpathy 从字符级 bigram 到 nanoGPT,在莎士比亚语料上训练",
      "从零预训练 ~100M 的 GPT-like(单 GPU,数小时)",
      "实现带工具调用的 Agent loop",
    ],
    checklist: [
      "能徒手画出 Transformer 一次前向的 FLOPs",
      "解释 Chinchilla 的 token-per-param 比例",
      "知道 RLHF 与 DPO 在目标函数上的等价点",
    ],
  },
  {
    id: "c404",
    code: "CS-404",
    moduleId: "m4",
    zh: "AI 安全与对齐",
    en: "AI Safety & Alignment",
    credits: 5,
    weeks: 5,
    prereq: ["c403"],
    tag: "必修",
    goal: "从可解释性到对抗鲁棒,从对齐税到 scalable oversight,能批判性阅读前沿安全研究。",
    body: `**AI 越来越强,但"强"不等于"可信"。** 对齐问题问的是:当一个模型能力足够大,它是否真的在做我们希望它做的事?这个问题听起来哲学,实则非常工程:一个模型可以完美地优化你给的指标,却系统性地违背你真正的意图——这就是 **Goodhart 定律**在 AI 里的具体形态。这门课让你从"用 AI"升级到"能批判性地评估 AI"。

从 **RLHF** 到 **Constitutional AI**,你会看到对齐方案如何一步步演进,每一代解决了什么、又引入了什么新问题。**机制可解释性**(**Probing** 与 **Circuits** 分析)则让你从另一个方向进入:不问模型输出了什么,而问模型内部在算什么。Anthropic 的 **Transformer Circuits** 系列是这个方向目前最深入的公开研究,值得精读几篇原文。

### 能力与对齐的关系

一个反直觉的认知:对齐研究并不总是在"限制"能力,很多时候更强的可解释性反而帮助我们解锁更可靠的能力。**Scalable Oversight** 研究的正是:当模型能力超过人类评估者时,我们还能靠什么来监督它?这是这门课最前沿也最开放的部分。

常见坑是把安全当成"加滤镜",以为对齐就是让模型"说话更礼貌"。实际上这门课训练的是一种思维方式:对任何 AI 系统,**先问它的目标函数是什么,再问这个目标函数和你真实意图的距离有多远**。带着这个问题读前沿论文,你的批判力会快速成长。`,
    outline: [
      "对齐基础:奖励错配、目标概化失败、Goodhart 定律",
      "RLHF 与 Constitutional AI:人类偏好建模、AI 反馈",
      "机制可解释性:linear probing、superposition、circuits",
      "对抗鲁棒性:对抗样本、越狱攻击、防御现状",
      "Scalable Oversight:debate、amplification、weak-to-strong",
      "评测与治理:MMLU/HELM/WMDP、风险分级、AI 政策",
    ],
    resources: [
      { type: "book",  title: "Fairness and Machine Learning", url: "https://fairmlbook.org" },
      { type: "book",  title: "Transformer Circuits Thread (Anthropic)", url: "https://transformer-circuits.pub" },
      { type: "book",  title: "Distill.pub", url: "https://distill.pub" },
      { type: "book",  title: "Anthropic Research", url: "https://www.anthropic.com/research" },
    ],
    papers: [
      { title: "Concrete Problems in AI Safety", venue: "Amodei et al., 2016", url: "https://arxiv.org/abs/1606.06565" },
      { title: "Constitutional AI: Harmlessness from AI Feedback", venue: "Anthropic, 2022", url: "https://arxiv.org/abs/2212.08073" },
      { title: "Toy Models of Superposition", venue: "Transformer Circuits, 2022", url: "https://transformer-circuits.pub/2022/toy_model/index.html" },
    ],
    assignments: [
      "复现一个 linear probe:在小型 transformer 中间层探测语义属性",
      "对一个开源对话模型执行 5 类越狱攻击,记录成功率",
      "为 Concrete Problems 中一个问题设计最小可复现实验",
    ],
    checklist: [
      "能用例子解释 Goodhart 定律如何在 RLHF 中导致奖励黑客",
      "能解释 superposition 假说及其对机制可解释性的挑战",
      "能对比 debate 与 amplification 两种 scalable oversight 方案",
    ],
  },
  {
    id: "c405",
    code: "CS-405",
    moduleId: "m4",
    zh: "大模型应用工程:RAG · Agent · 微调",
    en: "LLM Application Engineering",
    credits: 7,
    weeks: 5,
    prereq: ["c403", "c205"],
    tag: "必修 · 旗舰",
    goal: "构建生产级 RAG 检索系统与 Agent 工作流,对开源 LLM 做 LoRA/QLoRA 微调,掌握系统级评估。",
    body: `**把大模型变成能用的产品,是一门独立的工程学科。** 调用 API 能拿到输出,但真正的生产系统需要回答:检索到的内容是对的吗?Agent 跑偏了怎么发现?微调之后模型变好还是变坏了?这门课覆盖的,正是从"能跑通的 demo"到"能交付的系统"之间那段最难走的路。

**RAG**(检索增强生成)全链路是核心:文档如何分块才不损失上下文,向量检索之后为什么还要重排,生成阶段怎么让模型真正"用到"检索到的内容而不是忽略它——每一步都有坑。**LangChain** 帮你快速搭原型,但理解每个节点的作用比会用框架更重要。**Agent** 编排的主线是 **ReAct** 模式:模型先推理再行动,工具结果再反馈给推理——Anthropic 的 *Building Effective Agents* 是这部分最值得精读的设计指南。

### 微调与评估

**LoRA** 和 **QLoRA** 让你在消费级显卡上对开源模型做定制化训练,**Hugging Face PEFT** 是标准工具链入口。但微调完怎么知道变好了?**LLM-as-Judge** 是目前最实用的自动评估思路,也有它自己的偏见,你需要学会设计评估实验而不是盲信分数。

最常见的坑是**只关注准确率、忽略延迟与成本**。生产系统里,一个慢三倍但准确率高两个点的方案往往不如前者实用。学习方式是:每个模块都做一个能跑的小项目,把检索、Agent、微调串成一条完整流水线,用真实数据测、用真实问题倒逼你理解每个设计决策的理由。`,
    outline: [
      "Prompt 工程系统化:few-shot、CoT、结构化输出、system prompt",
      "RAG 全链路:分块 · embedding · 向量检索 · 重排序 · 生成",
      "Agent 编排:ReAct 循环、工具调用、多 Agent 协作",
      "LoRA/QLoRA 微调:参数高效适配原理、PEFT 库",
      "LLM 评估:ROUGE/BERTScore/LLM-as-Judge、人工评估",
      "LLMOps:提示版本、幻觉监控、cost 追踪",
    ],
    resources: [
      { type: "book",  title: "LangChain Documentation", url: "https://python.langchain.com/docs/introduction/" },
      { type: "book",  title: "LlamaIndex Documentation", url: "https://developers.llamaindex.ai/python/framework/" },
      { type: "book",  title: "Hugging Face PEFT Documentation", url: "https://huggingface.co/docs/peft/index" },
      { type: "book",  title: "Anthropic — Building Effective Agents", url: "https://www.anthropic.com/research/building-effective-agents" },
      { type: "video", title: "Full Stack LLM Bootcamp", url: "https://fullstackdeeplearning.com/llm-bootcamp/" },
    ],
    papers: [
      { title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (RAG)", venue: "NeurIPS 2020", url: "https://arxiv.org/abs/2005.11401" },
      { title: "ReAct: Synergizing Reasoning and Acting in Language Models", venue: "ICLR 2023", url: "https://arxiv.org/abs/2210.03629" },
      { title: "LoRA: Low-Rank Adaptation of Large Language Models", venue: "ICLR 2022", url: "https://arxiv.org/abs/2106.09685" },
      { title: "QLoRA: Efficient Finetuning of Quantized LLMs", venue: "NeurIPS 2023", url: "https://arxiv.org/abs/2305.14314" },
    ],
    assignments: [
      "为中文文档集合搭建 RAG 问答:分块 → embedding → 向量检索 → 重排 → 生成,用 ROUGE + LLM-as-Judge 评估",
      "用 ReAct 实现能调用搜索 + 计算器工具的 Agent,分析失败案例",
      "用 QLoRA 微调 7B 开源模型,对比微调前后指标,记录显存与训练曲线",
    ],
    checklist: [
      "能解释 RAG 中向量检索与重排各解决什么问题,以及 chunk size 的影响",
      "对比 LoRA 与全参微调的计算量差异,说明 QLoRA 的量化 + LoRA 叠加",
      "能设计 LLM 评估方案,说明何时用自动指标、何时必须人工评估",
    ],
  },
  {
    id: "c406",
    code: "CS-406",
    moduleId: "m4",
    zh: "研究方法与 Capstone",
    en: "Research Methods & Capstone",
    credits: 8,
    weeks: 8,
    prereq: ["c403"],
    tag: "必修 · 实践",
    goal: "高效读论文、复现实验、文献管理、写作,加一个端到端 Capstone 项目并开源。",
    body: `**一个能讲清楚的项目,比一百篇读过的论文更值钱。** 这门收尾课要解决的不是"学什么",而是"怎么让你学到的东西变成别人看得见的能力"。读论文、复现实验、做 Capstone、开源发布——这四件事串在一起,构成一个研究者或工程师最基本的工作闭环。

**Keshav 三遍法**是读论文的手艺:第一遍五分钟判断值不值得读,第二遍搞清楚主要论点和图表,第三遍才动手复现细节。配合 **Papers with Code** 找实现、**Connected Papers** 画引用图、**Zotero** 管理文献,你的调研效率会有质的提升。很多人卡在这一步——论文堆了几百篇,真正读进脑子的寥寥无几——有了系统方法才能打破这个循环。

### Capstone 的核心逻辑

选题不要追最热的方向,要选**你能在合理时间内跑出可对比基线的问题**。主实验之外一定要做**消融实验**——去掉某个模块性能下降多少,这才是你真正理解了设计决策、而不是碰巧跑出好结果的证明。**Datasheets** 与 **Model Cards** 是文档规范的现代标准,写清楚数据来源、局限性和预期用途,是一个有职业素养的 AI 从业者的基本功。

最后是 **IMRaD** 结构写作与开源发布。代码整洁、README 清晰、实验可复现——这三件事做到,你的 Capstone 就是一个真实的作品集项目,而不是一份只有你自己看得懂的笔记。**能讲清楚取舍,才说明你真懂了。**`,
    outline: [
      "Keshav 三遍法读论文 · Andrew Ng 读论文方法",
      "Papers with Code / Connected Papers / arXiv 调研流程",
      "Zotero 文献管理与 BibTeX",
      "Capstone:选题 · 数据 · 基线 · 主实验 · 消融",
      "Datasheets for Datasets / Model Cards 文档规范",
      "技术写作:IMRaD 结构 · 答辩 · 开源发布(README、demo)",
    ],
    resources: [
      { type: "book",  title: "arXiv.org", url: "https://arxiv.org" },
      { type: "book",  title: "Distill.pub (写作与可视化范本)", url: "https://distill.pub" },
      { type: "book",  title: "Zotero (文献管理)", url: "https://www.zotero.org" },
      { type: "book",  title: "Connected Papers", url: "https://www.connectedpapers.com" },
      { type: "book",  title: "GitHub (代码托管)", url: "https://github.com" },
    ],
    papers: [
      { title: "Datasheets for Datasets", venue: "Gebru et al., 2018", url: "https://arxiv.org/abs/1803.09010" },
      { title: "Model Cards for Model Reporting", venue: "Mitchell et al., 2019", url: "https://arxiv.org/abs/1810.03993" },
      { title: "Grad-CAM (含官方代码,适合作复现练习)", venue: "Selvaraju et al., 2019", url: "https://arxiv.org/abs/1610.02391" },
    ],
    assignments: [
      "三遍法读 5 篇 arXiv 论文,输出统一笔记表",
      "从 Papers with Code 选一篇复现主实验,记录环境、坑、结果对比",
      "完整 Capstone:选题 → 数据集说明 → 基线 → 主实验 → 消融 → 报告 → 开源仓库(README + Model Card + demo)",
    ],
    checklist: [
      "能 5 分钟完成论文第一遍,判断是否值得深读",
      "复现日志含环境、步骤、结果数值对比与差异分析",
      "第三方按 README 在 10 分钟内能运行 demo",
    ],
  },
];

window.MODULES = MODULES;
window.COURSES = COURSES;
window.TOTAL_CREDITS = COURSES.reduce((s, c) => s + c.credits, 0);
window.TOTAL_WEEKS = COURSES.reduce((s, c) => s + c.weeks, 0);
