import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useFormik } from "formik";

import { useToast } from "../../contexts/ToastContext";

import { useUpdateUser } from "../../hooks/useUpdateUser";
import { useChangePassword } from "../../hooks/useChangePassword";
import { useOrders } from "../../hooks/useOrders";

import { formats } from "../../utils/formats";

import { Wrapper } from "../../components/Wrapper";

import { PageProps } from "../../types/Page";

import "./styles.css";

export const Profile = (props: PageProps): JSX.Element => {
  const { user } = props;

  const { setToast } = useToast();

  const { updateUser } = useUpdateUser();

  const { changePassword } = useChangePassword();

  const { orders } = useOrders();

  const userForm = useFormik({
    initialValues: {
      avatar: null,
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      address: user?.address ?? "",
    },
    validate: (values: any) => {
      const errors: any = {};

      if (!values.name) {
        errors.name = "Обязательно";
      }

      if (!values.email) {
        errors.email = "Обязательно";
      }

      return errors;
    },
    onSubmit: async (values: any) => {
      try {
        let payload = new FormData();
        Object.keys(values).forEach((key: string) => {
          payload.append(key, values[key]);
        });
        await updateUser(payload);
        setToast("Данные профиля обновлены", "success");
      } catch (e: any) {
        setToast(e.message, "error");
      }
    },
  });

  const passwordForm = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validate: (values: any) => {
      const errors: any = {};

      if (!values.oldPassword) {
        errors.oldPassword = "Обязательно";
      }

      if (!values.newPassword) {
        errors.newPassword = "Обязательно";
      }

      if (!values.confirmNewPassword) {
        errors.confirmNewPassword = "Обязательно";
      }

      if (values.newPassword !== values.confirmNewPassword) {
        errors.newPassword = "Пароли не совпадают";
        errors.confirmNewPassword = "Пароли не совпадают";
      }

      return errors;
    },
    onSubmit: async (values: any) => {
      try {
        await changePassword(values);
        setToast("Пароль изменен", "success");
      } catch (e: any) {
        setToast(e.message, "error");
      }
    },
  });

  const handleAvatarInput = (event: any) => {
    const file = event.currentTarget.files
      ? event.currentTarget.files[0]
      : null;
    file && userForm.setFieldValue("avatar", file);
  };

  return (
    <Wrapper title="Профиль">
      <Grid container spacing={2} columns={{ xs: 1, md: 2 }}>
        <Grid item xs={1}>
          <form onSubmit={userForm.handleSubmit}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h1" marginBottom={2}>
                  Информация
                </Typography>

                <div className="d-flex align-items-center justify-content-between mb-2">
                <Avatar alt={user?.name || ""} title={user?.name || ""} src={user?.avatar ? formats.imagePath(user.avatar) : ""} />
                <Button variant="contained" color="secondary" component="label">
                  Загрузить изображение
                  <input
                    accept="image/*"
                    id="avatar"
                    name="file"
                    type="file"
                    onChange={handleAvatarInput}
                    hidden
                  />
                </Button>
                </div>

                <TextField
                  name="email"
                  label="E-mail *"
                  value={userForm.values.email}
                  onChange={userForm.handleChange}
                  error={!!userForm.errors.email}
                  helperText={userForm.errors.email}
                  fullWidth
                  margin="dense"
                  size="small"
                />
                <TextField
                  name="name"
                  label="Имя *"
                  value={userForm.values.name}
                  onChange={userForm.handleChange}
                  error={!!userForm.errors.name}
                  helperText={userForm.errors.name}
                  fullWidth
                  margin="dense"
                  size="small"
                />
                <TextField
                  name="phone"
                  label="Телефон"
                  value={userForm.values.phone}
                  onChange={userForm.handleChange}
                  error={!!userForm.errors.phone}
                  helperText={userForm.errors.phone}
                  fullWidth
                  margin="dense"
                  size="small"
                />
                <TextField
                  name="address"
                  label="Адрес"
                  value={userForm.values.address}
                  onChange={userForm.handleChange}
                  error={!!userForm.errors.address}
                  helperText={userForm.errors.address}
                  fullWidth
                  margin="dense"
                  size="small"
                />
              </CardContent>
              <CardActions style={{ justifyContent: "flex-end" }}>
                <Button
                  type="submit"
                  color="primary"
                  disabled={
                    !userForm.dirty ||
                    !userForm.isValid ||
                    userForm.isSubmitting
                  }
                >
                  Сохранить
                </Button>
              </CardActions>
            </Card>
          </form>
        </Grid>

        <Grid item xs={1}>
          <form onSubmit={passwordForm.handleSubmit}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h1" marginBottom={2}>
                  Смена пароля
                </Typography>
                <TextField
                  id="oldPassword"
                  type="password"
                  label="Текущий пароль *"
                  value={passwordForm.values.oldPassword}
                  onChange={passwordForm.handleChange}
                  error={!!passwordForm.errors.oldPassword}
                  helperText={passwordForm.errors.oldPassword}
                  fullWidth
                  margin="dense"
                  size="small"
                />
                <TextField
                  id="newPassword"
                  type="password"
                  label="Новый пароль *"
                  value={passwordForm.values.newPassword}
                  onChange={passwordForm.handleChange}
                  error={!!passwordForm.errors.newPassword}
                  helperText={passwordForm.errors.newPassword}
                  fullWidth
                  margin="dense"
                  size="small"
                />
                <TextField
                  id="confirmNewPassword"
                  type="password"
                  label="Новый пароль (повторно) *"
                  value={passwordForm.values.confirmNewPassword}
                  onChange={passwordForm.handleChange}
                  error={!!passwordForm.errors.confirmNewPassword}
                  helperText={passwordForm.errors.confirmNewPassword}
                  fullWidth
                  margin="dense"
                  size="small"
                />
              </CardContent>
              <CardActions style={{ justifyContent: "flex-end" }}>
                <Button
                  type="submit"
                  color="primary"
                  disabled={
                    !passwordForm.dirty ||
                    !passwordForm.isValid ||
                    passwordForm.isSubmitting
                  }
                >
                  Сохранить
                </Button>
              </CardActions>
            </Card>
          </form>
        </Grid>

        <Grid item xs={1} md={2}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h1" marginBottom={2}>
                Заказы
              </Typography>
              {orders.map((order, index) => (
                <Accordion key={index} sx={{ boxShadow: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <div className="d-flex align-items-center w-100">
                      <Chip
                        label={formats.orderStatus(order.status)}
                        color={formats.orderStatusColor(order.status)}
                        size="small"
                        style={{ marginRight: 16, minWidth: 100 }}
                      />
                      <Typography variant="body2">
                        {`Заказ №${index} от ${formats.date(order.createdAt)}`}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="primary"
                        style={{ marginLeft: "auto", marginRight: 16 }}
                      >
                        {formats.price(order.total)}
                      </Typography>
                    </div>
                  </AccordionSummary>

                  <AccordionDetails>
                    {order.items.map((item, index) => (
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
                        <Typography
                          variant="caption"
                          style={{ marginRight: "auto" }}
                        >
                          {item.product.name}
                        </Typography>
                        <Typography variant="caption">
                          {item.quantity} шт. x{" "}
                          {formats.price(item.product.price)} ={" "}
                          {formats.price(item.quantity * item.product.price)}
                        </Typography>
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}

              {orders?.length < 1 && (
                <Typography variant="body1">Нет заказов</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Wrapper>
  );
};
