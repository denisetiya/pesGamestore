import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import { ShoppingCart, CheckCircle } from "@phosphor-icons/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import Lottie from "lottie-react";
import NoData from "../assets/lottie/noData2.json";
import Loading from '../assets/lottie/loading.json'
import {motion} from 'framer-motion'

export function PricingCard() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(!open);
  const handleOpen2 = () => setOpen2(!open2);

  const fetchData = async () => {
    setLoading(true);
    try {
      
      const response = await axios.get(import.meta.env.VITE_API_URL + "/show");
      if (response.status === 200) {
        setData(response.data.data);
        // console.log(response.data.data);
      } else {
        throw new Error("No data found");
      }
    } catch (error) {
      // return console.log(error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDetail = async (id) => {
    navigate(`/detail/${id}`);
  };

  const handleBuy = async (id) => {
    if (!Cookie.get("username") && !Cookie.get("email")) {
      setOpen(true);
    } else {
      navigate(`/Buy/${id}`);
    }
  };

  const handleCart = async (id) => {
    if (!Cookie.get("username") && !Cookie.get("email")) {
      setOpen(true);
    } else {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/cart",
        {
          uem: Cookie.get("email"),
          aid: id,
        }
      );
      if (response.status === 200) {
        setOpen2(true);
      } else {
        console.log(response.data.message);
      }
    }
  };

  if (loading) {
      return <div>
        <Lottie animationData={Loading} loop={true} className="max-w-[400px]" />
      </div>;
    }
    else{
      return (
        <div className="flex flex-wrap items-center justify-center gap-6">
          {data.length === 0 ? (
            <div className="mt-2">
              <Lottie animationData={NoData} loop={false} className="max-w-[400px]" />
              <p className="text-center">
                Stock is empty
              </p>
            </div>
          ) : (
            data.map((item, index) => (
              <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 , delay: index* 0.2}}
              key={item.id}>
                
              <Card
                
                color="transparent"
                variant="gradient"
                className=" max-w-[16rem] p-4 pt-8 pb-8 shadow-2xl border border-gray-400"
              >
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="gray"
                  className="absolute flex items-center px-8 py-4 m-0 text-center border-b rounded-xl border-white/10 -top-3 -left-2 justify-normal"
                >
                  <Typography
                    variant="h1"
                    color="white"
                    className="flex justify-center gap-1 mt-6 text-5xl font-normal"
                  >
                    <span className="mt-2 text-lg">RM</span>
                    {item.price}
                  </Typography>
                </CardHeader>
    
                <CardBody className="p-0 mt-[70px]">
                  {item.detail1 === "" ? null : (
                    <ul className="flex flex-col gap-4">
                      <li className="flex items-center gap-2">
                        <span>
                          <CheckCircle size={16} />
                        </span>
                        <Typography className="text-xs font-normal">
                          {item.detail1}
                        </Typography>
                      </li>
                    </ul>
                  )}
    
                  {item.detail2 === "" ? null : (
                    <ul className="flex flex-col gap-4">
                      <li className="flex items-center gap-2">
                        <span>
                          <CheckCircle size={16} />
                        </span>
                        <Typography className="text-xs font-normal">
                          {item.detail2}
                        </Typography>
                      </li>
                    </ul>
                  )}
    
                  {item.detail3 === "" ? null : (
                    <ul className="flex flex-col gap-4">
                      <li className="flex items-center gap-2">
                        <span>
                          <CheckCircle size={16} />
                        </span>
                        <Typography className="text-xs font-normal">
                          {item.detail3}
                        </Typography>
                      </li>
                    </ul>
                  )}
    
                  {item.detail4 === "" ? null : (
                    <ul className="flex flex-col gap-4">
                      <li className="flex items-center gap-2">
                        <span>
                          <CheckCircle size={16} />
                        </span>
                        <Typography className="text-xs font-normal">
                          {item.detail4}
                        </Typography>
                      </li>
                    </ul>
                  )}
    
                  {item.detail5 === "" ? null : (
                    <ul className="flex flex-col gap-4">
                      <li className="flex items-center gap-2">
                        <span>
                          <CheckCircle size={16} />
                        </span>
                        <Typography className="text-xs font-normal">
                          {item.detail5}
                        </Typography>
                      </li>
                    </ul>
                  )}
    
                  <Button
                    variant="outlined"
                    onClick={() => handleDetail(item.id)}
                    size="sm"
                    ripple
                    className="mt-4"
                  >
                    Detail
                  </Button>
                </CardBody>
    
                <CardFooter className="p-0 mt-6">
                  {
                    item.available == true ? (
                      <div className="flex items-center gap-3">
                      <button disabled={item.status === "no payment" ? false : true}>                  
                        <ShoppingCart
                          onClick={() => handleCart(item.id)}
                          size={32}
                        />
                      </button>
                      <Button
                        disabled={item.status === "no payment" ? false : true}
                        onClick={() => handleBuy(item.id)}
                        size="sm"
                        variant="gradient"
                        className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                        ripple
                        fullWidth={true}
                      >
                        Buy Now
                      </Button>
                    </div>
                    ) :(
                      <div className="min-w-32">
                        <p>Sold out</p>
                      </div>
                    )
                  }
                 
                </CardFooter>
              </Card>
              </motion.div>
            ))
          )}
    
          <Dialog size="xs" open={open} handler={handleOpen}>
            <DialogHeader>Login Required</DialogHeader>
            <DialogBody>
              You have not been logged in, hopefully login first
            </DialogBody>
            <DialogFooter>
              <Button variant="outlined" ripple onClick={() => setOpen(false)}>
                <span>Confirm</span>
              </Button>
            </DialogFooter>
          </Dialog>
    
          <Dialog size="xs" open={open2} handler={handleOpen2}>
            <DialogHeader>Success</DialogHeader>
            <DialogBody>successfully Added To The Cart</DialogBody>
            <DialogFooter>
              <Button variant="outlined" ripple onClick={() => setOpen2(false)}>
                <span>Confirm</span>
              </Button>
            </DialogFooter>
          </Dialog>
        </div>
      );
    }
}

export default PricingCard;
