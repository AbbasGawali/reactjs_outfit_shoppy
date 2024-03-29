
import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
    return (
        <div className='text-center'>
            <ul className="list-group">
                <h2>Dashboard</h2>
                <NavLink to={"/dashboard/user/profile"}
                    className="list-group-item  " aria-current="true">Profile</NavLink>

                <NavLink to={"/dashboard/user/orders"}
                    className="list-group-item">My Orders</NavLink>

            </ul>

        </div>
    )
}

export default UserMenu;


