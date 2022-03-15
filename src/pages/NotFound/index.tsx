import { useNavigate } from "react-router-dom";
import { Button, Card, CardActions, CardMedia } from "@mui/material";

import { Wrapper } from "../../components/Wrapper";

import { formats } from "../../utils/formats";

import "./styles.css";

export const NotFound = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <div className="app-fullpage">
        <Card style={{ maxWidth: 400 }}>
          <CardMedia
            component="img"
            image={formats.imagePath("/uploads/not-found.png")}
          />
          <CardActions style={{ justifyContent: "center" }}>
            <Button color="primary" onClick={() => navigate(-1)}>
              Назад
            </Button>
            <Button color="primary" onClick={() => navigate("/")}>
              На главную
            </Button>
          </CardActions>
        </Card>
      </div>
    </Wrapper>
  );
};
