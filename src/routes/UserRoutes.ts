import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import passport from "passport";

import User, { IUser } from "../models/UserModel";
import config from "../config/config";

class UserRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  async signUp(req: Request, res: Response): Promise<Response> {
    const { username, email, password } = req.body;

    if (!email || !password || !username) {
      return res
        .status(400)
        .send(
          "Por favor. Envia todos los datos [username, email and password]"
        );
    }

    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      return res.status(400).send("El usuario ya existe.");
    }
    const newUser = new User({ username, email, password });
    await newUser.save();
    return res.status(201).json(newUser);
  }

  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send("Por favor. Envia todos los datos [ email and password]");
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ msg: "El usuario no existe." });

    const createToken = (user: IUser): String => {
      return jwt.sign(
        { id: user.id, email: user.email },
        config.jwtTokenSrecreet,
        {
          expiresIn: 86000,
        }
      );
    };

    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      return res.status(200).json({
        token: createToken(user),
      });
    }

    return res
      .status(400)
      .send({ msg: "El correo o la contrase;a son inconrrecta." });
  }

  routes() {
    this.router.post("/signup", this.signUp);
    this.router.post("/signin", this.signIn);
    this.router.get(
      "/users",
      passport.authenticate("jwt", {session: false}),
      (req: Request, res: Response) => {
        res.send("Pongale ganas pp");
      }
    );
  }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;
