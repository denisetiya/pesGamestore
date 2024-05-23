import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import Loading from "../../assets/lottie/loading.json";

function OrderList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + "/buy");
        if (response.status === 200) {
          setData(response.data.data);
        } else {
          throw new Error("No data found");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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

  const confirmPayment = async (id, base) => {
    try {
      const response = await axios.put(
        import.meta.env.VITE_API_URL + "/buy/" + id
      );
      if (response.status === 200) {
        navigate("/order/" + base);
      } else {
        throw new Error("No data found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelPayment = async (id, base) => {
    try {
      const response = await axios.delete(
        import.meta.env.VITE_API_URL + "/buy/" + id
      );
      if (response.status === 200) {
        navigate("/order/" + base);
      } else {
        throw new Error("No data found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Lottie animationData={Loading} loop={true} className="max-w-[400px]" />
      </div>
    );
  }

  return (
    <div>
      <motion.p
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8 text-xl font-bold text-center"
      >
        Order List
      </motion.p>

      {data && data.length > 0 ? (
        <div className="flex flex-col items-center justify-center gap-5">
          {data.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="w-[80%] shadow-xl px-6 py-4 border-2 border-gray-300 rounded-2xl"
              key={item.aid}
            >
              <p className="font-semibold">{item.aid}</p>
              ________________________________
              <hr />
              <p className="text-xs">Orderby : {item.uem}</p>
              ________________________________
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
                  disabled={item.status === "payment pending" ? false : true}
                  ripple
                  variant="outlined"
                  size="sm"
                  onClick={() => confirmPayment(item.aid, item.id)}
                >
                  Confirm Payment
                </Button>
              </div>
              <div className="mt-4">
                <Input readOnly value={item.status} label="Status" />
              </div>
              <div className="flex items-center justify-center gap-4 mt-3 ">
                <Button
                  ripple
                  variant="outlined"
                  size="sm"
                  onClick={() => navigate(`/detailShow/${(item.aid, item.id)}`)}
                >
                  Detail
                </Button>
                <Button
                  disabled={item.status === "payment pending" ? false : true}
                  className="w-[100%]"
                  ripple
                  variant="gradient"
                  size="sm"
                  onClick={() => cancelPayment(item.aid)}
                >
                  {" "}
                  Cancel Payment
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p>No order found</p>
      )}
    </div>
  );
}

export default OrderList;
