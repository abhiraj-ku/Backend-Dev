import jobsModel from "../models/jobsModel.js";

// import mongoose from "mongoose";
const createJobs = async (req, res, next) => {
  const { company, position } = req.body;
  try {
    if (!company || !position) {
      next("Please provide All the fields");
    }
    req.body.createdBy = req.user._id;
    const job = await jobsModel.create(req.body);

    res.status(200).send({
      sucess: true,
      message: "Job created succesfully",
      job,
    });
  } catch (error) {
    next(error);
  }
};

export default createJobs;
