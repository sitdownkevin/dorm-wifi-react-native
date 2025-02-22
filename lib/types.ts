
export type Config = {
    hostUrl: string;
    account: string;
    password: string;
    networkType: number;
}


export type DeviceInformation = {
    mac: string;
    ip: string;
    upload: string;
    download: string;
}

export type DDeviceInformation = {
    online_ip: string;
    online_mac: string;
    online_session: string;
    online_upload: string;
    online_download: string;
}
    