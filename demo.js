var person = {
  a:1
}
Object.defineProperty(person,'a',{
  get(){
      return this._a || 1 //定义一个新的属性和一个默认值
  },
  set(val){
      this._a = val 
  },
  writable:true
})

person.a = "name"

Object.defineProperty(person,'a',{
  writable:false
})
console.log(person.a)