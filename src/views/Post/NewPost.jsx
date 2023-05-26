import { Button, Loading } from "@nextui-org/react";
import { useFormik } from "formik";
import React from "react";
import { Buttons } from "../../components/Button/Button";
import FormControl from "../../components/FormControl/FormControl";
import Input from "../../components/Input/Input";
import { newPost } from "../../services/PostService";
import { newPostSchema } from "../../utils/schemas/post.schema";


const initialValues = {
  body: "",
  image: "",
};

export const NewPost = ({ refreshPosts }) => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    handleBlur,
    handleChange,
    setSubmitting,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: newPostSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "image") {
          [...values["image"]].forEach((img, i) => {
            formData.append(`img-${i}`, img);
          });
        } else {
          formData.append(key, values[key]);
        }
      });
      newPost(formData)
        .then((response) => {
          refreshPosts && refreshPosts();
          setSubmitting(false);
          resetForm({ values: "" });
        })
        .catch((err) => {
          console.error(err);
          setSubmitting(false);
        });
    },
  });
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="box"
        encType="multipart/form-data"
      >
        <FormControl error={touched.body && errors.body} htmlFor="body">
          <Input
            id="body"
            name="body"
            type="textarea"
            placeholder="Make a New Post!"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.body}
            error={touched.body && errors.body}
          />
        </FormControl>

        <div className="d-flex justify-content-between border-end border-start border-bottom rounded">
          <input
            aria-describedby="image"
            className="custom-file-input"
            id="image"
            name="image"
            type="file"
            multiple
            onChange={(event) => {
              setFieldValue("image", event.currentTarget.files);
            }}
          />

          <Buttons
            type="submit"
            disabled={isSubmitting}
            text={
              isSubmitting ? (
                <Loading
                  type="spinner"
                  color="currentColor"
                  size="md"
                  className="pt-1"
                />
              ) : (
                <strong>Publish</strong>
              )
            }
          />
        </div>
      </form>
    </div>
  );
};
