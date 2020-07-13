const kernel = Object.create(null)

kernel.register = integrate
kernel.fire = initialize

module.exports = kernel

function integrate(key, val, over) {
    if (Reflect.has(kernel, key) && !over) {
        return
    }

    kernel[key] = val

    return kernel
}

function initialize(key, ...args) {
    if (Reflect.has(kernel, key)) {
        const fn = kernel[key]

        if (typeof fn === 'function') {
            fn(...args)
        }
    }
}