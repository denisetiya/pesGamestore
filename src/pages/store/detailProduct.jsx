import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Carousel, Button, Dialog,DialogBody,DialogFooter,DialogHeader } from "@material-tailwind/react";
import { ShoppingCart } from "@phosphor-icons/react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import Loading from "../../assets/lottie/loading.json";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

function DetailProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [picture, setPicture] = useState([]);
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
          import.meta.env.VITE_API_URL + `/show/${id}`
        );

        if (response.status === 200) {
          setData(response.data.data);
          setPicture(response.data.data.picture);
         
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
  }, [id]);

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
    return (
      <div className="flex flex-col items-center justify-center">
        <Lottie animationData={Loading} loop={true} className="max-w-[400px]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mx-4">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Carousel
          className="max-w-[576px] max-h-[360px] rounded-xl"
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute z-50 flex gap-2 bottom-4 left-2/4 -translate-x-2/4">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                    activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
        >
          {picture.map((item) => (
            <img
              key={item.id}
              onClick={() =>
                window.open(
                  `${import.meta.env.VITE_API_URL}/accountPicture/${item.picture}`,
                  "_self"
                )
              }
              src={`${import.meta.env.VITE_API_URL}/accountPicture/${item.picture}`}
              className="object-cover w-full h-full"
            />
          ))}
        </Carousel>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-10"
      >
        <div>
          <p>
            Price <b>RM {data.price}</b>
          </p>
        </div>
        <div>_____________________________________</div>
        <br />
        <b>Description</b>
        <p className="flex flex-wrap max-w-2xl">{data.desc}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="flex items-center w-full gap-3 mt-6 md:w-[80%] lg:w-[55%] 2xl:w-[35%] 3xl:w-[25%]"
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
          onClick={() => handleBuy(data.id)}
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
