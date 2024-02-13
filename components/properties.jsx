import React from 'react'
import { v4 as uuid } from 'uuid'
import tabledata from '@/lib/constant/tabledata'
import useUser from '@/hooks/useUser';


const Properties = (currentState) => {
  const user = useUser();
  const username = user?.data?.display_name?.replace(" ","");
  const props = currentState?.currentState[username]?.prop
  // console.log(currentState)
  // console.log(props)
  return (
    <div>
    
    <div>PROPERTIES</div>
    <ol>
      {props.map(prop=>(
        <li key={uuid()}>
            {tabledata[prop]?.name}
        </li>
      ))}
    </ol>
    </div>
  )
}

export default Properties