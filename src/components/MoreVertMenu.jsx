import React, { useState } from 'react';
import { MoreVert } from '@mui/icons-material';
import { IconButton, Popover, Button } from '@mui/material';

const MoreVertMenu = ({ onDelete }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'more-menu' : undefined;

    const handleDelete = () => {
        onDelete();
        handleClose();
    };

    return (
        <div className='relative'>
            <IconButton
                aria-label="more"
                aria-controls={id}
                aria-haspopup="true"
                onClick={handleClick}
                size="small"
            >
                <MoreVert className='text-white' />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Button onClick={handleDelete}>
                    <span className='text-primary'>Delete</span>
                </Button>
            </Popover>
        </div>
    );
};

export default MoreVertMenu;
