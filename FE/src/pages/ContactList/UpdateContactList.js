import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import NavBar from "../../components/NavBar";
import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
function UpdateContactList() {
  const [display, setDisplay] = useState("false");
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    mess: Yup.string().required(),
  });
  const location = useLocation();
  const data = location.state;
  const formik = useFormik({
    initialValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      mess: data.mess,
    },
    onSubmit: (values) => {
      axios.put(`http://localhost:8080/update/${data.id}`, {
        firstName: values.firstName,
        lastName: values.lastName,
        mess: values.mess,
      });
      setDisplay("true");
    },
    validationSchema: validationSchema,
  });
  // console.log("form err", formik.errors);
  return (
    <>
      <NavBar
        title="Update Contact List"
        btn="Go Back"
        classN="btn btn-warning"
        path="/pages/ContactList/ContactList"
      />
      <div className="container-sm">
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
            <label className="form-label"> Last Name</label>
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
          <button type="submit" className="btn btn-success">
            Update
          </button>
          {display === "true" ? (
            <Link
              to="/pages/ContactList/ContactList"
              className="btn btn-warning ms-3"
              type="button"
            >
              Go back
            </Link>
          ) : null}
        </form>
      </div>
    </>
  );
}

export default UpdateContactList;
