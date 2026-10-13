<script lang="ts">
	import { onMount } from "svelte";

	// 播放列表：把音频文件放进 public/music/，再在这里登记即可
	// 默认不自动播放（现代浏览器也不允许），点一下才响
	type Track = { title: string; artist: string; src: string };

	const playlist: Track[] = [
		{ title: "占位曲目 · 请替换", artist: "unknown", src: "/music/placeholder.wav" },
	];

	let audioEl: HTMLAudioElement;
	let index = 0;
	let playing = false;
	let title = playlist[0].title;

	function loadTrack(i: number, autoplay: boolean) {
		if (!audioEl) return;
		index = (i + playlist.length) % playlist.length;
		title = playlist[index].title;
		audioEl.src = playlist[index].src;
		audioEl.load();
		if (autoplay) {
			audioEl
				.play()
				.then(() => (playing = true))
				.catch(() => (playing = false));
		} else {
			playing = false;
		}
	}

	function toggle() {
		if (!audioEl) return;
		if (audioEl.paused) {
			audioEl
				.play()
				.then(() => (playing = true))
				.catch(() => (playing = false));
		} else {
			audioEl.pause();
			playing = false;
		}
	}

	onMount(() => {
		loadTrack(0, false);
	});
</script>

<div class="flex items-center gap-2 rounded-lg border border-dashed border-[var(--line-color)] px-2 py-2">
	<button
		type="button"
		onclick={toggle}
		class="btn-regular h-8 w-8 shrink-0 rounded-md text-sm"
		aria-label="播放或暂停"
	>
		{playing ? "‖" : "▶"}
	</button>
	<div class="min-w-0 flex-1">
		<div class="truncate text-xs text-90">{title}</div>
		<div class="text-[10px] tracking-wide text-30">BGM · 点击播放</div>
	</div>
	<button
		type="button"
		onclick={() => loadTrack(index + 1, playing)}
		class="btn-plain h-8 w-8 shrink-0 rounded-md text-base"
		aria-label="下一首"
	>
		»
	</button>
</div>
<audio bind:this={audioEl} preload="none" onended={() => loadTrack(index + 1, true)}></audio>
