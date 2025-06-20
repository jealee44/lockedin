const greeter = (name = 'user', age) => {
    console.log('Hello ' + name)
}

greeter('Jea')

greeter()

//use default values to print something like user instead of undefined 