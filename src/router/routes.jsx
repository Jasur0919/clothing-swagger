import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { BiCategory } from "react-icons/bi";
import { IoCartOutline } from "react-icons/io5";
const routes = [
  {
    path: "/",
    content: "Category",
    icon: <BiCategory className="text-[25px]" />,
  },
  {
    path: "/products",
    content: "Products",
    icon: <IoCartOutline className="text-[25px]"/>,
  },
  {
    path: "/workers",
    content: "Workers",
    icon: <PeopleAltIcon />,
  },
];

export default routes;
