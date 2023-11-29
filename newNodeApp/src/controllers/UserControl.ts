import { transporter } from "../middleware/authRequired";
import User from "../module/User";
import { Request, Response, NextFunction } from "express";
import brcypt from "bcrypt";

const salt = 12;
export const SignUp = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.send({
        status: 400,
        error: "user with this mail already exist..!",
      });
    } else {
      const { name, password, role, confirmpass } = req.body;
      if (password !== confirmpass) {
        res.send({
          status: 400,
          error: "Password and confirm passwrod is matched..!",
        });
      }
      const otp = await brcypt.hash(
        String(Math.floor(1000 + Math.random() * 9000)),
        10
      );
      const newUser = await new User({
        email,
        name,
        password: await brcypt.hash(password, 12),
        role,
        otp,
      });
      newUser
        .save()
        .then((response) => {
          console.log(response);
          res.send({
            status: 202,
            response: "user created No please verify your account with otp...!",
          });
        })
        .catch((error) => {
          console.log(error);
          res.send({ status: 401, error: error });
        });
    }
  } catch (error) {
    res.send({ status: 500, error: "something went wrong" + error });
  }
};

export const OtpVerfication = async (req: Request, res: Response) => {
  console.log("this all about");
  const { email } = req.body;
  const user = User.findOne({ email });
  const mailData = {
    from: "sunnapushashidhar@gmail.com",
    to: email,
    subject: "this all about",
    text: "otp is ",
    html: `<p>
    <h1>shashidhar</h1>

    </p>`,
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      res.send({
        status: 404,
        error: error.message,
      });
    } else {
      res.send({
        status: 201,
        message: info.messageId,
      });
    }
  });
};

export const SignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      //complete code her
      const { password } = req.body;
      const verfied = await brcypt.compare(password, user.password);
      if (verfied) {
        next();
      } else {
        res.send({ status: 404, message: "user credentials wrong..!" });
      }
    } else {
      res.send({
        status: 404,
        message: "user with this email id dont exist..!",
      });
    }
  } catch (error) {
    res.send({ status: 500, error: "something went wrong" + error });
  }
};
