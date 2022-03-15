import { useNavigate } from "react-router-dom";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import { useFormik } from "formik";

import { useToast } from "../../contexts/ToastContext";

import { useSignUp } from "../../hooks/useSignUp";

import { Wrapper } from "../../components/Wrapper";

import "./styles.css";

export const SignUp = (): JSX.Element => {
  const navigate = useNavigate();

  const { setToast } = useToast();

  const signUp = useSignUp();

  const form = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: (values: any) => {
      const errors: any = {};

      if (!values.name) {
        errors.name = "Обязательно";
      }

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
        await signUp(values);
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
          <Card style={{ maxWidth: 250 }}>
            <CardContent>
              <Typography variant="h5" component="h1" marginBottom={2}>
                Регистрация
              </Typography>
              <TextField
                id="name"
                label="Имя *"
                value={form.values.name}
                onChange={form.handleChange}
                error={!!form.errors.name}
                helperText={form.errors.name}
                fullWidth
                margin="dense"
                size="small"
              />
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
                label="Пароль *"
                type="password"
                value={form.values.password}
                onChange={form.handleChange}
                error={!!form.errors.password}
                helperText={form.errors.password}
                fullWidth
                margin="dense"
                size="small"
              />
              <Link
                href="/login"
                underline="none"
                color="primary"
                variant="body2"
                style={{
                  display: "block",
                  textAlign: "center",
                  margin: "16px 0 0",
                }}
              >
                Вход
              </Link>
            </CardContent>
            <CardActions style={{ justifyContent: "center" }}>
              <Button
                type="submit"
                color="primary"
                disabled={!form.dirty || !form.isValid || form.isSubmitting}
              >
                Зарегистрироваться
              </Button>
            </CardActions>
          </Card>
        </form>
      </div>
    </Wrapper>
  );
};
