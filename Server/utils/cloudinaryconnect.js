import cloudinary from "cloudinary"

export const connectToCloudinary = async (req,res)=>{
    try{

        

        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.API_KEY,
			api_secret: process.env.API_SECRET,
        });
        console.log("cloudinary connected brother")
    }catch(error){
        console.log(error)
        return res.json({
            msg:"cloudinary connection is failed...",
            success:false
        })
    }
}