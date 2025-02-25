import axios, { AxiosError } from "axios";
import { Config } from "~/lib/types";

export type UserInfo = {
  account: string;
  name: string;
  ip: string;
};

export type Status = {
  success: boolean;
  userInfo?: UserInfo;
  message?: string;
};

export async function getStatus(config: Config): Promise<Status> {
  const url = `http://${config.hostUrl}/`;

  try {
    const response = await axios.get(url, {
      timeout: 5000,
    });

    if (response.status === 200) {
      if (process.env.NODE_ENV === "development") {
        console.log(response.data);
      }

      const isLoggedIn =
        response.data.includes("注销页") &&
        !response.data.includes("上网登录页");

      if (isLoggedIn) {
        const nameMatch = response.data.match(/NID\s*=\s*["']([^"']+)["']/);
        const ipMatch = response.data.match(/v4ip\s*=\s*["']([^"']+)["']/);
        const accountMatch = response.data.match(/uid\s*=\s*["']([^"']+)["']/);

        const name = nameMatch ? nameMatch[1].trim() : "";
        const ip = ipMatch ? ipMatch[1].trim() : "";
        const account = accountMatch ? accountMatch[1].trim() : "";

        if (process.env.NODE_ENV === "development") {
          console.log(name);
          console.log(ip);
          console.log(account);
        }

        return {
          success: true,
          userInfo: {
            account: account,
            name: name,
            ip: ip,
          },
        };
      } else {
        throw new Error("Error-NotLoggedIn");
      }
    }

    throw new Error("Error-Unknown");
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "未知错误",
    };
  }
}
