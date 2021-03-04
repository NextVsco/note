/**
 * 数据排名方法
 * 存在一组数据（大量的），需要在数据每次变动时进行排序
 * 表一：数据的具体分值 n
 * 表二：分值所在的当前排行 n2 (n2<=n)
 * 表三：变动记录
 */

var table1 = [
  { id: 1, value: 38 },
  { id: 2, value: 18 },
  { id: 3, value: 12 },
  { id: 4, value: 42 },
  { id: 5, value: 28 },
  { id: 6, value: 38 },
]

var table2 = [
  { value: 42, num: 1, time: new Date().valueOf(), rank: 1 },
  { value: 38, num: 2, time: new Date().valueOf(), rank: 2 },
  { value: 28, num: 1, time: new Date().valueOf(), rank: 3 },
  { value: 18, num: 1, time: new Date().valueOf(), rank: 4 },
  { value: 12, num: 1, time: new Date().valueOf(), rank: 5 }
]

var table3 = []

function tableChange(index, value) {
  table3.push({
    time: new Date().valueOf(),
    before: table1[index].value,
    now: value,
  })

  table1[index].value = value
}

/* 当id=3的数据分值变动16时 */
tableChange(2, 16)

/**
 * 获取排行时：
 * 根据分值查询table2中相应的排行，
 * 根据更新时间，获取table3中分值的变动记录，对分值进行计算
 * 如若分值变动前后的值在当前分范围内，则变动排行，并刷新更新时间
 */

 /**
  * 需要对table3的处理：
  * 数据总是加在头或者尾，以时间为索引；
  * 查询时，从时间的当前往前查询，而不是对table3中所有的数据遍历
  */
