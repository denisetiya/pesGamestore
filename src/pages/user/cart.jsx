import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";
import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import NoData from "../../assets/lottie/noData4.json"
import {motion} from 'framer-motion'
import Loading from '../../assets/lottie/loading.json'

function Cart() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const uem = Cookie.get("email");
  const [loading,setLoading] = useState(false)
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (!uem) {
      setOpen(true);
    } else {
      const fetchData = async () => {
        setLoading(true)
        try {
          const response = await axios.get(
            import.meta.env.VITE_API_URL + "/cart",
            {
              data: {
                uem: uem,
              },
            }
          );

          if (response.status === 200) {
            setData(response.data.data);
            
          } else {
            throw new Error("No data found");
          }
        } catch (error) {
          console.log(error.message);
        } finally {
          setLoading(false)
        }
      };
      fetchData();
    }
  }, [uem,refresh]);


  const deleteCart = async (id) => {
    try {
      const response = await axios.delete(
        import.meta.env.VITE_API_URL + `/cart/${id}`
      );
      if (response.status === 200) {
        setRefresh(refresh + 1);
      } else {
        throw new Error("No data found");
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  if (loading) {
    return <div className="flex flex-col items-center justify-center">
      <Lottie animationData={Loading} loop={true} className="max-w-[400px]" />
    </div>;
  }
  
  return (
    <div>
      {data && data.length > 0 ? (
        <div className="flex flex-col items-center justify-center md:flex-row"> {data.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            exit={{ opacity: 0, scale: 0.5 }}
            layout
          key={item.aid} className="flex flex-col items-center justify-center max-w-md px-10 py-5 border rounded-lg shadow-lg">
            <div>
              <p>Account {index}</p>
            </div>
 
            <p>Email : {item.uem}</p>
            <div className="flex gap-3 mt-4">
        {console.log(data)}  
             <Button
              className="w-full my-3"
              onClick={() => navigate(`/detail/${item.aid}`)}
            >Detail</Button>            
              {/* <Button
                variant="outlined"
                ripple
                onClick={() => window.open(item.picture, "_blank")}
              >Buy</Button> */}
              <Button
                variant="outlined"
                color="red"
                ripple
                className="w-full my-3"
                onClick={() => deleteCart(item.id)}
              >Delete</Button>
            </div>
          </motion.div>
        ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <Lottie animationData={NoData} loop={false} className="max-w-[500px]"/>
          <p className="text-center">Cart is empty</p>
        </div>
      )}
      <Dialog size="xs" open={open} handler={() => setOpen(!open)}>
        <DialogHeader>Login Required</DialogHeader>
        <DialogBody>
          You have not been logged in, hopefully login first
        </DialogBody>
        <DialogFooter>
          <Button
            variant="outlined"
            ripple
            onClick={() => {
              setOpen(false);
              navigate("/");
            }}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default Cart;
