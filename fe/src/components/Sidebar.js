import React from 'react'
import { NavLink } from 'react-router-dom';
import { createSlug } from '../utils/helper';
import { useSelector } from 'react-redux';


const Sidebar = () => {
  const {category} = useSelector(state => state.app);

  return (
    <div className='flex flex-col border'>
      {category?.map(el => (<NavLink key={createSlug(el.title)} to={createSlug(el.title)} className={({isActive}) => isActive ? "bg-main text-white px-5 pt-[10px] pb-[10px] text-s hover:text-main" : "px-5 pt-[15px] pb-[14px] text-s hover:text-main"}>{el.title}</NavLink>))}
    </div>
  )
}

export default Sidebar


  // console.log(categori);
  // const [category, setCategory]  = useState([]);
  // const getCategorys = async() => {
  //   const response = await getCategory();
  //   if(response.success) setCategory(response.data);
  // }
  // useEffect(() => {
  //   getCategorys()
  // },[])