let str = "I`m?,,,driving,??,to,?beijing,,,after,breakfast"
let arr = str.split(',')

function getStrToUpper(str) {
    const strClean = clean(str)
    return strClean && strClean.replace(strClean[0], strClean[0].toUpperCase())
}
function clean(str) {

    return str.split('?').join('')
}
const formatArr = arr.map(one => {
    let formatStr = one
    if (one[0] == '?') {
        formatStr = getStrToUpper(one)

    } else {
        formatStr = clean(one)
    }
    return formatStr
})
console.log("formatArr", formatArr.filter(one => one).join(' '))

