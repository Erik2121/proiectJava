import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
function FormModel() {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    mess: Yup.string().required(),
  });
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      mess: "",
    },
    onSubmit: (values) => {
      axios.post("http://127.0.0.1:8080/save", {
        firstName: values.firstName,
        lastName: values.lastName,
        mess: values.mess,
      });

      formik.resetForm();
    },
    validationSchema: validationSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-3">
        <label className="form-label">First Name</label>
        <input
          type="text"
          id="firstName"
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
        {formik.errors.firstName ? (
          <div className="color-form">{formik.errors.firstName}</div>
        ) : null}
      </div>
      <div className="mb-3">
        <label className="form-label">Last Name</label>
        <input
          type="text"
          id="lastName"
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
        {formik.errors.lastName ? (
          <div className="color-form">{formik.errors.lastName}</div>
        ) : null}
      </div>
      <div className="mb-3">
        <label className="form-label">Message</label>
        <textarea
          className="form-control"
          id="mess"
          rows="3"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.mess}
        ></textarea>
        {formik.errors.mess ? (
          <div className="color-form">{formik.errors.mess}</div>
        ) : null}
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default FormModel;
