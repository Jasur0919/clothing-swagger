import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { ListItemText } from "@mui/material";
import { LogOut } from "@modal";
import routes from "../../../router/routes";
import { Profile } from "@modal";
import Logo from "../../../assets/Logo.svg";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [menu, setMenu] = React.useState("Category");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen(false);
  };

  const saveProfile = (profile) => {};

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  React.useEffect(() => {
    if (pathname.includes("Category")) {
      setMenu("Category");
    } else if (pathname.includes("Products")) {
      setMenu("Products");
    } else if (pathname.includes("Workers")) {
      setMenu("Workers");
    } else {
      setMenu("ResponseDriver");
    }
  }, [pathname]);

  const drawer = (
    <div>
      <Toolbar>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmQ09YLvY4gk8ZeDH7a1Debd_68OLVjaQEdagDuZLDu95YSBSXSiG0Y00olA&s"
          alt="logo"
          className="w-[84px] h-16 flex justify-center ml-4 object-cover"
        />
      </Toolbar>
      <Divider />
      <List>
        {routes.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={
              item.path === pathname ? "block bg-[#0077b6] text-white" : ""
            }
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <span
                    className={
                      item.path === pathname ? "text-white" : "text-gray-500"
                    }
                  >
                    {item.icon}
                  </span>
                </ListItemIcon>
                <ListItemText primary={item.content} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: { sm: `0077b6` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <ListItem sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6" noWrap component="div">
              {menu}
            </Typography>
            <div className="flex items-center space-x-4">
              <LogOut />
            </div>
          </ListItem>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
