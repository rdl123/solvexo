import React, { useState ,useEffect} from 'react';
import {  GoogleLogout } from 'react-google-login';
import axios  from 'axios';
import ReactLoading from 'react-loading';


const ApiUrl = "https://api.github.com/search/repositories?q=%7Bjavascript%7D&sort=stars&order=desc"

function FetchData({clientId,onSignoutSuccess}) {
   const [data,setData] = useState([])
    useEffect(() => {
        axios.get(ApiUrl)
        .then(response =>{
        setData(response.data.items)
        })
        
    },[ApiUrl])

    return (
        <div>
             <GoogleLogout
                    clientId={clientId}
                    buttonText="Log out"
                    onLogoutSuccess={onSignoutSuccess}
                >
            </GoogleLogout>
            <table>
                <thead>
                    <tr>
                        <th>full_name</th>
                        <th>repos_url</th>
                        <th>description</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length !== 0  ?  data.slice(0,21).map(item => 
                    <tr key = {item.id}>
                        <td>{item.full_name}</td>
                        <td>{item.owner.repos_url}</td>
                        <td>{item.description}</td>
                       
                    </tr>
                    ):(<ReactLoading type="spin" color="black" height={50} width={100} />)
                    }
                </tbody>
            </table>
            
        </div>
    )
}
export default FetchData;