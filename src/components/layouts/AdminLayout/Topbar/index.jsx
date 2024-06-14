import './Topbar.scss'
import { GoBell } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';
const Topbar = () => {
    const navigate = useNavigate();
    return (
        <div className="topbar">
            <div className='brand' onClick={() => navigate('/')} style={{cursor: 'pointer'}}>Digital Mart</div>
        </div>
    )
}

export default Topbar