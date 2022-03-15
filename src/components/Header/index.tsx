import { useNavigate } from "react-router-dom";

import { Badge, IconButton, Link, Toolbar } from "@mui/material";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { PageProps } from "../../types/Page";

import "./styles.css";
import { useLogout } from "../../hooks/useLogout";
import { formats } from "../../utils/formats";

export const Header = (props: PageProps): JSX.Element => {
  const { user, cart } = props;

  const navigate = useNavigate();
  
  const logout = useLogout();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Toolbar className="app-header">
      <Link href="/" color="secondary" underline="none" variant="h6" style={{ flexGrow: 1 }}>Витрина E-commerce</Link>

      {user ? (
        <>
          <IconButton href="/cart" color="secondary" style={{ marginRight: 16 }}>
            {cart ? (
              <Badge badgeContent={formats.countTotalQuantity(cart.items)} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            ) : (
              <ShoppingCartIcon />
            )}
          </IconButton>
          <IconButton href="/profile" color="secondary">
            <AccountCircleIcon />
          </IconButton>
          <IconButton color="secondary" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </>
      ) : (
        <IconButton href="/login" color="secondary">
          <LoginIcon />
        </IconButton>
      )}
    </Toolbar>
  );
};
