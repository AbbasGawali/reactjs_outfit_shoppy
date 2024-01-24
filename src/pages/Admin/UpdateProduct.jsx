import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateProduct = () => {
    // managing states
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");
    const navigate = useNavigate();

    const params = useParams();
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


    // Update Product function

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("shipping", shipping);
            photo && productData.append("photo", photo);
            productData.append("category", category);

            const { data } = await axios.put(
                `${import.meta.env.VITE_API}/api/v1/product/update-product/${id}`,
                productData
            );

            if (data?.success) {
                toast.success("Product Updated Successfully");
                navigate("/dashboard/admin/products")
            } else {
                toast.error(data.error);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };

    // delete single product

    const handleDeleteProduct = async () => {
        try {
            let answer = window.confirm("Are you shure you want to delete this product");
         
            if (!answer) {
                return;
            } else {
                
                const result = await axios.delete(`${import.meta.env.VITE_API}/api/v1/product/delete-product/${id}`)
               
                toast.success("Product Deleted Successfully");
                navigate("/dashboard/admin/products");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went Wrong");
        }
    }





    // getSingle product
    const getSingleProduct = async () => {

        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/product/get-product/${params.slug}`)

            setName(data.productResult.name);
            setDescription(data.productResult.description);
            setQuantity(data.productResult.quantity);
            setPrice(data.productResult.price);
            setShipping(data.productResult.shipping);
            setId(data.productResult._id);
            // setCategory(data.productResult.category.name);
            setCategory(data.productResult.category._id);
            setId(data.productResult._id);


        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong")
        }

    }



    useEffect(() => {
        getSingleProduct();
    }, []);

    //   main page of UpdateProduct
    return (
        <Layout title={"Dashboard - Update Product"}>
            <div className="container-fluid custompadding py-4 my-4">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 w-75">
                        <h2>Update Product</h2>

                        <div className="m-1 w-50">
                            <Select
                                bordered="false"
                                placeholder="Select a category"
                                size="large"
                                showSearch
                                value={category}
                                className="form-select mb-3 "
                                onChange={(value) => {
                                    setCategory(value);
                                }}
                            >
                                {categories?.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>

                            <div className="mb-3">
                                <label className="btn btn-outline-secondary">
                                    {photo ? photo.name : "Upload Photo"}
                                    <input
                                        type="file"
                                        name="photo"
                                        id="photo"
                                        accept="image/*"
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className="mb-3">
                                {photo ? (
                                    <div className=" my-4">
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="Product Image"
                                            value={photo}
                                            width={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                ) : (

                                    id && (
                                        <div className=" my-4">
                                            <img
                                                src={`${import.meta.env.VITE_API
                                                    }/api/v1/product/get-product-photo/${id}`}
                                                alt="Product Image"
                                                value={photo}
                                                width={"200px"}
                                                className="img img-responsive"
                                            />
                                        </div>
                                    )
                                )}
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    placeholder="Enter a name"
                                    value={name}
                                    className="form-control "
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={description}
                                    placeholder="Enter a Description"
                                    className="form-control "
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={price}
                                    placeholder="Enter Price"
                                    className="form-control "
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder="Enter Quantity"
                                    className="form-control "
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <Select
                                    bordered="false"
                                    placeholder="Select Shipping"
                                    size="large"
                                    value={shipping ? "Yes" : "No"}
                                    showSearch
                                    className="form-select mb-3 "
                                    onChange={(value) => {
                                        setShipping(value);
                                    }}
                                >
                                    <Option value={1}>Yes </Option>
                                    <Option value={0}>No </Option>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <div className="btn btn-primary me-4" onClick={handleUpdateProduct}>
                                    Update Product
                                </div>
                                <div className="btn btn-danger " onClick={handleDeleteProduct}>
                                    Delete Product
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UpdateProduct;
