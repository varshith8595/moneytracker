import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [info, setinfo] = useState("");
  const [date, setdate] = useState("");
  const [description, setdescription] = useState("");
  const [postinfo, setpostinfo] = useState([]);
  const [price, setprice] = useState(0);
  useEffect(() => {
    fetch("http://localhost:4000/getpost", {
      method: "GET",
    })
      .then((result) =>
        result.json().then((post) => {
          setpostinfo(post);
        })
      )
      .catch((err) => console.log(err));
  }, []);
  const loadposts = () => {
    fetch("http://localhost:4000/getpost", {
      method: "GET",
    })
      .then((result) => result.json().then((post) => setpostinfo(post)))
      .catch((err) => console.log(err));
  };
  const addtransaction = async(e) => {
    e.preventDefault();
    console.log("This is a good thing to know about");
    const formdata = new FormData();
    formdata.append("info", info);
    formdata.append("date", date);
    formdata.append("description", description);
    formdata.append("price", price);
    setinfo("");
    setdate("");
    setdescription("");
    setprice("");
    await fetch("http://localhost:4000/post", {
      method: "POST",
      body: formdata,
    })
      .then((result) => result.json().then((post) => console.log(post)))
      .catch((err) => console.log(err));
    loadposts();
  };
  let balance = 0;
  for (const item of postinfo) {
    balance = balance + item.price;
  }
  return (
    <main>
      <h1>Money Tracker</h1>
      <h1>Balance : {balance}</h1>
      <form action="" className="form">
        <div className="form_details">
          <input
            type="text"
            placeholder="Reason for the Transaction"
            value={info}
            onChange={(e) => setinfo(e.target.value)}
          />
          <input
            type="date"
            value={date}
            placeholder="dd-mm-yyyy"
            onChange={(e) => setdate(e.target.value)}
          />
        </div>
        <div className="form_description">
          <div className="form_details">
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="price"
              value={price}
              onChange={(e) => setprice(e.target.value)}
            />
          </div>
          <button onClick={addtransaction}>Add transaction</button>
        </div>
      </form>

      {postinfo.length > 0 &&
        postinfo.map((item) => (
          <div className="transactioninfo" key={item._id}>
            <div className="transactioninfo_content">
              <h2>{item.info}</h2>
              <p>{item.description}</p>
            </div>
            <div className="transactioninfo_price">
              <h2 className={item.price < 0 ? "red" : "green"}>{item.price}</h2>
              <p>{item.date}</p>
            </div>
          </div>
        ))}
    </main>
  );
}

export default App;
