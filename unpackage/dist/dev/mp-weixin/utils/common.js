"use strict";
const common_vendor = require("../common/vendor.js");
function compareTimestamp(timestamp) {
  const currentTime = (/* @__PURE__ */ new Date()).getTime();
  const timeDiff = currentTime - timestamp;
  if (timeDiff < 6e4) {
    return "1分钟内";
  } else if (timeDiff < 36e5) {
    return Math.floor(timeDiff / 6e4) + "分钟";
  } else if (timeDiff < 864e5) {
    return Math.floor(timeDiff / 36e5) + "小时";
  } else if (timeDiff < 2592e6) {
    return Math.floor(timeDiff / 864e5) + "天";
  } else if (timeDiff < 7776e6) {
    return Math.floor(timeDiff / 2592e6) + "月";
  } else {
    return null;
  }
}
function goToHome() {
  common_vendor.index.showModal({
    title: "提示",
    content: "页面参数有误，将返回首页",
    success: (res) => {
      if (res.confirm) {
        common_vendor.index.reLaunch({
          url: "/pages/index/index"
        });
      }
    }
  });
}
exports.compareTimestamp = compareTimestamp;
exports.goToHome = goToHome;
