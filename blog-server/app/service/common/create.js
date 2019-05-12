const { RESCODE } = require('../../../config/conts');
const getList = require('./getList');

/**
 * 通用创建数据方法
 * @param {String}  model   模型名称
 * @param {Object}  ctx     koa上下文
 * @param {Array}   body    创建信息
 * @param {Object}  params  查询参数
 * @param {Object}  page    分页参数
 * @param {Object}  orderBy 排序
 */
module.exports = async ({ model, ctx, body, params, orderBy, page }) => {
  const data = { rescode: RESCODE.SUCCESS, message: '创建成功', list: [], page: {}, stats: {}, change: []};
  const server = ctx.db.mongo[model];
  try {
    data.change = await server.insertMany(body.map(v => ({
      ...v,
      creator: null,
      updater: null,
    })));
  } catch(e) { 
    data.rescode = RESCODE.FAIL;
    data.message = '创建失败';
  }
  if (params){
    const listData = await getList({ model, ctx, params, orderBy, page });
    data.stats = listData.stats || {};
    data.list = listData.list || [];
    data.page = listData.page || {};
  } 
  return data;
}
