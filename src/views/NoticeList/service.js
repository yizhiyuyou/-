import { get, post } from '@/utils/request'

// 列表
export async function getList(params) {
  const filterParams = Object.entries(params).reduce((prev, [key, value]) => {
    if (!value) {
      return { ...prev }
    }

    return { ...prev, [key]: value }
  }, {})

  const res = await get('/rest/notice/noticeinfo/list', filterParams)

  if (res.code === 0) {
    res.list = res.list.map(
      ({
        createTime,
        noticeTitle,
        noticeSource,
        noticeType,
        noticeDeptname,
        creator,
        noticeContent,
        noticeState,
        id,
      }) => ({
        createTime,
        noticeTitle,
        noticeSource,
        receive: noticeType === 0 ? '全部' : noticeDeptname,
        creator,
        noticeState,
        noticeStateColor: noticeState === 1 ? '#f78989' : '#32CD32',
        noticeStateText: noticeState === 1 ? '已发布' : '未发布',
        noticeContent,
        id,
      })
    )
  }

  return res
}

// 删除
export function deleteItemById({ id }) {
  return post('/rest/notice/noticeinfo/delete', { ids: JSON.stringify([id]) })
}

// 保存 or 编辑
export function saveData(params) {
  const url = params.id
    ? '/rest/sparepart/sparepartmanagement/update'
    : '/rest/sparepart/sparepartmanagement/save'

  return post(url, params)
}
