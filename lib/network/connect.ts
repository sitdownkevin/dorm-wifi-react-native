import axios, { AxiosError } from "axios";
import { Config } from "~/lib/types";

export type ConnectResult = {
  success: boolean;
  message?: string;
};

export async function connect(config: Config): Promise<ConnectResult> {
  const { hostUrl, account, password, networkType } = config;
  const url = `http://${hostUrl}/drcom/login?callback=dr1003&DDDDD=${account}&upass=${password}&0MKKey=123456&R1=0&R2=&R3=${networkType}&R6=0&para=00&v6ip=&terminal_type=1&lang=zh-cn&jsVersion=4.1&v=2653&lang=zh`;

  try {
    const response = await axios.get(url, {
      timeout: 5000,
    });

    if (response.status === 200) {
      const match = response.data.match(/dr1003\s*\((.*)\)\s*;?/);
      const jsonData = JSON.parse(match[1]);

      if (process.env.NODE_ENV === "development") {
        console.log(jsonData);
      }

      if ("result" in jsonData && jsonData.result === 1) {
        return {
          success: true,
          message: "连接成功",
        };
      } else {
        if ("msga" in jsonData && jsonData.msga === "userid error1") {
          throw Error("Error-Invalid Account");
        }

        if ("msga" in jsonData && jsonData.msga === "userid error2") {
          throw Error("Error-Invalid Passward");
        }

        if ("msga" in jsonData && jsonData.msga === "bind userid error") {
          throw Error("Error-Invalid NetworkType");
        }
      }

      throw new Error("连接失败");
    }

    throw new Error("连接失败");
  } catch (error) {
    if (error instanceof AxiosError && error.message === "Network Error") {
      return {
        success: false,
        message: "请检查 Host URL 是否正确",
      };
    }

    if (error instanceof Error && error.message === "Error-Invalid Account") {
      return {
        success: false,
        message: "账号不正确",
      };
    }

    if (
      error instanceof Error &&
      error.message === "Error-Invalid NetworkType"
    ) {
      return {
        success: false,
        message: "未绑定当前运营商",
      };
    }

    if (error instanceof Error && error.message === "Error-Invalid Passward") {
      return {
        success: false,
        message: "密码不正确",
      };
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : "未知错误",
    };
  }
}
