"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "user",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "download-filled",
          size: "20"
        }),
        b: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        c: common_vendor.p({
          type: "star-filled",
          size: "20"
        }),
        d: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        e: common_vendor.p({
          type: "chatboxes-filled",
          size: "20"
        }),
        f: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        g: common_vendor.p({
          type: "notification-filled",
          size: "20"
        }),
        h: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        i: common_vendor.p({
          type: "flag-filled",
          size: "20"
        }),
        j: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"], ["__file", "/Users/chenxiangxiong/Desktop/项目代码/uniapp-music/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
