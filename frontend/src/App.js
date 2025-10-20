
import React from 'react';
import './App.css';
import Header from './compoments/Header';
import Footer from './compoments/Footer';
import Intro from './compoments/Intro';

import FeedbackForm from './compoments/Customer/FeedbackForm';
import Cusdetails from './compoments/Customer/Cusdetails';
import FeedbackList from './compoments/Customer/FeedbackList';
import CustomerProfileOne from './compoments/Customer/CustomerProfileOne';
import Regi from './compoments/Regi';
import CusProfile from './compoments/Customer/CusProfile';
import CustomerLogin from './compoments/Login/CustomerLogin';
import AdminLogin from './compoments/AdminLogin';
import EmpLogin from './compoments/EmpLogin';
import EmployeeProfile from './pages/employee/EmployeeProfile';
import CustomerDashBoardPage from './pages/customer/CustomerDashBoardPage';
import UpdateCustomer from './compoments/Customer/UpdateCustomer';

// import GMLogin from './compoments/Login/GMLogin';
 
// import PMLogin from './compoments/Login/PMLogin';
// import SMLogin from './compoments/Login/SMLogin';
import GMChoose from './compoments/GMChoose';
import DMChoose from './compoments/DMChoose';
import PMChoose from './compoments/PMChoose';
// import StockDashBoard from './compoments/Stock/StockDashBoardOne';
// import PackageDashBoard from './compoments/Package/PackageDashBoardOne';
// import OrderDashBoard from './compoments/Order/OrderDashBoardOne';
// import PaymentDashBoard from './compoments/Payment/PaymentDashBoardOne';
// import EmployeeDashBoard from './compoments/Employee/EmployeeDashBoardOne';

 
// import MachineDashBoard from './compoments/Machine/MachineDashBoardOne';
// import DeliveryDashBoard from './compoments/Delivery/DeliveryDashBoardOne';
import EditInstructorFeedback from './compoments/DMChoose';



import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/*" element={<Outlet />}/>

        <Route path="/CustomerLogin" element={<CustomerLogin/>}/> 
        <Route path="/FeedbackForm" element={<FeedbackForm />}/>    
        <Route path="/AdminChoose/DMChoose/CustomerDashBoardPage/FeedbackList" element={<FeedbackList />}/> 
        <Route path="/AdminChoose/DMChoose/CustomerDashBoardPage/Cusdetails" element={<Cusdetails />}/> 
        <Route path="/CustomerDashBoardPage" element={<CustomerDashBoardPage />}/> 
        <Route path="/Regi" element={<Regi />}/> 
        <Route path="/update-customer/:id" element={<UpdateCustomer />} />
        <Route path="/CustomerProfileOne" element={<CustomerProfileOne/>}/>
        <Route path="/AdminLogin" element={<AdminLogin/>}/>
        <Route path="/EmpLogin" element={<EmpLogin/>}/>
        <Route path="/EmployeeProfile" element={<EmployeeProfile/>}/>
        <Route path="/CusProfile" element={<CusProfile />} />

        <Route path="/DMChoose" element={<DMChoose/>}/> 

       

        

         
        {/* <Route path="/AdminChoose/GMLogin" element={<GMLogin/>}/> 

        
        <Route path="/AdminChoose/PMLogin" element={<PMLogin/>}/> 
        <Route path="/AdminChoose/SMLogin" element={<SMLogin/>}/>  */}
        <Route path="/AdminChoose/GMChoose" element={<GMChoose/>}/>
        <Route path="/AdminChoose/DMChoose" element={<DMChoose/>}/>  
        <Route path="/AdminChoose/PMChoose" element={<PMChoose/>}/> 
        {/* <Route path="/AdminChoose/StockDashBoard" element={<StockDashBoard/>}/> 
        <Route path="/AdminChoose/GMChoose/PackageDashBoard" element={<PackageDashBoard/>}/>
        <Route path="/AdminChoose/GMChoose/OrderDashBoard" element={<OrderDashBoard/>}/> 
        <Route path="/AdminChoose/GMChoose/PaymentDashBoard" element={<PaymentDashBoard/>}/> 
        <Route path="/AdminChoose/DMChoose/EmployeeDashBoard" element={<EmployeeDashBoard/>}/>  */}
        
        {/* <Route path="/AdminChoose/DMChoose/CustomerDashBoard" element={<CustomerDashBoard/>}/>  */}

        {/* <Route path="/AdminChoose/PMChoose/MachineDashBoard" element={<MachineDashBoard/>}/>  */}
        {/* <Route path="/AdminChoose/PMChoose/DeliveryDashBoard" element={<DeliveryDashBoard/>}/>   */}
        <Route path="/AdminChoose/DMChoose/CustomerDashBoard/EditInstructorFeedback" element={<EditInstructorFeedback/>}/> 
        
 

        </Routes>
       <Footer/>
      </div>
    </Router>
  );
}
export default App;