if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const _imports_0 = "/static/logo.png";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$3 = {
    onLoad() {
      setTimeout(() => {
        uni.reLaunch({
          url: "/pages/login/login"
        });
      }, 2e3);
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "splash-container" }, [
      vue.createElementVNode("image", {
        class: "logo",
        src: _imports_0,
        mode: "aspectFit"
      }),
      vue.createElementVNode("text", { class: "title" }, "Ares")
    ]);
  }
  const PagesSplashSplash = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "D:/学习/javaproject/Ares/ares-app/ares-app/pages/splash/splash.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {
        loginType: "phone",
        countdown: 0,
        phoneForm: {
          phone: "",
          code: ""
        },
        passwordForm: {
          username: "",
          password: ""
        }
      };
    },
    methods: {
      sendCode() {
        if (!/^1[3-9]\d{9}$/.test(this.phoneForm.phone)) {
          uni.showToast({
            title: "请输入正确的手机号",
            icon: "none"
          });
          return;
        }
        this.countdown = 60;
        const timer = setInterval(() => {
          this.countdown--;
          if (this.countdown <= 0) {
            clearInterval(timer);
          }
        }, 1e3);
      },
      handleLogin() {
        if (this.loginType === "phone") {
          if (!this.phoneForm.phone || !this.phoneForm.code) {
            uni.showToast({
              title: "请填写完整信息",
              icon: "none"
            });
            return;
          }
        } else {
          if (!this.passwordForm.username || !this.passwordForm.password) {
            uni.showToast({
              title: "请填写完整信息",
              icon: "none"
            });
            return;
          }
        }
        uni.showLoading({
          title: "登录中..."
        });
        setTimeout(() => {
          uni.hideLoading();
          uni.reLaunch({
            url: "/pages/home/home"
          });
        }, 1500);
      },
      toRegister() {
        uni.navigateTo({
          url: "/pages/register/register"
        });
      },
      toForget() {
        uni.navigateTo({
          url: "/pages/forget/forget"
        });
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "login-container" }, [
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode("text", { class: "title" }, "欢迎登录"),
        vue.createElementVNode("text", { class: "subtitle" }, "登录后体验更多功能")
      ]),
      vue.createElementVNode("view", { class: "login-tabs" }, [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["tab-item", { active: $data.loginType === "phone" }]),
            onClick: _cache[0] || (_cache[0] = ($event) => $data.loginType = "phone")
          },
          "手机验证码登录",
          2
          /* CLASS */
        ),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["tab-item", { active: $data.loginType === "password" }]),
            onClick: _cache[1] || (_cache[1] = ($event) => $data.loginType = "password")
          },
          "账号密码登录",
          2
          /* CLASS */
        )
      ]),
      vue.createElementVNode("view", { class: "form-container" }, [
        vue.createCommentVNode(" 手机验证码登录 "),
        $data.loginType === "phone" ? (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          { key: 0 },
          [
            vue.createElementVNode("view", { class: "input-group" }, [
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  type: "number",
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.phoneForm.phone = $event),
                  placeholder: "请输入手机号",
                  maxlength: "11"
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $data.phoneForm.phone]
              ])
            ]),
            vue.createElementVNode("view", { class: "input-group code-group" }, [
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  type: "number",
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.phoneForm.code = $event),
                  placeholder: "请输入验证码",
                  maxlength: "6"
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $data.phoneForm.code]
              ]),
              vue.createElementVNode("button", {
                class: "code-btn",
                disabled: $data.countdown > 0,
                onClick: _cache[4] || (_cache[4] = (...args) => $options.sendCode && $options.sendCode(...args))
              }, vue.toDisplayString($data.countdown > 0 ? `${$data.countdown}s后重试` : "获取验证码"), 9, ["disabled"])
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        )) : (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          { key: 1 },
          [
            vue.createCommentVNode(" 账号密码登录 "),
            vue.createElementVNode("view", { class: "input-group" }, [
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  type: "text",
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.passwordForm.username = $event),
                  placeholder: "请输入用户名"
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $data.passwordForm.username]
              ])
            ]),
            vue.createElementVNode("view", { class: "input-group" }, [
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  type: "password",
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.passwordForm.password = $event),
                  placeholder: "请输入密码"
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $data.passwordForm.password]
              ])
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        ))
      ]),
      vue.createElementVNode("button", {
        class: "login-btn",
        onClick: _cache[7] || (_cache[7] = (...args) => $options.handleLogin && $options.handleLogin(...args))
      }, "登录"),
      vue.createElementVNode("view", { class: "footer" }, [
        vue.createElementVNode("text", {
          onClick: _cache[8] || (_cache[8] = (...args) => $options.toRegister && $options.toRegister(...args))
        }, "注册账号"),
        vue.createElementVNode("text", {
          onClick: _cache[9] || (_cache[9] = (...args) => $options.toForget && $options.toForget(...args))
        }, "忘记密码？")
      ])
    ]);
  }
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "D:/学习/javaproject/Ares/ares-app/ares-app/pages/login/login.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {
        showSidebar: false,
        currentChatId: null,
        currentChat: null,
        chatHistory: [
          {
            id: 1,
            title: "关于Java编程的讨论",
            time: "2024-03-27 14:30"
          },
          {
            id: 2,
            title: "Spring Boot项目咨询",
            time: "2024-03-27 15:45"
          }
        ],
        chatList: [
          {
            type: "ai",
            content: "你好！我是AI助手，有什么我可以帮你的吗？"
          }
        ],
        inputMessage: "",
        scrollTop: 0,
        scrollIntoView: "",
        isSending: false,
        isRefreshing: false,
        isLoadingMore: false,
        noMoreData: false,
        page: 1,
        pageSize: 20
      };
    },
    onLoad() {
      this.loadHistory();
    },
    methods: {
      // 切换侧边栏显示状态
      toggleSidebar() {
        this.showSidebar = !this.showSidebar;
      },
      // 创建新对话
      createNewChat() {
        const newChat = {
          id: Date.now(),
          title: "新对话",
          time: (/* @__PURE__ */ new Date()).toLocaleString()
        };
        this.chatHistory.unshift(newChat);
        this.switchChat(newChat);
      },
      // 切换对话
      async switchChat(chat) {
        this.currentChatId = chat.id;
        this.currentChat = chat;
        this.chatList = [{
          type: "ai",
          content: "你好！我是AI助手，有什么我可以帮你的吗？"
        }];
        this.page = 1;
        this.noMoreData = false;
        await this.loadHistory();
        this.showSidebar = false;
      },
      // 加载历史记录
      async loadHistory() {
        if (this.isLoadingMore || this.noMoreData)
          return;
        this.isLoadingMore = true;
        try {
          await new Promise((resolve) => setTimeout(resolve, 1e3));
          const mockHistory = Array.from({ length: 5 }, (_, i) => ({
            type: i % 2 === 0 ? "user" : "ai",
            content: `这是第${this.page}页的历史消息 ${i + 1}`
          }));
          this.chatList.unshift(...mockHistory);
          this.page++;
          if (this.page > 3) {
            this.noMoreData = true;
          }
        } catch (error) {
          uni.showToast({
            title: "加载失败",
            icon: "none"
          });
        } finally {
          this.isLoadingMore = false;
        }
      },
      // 下拉刷新
      async onRefresh() {
        this.isRefreshing = true;
        this.page = 1;
        this.noMoreData = false;
        this.chatList = [{
          type: "ai",
          content: "你好！我是AI助手，有什么我可以帮你的吗？"
        }];
        await this.loadHistory();
        this.isRefreshing = false;
      },
      // 发送消息
      async sendMessage() {
        if (!this.inputMessage.trim() || this.isSending)
          return;
        const userMessage = this.inputMessage.trim();
        this.inputMessage = "";
        this.isSending = true;
        this.chatList.push({
          type: "user",
          content: userMessage
        });
        this.$nextTick(() => {
          this.scrollToBottom();
        });
        try {
          await new Promise((resolve) => setTimeout(resolve, 1e3));
          this.chatList.push({
            type: "ai",
            content: "这是一个模拟的AI响应。实际开发中，这里应该调用后端API获取真实的AI响应。"
          });
        } catch (error) {
          uni.showToast({
            title: "发送失败，请重试",
            icon: "none"
          });
        } finally {
          this.isSending = false;
          this.$nextTick(() => {
            this.scrollToBottom();
          });
        }
      },
      // 滚动到底部
      scrollToBottom() {
        const lastIndex = this.chatList.length - 1;
        this.scrollIntoView = "msg-" + lastIndex;
      },
      // 加载更多历史记录
      loadMoreHistory() {
        this.loadHistory();
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "chat-container" }, [
      vue.createCommentVNode(" 当前对话主题 "),
      vue.createElementVNode("view", { class: "chat-header" }, [
        vue.createElementVNode("view", {
          class: "sidebar-toggle",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.toggleSidebar && $options.toggleSidebar(...args))
        }, [
          vue.createElementVNode("text", { class: "iconfont" }, "☰")
        ]),
        vue.createElementVNode(
          "text",
          { class: "chat-title" },
          vue.toDisplayString($data.currentChat ? $data.currentChat.title : "新对话"),
          1
          /* TEXT */
        )
      ]),
      vue.createCommentVNode(" 侧边栏 "),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["sidebar", { "sidebar-show": $data.showSidebar }])
        },
        [
          vue.createElementVNode("view", { class: "sidebar-header" }, [
            vue.createElementVNode("text", { class: "sidebar-title" }, "历史记录"),
            vue.createElementVNode("view", {
              class: "new-chat",
              onClick: _cache[1] || (_cache[1] = (...args) => $options.createNewChat && $options.createNewChat(...args))
            }, [
              vue.createElementVNode("text", { class: "iconfont" }, "+"),
              vue.createElementVNode("text", null, "新建对话")
            ])
          ]),
          vue.createElementVNode("scroll-view", {
            class: "chat-history",
            "scroll-y": ""
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.chatHistory, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: vue.normalizeClass(["history-item", { active: $data.currentChatId === item.id }]),
                  key: index,
                  onClick: ($event) => $options.switchChat(item)
                }, [
                  vue.createElementVNode(
                    "text",
                    { class: "history-title" },
                    vue.toDisplayString(item.title || "新对话"),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "history-time" },
                    vue.toDisplayString(item.time),
                    1
                    /* TEXT */
                  )
                ], 10, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ],
        2
        /* CLASS */
      ),
      vue.createCommentVNode(" 遮罩层 "),
      $data.showSidebar ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "mask",
        onClick: _cache[2] || (_cache[2] = (...args) => $options.toggleSidebar && $options.toggleSidebar(...args))
      })) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 聊天记录区域 "),
      vue.createElementVNode("scroll-view", {
        class: "chat-list",
        "scroll-y": "",
        "scroll-top": $data.scrollTop,
        "scroll-into-view": $data.scrollIntoView,
        onScrolltoupper: _cache[3] || (_cache[3] = (...args) => $options.loadMoreHistory && $options.loadMoreHistory(...args)),
        "refresher-enabled": true,
        "refresher-triggered": $data.isRefreshing,
        onRefresherrefresh: _cache[4] || (_cache[4] = (...args) => $options.onRefresh && $options.onRefresh(...args))
      }, [
        vue.createCommentVNode(" 加载更多提示 "),
        $data.isLoadingMore ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "loading-more"
        }, [
          vue.createElementVNode("text", null, "加载中...")
        ])) : vue.createCommentVNode("v-if", true),
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.chatList, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: vue.normalizeClass(["chat-item", item.type]),
              key: index,
              id: "msg-" + index
            }, [
              vue.createElementVNode("view", { class: "chat-avatar" }, [
                vue.createElementVNode("image", {
                  src: item.type === "user" ? "/static/images/user-avatar.png" : "/static/images/ai-avatar.png",
                  mode: "aspectFill"
                }, null, 8, ["src"])
              ]),
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["chat-content", item.type])
                },
                [
                  vue.createElementVNode(
                    "text",
                    { class: "chat-text" },
                    vue.toDisplayString(item.content),
                    1
                    /* TEXT */
                  )
                ],
                2
                /* CLASS */
              )
            ], 10, ["id"]);
          }),
          128
          /* KEYED_FRAGMENT */
        )),
        vue.createCommentVNode(" 没有更多数据提示 "),
        $data.noMoreData ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "no-more"
        }, [
          vue.createElementVNode("text", null, "没有更多消息了")
        ])) : vue.createCommentVNode("v-if", true)
      ], 40, ["scroll-top", "scroll-into-view", "refresher-triggered"]),
      vue.createCommentVNode(" 输入区域 "),
      vue.createElementVNode("view", { class: "input-area" }, [
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            class: "message-input",
            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.inputMessage = $event),
            type: "text",
            placeholder: "请输入您的问题",
            onConfirm: _cache[6] || (_cache[6] = (...args) => $options.sendMessage && $options.sendMessage(...args))
          },
          null,
          544
          /* NEED_HYDRATION, NEED_PATCH */
        ), [
          [vue.vModelText, $data.inputMessage]
        ]),
        vue.createElementVNode("button", {
          class: "send-btn",
          disabled: !$data.inputMessage.trim() || $data.isSending,
          onClick: _cache[7] || (_cache[7] = (...args) => $options.sendMessage && $options.sendMessage(...args))
        }, [
          vue.createElementVNode("text", { class: "send-icon" }, "发送")
        ], 8, ["disabled"])
      ])
    ]);
  }
  const PagesHomeHome = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "D:/学习/javaproject/Ares/ares-app/ares-app/pages/home/home.vue"]]);
  __definePage("pages/splash/splash", PagesSplashSplash);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/home/home", PagesHomeHome);
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/学习/javaproject/Ares/ares-app/ares-app/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
