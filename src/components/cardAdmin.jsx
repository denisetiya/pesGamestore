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

import { Trash, CheckCircle } from "@phosphor-icons/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import NoData from "../assets/lottie/noData2.json";
import {motion} from 'framer-motion'
import Loading from '../assets/lottie/loading.json'

export function AdminCard() {
  const [data, setData] = useState([]);
  const [deletedProductId, setDeletedProductId] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(false);
  

  const handleOpen = () => setOpen(!open);
  const handleOpen2 = () => setOpen2(!open2);

  
  useEffect(() => {
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
        return console.log(error)
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refresh,deletedProductId]);

  const handleDetail = async (id) => {
    navigate(`/detail/${id}`);
  };

  const handleEdit = async (id) => {
    navigate(`/edit/${id}`);
  };

  const handleConfirm = () => {
    setOpen(true);
  };
  const handleDelete = async (id) => {
    
   try {
    const response = await axios.delete(import.meta.env.VITE_API_URL + "/delete/" + id);

    if (response.status === 200) {
      setDeletedProductId(id); 
      setRefresh(refresh + 1);
      setOpen2(true);
      navigate("/dashboard");
    } else {
      throw new Error("delete failed");
    }
    
   } catch (error) {
     return console.log(error)
   }
    
    setOpen2(true);

  };

  
  if (loading) {
    return <div>
      <Lottie animationData={Loading} loop={true} className="max-w-[400px]" />
    </div>;
  }
  
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      {data.length === 0 ? (
        <div className="mt-2">
          <Lottie
            animationData={NoData}
            loop={false}
            className="max-w-[400px]"
          />
          <p className="text-center">Stock is empty</p>
        </div>
      ) : (
        data.map((item,index) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            exit={{ opacity: 0, scale: 0.5 }}
            layout
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
                  item.status == 'paid' ? (
                    <p className="w-32">
                      Sold out
                    </p>
                  ) : (                    
                  <div className="flex items-center gap-3">
                    <button
                      disabled={item.status === "no payment" ? false : true}
                    >
                      <Trash onClick={() => handleConfirm()} size={32} />
                    </button>
                    <Button
                      disabled={item.status === "no payment" ? false : true}
                      onClick={() => handleEdit(item.id)}
                      size="sm"
                      variant="gradient"
                      className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100 w-20"
                      ripple
                      fullWidth={true}
                    >
                      Edit
                    </Button>
                  </div>
                  )
                }
              </CardFooter>
            </Card>
            <Dialog size="xs" open={open} handler={handleOpen}>
              <DialogHeader>Delete Confirmation</DialogHeader>
              <DialogBody>
                Are you sure you want to delete this item?
              </DialogBody>
              <DialogFooter>
                <div className="flex items-center gap-3">                  
                  <Button
                    variant="outlined"
                    color="red"
                    ripple
                    onClick={() => setOpen(false)}
                  >Cancel</Button>
                  <Button
                    variant="outlined"
                    ripple
                    onClick={() => {
                      setOpen(false);
                      handleDelete(item.id);
                    }}
                  >
                    <span>Confirm</span>
                  </Button>
                </div>
              </DialogFooter>
            </Dialog>
          </motion.div>
        ))
      )}
      <Dialog size="xs" open={open2} handler={handleOpen2}>
        <DialogHeader>Success</DialogHeader>
        <DialogBody>successfully delete an item</DialogBody>
        <DialogFooter>
          <Button variant="outlined" ripple onClick={() => setOpen2(false)}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default AdminCard;
