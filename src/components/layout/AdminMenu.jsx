import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <div className='text-center'>
            <ul className="list-group">
                <h2>Admin Panel</h2>
                <NavLink to={"/dashboard/admin/create-category"}
                    className="list-group-item  " aria-current="true">Create Category</NavLink>

                <NavLink to={"/dashboard/admin/create-product"}
                    className="list-group-item">Create Product</NavLink>

                {/* <NavLink to={"/dashboard/admin/users"}
                    className="list-group-item">Manage Users</NavLink> */}

                <NavLink to={"/dashboard/admin/products"}
                    className="list-group-item">Manage Products</NavLink>

                <NavLink to={"/dashboard/admin/orders"}
                    className="list-group-item">Manage Orders</NavLink>
            </ul>

        </div>
    )
}

export default AdminMenu