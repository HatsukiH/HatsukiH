# 背景音乐目录

把你的音乐文件（mp3 / wav / ogg 等）放到这个目录，然后在
`src/components/widget/BgmPlayer.svelte` 顶部的 `playlist` 里登记：

```ts
const playlist: Track[] = [
  { title: "曲名", artist: "艺术家", src: "/music/你的文件名.mp3" },
];
```

默认不自动播放，需要访客点击播放按钮才会出声。

- `placeholder.wav` 是脚本生成的占位音频（一段简单的琶音），可以直接删掉。
