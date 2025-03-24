'use client'

import { useState } from 'react'
import { Menu, MenuItem, Typography, Box, Divider } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

type DropdownItem = {
  category: string
  items: string[]
}

type DropdownMenuProps = {
  label: string
  items: DropdownItem[]
}

const DropdownMenu = ({ label, items }: DropdownMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  // Open dropdown on click
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  // Close dropdown on click
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className='cursor-pointer'>
      {/* Dropdown Trigger */}
      <Box
        onClick={handleClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <Typography
          variant='body1'
          sx={{
            fontWeight: 600,
            color: 'grey.900',
            '&:hover': {
              color: 'grey.700',
            },
          }}
        >
          {label}
        </Typography>
        <KeyboardArrowDownIcon
          sx={{
            color: 'black',
            ml: 0.5,
            fontSize: '1rem',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease-in-out',
          }}
        />
      </Box>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: '99vw',
            maxWidth: 'none',
            height: '60vh',
            padding: '50px',
            backgroundColor: 'white',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            mt: '20px',
            left: 0,
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        disableAutoFocusItem
        disablePortal={false}
      >
        {items.length > 0 ? (
          items.map((group, index) => (
            <Box key={index}>
              <Typography
                variant='subtitle1'
                sx={{ fontWeight: 'bold', color: 'black', mb: 1 }}
              >
                {group.category}
              </Typography>
              {group.items.map((item, idx) => (
                <MenuItem
                  key={idx}
                  onClick={handleClose}
                  sx={{
                    color: 'black',
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 16px',
                    '&:hover': { backgroundColor: '#f5f5f5' },
                  }}
                >
                  <Typography variant='body2'>{item}</Typography>
                  {item === 'Baby Crop' && (
                    <Typography
                      variant='caption'
                      sx={{ color: 'pink', fontSize: '0.75rem' }}
                    >
                      NEW
                    </Typography>
                  )}
                  {item === 'Tracksuit' && (
                    <Typography
                      variant='caption'
                      sx={{ color: 'pink', fontSize: '0.75rem' }}
                    >
                      RESTOCKED
                    </Typography>
                  )}
                </MenuItem>
              ))}
              {index < items.length - 1 && <Divider sx={{ my: 1 }} />}
            </Box>
          ))
        ) : (
          <MenuItem onClick={handleClose}>
            <Typography variant='body2' sx={{ color: 'black' }}>
              Coming Soon
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </div>
  )
}

export default DropdownMenu
