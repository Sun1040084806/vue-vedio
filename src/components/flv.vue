<template>
  <div>
    <video
      ref="videoElement"
      controls
      muted
      autoplay
      width="300px"
      height="200px"
    ></video>
  </div>
</template>

<script>
import flvjs from "flv.js";
export default {
  data() {
    return {
      flvPlayer: null,
    };
  },
  mounted() {
    this.createVideo();
  },
  methods: {
    reloadVideo() {
      this.destoryVideo();
      this.createVideo();
    },
    destoryVideo() {
      this.flvPlayer.pause();
      this.flvPlayer.unload();
      this.flvPlayer.detachMediaElement();
      this.flvPlayer.destroy();
      this.flvPlayer = null;
    },
    createVideo() {
      if (flvjs.isSupported()) {
        let videoElement = this.$refs.videoElement;
        this.flvPlayer = flvjs.createPlayer(
          {
            type: "flv",
            isLive: false,
            hasAudio: true,
            url: "http://img.ksbbs.com/asset/Mon_1704/15868902d399b87.flv",
          },
          {
            enableWorker: false,
            enableStashBuffer: false,
            stashInitialSize: 128,
            autoCleanupSourceBuffer: true, //自动清除缓存
          }
        );
        this.flvPlayer.attachMediaElement(videoElement);
        this.flvPlayer.load();
        this.flvPlayer.play();
        // 异常处理
        this.flvPlayer.on(flvjs.Events.ERROR, (err, errdet) => {
          // 参数 err 是一级异常，errdet 是二级异常
          if (err == flvjs.ErrorTypes.MEDIA_ERROR) {
            console.log("媒体错误");
            if (errdet == flvjs.ErrorDetails.MEDIA_FORMAT_UNSUPPORTED) {
              console.log("媒体格式不支持");
            }
          }
          if (err == flvjs.ErrorTypes.NETWORK_ERROR) {
            console.log("网络错误");
            if (errdet == flvjs.ErrorDetails.NETWORK_STATUS_CODE_INVALID) {
              console.log("http状态码异常");
            }
          }
          if (err == flvjs.ErrorTypes.OTHER_ERROR) {
            console.log("其他异常：", errdet);
          }

          // reload 
          if(this.flvPlayer) {
            this.reloadVideo();
          }
        });
        this.$once("hook:beforeDestory", () => {
          // 销毁组件
          this.destoryVideo();
        });
      }
    },
  },
};
</script>
<style lang="less" scoped></style>
