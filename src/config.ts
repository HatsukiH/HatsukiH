import type {
	ExpressiveCodeConfig,
	FriendLink,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "某某の小部屋",
	subtitle: "记录一些不重要的小事",
	lang: "zh_CN", // Language code, e.g. 'en', 'zh_CN', 'ja', etc.
	themeColor: {
		hue: 265, // 褪色靛青 —— 古早二次元配色（0~360）
		fixed: true, // 固定色相，不让访客改动，保持氛围统一
	},
	banner: {
		enable: false,
		src: "assets/images/demo-banner.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: false, // Display the credit text of the banner image
			text: "", // Credit text to be displayed
			url: "", // (Optional) URL link to the original artwork or artist's page
		},
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		// Leave this array empty to use the default favicon
		// {
		//   src: '/favicon/icon.png',    // Path of the favicon, relative to the /public directory
		//   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
		//   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
		// }
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		{
			name: "友链",
			url: "/links/", // 站内链接无需包含 base 路径
		},
		{
			name: "GitHub",
			url: "https://github.com/your-name", // 占位：改成你自己的地址
			external: true, // Show an external link icon and will open in a new tab
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/demo-avatar.png", // 占位头像：可换成 src/assets/images/ 下的图，或用 / 开头指向 public
	name: "某某",
	bio: "一只还留在这个互联网角落的老二次元",
	links: [
		{
			name: "GitHub",
			icon: "fa6-brands:github", // Visit https://icones.js.org/ for icon codes
			url: "https://github.com/your-name",
		},
		{
			name: "邮箱",
			icon: "fa6-solid:envelope",
			url: "mailto:you@example.com",
		},
		{
			name: "RSS",
			icon: "fa6-solid:rss",
			url: "/rss.xml",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};

// 友情链接墙（占位数据，替换成你自己常逛的小站）
export const friendsConfig: FriendLink[] = [
	{
		name: "某某の小站",
		url: "https://example.com",
		avatar: "https://example.com/avatar.png",
		desc: "一个不太更新的博客",
	},
	{
		name: "アニメ置き場",
		url: "https://example.org",
		avatar: "https://example.org/avatar.png",
		desc: "追番与截图堆放处",
	},
	{
		name: "深夜写代码",
		url: "https://example.net",
		avatar: "https://example.net/avatar.png",
		desc: "技术随想与踩坑记录",
	},
];
