import React, { use, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Loader from "../layout/Loader";
import { useMyOrdersQuery } from '../../redux/api/oderApi';
import { MDBDataTable } from 'mdbreact';
import MetaData from '../layout/MetaData';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/feature/cardSlice';

function MyOrder() {
    const { data, isLoading, error } = useMyOrdersQuery();

    const [searchParams]=useSearchParams();

    const orderSuccess = searchParams.get("order_success");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }
        if(orderSuccess) {
           dispatch(clearCart());
           navigate("/me/orders")
        }
    }, [error,orderSuccess]);

    const setOrders = () => {
        const orders = {
            columns: [
                {
                    label: 'ID',
                    field: "id",
                    sort: "asc"
                },
                {
                    label: 'Amount Paid',
                    field: "amount",
                    sort: "asc"
                },
                {
                    label: 'Payment Status',
                    field: "status",
                    sort: "asc"
                },
                {
                    label: 'Order Status',
                    field: "orderStatus",
                    sort: "asc"
                },
                {
                    label: 'Action',
                    field: "action",
                    sort: "asc"
                },
            ],
            rows: [],
        };

        data?.orders?.forEach((order) => {
            orders.rows.push({
                id: order?._id, // Corrected to use order._id
                amount: `Rs. ${order?.totalAmount}`,
                status: order?.paymentInfo?.status?.toUpperCase(),
                orderStatus: order?.orderStatus,
                action: (
                    <>
                        <Link to={`/me/orders/${order?._id}`} className='btn btn-primary'>
                            <i className='fa fa-eye'></i>
                        </Link>
                        <Link to={`/invoice/orders/${order?._id}`} className='btn btn-success ms-2'>
                            <i className='fa fa-print'></i>
                        </Link>
                    </>
                )
            });
        });

        return orders;
    };

    if (isLoading) return <Loader />;

    return (
        <>
        <MetaData title={"My Orders"}/>
        <div>
            <h1 className='my-5'>{data?.orders?.length} Orders</h1>
            <MDBDataTable
                data={setOrders()}
                className="px-3"
                bordered
                striped
                hover
            />
        </div>
        </>
    );
}

export default MyOrder;
