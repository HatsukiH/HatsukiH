# fuwari-retro-overlay · 古早二次元定制包

把上游 [fuwari](https://github.com/saicaca/fuwari)（Astro 5 + Tailwind + Svelte 5 + Stylus）
改造成「老互联网 / 古早二次元」风格的全部个性化改动，已抽成一个 overlay 包，
**覆盖到全新的 fuwari 上即可恢复现在的效果**。

- 基准版本：上游 `main` 分支（2025-12-12 的快照）
- 改造力度：中度 —— 保留 fuwari 布局与交互骨架，只做配色 / 圆角 / 字体 / 侧栏挂件 / 页脚装饰
- 所有改动相对上游共涉及 **21 个文件**（新增 11、修改 10、另需删除 6）

---

## 一、包结构

```
fuwari-retro-overlay/
├── README.md                     ← 本文件
├── overlay/                      ← 直接覆盖到 fuwari 项目根目录
│   ├── src/
│   │   ├── config.ts                               [改] 站点/导航/简介/友链配置
│   │   ├── types/config.ts                         [改] 新增 FriendLink 类型
│   │   ├── layouts/Layout.astro                    [改] 引入 retro.css + 霞鹜文楷字体
│   │   ├── components/Footer.astro                 [改] 页脚加「本站已运行 N 天」
│   │   ├── components/PostCard.astro               [改] 封面宽度 28% → 22%
│   │   ├── components/widget/SideBar.astro         [改] 注册 3 个新挂件
│   │   ├── components/widget/SiteStats.astro       [新] 运行天数 + 不蒜子访客数
│   │   ├── components/widget/Friends.astro         [新] 友情链接墙挂件
│   │   ├── components/widget/BgmPlayer.svelte      [新] 背景音乐播放器（不自动播放）
│   │   ├── pages/links.astro                       [新] 友链独立页 /links/
│   │   ├── styles/variables.styl                   [改] 做旧配色 + 小直角
│   │   ├── styles/retro.css                        [新] 字体/纸纹/虚线/圆角收紧
│   │   ├── content/spec/about.md                   [改] 关于页内容
│   │   └── content/posts/
│   │       ├── diary-new-home.md                   [新] 示例：日记
│   │       ├── essay-slow-down.md                  [新] 示例：随笔
│   │       └── tech-astro-retro-blog.md            [新] 示例：技术
│   ├── public/
│   │   ├── images/link-avatar.svg                  [新] 友链头像占位图
│   │   └── music/
│   │       ├── README.md                           [新]
│   │       └── placeholder.wav                     [新] 占位 BGM（合成音，可换）
│   └── docs/我的博客-使用说明.md                     [新] 日常使用/改哪儿
└── patches/
    └── fuwari-retro.patch        ← 统一 diff（含新增/修改/删除），供参考或 git apply
```

---

## 二、应用方法

### 方式 A：覆盖（推荐，最直观）

```bash
# 1. 拉一份干净的上游
git clone https://github.com/saicaca/fuwari.git my-blog
cd my-blog

# 2. 把 overlay 里的内容整体覆盖到项目根目录（src/ 和 public/ 会合并覆盖）
#    Windows 可用 robocopy，macOS/Linux 用 cp -r
cp -r /path/to/fuwari-retro-overlay/overlay/. .

# 3. 删掉上游自带的示例文章（否则首页会混进 fuwari 的 demo）
rm -f src/content/posts/draft.md \
      src/content/posts/expressive-code.md \
      src/content/posts/markdown-extended.md \
      src/content/posts/markdown.md \
      src/content/posts/video.md
rm -rf src/content/posts/guide

# 4. 安装依赖并跑起来
pnpm install
pnpm dev        # http://localhost:4321
```

### 方式 B：打补丁

```bash
git clone https://github.com/saicaca/fuwari.git my-blog && cd my-blog
git apply --stat  /path/to/patches/fuwari-retro.patch   # 先看会影响哪些文件
git apply         /path/to/patches/fuwari-retro.patch
```

> 补丁只覆盖 `src/` 下的文本改动；`public/images/link-avatar.svg`、
> `public/music/placeholder.wav` 等新增资源请从 `overlay/public/` 手动复制。

---

## 三、需要手动删除的上游文件

这些是 fuwari 自带的示例内容，本项目已删除。不复现删除的话，首页/归档里会多出这几篇演示文：

```
src/content/posts/draft.md
src/content/posts/expressive-code.md
src/content/posts/markdown-extended.md
src/content/posts/markdown.md
src/content/posts/video.md
src/content/posts/guide/          （整个目录）
```

`src/content/spec/about.md` 属于**覆盖**（overlay 里已含新版），不用删。

---

## 四、恢复效果的关键点（改哪些值会怎样）

### 1. 配色与圆角 —— `src/styles/variables.styl`

整个皮肤就是「暖米白纸感 + 褪色靛青 + 小直角」：

```stylus
--radius-large 0.25rem            /* 直角卡片，古早感的关键 */
--primary:    oklch(0.52 0.09 var(--hue))     /* 强调色，跟随 --hue */
--page-bg:    oklch(0.955 0.025 88)           /* 暖米白纸底 */
--card-bg:    oklch(0.993 0.013 90)           /* 近白偏暖的卡片 */
--line-color: oklch(0.80 0.028 84)            /* 描边/虚线颜色 */
```

色相由 `src/config.ts` 的 `themeColor.hue` 决定：

```ts
themeColor: { hue: 265, fixed: true },   // 265 = 褪色靛青；fixed 防止访客改色
```

想换风格：`hue` 改成 200 左右偏青、330 左右偏樱粉；同时把 `variables.styl` 里
中性色的色相（现在的 `88`/`90`/`84`）保持不动，这样「纸感」不会被破坏。

### 2. 字体 —— `Layout.astro` + `retro.css`

`Layout.astro` 第 155 行引入霞鹜文楷（CDN）：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lxgw-wenkai-screen-webfont/style.css" />
```

`retro.css` 里应用并留了回退栈：

```css
html, body {
  font-family: "LXGW WenKai Screen", "LXGW WenKai", "Noto Serif SC", "Songti SC", serif;
}
code, kbd, samp, pre { font-family: "JetBrains Mono Variable", ui-monospace, monospace; }
```

CDN 不通时会自动回退到系统宋体，不会白屏。想彻底离线可自行把字体 woff2 放进 `public/` 自托管。

### 3. 纸张肌理与装饰 —— `src/styles/retro.css`

纯 CSS，无图片依赖：

- 暖色高光 + 边缘暗角 + 极淡噪点（SVG `feTurbulence` 内联 data-URI），明暗两套
- 挂件标题下加虚线、引用块左侧虚线、正文 `hr` 改虚线、`.card-base` 改细描边
- 全局收紧 `rounded-md/lg/xl/2xl`（保留 `rounded-full`，头像和开关按钮仍是圆形）

### 4. 侧边栏挂件 —— `src/components/widget/`

在 `SideBar.astro` 的 `#sidebar-sticky` 里按顺序注册：

```astro
<SiteStats class="onload-animation" style="animation-delay: 100ms"></SiteStats>
<WidgetLayout id="bgm" name="背景音乐" ...>
  <div class="pb-1 pt-1"><BgmPlayer client:load></BgmPlayer></div>
</WidgetLayout>
<Friends class="onload-animation" style="animation-delay: 160ms"></Friends>
<Categories ... /><Tag ... />
```

- **SiteStats**：`SITE_START = "2026-10-12"` 与底部 `new Date("2026-10-12T00:00:00")` 两处要改成你的上线日；
  访客数用「不蒜子」（`//busuanzi.ibruce.info/...`），离线时保持 `--` 占位不影响页面。
- **Friends**：数据来自 `src/config.ts` 的 `friendsConfig`；头像加载失败会回退到
  `public/images/link-avatar.svg`（`onerror` 处理）。
- **BgmPlayer**：Svelte 5 客户端组件，`client:load`，**默认不自动播放**；音频放在 `public/music/`。

### 5. 站点信息 —— `src/config.ts`

需要替换的占位都在注释里标了「占位」：博客名 `某某の小部屋`、昵称 `某某`、
头像 `assets/images/demo-avatar.png`（fuwari 自带的示例图，可直接沿用）、
GitHub / 邮箱链接、`friendsConfig` 三条友链。

---

## 五、环境注意事项（Windows + pnpm）

本项目在原机器上遇到了两个坑，重新搭建时可能会碰到：

1. **`.npmrc` 与 `packageManager` 冲突**
   上游 `.npmrc` 是 `manage-package-manager-versions = true`，配合 `package.json` 的
   `"packageManager": "pnpm@9.14.4"`，在部分环境会让 pnpm 引导新版本失败（连 `pnpm --version` 都卡）。
   处理：把 `.npmrc` 改成 `manage-package-manager-versions = false`，或删掉 `package.json` 里的
   `packageManager` 字段。

2. **pnpm 建不了软链接**
   在受限环境（沙箱/权限）下 pnpm 的符号链接会失败，`node_modules/xxx` 变成空目录。
   这种情况下改用 npm：

   ```bash
   npm install --ignore-scripts --no-audit --no-fund --registry=https://registry.npmmirror.com
   npm rebuild
   npm run dev
   ```

   若 esbuild / sharp 的构建脚本被拦截，加 `--config.dangerously-allow-all-builds=true` 放行。

正常机器上 `pnpm install && pnpm dev` 即可，以上只是兜底。

---

## 六、恢复效果的验收清单

跑起来后逐项确认（原项目已验证通过）：

- [ ] 首页背景是暖米白色、卡片近白带细描边、圆角很小
- [ ] 正文字体是楷体感（霞鹜文楷），代码块仍是等宽字体
- [ ] 侧栏依次有：个人信息、小站统计、背景音乐、友情链接、分类、标签
- [ ] 「小站统计」里运行天数会随日期变化、访客数由不蒜子填充
- [ ] 导航栏有「友链」入口，`/links/` 页面正常
- [ ] 页脚有「本站已运行 N 天 · 感谢来访」
- [ ] `/`、`/archive/`、`/about/`、`/links/`、三篇文章页全部 200
- [ ] `pnpm build` 通过（产物 `dist/` 内 CSS 同时含 `card-base` 与 `LXGW`）
