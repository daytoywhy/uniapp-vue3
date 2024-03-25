"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  _easycom_uni_load_more2();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  _easycom_uni_load_more();
}
const _sfc_main = {
  __name: "classlist",
  setup(__props) {
    const classList = common_vendor.ref([]);
    const noData = common_vendor.ref(false);
    const qryParams = {
      pageNum: 1,
      pageSize: 12
    };
    common_vendor.onLoad((e) => {
      const {
        classId,
        name
      } = e;
      qryParams.classid = classId;
      common_vendor.index.setNavigationBarTitle({
        title: name
      });
      getClassList(qryParams);
    });
    const getClassList = async (params) => {
      const res = await api_apis.apiGetClassList({
        ...params
      });
      classList.value = classList.value.concat(res.data);
      common_vendor.index.setStorageSync("storeClassList", classList.value);
      if (qryParams.pageSize > res.data.length)
        noData.value = true;
    };
    common_vendor.onReachBottom(() => {
      if (noData.value)
        return;
      qryParams.pageNum++;
      getClassList(qryParams);
    });
    common_vendor.onUnload(() => {
      common_vendor.index.removeStorageSync("storeClassList");
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !classList.value.length && !noData.value
      }, !classList.value.length && !noData.value ? {
        b: common_vendor.p({
          status: "loading"
        })
      } : {}, {
        c: common_vendor.f(classList.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: `/pages/preview/preview?id=${item._id}`,
            c: item._id
          };
        }),
        d: classList.value.length || noData.value
      }, classList.value.length || noData.value ? {
        e: common_vendor.p({
          status: noData.value ? "noMore" : "loading"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bd381383"], ["__file", "/Users/chenxiangxiong/Desktop/项目代码/uniapp-music/pages/classlist/classlist.vue"]]);
wx.createPage(MiniProgramPage);
