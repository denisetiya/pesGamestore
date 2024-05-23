import PricingCard from '../../components/card'
import {motion} from 'framer-motion'
const Buypage = () => {

  return (
    <div className='flex flex-col items-center justify-center gap-12'>
      <motion.p
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8}}
      className='text-2xl font-bold '>Account List</motion.p>
      <PricingCard  />
    </div>
  )
}

export default Buypage