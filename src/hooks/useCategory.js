import axios from "axios";
import { useEffect, useState } from "react"


export const useCategory = () => {
    const [categories, setCategories] = useState([]);

    const getCategory = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/category/get-category`)
            setCategories(data?.category);

        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        getCategory();
    }, [])

    return categories;
}

