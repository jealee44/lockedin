const {calculateTip,fahrenheitToCelcius,
    celciusToFahrenheight} = require('../src/math')

test('Should calculate total with tip', () => {
    const total = calculateTip(10, .3)

    expect(total).toBe(13)
    // if (total !== 13) throw new Error('Total tip should be 13')
})

test('should calculate total with default tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})

test('Should convert 32F to 0C', () => {
    const celcius = fahrenheitToCelcius(32)
    expect(celcius).toBe(0)
})

test('Should convert 0C to 32 F', () => {
    const fahrentheight = celciusToFahrenheight(0)
    expect(fahrentheight).toBe(32)
})

test('Async test demo', (done) => {
    setTimeout(() => {
        expect(1).toBe(2)
        done()
    }, 2000)
})