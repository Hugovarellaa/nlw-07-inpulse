import { Request, Response } from "express";
import { ProfileUserServe } from "../services/ProfileUserServe";

class ProfileUserController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;
    const service = new ProfileUserServe();

    const result = await service.execute(user_id);

    return response.json(result);
  }
}

export { ProfileUserController };
