import React, { useState } from 'react';
import { useForm } from "react-hook-form";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  Rating } from 'react-simple-star-rating'
import photo from '../../Image/google.png'

const AddCustomerReview = () => {
    const { register, handleSubmit,reset } = useForm();
    
    const [rating, setRating] = useState(0) 
    const handleRating = (rate) => {
        setRating(rate)
      }

    const onSubmit = data => {
        reset()
        data.rating=rating
        data.pic={photo}
          fetch("http://localhost:5000/customerReviews",{
method:"POST",
headers:{
    "content-type":"application/json"
},
body:JSON.stringify(data)

        })
        .then(res=>res.json())
        .then(data=>{
            if(data.acknowledged===true){
                toast("Review Has been submit Successfully!")
            }
            
        }) 
    };

    return (
      <div className=''>
          <h2 className="py-4 text-3xl text-center text-red-500">| Share your experience with us</h2>
          <form className=" lg:p-20 p-10 flex flex-col  space-y-4 justify-center" onSubmit={handleSubmit(onSubmit)}>
          
        <input className="border-2 p-2   border-blue-900 rounded-md"  placeholder="Company Name" {...register("name", { required: true, maxLength: 100 })} />
        <textarea rows="5" cols="30" className="border-2  p-2 border-blue-900 rounded-md" placeholder="Detailed review" {...register("description")} />
     
     <Rating  onClick={handleRating} className="text-center" size={40} ratingValue={rating} /* Rating Props */ />
    
      
      <div className='flex justify-center'>

      <input className="bg-indigo-900 hover:bg-rose-600 text-white py-2 lg:w-36 cursor-pointer  rounded-lg" type="submit" />
      </div>
        <ToastContainer/>
      </form>
              </div>
      
    );
};

export default AddCustomerReview;