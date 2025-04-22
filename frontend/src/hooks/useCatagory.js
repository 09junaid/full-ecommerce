import React,{useState,useEffect} from 'react'
import axios from 'axios'
export default function useCatagory() {
  const [isCategories,setCategories] = useState([])
  const [isLoading,setIsLoading] = useState(true)

  // get categories from api
  const getCategories = async () => {
    try {
      setIsLoading(true)
      const {data}=await axios.get(`${import.meta.env.VITE_APP_API}/api/v1/category/get-catagory`)
      setCategories(data?.getAll)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      
    }finally {
          setIsLoading(false);
        }
  }
  useEffect(()=>{
    getCategories();
  },[])
 
   return {isCategories,isLoading};
}