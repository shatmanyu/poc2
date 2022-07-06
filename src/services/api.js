import axios from 'axios';
export async function getData(){
    // console.log("function called get data")
    const response = await axios.get('https://www.raymondcamden.com/.netlify/functions/get-cats')
    return response
    }
