
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


import CustomerDashBoardPage from './pages/customer/CustomerDashBoardPage';
import UpdateCustomer from './compoments/Customer/UpdateCustomer';

//Employee Section
import EmpLogin from './compoments/EmpLogin';
import EmployeeDashBoardPage from './pages/employee/EmployeeDashBoardPage';
import EditEmployee from './compoments/Employee/EditEmployee';
import AddEmployee from './compoments/Employee/AddEmployee';

import AddAttendance from './compoments/Employee/AddAttendance';
import EditAttendance from './compoments/Employee/EditAttendance';

// import EmployeeProfile from './compoments/Employee/EmployeeDashBoardOne.js';
import EmployeeProfile from './pages/employee/EmployeeProfile';
import EmployeeDashBoardThree from './compoments/Employee/EmployeeDashBoardThree';
import EmployeeDashBoardTwo from './compoments/Employee/EmployeeDashBoardTwo';
import EmployeeDashBoardOne from './compoments/Employee/EmployeeDashBoardOne';


// import GMLogin from './compoments/Login/GMLogin';
 
// import PMLogin from './compoments/Login/PMLogin';
// import SMLogin from './compoments/Login/SMLogin';
import GMChoose from './compoments/GMChoose';
import DMChoose from './compoments/DMChoose';
import PMChoose from './compoments/PMChoose';
import StockDashBoard from './compoments/Stock/StockDashBoardOne';
// import PackageDashBoard from './compoments/Package/PackageDashBoardOne';
// import OrderDashBoard from './compoments/Order/OrderDashBoardOne';
// import PaymentDashBoard from './compoments/Payment/PaymentDashBoardOne';
import EmployeeDashBoard from './compoments/Employee/EmployeeDashBoardOne';

 
// import MachineDashBoard from './compoments/Machine/MachineDashBoardOne';
// import DeliveryDashBoard from './compoments/Delivery/DeliveryDashBoardOne';
import EditInstructorFeedback from './compoments/DMChoose';

// Machine Section Imports
import MachineDashBoardPage from './pages/machine/MachineDashBoardPage';
import MachineAdd from './compoments/Machine/machineadd';
import MachineManager from './compoments/Machine/MachineManager';
import UpdateMachine from './compoments/Machine/UpdateMachine';
import MachineStatus from './compoments/Machine/MachineStatus';
import AssignMachine from './compoments/Machine/AssignMachine';

//order mee tika nm atha thiynna epa kanawa thowa
import Or_add from './compoments/Order/AddForm'; // Importing Order Add Form component
import Or_Confirm from './compoments/Order/Or_confirm'; // Importing Order Confirm component
import Or_track from './pages/order/OrderTracking';
import Or_update from './compoments/Order/Or_Updateform';
import OrderDashBoardPage from './pages/order/Or_Dashboard'; // Importing Order Dashboard Page component
import Cus_Order from './pages/order/Customer_orders.js';
import Find_order from './pages/order/FindOrder.js';
import OrderTracking from './pages/order/OrderTracking'




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
        <Route path="/CusProfile" element={<CusProfile />} />

        <Route path="/DMChoose" element={<DMChoose/>}/> 

                  {/* Employee Management Routes */}
        <Route path="/EmpLogin" element={<EmpLogin/>}/>
        <Route path="/EmployeeProfile" element={<EmployeeProfile/>}/>
        <Route path="/EmployeeDashBoardPage" element={<EmployeeDashBoardPage/>}/>
        <Route path="/EmployeeDashBoardPage" element={<EmployeeDashBoardPage/>}/> 
        <Route path="/EmployeeProfile" element={<EmployeeProfile/>}/>
        <Route path="/EditEmployee/:empId" element={<EditEmployee />} />
        <Route path="/AddEmployee" element={<AddEmployee />} />
        <Route path="/EditAttendance" element={<EditAttendance />} />
        <Route path="/AddAttendance" element={<AddAttendance />} />

        <Route path="/EmployeeDashBoardThree" element={<EmployeeDashBoardThree />} />
        <Route path="/EmployeeDashBoardTwo" element={<EmployeeDashBoardTwo />} />
        <Route path="/EmployeeDashBoardOne" element={<EmployeeDashBoardOne />} />

        {/* <Route path="/AdminChoose/GMLogin" element={<GMLogin/>}/> 

        
        <Route path="/AdminChoose/PMLogin" element={<PMLogin/>}/> 
        <Route path="/AdminChoose/SMLogin" element={<SMLogin/>}/>  */}
        <Route path="/AdminChoose/GMChoose" element={<GMChoose/>}/>
        <Route path="/AdminChoose/DMChoose" element={<DMChoose/>}/>  
        <Route path="/AdminChoose/PMChoose" element={<PMChoose/>}/> 
        <Route path="/AdminChoose/StockDashBoard" element={<StockDashBoard/>}/> 
        {/* <Route path="/AdminChoose/GMChoose/PackageDashBoard" element={<PackageDashBoard/>}/> */}
        <Route path="/AdminChoose/GMChoose/OrderDashBoardPage" element={<OrderDashBoardPage/>}/> 
        {/* <Route path="/AdminChoose/GMChoose/PaymentDashBoard" element={<PaymentDashBoard/>}/>  */}
        <Route path="/AdminChoose/DMChoose/EmployeeDashBoard" element={<EmployeeDashBoard/>}/> 
        
        {/* <Route path="/AdminChoose/DMChoose/CustomerDashBoard" element={<CustomerDashBoard/>}/>  */}

        <Route path="/AdminChoose/PMChoose/MachineDashBoardPage" element={<MachineDashBoardPage/>}/> 
        {/* <Route path="/AdminChoose/PMChoose/DeliveryDashBoard" element={<DeliveryDashBoard/>}/>   */}
        <Route path="/AdminChoose/DMChoose/CustomerDashBoard/EditInstructorFeedback" element={<EditInstructorFeedback/>}/> 
        

         {/* Machine Section Routes */}
         <Route path="/MachineDashBoardPage" element={<MachineDashBoardPage />} />
         <Route path="/MachineDashBoardPage/add-machine" element={<MachineAdd />} />
          <Route path="/add-machine//MachineDashBoardPage" element={<MachineAdd />} />
          <Route path="/machine-manager" element={<MachineManager />} />
          <Route path="/update-machine/:id" element={<UpdateMachine />} />
          <Route path="/MachineDashBoardPage/UpdateMachine" element={<UpdateMachine />} />
          <Route path="/MachineDashBoardPage/Machine-Status" element={<MachineStatus />} />
          <Route path="/MachineStatus/Assign-machine" element={<AssignMachine />} />

          {/* Order Section Routes */}
          <Route path="/Or_add" element={<Or_add/>}/>     
          <Route path="/Or_Add/order-details" element={<Or_Confirm/>}/> {/* Order Confirmation */}
          <Route path="/OrderDashBoardPage" element={<OrderDashBoardPage/>}/>
          <Route path="/OrderDashBoardPage/updateOrder/:id" element={<Or_update/>}/>
          <Route path="/OrderDashBoardPage/orderTrack/:id" element={<Or_track />} />
          <Route path="/OrderDashBoardPage/orderTracks/:id" element={<Cus_Order/>} /> 
          <Route path="/My/FindOrder" element={<Find_order/>} /> 
          <Route path="/OrderTracking" element={<OrderTracking/>}/> 

        </Routes>
       <Footer/>
      </div>
    </Router>
  );
}
export default App;