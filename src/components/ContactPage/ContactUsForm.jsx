import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {apiConnector}  from "../../services/apiconnector"
import { contactusEndpoint } from "../../services/apis";
import CountryCode from "../../data/countrycode.json"


                            // MAIN THING TO LEARNT - REACT USEFORM HOOK


const ContactUsForm = () => {

//ye open route h koi insaan agr login nahi h n tab bhi vo iss page pr aa skta hai
const [loading , setLoading] = useState(false);

const{
    register ,
    handleSubmit ,
    reset ,
    formState : {errors , isSubmitSuccessful}
} = useForm();

useEffect( () => {
    if(isSubmitSuccessful){
        reset({
            email:"",
            firstname:"",
            lastname:"",
            message:"",
            phoneNo:"",
        })
    }
} , [isSubmitSuccessful , reset ] ) // ye array vo array h jisme hum vo cheejen dalenge jinke change hone pr humko bakiyon ko bhi update krna hota hai

//yaha pr is data ko backend per store krenge : pura data integrated form me mil jayega logs me 
const submitContactForm = async(data) => {
   //console.log("logging data" , data);
   try {
                   setLoading(true)
    const res = await apiConnector(
      "POST",
      contactusEndpoint.CONTACT_US_API,
      data
    )
       console.log("Email Res - ", res)
                  setLoading(false)
  } 
  catch (error)
   {
     console.log("ERROR MESSAGE - ", error.message);
                  setLoading(false);
  }
}

    return(
        <form
      className="flex flex-col gap-7"
      onSubmit={handleSubmit(submitContactForm)}
    >
      <div className="flex flex-col gap-5 lg:flex-row">
                   
                      {/* first name ki div */}
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="firstname" className="lable-style">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter first name"
            className="form-style"
            {...register("firstname", { required: true })}
          />
          {
           errors.firstname && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your name. <sup>*</sup>
            </span>
           )
          }
        </div>

                     {/* last name ki div */}
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastname" className="lable-style">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Enter last name"
            className="form-style"
            {...register("lastname")}
          />
        </div>
      </div>

                              {/* email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="lable-style">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email address"
          className="form-style"
          {...register("email", { required: true })}
        />
        { 
          errors.email && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your Email address.
                </span>
        )}
      </div>

                              {/* phone no */}
      <div className="flex flex-col gap-2">
        <label htmlFor="phonenumber" className="lable-style">
          Phone Number
        </label>

        <div className="flex gap-2">
                           {/* dropdown */}
          <div className="flex w-[81px] flex-col gap-2">
            <select
              type="text"
              name="countrycode"
              id="countrycode"
              className="form-style"
              {...register("countrycode", { required: true })}
            >
              {
                CountryCode.map((ele, i) => {
                 return (
                  <option key={i} value={ele.code}>
                    {ele.code} | {ele.country}
                  </option>
                )
               })
              }
            </select>
          </div>

                               {/* phone no */}
          <div className="flex w-[calc(100%-90px)] flex-col gap-2">
            <input
              type="number"
              name="phonenumber"
              id="phonenumber"
              placeholder="12345-XXXXX"
              className="form-style"
              {
                ...register("phoneNo", {
                  required: {
                    value: true,
                    message: "Please enter your Phone Number.",
                  },
                maxLength: { value: 12, message: "Invalid Phone Number" },
                minLength: { value: 10, message: "Invalid Phone Number" },
              })}
            />
          </div>
        </div>
        {
         errors.phoneNo && (
           <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.phoneNo.message}
           </span>
          )
        }
      </div>

                            {/* message box */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="lable-style">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="7"
          placeholder="Enter your message here ..."
          className="form-style"
          {...register("message", { required: true })}
        />
        { 
         errors.message && (
             <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your Message.
             </span>
           )
        }
      </div>

      <button
        disabled={loading}
        type="submit"
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `}
      >
        Send Message
      </button>
    </form>
    )
}

export default ContactUsForm;

//react useform hook ka use krenege aur react hook library se import krneege usko