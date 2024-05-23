import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
  Typography,
} from "@material-tailwind/react";
import {
  PlusIcon,
  ArrowTrendingUpIcon,
  Square3Stack3DIcon,
  PlusCircleIcon
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";


export default function MiniMenu() {
  return (
    <div className="relative w-full h-24">
      <div className="absolute bottom-0 right-0 md:right-[20%] lg:right-[30%] xl:right-[40%]">
        <SpeedDial placement="left">
          <SpeedDialHandler>
            <IconButton size="lg" className="rounded-full">
              <PlusIcon className="w-5 h-5 transition-transform group-hover:rotate-45" />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent className="flex-row">
            <SpeedDialAction className="w-16 h-16">
              <Link to={"/Add"}>             
                <PlusCircleIcon className="w-5 h-5" />
                <Typography color="blue-gray" className="text-xs font-normal">
                  Add 
                </Typography>
              </Link>
            </SpeedDialAction>
            <SpeedDialAction className="w-16 h-16">
              <ArrowTrendingUpIcon className="w-5 h-5" />
              <Typography color="blue-gray" className="text-xs font-normal">
                Selling
              </Typography>
            </SpeedDialAction>
            <SpeedDialAction className="w-16 h-16">
              <Square3Stack3DIcon className="w-5 h-5" />
              <Typography color="blue-gray" className="text-xs font-normal">
                Order
              </Typography>
            </SpeedDialAction>
          </SpeedDialContent>
        </SpeedDial>
      </div>
    </div>
  );
}