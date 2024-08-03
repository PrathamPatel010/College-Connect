import { Message } from '../../config/types';
import ScrollableFeed from 'react-scrollable-feed';
import MessageBox from '../Message/MessageBox';
interface Props {
    messages: Message[],
}
const ScrollableChat = ({ messages }: Props) => {

    return (
        <ScrollableFeed className='bg-gray-400 overflow-y-auto'>
            {messages.map(message => <MessageBox key={message?.id} message={message} />)}
        </ScrollableFeed>
    )
}

export default ScrollableChat;