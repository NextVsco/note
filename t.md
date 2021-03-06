


# 散数列（哈希表）
对任意一组输入数据进行计算，得到一个固定长度的输出摘要；
将一组长度为n的数据，通过对n的计算，分配到固定长度的有序列表中
[实例演示](https://mp.weixin.qq.com/s?__biz=MzUyNjQxNjYyMg==&mid=2247486499&idx=4&sn=7c9aee095ec972b1af842788c545d309&chksm=fa0e63a2cd79eab47649274533063bea75550d97aa55f60856f02037bc2f6b657270630f214b&scene=21#wechat_redirect)

上述的分配中，可能会产生分配不均（`散列冲突`）

- 散列函数，散列函数的选择非常重要
- 散列冲突，涉及散列表时，因尽量避免散列冲突，对于冲突也要有好的解决方案
- 快速从散列表中查找数据

# 散列冲突的解决

- `拉链法`，在相同地址下产生冲突，就堆放在一起。缺点，冲突较多下，单链上查询速度慢
- `开放定址法`，当发生冲突时，就选择另外一个可用的位置
  - 线性探测，地址满了，找下一个缺点：冲突较多下，任何关键字都需要多次尝试才能解决冲突。递归的方式是有序的，就不适合查询

特点：可以保证数据的准确性

用途：文件校验，数字签名，密码存储

公钥、私钥（非对称加密）
> 双方通过对方暴露的公钥对需要通讯的内容加密，接收方将加密内容通过自己的私钥进行解密得到明文。公钥的传出存在一定的风险，于是产生了签名