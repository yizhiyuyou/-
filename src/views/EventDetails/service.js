import { get } from '@/utils/request'

export async function getBaseEventInfoById(id) {
  const res = await get(`/rest/event/eventinfo/info/${id}`)

  if (res.code === 0) {
    const {
      eventNum,
      creator,
      phone,
      createTime,
      eventType,
      position,
      copyList,
      markNote,
      imgList,
      handlerList,
      processList,
      state,
      timeUsage,
    } = res.data

    res.data = {
      ...res.data,
      baseInfo: {
        eventNum,
        creator,
        phone,
        createTime,
        eventType,
        position,
        copyListName: copyList.map(({ noticeName }) => noticeName).join(','),
        markNote,
        imgList: imgList.map(({ url }) => url),
        handlerListName: handlerList.map(({ realname }) => realname).join(' > '),
      },
      processList: processList.map(
        ({ processType, handleTime, handler, phone, markNote, imgList }) => ({
          processType,
          handleTime,
          handler,
          phone,
          markNote,
          imgList: imgList.map(({ url }) => url),
        })
      ),
      state,
      timeUsage,
    }
  }

  return res
}
