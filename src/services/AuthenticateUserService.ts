//Receber o codigo via string
//Recuperar o acess token do Github (token do github)
//Recuperar infos do user no github
//Verificar se o usuario existe no DB
//--- Sim = Gera um token
//--- Não = Cria no DB, Gera um token
//---Retorna o token com as inform do user
import axios from "axios";
import prismaClient from "../prisma";
import { sign } from "jsonwebtoken";

interface IAccessTokenResponse {
  access_token: string;
}

interface IUserResponse {
  id: number;
  name: string;
  login: string;
  avatar_url: string;
}

class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";

    const { data: accessTokenResponse } =
      await axios.post<IAccessTokenResponse>(url, null, {
        params: {
          client_id: process.env.GITHUB_SECRET_ID,
          client_secret: process.env.GITHUB_SECRET_CLIENT,
          code,
        },
        headers: {
          Accept: "application/json",
        },
      });

    const response = await axios.get<IUserResponse>(
      "https://api.github.com/user",
      {
        headers: {
          authorization: `bearer ${accessTokenResponse.access_token}`,
        },
      }
    );

    const { id, login, name, avatar_url } = response.data;

    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id,
      },
    });
    if (!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: id,
          login,
          avatar_url,
          name,
        },
      });
    }
    const token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id,
        },
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );
    return { token, user };
  }
}

export { AuthenticateUserService };
