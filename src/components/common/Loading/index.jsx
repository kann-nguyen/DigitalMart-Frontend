import './Loading.scss'

const Loading = () => {
    return (
        <div className='loading-overlay loading-container'>
            <div className='loading-dot'></div>
            <div className='loading-dot'></div>
            <div className='loading-dot'></div>
        </div>
    )
}

export default Loading;