import pesLogo from "../../assets/icons/peslogo.png";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import {motion} from "framer-motion"

const Home = () => {
  const navigate = useNavigate();
  const handleBuy = () => {
    navigate("/Buy");
  };

  const handleSell = () => {
    navigate("/Sell");
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center lg:flex-row ">
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          
        >
          <img src={pesLogo} alt="" width={700} />
        </motion.div>
        <div className="flex flex-col gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          className="flex text-2xl font-extrabold">
            Best Place to Buy <br /> E-Football Account
          </motion.p>
          <span className="flex gap-4 ">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >           
              <Button variant="outlined" onClick={handleBuy}>
                Buy Account
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
            >              
              <Button onClick={handleSell}> Sell Account</Button>
            </motion.div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
