import './category.styles.scss'
import { useParams } from "react-router-dom"
import { useState,useEffect } from "react"
import { useSelector } from 'react-redux'
import ProductCard from "../../product-card/product-card.component"
import { selectCategoriesMap, selectIsCategoriesLoading } from '../../../store/categories/category.selector'
import Spinner from '../../spinner/spinner.component'


const Category = () =>{
    const {category} = useParams()
    const categoriesMap = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectIsCategoriesLoading)
    const [products, setProducts] = useState([])
    useEffect(()=>{
        setProducts(categoriesMap[category])
    },[category,categoriesMap])

    return (
        <>
            <h2 className='title'>{category.toUpperCase()}</h2>
            {
                isLoading ? <Spinner /> : 
                <div className="category-container">
                    {
                        products && products.map(product => <ProductCard key={product.id} product={product} />)
                    }
                </div>
            }
        </>
        
    )

}

export default Category