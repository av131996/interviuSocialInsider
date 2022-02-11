// import './App.css';
// import React from "react";
// // Example of a data array that
// // you might receive from an API
// // const data = [
// //   { name: "Anom", age: 19, gender: "Male" , sum: 10},
// //   { name: "Megha", age: 19, gender: "Female" },
// //   { name: "Subham", age: 25, gender: "Male"},
// // ]
  
// function App() {
//   const [data, setData] = React.useState(null);
//   console.log(data);
//   React.useEffect(() => {
//     fetch("http://localhost:3000/api")
//       .then(async (res) => { await res.json();})
//       .then((data) => {setData(data.test); console.log(data);}
//       );

//   }, []);
//   return (
//     <div className="App">
//          <p>{!data ? "Loading..." : data}</p> 
//       <table>
//         <tr>
//           <th>Brand Name</th>
//           <th>Total profiles</th>
//           <th>Total Fans</th>
//           <th>Total Engagement</th>
//         </tr>
//         {/* {data.map((val, key) => {
//           return (
//             <tr key={key}>
//               <td>{val.name}</td>
//               <td>{val.age}</td>
//               <td>{val.gender}</td>
//               <td>{val.sum}</td>
//             </tr>
//           )
//         })} */}
//       </table>
//     </div>
//   );
// }
  
// export default App;
import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  state = { username: null };

  componentDidMount() {
    fetch('/api')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    const { username } = this.state;
    return (
      <div>
        {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
      </div>
    );
  }
}