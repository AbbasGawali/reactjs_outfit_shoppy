import React from 'react'
import { useSearch } from '../../context/search'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const SearchInput = () => {


    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("working 1 ........")
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/product/search/${values.keyword}`);
            setValues({ ...values, results: data })
            
            console.log("working 1.2 ........")
            console.log("keyword values " + values.keyword)

            navigate("/search");
        } catch (error) {
            console.log("working 1.error ........")
            console.log(error);
        }
    }
    // console.log("values is from search input");
    // console.log(values);
    return (
        <div>
            <form className="d-flex" onSubmit={handleSubmit}>
                <input className="form-control me-2"
                    value={values.keyword}
                    onChange={(e) => setValues({ ...values, keyword: e.target.value })}
                    type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchInput