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
              path: '/mall',
              name: 'mall',
              label: '商品管理',
              icon: 'video-play',
              url: 'mall/index'
            },
            {
              path: '/user',
              name: 'user',
              label: '用户管理',
              icon: 'user',
              url: 'user/index'
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
              label: '其他',
              icon: 'location',
              children: [
                {
                  path: '/page1',
                  name: 'page1',
                  label: '页面1',
                  icon: 'setting',
                  url: 'other/pageOne.vue'
                },
                {
                  path: '/page2',
                  name: 'page2',
                  label: '页面2',
                  icon: 'setting',
                  url: 'other/pageTwo.vue'
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
            }
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
    }
    // else if(username ==='order' && password === 'order') {
    //   return {
    //     code: 20000,
    //     data: {
    //       menu: [
    //         {
    //           path: '/',
    //           name: 'home',
    //           label: '首页',
    //           icon: 's-home',
    //           url: 'home/index'
    //         },
    //         {
    //           path: '/d_order',
    //           name: 'patch',
    //           label: '调度订单',
    //           icon: 'video-play',
    //           url: 'dispatch/order'
    //         }
    //       ],
    //       token: Mock.Random.guid(),
    //       message: '获取成功'
    //     }
    //   }
    // }
    else {
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
    }

  }
}