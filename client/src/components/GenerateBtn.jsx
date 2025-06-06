import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import {  motion } from "framer-motion"
import { assets } from '../assets/assets/assets'
import {AppContext} from '../context/AppContext'

const GenerateBtn = () => {

  const {user, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()

  const onClickHandler = () => {
      if(user) {
          navigate('/result')
      } else {
          setShowLogin(true)
      }
  }

  return (
    <motion.div 
    initial={{ opacity: 0.2, y: 100 }}
    transition={{ duration: 1 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}

    className=' text-center pb-16'>
        
        <h1 className='text-2xl md:text-3xl lg:text-4xl font-semibold mt-4 text-neutral-800 py-6 md:py-16'>
            See the magic. Try now
        </h1>
        <button onClick={onClickHandler} className='inline-flex items-center sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 gap-2 rounded-full m-auto hover:scale-105 transition-all duration-500'>
            Generate Images.
            <img className='h-6'     src={assets.star_group} alt="" />
        </button>
    </motion.div>
  )
}

export default GenerateBtn