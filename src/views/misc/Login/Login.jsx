import { useFormik } from "formik";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import FormControl from "../../../components/FormControl/FormControl";
import Input from "../../../components/Input/Input";
import AuthContext from "../../../context/AuthContext";
import { login as loginService } from "../../../services/AuthService";
import { setAccessToken } from "../../../stores/AccessTokenStore";
import { loginSchema } from "../../../utils/schemas/login.schema";
import { Link } from "react-router-dom";
import "./Login.css"


const initialValues = {
    email: "",
    password: "",
};

const Login = () => {
    const { login, currentUser } = useContext(AuthContext);
    if (currentUser) {
        return <Navigate to="/profile" />;
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
                .then((response) => {
                    login(response.accessToken);
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
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <FormControl
                    text="Email"
                    error={touched.email && errors.email}
                    htmlFor="email"
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

                <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
                <Link className="btn btn-light m-3" to="/"> Atras </Link>
                <Link className="btn btn-light m-3" to="/loginFacial"> Facial Login </Link>

            </form>
        </div>
    );
};

export default Login;