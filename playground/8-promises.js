const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve (a + b)
        }, 2000)
    })
}


add(1, 1).then((sum) => {
    return add(sum, 4)
}).then((sum2) => {
    console.log(sum2)
}).catch((e) => {
    console.log(e)
})