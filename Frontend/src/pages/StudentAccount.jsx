import axios from 'axios'
import React, { useEffect, useState } from 'react'

const StudentAccount = () => {

    // students section code

  
  const [classesdata, setClassData] = useState(null);
  const [searchedClass,setSearchClass] = useState(null)
  const fetchClassData = async () => {
    await axios.get("http://localhost:3000/auth/All_classes").then((result) => {
     
      setClassData(result.data.data);
    });
  };
  useEffect(() => {
    fetchClassData();
  }, []);

  return (
    <div>
    
        
            <select
              onChange={(e)=>setSearchClass(e.target.value)}
              class="form-select form-select-lg mb-3"
              aria-label="Large select example"
            >
              <option selected>Select A Class For Seen The Fee Status</option>
              {classesdata && classesdata.map((c, i) => (
                <option key={i} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
        
      
    </div>
  )
}

export default StudentAccount
