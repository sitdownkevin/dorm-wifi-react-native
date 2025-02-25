import axios, { AxiosError } from "axios";
import { Config } from "~/lib/types";

export type DisconnectResult = {
  success: boolean;
  message?: string;
};

export async function disconnect(config: Config): Promise<DisconnectResult> {
  const url = `http://${config.hostUrl}/drcom/logout?callback=dr1006`;

  try {
    const response = await axios.get(url);

    if (response.status === 200) {
      const match = response.data.match(/dr1006\s*\((.*)\)\s*;?/);
      const jsonData = JSON.parse(match[1]);

      console.log(jsonData);
      if ("result" in jsonData && jsonData.result === 1) {
        return {
          success: true,
          message: "断开连接成功",
        };
      } else {
        throw new Error("断开连接失败");
      }
    }

    throw new Error("断开连接失败");
  } catch (error) {
    console.error(error);

    if (error instanceof AxiosError && error.message === "Network Error") {
      return {
        success: false,
        message: "请检查 URL 是否正确",
      };
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : "未知错误",
    };
  }
}
