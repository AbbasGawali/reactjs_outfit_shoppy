import React from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'

const Users = () => {
    return (
        <Layout title={"Dashboard - All Users"}>
            <div className="container-fluid custompadding py-4 my-4">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 w-75">
                        <h2>Manage Users</h2>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Users