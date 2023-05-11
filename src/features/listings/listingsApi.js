import axios from 'axios'
// import { url } from "./utils/url.js"

const url = 'http://localhost:5000'

export const getListings = async () => {
    try {
        
        const config = { headers: { 'Content-Type': 'application/json' } }
        const { data } = await axios.get(`${url}/listings`, config)  

        return data
    } catch(e) {
        console.log('An error occured: ',e)
    }
}


