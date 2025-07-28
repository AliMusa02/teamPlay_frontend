import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import {
  getUsernameFromToken,
  isAuthenticated,
} from "../../services/authService";
import NavbarModal from "../../components/ui/navbarModal";
import ProfilePage from "../../pages/user/profilePage";
import { LogOut, Settings } from "lucide-react";
import { fetchUserData } from "../../API/userService";
import { MdOutlineUnsubscribe } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { closeProfileModal, openProfileModal } from "../../redux/modelSlice";

const drawerWidth = 240;

function Header(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const loggedIn = isAuthenticated();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("tokenExpiration");
    navigate("/");
  };
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();
  const isOpeProfile = useSelector((state) => state.modal.isOpenProfile);

  const [loading, setLoading] = React.useState();
  const [userData, setUserData] = React.useState([]);

  const username = getUsernameFromToken();
  React.useEffect(() => {
    const getUser = async () => {
      const { data, loading } = await fetchUserData(username.id);
      setUserData(data.user);
      setLoading(loading);
    };

    getUser();
  }, [isOpeProfile]);
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        variant="h6"
        sx={{
          // display: { xs: "none", sm: "block" },
          fontWeight: "bold",
          fontSize: "1.3rem",
          padding: "10px 0",
        }}
        className="text-[#FDC700] "
      >
        ALITeam
      </Typography>
      <Divider />
      <Toolbar className="flex items-center justify-between w-full bg-transparent ">
        <Box
          sx={{
            display: {
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              paddingTop: "20px",
            },
          }}
        >
          <Link
            key="Home"
            to="/"
            state={{ scrollTo: "home" }}
            className="mx-2 font-bold text-black hover:text-yellow-400 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            key="About"
            to="/#about"
            state={{ scrollTo: "about" }}
            className="mx-2 font-bold text-black hover:text-yellow-400 transition-colors duration-300"
          >
            About
          </Link>
          <Link
            key="Contact"
            to="/#contact"
            state={{ scrollTo: "contact" }}
            className="mx-2 font-bold text-black hover:text-yellow-400 transition-colors duration-300"
          >
            Contact
          </Link>
          {loggedIn && (
            <>
              <Link
                key="Teams"
                to="/teams"
                className="mx-2 font-bold text-black hover:text-yellow-400 transition-colors duration-300"
              >
                Teams
              </Link>
              <Link
                key="Blogs"
                to="/Blogs"
                className="mx-2 font-bold text-black hover:text-yellow-400 transition-colors duration-300"
              >
                Blogs
              </Link>
              <Link
                key="invitations"
                to="/invitations"
                className="mx-2 font-bold text-black hover:text-yellow-400 transition-colors duration-300"
              >
                Notifications
              </Link>
            </>
          )}
        </Box>
        {/* {loggedIn ? (
          <div className="w-13 h-13 rounded-full bg-yellow-500 flex items-center justify-center font-extrabold text-2xl">
            {username.slice(0, 2).toUpperCase()}
          </div>
        ) : (
          <Box className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="border-2 border-yellow-400 text-white px-3 py-2 rounded-full font-semibold hover:bg-yellow-400 hover:text-blue-900 transition shadow-md"
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-yellow-400 text-blue-900 px-3 py-2 rounded-full font-semibold hover:bg-yellow-300 transition shadow-md"
            >
              Register
            </button>
          </Box>
        )} */}
      </Toolbar>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", bgcolor: "red" }} className="bg-transparent">
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.15)", // açıq ağ, şəffaf
          backdropFilter: "blur(10px)", // arxa plan bulanıqlaşma effekti
          WebkitBackdropFilter: "blur(10px)", // Safari üçün
          boxShadow: "none",
          padding: "0 10px",
        }}
      >
        <Toolbar className="flex items-center justify-between w-full bg-transparent ">
          <IconButton
            color=""
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" }, color: "#fdc700" }}
          >
            <MenuIcon />
          </IconButton>
          <Link key="Home" state={{ scrollTo: "home" }} to="/">
            <Typography
              variant="h6"
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
              className="text-[#FDC700] "
            >
              ALITeam
            </Typography>
          </Link>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Link
              key="Home"
              state={{ scrollTo: "home" }}
              to="/"
              className="mx-2 font-bold text-white hover:text-yellow-400 transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              key="About"
              state={{ scrollTo: "about" }}
              to="/#about"
              className="mx-2 font-bold text-white hover:text-yellow-400 transition-colors duration-300"
            >
              About
            </Link>
            <Link
              key="Contact"
              state={{ scrollTo: "contact" }}
              to="/#contact"
              className="mx-2 font-bold text-white hover:text-yellow-400 transition-colors duration-300"
            >
              Contact
            </Link>
            {loggedIn && (
              <>
                <Link
                  key="Teams"
                  to="/teams"
                  className="mx-2 font-bold text-white hover:text-yellow-400 transition-colors duration-300"
                >
                  Teams
                </Link>
                <Link
                  key="Blogs"
                  to="/Blogs"
                  className="mx-2 font-bold text-white hover:text-yellow-400 transition-colors duration-300"
                >
                  Blogs
                </Link>
                <Link
                  key="invitations"
                  to="/invitations"
                  className="mx-2 font-bold text-white hover:text-yellow-400 transition-colors duration-300"
                >
                  Notifications
                </Link>
              </>
            )}
          </Box>
          {loggedIn ? (
            <>
              <div className="relative">
                <div
                  onClick={() => setIsOpen(true)}
                  className="w-11 h-11 rounded-full bg-yellow-500 flex items-center justify-center font-extrabold text-2xl cursor-pointer"
                >
                  {username.name.slice(0, 2).toUpperCase()}
                </div>

                <div className="z-50 fixed  top-[100px] right-0 bg-red-500">
                  <NavbarModal
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    top={"60px"}
                    right={"10px"}
                  >
                    <div className="p-2 pt-5">
                      <p className="text-base font-medium">
                        Welcome {username.name}
                      </p>
                      <div className="flex flex-col gap-2 mt-4">
                        <button
                          onClick={() => {
                            dispatch(openProfileModal());
                            setIsOpen(false);
                          }}
                          className="text-sm text-blue-700 hover:underline text-left flex items-center gap-2 cursor-pointer"
                        >
                          <Settings size={16} /> Account Settings
                        </button>
                        <button
                          onClick={handleLogout}
                          className="text-sm text-red-600 hover:underline text-left flex items-center gap-2 cursor-pointer"
                        >
                          <LogOut size={16} /> Logout
                        </button>
                      </div>
                    </div>
                  </NavbarModal>
                </div>
              </div>
            </>
          ) : (
            <Box className="flex items-center gap-3">
              <button
                onClick={() => navigate("/login")}
                className="border-2 border-yellow-400 text-white px-3 py-2 rounded-full font-semibold hover:bg-yellow-400 hover:text-blue-900 transition shadow-md"
              >
                Log In
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-yellow-400 text-blue-900 px-3 py-2 rounded-full font-semibold hover:bg-yellow-300 transition shadow-md"
              >
                Register
              </button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
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

        <NavbarModal
          open={isOpeProfile}
          // onOpenChange={dispatch(openProfileModal())}
          onClose={() => dispatch(closeProfileModal())}
          transform={"translate(-50%, -50%)"}
          top={"50%"}
          left={"50%"}
          width={"70%"}
        >
          <ProfilePage user={userData} />
        </NavbarModal>
      </nav>
    </Box>
  );
}

Header.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Header;
