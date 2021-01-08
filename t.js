var richtext = `
<div id="attributes"
style="margin-bottom: 10px; padding: 10px; border-bottom: 1px solid rgb(238, 238, 238); color: rgb(0, 0, 0); font-family: tahoma, arial, &quot;Hiragino Sans GB&quot;, 宋体, sans-serif; font-size: 12px;">
<ul
  style="margin-top: 0px; margin-bottom: 0px; margin-left: 0px; padding-right: 15px; padding-left: 15px; list-style: none; clear: both;">
  <li title="Mermaid优选"
    style="margin-right: 20px; display: inline; float: left; width: 206px; height: 24px; overflow: hidden; text-indent: 5px; line-height: 24px; white-space: nowrap; text-overflow: ellipsis;">
    品牌:&nbsp;Mermaid优选</li>
  <li title="辣么大耳机音箱 辣么大耳机音箱套餐 三代升级款蓝牙巨型音响 三代升级款双音响套餐 二代三代搭配超值套餐 让男友“哇塞”的礼品一！ 让男友“哇塞”的礼品二！"
    style="margin-right: 20px; display: inline; float: left; width: 206px; height: 24px; overflow: hidden; text-indent: 5px; line-height: 24px; white-space: nowrap; text-overflow: ellipsis;">
    颜色分类:&nbsp;辣么大耳机音箱 辣么大耳机音箱套餐 三代升级款蓝牙巨型音响 三代升级款双音响套餐 二代三代搭配超值套餐 让男友“哇塞”的礼品一！ 让男友“哇塞”的礼品二！</li>
  <li title="礼盒装"
    style="margin-right: 20px; display: inline; float: left; width: 206px; height: 24px; overflow: hidden; text-indent: 5px; line-height: 24px; white-space: nowrap; text-overflow: ellipsis;">
    包装方式:&nbsp;礼盒装</li>
  <li title="毛绒类礼品"
    style="margin-right: 20px; display: inline; float: left; width: 206px; height: 24px; overflow: hidden; text-indent: 5px; line-height: 24px; white-space: nowrap; text-overflow: ellipsis;">
    礼品类别:&nbsp;毛绒类礼品</li>
</ul>
</div>
<div id="tad_second_area"
style="color: rgb(0, 0, 0); font-family: tahoma, arial, &quot;Hiragino Sans GB&quot;, 宋体, sans-serif; font-size: 12px;">
</div>
<div id="description"
style="clear: both; margin-bottom: 20px; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; line-height: 1.5; font-family: tahoma, arial, 宋体, sans-serif; color: rgb(0, 0, 0); background-image: initial !important; background-position: initial !important; background-size: initial !important; background-repeat: initial !important; background-attachment: initial !important; background-origin: initial !important; background-clip: initial !important;">
<div id="J_DivItemDesc"
  style="width: 750px; padding-top: 10px; overflow: hidden; overflow-wrap: break-word; position: relative !important;">
  <p style="margin-top: 1.12em; margin-bottom: 1.12em;"><img align="absmiddle"
      src="https://img.alicdn.com/imgextra/i4/553817206/O1CN01yEZLYm236OfeyJDgR_!!553817206.jpg"
      style="border: 0px; vertical-align: top; max-width: 750px;"><img align="absmiddle"
      src="https://img.alicdn.com/imgextra/i3/553817206/O1CN01C0eN8B236OfcMlctu_!!553817206.jpg"
      style="border: 0px; vertical-align: top; max-width: 750px;"></p>
</div>
</div>
`
/**
 * 富文本图片兼容
 * @param {String} richtext 
 */
function filterRich(richtext) {
  var text = ""
  do{
    console.log(
      richtext.match(/<img[^\/img>]*\/img>/)
    )
  } while (false)
  return text
}

filterRich(richtext)