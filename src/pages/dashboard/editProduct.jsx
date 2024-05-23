import { useState, useEffect } from "react";
import { Input, Textarea, Button } from "@material-tailwind/react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
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
  const navigate = useNavigate();

  const { idAc } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(import.meta.env.VITE_API_URL + "/show/" + idAc);
      setDesc(response.data.data.desc);
      setEmail(response.data.data.email);
      setPassword(response.data.data.password);
      setDetail1(response.data.data.detail1);
      setDetail2(response.data.data.detail2);
      setDetail3(response.data.data.detail3);
      setDetail4(response.data.data.detail4);
      setDetail5(response.data.data.detail5);
      setPrice(response.data.data.price);
      setId(response.data.data.id);
    }

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleSave = async () => {
    try {
      const response = await axios.put(import.meta.env.VITE_API_URL + "/edit/" + id, {
        price,
        email,
        password,
        detail1,
        detail2,
        detail3,
        detail4,
        detail5,
        desc,
      });

      if (response.status === 200) {
        setUploadStatus2(true);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };


 

  return (
    <div className="flex justify-center w-full ">
      <div className="w-full lg:w-[60%] flex flex-col lg:flex-row justify-center gap-10">
        <div className="flex ml-6 flex-col gap-5 w-[90%] lg:w-[50%]">
          <p className="text-xl font-bold">Account Details</p>
          <Input
            disabled={uploadStatus2}
            value={price}
            type="number"
            label="Price (RM)"
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            disabled={uploadStatus2}
            value={email}
            type="email"
            label="Email"
            maxLength={20}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            disabled={uploadStatus2}
            value={password}
            type="text"
            label="Password"
            maxLength={20}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            disabled={uploadStatus2}
            value={detail1}
            type="text"
            label="highlight 1"
            maxLength={20}
            onChange={(e) => setDetail1(e.target.value)}
          />
          <Input
            disabled={uploadStatus2}
            value={detail2}
            type="text"
            label="highlight 2"
            maxLength={20}
            onChange={(e) => setDetail2(e.target.value)}
          />
          <Input
            value={detail3}
            disabled={uploadStatus2}
            type="text"
            label="highlight 3"
            maxLength={20}
            onChange={(e) => setDetail3(e.target.value)}
          />
          <Input
            value={detail4}
            disabled={uploadStatus2}
            type="text"
            label="highlight 4"
            maxLength={20}
            onChange={(e) => setDetail4(e.target.value)}
          />
          <Input
            value={detail5}
            disabled={uploadStatus2}
            type="text"
            label="highlight 5"
            maxLength={20}
            onChange={(e) => setDetail5(e.target.value)}
          />
          <Textarea
            value={desc}
            disabled={uploadStatus2}
            type="text"
            label="Description"
            onChange={(e) => setDesc(e.target.value)}
          ></Textarea>
          <Button variant="outlined" ripple onClick={handleSave}>
            Save
          </Button>
        </div>

      </div>
    </div>
  );
};

export default EditProduct;
