import React from 'react'
import './App.css';
// import ReactDOM from "react-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [brands, setBrands] = React.useState([]);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  const callApi = async () => {
    await fetch("http://localhost:9000/newroute")
    .then(response => response.json())
    .then(data => setBrands(data));
  }
  React.useEffect(() => {
    callApi()
  }, []);
  return (
    <div className='App'>
      <p>
      <DatePicker
       selected={startDate}
       selectsStart
       startDate={startDate}
       endDate={endDate} // add the endDate to your startDate DatePicker now that it is defined
       onChange={date => setStartDate(date)}
     />
     </p>
     <p>
    <DatePicker
       selected={endDate}
       selectsEnd
       startDate={startDate}
       endDate={endDate}
       minDate={startDate}
       onChange={date => setEndDate(date)}
     />
     </p>
        
      <table>
         <tr>
           <th>Brand Name</th>
           <th>Total profiles</th>
           <th>Total Fans</th>
           <th>Total Engagement</th>
         </tr>
          {brands.map((val, key) => {
           return (
             <tr key={key}>
               <td>{val.brand_name}</td>
               <td>{val.total_profiles}</td>
               <td>{val.total_fans}</td>
               <td>{val.total_engagement}</td>
             </tr>
           )
         })} 
       </table> 
       <p>
       <div>Selected start date={startDate ? startDate.toString() : null}</div>
      <div>Selected end date={endDate ? endDate.toString() : null}</div>
      </p>
       
   </div>
  );
}

export default App;
