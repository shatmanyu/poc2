import axios from 'axios';
export async function getData(){
    const response = await axios.get('https://www.raymondcamden.com/.netlify/functions/get-cats')
    return response
    }
