import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function SideMenu({menuItems}) {
   

    const location=useLocation()
    const [activeMenuItem, setactiveMenuItem]=useState(location.pathname)

    const handleMenuItemClick=(menuItemsUrl)=>{
        activeMenuItem(menuItemsUrl)
    }

    return (
        <div>
            <div className="list-group mt-5 pl-4">
                {menuItems.map((menuItem, index) => (
                    <Link
                        key={index}
                        to={menuItem.url}
                        className={`fw-bold list-group-item list-group-item-action ${activeMenuItem.includes(menuItem.url) ?"active ":""}`}
                        onClick={()=>handleMenuItemClick(menuItem.url)}
                        aria-current={
                            activeMenuItem.includes(menuItem.url) ? "true ":"false"
                        }
                    >
                        <i className={`${menuItem.icon} fa-fw pe-2`}></i>{menuItem.name}

                    </Link>
                ))}
            </div>
        </div>
    );
}

export default SideMenu;
