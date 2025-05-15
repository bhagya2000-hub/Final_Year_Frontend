import React, { useEffect } from 'react'
import "./invoice.css"

// import MetaData from '../layout/MetaData';
import { useOderDetailsQuery } from '../../redux/api/oderApi';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../layout/Loader';
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';


function Invoice() {
     const { id } = useParams(); // Correctly destructuring id from useParams
        const { data, isLoading, error } = useOderDetailsQuery(id);
        const order = data?.order || {};
    
        
    
        const {
            shippingInfo,
            orderItems,
            paymentInfo,
            user,
            totalAmount,
            orderStatus,
        } = order;

          useEffect(() => {
                if (error) {
                    toast.error(error?.data?.message);
                }
            }, [error]);

            const handleDownlod = () => {
                const input = document.getElementById("order_invoice");
                html2canvas(input).then((canvas) => {
                  const imgData=canvas.toDataURL("image/png");

                  const pdf=new jsPDF();

                  const pdfWidth=pdf.internal.pageSize.getWidth();
                  pdf.addImage(imgData,"PNG",0,0,pdfWidth,0);
                  pdf.save(`invoice_${order._id}.pdf`);
                });
            };

        if (isLoading) return <Loader />;
  return (
    <>
     <div className="order-invoice my-5">
      <div className="row d-flex justify-content-center mb-5">
        <button className="btn btn-success col-md-5" onClick={handleDownlod}>
          <i className="fa fa-print"></i> Download Invoice
        </button>
      </div>
      <div id="order_invoice" className="p-3 border border-secondary">
        <header className="clearfix">
          <div id="logo">
            
          <img src="/images/flowerLogo.png" alt="Company Logo" />

          </div>
          <h1>INVOICE # {order?._id}</h1>
          <div id="company" className="clearfix">
            <div>Patel Paradis</div>
            <div>
              4/2 Highlevel Road,
              <br />
              Kottawa,Srilanka
            </div>
            <div>(077) 046-32380</div>
            <div>
              <a href="mailto:info@shopit.com">info@patelPardis.com</a>
            </div>
          </div>
          <div id="project">
            <div><span>Name</span> {user?.name}</div>
            <div><span>EMAIL</span> {user?.email}</div>
            <div><span>PHONE</span> {shippingInfo?.phoneNo}</div>
            <div>
              <span>ADDRESS</span> {`${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.zipCode}, ${shippingInfo?.country}`}
            </div>
            {order?.createAt ? new Date(order.createAt).toISOString() : "N/A"}
            <div><span>Status</span> {paymentInfo?.status}</div>
          </div>
        </header>
        <main>
          <table className="mt-5">
            <thead>
              <tr>
                <th className="service">ID</th>
                <th className="desc">NAME</th>
                <th>PRICE</th>
                <th>QTY</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
                {orderItems?.map((item) => (
                    <tr>
                    <td className="service">{item?.product}</td>
                    <td className="desc">{item?.name}</td>
                    <td className="unit">Rs. {item?.price}</td>
                    <td className="qty">Rs. {item?.quantity}</td>
                    <td className="total">Rs. {item?.price * item?.quantity}</td>
                  </tr>
                    
))}
              
              

              <tr>
                <td colspan="4">
                  <b>SUBTOTAL</b>
                </td>
                <td className="total">Rs. {order?.itemsPrice}</td>
              </tr>

              <tr>
                <td colspan="4">
                  <b>TAX 15%</b>
                </td>
                <td className="total">Rs. {order?.taxAmount}</td>
              </tr>

              <tr>
                <td colspan="4">
                  <b>SHIPPING</b>
                </td>
                <td className="total">Rs. {order?.shippingAmount}</td>
              </tr>

              <tr>
                <td colspan="4" className="grand total">
                  <b>GRAND TOTAL</b>
                </td>
                <td className="grand total">Rs. {order?.totalAmount}</td>
              </tr>
            </tbody>
          </table>
          <div id="notices">
            <div>NOTICE:</div>
            <div className="notice">
              A finance charge of 1.5% will be made on unpaid balances after 30
              days.
            </div>
          </div>
        </main>
        <footer>
          Invoice was created on a computer and is valid without the signature.
        </footer>
      </div>
    </div>
    </>
  )
}

export default Invoice;
