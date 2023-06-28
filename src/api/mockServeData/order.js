import Mock from 'mockjs'

// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj (url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
        '"}'
    )
}

let List = []
const count = 200

for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            id: Mock.Random.guid(),
            product_name: Mock.Random.cname(),
            product_count: Mock.Random.integer(0, 20),
            product_price: Mock.Random.integer(0, 100),
            product_condition: Mock.Random.integer(0, 1)===0?'已签收':'未签收'
        })
    )
}

export default {

    getOrders: config => {
        const { name, page = 1, limit = 20 } = param2Obj(config.url)
        console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit)
        const mockList = List.filter(product => {
            return !(name && product.product_name.indexOf(name) === -1 && product.product_name.indexOf(name) === -1);
        })
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        return {
            code: 20000,
            count: mockList.length,
            list: pageList
        }
    },

    createOrder: config => {
        const { product_name, product_count, product_price, product_condition } = JSON.parse(config.body)
        console.log(JSON.parse(config.body))
        List.unshift({
            id: Mock.Random.guid(),
            product_name: product_name,
            product_count: product_count,
            product_price: product_price,
            product_condition: product_condition,
        })
        return {
            code: 20000,
            data: {
                message: '添加成功'
            }
        }
    },

    deleteOrder: config => {
        const { id } = param2Obj(config.url)
        if (!id) {
            return {
                code: -999,
                message: '参数不正确'
            }
        } else {
            List = List.filter(u => u.id !== id)
            return {
                code: 20000,
                message: '删除成功'
            }
        }
    },
    /**
     * 批量删除
     * @param config
     * @return {{code: number, data: {message: string}}}
     */
    batchRemove: config => {
        let { ids } = param2Obj(config.url)
        ids = ids.split(',')
        List = List.filter(u => !ids.includes(u.id))
        return {
            code: 20000,
            data: {
                message: '批量删除成功'
            }
        }
    },

    updateOrder: config => {
        const { id, product_name, product_count, product_price, product_condition} = JSON.parse(config.body)
        List.some(u => {
            if (u.id === id) {
                u.product_name = product_name
                u.product_count = product_count
                u.product_price = product_price
                u.product_condition = product_condition
                return true
            }
        })
        return {
            code: 20000,
            data: {
                message: '编辑成功'
            }
        }
    }
}
