import React, { useEffect } from 'react'
import MetaData from './layout/MetaData';
import { useGetProductsQuery } from '../redux/api/productApi';
import ProductItems from './product/ProductItems';
import Loader from './layout/Loader';
import toast from 'react-hot-toast';
import CustomPagination from './layout/CustomPagination';
import { useSearchParams } from 'react-router-dom';
import Filters from './layout/Filters';


function Home() {
   let [searchParams] = useSearchParams();
   const page=searchParams.get("page") || 1;
   const keyword = searchParams.get("keyword") || "";
   const min = searchParams.get("min") 
   const max = searchParams.get("max") 
   const category = searchParams.get("category") 
   const ratings = searchParams.get("ratings") 


   const params={page,keyword}
   
   min !==null && (params.min = min)
   max !==null && (params.max = max)
   category !==null && (params.category= category)
   ratings !==null && (params.ratings= ratings)

  const { data,isLoading,error,isError} = useGetProductsQuery(params);
  useEffect(()=>{
    if(isError){
      toast.error(error?.data?.message)
    }
  },[isError])

  const columnSize=keyword ? 4 : 3;

 if(isLoading) return<Loader/>
 

  console.log(data,isLoading)

  return (
      <>
      <MetaData title={"Buy Beautifull Flowers Online"}/>
      <div className="row">
        {keyword && (
          <div className='col-6 col-md-3 mt-5'>
           <Filters/>
           </div> 
        )}
        <div className={keyword? "col-6 col-md-9":"col-6 col-md-12"}>
          <h1 id="products_heading" className="text-secondary">
            {keyword ? `${data?.product?.length} Product found with Your Search Keyword: ${keyword}`:"Lateast Product"}
         
            </h1>

          <section id="products" className="mt-5">
            <div className="row">
            {data?.product?.map((product)=>(
              <ProductItems product={product} columnSize={columnSize}/>
            ))}

          
             
             
            </div>
          </section>
          <CustomPagination resPerPage={data?.resPerPage}
          filterProductCount={data?.filterProductCount}/>
        </div>
      </div>
      </>

  )
}


export default Home;
