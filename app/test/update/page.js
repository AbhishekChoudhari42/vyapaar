'use client'
import React, { useEffect, useState } from 'react';
import supabase from '@/supabase/browserClient';

const page = () => {
  // console.log(supabase)
  const [dataToUpdate, setDataToUpdate] = useState({
    id: 1,
    name: '',
    age: 0,
  });

  const handleChange = (e) => {
    setDataToUpdate({
      ...dataToUpdate,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const { data, error } = await supabase
        .from('update_test') // Replace 'your_table_name' with your actual table name
        .update({
          name: dataToUpdate.name,
          age: dataToUpdate.age,
          // name: "Mudassar",
          // age: 21,
        })
        .match({ id: dataToUpdate.id });

      if (error) {
        console.error('Error updating data:', error.message);
      } else {
        console.log('Data updated successfully:', data);
      }
    } catch (error) {
      console.error('Error updating data:', error.message);
    }
  };

  const testData = {
    id: 1,
    name: "abc",
    age: 29
  }

  const [testState, setTestState] = useState(testData)
  useEffect(()=>{
    const listen = async () =>{
      const changes = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          schema: 'public',
          event: 'UPDATE',  
        },
        (payload) => {
          setTestState(payload.new)
          console.log("Payload: ",payload)
      })
      .subscribe()
    }

    listen()
  },[])

  const handleStateUpdate= async () =>{
    try {
      const updatedData = {
        name: dataToUpdate.name,
        age: dataToUpdate.age,
      }
      const { data, error } = await supabase
        .from('update_test')
        .update(updatedData)
        .match({ id: dataToUpdate.id });
  
      if (error) {
        console.error('Error updating data:', error.message);
      } else {
        console.log('Data updated successfully:', data);
        // setTestState()
      }
    } catch (error) {
      console.error('Error updating data:', error.message);
    }
  }


  return (
    <div>
      <h2>Update Data</h2>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={dataToUpdate.name}
          onChange={handleChange}
          autoComplete='name'
        />
      </label>
      <br />
      <label>
        Age:
        <input
          type="number"
          name="age"
          value={dataToUpdate.age}
          onChange={handleChange}
          className='bg-black'
        />
      </label>
      <br />
      <button onClick={handleUpdate}>Update Data</button>
      <br/>
      <button onClick={handleStateUpdate}>Handle state update</button>
      <br/>
      <div>
      {/* {testData} */}
        {Object.entries(testState).map(([key, value]) => (
          <p key={key}>
            <strong>{key}:</strong> {value}
          </p>
        ))}
      </div>
    </div>
  );
};

export default page;


// {
//   "schema": "public",
//   "table": "update_test",
//   "commit_timestamp": "2024-01-20T16:10:27.097Z",
//   "eventType": "UPDATE",
//   "new": {
//       "age": 54,
//       "id": 1,
//       "name": "knk"
//   },
//   "old": {
//       "id": 1
//   },
//   "errors": null
// }