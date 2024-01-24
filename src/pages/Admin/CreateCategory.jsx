import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../../components/form/CategoryForm";
import { Modal } from "antd";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);

  // category modal update
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // modal
  const [visible, setVisible] = useState(false);

  // create category
  const [name, setName] = useState("");
  // form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/category/create-category`,
        {
          name,
        }
      );
      if (data?.success) {
        toast.success(`${name} Category is Created`);
        getAllCategories();
      } else {
        toast.error(`${data.message}`);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  // get all category

  const getAllCategories = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/category/get-category`
      );
      if (result?.data?.success) {
        setCategories(result.data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // handle update

  const handleUpdate = async (e) => {
    e.preventDefault();
    try { 
      const { data } = await axios.put(
        `${import.meta.env.VITE_API}/api/v1/category/update-category/${
          selected._id
        }`,
        {
          name: updatedName,
        }
      );

      if (data?.success) {
        toast.success(data.message);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // handle delete

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API}/api/v1/category/delete-category/${id}`
      );

      if (data?.success) {
        toast.success(data.message);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid custompadding py-4 my-4">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 products-width">
            <h2>Manage Category</h2>
            <div className="py-3 w-50 manage-width">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>

            <div className="w-50 manage-width">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        {" "}
                        <button
                          className="btn btn-primary mx-1"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>{" "}
                        <button
                          onClick={() => handleDelete(c._id)}
                          className="btn btn-danger mx-1"
                        >
                          Delete
                        </button>{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => {
                setVisible(false);
              }}
              footer={null}
              open={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
