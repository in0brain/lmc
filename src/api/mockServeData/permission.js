import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === 'admin' && password === 'admin') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'home/index'
            },
            {
              label: '客户管理',
              icon: 'user',
              children: [
                {
                  path: '/addCustomer',
                  name: 'addCustomer',
                  label: '添加客户',
                  icon: 'user',
                  url: 'customer/addCustomer'
                },
                {
                  path: '/research',
                  name: 'research',
                  label: '查询客户',
                  icon: 'user',
                  url: 'customer/research.vue'
                }
              ]
            },
            {
              label: '订单调度',
              icon: 'location',
              children: [
                {
                  path: '/d_order',
                  name: 'd_order',
                  label: '调度订单',
                  icon: 'video-play',
                  url: 'dispatch/order.vue'
                },
                {
                  path:'/d_modify_state',
                  name: 'd_modify_state',
                  label: '状态修改',
                  icon: 'video-play',
                  url: 'dispatch/modifyState.vue'
                },
                {
                  path:'/d_research_ticket',
                  name: 'd_research_ticket',
                  label: '任务单查询',
                  icon: 'video-play',
                  url: 'dispatch/researchTicket.vue'
                },
                {
                  path:'/d_product_allocation',
                  name: 'd_product_allocation',
                  label: '商品调拨',
                  icon: 'video-play',
                  url: 'dispatch/productAllocation.vue'
                },
                {
                  path:'/d_ticket_allocation',
                  name: 'd_ticket_allocation',
                  label: '任务分配',
                  icon: 'video-play',
                  url: 'dispatch/ticketAllocation.vue'
                },
                {
                  path:'/d_print_deliver_info',
                  name: 'd_print_deliver_info',
                  label: '打印配送单',
                  icon: 'video-play',
                  url: 'dispatch/printDeliverInfo.vue'
                },
                {
                  path:'/d_receipt_entry',
                  name: 'd_receipt_entry',
                  label: '回执录入',
                  icon: 'video-play',
                  url: 'dispatch/receiptEntry.vue'
                },
                {
                  path:'/d_payment_inquiry',
                  name: 'd_payment_inquiry',
                  label: '缴款查询',
                  icon: 'video-play',
                  url: 'dispatch/paymentInquiry.vue'
                }
              ]
            },
            // {
            //   path: '/mall',
            //   name: 'mall',
            //   label: '商品管理',
            //   icon: 'video-play',
            //   url: 'mall/index'
            // },
            // {
            //   path: '/user',
            //   name: 'user',
            //   label: '用户管理',
            //   icon: 'user',
            //   url: 'User/index'
            // },
            // {
            //   label: '其他',
            //   icon: 'location',
            //   children: [
            //     {
            //       path: '/page1',
            //       name: 'page1',
            //       label: '页面1',
            //       icon: 'setting',
            //       url: 'other/GetInWarehouse.vue'
            //     },
            //     {
            //       path: '/page2',
            //       name: 'page2',
            //       label: '页面2',
            //       icon: 'setting',
            //       url: 'other/DispatchOut.vue'
            //     }
            //   ]
            // },
            {
              label: '订单管理',
              icon: 'location',
              children: [
                {
                  path: '/neworder',
                  name: 'neworder',
                  label: '新订',
                  icon: 'setting',
                  url: 'OrderManage/NewOrder.vue'
                },
                {
                  path: '/ordersearch',
                  name: 'ordersearch',
                  label: '订单查询',
                  icon: 'setting',
                  url: 'OrderManage/OrderSearch.vue'
                }
              ]
            },
            {
              label: '中心库房',
              icon: 'location',
              children: [
                {
                  path: '/buyinwarehouse',
                  name: 'buyinwarehouse',
                  label: '购货入库',
                  icon: 'setting',
                  url: 'MainWarehouse/BuyInWarehouse.vue'
                },
                {
                  path: '/dispatchout',
                  name: 'dispatchout',
                  label: '调拨出库',
                  icon: 'setting',
                  url: 'MainWarehouse/DispatchOut.vue'
                }
              ]
            },
            {
              label: '分站库房',
              icon: 'location',
              children: [
                {
                  path: '/getinwarehouse',
                  name: 'getinwarehouse',
                  label: '调拨入库',
                  icon: 'setting',
                  url: 'SubWarehouse/GetInWarehouse.vue'
                },
                {
                  path: '/sendservice',
                  name: 'sendservice',
                  label: '配送服务',
                  icon: 'setting',
                  url: 'SubWarehouse/SendService.vue'
                }
              ]
            },
            {
              label: '商品管理',
              icon: 'location',
              children: [
                {
                  path: '/goodssortmanage',
                  name: 'goodssortmanage',
                  label: '分类管理',
                  icon: 'setting',
                  url: 'GoodsManage/GoodsSortManage.vue'
                },
                {
                  path: '/newgoodslogin',
                  name: 'newgoodslogin',
                  label: '新品登记',
                  icon: 'setting',
                  url: 'GoodsManage/NewGoodsLogin.vue'
                }
              ]
            },
            {
              label: '进货管理',
              icon: 'location',
              children: [
                {
                  path: '/suppliermanage',
                  name: 'suppliermanage',
                  label: '供应商管理',
                  icon: 'setting',
                  url: 'MerchandiseManage/SupplierManage.vue'
                },
                {
                  path: '/shortcheck',
                  name: 'shortcheck',
                  label: '缺货检查',
                  icon: 'setting',
                  url: 'MerchandiseManage/ShortCheck.vue'
                },
                {
                  path: '/merchandiselogin',
                  name: 'merchandiselogin',
                  label: '进货登记',
                  icon: 'setting',
                  url: 'MerchandiseManage/MerchandiseLogin.vue'
                },

              ]
            },
            {
              label: '库房管理',
              icon: 'location',
              children: [
                {
                  path: '/newwarehouse',
                  name: 'newwarehouse',
                  label: '库房设置',
                  icon: 'setting',
                  url: 'WareHouseManage/NewWareHouse.vue'
                },
                {
                  path: '/inventorysearch',
                  name: 'inventorysearch',
                  label: '库存量查询',
                  icon: 'setting',
                  url: 'WareHouseManage/InventorySearch.vue'
                },
                {
                  path: '/changesearch',
                  name: 'changesearch',
                  label: '出入库单查询',
                  icon: 'setting',
                  url: 'WareHouseManage/ChangeSearch.vue'
                },
              ]
            },
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (username === 'xiaoxiao' && password === 'xiaoxiao') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'home/index'
            },
            {
              path: '/video',
              name: 'video',
              label: '商品管理',
              icon: 'video-play',
              url: 'mall/index'
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
    }

  }
}
