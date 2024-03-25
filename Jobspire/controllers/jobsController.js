import jobsModel from "../models/jobsModel.js";

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
