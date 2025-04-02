<template>
	<view class="chat-container">
		<!-- 当前对话主题 -->
		<view class="chat-header">
			<view class="sidebar-toggle" @tap="toggleSidebar">
				<text class="iconfont">☰</text>
			</view>
			<text class="chat-title">{{currentChat ? currentChat.title : '新对话'}}</text>
		</view>
		
		<!-- 侧边栏 -->
		<view class="sidebar" :class="{ 'sidebar-show': showSidebar }">
			<view class="sidebar-header">
				<text class="sidebar-title">历史记录</text>
				<view class="new-chat" @tap="createNewChat">
					<text class="iconfont">+</text>
					<text>新建对话</text>
				</view>
			</view>
			
			<scroll-view class="chat-history" scroll-y>
				<view 
					class="history-item" 
					v-for="(item, index) in chatHistory" 
					:key="index"
					:class="{ active: currentChatId === item.id }"
					@tap="switchChat(item)"
				>
					<text class="history-title">{{item.title || '新对话'}}</text>
					<text class="history-time">{{item.time}}</text>
				</view>
			</scroll-view>
		</view>
		
		<!-- 遮罩层 -->
		<view class="mask" v-if="showSidebar" @tap="toggleSidebar"></view>
		
		<!-- 聊天记录区域 -->
		<scroll-view 
			class="chat-list" 
			scroll-y 
			:scroll-top="scrollTop"
			:scroll-into-view="scrollIntoView"
			@scrolltoupper="loadMoreHistory"
			:refresher-enabled="true"
			:refresher-triggered="isRefreshing"
			@refresherrefresh="onRefresh"
		>
			<!-- 加载更多提示 -->
			<view class="loading-more" v-if="isLoadingMore">
				<text>加载中...</text>
			</view>
			
			<view 
				class="chat-item" 
				:class="item.type"
				v-for="(item, index) in chatList" 
				:key="index"
				:id="'msg-' + index"
			>
				<view class="chat-avatar">
					<image :src="item.type === 'user' ? '/static/images/user-avatar.png' : '/static/images/ai-avatar.png'" mode="aspectFill"></image>
				</view>
				<view class="chat-content" :class="item.type">
					<text class="chat-text">{{item.content}}</text>
				</view>
			</view>
			
			<!-- 没有更多数据提示 -->
			<view class="no-more" v-if="noMoreData">
				<text>没有更多消息了</text>
			</view>
		</scroll-view>
		
		<!-- 输入区域 -->
		<view class="input-area">
			<input 
				class="message-input" 
				v-model="inputMessage" 
				type="text" 
				placeholder="请输入您的问题"
				@confirm="sendMessage"
			/>
			<button 
				class="send-btn" 
				:disabled="!inputMessage.trim() || isSending"
				@tap="sendMessage"
			>
				<text class="send-icon">发送</text>
			</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			showSidebar: false,
			currentChatId: null,
			currentChat: null,
			chatHistory: [
				{
					id: 1,
					title: '关于Java编程的讨论',
					time: '2024-03-27 14:30'
				},
				{
					id: 2,
					title: 'Spring Boot项目咨询',
					time: '2024-03-27 15:45'
				}
			],
			chatList: [
				{
					type: 'ai',
					content: '你好！我是AI助手，有什么我可以帮你的吗？'
				}
			],
			inputMessage: '',
			scrollTop: 0,
			scrollIntoView: '',
			isSending: false,
			isRefreshing: false,
			isLoadingMore: false,
			noMoreData: false,
			page: 1,
			pageSize: 20
		}
	},
	onLoad() {
		// 加载历史记录
		this.loadHistory()
	},
	methods: {
		// 切换侧边栏显示状态
		toggleSidebar() {
			this.showSidebar = !this.showSidebar
		},
		
		// 创建新对话
		createNewChat() {
			const newChat = {
				id: Date.now(),
				title: '新对话',
				time: new Date().toLocaleString()
			}
			this.chatHistory.unshift(newChat)
			this.switchChat(newChat)
		},
		
		// 切换对话
		async switchChat(chat) {
			this.currentChatId = chat.id
			this.currentChat = chat
			this.chatList = [{
				type: 'ai',
				content: '你好！我是AI助手，有什么我可以帮你的吗？'
			}]
			this.page = 1
			this.noMoreData = false
			
			// 加载该对话的历史记录
			await this.loadHistory()
			this.showSidebar = false // 关闭侧边栏
		},
		
		// 加载历史记录
		async loadHistory() {
			if (this.isLoadingMore || this.noMoreData) return
			
			this.isLoadingMore = true
			try {
				// 这里调用后端API获取历史记录
				// 模拟API调用
				await new Promise(resolve => setTimeout(resolve, 1000))
				
				// 模拟历史数据
				const mockHistory = Array.from({ length: 5 }, (_, i) => ({
					type: i % 2 === 0 ? 'user' : 'ai',
					content: `这是第${this.page}页的历史消息 ${i + 1}`
				}))
				
				// 添加到列表开头
				this.chatList.unshift(...mockHistory)
				
				// 更新页码
				this.page++
				
				// 模拟没有更多数据的情况
				if (this.page > 3) {
					this.noMoreData = true
				}
			} catch (error) {
				uni.showToast({
					title: '加载失败',
					icon: 'none'
				})
			} finally {
				this.isLoadingMore = false
			}
		},
		
		// 下拉刷新
		async onRefresh() {
			this.isRefreshing = true
			this.page = 1
			this.noMoreData = false
			
			// 清空当前列表
			this.chatList = [{
				type: 'ai',
				content: '你好！我是AI助手，有什么我可以帮你的吗？'
			}]
			
			// 重新加载历史记录
			await this.loadHistory()
			
			this.isRefreshing = false
		},
		
		// 发送消息
		async sendMessage() {
			if (!this.inputMessage.trim() || this.isSending) return
			
			const userMessage = this.inputMessage.trim()
			this.inputMessage = ''
			this.isSending = true
			
			// 添加用户消息
			this.chatList.push({
				type: 'user',
				content: userMessage
			})
			
			// 滚动到底部
			this.$nextTick(() => {
				this.scrollToBottom()
			})
			
			try {
				// 这里调用后端API获取AI响应
				// 模拟API调用
				await new Promise(resolve => setTimeout(resolve, 1000))
				
				// 添加AI响应
				this.chatList.push({
					type: 'ai',
					content: '这是一个模拟的AI响应。实际开发中，这里应该调用后端API获取真实的AI响应。'
				})
			} catch (error) {
				uni.showToast({
					title: '发送失败，请重试',
					icon: 'none'
				})
			} finally {
				this.isSending = false
				this.$nextTick(() => {
					this.scrollToBottom()
				})
			}
		},
		
		// 滚动到底部
		scrollToBottom() {
			const lastIndex = this.chatList.length - 1
			this.scrollIntoView = 'msg-' + lastIndex
		},
		
		// 加载更多历史记录
		loadMoreHistory() {
			this.loadHistory()
		}
	}
}
</script>

<style>
.chat-container {
	display: flex;
	flex-direction: column;
	height: 100vh;
	background-color: #f5f5f5;
	position: relative;
}

/* 当前对话主题 */
.chat-header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 80rpx;
	background-color: #ffffff;
	display: flex;
	align-items: center;
	padding: 0 30rpx;
	z-index: 98;
	border-bottom: 2rpx solid #eee;
}

.chat-title {
	flex: 1;
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	text-align: center;
}

/* 调整聊天列表的位置和边距 */
.chat-list {
	flex: 1;
	padding: 20rpx;
	padding-top: 100rpx; /* 为顶部标题栏留出空间 */
	padding-bottom: 120rpx; /* 为底部输入框留出空间 */
	background-color: #f5f5f5;
	/* 自定义滚动条样式 */
	::-webkit-scrollbar {
		width: 6rpx;
	}
	
	::-webkit-scrollbar-thumb {
		background-color: rgba(0, 0, 0, 0.2);
		border-radius: 3rpx;
	}
	
	::-webkit-scrollbar-track {
		background-color: transparent;
	}
}

.chat-item {
	display: flex;
	margin-bottom: 30rpx;
	padding: 0 20rpx;
}

.chat-item.user {
	flex-direction: row-reverse;
}

.chat-avatar {
	width: 80rpx;
	height: 80rpx;
	margin: 0 20rpx;
}

.chat-avatar image {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	object-fit: cover;
}

.chat-content {
	max-width: 70%;
	padding: 20rpx;
	border-radius: 20rpx;
	position: relative;
	word-break: break-all;
}

.chat-content.ai {
	background-color: #ffffff;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.chat-content.user {
	background-color: #007AFF;
	color: #ffffff;
}

.chat-text {
	font-size: 28rpx;
	line-height: 1.5;
}

/* 调整输入区域的位置 */
.input-area {
	padding: 20rpx;
	background-color: #ffffff;
	border-top: 2rpx solid #eee;
	display: flex;
	align-items: center;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 100;
}

.message-input {
	flex: 1;
	height: 72rpx;
	background-color: #f5f5f5;
	border-radius: 36rpx;
	padding: 0 30rpx;
	font-size: 28rpx;
	margin-right: 20rpx;
}

.send-btn {
	width: 120rpx;
	height: 72rpx;
	background-color: #007AFF;
	border-radius: 36rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0;
}

.send-btn[disabled] {
	background-color: #cccccc;
}

.send-icon {
	color: #ffffff;
	font-size: 28rpx;
}

/* 加载更多样式 */
.loading-more, .no-more {
	text-align: center;
	padding: 20rpx 0;
	color: #999;
	font-size: 24rpx;
}

/* 侧边栏样式 */
.sidebar-toggle {
	width: 60rpx;
	height: 60rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.sidebar-toggle .iconfont {
	font-size: 40rpx;
	color: #333;
}

.sidebar {
	position: fixed;
	top: 0;
	left: 0;
	width: 80%;
	max-width: 600rpx;
	height: 100vh;
	background-color: #ffffff;
	z-index: 100;
	transform: translateX(-100%);
	transition: transform 0.3s ease;
	box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);
}

.sidebar-show {
	transform: translateX(0);
}

.sidebar-header {
	padding: 40rpx 30rpx;
	border-bottom: 2rpx solid #eee;
}

.sidebar-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 20rpx;
	display: block;
}

.new-chat {
	display: flex;
	align-items: center;
	padding: 20rpx;
	background-color: #f5f5f5;
	border-radius: 12rpx;
	color: #007AFF;
	font-size: 28rpx;
}

.new-chat .iconfont {
	margin-right: 10rpx;
	font-size: 32rpx;
}

.chat-history {
	height: calc(100vh - 180rpx);
}

.history-item {
	padding: 30rpx;
	border-bottom: 2rpx solid #eee;
}

.history-item.active {
	background-color: #f0f7ff;
}

.history-title {
	font-size: 28rpx;
	color: #333;
	margin-bottom: 10rpx;
	display: block;
}

.history-time {
	font-size: 24rpx;
	color: #999;
}

.mask {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.3);
	z-index: 99;
}
</style> 