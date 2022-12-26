import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import axios from "axios";
import { Link } from "react-router-dom";

function ContactList() {
  const [contactList, setContactList] = useState([]);
  const [reloadPage, setReloadPage] = useState("false");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/users")
      .then((res) => {
        setContactList(res.data);
        setReloadPage("false");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reloadPage]);
  const deleteElement = (id) => {
    axios.delete(`http://127.0.0.1:8080/delete/${id}`);
    setReloadPage("true");
  };

  return (
    <>
      <NavBar
        title="Contact List"
        btn="Go Back"
        classN="btn btn-warning"
        path="/"
      />
      <div className="container-sm">
        <table className="table align-middle">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Message</th>
            </tr>
          </thead>
          <tbody>
            {contactList.map((list) => {
              return (
                <tr key={list.id}>
                  <th scope="row">{list.id}</th>
                  <td>{list.firstName}</td>
                  <td>{list.lastName}</td>
                  <td>{list.mess}</td>
                  <td>
                    <Link
                      to="/pages/ContactList/UpdateContactList"
                      state={{
                        id: list.id,
                        firstName: list.firstName,
                        lastName: list.lastName,
                        mess: list.mess,
                      }}
                      className="btn btn-success ms-3"
                    >
                      Update
                    </Link>

                    <button
                      type="button"
                      className="btn btn-danger ms-3"
                      onClick={() => {
                        deleteElement(list.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ContactList;
