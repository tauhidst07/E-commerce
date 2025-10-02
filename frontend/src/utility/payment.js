import toast from "react-hot-toast";
import axiosInstance from "../api/apiConnector";



export async function payment(data,onSuccess,onFailure){ 
    try{
   const options = {
        key: data.key, // Your Razorpay test key
        amount: data.amount, // in paise
        currency: data.currency,
        name: "My Store",
        description: "Order Payment",
        order_id: data.razorpayOrderId, // order_id from backend
        handler: async function (response) {
          // This is called when payment is successful
          const verifyRes = await axiosInstance.post("/order/verify-payment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature, // send your cart/shipping info too
          });
          if (verifyRes.data.success) {
            toast.success("Payment successful!");   
            onSuccess(); 

          } else {
            toast.error("Payment verification failed!");  
            onFailure();
          }
        },
        prefill: {
          name: "curtomet name",
          email: "customer@example.com", // you can use user email
          contact:"+918084587991",
        },
        theme: {
          color: "#3399cc",
        },
      };   

    const razor = new window.Razorpay(options);
      razor.open();
     }  
      catch(err){
        console.log("error in payment",err); 
        toast.error("err in payment")
      }
}