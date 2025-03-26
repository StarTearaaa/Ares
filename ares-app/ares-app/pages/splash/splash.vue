<template>
	<view class="splash-container">
		<image class="logo" src="/static/logo.png" mode="aspectFit"></image>
		<text class="title">Ares</text>
	</view>
</template>

<script>
export default {
	onLoad() {
		setTimeout(() => {
			uni.reLaunch({
				url: '/pages/login/login'
			})
		}, 2000)
	}
}
</script>

<style>
.splash-container {
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.logo {
	width: 200rpx;
	height: 200rpx;
	margin-bottom: 30rpx;
	animation: fadeIn 1s ease-in;
}

.title {
	font-size: 48rpx;
	color: #ffffff;
	font-weight: bold;
	animation: slideUp 0.8s ease-out;
}

@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

@keyframes slideUp {
	from {
		transform: translateY(20rpx);
		opacity: 0;
	}
	to {
		transform: translateY(0);
		opacity: 1;
	}
}
</style> 