import User from "../models/userModel.js";

const updateUser = async (req, res, next) => {
  const { name, email, lastName, location } = req.body;

  try {
    if (!name || !email || !lastName || !location) {
      throw new Error("Please provide all fields");
    }

    // find user by id(if exists)
    const user = await User.findOne({ _id: req.user.userId });
    if (!user) {
      throw new Error("User not found");
    }

    // if found update users infomation

    user.name = name;
    user.lastName = lastName;
    user.email = email;
    user.location = location;

    // save the user
    await user.save();

    // gen a token
    const token = user.createJWT();

    res.status(201).send({
      success: true,
      message: "user updated successfully",
      user,
      token,
    });
  } catch (error) {
    next(new Error(error.message));
  }
};

export default updateUser;
