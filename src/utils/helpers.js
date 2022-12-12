export const formatPrice = (number) => {
    return new Intl.NumberFormat('pl-PL', {
            style: 'currency',
            currency: 'PLN'
        })
        .format(number / 100)
}

export const getUniqueValues = (data, type) => {
    let unique = data.map((item) => {
        return item[type]
    })
    if (type === 'colors') {
        unique = unique.flat()
    }
    return ['all', ...new Set(unique)]
    // unique values from array
    // https://github.com/zyxzb/restaurant-menu
}

export const capitalizeFirstLetter = (str) => {
    return str[0].toUpperCase() + str.slice(1);
}