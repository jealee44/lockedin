const fs = require('fs')

// const book = {
//     title: 'Edgo is the enemy',
//     author: 'Ryan Holiday',
// }

// const bookJSON = JSON.stringify(book)
// // console.log(bookJSON)

// // //bookJSON is a string not object. Can't do bookJSON.title its book.title 

// // const parseData = JSON.parse(bookJSON)
// // console.log(parseData.author)

// //takes in JSON string and makes into object 

// fs.writeFileSync('1-json.json', bookJSON)

// const dataBuffer = fs.readFileSync('1-json.json')
// const dataJSON = dataBuffer.toString();
// const data = JSON.parse(dataJSON)
// console.log(data.title)

const bio = fs.readFileSync('1-json.json')
// console.log(bio)

const bioJSON = bio.toString()
const bioData = JSON.parse(bioJSON)
bioData.name = "Jea"
bioData.age = 29
newBioData = JSON.stringify(bioData)

fs.writeFileSync('1-json.json', newBioData)