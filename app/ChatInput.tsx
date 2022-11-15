'use client'
import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../typings';
import useSWR from "swr";
import fetcher from '../utils/fetchMessages';


function ChatInput() {
    const [input, setInput] = React.useState("");
    const { data: messages,error,mutate } = useSWR("api/getMessages",fetcher)
    
    const addMessage = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        if(!input) return;
        const messageToSend = input;        
        setInput("");
        const id = uuidv4();
        const message: Message = {
            id,
            message: messageToSend,
            created_at : Date.now(),
            username:"Elon",
            profilepic:"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQU2JRbbl3LBOm_an3eI5iplFhOoLESyBwUfmWDO49BS1EYuGUE",
            email:"test@test.com"
        }

        const uploadMessage = async () =>{
            const data = await fetch('/api/addMessage',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    message,
                })
            }).then(res => res.json());
            return [data.message,...messages!];
        };
        await mutate(uploadMessage,{
            optimisticData:[message,...messages!],
            rollbackOnError:true,
        })
       
    }

    return (
        <form onSubmit={addMessage} className='fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-x-2 border-t bg-white border-gray-100'>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Enter message here..'
                className='flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed' />
            <button
                type="submit"
                disabled={!input}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed'
            >
                Send
            </button>
        </form>
    )
}

export default ChatInput