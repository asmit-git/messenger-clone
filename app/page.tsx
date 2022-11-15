import { Message } from '../typings';
import ChatInput from './ChatInput'
import MessageList from './MessageList'



async function Home() {
  const data = await fetch(`${process.env.SITE_URL}/api/getMessages`).then((res) => res.json());

  const messages: Message[] =  data.messages;
  return (
    <>
      <main>
        {/* Message List */}
        <MessageList initialMessages={messages} />
        {/* Chat Input */}
        <ChatInput />
      </main>
    </>
  )
}

export default Home