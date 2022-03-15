import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { useToast } from "../../contexts/ToastContext";

import { useAddToCart } from "../../hooks/useAddToCart";

import { formats } from "../../utils/formats";

import "./styles.css";

type ProductProps = {
  id: string;
  name: string;
  photo: string;
  price: number;
  properties: Record<string, string>;
  showCartBtn: boolean;
};

export const Product = (props: ProductProps): JSX.Element => {
  const { id, photo, name, price, properties, showCartBtn } = props;

  const { setToast } = useToast();

  const { addToCart } = useAddToCart();

  const handleAddToCart = (productId: string) => async () => {
    try {
      await addToCart({ productId });
      setToast("Товар добавлен в корзину", "success");
    } catch (e: any) {
      setToast(e.message, "error");
    }
  };

  return (
    <Card className="product">
      <div className="product-image">
        <CardMedia
          component="img"
          image={formats.imagePath(photo)}
          alt={name}
          title={name}
        />
      </div>

      <CardContent className="product-info">
        <Typography
          variant="h6"
          component="h5"
          className="product-name"
          marginBottom={2}
        >
          {name}
        </Typography>

        <Typography variant="body1" component="p" marginBottom={2}>
          Цена: {formats.price(price)}
        </Typography>

        <Typography variant="body2" component="p">
          ОС: {properties.os}
        </Typography>
        <Typography variant="body2" component="p">
          CPU: {properties.cpu}
        </Typography>
        <Typography variant="body2" component="p">
          Память: {properties.memory}
        </Typography>
        <Typography variant="body2" component="p" marginBottom={2}>
          RAM: {properties.ram}
        </Typography>
        <span
          className="product-color"
          style={{ backgroundColor: properties.color }}
        />
      </CardContent>

      {showCartBtn && (
        <CardActions style={{ justifyContent: "flex-end" }}>
          <Button color="primary" onClick={handleAddToCart(id)}>В корзину</Button>
        </CardActions>
      )}
    </Card>
  );
};
