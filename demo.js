var data = 
`btn-share {
  width: 156rpx;
  height: 100rpx;
  line-height: 56rpx;
  text-align  : center;
  border-radius    :6rpx;
  font-size: 26rpx;
  color: #fff;
  background-color: #937A68;
  background: linear-gradient(135deg, #B9A68D 0%, #937A68 100%);
}`

var values = data.match(/btn[^{]*{[^}]*height[^}]*border-radius[\s|:]*(6|8)[^}]*}/)
var height = values[0].match(/([\s]|;)[\s]*height:[^;]*;/)
var br = values[0].match(/([\s]|;)[\s]*border-radius[\s|:]*([^s|^;]*)[^;]*;/)
var brv = br[0].match(/([\w|\d]+);/)
console.log(brv)
// var num = height[0].match(/([0-9]+)/)
// var unit = height[0].match(/([0-9]+)([\w]+);/)
// console.log(height)
// console.log(br)
// console.log(data.substring(91,92))
// console.log(num)
// console.log(unit[2])