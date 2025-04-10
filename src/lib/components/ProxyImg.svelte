<script lang="ts">
	let { imageData } = $props();
</script>

<img
	src={'/media?src=' +
		encodeURIComponent(imageData.source) +
		'&formaTwidth=' +
		imageData.imgwidth +
		'&formaTheight=' +
		imageData.imgheight}
	class={imageData.class}
	loading={imageData.loading}
	alt={imageData.alt}
	style={imageData.style}
	onerror={(e) => {
		const target = e.target as HTMLImageElement;
		if (target) target.src = imageData.source;
	}}
/>
