import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Loader from "../layout/Loader";
import MetaData from '../layout/MetaData';
import AdminLayout from '../layout/AdminLayout';
import { useCreateAdminProductsMutation } from '../../redux/api/productApi';
import { PRODUCT_CATEGORIES } from '../constants/Constants';

function NewProduct() {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        seller: ""
    });

    const [createProduct, { isLoading, error, isSuccess }] = useCreateAdminProductsMutation();

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message || "Error occurred");
        }
        if (isSuccess) {
            toast.success("Product is Created");
            navigate("/admin/products");
        }
    }, [error, isSuccess, navigate]);

    const { name, description, price, category, stock, seller } = product;

    const onChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        createProduct(product);
    };

    return (
        <>
            <AdminLayout />
            <MetaData title={"Create New Product"} />
            <div className="row wrapper">
                <div className="col-10 col-lg-10 mt-5 mt-lg-0">
                    <form className="shadow rounded bg-body" onSubmit={submitHandler}>
                        <h2 className="mb-4">New Product</h2>
                        <div className="mb-3">
                            <label htmlFor="name_field" className="form-label">Name</label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={onChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description_field" className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                id="description_field"
                                rows="8"
                                name="description"
                                value={description}
                                onChange={onChange}
                                required
                            ></textarea>
                        </div>

                        <div className="row">
                            <div className="mb-3 col">
                                <label htmlFor="price_field" className="form-label">Price</label>
                                <input
                                    type="number"
                                    id="price_field"
                                    className="form-control"
                                    name="price"
                                    value={price}
                                    onChange={onChange}
                                    required
                                />
                            </div>

                            <div className="mb-3 col">
                                <label htmlFor="stock_field" className="form-label">Stock</label>
                                <input
                                    type="number"
                                    id="stock_field"
                                    className="form-control"
                                    name="stock"
                                    value={stock}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="row">
                        <div className="mb-3 col">
    <label htmlFor="category_field" className="form-label">Category</label>
    <select
        className="form-select"
        id="category_field"
        name="category"
        value={category}
        onChange={onChange}
        required
    >
        <option value="">Select Category</option> {/* Default option */}
        {PRODUCT_CATEGORIES?.map((category) => (
            <option key={category} value={category}>{category}</option>
        ))}
    </select>
</div>

                            <div className="mb-3 col">
                                <label htmlFor="seller_field" className="form-label">Seller Name</label>
                                <input
                                    type="text"
                                    id="seller_field"
                                    className="form-control"
                                    name="seller"
                                    value={seller}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn w-100 py-2" disabled={isLoading}>
                            {isLoading ? "Creating..." : "CREATE"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default NewProduct;
