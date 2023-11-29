"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignIn = exports.OtpVerfication = exports.SignUp = void 0;
const authRequired_1 = require("../middleware/authRequired");
const User_1 = __importDefault(require("../module/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const salt = 12;
const SignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (user) {
            res.send({
                status: 400,
                error: "user with this mail already exist..!",
            });
        }
        else {
            const { name, password, role, confirmpass } = req.body;
            const otp = yield bcrypt_1.default.hash(String(Math.floor(1000 + Math.random() * 9000)), 10);
            const newUser = yield new User_1.default({
                email,
                name,
                password: yield bcrypt_1.default.hash(password, 12),
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
    }
    catch (error) {
        res.send({ status: 500, error: "something went wrong" + error });
    }
});
exports.SignUp = SignUp;
const OtpVerfication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("this all about");
    const { email } = req.body;
    const user = User_1.default.findOne({ email });
    const mailData = {
        from: "sunnapushashidhar@gmail.com",
        to: email,
        subject: "this all about",
        text: "otp is ",
        html: `<p>
    <h1>shashidhar</h1>

    </p>`,
    };
    authRequired_1.transporter.sendMail(mailData, (error, info) => {
        if (error) {
            res.send({
                status: 404,
                error: error.message,
            });
        }
        else {
            res.send({
                status: 201,
                message: info.messageId,
            });
        }
    });
});
exports.OtpVerfication = OtpVerfication;
const SignIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (user) {
            //complete code her
            const { password } = req.body;
            const verfied = yield bcrypt_1.default.compare(password, user.password);
            if (verfied) {
            }
            else {
            }
        }
        else {
            res.send({
                status: 404,
                message: "user with this email id dont exist..!",
            });
        }
    }
    catch (error) {
        res.send({ status: 500, error: "something went wrong" + error });
    }
});
exports.SignIn = SignIn;
