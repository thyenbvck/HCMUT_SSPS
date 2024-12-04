// BuyPage.jsx
import React, { useState, useRef } from 'react';
import './design.css';
import Sidebar from "../../components/Sidebar";
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Filter from './Filter';
import dividerImage from "../Info/images/divider774-701.svg";
const BuyPage = () => {
    const [paperType, setPaperType] = useState('A4');
    const [quantity, setQuantity] = useState(1);
    const [orders, setOrders] = useState([
        { id: 'HCMUT001', paperType: 'A4', pages: 1, price: 1000, status: 'pending' },
        { id: 'HCMUT002', paperType: 'A4', pages: 5, price: 1000, status: 'paid' },
    ]);

    const navigate = useNavigate();

    const handleCreateOrder = () => {
        // Tạo một ID đơn hàng mới (ví dụ: sử dụng UUID)
        const newOrderId = `HCMUT00${orders.length + 1}`;

        const newOrder = {
            id: newOrderId,
            paperType: paperType,
            pages: quantity,
            price: 1000, // Giả sử đơn giá là 1000 VNĐ/trang
            status: 'pending',
        };

        setOrders([...orders, newOrder]);
    };

    const handlePay = (orderId) => {
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, status: 'paid' } : order
        ));
    };

    const handlePayAll = () => {
        setOrders(orders.map(order => ({ ...order, status: 'paid' })));
    };

    return (
        <div className="buy-page">
            <Sidebar />
            <div className="Title-container">
                <div className="Title">
                    <div className="info-pageheader">
                        <span className="info-text">
                            <Filter/>

                            <label htmlFor="quantity">Số lượng:</label>
                            <input type="number" id="quantity" min="1" value={quantity} onChange={e => setQuantity(parseInt(e.target.value) || 1)}/>

                            <button onClick={handleCreateOrder} className="create-order-button">Tạo đơn hàng</button>
                        </span>
                        <img
                            src={dividerImage}
                            alt="Divider774"
                            className="info-divider"
                        />

                    </div>
                    {/*<div className="form-field">*/}
                    {/*    <label htmlFor="quantity">Số lượng:</label>*/}
                    {/*    <input type="number" id="quantity" min="1" value={quantity} onChange={e => setQuantity(parseInt(e.target.value) || 1)} />*/}
                    {/*</div>*/}

                    {/*<button onClick={handleCreateOrder} className="create-order-button">Tạo đơn hàng</button>*/}
                </div>
            </div>

                {/*<div className="table-container">*/}
                {/*    <h2>Đơn thanh toán</h2>*/}
                {/*    <table>*/}
                {/*        <thead>*/}
                {/*        <tr>*/}
                {/*            <th>ID Bill</th>*/}
                {/*            <th>Type</th>*/}
                {/*            <th>Number</th>*/}
                {/*            <th>Unit Price</th>*/}
                {/*            <th>Total</th>*/}
                {/*            <th>State</th>*/}
                {/*        </tr>*/}
                {/*        </thead>*/}
                {/*        <tbody>*/}
                {/*        {orders.map(order => (*/}
                {/*            <tr key={order.id}>*/}
                {/*                <td>{order.id}</td>*/}
                {/*                <td>{order.paperType}</td>*/}
                {/*                <td>{order.pages}</td>*/}
                {/*                <td>{order.price} VNĐ</td>*/}
                {/*                <td>{order.price * order.pages} VNĐ</td>*/}
                {/*                <td>*/}
                {/*                    {order.status === 'pending' ? (*/}
                {/*                        <button onClick={() => handlePay(order.id)}>Thanh toán</button>*/}
                {/*                    ) : (*/}
                {/*                        <span>Đã thanh toán</span>*/}
                {/*                    )}*/}
                {/*                </td>*/}
                {/*            </tr>*/}
                {/*        ))}*/}
                {/*        </tbody>*/}
                {/*    </table>*/}
                {/*    <button onClick={handlePayAll} className="pay-all-button">Thanh toán tất cả</button>*/}
                {/*</div>*/}

        </div>
    );
};

export default BuyPage;