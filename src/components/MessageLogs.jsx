import { useState, useEffect } from 'react';
import axios from 'axios';


function MessageLogs(){
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_API_LINK}/logs`)
        .then(res => {
            setMessages(res.data);
        })
        .catch(err => {
            console.log("Error retrieving message logs", err);
        })

    },[])
    
    function formatDate(date){
        let finalDate = "";
        let hasTAppeared = false;

        for(let i=0; i<date.length; i++){
            if(date[i] !== 'T' && !hasTAppeared){
                finalDate += date[i];
            }
            else if(date[i] === 'T'){
                finalDate += ' ';
                hasTAppeared = true;
            }
            else if (date[i] !== '.'){
                finalDate += date[i];
            }
            else if (date[i] === '.'){
                break;
            }
        }
        
        return finalDate+" UTC";
    }

    
    return (
    <div>
        <table>
            <thead>
            <tr>
                <th>Campaign ID</th>
                <th>Customer ID</th>
                <th>Message</th>
                <th>Status</th>
                <th>Sent At</th>
            </tr>
            </thead>
            <tbody>
            {
                messages.length > 0 ? :
                (
                  messages.map(msg => (
                    <tr key={msg.campaignId}>
                        <td>{msg.campaignId}</td> 
                        <td>{msg.customerId}</td> 
                        <td>{msg.message}</td> 
                        <td>{msg.status}</td>
                        <td>{formatDate(msg.sentAt)}</td> 
                    </tr>
                ))
                ) : (
                    <div style={{textAlign : "center"}}>No logs to display.</div>
                )
            }
            </tbody>
        </table>
    </div>
    
    );

}

export default MessageLogs;
