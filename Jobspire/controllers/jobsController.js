import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";
import moment from "moment";

// Create Jobs controller
export const createJobs = async (req, res, next) => {
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

// Get all jobs
export const getAllJobs = async (req, res, next) => {
  const jobs = await jobsModel.find({ createdBy: req.user._id });

  if (jobs.length <= 0) {
    return res.status(200).send({
      message: "No jobs created for this id",
    });
  }
  res.status(200).send({
    totalJobs: jobs.length,
    jobs,
  });
};

// update jobs controller
export const updatejobs = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;

  //validation
  if (!company || !position) {
    next("Please Provide All Fields");
  }

  const job = await jobsModel.findOne({ _id: id });

  //validation
  if (!job) {
    next(`no jobs found with this id ${id}`);
  }
  // check if authorized to edit or not (admin privledge)
  if (!req.user._id === job.createdBy.toString()) {
    next("Your Not Authorized to update this job");
    return;
  }

  const updateJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  //res
  res.status(200).json({ updateJob });
};

// ======= DELETE JOBS ===========
export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;
  //find job
  const job = await jobsModel.findOne({ _id: id });
  //validation
  if (!job) {
    next(`No Job Found With This ID ${id}`);
  }
  if (!req.user._id === job.createdBy.toString()) {
    next("Your Not Authorize to delete this job");
    return;
  }
  await job.deleteOne();
  res.status(200).json({ message: "Success, Job Deleted!" });
};

// Filter stats controller
export const jobStats = async (req, res) => {
  const stats = await jobsModel.aggregate([
    {
      // search by user job
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
  const jobStats = {
    pending: stats.pending || 0,
    reject: stats.reject || 0,
    interview: stats.interview || 0,
  };

  let monthlyApplication = await jobsModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  monthlyApplication = monthlyApplication
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  res.status(200).send({
    totalJobs: stats.length,
    stats,

    monthlyApplication,
  });
};
