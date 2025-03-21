import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import UploadIcon from '@mui/icons-material/Upload';

import { account } from '../config/appwrite.js';
import UploadForm from '../admin/components/UploadForm.jsx';

const TopBar = ({ onUploadSuccess }) => {
    const username = localStorage.getItem('userName');
    const [isAdmin, setIsAdmin] = useState(false);

    const [isUploadPopupOpen, setIsUploadPopupOpen] = useState(false);

    const handleOpenUploadPopup = () => {
        setIsUploadPopupOpen(true);
    };

    const handleCloseUploadPopup = () => {
        setIsUploadPopupOpen(false);
    };

    useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                const user = await account.get();
                setIsAdmin(user.labels.includes('admin'));
            } catch (error) {
            }
        };

        checkAdminStatus();
    }, []);

    const handleLogout = async () => {
        try {
            await account.deleteSession('current');
            localStorage.removeItem("userName");
            localStorage.removeItem("email");
            window.location.reload();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="flex justify-between items-center">
            <div className="text-[24px] font-bold">
                <p>Custom Sounds</p>
            </div>
            <div>
                {username ? (
                    <div className='flex flex-row gap-2 items-center'>
                        <div className='flex gap-2 items-center'>
                            <span>{username}</span>
                            |
                            <button onClick={handleLogout}>
                                <LogoutIcon />
                            </button>
                        </div>
                        {isAdmin &&
                            <div>
                                |
                                <UploadIcon onClick={handleOpenUploadPopup} className='cursor-pointer' />
                                {isUploadPopupOpen && <UploadForm onClose={handleCloseUploadPopup} onUploadSuccess={onUploadSuccess} />}
                            </div>
                        }
                    </div>
                ) : (
                    <Link to="/login" className='text-xl underline font-semibold'>Login</Link>
                )}
            </div>
        </div>
    );
}

export default TopBar;
