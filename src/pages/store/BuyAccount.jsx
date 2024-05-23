import { useState, useEffect } from "react";
import {
  Input,
  Textarea,
  Button,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Cookie from "js-cookie";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import Loading from "../../assets/lottie/loading.json";

const BuyAccount = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(0);
  const [accountImg, setAccountImg] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");

  const [open, setOpen] = useState(1);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + "/show/" + id
        );

        if (response.status === 200) {
          setPrice(response.data.data.price);
          setDesc(response.data.data.desc);
          setEmail(response.data.data.email);
          setPasword(response.data.data.password);
          setAccountImg(response.data.data.picture[0].picture);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("img", selectedImage);
    const uem = Cookie.get("email");
    formData.append("uem", uem);
    formData.append("email", email);
    formData.append("password", password);

    axios
      .post(import.meta.env.VITE_API_URL + "/buy/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/order");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Lottie animationData={Loading} loop={true} className="max-w-[400px]" />
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full ">
      <div className="w-full lg:w-[60%] flex flex-col lg:flex-row justify-center gap-10">
        <div className="flex ml-6 flex-col gap-5 w-[90%] lg:w-[50%]">
          <motion.p
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold"
          >
            Account Details
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p>Price</p>
            <Input
              disabled
              type="text"
              label="Price (RM)"
              value={"RM " + String(price)}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p>Description</p>
            <Textarea
              disabled
              type="text"
              label="Description"
              value={desc}
            ></Textarea>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="max-w-[576px] max-h-[360px] object-cover"
          >
            <img
              src={`${import.meta.env.VITE_API_URL}/accountPicture/${accountImg}`}
              
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="ml-6 flex flex-col gap-5 w-[90%] lg:w-[50%]"
        >
          <div className="mx-3">
            <Accordion open={open === 1}>
              <AccordionHeader onClick={() => handleOpen(1)}>
                Dana Payment
              </AccordionHeader>
              <AccordionBody>090192931039103</AccordionBody>
            </Accordion>
            <Accordion open={open === 2}>
              <AccordionHeader onClick={() => handleOpen(2)}>
                Bank Transfer
              </AccordionHeader>
              <AccordionBody>10233333333333333331</AccordionBody>
            </Accordion>
            <Accordion open={open === 3}>
              <AccordionHeader onClick={() => handleOpen(3)}>
                QR Code
              </AccordionHeader>
              <AccordionBody>10922229291993</AccordionBody>
            </Accordion>
          </div>

          <p className="text-xl font-bold">Proof of payment</p>
          <div className="p-8 bg-gray-100 rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Upload Image</h2>
            {selectedImage ? (
              <div className="mb-4">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  className="rounded-lg  max-w-[50%] max-h-[50%]"
                />
              </div>
            ) : null}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="px-4 py-2 mb-4 border border-gray-400 rounded-lg max-w-[100%]"
            />
            {selectedImage && (
              <Button
                variant="outlined"
                onClick={handleUpload}
                className="w-full "
              >
                Unggah
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BuyAccount;
