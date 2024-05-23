import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Carousel } from "@material-tailwind/react";
import Lottie from "lottie-react";
import {motion} from 'framer-motion'
import Loading from '../../assets/lottie/loading.json'

function DetailShow() {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [picture, setPicture] = useState([]);
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + `/show/${id}`
        );

        if (response.status === 200) {
          setData(response.data.data);
          setPicture(response.data.data.picture);
          console.log(response.data.data.picture);
        } else {
          throw new Error("No data found");
        }
      } catch (error) {
        console.log(error.message);
      } finally{
        setLoading(false)
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="flex flex-col items-center justify-center">
      <Lottie animationData={Loading} loop={true} className="max-w-[400px]" />
    </div>;
  }
  
  return (
    <div className="flex flex-col items-center justify-center mx-4">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
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

      <div className="mt-10">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 , delay: 0.5}}
        >
          <p>
            Price <b>RM {data.price}</b>
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 , delay: 0.7}}
        >          
          <div>_____________________________________</div>
          <br />
          <b>Description</b>
          <p className="flex flex-wrap max-w-2xl">
            {" *" +
              data.detail1 +
              " *" +
              data.detail2 +
              " *" +
              data.detail3 +
              " *" +
              data.detail4 +
              " *" +
              data.detail5 +
              " " +
              data.desc}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default DetailShow;
