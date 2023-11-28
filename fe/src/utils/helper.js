import icons from './icon'

const {FaStar, FaStarHalfAlt, FaRegStar} = icons


export const createSlug = string => string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").split(' ').join('-')

export const fortmatMoney = number => Number(number?.toFixed(1)).toLocaleString()

export const renderStarFromNumber = (number, size) => {
    if(!Number(number)) return
    const star = []
    for(let i = 0; i < +number; i++) star.push(<FaStar size={size || 16} color='red'/>)

    for(let i = 5; i > +number; i--) star.push(<FaRegStar size={size || 16} color='red'/>)

    return star
}

export function secondsToHms(d) {
    d = Number(d) / 1000
    const h = Math.floor(d/3600)
    const m = Math.floor(d % 3600 / 60)
    const s = Math.floor(d % 3600 % 60)
    return ({ h,m,s})
}