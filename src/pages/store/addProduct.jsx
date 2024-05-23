import { useState } from "react";
import { Input, Textarea, Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";



const AddProduct = () => {

  const [uploadStatus, setUploadStatus] = useState(true);
  const [uploadStatus2, setUploadStatus2] = useState(false);
  const [price, setPrice] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [detail1, setDetail1] = useState("");
  const [detail2, setDetail2] = useState("");
  const [detail3, setDetail3] = useState("");
  const [detail4, setDetail4] = useState("");
  const [detail5, setDetail5] = useState("");
  const [desc, setDesc] = useState("");
  const [id, setId] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showTips, setShowTips] = useState('hidden');
  const navigate = useNavigate();
  

  const handleSave = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + "/add", {
        price,
        detail1,
        detail2,
        detail3,
        detail4,
        detail5,
        email,
        password,
        desc,
      });

      if (response.status === 200) {
        setId(response.data.data.id);
        setUploadStatus(false);
        setUploadStatus2(true);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("picture", selectedImage);

    axios
      .post(import.meta.env.VITE_API_URL + "/add/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setSelectedImage(null);
          setShowTips('block');
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleConfirm = () => {
     navigate("/");
  }

  return (
    <div className="flex justify-center w-full ">
      <div className="w-full lg:w-[60%] flex flex-col lg:flex-row justify-center gap-10">
        <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex ml-6 flex-col gap-5 w-[90%] lg:w-[50%]">
          <p className="text-xl font-bold">Account Details</p>
          <Input
            disabled={uploadStatus2}
            type="number"
            label="Price (RM)"
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            disabled={uploadStatus2}
            type="text"
            label="Email Account"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            disabled={uploadStatus2}
            type="text"
            label="Password Account"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            disabled={uploadStatus2}
            type="text"
            label="highlight 1"
            maxLength={20}
            onChange={(e) => setDetail1(e.target.value)}
          />
          <Input
            disabled={uploadStatus2}
            type="text"
            label="highlight 2"
            maxLength={20}
            onChange={(e) => setDetail2(e.target.value)}
          />
          <Input
            disabled={uploadStatus2}
            type="text"
            label="highlight 3"
            maxLength={20}
            onChange={(e) => setDetail3(e.target.value)}
          />
          <Input
            disabled={uploadStatus2}
            type="text"
            label="highlight 4"
            maxLength={20}
            onChange={(e) => setDetail4(e.target.value)}
          />
          <Input
            disabled={uploadStatus2}
            type="text"
            label="highlight 5"
            maxLength={20}
            onChange={(e) => setDetail5(e.target.value)}
          />
          <Textarea
            disabled={uploadStatus2}
            type="text"
            label="Description"
            onChange={(e) => setDesc(e.target.value)}
          ></Textarea>
          <Button variant="outlined" ripple onClick={handleSave}>
            Save
          </Button>
        </motion.div>

        <div className="ml-6 flex flex-col gap-5 w-[90%] lg:w-[50%]">
          <p className="text-xl font-bold">Images in Showcase</p>
          <div className="p-8 bg-gray-100 rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Upload Gambar</h2>
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
              disabled={uploadStatus}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="px-4 py-2 mb-4 border border-gray-400 rounded-lg max-w-[100%]"
            />
            
            <div className={showTips}>              
              <Typography
                variant="small"
                color="gray"
                className="flex items-center gap-1 mt-2 font-normal " 
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 -mt-px"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                Succes Upload,You can Add more Image
              </Typography>
              <br />
              <Button onClick={handleConfirm} variant="outlined" className="w-full mt-2" > Back to Dashboard </Button>
            </div>
              {selectedImage && (
                <button
                  onClick={handleUpload}
                  className="px-4 py-2 ml-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  Unggah
                </button>
              )}
              
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
