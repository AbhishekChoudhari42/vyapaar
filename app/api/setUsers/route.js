import supabase from "@/supabase/browserClient";

export async function POST(request){
    const {admin,users} = await request.json();
    // console.log(users, "ekrgk")
    try {
        const { data, error } = await supabase
        .from('game')
        .update({
          state: users
        })
        .match({ admin: admin })

        if (error) {
          console.error('Error updating data here:', error.message);
        } else {
          console.log('Data updated successfully:', data);
        }

        return new Response("Successful");
    } 
    catch (error) {
        console.log("failed: ", error.message)
        return new Response("Unsuccessful");
    }

}