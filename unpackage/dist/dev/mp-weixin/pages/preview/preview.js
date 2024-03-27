"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
const utils_system = require("../../utils/system.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_uni_rate2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat + _easycom_uni_rate + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "preview",
  setup(__props) {
    const maskState = common_vendor.ref(true);
    const infoPopup = common_vendor.ref(null);
    const scorePopup = common_vendor.ref(null);
    const userScore = common_vendor.ref(0);
    const classList = common_vendor.ref([]);
    const currentIndex = common_vendor.ref(0);
    const currentId = common_vendor.ref("");
    const readImgs = common_vendor.ref([]);
    const isScore = common_vendor.ref(false);
    const storeClassList = common_vendor.index.getStorageSync("storeClassList") || [];
    classList.value = storeClassList == null ? void 0 : storeClassList.map((item) => {
      return {
        ...item,
        picurl: item.smallPicurl.replace("_small.webp", ".jpg")
      };
    });
    const currentInfo = common_vendor.computed(() => classList.value[currentIndex.value]);
    common_vendor.onLoad(async (e) => {
      const {
        id,
        type
      } = e;
      currentId.value = id;
      if (type && type == "share") {
        const res = await api_apis.apiDetailWall({ id });
        classList.value = res.data.map((item) => {
          return {
            ...item,
            picurl: item.smallPicurl.replace("_small.webp", ".jpg")
          };
        });
      }
      currentIndex.value = classList.value.findIndex((item) => item._id === id);
      readImgsFun();
    });
    const swiperChange = (e) => {
      const {
        detail: {
          current
        }
      } = e;
      currentIndex.value = current;
      readImgsFun();
    };
    const clickInfo = () => {
      infoPopup.value.open();
    };
    const clickInfoClose = () => {
      infoPopup.value.close();
    };
    const clickScore = () => {
      if (currentInfo.value.userScore) {
        isScore.value = true;
        userScore.value = currentInfo.value.userScore;
      }
      scorePopup.value.open();
    };
    const clickScoreClose = () => {
      userScore.value = 0;
      scorePopup.value.close();
      isScore.value = false;
    };
    const submitScore = async () => {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      let {
        classid,
        _id: wallId
      } = currentInfo.value;
      let res = await api_apis.apiGetSetupScore({
        classid,
        wallId,
        userScore: userScore.value
      });
      common_vendor.index.hideLoading();
      if (res.errCode === 0) {
        common_vendor.index.showToast({
          title: "评分成功",
          icon: "none"
        });
        classList.value[currentIndex.value].userScore = userScore.value;
        common_vendor.index.setStorageSync("storgClassList", classList.value);
        clickScoreClose();
      }
    };
    const maskChange = () => {
      maskState.value = !maskState.value;
    };
    const goBack = () => {
      common_vendor.index.navigateBack({
        success: () => {
        },
        fail: () => {
          common_vendor.index.reLaunch({
            url: "/pages/index/index "
          });
        }
      });
    };
    const downLoad = async () => {
      try {
        common_vendor.index.showLoading({
          title: "下载中...",
          mask: true
        });
        let {
          classid,
          _id: wallId
        } = currentInfo.value;
        const res = await api_apis.apiWriteDownload({
          classid,
          wallId
        });
        if (res.errCode != 0)
          throw res;
        common_vendor.index.getImageInfo({
          src: currentInfo.value.picurl,
          success: (res2) => {
            common_vendor.index.saveImageToPhotosAlbum({
              filePath: res2.path,
              success: (data) => {
                common_vendor.index.showToast({
                  title: "保存成功，请到相册查看",
                  icon: "none"
                });
              },
              fail: (err) => {
                if (err.errMsg == "saveImageToPhotosAlbum:fail cancel") {
                  common_vendor.index.showToast({
                    title: "保存失败，请重新点击下载",
                    icon: "none"
                  });
                  return;
                }
                common_vendor.index.showModal({
                  title: "授权提示",
                  content: "需要授权保存相册",
                  success: (res3) => {
                    if (res3.confirm) {
                      common_vendor.index.openSetting({
                        success: (setting) => {
                          if (setting.authSetting["scope.writePhotosAlbum"]) {
                            common_vendor.index.showToast({
                              title: "获取授权成功",
                              icon: "none"
                            });
                          } else {
                            common_vendor.index.showToast({
                              title: "获取权限失败",
                              icon: "none"
                            });
                          }
                        }
                      });
                    }
                  },
                  fail: () => {
                  }
                });
              },
              complete: () => {
                common_vendor.index.hideLoading();
              }
            });
          }
        });
      } catch (e) {
        console.log(e);
        common_vendor.index.hideLoading();
      }
    };
    common_vendor.onShareAppMessage(() => {
      return {
        title: "呆桃的小屋",
        path: `/pages/preview/preview?id=${currentId.value}&type=share`
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "呆桃的小屋",
        query: `id=${currentId.value}&type=share`
      };
    });
    const readImgsFun = () => {
      readImgs.value.push(
        currentIndex.value <= 0 ? classList.length - 1 : currentIndex.value - 1,
        currentIndex.value,
        currentIndex >= classList.length - 1 ? 0 : currentIndex + 1
      );
      readImgs.value = [...new Set(readImgs.value)];
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(classList.value, (item, index, i0) => {
          return common_vendor.e({
            a: readImgs.value.includes(index)
          }, readImgs.value.includes(index) ? {
            b: common_vendor.o(maskChange, item._id),
            c: item.picurl
          } : {}, {
            d: item._id
          });
        }),
        b: currentIndex.value,
        c: common_vendor.o(swiperChange),
        d: maskState.value
      }, maskState.value ? {
        e: common_vendor.p({
          type: "back",
          color: "#fff",
          size: "20"
        }),
        f: common_vendor.o(goBack),
        g: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        h: common_vendor.t(currentIndex.value + 1),
        i: common_vendor.t(classList.value.length),
        j: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "hh:mm"
        }),
        k: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "MM月dd日"
        }),
        l: common_vendor.p({
          type: "info",
          size: "28"
        }),
        m: common_vendor.o(clickInfo),
        n: common_vendor.p({
          type: "star",
          size: "28"
        }),
        o: common_vendor.t(common_vendor.unref(currentInfo).score),
        p: common_vendor.o(clickScore),
        q: common_vendor.p({
          type: "download",
          size: "23"
        }),
        r: common_vendor.o(downLoad)
      } : {}, {
        s: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        t: common_vendor.o(clickInfoClose),
        v: common_vendor.t(common_vendor.unref(currentInfo)._id),
        w: common_vendor.t(common_vendor.unref(currentInfo).nickname),
        x: common_vendor.p({
          readonly: true,
          touchable: true,
          value: common_vendor.unref(currentInfo).score,
          size: "16"
        }),
        y: common_vendor.t(common_vendor.unref(currentInfo).score),
        z: common_vendor.t(common_vendor.unref(currentInfo).description),
        A: common_vendor.f(common_vendor.unref(currentInfo).tabs, (tab, k0, i0) => {
          return {
            a: common_vendor.t(tab),
            b: tab
          };
        }),
        B: common_vendor.sr(infoPopup, "2dad6c07-6", {
          "k": "infoPopup"
        }),
        C: common_vendor.p({
          type: "bottom"
        }),
        D: common_vendor.t(isScore.value ? "已经评分过～" : "壁纸评分"),
        E: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        F: common_vendor.o(clickScoreClose),
        G: common_vendor.o(($event) => userScore.value = $event),
        H: common_vendor.p({
          ["disabled-color"]: "#FFCA3E",
          disabled: isScore.value,
          allowHalf: true,
          modelValue: userScore.value
        }),
        I: common_vendor.t(userScore.value),
        J: common_vendor.o(submitScore),
        K: !userScore.value || isScore.value,
        L: common_vendor.sr(scorePopup, "2dad6c07-9", {
          "k": "scorePopup"
        }),
        M: common_vendor.p({
          ["is-mask-click"]: false
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dad6c07"], ["__file", "/Users/chenxiangxiong/Desktop/项目代码/uniapp-music/pages/preview/preview.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
