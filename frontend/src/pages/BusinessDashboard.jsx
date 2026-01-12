import { useState } from "react";
import API from "../services/api";

export default function BusinessDashboard() {
  const [startup, setStartup] = useState({});

  const createStartup = async () => {
    await API.post("/startups", startup);
    alert("Startup created");
  };

  return (
    <>
      <h2>Create Startup</h2>
      <input placeholder="Title" onChange={(e)=>setStartup({...startup,title:e.target.value})}/>
      <input placeholder="Category" onChange={(e)=>setStartup({...startup,category:e.target.value})}/>
      <input placeholder="Funding" onChange={(e)=>setStartup({...startup,fundingRequired:e.target.value})}/>
      <input placeholder="Equity %" onChange={(e)=>setStartup({...startup,equityOffer:e.target.value})}/>
      <textarea placeholder="Description" onChange={(e)=>setStartup({...startup,description:e.target.value})}/>
      <button onClick={createStartup}>Create</button>
    </>
  );
}
