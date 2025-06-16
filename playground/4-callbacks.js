// setTimeout(() => {
//     console.log('Two seconds are up')
// }, 2000)


// const names = ['Jea, Jess']
// const shortNames = names.filter((name) => {
//     return name.lengnth <= 4
// })

// const geocode = (address, callback) => {
//     setTimeout(() => {
//         const data = {
//         lattitude: 0,
//         longitude: 0
//     }

//     callback(data)
//     }, 2000)
    
// }

// geocode('Philiadelphia', (data) => {
//     console.log(data)
// })



//Goal: callback pattern. Define add function that accepts correct arguments. Use setTimeout to stimulate 2 second delay
//after 2 sec, callback function with sum

const add = (x, y, callback) => {
    setTimeout(() => {
        const sum = x + y
        callback(sum)
    }, 2000)
}


add(1, 4, (sum) => {
    console.log(sum)
})