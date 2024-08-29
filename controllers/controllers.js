import express from "express";
import mongoose from "mongoose";
import shortid from "shortid";
import URL from "../models/models.js";
import { render } from "ejs";

export async function posthandle(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ msg: "no url" });
  console.log(body.url);
  const shortId = shortid();
  console.log(shortId);
  await URL.create({
    shortId: shortId,
    redirecturl: body.url,
    visithistory: [],
  });
  const allurls= await URL.find({})
  return res.render("home.ejs",{id:shortId,urls:allurls})
    // .send(`shortened url is : http://localhost:8000/${shortId}`);
}


export async function redir(req, res) {
  const shortId = req.params.sid;
  console.log("The short ID is:", shortId);

  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visithistory: { timestamps: Date.now() },
        },
      },
      { new: true } // Ensure the updated document is returned
    );

    if (!entry) {
      return res.status(404).send('URL not found');
    }

    console.log("Redirecting to:", entry.redirecturl);
    return res.redirect(entry.redirecturl);
  } catch (error) {
    console.error("Error in redir function:", error);
    return res.status(500).send('Server error');
  }
}

export async function analyticsHandler(req,res){
   const shortId = req.params.sid
   console.log(shortId)
   const result = await URL.findOne({shortId})
   console.log(result.redirecturl)
   return res.status(200).json({
      total_Clicks:result.visithistory.length,
      analytics:result.visithistory,
   })
}

export async function urlgenerate(req,res){
   const allurls= await URL.find({})
   console.log(allurls)
   res.render("home.ejs",{urls:allurls})
   console.log("passed")
  
}


