import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Carousel,
  Textarea,

} from "@material-tailwind/react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import Loading from "../../assets/lottie/loading.json";

// import { useNavigate } from "react-router-dom";

function DetailShow() {
  const { id } = useParams();
  // const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);



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
          className="max-w-[576px] max-h-[800px] rounded-xl"
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute z-50 flex gap-2 bottom-4 left-2/4 -translate-x-2/4">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all ${
                    activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
        >
          {data.picture && data.picture.includes("iframe") ? (
            <div className="w-full h-80" dangerouslySetInnerHTML={{ __html: data.picture }} />
          ) : (
            <iframe
              onClick={() => window.open(data.picture, "_self")}
              src={data.picture}
              className="object-cover w-full h-96"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150"; // Fallback image
              }}
            />
          )}
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
        <Textarea
            className="h-80 bg-none"
            disabled={true}
            type="text"
            label="Description"
            value={data.desc}
          ></Textarea>
      </motion.div>

 
    </div>
  );
}

export default DetailShow;
