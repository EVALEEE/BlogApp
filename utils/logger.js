// info用于打印正常的日志信息
const info = (...params) => {
    console.log(...params)
}

// error用于打印错误信息
const error = (...params) => {
    console.error(...params)
}

module.exports = {
    info, error
}