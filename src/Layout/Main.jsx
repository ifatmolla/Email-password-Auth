import { Outlet } from 'react-router-dom';
import Header from '../Components/Header';

const Main = () => {
    return (
        <div className='max-w-5xl mx-auto'>
            <Header></Header>
            <Outlet />
        </div>
    );
};

export default Main;