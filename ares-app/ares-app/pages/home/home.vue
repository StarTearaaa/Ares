<template>
	<view class="home-container">
		<!-- 顶部用户信息 -->
		<view class="user-info">
			<image class="avatar" src="/static/avatar.png" mode="aspectFill"></image>
			<view class="user-detail">
				<text class="username">用户名</text>
				<text class="user-id">ID: 888888</text>
			</view>
		</view>
		
		<!-- 功能区域 -->
		<view class="function-area">
			<view class="section-title">常用功能</view>
			<view class="function-grid">
				<view class="function-item" v-for="(item, index) in functions" :key="index" @tap="navigateTo(item.url)">
					<image class="function-icon" :src="item.icon" mode="aspectFit"></image>
					<text class="function-name">{{item.name}}</text>
				</view>
			</view>
		</view>
		
		<!-- 退出登录按钮 -->
		<button class="logout-btn" @tap="handleLogout">退出登录</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			functions: [
				{ name: '个人中心', icon: '/static/icons/user.png', url: '/pages/user/user' },
				{ name: '消息通知', icon: '/static/icons/message.png', url: '/pages/message/message' },
				{ name: '设置', icon: '/static/icons/settings.png', url: '/pages/settings/settings' },
				{ name: '帮助中心', icon: '/static/icons/help.png', url: '/pages/help/help' }
			]
		}
	},
	methods: {
		navigateTo(url) {
			uni.navigateTo({
				url: url
			})
		},
		handleLogout() {
			uni.showModal({
				title: '提示',
				content: '确定要退出登录吗？',
				success: (res) => {
					if (res.confirm) {
						// 这里调用退出登录接口
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}
				}
			})
		}
	}
}
</script>

<style>
.home-container {
	min-height: 100vh;
	background-color: #f8f8f8;
	padding-bottom: 40rpx;
}

.user-info {
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	padding: 60rpx 40rpx;
	display: flex;
	align-items: center;
}

.avatar {
	width: 120rpx;
	height: 120rpx;
	border-radius: 60rpx;
	border: 4rpx solid rgba(255, 255, 255, 0.3);
}

.user-detail {
	margin-left: 30rpx;
}

.username {
	font-size: 36rpx;
	color: #ffffff;
	font-weight: bold;
	display: block;
	margin-bottom: 10rpx;
}

.user-id {
	font-size: 24rpx;
	color: rgba(255, 255, 255, 0.8);
}

.function-area {
	background-color: #ffffff;
	margin-top: 20rpx;
	padding: 30rpx;
}

.section-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 30rpx;
}

.function-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 30rpx;
}

.function-item {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.function-icon {
	width: 80rpx;
	height: 80rpx;
	margin-bottom: 16rpx;
}

.function-name {
	font-size: 24rpx;
	color: #666;
}

.logout-btn {
	margin: 60rpx 40rpx;
	background-color: #ffffff;
	color: #ff4d4f;
	border: 2rpx solid #ff4d4f;
	border-radius: 12rpx;
}
</style> 