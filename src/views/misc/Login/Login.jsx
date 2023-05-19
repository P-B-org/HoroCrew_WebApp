import { useFormik } from "formik";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import FormControl from "../../../components/FormControl/FormControl";
import Input from "../../../components/Input/Input";
import AuthContext from "../../../context/AuthContext";
import { login as loginService } from "../../../services/AuthService";
import { loginSchema } from "../../../utils/schemas/login.schema";
import { Link } from "react-router-dom";
import "./Login.css";
import { useEffect } from "react";

const initialValues = {
  email: "",
  password: "",
};


const Login = () => {

  const { login, currentUser } = useContext(AuthContext);

  let faceio;

  useEffect(() => {
    faceio = new faceIO("fioa76d4")
  }, []);

  if (currentUser) {
  }

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isSubmitting,
    handleSubmit,
    setSubmitting,
    setFieldError,
  } = useFormik({
    initialValues: initialValues,
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      loginService({ email: values.email, password: values.password })

        .then(async (response) => {

          console.log(currentUser.firstName);

          if (response.facialId) {

            try {
              let userData = await faceio.authenticate({
                "locale": "auto",

              });

              console.log(` Unique Facial ID: ${userData.facialId}
            PayLoad: ${userData.payload}
            `);


              if (userData.facialId == response.facialId) {
                login(response.accessToken);
              }
            } catch (err) {
              console.log(err)
            }
          }

          else {
            console.log("login sin face ")
            login(response.accessToken);
          }


        })
        .catch((err) => {
          if (err?.response?.data?.message) {
            setFieldError("email", err?.response?.data?.message);
          } else {
            setFieldError("email", err.message);
          }
          setSubmitting(false);
        });
    },
  });

  return (
    <div className="login-bg">
      <div>
        <h1 className="h1-login">Login</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <FormControl
          text="Email"
          error={touched.email && errors.email}
          htmlFor="email"
          style={{ color: "white" }}
        >
          <Input
            id="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            error={touched.email && errors.email}
            placeholder="Enter your email..."
          />
        </FormControl>

        <FormControl
          text="Password"
          error={touched.password && errors.password}
          htmlFor="password"
          style={{ color: "white" }}
        >
          <Input
            id="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            error={touched.password && errors.password}
            placeholder="Enter your password..."
            type="password"
          />
        </FormControl>

        <button className="btn btn-dark" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Login"}
        </button>
        <Link className="btn btn-light m-3" to="/">
          {" "}
          Back to Home{" "}
        </Link>
        <Link className="btn btn-light m-3" to="/facial">
          {" "}
          Login With Facial{" "}
        </Link>

      </form>
    </div>
  );
};

export default Login;
