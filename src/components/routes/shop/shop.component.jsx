import { useEffect } from 'react'
import { useDispatch} from 'react-redux'
import {Routes, Route} from 'react-router-dom'
import './shop.styles.scss'
import CategoriesPreview from '../categories-preview/categories-preview.component'
import Category from '../category/category.component'
import { fetchCategoriesAsync } from '../../../store/categories/category.action'

const Shop = () =>{
    //-------KEEP FOR REFERENCE-------//
    //calling function to add collection & document to firestore
    // useEffect(()=>{
    //     addCollectionAndDocuments('categories',SHOP_DATA)
    // },[])
    //-------END-------//

    const dispatch = useDispatch()
    //calling function to read documents from firestore
    useEffect(()=>{
        const getCategoriesMap = async () =>{
            dispatch(fetchCategoriesAsync())
        }
        getCategoriesMap()
    },[])

    return(
       <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />
       </Routes>
            
        
    )

}

export default Shop