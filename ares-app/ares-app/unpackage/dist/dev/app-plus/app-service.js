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
  const _imports_0$1 = "/static/logo.png";
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
        src: _imports_0$1,
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
  const _imports_0 = "/static/avatar.png";
  const _sfc_main$1 = {
    data() {
      return {
        functions: [
          { name: "个人中心", icon: "/static/icons/user.png", url: "/pages/user/user" },
          { name: "消息通知", icon: "/static/icons/message.png", url: "/pages/message/message" },
          { name: "设置", icon: "/static/icons/settings.png", url: "/pages/settings/settings" },
          { name: "帮助中心", icon: "/static/icons/help.png", url: "/pages/help/help" }
        ]
      };
    },
    methods: {
      navigateTo(url) {
        uni.navigateTo({
          url
        });
      },
      handleLogout() {
        uni.showModal({
          title: "提示",
          content: "确定要退出登录吗？",
          success: (res) => {
            if (res.confirm) {
              uni.reLaunch({
                url: "/pages/login/login"
              });
            }
          }
        });
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "home-container" }, [
      vue.createCommentVNode(" 顶部用户信息 "),
      vue.createElementVNode("view", { class: "user-info" }, [
        vue.createElementVNode("image", {
          class: "avatar",
          src: _imports_0,
          mode: "aspectFill"
        }),
        vue.createElementVNode("view", { class: "user-detail" }, [
          vue.createElementVNode("text", { class: "username" }, "用户名"),
          vue.createElementVNode("text", { class: "user-id" }, "ID: 888888")
        ])
      ]),
      vue.createCommentVNode(" 功能区域 "),
      vue.createElementVNode("view", { class: "function-area" }, [
        vue.createElementVNode("view", { class: "section-title" }, "常用功能"),
        vue.createElementVNode("view", { class: "function-grid" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.functions, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "function-item",
                key: index,
                onClick: ($event) => $options.navigateTo(item.url)
              }, [
                vue.createElementVNode("image", {
                  class: "function-icon",
                  src: item.icon,
                  mode: "aspectFit"
                }, null, 8, ["src"]),
                vue.createElementVNode(
                  "text",
                  { class: "function-name" },
                  vue.toDisplayString(item.name),
                  1
                  /* TEXT */
                )
              ], 8, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      vue.createCommentVNode(" 退出登录按钮 "),
      vue.createElementVNode("button", {
        class: "logout-btn",
        onClick: _cache[0] || (_cache[0] = (...args) => $options.handleLogout && $options.handleLogout(...args))
      }, "退出登录")
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
