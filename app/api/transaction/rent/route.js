import axios from 'axios'
// axios.defaults.baseURL='http://localhost:3000/';
export async function POST(request){

    try{
        const {currentUser, property,users,BoardData,dice} = await request.json()
        console.log("hitting rent")

        if (property.type === 'property') {
            const res = await axios.post('http://localhost:3000/api/transaction/rent/property',{currentUser, property,users})
            console.log("hitting property")
            
            const {rent,rentProvider,rentReceiver,updatedBalanceOfProvider,updatedBalanceOfReceiver} = res.data;
            console.log(rent,"rent")
            const response = {
                rent,
                rentProvider,
                rentReceiver,
                updatedBalanceOfProvider,
                updatedBalanceOfReceiver
            }
            return new Response(JSON.stringify(response));

        
        }
        else if(property.type == 'utility'){
            const res = await axios.post('http://localhost:3000/api/transaction/rent/utility',{currentUser,property,users,BoardData,dice})
            const {rent, rentProvider, rentReceiver, updatedBalanceOfProvider, updatedBalanceOfReceiver} = await res.data;
            console.log("hitting utility")
            const response = {
                rent,
                rentProvider,
                rentReceiver,
                updatedBalanceOfProvider,
                updatedBalanceOfReceiver
            }
            return new Response(JSON.stringify(response));

        }
        else if(property.type == 'railroad'){
            console.log("hitting railroad")
            const res = await axios.post('http://localhost:3000/api/transaction/rent/railroad',{currentUser,property,users,BoardData});
            const {rent, rentReceiver, rentProvider, updatedBalanceOfProvider, updatedBalanceOfReceiver} = await res.data
            console.log(rent,"rent")
            const response = {
                rent,
                rentProvider,
                rentReceiver,
                updatedBalanceOfProvider,
                updatedBalanceOfReceiver
            }
            return new Response(JSON.stringify(response));
            
        }


    }catch (error) {
        console.error('Error processing rent request:', error);
        return new Response('Internal Server Error', { status: 500 });
    }

}