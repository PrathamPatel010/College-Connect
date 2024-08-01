import ScrollableFeed from 'react-scrollable-feed';

const ScrollableChat = () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    return (
        <ScrollableFeed className='bg-gray-400 flex-1 overflow-y-auto'>
            {items.map((item, i) => <div key={i}>{item}</div>)}
        </ScrollableFeed>
    )
}

export default ScrollableChat;