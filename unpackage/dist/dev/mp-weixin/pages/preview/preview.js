"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _component_uni_rate = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2 + _component_uni_rate + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "preview",
  setup(__props) {
    const maskState = common_vendor.ref(true);
    const infoPopup = common_vendor.ref(null);
    const scorePopup = common_vendor.ref(null);
    const userScore = common_vendor.ref(0);
    const clickInfo = () => {
      infoPopup.value.open();
    };
    const clickInfoClose = () => {
      infoPopup.value.close();
    };
    const clickScore = () => {
      scorePopup.value.open();
    };
    const clickScoreClose = () => {
      scorePopup.value.close();
    };
    const submitScore = () => {
      console.log("评分了");
    };
    const maskChange = () => {
      maskState.value = !maskState.value;
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(5, (item, k0, i0) => {
          return {};
        }),
        b: common_vendor.o(maskChange),
        c: maskState.value
      }, maskState.value ? {
        d: common_vendor.p({
          type: "back",
          color: "#fff",
          size: "20"
        }),
        e: common_vendor.o(goBack),
        f: common_vendor.unref(utils_system.getStatusBarHeight)() + _ctx.px,
        g: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "hh:mm"
        }),
        h: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "MM月dd日"
        }),
        i: common_vendor.p({
          type: "info",
          size: "28"
        }),
        j: common_vendor.o(clickInfo),
        k: common_vendor.p({
          type: "star",
          size: "28"
        }),
        l: common_vendor.o(clickScore),
        m: common_vendor.p({
          type: "download",
          size: "23"
        })
      } : {}, {
        n: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        o: common_vendor.o(clickInfoClose),
        p: common_vendor.p({
          readonly: true,
          touchable: true,
          value: "3.5",
          size: "16"
        }),
        q: common_vendor.f(3, (item, k0, i0) => {
          return {};
        }),
        r: common_vendor.sr(infoPopup, "2dad6c07-6", {
          "k": "infoPopup"
        }),
        s: common_vendor.p({
          type: "bottom"
        }),
        t: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        v: common_vendor.o(clickScoreClose),
        w: common_vendor.o(($event) => userScore.value = $event),
        x: common_vendor.p({
          allowHalf: true,
          modelValue: userScore.value
        }),
        y: common_vendor.t(userScore.value),
        z: common_vendor.o(submitScore),
        A: !userScore.value,
        B: common_vendor.sr(scorePopup, "2dad6c07-9", {
          "k": "scorePopup"
        }),
        C: common_vendor.p({
          ["is-mask-click"]: false
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dad6c07"], ["__file", "/Users/chenxiangxiong/Desktop/项目代码/uniapp-music/pages/preview/preview.vue"]]);
wx.createPage(MiniProgramPage);
