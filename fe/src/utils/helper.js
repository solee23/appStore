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