import Lottie from "lottie-react";
import One from "../../assets/lottie/orderProcces.json";
import { Stepper, Step, Input} from "@material-tailwind/react";
import {
  BanknotesIcon,
  CheckBadgeIcon,
  CloudArrowDownIcon
} from "@heroicons/react/24/outline";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {motion} from 'framer-motion'
import Loading from '../../assets/lottie/loading.json'

function OrderProduct() {
  const [activeStep, setActiveStep] = useState(0);

  const [username, setUsername] = useState("");
  const [password, setPasword] = useState("");
  const [loading,setLoading] = useState(false)
  const [data, setData] = useState([]);


  const { id } = useParams();  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
       
        const response = await axios.get(
          import.meta.env.VITE_API_URL + `/buy/id/` + id
        );

        if (!response) {
          throw new Error("No data found");
        } else {
          setData(response.data.data);
          if (response.data.data.status === 'paid') {
            setActiveStep(2);
          }
          setPasword(response.data.data.password);
          setUsername(response.data.data.email);
        }
      } catch (error) {
        console.log(error);
      } finally{
        setLoading(false)
      }

    };

    fetchData();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if (loading) {
    return <div className="flex flex-col items-center justify-center">
      <Lottie animationData={Loading} loop={true} className="max-w-[400px]" />
    </div>;
  }
  
  return (
    <div className="flex flex-col items-center justify-center">
      <Lottie animationData={One} className="max-w-[300px] sm:max-w-[400px] lg:max-w-[500px]" loop={false} />
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      className="w-full px-4 lg:max-w-[70%] xl:max-w-[60%]">
        <Stepper activeStep={activeStep}>
          <Step>
            <BanknotesIcon className="w-5 h-5" />
            <div className="absolute -bottom-[25px] w-max text-center">
              <p className="text-xs text-gray-900">Payment</p>
            </div>
          </Step>
          <Step>
            <CheckBadgeIcon className="w-5 h-5" />
            <div className="absolute -bottom-[25px] w-max text-center">
            <p className="text-xs text-gray-900">Confirmation</p>
            </div>
          </Step>
          <Step>
            <CloudArrowDownIcon className="w-5 h-5" />
            <div className="absolute -bottom-[35px] w-max text-center">
            {data.status === 'paid' ? (
              <p className="text-xs text-gray-900">Deliver <br /> Account</p>
            ): (
              <p className="text-xs text-gray-900">Not  <br /> Verified </p>
            )
            }
         
            </div>
          </Step>
        </Stepper>
      </motion.div>
      {activeStep === 2 ? (
      <div className="flex flex-col w-full gap-4 px-2 mt-20">
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Input disabled value={username} label="Username" className="w-full"/>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          
        >
          <Input disabled value={password} label="Password" className="w-full"/>
        </motion.div>        
      </div> 
      ) : null}
    </div>
  );
}

export default OrderProduct;
