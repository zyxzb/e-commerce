export const formatPrice = (number) => {
    return new Intl.NumberFormat('pl-PL', {
        style: 'currency',
        currency: 'PLN'
    })
        .format(number / 100)
}

export const getUniqueValues = () => {}