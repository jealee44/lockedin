// const square = function (x) {
//     return x * x
// }

// const square = (x) => {
//     return x * x
// }

// const square = (x) => x * x

// console.log(square(3))

const event = {
    name: 'party',
    guestList: ['Jea', 'Andrea', 'Tim'],
    printGuestList() { // arrow here captures the this of surrounding scope which is global not event so cant use this here
        console.log('Guest list for ' + this.name)

        this.guestList.forEach((guest) => { //arrow functions bind their OWN this but bind surrounding so this from event is good here
            console.log(guest + ' is attending ' + this.name)
        })
    }
}

event.printGuestList()