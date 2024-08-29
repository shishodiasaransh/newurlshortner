import express from "express"
import mongoose from "mongoose"

const urlSchema = mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    redirecturl:{
        type:String,
        required:true
    },
    visithistory:[{timestamps:{type:Number}}]
},
{
    timeStamps:true
}
)

const URL = mongoose.model("url",urlSchema)
export default URL

