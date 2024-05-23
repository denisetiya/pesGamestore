import { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import Lottie from "lottie-react";
import NoData from "../../assets/lottie/nodata3.json";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Loading from '../../assets/lottie/loading.json'
import {motion} from 'framer-motion'

function OrderPage() {
  const [order, setOrder] = useState([]);
  const uem = Cookie.get("email");
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + "/buy/" + uem
        );
        if (response.status === 200) {
          setOrder(response.data.data);
          console.log(order);
        } else {
          throw new Error("No data found");
        }
      } catch (error) {
        console.log(error);
      } finally{
        setLoading(false)
      }
    };
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const convertTime = (time) => {
    const utcDate = new Date(time);

    const wibOffset = 7 * 60 * 60 * 1000;
    const wibDate = new Date(utcDate.getTime() + wibOffset);

    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Jakarta",
    };
    const formattedDate = wibDate.toLocaleString("id-ID", options);

    return formattedDate;
  };



  if (loading) {
    return <div className="flex flex-col items-center justify-center">
      <Lottie animationData={Loading} loop={true} className="max-w-[400px]" />
    </div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {order && order.length > 0 ? (
        <div className="flex flex-col gap-4">
          {order.map((item,index) => (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              onClick={() => navigate(`/order/${item.aid}`)}
              className="px-6 py-4 border-2 border-gray-300 shadow-xl w- rounded-2xl"
              key={item.aid}
            >
              <p className="font-semibold">{item.aid}</p>
              ________________________________
              <hr />
              <p className="mb-3 text-xs">
                time : <b>{convertTime(item.date)}</b>
              </p>
              <div className="flex gap-4">
                <Button
                  ripple
                  variant="outlined"
                  color="green"
                  size="sm"
                  onClick={() =>
                    window.open(
                      `${import.meta.env.VITE_API_URL}/payment/${item.bukti}`,
                      "_self"
                    )
                  }
                >
                  Display evidence
                </Button>

                <Button
                  ripple
                  size="sm"
                  variant="outlined"
                  onClick={() => navigate(`/order/${item.id}`)}
                >
                  Detail
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <Lottie animationData={NoData} loop={false} />
          <p>No Order found</p>
        </div>
      )}
    </div>
  );
}

export default OrderPage;
