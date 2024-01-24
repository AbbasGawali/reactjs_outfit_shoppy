import React from 'react'

const CategoryForm = ({ handleSubmit, value, setValue }) => {
    // const [value, setValue] = ("");
    // const handleSubmit = () => {

    // }
    return (
        <div>

            <form onSubmit={handleSubmit}>
                <input type="text" className="form-control"
                    id="exampleInputEmail1" required placeholder='Enter new Category'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    aria-describedby="emailHelp" />

                <button type="submit" className="btn my-4 btn-primary">Submit</button>
            </form>

        </div>
    )
}

export default CategoryForm