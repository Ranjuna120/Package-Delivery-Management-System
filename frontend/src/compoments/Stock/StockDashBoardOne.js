import React from 'react';

function StockDashBoard() {
  return (
  

      <div className="container">

          <form >
          <div class="mb-3">
          <label for="Item Name" class="form-label">Item Name</label>
          <input type="text" class="form-control" id="itemName" placeholder="Enter Item Name"
          onChange={(e)=>{

          // setName(e.target.value);

          }}
      />
  
      </div>

      <div className="mb-3">
      <label for="Alert Quantity" className="form-label">Alert Quantity</label>
      <input type="number" className="form-control" id="alertQty" placeholder="Enter Alert Quantity"
  
          onChange={(e)=>{

          // setAge(e.target.value);

          }}

      />
  
      </div>

      <div class="mb-3">
      <label for="measurement" className="form-label">Measurement</label>
      <input type="text" className="form-control" id="measurement" placeholder="Enter item measurement"
  
      onChange={(e)=>{

          // setGender(e.target.value);

          }}

      />
  
      </div>





      <button type="submit" className="btn btn-primary">Submit</button>
  </form>
      </div>

  )

}




export default StockDashBoard;