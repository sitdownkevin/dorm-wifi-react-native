import { Config } from "~/lib/types";

export async function connect(config: Config) {
    const { hostUrl, account, password, networkType } = config;
    const url = `http://${hostUrl}/drcom/login?callback=dr1003&DDDDD=${account}&upass=${password}&0MKKey=123456&R1=0&R2=&R3=${networkType}&R6=0&para=00&v6ip=&terminal_type=1&lang=zh-cn&jsVersion=4.1&v=2653&lang=zh`

    // try {
    //     const response = await fetch(url, {
    //         method: "GET",
    //         headers: {
    //             "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    //         },
    //     });
        
    // } catch (error) {
    //     console.error(error);
    // }

    if (Math.random() > 0.2) {
        return {
            success: false,
            message: "连接失败",
        };
    } else {
        return {
            success: true,
            message: url,
        };
    }

}