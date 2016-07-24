## 年级编码表
- 第1位表示小学、中学、高中、其他
	- 小学：primary
	- 中学：junior
	- 高中：high
	- 其他：other
- 第2位表示年级：一年级即为 1
- 综合编码如下：

| 类型     | 年级  | 编码   |
| -------- |:------:| -----:|
|  小学    | 一年级上 | primary11 |
|  小学    | 一年级下 | primary12 |
|  小学    | 二年级上 | primary21 |
|  小学    | 二年级上 | primary22 |
|  小学    | 三年级上 | primary31 |
|  小学    | 三年级下 | primary32 |
|  小学    | 四年级上 | primary41 |
|  小学    | 四年级下 | primary42 |
|  小学    | 五年级上 | primary51 |
|  小学    | 五年级下 | primary52 |
|  小学    | 六年级上 | primary61 |
|  小学    | 六年级下 | primary62 |
|  中学    | 初一上 | junior11 |
|  中学    | 初一下 | junior12 |
|  中学    | 初二上 | junior21 |
|  中学    | 初二下 | junior22 |
|  中学    | 初三上 | junior31 |
|  中学    | 初三下 | junior32 |

## 课程编码
- 开始两位为年级编号
- 后面编码为第几课

|      课文            | 年级编码  | 课程编码 |
| ------------------- |:--------:| :------:| 
|  小学 一年级上 第3课  | primary11 | course03 |
|  小学 一年级下 第5课  | primary12 | course05 |
|  小学 二年级上 第12课 | primary21 | course12 |

## 常用偏旁编号
- [汉字常用偏旁部首 百度文库](http://wenku.baidu.com/link?url=AmsDPLqS9Y9xSA-FTpz-_jZiu_9N71W3VHfQTpMI37oEtq5v7DYoDcY7RX2QiBmgKgDI4l11OCdb1Gp_7YYX_-7eC-0FDiJhCFSEchPklTm)
- [搜狗拼音输入法怎么打偏旁？](http://zhidao.baidu.com/link?url=3zzfJrf3B4w8RkyjAa5M6OqNS2BuYNOTshejbjbE753NZUu4mym1jR7u0lfghbIMF0tKP55lTE0Z2gaS3IhzDK)
- 编码规则
	- 第一位为0
	- 第二位为部首笔画数
	- 第三位为排序先后（根据实际收入定义）

| 笔画数 |  偏旁名称  |  偏旁     | 偏旁编码 |
|------ |:---------:|:---------:| :------:| 
|   2   |  双耳     |     阝    |   part021   |
|   2   |  单耳     |     卩    |   part022   |
|   2   |  立刀     |     刂    |   part023   |
|   2   |  厂字旁   |     厂    |   part024   |
|   2   |  倒八字   |     丷    |   part025   |
|   2   |  秃宝盖   |     冖    |   part026   |
|   2   |  言字旁   |    讠     |   part027   |
|   2   |  两点水   |    冫     |   part028   |
|   3   |  三点水   |    氵     |   part031   |
|   3   |  食字旁   |    饣     |   part031   |

## 常用笔画编码
|  偏旁名称  |  偏旁     | 偏旁编码 |
|:---------:|:---------:| :------:| 
|  横     |     一    |   draw01   |
|  竖     |     丨    |   draw02   |
|  撇     |     丿    |   draw03   |
|  捺     |     丶    |   draw04   |

## 汉字schema输入
|  汉字  |  拼音   | 偏旁编码 | 结构 | 笔画数 | 基本笔画 | 年级编号 | 课文编号 | 粉笔视频 | 钢笔视频 | 毛笔视频 | 结构图片 |
|:---------:|:---------:| :------:| :---------:|:---------:| :------:|:---------:|:---------:| :------:| :---------:|:---------:| :------:|
|  邓 | deng  |  part021  | 左右 | 4 | 竖，捺 | primary11 | course03 | /fenbi/primary11/03/fenbi_deng.mp4 | /gangbi/primary11/03/angbi_deng.mp4 | /maobi/primary11/03/maobi_deng.mp4 | /structure/primary11/03/struct_deng.mp4 |
