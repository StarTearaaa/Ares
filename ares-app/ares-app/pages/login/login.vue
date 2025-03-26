<template>
	<view class="login-container">
		<view class="header">
			<text class="title">欢迎登录</text>
			<text class="subtitle">登录后体验更多功能</text>
		</view>
		
		<view class="login-tabs">
			<view 
				class="tab-item" 
				:class="{ active: loginType === 'phone' }"
				@tap="loginType = 'phone'"
			>手机验证码登录</view>
			<view 
				class="tab-item" 
				:class="{ active: loginType === 'password' }"
				@tap="loginType = 'password'"
			>账号密码登录</view>
		</view>
		
		<view class="form-container">
			<!-- 手机验证码登录 -->
			<block v-if="loginType === 'phone'">
				<view class="input-group">
					<input 
						type="number" 
						v-model="phoneForm.phone" 
						placeholder="请输入手机号"
						maxlength="11"
					/>
				</view>
				<view class="input-group code-group">
					<input 
						type="number" 
						v-model="phoneForm.code" 
						placeholder="请输入验证码"
						maxlength="6"
					/>
					<button 
						class="code-btn" 
						:disabled="countdown > 0"
						@tap="sendCode"
					>
						{{ countdown > 0 ? `${countdown}s后重试` : '获取验证码' }}
					</button>
				</view>
			</block>
			
			<!-- 账号密码登录 -->
			<block v-else>
				<view class="input-group">
					<input 
						type="text" 
						v-model="passwordForm.username" 
						placeholder="请输入用户名"
					/>
				</view>
				<view class="input-group">
					<input 
						type="password" 
						v-model="passwordForm.password" 
						placeholder="请输入密码"
					/>
				</view>
			</block>
		</view>
		
		<button class="login-btn" @tap="handleLogin">登录</button>
		
		<view class="footer">
			<text @tap="toRegister">注册账号</text>
			<text @tap="toForget">忘记密码？</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loginType: 'phone',
			countdown: 0,
			phoneForm: {
				phone: '',
				code: ''
			},
			passwordForm: {
				username: '',
				password: ''
			}
		}
	},
	methods: {
		sendCode() {
			if (!/^1[3-9]\d{9}$/.test(this.phoneForm.phone)) {
				uni.showToast({
					title: '请输入正确的手机号',
					icon: 'none'
				})
				return
			}
			
			// 这里调用发送验证码的接口
			this.countdown = 60
			const timer = setInterval(() => {
				this.countdown--
				if (this.countdown <= 0) {
					clearInterval(timer)
				}
			}, 1000)
		},
		handleLogin() {
			if (this.loginType === 'phone') {
				if (!this.phoneForm.phone || !this.phoneForm.code) {
					uni.showToast({
						title: '请填写完整信息',
						icon: 'none'
					})
					return
				}
			} else {
				if (!this.passwordForm.username || !this.passwordForm.password) {
					uni.showToast({
						title: '请填写完整信息',
						icon: 'none'
					})
					return
				}
			}
			
			// 这里调用登录接口
			uni.showLoading({
				title: '登录中...'
			})
			
			setTimeout(() => {
				uni.hideLoading()
				uni.reLaunch({
					url: '/pages/home/home'
				})
			}, 1500)
		},
		toRegister() {
			uni.navigateTo({
				url: '/pages/register/register'
			})
		},
		toForget() {
			uni.navigateTo({
				url: '/pages/forget/forget'
			})
		}
	}
}
</script>

<style>
.login-container {
	padding: 60rpx 40rpx;
	min-height: 100vh;
	background-color: #ffffff;
}

.header {
	margin-bottom: 60rpx;
}

.title {
	font-size: 48rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 20rpx;
	display: block;
}

.subtitle {
	font-size: 28rpx;
	color: #999;
}

.login-tabs {
	display: flex;
	margin-bottom: 40rpx;
	border-bottom: 2rpx solid #eee;
}

.tab-item {
	flex: 1;
	text-align: center;
	padding: 20rpx 0;
	font-size: 32rpx;
	color: #666;
	position: relative;
}

.tab-item.active {
	color: #667eea;
	font-weight: bold;
}

.tab-item.active::after {
	content: '';
	position: absolute;
	bottom: -2rpx;
	left: 50%;
	transform: translateX(-50%);
	width: 60rpx;
	height: 4rpx;
	background-color: #667eea;
}

.input-group {
	background-color: #f8f8f8;
	border-radius: 12rpx;
	padding: 24rpx;
	margin-bottom: 30rpx;
}

.code-group {
	display: flex;
	align-items: center;
}

.code-group input {
	flex: 1;
}

.code-btn {
	margin-left: 20rpx;
	font-size: 28rpx;
	color: #667eea;
	background: none;
	border: none;
	padding: 0;
}

.code-btn[disabled] {
	color: #999;
}

.login-btn {
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	color: #fff;
	border-radius: 12rpx;
	margin-top: 60rpx;
}

.footer {
	display: flex;
	justify-content: space-between;
	margin-top: 40rpx;
	font-size: 28rpx;
	color: #667eea;
}
</style> 