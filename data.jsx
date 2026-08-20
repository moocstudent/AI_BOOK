// 课程体系数据 —— 4 模块 / 21 门课
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
      "NLP、CV、大语言模型、AI 安全与对齐、大模型应用工程、本地部署实战、研究方法与 Capstone。读 2018-2025 的关键论文,把模型真正跑起来,做端到端的项目。",
    weeks: "34 ~ 45 周",
    credits: 49,
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

@fig c101-svd

这门课的主线,是从"解方程"走向"看变换"。前半程你会重新理解向量空间、基与四个基本子空间——它们回答的是"一个矩阵能把空间映到哪里、又把什么压扁成零"。后半程进入**特征分解**与 **SVD**:前者解释一个变换的"固有方向",后者把任意矩阵拆成"旋转—拉伸—旋转",是 PCA、推荐系统、低秩压缩共同的数学内核。

### 它会在后面哪里出现

不夸张地说,后面每一门课都在还这门课的债:

- **PCA / 降维**就是协方差矩阵的特征分解,主成分就是特征向量。
- **注意力机制**里的 QKᵀ 是一次矩阵乘法,除以 √d 是为了控制它的数值尺度。
- **LoRA 微调**之所以能只训 0.1% 的参数,前提是"权重更新矩阵是低秩的"——这就是 SVD 的语言。
- **梯度、雅可比、Hessian** 全是矩阵;二阶优化方法能不能用,取决于 Hessian 的条件数。

@fig c101-subspaces

### 怎么学最有效

别陷在手算行列式里。每学一个概念,都用 NumPy 把它"画"出来——对一张图片做 SVD、看奇异值衰减、把协方差矩阵的特征向量叠在散点图上。当你能对着一个矩阵说出"它在空间里做了什么",这门课就通了。

建议先用 **3Blue1Brown** 的可视化建立几何直觉(大约 3 小时,回报极高),再用 **MIT 18.06** 补严谨性,两者配合效率最高。Strang 的 18.065 则是专门讲"矩阵方法在数据分析里怎么用"的,可以放在第二遍。

### 常见的坑

最常见的坑,是跳过几何直觉、直接背公式——那样到了深度学习里会处处卡壳。第二个坑是忽略**数值稳定性**:同样是解最小二乘,normal equation 在条件数大时会算崩,而 QR 分解不会;这类知识在你调试"loss 变成 NaN"时才会显出价值。第三个坑是只学实数域——后面做信号、图神经网络时会碰到复数与谱方法,现在留个印象就够了。`,
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

@fig c102-chain

这门课的主线,是从**多元链式法则**出发,打通它与**反向传播**的等价性——你会发现 BP 算法本质上就是一次精心组织的链式求导:每个节点只需要知道自己的局部导数,再乘上游传来的梯度。然后课程进入**凸优化**的核心地带:凸集、凸函数的判定,以及一阶方法为什么在工程上比二阶方法更受欢迎。最后通过**拉格朗日对偶**和 **KKT 条件**理解约束优化的语言——这是你读 SVM、RLHF 相关论文时绕不开的基础。

### 优化器不是玄学

初学者容易停在"Adam 比 SGD 好"这个结论上。真正该问的是它们各自改了什么:

- **SGD** 只看当前梯度,在峡谷形状的损失面上会来回震荡。
- **Momentum** 把历史速度累积起来,相当于给小球加了惯性,能穿过震荡直接下坡。
- **Adam** 给每个参数一个自适应的学习率,在梯度稀疏(比如词嵌入)时优势明显;代价是有时泛化不如调好的 SGD。

@fig c102-optim

### 怎么学最有效

先跟 **MIT 18.02** 把多元微分的几何直觉建好,再读 **Boyd 凸优化**前几章理解凸性的结构意义。学优化器时,用 PyTorch 手写一遍梯度下降、把每一步的梯度值打印出来对照公式,直觉会快很多。一个很有效的练习是:在 Rosenbrock 函数这种"香蕉形"损失面上,把三种优化器的轨迹画在同一张图上。

### 常见的坑

最常见的坑是把"学会求偏导"当成目标,其实导数只是工具,**凸性与非凸性的区别**才是你要真正关心的事:深度学习的损失面几乎不是凸的,所以局部极小值、鞍点、学习率调度这些话题才有意思。另一个坑是忽视**学习率**——它是唯一一个"调错了其他全白搭"的超参,值得你专门花一天做敏感性实验。`,
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
    body: `**概率是机器学习处理不确定性的语言。** 模型输出的从来不是"答案",而是一个分布;你测出来的准确率也不是真值,而是一个带宽度的区间。不建立这个观念,你会长期把噪声当成信号——这正是大量"我们优化后提升了 3%"结论其实站不住的原因。

@fig c103-bayes

这门课的主线有两条,建议对照着学。一条是**频率派**:参数是固定的未知量,你用样本去估计它,关心的是估计量的偏差、方差与一致性,最大似然(MLE)是它的代表。另一条是**贝叶斯派**:参数本身是随机变量,你用数据把先验更新成后验,关心的是整个分布而不只是一个点。两条线在大样本下结论趋同,但在小样本、在需要表达"我有多不确定"时,差别很大。

### 你会反复用到的几件事

- **最大似然**是交叉熵损失的来源:最小化交叉熵等价于最大化似然。
- **共轭先验**让贝叶斯更新可以闭式计算,是理解变分推断的入口。
- **中心极限定理**决定了你的评估集要多大——想把误差减半,样本量得变四倍。
- **假设检验**告诉你两个模型的差别是不是噪声;A/B 实验的全部数学都在这里。

@fig c103-clt

### 怎么学最有效

每学一个分布,就用 NumPy 采一万个样本画直方图,再和理论密度叠在一起看。每学一个估计量,就做一次**自助法(bootstrap)**:重采样一千次,看你的估计到底有多稳。这两个动作会把抽象的"方差"变成你眼睛能看见的东西。

强烈建议配一个真实小项目:拿你手上任意一个模型,给它的准确率算一个 95% 置信区间。多数人第一次算完都会吃一惊——区间比想象中宽得多。

### 常见的坑

第一个坑是只学公式不学**模拟**:很多概率直觉(比如生日问题、辛普森悖论)靠推导很难建立,靠采样十行代码就懂了。第二个坑是把 p 值当成"结论正确的概率",它不是。第三个坑是忽略**先验的影响**:数据少的时候后验被先验拉着走,这时候下强结论是危险的。`,
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
    body: `**信息论给了"不确定性"一把尺子。** 熵、交叉熵、KL 散度这三个量,你在训练分类器、做变分推断、读 RLHF 论文时会天天遇到。它们看起来是三个公式,其实在回答同一个问题:还剩多少不知道?把这层关系打通,很多损失函数的设计动机会瞬间变得显然。

@fig c104-entropy

这门课的主线,是从**编码**这个非常具体的问题出发。香农问的是:给定一个符号分布,平均最少需要多少比特才能把它编码出来?答案就是熵。而如果你用错误的分布 q 去给真实分布 p 编码,多付出的代价正好是 **KL 散度**。于是"交叉熵 = 熵 + KL"这个恒等式就有了物理意义:你优化交叉熵时,固有的那部分(熵)动不了,你能压的只有 KL——也就是你的模型离真相有多远。

@fig c104-coding

### 它在实践中的样子

- **交叉熵损失**是分类任务的默认选择,原因就在上面这个恒等式。
- **困惑度(perplexity)** 就是 2^交叉熵,它在说"模型平均每步要在多少个等可能选项里犹豫"。
- **KL 不对称**:KL(p‖q) 惩罚"该覆盖的没覆盖",KL(q‖p) 惩罚"不该出现的出现了"。变分推断选后者所以结果偏窄,这个现象叫 mode-seeking。
- **互信息**是特征选择、表示学习(InfoNCE、对比学习)的理论支点。

### 怎么学最有效

先读 **Cover & Thomas** 的前三章建立框架,再看 **David MacKay** 的书——他把信息论和推断讲成了一件事,而且写得极好读。动手部分建议做一个真实的压缩实验:用不同的模型给同一段文本编码,对比压缩率,你会亲眼看到"更好的模型 = 更短的编码"。

### 常见的坑

最大的坑是把这门课当成纯理论跳过去。它的回报是滞后的:学的时候觉得抽象,但等你读到扩散模型的 ELBO、RLHF 的 KL 惩罚项、对比学习的 InfoNCE 时,会发现全是这门课的语言。第二个坑是记混 KL 的两个方向——建议专门做一次实验,用两个方向分别拟合同一个双峰分布,看结果差别。`,
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
    body: `**算法课不是为了让你手写红黑树。** 它真正要装进你脑子里的,是一种条件反射:看到一段代码,先问"输入规模会长到多大,这段代码会随它怎么增长"。做 AI 的人跳过这门课,通常会在两个地方栽跟头——数据预处理慢到跑不完,以及推理服务扛不住并发。

@fig c201-complexity

这门课的主线是"代价"。前半程建立分析工具:渐进复杂度、递归式求解、摊还分析。后半程把常见问题归类:排序与查找、图算法(最短路、拓扑排序、最小生成树)、动态规划、贪心与分治。**动态规划**值得多花时间——它和强化学习里的贝尔曼方程是同一个思想,学好了后面能省一大截。

### 数据结构就是一张取舍表

没有一种结构在所有操作上都最优,选型就是在"查、插、删"里挑你最在意的那一列。而在真实机器上,还有第四列常被忽略:**缓存局部性**。数组比链表快,很多时候不是复杂度赢了,是内存布局赢了。

@fig c201-structures

### 对 AI 工程师特别重要的几块

- **哈希与集合**:去重、特征映射、词表构建,天天用。
- **堆 / 优先队列**:top-k 检索、beam search 的核心结构。
- **图算法**:计算图、依赖调度、知识图谱都建立在它上面。
- **动态规划**:编辑距离、维特比解码、序列对齐,以及贝尔曼方程。

### 怎么学最有效

刷题有用,但要挑着刷:比起追求数量,更重要的是每道题做完能说出"这类问题的特征是什么、我用了哪个模板"。建议按专题走(先把 DP 一次刷透,再动图论),而不是随机刷。**CLRS** 当参考书查,不必从头读到尾;**Sedgewick** 的可视化更适合建立直觉。

### 常见的坑

第一个坑是只背模板不做**复杂度估算**:写完一段代码要能立刻说出它的时间和空间量级。第二个坑是忽略常数因子和内存访问模式——在 n 不大的时候,一个 O(n²) 的连续数组扫描可能比 O(n log n) 的指针跳转还快。第三个坑是不写测试:算法题的边界条件(空输入、单元素、全相同)正是线上崩溃的高发区。`,
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
    body: `**单机时代结束了,但并行不是免费的午餐。** 这门课要建立的第一个观念是:加机器带来的加速有一个硬上限,而这个上限由你代码里那一小段无法并行的部分决定。想清楚这件事,你才不会在该做 profiling 的时候去申请预算买卡。

@fig c202-amdahl

这门课的主线是"协调的代价"。你会先学并发的基础:进程与线程、锁与无锁、数据竞争与内存模型——这些是所有并行 bug 的来源。然后进入分布式:CAP 定理、一致性模型、共识算法(Raft)、以及 MapReduce 这类经典的编程模型。最后落到与 AI 直接相关的部分:**集合通信原语**(all-reduce、all-gather、broadcast),它们是多卡训练的底层。

### 三种切法,对应三种瓶颈

大规模训练里,"模型放不下"和"数据太多"是两个不同的问题,解法也不同:

- **数据并行**:每卡一份完整模型,各算各的批,再同步梯度。通信最少,应该最先试。
- **张量并行**:把单层的矩阵横着切开。通信最重,只在单卡装不下一层时用。
- **流水线并行**:按层纵向切。通信少,但有流水线气泡,要靠 micro-batch 填。

真实的大规模训练几乎总是三者混用,这也是为什么"3D 并行"这个词会反复出现。

@fig c202-parallel

### 怎么学最有效

理论看 **MIT 6.824**(它的 Lab 是公认最好的分布式练手项目),动手就用 PyTorch 的 DDP 跑一个双卡训练,再故意把 batch size、通信后端换一换,看吞吐怎么变。能把"为什么加了一张卡只快了 1.4 倍"解释清楚,这门课就学到位了。

### 常见的坑

最常见的坑是**没测就先扩**:很多时候瓶颈根本不在计算,而在数据加载(CPU 喂不饱 GPU)或者日志写盘。先用 profiler 找到真正的串行段。第二个坑是低估**调试难度**:并行 bug 往往不可复现,所以日志、确定性种子、以及最小复现用例比在单机时重要十倍。`,
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
    body: `**理解 GPU,本质上是理解"搬数据比算数据贵得多"。** 现代 GPU 的算力已经严重过剩,绝大多数深度学习算子并不是被算力卡住,而是被显存带宽卡住。这门课会把这个反直觉的事实变成你的默认假设,并给你一套定位和优化的方法。

@fig c203-memhier

这门课的主线是**存储层级**。从寄存器、共享内存、L2 到 HBM,每往下一层,容量大一个数量级、带宽掉一个数量级。CUDA 编程的绝大部分技巧——合并访存、共享内存 tiling、避免 bank conflict、算子融合——都在做同一件事:让数据尽量少搬,搬上来之后尽量多用几次。

### Roofline:先定位,再优化

在动手改代码之前,你需要知道自己被什么卡住。Roofline 模型给了一个非常实用的判据:算一下你的算子的**算术强度**(每搬一字节能做多少次浮点运算),就能知道自己落在带宽受限区还是算力受限区。落在带宽区时,换更强的卡毫无意义,该做的是提高复用或者融合算子。

@fig c203-roofline

### 你会亲手写的东西

从简单到难:向量加法(体会合并访存)→ 矩阵转置(体会 bank conflict)→ 分块矩阵乘(体会共享内存 tiling)→ softmax / layernorm 融合算子(体会为什么融合有效)。写完这四个,你再看 FlashAttention 这类工作会顺畅很多——它本质上就是把注意力的中间结果留在片上、不写回 HBM。

### 怎么学最有效

**NVIDIA 官方的 CUDA C++ Programming Guide** 是权威参考,但别当教材读。更有效的路径是:每写一个 kernel 就用 Nsight Compute 测一次,看它报告的带宽利用率和算力利用率,然后带着这个数字去改。测量驱动的学习在这门课里回报最高。

### 常见的坑

第一个坑是过早手写 kernel:先确认 PyTorch 现成算子真的不够快,再动手。第二个坑是只看 FLOPs 不看带宽,导致优化方向完全错误。第三个坑是忽略**精度**:FP16/BF16 能大幅提速,但溢出与精度损失需要配合 loss scaling 和精度敏感层保留 FP32。`,
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
    body: `**同样一个模型,在不同的系统里可以差出十倍的成本。** 这门课要回答的是:模型跑起来之后,时间和钱到底花在哪里,以及怎么把它们省下来。它是连接"算法能跑"和"业务能用"之间的那一段,也是最容易被自学者跳过、进了公司又最先被问到的一段。

@fig c204-trainserve

这门课的主线是把系统拆成两套:**训练系统**优化吞吐(单位时间处理多少样本),**推理系统**优化延迟(单个请求多久返回)。两个目标经常互相打架,而分不清自己在优化哪一个,是这门课最常见的认知错误。训练侧你会学数据流水线、混合精度、梯度累积、检查点与容错;推理侧你会学批处理策略、KV 缓存、量化、以及模型并行的部署形态。

### 吞吐与延迟的交易

批处理是最典型的例子:批越大,GPU 利用率越高、吞吐越好;但每个请求要等更久才被处理。最优点不在曲线的任何一端,而在你的 SLA 上——先定"P95 必须小于多少",再回头挑能满足它的最大批。

@fig c204-batching

大模型推理里,**连续批处理(continuous batching)** 之所以关键,就是因为它让请求随到随入、算完就走,不必等整批对齐,等于把延迟曲线压平了一大截。

### 怎么学最有效

这门课必须靠测量来学。给自己一个具体目标——比如"把这个模型的推理成本降一半"——然后依次尝试:量化、批处理、KV 缓存优化、算子融合、换更小的模型。每做一步都记录吞吐、P95 延迟和显存占用三个数字。做完一轮,你对 ML 系统的理解会超过读十篇博客。

### 常见的坑

第一个坑是用错指标:训练关心 MFU(算力利用率),推理关心 P95 和每 token 成本,拿其中一个去优化另一套系统必然跑偏。第二个坑是只测平均值不看**长尾**——用户感受到的是 P95 和 P99。第三个坑是忽略显存碎片:长时间运行的推理服务,显存管理不当会在几小时后 OOM。`,
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
    body: `**模型上线不是终点,是维护责任的起点。** 这门课要建立的核心观念是:一个模型的价值不取决于它在验证集上的分数,而取决于它在真实分布持续变化的情况下,还能稳定工作多久。缺了这一层,前面所有课学到的东西都只能停在 demo。

@fig c205-lifecycle

这门课的主线是**闭环**。数据版本 → 训练与实验跟踪 → 评估门禁 → 打包注册 → 灰度发布 → 线上监控 → 漂移检测 → 回流标注 → 回到数据版本。这个环上任何一个节点断掉,后面所有节点都会慢慢失效;而最常断的,恰恰是上线之后那半圈——发完就没人看了。

### 三条硬要求

- **一切可版本化**:数据、特征、模型、配置都要能回滚到任意一天。出事时能快速回滚,比什么都重要。
- **评估要做成门禁**:不达标不许上线。人工判断"感觉还行"在第三次发布之后一定会失守。
- **线上要能回流**:采样的线上请求要能变成下一轮的训练与评估数据,否则你的评估集会越来越不像现实。

@fig c205-drift

### 漂移是慢慢发生的

线上效果很少断崖式下跌,它是慢慢滑下去的——这正是它难被发现的原因。等到用户投诉时,通常已经掉了两周。要同时盯三条曲线:输入分布(用户问的东西变了吗)、输出分布(模型的回答变了吗)、业务指标(点击、转化、投诉)。前两条通常比第三条早两周报警。

### 怎么学最有效

用一个小项目走完整个环:训一个简单模型,用 **MLflow** 或 **DVC** 管住数据和实验,打成容器,用 **FastAPI** 起一个服务,加上 Prometheus 指标,再人为制造一次分布漂移看你的监控能不能报出来。这一遍走完,你对 MLOps 的理解会比读任何文档都扎实。

### 常见的坑

第一个坑是工具先行:先想清楚你要解决哪个具体痛点,再选工具,否则很容易搭出一套没人用的复杂平台。第二个坑是**只监控系统指标不监控模型指标**——CPU 和 QPS 一切正常,但模型早就答错了。第三个坑是没有回滚演练:一条从来没被用过的回滚路径,在真正需要时通常是坏的。`,
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
    body: `**机器学习是这一整套体系的地基。** 深度学习只是它的一个子集,而它教给你的东西——如何定义问题、如何评估、如何判断模型是欠拟合还是过拟合——在任何模型上都成立。跳过这门课直接学深度学习的人,往往能把网络训起来,却说不清"为什么这个结果不可信"。

@fig c301-biasvar

这门课的主线是**泛化**:模型在没见过的数据上表现如何。围绕它,你会学到三组工具。第一组是模型族:线性模型、树与集成(随机森林、GBDT)、SVM、聚类与降维——每一类对应一种归纳偏置。第二组是评估:交叉验证、混淆矩阵、ROC/PR 曲线、以及为什么在类别不均衡时准确率毫无意义。第三组是诊断:偏差-方差分解、学习曲线,它们告诉你下一步该加数据还是加容量。

### 一个必须养成的诊断顺序

看到效果不好,先看训练误差和验证误差之间的**间隙**:

- 间隙小,但两条线都很高 → **欠拟合**,该加容量、加特征、训久一点。
- 间隙大 → **过拟合**,该加正则、加数据、或者换更简单的模型。

跳过这一步直接调超参,是自学者最常见的时间浪费。

@fig c301-pipeline

### 真实项目和课堂的差别

课堂上的机器学习从"给定数据集"开始;真实项目里,70% 的时间花在问题定义、数据清洗和错误分析上,模型选型反而是最标准化的一段。这也是为什么"换个更强的模型"很少是正确答案。

**错误分析**是被跳过最多、回报最高的一步:把验证集里做错的 50 条拉出来分类,你几乎总能发现一两类系统性错误,而它们往往一条规则就能修掉。

### 怎么学最有效

**吴恩达的 CS229** 给理论,**《统计学习方法》**或 **ESL** 给推导,**scikit-learn 官方文档**给工程实感。最有效的练习是:选一个 Kaggle 老比赛,不看别人的方案,自己从数据探索做到提交,然后再去看前排怎么做的——这个落差就是你要补的东西。

### 常见的坑

第一个坑是**数据泄漏**:在划分训练/验证集之前做了标准化、或者用了包含未来信息的特征,分数会好得不真实。第二个坑是只看单一指标;第三个坑是在没有基线的情况下谈提升——先跑一个最朴素的基线(比如"永远预测多数类"),很多"厉害的模型"其实还不如它。`,
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
    body: `**深度学习的核心不是"层数多",而是"表示是学出来的"。** 传统机器学习里,特征由人设计;深度学习里,特征由数据和梯度自己长出来。理解这一点的转变,比记住任何一个网络结构都重要。

@fig c302-block

这门课的主线,是从一层的构成开始,一路搭到现代架构。一层里有四个部件,各管一件事:**线性变换**提供参数、**归一化**稳住数值尺度、**激活函数**提供非线性、**残差连接**给梯度一条直达底层的通路。去掉任何一个都会出事——没有非线性,堆多少层都等价于一个线性变换;没有残差,二十层以上基本训不动。Transformer 的一层也是这个结构,只是把线性变换换成了注意力加前馈两个子层。

### 训练是一门手艺,但有章法

模型结构定下来之后,真正决定成败的是训练过程。学习率是唯一一个"调错了其他全白搭"的超参:太大会震荡甚至发散,太小会慢到看不出趋势。看损失曲线的**形状**,比看最终数字更能告诉你下一步该改什么。

@fig c302-training

正则手段按性价比排序也很清楚:更多数据 > 数据增强 > 早停 > 权重衰减与 Dropout。这个顺序值得背下来——它提醒你在加复杂技巧之前,先问"我还能不能弄到更多数据"。

### 怎么学最有效

先用 **numpy 从零实现一个两层网络**(包括反向传播),这一步不能省;它会让你之后使用任何框架时都心里有底。然后转到 PyTorch,把同一个网络重写一遍,对比结果。之后跟着 **CS231n** 或 **d2l.ai** 走,每章都亲手跑代码。

一个特别有效的练习:故意把模型训到过拟合(在 100 张图上训到训练准确率 100%),再逐个加正则手段看验证曲线怎么变。这个实验能把抽象的正则概念变成肌肉记忆。

### 常见的坑

第一个坑是**只调超参不看数据**:很多时候标注有噪声、类别分布不均,再怎么调网络都没用。第二个坑是不做**单批过拟合测试**——训练前先拿一个 batch 训到损失接近 0,如果做不到,说明代码有 bug,继续训只是浪费时间。第三个坑是随机种子不固定,导致实验之间无法比较。`,
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
    body: `**强化学习处理的是一类监督学习无法表达的问题:没有正确答案,只有延迟的奖励。** 下棋时没人告诉你这一步该怎么走,只有几十步之后的胜负;推荐系统推了什么,会改变用户接下来看到什么。这类"你的动作会改变将来的数据"的问题,只能用 RL 的语言描述。

@fig c303-mdp

这门课的主线是**马尔可夫决策过程(MDP)**:状态、动作、转移、奖励、折扣因子。围绕它,你会学到价值函数与贝尔曼方程(它和动态规划是同一个思想),然后是三条主要路线——基于价值、基于策略、演员-评论家——以及它们各自的样本效率与稳定性代价。

### 三件让它变难的事

- **没有标签**:只有一个标量奖励,而且往往稀疏。
- **奖励是延迟的**:这一步的好坏,几十步后才知道(信用分配问题)。
- **数据分布随策略变**:策略一改,你看到的样本就全变了,这打破了监督学习的独立同分布假设。

这三件事解释了为什么 RL 的训练比监督学习不稳定得多,也解释了为什么"重跑一次结果完全不同"在 RL 里是常态。

@fig c303-family

### 为什么今天必须学它

RLHF 让强化学习从一个相对小众的方向变成了大模型工程师的必备知识。理解 PPO 之前,你需要先想清楚一条主线:REINFORCE 的方差为什么那么大 → 为什么需要一个 critic 来减方差 → 为什么需要限制策略的更新幅度。把这条线走通,再读 RLHF 和 DPO 的论文会顺很多。

### 怎么学最有效

**David Silver 的课**建立框架,**Sutton & Barto** 当权威参考(前 8 章值得精读),**Spinning Up** 提供最干净的代码实现。动手从表格法开始:在 FrozenLake 上写 Q-learning,把 Q 表打印出来看它怎么收敛。然后再上 DQN、PPO。

### 常见的坑

第一个坑是直接从深度 RL 开始,跳过表格法——那样你会把"算法不收敛"和"网络训不动"混在一起,无从调试。第二个坑是低估**超参敏感性**:同一份代码换个种子结果可能天差地别,所以任何结论都要跑多个种子。第三个坑是奖励设计:奖励函数写歪一点,智能体就会找到你完全没想到的漏洞去刷分。`,
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
    body: `**概率图模型教你把"谁和谁无关"画出来。** 这件事的价值不是画图好看,而是省参数:四个二值变量的完整联合分布需要 15 个参数,如果图告诉你它们构成一条链,只需要 7 个。变量一多,这个差距就是指数级的。这就是结构化建模的全部意义。

@fig c304-pgm

这门课的主线是三件事:**表示**(怎么用图描述一个联合分布)、**推断**(已知一部分变量,问另一部分的分布)、**学习**(从数据里估计参数和结构)。有向图(贝叶斯网络)适合描述因果和生成过程,无向图(马尔可夫随机场)适合描述相互作用;两者对条件独立的编码方式不同,各有各的适用场景。

### 推断:从精确到近似

图稀疏时,精确推断是可行的——变量消元、信念传播、联结树。但图一稠密,精确推断立刻变成指数复杂度,只能退到近似:MCMC 采样(渐近精确但慢)或者变分推断(把求积分变成求最优)。

@fig c304-inference

**变分推断这一步转换特别值得重视**:它是 VAE 的 ELBO 的来源,也是扩散模型训练目标的推导起点。学这门课最实际的回报,就是后面看生成模型的推导时不再卡壳。

### 它还活着吗

会有人问:深度学习时代还需要 PGM 吗?需要,而且理由很具体——**任何时候你需要表达结构化的不确定性,它就是那门语言**。序列标注的 CRF、话题模型 LDA、卡尔曼滤波、以及现在的结构化生成与因果推断,底子都在这里。它更像一门"看待模型的方式",而不是一个具体工具。

### 怎么学最有效

**Koller 的 PGM 课**是最系统的,但很重;如果时间有限,可以先读 **Bishop PRML 第 8 章**建立框架,再挑感兴趣的模型深入。动手部分建议实现一个简单的 HMM 并写出维特比解码——这个练习同时打通了动态规划和图模型两条线。

### 常见的坑

最大的坑是陷在推导里出不来。建议每学一个概念就问"它在什么真实问题上有用",找不到答案就先跳过。第二个坑是忽略**条件独立的判定**(d-分离):这是整门课最核心也最容易含糊过去的技能,值得专门练。`,
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
    body: `**生成式 AI 要回答的问题是:如何从数据中学到一个分布,然后从里面采出新样本。** 判别模型只需要学一条边界,生成模型要学整片地形——这就是它更难、也更有意思的原因。

这门课的主线是四个家族:VAE、GAN、Flow、Diffusion。它们的差别可以用两个轴概括——样本质量,以及训练稳定性。扩散模型之所以在这两年赢下大部分战场,是因为它同时拿到了高质量和稳定训练,代价只是采样慢,而采样慢是可以靠蒸馏和更好的采样器补的。

@fig c305-families

### 扩散模型:简单到出奇的训练目标

前向过程只是不断加噪声,没有任何需要学的东西;真正要学的是反向那一步——给定一张带噪图,预测"加进去的噪声是什么"。训练目标就一行:‖ε − εθ(xₜ, t)‖²。随机取一张图、随机取一个时间步、随机采一个噪声,让网络把这个噪声猜出来。

没有对抗训练、没有判别器,这就是它比 GAN 稳定得多的根本原因。

@fig c305-diffusion

### 多模态:条件从哪来

文生图、文生视频基本都是"扩散 + 一个把文本编码成条件的编码器"。所以这门课的顺序是:先把扩散讲透,再谈条件注入(cross-attention)、无分类器引导(CFG)、以及跨模态对齐(CLIP 这类对比学习目标)。理解了 CFG 的引导强度在做什么,你就能解释为什么调高它图更"听话"但也更容易失真。

### 怎么学最有效

先读 **Lilian Weng 的扩散模型综述**建立全貌,再跟 **Hugging Face Diffusers 课程**动手。强烈建议亲手实现一个**在 MNIST 上的最小 DDPM**——大约两百行,却能让你把加噪调度、时间嵌入、U-Net 条件注入全部打通。跑通之后再去读 Stable Diffusion 的代码会轻松很多。

### 常见的坑

第一个坑是只会调 API 不懂原理,结果遇到生成质量问题时无从下手。第二个坑是忽略**采样器**的影响:同一个模型换个采样器和步数,质量与速度差别很大。第三个坑是低估**评估**的难度——FID 这类指标和人的主观感受经常不一致,做生成方向一定要同时准备人工评估流程。`,
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
    body: `**NLP 是最早被大模型彻底重写的领域,但它的问题结构没有变。** 分词、表示、序列建模、生成与评估——这些环节今天依然存在,只是每一环的实现方式都换了一遍。理解这条演进线,比记住任何单个模型都有价值。

@fig c401-evolution

这门课的主线,是"怎么表示一个词"的历史。从词袋只数频率(丢掉了顺序,也不知道近义词),到词向量给每个词一个稠密向量(有语义了,但一词一义),到 RNN/ELMo 让向量随上下文变化(解决了一词多义,但长依赖会衰减),最后到 Transformer 让每个位置直接看全序列(长依赖和并行同时解决,代价是 O(n²) 的复杂度)。每一步解决的,都是上一步留下的那个具体缺陷。

### 注意力:一次加权平均而已

公式只有一行:softmax(QKᵀ/√d)·V。每个 token 拿自己的查询向量去和所有 token 的键向量做点积,得到一组相关性分数,归一化成权重,再对值向量加权求和。指代消解在模型内部就长这样——没有任何语法规则,只有一次 softmax。

@fig c401-attention

那个 √d 不是装饰:维度越高点积的数值越大,不缩放的话 softmax 会塌成 one-hot,除自己以外所有位置的梯度都归零。

### 任务与评估

分类、序列标注、问答、摘要、翻译、生成——不同任务的评估难度差别巨大。分类可以用准确率,生成就麻烦得多:BLEU、ROUGE 这类指标和人的判断经常对不上。这门课要建立的一个重要观念是:**评估方法本身就是研究问题**,而不是做完模型之后随手挑一个指标。

### 怎么学最有效

**CS224n** 是这个领域最好的公开课,配套作业质量很高。动手部分建议按顺序做三件事:用 numpy 实现一个最小的注意力、用 PyTorch 从零搭一个小 Transformer 并在字符级数据上训起来、然后微调一个开源预训练模型做具体任务。三步走完,你就打通了从原理到应用。

### 常见的坑

第一个坑是跳过分词:很多"模型怎么这么笨"的现象(数不清字母、中文比英文贵、罕见人名记不住)根子都在分词上。第二个坑是只用现成 API 不看中间结果——把注意力权重可视化出来,你会对模型在做什么有完全不同的认识。`,
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
    body: `**计算机视觉是深度学习最早取得突破的领域,也是归纳偏置作用最明显的地方。** 卷积的两个假设——局部性(相邻像素才相关)和平移不变性(同一个特征在哪都算特征)——让参数量比全连接小几个数量级,也让小数据集上的训练成为可能。

@fig c402-conv

这门课的主线,是从卷积走到 Transformer。前半程你会理解卷积、池化、感受野,以及经典架构的演进逻辑:AlexNet 证明了深度可行、VGG 证明了小卷积核堆叠有效、ResNet 用残差解决了深度带来的梯度问题、EfficientNet 系统化了缩放规律。后半程进入 ViT:把图像切成块当 token,第一层就是全局感受野。两条路线的取舍很清楚——卷积自带归纳偏置、小数据也能训;ViT 没有偏置,但数据一多就反超。

### 任务的粒度决定标注成本

四类任务的差别只在"输出的粒度":一张图一个标签、一个框、一个像素级掩码、还是一段文字。粒度越细,标注越贵——这就是为什么分割数据集永远比分类数据集小,也是自监督学习和大模型在这里格外有价值的原因。

@fig c402-tasks

一条实践建议:先用现成的大模型做零样本基线,再决定要不要标数据。很多任务上零样本已经够用,标注预算该省下来投到评估集上。

### 怎么学最有效

**CS231n** 依然是最好的入口,它对卷积和反向传播的讲解无可替代。动手建议从一个小数据集(CIFAR-10)开始,自己搭网络训到 90% 以上,再用预训练模型微调对比——这个对比会让你直观感受到预训练的价值。之后做一个目标检测或分割的实战项目。

### 常见的坑

第一个坑是忽略**数据增强**:在视觉任务里它常常比换模型更有效,而且几乎免费。第二个坑是不看**错误样本**:把模型分错的图片拉出来看,你经常会发现是标注错了,或者存在数据泄漏。第三个坑是评估指标用错——检测任务里 mAP 的 IoU 阈值选择会显著改变结论。`,
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
    body: `**大语言模型这门课要回答的是:能力从哪里来,以及你能改变什么。** 答案有点反直觉——能力几乎全部来自预训练,而你能接触和改变的几乎全在后面两个阶段。想清楚这个分工,很多工程决策会立刻变得明确。

@fig c403-stages

这门课的主线是三个阶段。**预训练**用万亿 token、数月时间、数千万美元,把语言、知识与推理雏形压进权重;**监督微调**用几千到十万条样本、几小时,教会模型"以什么形式回答";**对齐**(RLHF / DPO)用偏好数据,教它在两个都对的答案里选更好的那个。注意算力占比:预训练占了 99% 以上,你能动的那两格加起来还不到 1%——所以"选对基座模型"这个决定,比后面所有调参加起来都重要。

### 缩放定律:让"再大十倍"变成可算的

损失随算力、参数、数据以幂律下降,在双对数坐标下是一条可以外推的直线。这条线的实用价值在于:它把"再大十倍会怎样"从赌博变成了事先能估的数。三个资源的关系大约是 C ≈ 6ND,而给定预算时的最优配比大约是每个参数配 20 个 token。

@fig c403-scaling

但要注意它的边界:缩放定律描述的是**平均损失**,不是具体能力。某项能力在什么规模"涌现",这条曲线不告诉你——这也是它最常被误读的地方。

### 推理侧同样重要

同一份权重,解码参数和量化方式能让它表现得像两个不同的模型。温度、top-p、KV 缓存、量化精度,这些都要作为这门课的一部分认真学——很多被归咎于"模型不行"的问题,其实是推理配置不行。

### 怎么学最有效

先读 **GPT / Llama / Chinchilla** 三条线的原始论文,再动手用一个小模型(1B 以内)完整走一遍 SFT + LoRA 微调 + 评估。规模小不影响你理解全流程,而且反馈快得多。

### 常见的坑

第一个坑是把微调当成灌知识的手段——事实性知识该用检索,微调改的是行为方式。第二个坑是没有评估集就开始调,结果只能靠"感觉变好了"下结论。第三个坑是忽视数据质量:1000 条精选样本常常打败 10 万条爬来的。`,
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
    body: `**安全与对齐不是给模型加一句"请不要作恶"。** 它是一整套工程实践,而且必须承认一个前提:基于概率的防护永远有漏网率,所以真正的赌注要押在确定性的权限设计上。这门课要建立的就是这种分层思维。

@fig c404-layers

这门课的主线是三层防线。**训练期对齐**(RLHF、DPO、宪法式 AI、数据过滤)改变模型的默认倾向,覆盖面最广但无法保证;**推理期防护**(输入输出分类器、拒答策略)挡住当下这一次,但它是分类器,就一定有误伤率;**系统层约束**(工具权限、沙箱、额度、人工确认)是确定性的——模型再被绕过,也做不了没授权的事。

### 提示注入:必须说清楚的一件事

提示注入不能靠"在系统提示词里再叮嘱一句"解决。根因是架构性的:可信的指令和不可信的数据(检索到的网页、用户上传的文件)混在同一个 token 流里,模型没有可靠的方式区分它们。可行的缓解只能挪到执行层——把外部内容明确标注为数据、工具权限最小必要、不可逆动作一律需要确认。

### 越安全 ≠ 越好

把阈值一路调严,有害输出确实变少,但正常请求被拒绝的比例上升得更快。一个把 15% 正常问题判成违规的助手,用户三天就不用了,而且他不会投诉,他会直接走。

@fig c404-tradeoff

所以有三个数必须显式写下来并定期校准:误拦率的上限、漏放一次的代价、灰区怎么处理。内部研发工具和面向公众的金融客服,这三个数的合理取值差好几个量级。

### 怎么学最有效

读 **Anthropic 的 Constitutional AI**、**OpenAI 的 InstructGPT**、以及 **NIST AI RMF** 这类治理框架,把技术手段和制度手段放在一起看。动手部分建议做一次**红队演练**:给你自己的应用写 30 条攻击提示,统计拦截率和误伤率,再调阈值——这个练习比读十篇论文更能建立手感。

### 常见的坑

第一个坑是把安全当成道德问题而不是工程问题,导致无法量化、无法迭代。第二个坑是只做前两层不做权限设计。第三个坑是不测**误伤率**——被误拦的用户不会来投诉,他们只是不再用了,所以这个数字必须主动去测。`,
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
    body: `**这门课是把前面所有能力落到产品上的那一段。** 它不教新模型,教的是工程判断:面对"效果不够好",你该改提示词、接检索、还是微调?选错一级的代价是巨大的——用一周和几千块去解决一个改十行提示词就能解决的问题,是这行里最常见的浪费。

@fig c405-ladder

这门课的主线是一条**成本阶梯**:改提示词(半天)→ 加 few-shot(一天)→ 接检索(一到两周)→ 监督微调(两到三周)→ 偏好优化(一到两个月)。每往下一级,成本涨一个量级、可逆性掉一截。默认策略应该是从上往下走,每一级都跑一次评估集,只有这一级明确解决不了才继续往下。

判据其实很清楚:**缺知识就检索,缺格式和风格才微调,缺推理就换模型或加循环**。归因错了,后面全白做。

### RAG:一次搜索是不够的

朴素 RAG 是"切块 → 向量搜索 → 塞进提示词",演示里效果惊艳,真实语料上召回率常常只有五成。每一级改进都在补同一个洞。

@fig c405-rag

其中**混合检索**(向量 + 关键词)性价比最高:两路可以并行,几乎不加延迟,却能补上向量找不到精确编号、关键词找不到同义表达的互补盲区。**重排**则是"宽召回 + 窄精排":先取 50 条保证召回,再用交叉编码器精排出 5 条,上下文减半而精确率翻倍。

### Agent:自主度是选择,不是目标

"让它更 agentic 一点"是个坏需求。自主度是一根杠杆:交出去多少控制权,就换回多少适应能力,同时付出多少不可预测性。判据可以简化成一句话——你能不能把这个环节的所有分支写下来?能就写死,不能才给自由。

### 怎么学最有效

做一个端到端的真实项目,并且**从第一天就建评估集**。哪怕只有 50 条来自真实失败的样本,它也会让你后面所有决策从"感觉"变成"数据"。

### 常见的坑

第一个坑是没有评估集就开始优化。第二个坑是跳级——直接上微调,而 90% 的问题在前两级就能解决。第三个坑是忽略成本:一个多带 8 条示例的提示词,在百万级调用上是一笔真金白银的固定开销。`,
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
    body: `**这门课教的是怎么把"学过"变成"做过"。** 前面十九门课给了你工具,这一门给你方法:如何提出一个能在有限时间内证伪的问题,如何设计能说明问题的实验,以及如何把结果写成别人能复现的东西。

@fig c406-loop

这门课的主线是一个不断收窄的循环:读文献 → 提出问题 → 写下假设 → 最小实验 → 对照基线 → 用结果回头修正问题。新手最常卡在第一格和第五格——问题太大导致做不完,或者实验做完了却没有能判定成败的基线。**先定基线,再做实验**,这条纪律能省掉大量白工。

### 三条给新手的硬建议

- **先复现,再创新**。你会在复现里学到论文没写的九成细节,而这些细节才是研究真正的门槛。
- **每个实验先写下"什么结果会让我放弃这个假设"**。写不出来的实验,通常也证明不了任何事。
- **实验记录当天写完**。一周后你会忘记当时为什么那样设参数,而那个理由往往是最关键的信息。

### Capstone:一个 14 周的完整项目

@fig c406-capstone

真正花时间的不是"想新点子",而是复现基线和做消融。能把消融做干净的项目,才有资格说"我的改进有效"——这也是简历上最能说服人的一段。验收标准应该写在开工那天:一个能一键复现的仓库、一张对照基线的表、一段说清"为什么有效"的分析。

### 怎么读论文

三遍法很实用:第一遍只读标题、摘要、图表和结论,判断这篇值不值得继续;第二遍读方法和实验,记下你不懂的点;第三遍带着"如果是我会怎么做"去读细节。绝大多数论文停在第一遍就够了,你的时间应该花在那 10% 值得精读的上面。

### 常见的坑

第一个坑是"读了很多但没动手",知识停留在能复述的层面。第二个坑是项目做完不写文档——三个月后你自己也跑不起来。第三个坑是选题过大:一个能在两周内证伪的小问题,价值远高于一个做不完的大构想。`,
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
  {
    id: "c407",
    code: "CS-407",
    moduleId: "m4",
    zh: "本地大模型实战:从下载到对话",
    en: "Running an Open LLM Locally",
    credits: 6,
    weeks: 4,
    prereq: ["c403"],
    tag: "必修 · 实践",
    goal:
      "把一个开源大模型在自己的机器上完整跑起来:环境、权重、加载、对话、排查。目标不是学新理论,而是打通那条从「下载」到「它回答我了」的链路。",
    body: `**这门课只解决一件事:让模型在你自己的机器上真的跑起来。** 前面的课教你模型为什么能工作,这门课教你把它装进一台具体的、内存有限的、可能没有显卡的机器里。这两件事之间的距离,比大多数人预期的要远——而且几乎所有的坑都不在论文里,只在别人的报错日志里。

我们以 **ChatGLM3-6B** 为例走完整条链路。选它的理由很实际:中文效果好、仓库自带命令行/网页/API 三套 demo、模型足够小到笔记本可以尝试、又足够大到能把所有典型的坑都踩一遍。

@fig c407-pipeline

### 六步,每一步都有一个坑

**第一步:拿代码。** \`git clone https://github.com/THUDM/ChatGLM3.git\`。这一步基本不会出错,但要注意这个仓库最后更新停在 2025 年 1 月,官方重心已转到 GLM-4 系列——这直接决定了下一步的版本选择。

**第二步:拿权重。这里是第一个大坑。** 权重不在 GitHub 上,在 Hugging Face(\`THUDM/chatglm3-6b\`)。如果你直接 git clone 模型仓库而本机没装 git-lfs,你会得到一个**看起来完全正常**的目录:config.json 在、各种 .py 在、连 index.json 都在,**唯独没有权重**——那 7 个 safetensors 分片一个都没下来。判断方法很简单:检查目录里有没有 7 个 1~1.9GB 的 \`model-0000X-of-00007.safetensors\`,总计约 11.6GB。更稳妥的做法是用 \`huggingface_hub\` 的 \`snapshot_download\` 脚本下载,支持断点续传,还能用 \`allow_patterns\` 只取 safetensors,跳过体积相同的 .bin 副本,省下 12GB 磁盘。

**第三步:装环境。第二个坑是版本。** 这一步的每个版本号都不是随便定的:

| 依赖 | 版本 | 原因 |
|---|---|---|
| Python | 3.10 ~ 3.12 | 3.13+ 没有对应的 torch/transformers 轮子 |
| torch | 2.3.1 | 无显卡务必用 \`--index-url .../whl/cpu\`,否则默认装 2.5GB 的 CUDA 版 |
| transformers | **4.40.2** | 4.42+ 重构了 KV Cache 接口,仓库自带的建模代码会直接报错 |
| numpy | **< 2.0** | torch 2.3.1 按 NumPy 1.x 的 ABI 编译,装 2.x 会 ABI 报错 |

「锁版本」在这里不是保守,而是必需:ChatGLM3 的 \`modeling_chatglm.py\` 是随权重一起下发的 \`trust_remote_code\` 代码,它按 2023 年的 transformers 接口写成,而上游已经不再跟进。**遇到 trust_remote_code 的模型,先查它最后一次更新的时间,再决定依赖版本。**

**第四步:加载。第三个坑最隐蔽。** 仓库自带的 \`cli_demo.py\` 里写的是 \`device_map="auto"\`,而且没指定 \`torch_dtype\`。这两处在无显卡的机器上都要改:不指定精度会按 float32 加载,6B 需要 24GB;而 \`device_map="auto"\` 在内存不够时不会报错,它会把权重悄悄卸载到磁盘,然后每生成一个 token 都重新读盘一次。

正确写法是只在有 CUDA 时才传 \`device_map\`:

\`\`\`python
DTYPE = torch.float16 if torch.cuda.is_available() else torch.bfloat16
kwargs = dict(trust_remote_code=True, torch_dtype=DTYPE,
              low_cpu_mem_usage=True)
if torch.cuda.is_available():
    kwargs["device_map"] = "auto"
model = AutoModel.from_pretrained(MODEL_PATH, **kwargs).eval()
\`\`\`

@fig c407-ledger

**第五步:对话。** \`python cli_demo.py\`,输入内容回车,\`clear\` 清历史,\`stop\` 退出。仓库还提供 Gradio 网页版、Streamlit 网页版,以及一个 OpenAI 兼容的 API 服务(\`openai_api_demo/api_server.py\`)——最后这个很有用,它让你已有的、按 OpenAI 接口写的代码不改一行就能指向本地模型。

**第六步:排查。** 如果慢得离谱,先看加载日志有没有这句:\`Some parameters are on the meta device because they were offloaded to the disk and cpu\`。还有一个反直觉的信号:**加载太快是坏事**。11.6GB 如果六秒就"加载完成",说明它根本没读进内存。

### 一次真实的测量

在一台 i5-12450H、15.7GB 内存、无独显的笔记本上,用未修改的 \`device_map="auto"\` 跑这个模型,实测结果是:**629.3 秒生成 13 个 token**,即 48.4 秒一个字。模型输出的中文完全正确,程序也正常退出——它"能跑",只是每个字要等将近一分钟。

这个数字值得记住,因为它教的不是"CPU 慢",而是**故障可以静默**:没有报错、没有警告弹窗,只有一行淹没在日志里的提示和一个慢一千倍的系统。工程上最难查的问题往往是这一类。

### 硬件到底要多少

先记住这条不等式:**权重体积 ≤ 可用内存 − 1.5GB**。注意是"可用",不是"总共"——那台 15.7GB 的笔记本,开着浏览器时可用内存只有 4.85GB,而单个进程占用最高的也才 0.39GB;那 11GB 是被几十个小进程一起吃掉的,这是桌面系统的常态。

按精度换算权重体积:fp16/bf16 是每参数 2 字节,int8 是 1 字节,int4 是 0.5 字节。6B 模型在 bf16 下就是 12GB,在 int4 下是 3.7GB。

**关于量化的一个具体限制:** ChatGLM3 自带的 \`quantization.py\` 第 126 行有一句硬性断言,要求权重必须在 CUDA 设备上,它的 int4 路径在纯 CPU 上用不了。想在 CPU 上跑 int4,得换 llama.cpp / Ollama 的 GGUF 格式——同级别 CPU 上通常能到 5~8 token/秒,是能正常对话的速度。

### 常见的坑

第一个坑是**盲目下载**:12GB 下完了才发现机器跑不动。算一下权重体积和可用内存只要两分钟,下载要半小时——先算再下。第二个坑是**不锁版本**:pip install 最新版,然后在一堆看不懂的 KeyError 里查半天。第三个坑是**把配置问题当成硬件问题**:看到慢就断定"CPU 不行",结果真正的原因是一个可以改的加载参数。养成先看日志、再下结论的习惯,这门课的价值就已经收回来了。`,
    outline: [
      "开源模型生态:GitHub 放代码,Hugging Face 放权重",
      "git-lfs 陷阱与 snapshot_download 的正确用法",
      "版本锁定:trust_remote_code 模型的依赖考古",
      "加载参数:torch_dtype、low_cpu_mem_usage 与 device_map 的陷阱",
      "四种 demo:命令行、Gradio、Streamlit、OpenAI 兼容 API",
      "性能排查:静默降级的识别与内存账本",
    ],
    resources: [
      { type: "code", title: "ChatGLM3 官方仓库(含 basic_demo / finetune_demo)", url: "https://github.com/THUDM/ChatGLM3" },
      { type: "code", title: "THUDM/chatglm3-6b 权重与模型卡", url: "https://huggingface.co/THUDM/chatglm3-6b" },
      { type: "doc", title: "Transformers · Big Model Inference(device_map 与卸载机制)", url: "https://huggingface.co/docs/accelerate/usage_guides/big_modeling" },
      { type: "doc", title: "huggingface_hub · 下载与断点续传", url: "https://huggingface.co/docs/huggingface_hub/guides/download" },
      { type: "code", title: "llama.cpp — CPU 上跑量化模型的事实标准", url: "https://github.com/ggml-org/llama.cpp" },
      { type: "code", title: "Ollama — 本地模型的一键运行器", url: "https://github.com/ollama/ollama" },
    ],
    papers: [
      { title: "ChatGLM: A Family of Large Language Models from GLM-130B to GLM-4", venue: "GLM Team, 2024", url: "https://arxiv.org/abs/2406.12793" },
      { title: "GLM-130B: An Open Bilingual Pre-trained Model", venue: "Zeng et al., ICLR 2023", url: "https://arxiv.org/abs/2210.02414" },
      { title: "LLM.int8(): 8-bit Matrix Multiplication for Transformers at Scale", venue: "Dettmers et al., 2022", url: "https://arxiv.org/abs/2208.07339" },
    ],
    assignments: [
      "在本机完整跑通一个开源模型:写下每一步的命令、报错与解决办法,形成一份可复现的部署笔记",
      "写一个部署预检脚本:输入参数量与精度,读取本机可用内存,输出「能否装下 / 预估 token 速度」",
      "对同一模型做加载方式对比实验(改 / 不改 device_map),各测 3 次,报告 token/秒的差异并解释原因",
      "把本地模型接到 OpenAI 兼容 API 后面,用一段原本调用云端 API 的代码不改逻辑直连本地",
    ],
    checklist: [
      "能判断一个模型目录是否真的下全了权重",
      "看到 trust_remote_code 的模型,知道要去查它对应的依赖版本",
      "能从日志里识别出磁盘卸载,而不是把它当成 CPU 慢",
      "下载权重之前能口算出这台机器装不装得下",
    ],
  },
];

window.MODULES = MODULES;
window.COURSES = COURSES;
window.TOTAL_CREDITS = COURSES.reduce((s, c) => s + c.credits, 0);
window.TOTAL_WEEKS = COURSES.reduce((s, c) => s + c.weeks, 0);
