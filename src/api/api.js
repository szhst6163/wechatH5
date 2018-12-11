// api接口
const apiUrl = {
  login:"/api/user/login",
  register:"/api/user/register",
  sendSms:'/api/user/sendsms',
  collect:"/api/user/addcollect",
  unCollect:"/api/user/canclecollect",
  search:"/api/search/search",
  myview:"/api/user/myview",
  getchance:"/api/user/getchance",
  getTicket1:'/api/user/add_signup_first',
  getTicket2:'/api/user/add_signup_second ',
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
