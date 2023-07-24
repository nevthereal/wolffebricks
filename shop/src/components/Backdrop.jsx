import React from 'react'
import { motion } from 'framer-motion'

const Backdrop = ({ children, handleClose }) => {
  return (
    <motion.div 
        className=' absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-[1]' 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
    >
        {children}
    </motion.div>
  )
}

export default Backdrop