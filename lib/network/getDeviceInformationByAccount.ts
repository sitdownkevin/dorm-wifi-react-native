import axios, { AxiosError } from "axios";
import { Config, DeviceInfoRaw, DeviceInfo } from "~/lib/types";

export async function getDeviceInformationByAccount(
  config: Config
): Promise<DeviceInfo[]> {
  const url: string = `http://${config.hostUrl}:801/eportal/portal/mac/find?callback=dr1002&user_account=${config.account}`;

  try {
    const response = await axios.get(url, {
      timeout: 5000,
    });

    if (response.status === 200) {
      //   console.log(response.data);

      const match = response.data.match(/dr1002\s*\((.*)\)\s*;?/);

      try {
        const jsonData = JSON.parse(match[1]);
        const deviceInfoListRaw: DeviceInfoRaw[] = jsonData["list"];
        // console.log(deviceInfoListRaw);

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

        return data;
      } catch (error) {
        throw new Error("Error-Invalid JSON");
      }
    } else {
      throw new Error("Error-Timeout");
    }
  } catch (error) {
    if (error instanceof AxiosError && error.message === "Network Error") {
      console.log("网络错误");
    }

    if (error instanceof Error && error.message === "Error-Timeout") {
      console.log("请求超时");
    }

    if (error instanceof Error && error.message === "Error-Invalid JSON") {
      console.log("不是合法的 JSON");
    }

    console.log(error);
  }

  //   const fakeDeviceInformationList: DeviceInfoRaw[] = [
  //     {
  //       online_session: 14454,
  //       online_time: "2025-02-23 16:13:00",
  //       online_ip: "100.76.203.210",
  //       online_mac: "8ce9ee81977d",
  //       time_long: "113202",
  //       uplink_bytes: "19920314",
  //       downlink_bytes: "871927768",
  //       dhcp_host: "",
  //       device_alias: "",
  //       nas_ip: "0",
  //       user_account: "2431181",
  //       is_owner_ip: "0",
  //     },
  //     {
  //       online_session: 14523,
  //       online_time: "2025-02-23 16:57:47",
  //       online_ip: "100.76.149.234",
  //       online_mac: "f6d197b3ff3e",
  //       time_long: "110515",
  //       uplink_bytes: "100949",
  //       downlink_bytes: "688286",
  //       dhcp_host: "",
  //       device_alias: "",
  //       nas_ip: "0",
  //       user_account: "2431181",
  //       is_owner_ip: "0",
  //     },
  //     {
  //       online_session: 16681,
  //       online_time: "2025-02-24 23:39:02",
  //       online_ip: "100.76.241.47",
  //       online_mac: "a655aae8cfd0",
  //       time_long: "40",
  //       uplink_bytes: "429",
  //       downlink_bytes: "169",
  //       dhcp_host: "",
  //       device_alias: "",
  //       is_owner_ip: "0",
  //     },
  //   ];

  //   console.log(fakeDeviceInformationList);

  return [];
}
