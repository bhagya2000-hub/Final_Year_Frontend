import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";

import { useDeleteUserMutation, useGetAdminUsersQuery } from "../../redux/api/userApi";

function ListUsers() {
  const { data, isLoading, error } =  useGetAdminUsersQuery();
  const [deleteUser,{error:deleteError,isLoading:isDeletingLoading,isSuccess}]=useDeleteUserMutation()

  
  const deleteUserstHandler = (id) => {
    deleteUser(id);
  };
  
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }
    if (isSuccess) {
      toast.success("User Deleted");
    }
  }, [error,deleteError,isSuccess ]);
  
  const setUsers = () => {
    const users = {
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
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
            label: "Role",
            field: "role",
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
    
    data?.users?.forEach((user) => {
        users.rows.push({
        id: user?._id,
        name:user?.name,
        email:user?.email,
        role:user?.role,
        action: (
          <>
            <Link
              to={`/admin/users/${user?._id}`}
              className="btn btn-outline-primary"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            
            <button
              className="btn btn-outline-danger ms-2"
              onClick={() => deleteUserstHandler (user?._id)}
              disabled={isDeletingLoading}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });
    
    return users;
  };
  
  if (isLoading) return <Loader />;
  
  return (
    <AdminLayout>
      <MetaData title={"All Users."} />
      
      <h1 className="my-5">{data?.users?.length} Users</h1>
      <MDBDataTable
        data={setUsers()}
        className="px-3"
        bordered
        striped
        hover
      />
    </AdminLayout>
  );
}

export default ListUsers;