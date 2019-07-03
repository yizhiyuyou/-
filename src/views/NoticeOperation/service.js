import Axios from 'axios'
import { get, post } from '@/utils/request'

// 公告信息
export async function getInfo({ id }) {
  const res = await get(`/rest/notice/noticeinfo/info/${id}`)

  if (res.code === 0) {
    const {
      noticeTitle,
      noticeSource,
      noticeType,
      noticeDept,
      noticeDeptname,
      noticeContent,
    } = res.data

    res.data = {
      noticeTitle,
      noticeSource,
      noticeType,
      noticeDept: noticeDept ? noticeDept.split(',') : [],
      noticeDeptname: noticeDeptname ? noticeDeptname.split(',') : [],
      noticeContent,
    }
  }

  return res
}

// 保存
export function saveInfo(params) {
  return post(params.id ? '/rest/notice/noticeinfo/update' : '/rest/notice/noticeinfo/save', {
    entity: JSON.stringify(params),
  })
}

// 列表
export async function upload(url, params) {
  // 后端接口没做到统一，返回的数据格式让我日了狗了
  const res = await Axios.post(url, params, {
    transformRequest(data) {
      return Object.entries(data).reduce((formData, [key, val]) => {
        formData.append(key, val)

        return formData
      }, new FormData())
    },
  })

  return res.data
}

function formatter(arr = []) {
  return arr.map(({ id, name, childList }) => {
    const item = { title: name, key: id, value: id }

    if (Array.isArray(childList) && childList.length) {
      Object.assign(item, { children: formatter(childList) })
    }

    return item
  })
}

export async function getDepteUserTree() {
  const res = await get('/rest/sys/dept/tree-dept-user')

  if (res.code === 0) {
    res.list = formatter([res.data])
  }

  return res
}
