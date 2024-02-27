import React, {useState} from "react";
import {Drawer, Icon, IconButton, List, ListItemIcon, ListItemButton, ListItemText, Menu, MenuItem} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
export default function DrawerComponent() {
    const [openDrawer, setOpenDrawer] = useState(false)
    return (
        <React.Fragment>
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <List>
                    <ListItemButton>
                        <ListItemIcon>
                            <ListItemText>School Building</ListItemText>
                        </ListItemIcon>
                    </ListItemButton>

                    <ListItemButton>
                        <ListItemIcon>
                            <ListItemText>School Funds</ListItemText>
                        </ListItemIcon>
                    </ListItemButton>

                    <ListItemButton>
                        <ListItemIcon>
                            <ListItemText>About Us</ListItemText>
                        </ListItemIcon>
                    </ListItemButton>

                    <ListItemButton>
                        <ListItemIcon>
                            <ListItemText>Admin</ListItemText>
                        </ListItemIcon>
                    </ListItemButton>
                </List>
            </Drawer>
            <IconButton sx={{color:'black', marginLeft: 'auto'}} onClick={() => setOpenDrawer(!openDrawer)}>
            <MenuIcon/>
            </IconButton>
        </React.Fragment>
    )
}