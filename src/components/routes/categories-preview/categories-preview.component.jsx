import { useSelector } from 'react-redux'
import { selectCategoriesMap, selectIsCategoriesLoading } from '../../../store/categories/category.selector'
import CategoryPreiew from '../../category-preview/category-preview.component'
import Spinner from '../../spinner/spinner.component'

const CategoriesPreview = () =>{
    const categoriesMap = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectIsCategoriesLoading)
    
    return(
        <>
            {
                isLoading ? <Spinner/>:
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title]
                    return <CategoryPreiew key={title} title={title} products={products} />
                }
            )}
        </>
        
    )

}

export default CategoriesPreview