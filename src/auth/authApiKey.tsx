
import axios from 'axios'

const headers = {
    'Content-Type': 'application/json',
    'X-API-KEY': '371abad5-b7bf-4b12-93fc-2f8ed1c068fb',
    Authorization: null
}
   

const api = axios.create({
    baseURL: 'https://fullstack.exercise.applifting.cz',
    headers: headers
})


export async function login(){
    api.post('/login', 
      {
        username: 'alina.altynbaeva.00@mail.ru',
        password: '1234567890'
      }, 
      {
        headers: headers
      })
      .then( (response) => {
        //console.log(response.data);
        localStorage.setItem('access_token', response.data.access_token)
        headers.Authorization = response.data.access_token
      })
      .catch( (error) => {
        console.log(error);
      });
      return headers
   }