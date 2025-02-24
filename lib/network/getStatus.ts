import { Config } from "~/lib/types";

type Status = {
    success: boolean;
    studentId: string;
    username: string;
}




export async function getStatus(config: Config): Promise<Status> {
    const url = `http://${config.hostUrl}/drcom/get_online_info`;

    if (Math.random() > 0.5) {
        const status: Status = {
            success: false,
            studentId: "2431181",
            username: "徐可",
        }
        return status;
    }


    const status: Status = {
        success: true,
        studentId: "2431181",
        username: "徐可",
    }

    return status;
}