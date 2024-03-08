import User from "../models/userModel.js";

const updateUser = async (req, res, next) => {
  const { name, email, lastName, location } = req.body;
  console.log(req.body);

  try {
    if (!name || !email || !lastName || !location) {
      throw new Error("Please provide all fields");
    }

    // find user by id(if exists)
    const user = await User.findOne({ _id: req.user._id });
    console.log(user);
    if (!user) {
      throw new Error("User not found");
    }

    // if found update users infomation

    user.name = name;
    user.lastName = lastName;
    user.email = email;
    user.location = location;

    // user.password = undefined;

    // save the user
    await user.save();

    // gen a token
    const token = user.createJWT();
    const userWithoutPassword = { ...user.toObject(), password: undefined };
    res.status(200).json({
      success: true,
      message: "user updated successfully",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    next(new Error(error.message));
  }
};

export default updateUser;
