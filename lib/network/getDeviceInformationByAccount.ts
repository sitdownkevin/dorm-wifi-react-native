import { Config, DeviceInformation } from "~/lib/types";


export async function getDeviceInformationByAccount(config: Config): Promise<DeviceInformation[]> {
    const url = `http://${config.hostUrl}/drcom/get_device_information_by_account`;

    const fakeDeviceInformationList: DeviceInformation[] = [];

    return fakeDeviceInformationList;
}