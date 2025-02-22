import { Config } from "~/lib/types";


export async function disconnect(config: Config) {
    const url = `http://${config.hostUrl}/drcom/logout`;

    // try {
    //     const response = await fetch(url);
    // } catch (error) {
    //     console.error(error);
    // }

    if (Math.random() > 0.5) {
        return {
            success: false,
            message: "断开连接失败",
        };
    } else {
        return {
            success: true,
            message: url,
        };
    }
}