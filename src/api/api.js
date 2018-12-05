// api接口
const apiUrl = {
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
