
function computedBinary(a, b, opt="+") {
  switch (opt) {
    case "+":
      return (parseInt(a, 2) + parseInt(b, 2)).toString(2)
    case "-":
      return (parseInt(a, 2) - parseInt(b, 2)).toString(2)
    case "*":
      return (parseInt(a, 2) * parseInt(b, 2)).toString(2)
    case "/":
      console.error('no support except(/)')
      break;
    default:
      computedBinary(a, b, "+")
      break;
  }
}

console.log(
  computedBinary(111,10)
)