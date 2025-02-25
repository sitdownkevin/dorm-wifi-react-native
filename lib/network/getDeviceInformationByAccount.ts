import axios, { AxiosError } from "axios";
import { Config, DeviceInfoRaw, DeviceInfo } from "~/lib/types";

export type DeviceInformationResult = {
  success: boolean;
  data?: DeviceInfo[];
  message?: string;
};

export async function getDeviceInformationByAccount(
  config: Config
): Promise<DeviceInformationResult> {
  const url: string = `http://${config.hostUrl}:801/eportal/portal/mac/find?callback=dr1002&user_account=${config.account}`;

  try {
    const response = await axios.get(url, {
      timeout: 5000,
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });
    if (response.status === 200) {
      if (process.env.NODE_ENV === "development") {
        console.log(response.data);
      }

      const match = response.data.match(/dr1002\s*\((.*)\)\s*;?/);

      try {
        const jsonData = JSON.parse(match[1]);
        const deviceInfoListRaw: DeviceInfoRaw[] = jsonData["list"];

        if (process.env.NODE_ENV === "development") {
          console.log(deviceInfoListRaw);
        }

        const data: DeviceInfo[] = deviceInfoListRaw.map((item) => {
          const formattedMac =
            item.online_mac.toUpperCase().match(/.{2}/g)?.join(":") ||
            item.online_mac;

          return {
            mac: formattedMac,
            ip: item.online_ip,
            upload: parseInt(item.uplink_bytes) / (1024 * 1024), // Convert bytes to MB
            download: parseInt(item.downlink_bytes) / (1024 * 1024), // Convert bytes to MB
            time: item.online_time,
            account: item.user_account || undefined,
          };
        });

        return {
          success: true,
          data,
        };
      } catch (error) {
        throw new Error("Error-Invalid JSON");
      }
    } else {
      throw new Error("Error-Timeout");
    }
  } catch (error) {
    if (error instanceof AxiosError && error.message === "Network Error") {
      return {
        success: false,
        message: error.request._response,
      };
    }

    if (error instanceof Error && error.message === "Error-Timeout") {
      return {
        success: false,
        message: "请求超时",
      };
    }

    if (error instanceof Error && error.message === "Error-Invalid JSON") {
      return {
        success: false,
        message: "没有找到设备",
      };
    }

    return {
      success: false,
      message: "未知错误",
    };
  }
}
