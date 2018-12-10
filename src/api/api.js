// api接口
const apiUrl = {
  login:"/api/user/login",
  register:"/api/user/register",
  sendSms:'/api/user/sendsms',
  index: {
    getList: '/api/ad/lists',
  },
  tvList:{
    index:'/api/column/index',
    tvDetail:'/api/column/view',
    componentList:'/api/column/lists'
  },
  shop:{
    getList:'/api/goods/lists',
    shopDetail:'/api/goods/view'
  },
}
export default apiUrl
