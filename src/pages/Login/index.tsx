import { useNavigate } from "react-router-dom";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
  Link,
} from "@mui/material";

import { useFormik } from "formik";

import { useToast } from "../../contexts/ToastContext";

import { useLogin } from "../../hooks/useLogin";

import { Wrapper } from "../../components/Wrapper";

import "./styles.css";

export const Login = (): JSX.Element => {
  const navigate = useNavigate();

  const { setToast } = useToast();

  const login = useLogin();

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values: any) => {
      const errors: any = {};

      if (!values.email) {
        errors.email = "Обязательно";
      }

      if (!values.password) {
        errors.password = "Обязательно";
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        await login(values);
        navigate("/profile");
      } catch (e: any) {
        setToast(e.message, "error");
      }
    },
  });

  return (
    <Wrapper>
      <div className="app-fullpage">
        <form onSubmit={form.handleSubmit}>
          <Card style={{ maxWidth: 200 }}>
            <CardContent>
              <Typography variant="h5" component="h1" marginBottom={2}>
                Вход
              </Typography>
              <TextField
                id="email"
                label="E-mail *"
                value={form.values.email}
                onChange={form.handleChange}
                error={!!form.errors.email}
                helperText={form.errors.email}
                fullWidth
                margin="dense"
                size="small"
              />
              <TextField
                id="password"
                type="password"
                label="Пароль *"
                value={form.values.password}
                onChange={form.handleChange}
                error={!!form.errors.password}
                helperText={form.errors.password}
                fullWidth
                margin="dense"
                size="small"
              />
              <Link
                href="/signup"
                underline="none"
                color="primary"
                variant="body2"
                style={{
                  display: "block",
                  textAlign: "center",
                  margin: "16px 0 0",
                }}
              >
                Регистрация
              </Link>
            </CardContent>
            <CardActions style={{ justifyContent: "center" }}>
              <Button
                type="submit"
                color="primary"
                disabled={!form.dirty || !form.isValid || form.isSubmitting}
              >
                Войти
              </Button>
            </CardActions>
          </Card>
        </form>
      </div>
    </Wrapper>
  );
};
