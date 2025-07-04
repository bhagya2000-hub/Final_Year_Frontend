import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import { useDeleteOrderMutation, useGetAdminOrdersQuery } from "../../redux/api/oderApi";

function ListOrders() {
  const { data, isLoading, error } = useGetAdminOrdersQuery();
  
  // Fix: The destructuring was incorrect. useDeleteOrderMutation returns an array with the function and options
  const [deleteOrder, { isLoading: isDeletingLoading, error: deleteError, isSuccess }] = useDeleteOrderMutation();
  
  const deleteOdertHandler = (id) => {
    deleteOrder(id);
  };
  
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }
    if (isSuccess) {
      toast.success("Order Deleted");
    }
  }, [error, deleteError, isSuccess]);
  
  const setOders = () => {
    const orders = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Payment Status",
          field: "paymentStatus",
          sort: "asc",
        },
        {
          label: "Order Status",
          field: "orderStatus",
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
    
    data?.orders?.forEach((order) => {
      orders.rows.push({
        id: order?._id,
        paymentStatus: order?.paymentInfo?.status?.toUpperCase(),
        orderStatus: order?.orderStatus,
        action: (
          <>
            <Link
              to={`/admin/orders/${order?._id}`}
              className="btn btn-outline-primary"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            
            <button
              className="btn btn-outline-danger ms-2"
              onClick={() => deleteOdertHandler(order?._id)}
              disabled={isDeletingLoading}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });
    
    return orders;
  };
  
  if (isLoading) return <Loader />;
  
  return (
    <AdminLayout>
      <MetaData title={"All Orders"} />
      
      <h1 className="my-5">{data?.orders?.length} Orders</h1>
      <MDBDataTable
        data={setOders()}
        className="px-3"
        bordered
        striped
        hover
      />
    </AdminLayout>
  );
}

export default ListOrders;