"use strict";const e=require("../../common/vendor.js"),a=require("../../api/apis.js");if(require("../../utils/request.js"),!Array){(e.resolveComponent("uni-search-bar")+e.resolveComponent("uni-icons")+e.resolveComponent("uv-empty")+e.resolveComponent("uni-load-more"))()}Math||((()=>"../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js")+(()=>"../../uni_modules/uni-icons/components/uni-icons/uni-icons.js")+(()=>"../../uni_modules/uv-empty/components/uv-empty/uv-empty.js")+(()=>"../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js"))();const o={__name:"search",setup(o){const l=e.ref({pageNum:1,pageSize:12,keyword:""}),u=e.ref(e.index.getStorageSync("historySearch")||[]),n=e.ref(["美女","帅哥","宠物","卡通"]),r=e.ref(!1),s=e.ref(!1),t=e.ref([]),i=()=>{e.index.showLoading(),u.value=[...new Set([l.value.keyword,...u.value])].slice(0,10),e.index.setStorageSync("historySearch",u.value),m(l.value.keyword),p(),console.log(l.value.keyword)},v=()=>{m()},c=e=>{m(e),i()},d=()=>{e.index.showModal({title:"是否清空历史搜索？",success:a=>{a.confirm&&(e.index.removeStorageSync("historySearch"),u.value=[])}})},p=async()=>{try{let o=await a.apiSearchData(l.value);t.value=[...t.value,...o.data],e.index.setStorageSync("storgClassList",t.value),l.value.pageSize>o.data.length&&(r.value=!0),0==o.data.length&&0==t.value.length&&(s.value=!0),console.log(o)}finally{e.index.hideLoading()}},m=(e="")=>{t.value=[],r.value=!1,s.value=!1,l.value={pageNum:1,pageSize:12,keyword:e||""}};return e.onReachBottom((()=>{r.value||(l.value.pageNum++,p())})),e.onUnload((()=>{e.index.removeStorageSync("storgClassList",t.value)})),(a,o)=>e.e({a:e.o(i),b:e.o(v),c:e.o(v),d:e.o((e=>l.value.keyword=e)),e:e.p({focus:!0,placeholder:"搜索",modelValue:l.value.keyword}),f:!t.value.length||s.value},!t.value.length||s.value?e.e({g:u.value.length},u.value.length?{h:e.p({type:"trash",size:"25"}),i:e.o(d),j:e.f(u.value,((a,o,l)=>({a:e.t(a),b:a,c:e.o((e=>c(a)),a)})))}:{},{k:e.f(n.value,((a,o,l)=>({a:e.t(a),b:a,c:e.o((e=>c(a)),a)})))}):{},{l:s.value},s.value?{m:e.p({mode:"search",icon:"http://cdn.uviewui.com/uview/empty/search.png"})}:e.e({n:e.f(t.value,((e,a,o)=>({a:e.smallPicurl,b:`/pages/preview/preview?id=${e._id}`,c:e._id}))),o:r.value||t.value.length},r.value||t.value.length?{p:e.p({status:r.value?"noMore":"loading"})}:{}))}},l=e._export_sfc(o,[["__scopeId","data-v-5333dbfe"]]);wx.createPage(l);