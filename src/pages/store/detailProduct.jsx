import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Carousel,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { ShoppingCart } from "@phosphor-icons/react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import Loading from "../../assets/lottie/loading.json";
import Cookie from "js-cookie";
// import { useNavigate } from "react-router-dom";

function DetailProduct() {
  const { id } = useParams();
  // const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(!open);
  const handleOpen2 = () => setOpen2(!open2);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/show/${id}`
        );

        if (response.status === 200) {
          setData(response.data.data);
        } else {
          throw new Error("No data found");
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleBuy = async (link) => {
    window.open(link, "_blank");
    // if (!Cookie.get("username") && !Cookie.get("email")) {
    //   setOpen(true);
    // } else {
    //   navigate(`/Buy/${id}`);
    // }
  };

  const handleCart = async (id) => {
    if (!Cookie.get("username") && !Cookie.get("email")) {
      setOpen(true);
    } else {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/cart`,
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
      } catch (error) {
        console.log(error.message);
      }
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
    <div className="flex flex-col items-center justify-center mx-3">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
  
          {data.picture && data.picture.includes("iframe") ? (
            <div
              className="w-full h-80"
              dangerouslySetInnerHTML={{ __html: data.picture }}
            />
          ) : (
            <iframe
              onClick={() => window.open(data.picture, "_self")}
              src={data.picture}
              className="object-cover w-full h-96"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150"; 
              }}
            />
          )}
       
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex flex-col justify-center mt-10"
      >
        <div>
          <p>
            Price <b>RM {data.price}</b>
          </p>
        </div>
        <div>_____________________________________</div>
        <br />
        <b>Description</b>
        <textarea
          name=""
          id=""
          cols="30"
          rows="15"
          disabled={true}
          type="text"
          label="Description"
          value={data.desc}
        ></textarea>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="flex items-center w-[80%] gap-3 mt-6 md:w-[80%] lg:w-[55%] 2xl:w-[35%] 3xl:w-[25%]"
      >
        <button onClick={() => handleCart(data.id)}>
          <ShoppingCart size={60} />
        </button>
        <Button
          size="sm"
          variant="gradient"
          className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100 w-full"
          ripple
          fullWidth={true}
          onClick={() => handleBuy(data.picture)}
        >
          Buy Now
        </Button>
      </motion.div>

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

export default DetailProduct;
