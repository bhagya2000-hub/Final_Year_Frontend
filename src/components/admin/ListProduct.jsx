import React, { use, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../layout/Loader";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/feature/cardSlice";
import {
  useDeleteProductMutation,
  useGetAdminProductsQuery,
} from "../../redux/api/productApi";
import AdminLayout from "../layout/AdminLayout";

function ListProducts() {
  const { data, isLoading, error } = useGetAdminProductsQuery();

  const [
    deleteProduct,
    { isLoading: isDeletingLoading, error: deleteError, isSuccess },
  ] = useDeleteProductMutation();

  const deleteProductHandler = (id) => {
    deleteProduct(id);
  };

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }
    if (isSuccess) {
      toast.success("Product Deleted");
    }
  }, [error, deleteError, isSuccess]);

  const setProducts = () => {
    const products = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },

        {
          label: "Action",
          field: "action",
          sort: "asc",
        },
      ],
      rows: [],
    };

    data?.products?.forEach((product) => {
      // console.log("----------------------",products)
      products.rows.push({
        id: product?._id,
        name: product?.name,
        stock: product?.stock,
        action: (
          <>
            <Link
              to={`/admin/product/${product?._id}`}
              className="btn btn-outline-primary"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <Link
              to={`/admin/products/${product?._id}/upload_images`}
              className="btn btn-outline-success ms-2"
            >
              <i className="fa fa-image"></i>
            </Link>
            <button
              className="btn btn-outline-danger ms-2"
              onClick={() => deleteProductHandler(product?._id)}
              disabled={isDeletingLoading}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });

    return products;
  };

  if (isLoading) return <Loader />;

  return (
    <AdminLayout>
      <MetaData title={"All Products"} />

      <h1 className="my-5">{data?.products?.length} Products</h1>
      <MDBDataTable
        data={setProducts()}
        className="px-3"
        bordered
        striped
        hover
      />
    </AdminLayout>
  );
}

export default ListProducts;
