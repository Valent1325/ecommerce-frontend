import { useNavigate } from "react-router-dom";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import { useFormik } from "formik";

import { useToast } from "../../contexts/ToastContext";

import { useCreateOrder } from "../../hooks/useCreateOrder";
import { useUpdateCart } from "../../hooks/useUpdateCart";
import { useRemoveFromCart } from "../../hooks/useRemoveFromCart";
import { useClearCart } from "../../hooks/useClearCart";

import { Wrapper } from "../../components/Wrapper";

import { formats } from "../../utils/formats";

import { PageProps } from "../../types/Page";

import "./styles.css";

export const Cart = (props: PageProps): JSX.Element => {
  const { cart } = props;

  const navigate = useNavigate();

  const { setToast } = useToast();

  const { updateCart } = useUpdateCart();
  const { removeFromCart } = useRemoveFromCart();
  const { clearCart } = useClearCart();

  const { createOrder } = useCreateOrder();

  const form = useFormik({
    initialValues: {
      paymentMethod: "",
      deliveryMethod: "",
    },
    validate: (values: any) => {
      const errors: any = {};

      if (!values.paymentMethod) {
        errors.paymentMethod = "Обязательно";
      }

      if (!values.deliveryMethod) {
        errors.deliveryMethod = "Обязательно";
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        await createOrder(values);
        setToast("Заказ оформлен", "success");
        navigate("/profile");
      } catch (e: any) {
        setToast(e.message, "error");
      }
    },
  });

  const handleQuantityChange = (productId: string) => async (event: any) => {
    try {
      await updateCart({ productId, quantity: event.target.value });
    } catch (e: any) {
      setToast(e.message, "error");
    }
  };

  const handleRemoveItem = (productId: string) => async () => {
    try {
      await removeFromCart({ productId });
    } catch (e: any) {
      setToast(e.message, "error");
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
    } catch (e: any) {
      setToast(e.message, "error");
    }
  };

  return (
    <Wrapper title="Корзина">
      <Card style={{ marginBottom: 16 }}>
        <CardContent>
          {!cart || cart?.items?.length < 1 ? (
            <Typography variant="body1">Нет товаров</Typography>
          ) : (
            <>
              {cart?.items.map((item, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center w-100 mb-2"
                >
                  <img
                    src={formats.imagePath(item.product.photo)}
                    alt={item.product.name}
                    title={item.product.name}
                    style={{ height: 50, marginRight: 32 }}
                  />
                  <Typography variant="caption" style={{ marginRight: "auto" }}>
                    {item.product.name}
                  </Typography>
                  <TextField
                    id={`quantity-${index}`}
                    label="Кол-во"
                    value={item.quantity}
                    onChange={handleQuantityChange(item.product.id)}
                    margin="dense"
                    size="small"
                    style={{ width: 100, marginRight: 8 }}
                  />
                  <Typography
                    variant="caption"
                    style={{ minWidth: 150, marginRight: 16 }}
                  >
                    шт. x {formats.price(item.product.price)} ={" "}
                    {formats.price(item.quantity * item.product.price)}
                  </Typography>

                  <IconButton
                    color="error"
                    onClick={handleRemoveItem(item.product.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}

              <div className="d-flex align-items-center justify-content-between">
                <Typography variant="body1">
                  ИТОГ: {formats.countTotalPrice(cart?.items)}
                </Typography>
                <Button
                  color="error"
                  size="small"
                  variant="outlined"
                  onClick={handleClearCart}
                >
                  Очистить корзину
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {cart && cart.items?.length && (
        <form onSubmit={form.handleSubmit}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h1" marginBottom={2}>
                Оформление заказа
              </Typography>
              <TextField
                name="paymentMethod"
                value={form.values.paymentMethod}
                error={!!form.errors.paymentMethod}
                helperText={form.errors.paymentMethod}
                label="Тип оплаты"
                onChange={form.handleChange}
                select
                fullWidth
                margin="dense"
                size="small"
              >
                <MenuItem value="Наличные">Наличные</MenuItem>
                <MenuItem value="Онлайн оплата">Онлайн оплата</MenuItem>
              </TextField>
              <TextField
                name="deliveryMethod"
                value={form.values.deliveryMethod}
                error={!!form.errors.deliveryMethod}
                helperText={form.errors.deliveryMethod}
                label="Тип доставки"
                onChange={form.handleChange}
                select
                fullWidth
                margin="dense"
                size="small"
              >
                <MenuItem value="Самовывоз">Самовывоз</MenuItem>
                <MenuItem value="Доставка курьером">Доставка курьером</MenuItem>
              </TextField>
            </CardContent>
            <CardActions style={{ justifyContent: "flex-end" }}>
              <Button
                type="submit"
                color="primary"
                disabled={!form.dirty || !form.isValid || form.isSubmitting}
              >
                Оформить
              </Button>
            </CardActions>
          </Card>
        </form>
      )}
    </Wrapper>
  );
};
