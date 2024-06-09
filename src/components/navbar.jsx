import React from "react";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Input,
  Collapse,
} from "@material-tailwind/react";
import { ChevronDownIcon, Bars2Icon } from "@heroicons/react/24/solid";
import { useGoogleLogin } from '@react-oauth/google';
import {
  ShoppingCart,
  Tag,
  User,
  UserFocus,
  Info,
  Headset,
  SignIn,
  MoneyWavy,
  SignOut,
} from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";

function ProfileMenu() {
  const closeMenu = () => setIsMenuOpen(false);
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageError, setMessageError] = useState("hidden");
  const [messageResponse, setMessageResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [tipeMessage, setTipeMessage] = useState("");

  const handleOpen = () => {
    setOpen((cur) => !cur);
  };

  // login session
  const handleLogin = async () => {
    setLoading(true);

    if (!email || email === "") {
      setMessageResponse("");
      setEmailError(true);
      setTipeMessage("Email");
      setMessageError("block");
      setLoading(false);
      return;
    } else if (!password || password === "") {
      setMessageResponse("");
      setPasswordError(true);
      setTipeMessage("Password");
      setMessageError("block");
      setLoading(false);
      return;
    } else {
      setMessageResponse("");
      setMessageError("hidden");
      setEmailError(false);
      setPasswordError(false);
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        setEmail("");
        setPassword("");
        setLoading(false);
        navigate("/");
        setOpen((cur) => !cur);
      } else {
        setLoading(false);
        throw new Error(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      return setMessageResponse(error.response.data.message);
    }
  };


// login google
const googleLogin = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    try {
      const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      }).then(res => res.json());

      const sendDB = await axios.post(
        import.meta.env.VITE_API_URL + "/loginGoogle",
        {
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture,
        }
      ) 

      if (sendDB.status === 200) {
        Cookie.set("username", userInfo.name);
        Cookie.set("email", userInfo.email);
        Cookie.set("picture", userInfo.picture);
        navigate("/");
        setOpen(false);
      } else {
        throw new Error(sendDB.data.message);
      }

     
    } catch (error) {
      setMessageResponse("Google login failed");
    }
  },
  onError: () => {
    setMessageResponse("Google login failed");
  },
});

  // logout session
  const handleLogout = () => {
    setRefresh(refresh + 1);
    Cookie.remove("username");
    Cookie.remove("email");
    Cookie.remove("picture");
    navigate("/");
  };

  useEffect(() => {}, [refresh]);

  return (
    <>
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
          >
            <Avatar
              variant="circular"
              size="sm"
              className="border border-gray-900 p-0.5"
              src={
                Cookie.get("picture")
                  ? decodeURIComponent(Cookie.get("picture"))
                  : "https://www.shutterstock.com/shutterstock/photos/1760295569/display_1500/stock-vector-profile-picture-avatar-icon-vector-1760295569.jpg"
              }
            />
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>

        <MenuList className="p-1">
          {Cookie.get("username") ? (
            <MenuItem onClick={closeMenu}>
              <Typography
                as="span"
                variant="small"
                className="flex items-center gap-1 font-normal"
              >
                <User size={22} />
                <p>{Cookie.get("username")}</p>
                <hr />
              </Typography>
            </MenuItem>
          ) : null}
          
          {Cookie.get("email") == import.meta.env.VITE_EMAIL_ADMIN ? (
            <Link
              to='/dashboard'
            >
              <MenuItem onClick={closeMenu}>
                <Typography
                  as="span"
                  variant="small"
                  className="flex items-center gap-1 font-normal"
                >
                  <UserFocus size={22} />
                  <p>
                    Dashboard
                  </p>
                  <hr />
                </Typography>
              </MenuItem>
            </Link>
          ) : null}
          {
            Cookie.get('email') == import.meta.env.VITE_EMAIL_ADMIN ? 
            (
              <Link
              to={
                Cookie.get("email") == import.meta.env.VITE_EMAIL_ADMIN
                  ? "/order-list"
                  : "/order"
              }
            >
              <MenuItem onClick={closeMenu}>
                <Typography
                  as="span"
                  variant="small"
                  className="flex items-center gap-1 font-normal"
                >
                  <Info size={22} />
                  <p>Order</p>
                  <hr />
                </Typography>
              </MenuItem>
            </Link>
            ) : null
          }
        
          
          <Link to={'https://t.me/bosspesalt'}>
            <MenuItem onClick={closeMenu}>
              <Typography
                as="span"
                variant="small"
                className="flex items-center gap-1 font-normal"
              >
                <Headset size={22} />
                <p>Customer Support</p>
                <hr />
              </Typography>
            </MenuItem>
          </Link>
          
          {Cookie.get("username") ? (
            <MenuItem onClick={closeMenu}>
              <Typography
                as="span"
                variant="small"
                className="flex items-center gap-1 font-bold"
                color="red"
                onClick={handleLogout}
              >
                <SignOut size={22} />
                <p>Sign Out</p>
                <hr />
              </Typography>
            </MenuItem>
          ) : (
            <MenuItem onClick={closeMenu}>
              <Typography
                as="span"
                variant="small"
                className="flex items-center gap-1 font-bold"
                color="red"
                onClick={handleOpen}
              >
                <SignIn size={22} />
                <p>Sign In</p>
                <hr />
              </Typography>
            </MenuItem>
          )}
          );
        </MenuList>
      </Menu>

      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Pes Store
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter your email and password to Sign In.
              <p className={`text-red-500 ${messageError}`}>
                Please enter your {tipeMessage}
              </p>
              <p className="text-red-500">{messageResponse}</p>
            </Typography>

            <Input
              type="email"
              label="Email"
              size="lg"
              error={emailError}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password"
              label="Password"
              error={passwordError}
              size="lg"
              onChange={(e) => setPassword(e.target.value)}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              loading={loading}
              variant="gradient"
              ripple
              onClick={handleLogin}
              fullWidth
            >
              Login
            </Button>

            <Button
              loading={loading}
              variant="outlined"
              className="mt-2"
              ripple
              onClick={googleLogin}
              fullWidth
            >
              Google Login
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}

function NavList() {
  const navigate = useNavigate();

  const handleBuy = () => {
    navigate("/Buy");
  };

  const handleSell = () => {
    navigate("/Sell");
  };

  const handleCart = () => {
    navigate("/Cart");
  };

  return (
    <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <Typography
        as="a"
        onClick={handleBuy}
        variant="small"
        color="gray"
        className="font-medium text-blue-gray-500"
      >
        <MenuItem className="flex items-center gap-2 lg:rounded-full">
          <span className="flex items-center gap-1 text-gray-900">
            <Tag size={22} />
            <p>Buy Account</p>
          </span>
        </MenuItem>
      </Typography>

      <Typography
        as="a"
        onClick={handleSell}
        variant="small"
        color="gray"
        className="font-medium text-blue-gray-500"
      >
        <MenuItem className="flex items-center gap-2 lg:rounded-full">
          <MoneyWavy size={22} />
          <span className="text-gray-900">Sell Acount</span>
        </MenuItem>
      </Typography>

      <Typography
        as="a"
        onClick={handleCart}
        variant="small"
        color="gray"
        className="font-medium text-blue-gray-500"
      >
        <MenuItem className="flex items-center gap-2 lg:rounded-full">
          <span className="flex items-center gap-1 text-gray-900">
            <ShoppingCart size={22} />
            <p>Cart</p>
          </span>
        </MenuItem>
      </Typography>
    </ul>
  );
}

export function ComplexNavbar() {
  const navigate = useNavigate();

  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  const handleHome = () => {
    navigate("/");
  };

  return (
    <Navbar className="max-w-screen-xl p-2 mx-auto shadow-lg lg:rounded-full lg:pl-6">
      <div className="relative flex items-center justify-between mx-auto text-blue-gray-900 ">
        <div className="flex justify-between w-[65%]">
          <Typography
            as="a"
            onClick={handleHome}
            className="mr-4 ml-2 cursor-pointer py-1.5 font-extrabold"
          >
            PES GameStore
          </Typography>

          <div className="hidden lg:block">
            <NavList />
          </div>
        </div>

        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="w-6 h-6" />
        </IconButton>

        <ProfileMenu />
      </div>

      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
      </Collapse>
    </Navbar>
  );
}

export default ComplexNavbar;
