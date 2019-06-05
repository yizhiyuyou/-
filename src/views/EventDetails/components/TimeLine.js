import React from 'react'

import { Timeline } from 'antd'

import styles from './TimeLine.module.less'

const { Item } = Timeline

export default ({ state, timeUsage, list = [] }) => {
  const isEnd = state === '已结束'

  function getColor(i) {
    if (i === 0 || (isEnd && i === list.length - 1)) {
      return 'green'
    }

    return 'blue'
  }

  return (
    <div className={styles['time-line']}>
      <div className={styles['header']}>
        <div>
          状态：<span className={styles['color_main_1']}>{state}</span>
        </div>
        <div>
          处理时长：<span className={styles['color_main_2']}>{timeUsage}min</span>
        </div>
      </div>
      <div className={styles.main}>
        <Timeline pending={isEnd ? false : '进行中...'} reverse={true}>
          {list
            .map(({ handleTime, discription }, index) => (
              <Item color={getColor(index)} key={index}>
                <div className={styles.time}>{handleTime}</div>
                <div className={styles.content}>{discription}</div>
              </Item>
            ))
            .reverse()}
        </Timeline>
      </div>
    </div>
  )
}
