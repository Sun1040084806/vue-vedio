// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App.vue'
import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'

// 关闭Vue的生产提示
Vue.config.productionTip = false

Vue.use(VideoPlayer)
// 创建vm
new Vue({
	el:'#app',
	render: h => h(App),
})