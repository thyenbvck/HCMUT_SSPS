// // BuyPage.jsx
// import React, { useState, useRef } from 'react';
// import './design.css';
// import Sidebar from '../../../components/Sidebar';
// import { useNavigate } from 'react-router-dom';
// import Filter from './Filter';
// import dividerImage from "../Info/images/divider774-701.svg";
// import ThanhToan from "./ThanhToan";
// const BuyPage = () => {
//     const [paperType, setPaperType] = useState('A4');
//     const [quantity, setQuantity] = useState(1);

//     const [orders, setOrders] = useState([
//         { id: 'HCMUT001', paperType: 'A4', pages: 1, price: 1000, status: 'pending' },
//         { id: 'HCMUT002', paperType: 'A4', pages: 5, price: 1000, status: 'paid' },
//     ]);

//     const handleLoaiChange = (newLoaiGiay) => {
//         setPaperType(newLoaiGiay);
//         console.log("Loại giấy mới:", newLoaiGiay);
//     };

//     const handleQuantityChange = (newQuantity) => {
//         setQuantity(parseInt(newQuantity, 10) || 0);
//         console.log("Số lượng mới:", newQuantity);
//     };
//     const navigate = useNavigate();

//     const handleCreateOrder = () => {
//         const newOrderId = `HCMUT00${orders.length + 1}`;

//         const newOrder = {
//             id: newOrderId,
//             paperType: paperType,
//             pages: quantity,
//             price: 1000, 
//             status: 'pending',
//         };

//         setOrders([...orders, newOrder]);
//     };

//     const handlePay = (orderId) => {
//         setOrders(orders.map(order =>
//             order.id === orderId ? { ...order, status: 'paid' } : order
//         ));
//         navigate('/student/thanh-toan'); // Chuyển hướng sau khi thanh toán đơn hàng
//     };

//     const handlePayAll = () => {
//         setOrders(orders.map(order => ({ ...order, status: 'paid' })));
//         navigate('/student/thanh-toan'); // Chuyển hướng sau khi thanh toán tất cả
//     };
//     return (
//         <div className="buy-page">
//             <Sidebar/>
//             <div className="Title-container">
//                 <div className="Title">
//                     <div className="info-pageheader">
//                         <strong className="info-text">
//                             <Filter
//                                 onLoaiChange={handleLoaiChange}
//                                 onQuantity={handleQuantityChange}
//                             />

//                             <button onClick={handleCreateOrder} className="create-order-button">Tạo đơn hàng</button>
//                         </strong>
//                         <img
//                             src={dividerImage}
//                             alt="Divider774"
//                             className="info-divider"
//                         />

//                     </div>

//                 </div>
//             </div>
//             <div className="table-container">
//                 <div className="table-header">Đơn thanh toán</div>
//                 <table> 
//                     <thead>
//                     <tr>
//                         <th>ID Bill</th>
//                         <th>Type</th>
//                         <th>Number</th>
//                         <th>Unit Price</th>
//                         <th>Total</th>
//                         <th>State</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {orders.map(order => (
//                         <tr key={order.id}>
//                             <td>{order.id}</td>
//                             <td>{order.paperType}</td>
//                             <td>{order.pages}</td>
//                             <td>{order.price} VNĐ</td>
//                             <td>{order.price * order.pages} VNĐ</td>
//                             <td>
//                                 {order.status === 'pending' ? (
//                                     <button onClick={() => handlePay(order.id)}>Thanh toán</button>
//                                 ) : (
//                                     <span>Đã thanh toán</span>
//                                 )}
//                             </td>
//                         </tr>
//                     ))}
//                     </tbody>
//                 </table>
//                 <button onClick={handlePayAll} className="pay-all-button">Thanh toán tất cả</button>
//             </div>


//         </div>
//     );
// };

// export default BuyPage;






import React, { useState, useRef } from 'react';
import './design.css';
import Sidebar from '../../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import Filter from './Filter';
import dividerImage from "../Info/images/divider774-701.svg";

const BuyPage = () => {
    const [paperType, setPaperType] = useState('A4');
    const [quantity, setQuantity] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items to display per page

    const [orders, setOrders] = useState([
        { id: 'HCMUT001', paperType: 'A4', pages: 1, price: 1000, status: 'pending' },
        { id: 'HCMUT002', paperType: 'A4', pages: 5, price: 1000, status: 'paid' },
    ]);

    const handleLoaiChange = (newLoaiGiay) => {
        setPaperType(newLoaiGiay);
        console.log("Loại giấy mới:", newLoaiGiay);
    };

    const handleQuantityChange = (newQuantity) => {
        setQuantity(parseInt(newQuantity, 10) || 0);
        console.log("Số lượng mới:", newQuantity);
    };
    const navigate = useNavigate();

    const handleCreateOrder = () => {
        const newOrderId = `HCMUT00${orders.length + 1}`;

        const newOrder = {
            id: newOrderId,
            paperType: paperType,
            pages: quantity,
            price: 1000, 
            status: 'pending',
        };

        setOrders([...orders, newOrder]);
        // If a new order is added, go to the last page
        setCurrentPage(Math.ceil((orders.length + 1) / itemsPerPage));
    };

    const handlePay = (orderId) => {
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, status: 'paid' } : order
        ));
        navigate('/student/thanh-toan');
    };

    const handlePayAll = () => {
        setOrders(orders.map(order => ({ ...order, status: 'paid' })));
        navigate('/student/thanh-toan');
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(orders.length / itemsPerPage);

    return (
        <div className="buy-page">
            <Sidebar/>
            <div className="Title-container">
                <div className="Title">
                    <div className="info-pageheader">
                        <strong className="info-text">
                            <Filter
                                onLoaiChange={handleLoaiChange}
                                onQuantity={handleQuantityChange}
                            />
                            <button onClick={handleCreateOrder} className="create-order-button">Tạo đơn hàng</button>
                        </strong>
                        <img
                            src={dividerImage}
                            alt="Divider774"
                            className="info-divider"
                        />
                    </div>
                </div>
            </div>
            <div className="table-container">
                <div className="table-header">Đơn thanh toán</div>
                <table> 
                    <thead>
                        <tr>
                            <th>ID Bill</th>
                            <th>Type</th>
                            <th>Number</th>
                            <th>Unit Price</th>
                            <th>Total</th>
                            <th>State</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentOrders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.paperType}</td>
                            <td>{order.pages}</td>
                            <td>{order.price} VNĐ</td>
                            <td>{order.price * order.pages} VNĐ</td>
                            <td>
                                {order.status === 'pending' ? (
                                    <button onClick={() => handlePay(order.id)}>Thanh toán</button>
                                ) : (
                                    <span>Đã thanh toán</span>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                
                {/* Pagination Controls */}
                <div className="pagination-controls">
                    <button 
                        onClick={() => paginate(currentPage - 1)} 
                        disabled={currentPage === 1}
                    >
                        Trang trước
                    </button>
                    <span>Trang {currentPage} / {totalPages}</span>
                    <button 
                        onClick={() => paginate(currentPage + 1)} 
                        disabled={currentPage === totalPages}
                    >
                        Trang kế
                    </button>
                </div>

                <button onClick={handlePayAll} className="pay-all-button">Thanh toán tất cả</button>
            </div>
        </div>
    );
};

export default BuyPage;