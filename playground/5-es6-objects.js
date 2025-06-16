// Object property shorthand

const name = 'Jea'
const userAge = 29

const user = {
    name,
    age: userAge,
    location: 'NJ'
}

console.log(user)

//Object destructuring

const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
}

// const label = product.label
// const stock = product.stock
// or use destructure

// const {label:productLabel, stock} = product
// console.log(productLabel) //this was renamed
// console.log(stock)


const transaction = (type, { label, stock }) => {
    console.log(type, label, stock)
}

transaction('order', product)