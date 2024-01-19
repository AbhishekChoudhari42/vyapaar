'use client'
import React, { useEffect, useState } from 'react';
import supabase from '@/supabase/client';

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

  useEffect(()=>{
    const listen = async () =>{
      const changes = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          schema: 'public', // Subscribes to the "public" schema in Postgres
          event: '*',       // Listen to all changes
        },
        (payload) => console.log("Payload: ",payload)
      )
      .subscribe()
    }

    listen()
  },[])

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
    </div>
  );
};

export default page;
