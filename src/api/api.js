// api接口
const apiUrl = {
  index: {
    getList: '/trs/orders',
    receiving: '/trs/receiving-order',
  },
  phoneHandle: "/trs/phone-handle",
  addOutsideInfo: "/trs/add-outside-info",
  getOutsideInfo: "/trs/get-outside-info",
  saveOutsideInfo: "/trs/save-outside-info",
  repairItemOpts: "/trs/get-maintain-item",
  saveRepairItem: "/trs/add/maintain-item",
  detail: '/trs/order-detail', // 工单详情
  sites: '/trs/sites', // 获取维修站信息
  saveMaintain: '/trs/add-maintain-info', // 维修厂登录保存
  workingInfo: '/trs/add-working-info', // 保存工时
  installationKit: '/trs/add-parts-info', // 保存零配件
  extraCharge: '/trs/add-additional-cost', // 保存附加费
  upDatePhoto: '/trs/upload', // 上传图片
  getMaintain: '/trs/get-maintain-info', // 获取维修登记信息
  changePassWord: '/trs/modify-password', // 修改密码
  gerVisit: '/apis/trs/get-visit', // 获取回访记录
  saveVisit: '/apis/trs/add-visit', // 添加回访记录
}
export default apiUrl
