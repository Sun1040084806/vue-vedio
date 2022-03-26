<template>
  <video-player
    class="vjs-custom-skin video-js vjs-big-play-centered"
    ref="videoPlayer"
    :options="playerOptions"
    :events="events"
    @ready="playerReadied"
    @fullscreenchange="onPlayerFullScreenchange"
    width="300"
    height="200"
  >
  </video-player>
</template>

<script>
import "videojs-contrib-hls";

export default {
  props: {
    src: {
      type: String,
      default: "http://stream.snrtv.com/sxbc-star-kAFHLV.m3u8",
    },
  },
  data() {
    return {
      playerOptions: {
        sources: [
          {
            withCredentials: false,
            type: "application/x-mpegURL",
            src: this.src,
          },
        ],
        controlBar: {
          playToggle: false, // 播放暂停按钮
          currentTimeDisplay: true,
          timeDivider: false,
          durationDisplay: false,
          progressControl: true,
          liveDisplay: true,
          fullscreenToggle: true,
        },
        language: "zh-CN",
        flash: { hls: { withCredentials: false } },
        html5: { hls: { withCredentials: false } },
        techOrder: ["html5", "flash"], // 兼容顺序
        autoplay: true, // 自动播放
        fluid: true, // 按比例缩放适应容器
        preload: "auto", // 预加载
        muted: true, // 消除所有音频
        aspectRatio: "16:9",
      },
      events: ["fullscreenchange"],
      flag: true,
    };
  },
  methods: {
    playerReadied(player) {
      player.tech({ IWillNotUseThisInPlugins: true }).hls;
      player.tech_.off("mousedown");
      player.tech_.hls.xhr.beforeRequest = function (options) {
        return options;
      };
    },
    onPlayerFullScreenchange() {
      if (this.flag) {
        console.log(this.$refs.videoPlayer);
        this.$refs.videoPlayer.muted = !this.$refs.videoPlayer.muted;
      }
      this.flag = !this.flag;
    },
  },
};
</script>

<style scoped lang="less">
.vjs-tech {
  pointer-events: none;
}
</style>
