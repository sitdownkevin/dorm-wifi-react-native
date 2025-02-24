import { View } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { DeviceInfo, Config } from "~/lib/types";
import { getDeviceInformationByAccount } from "~/lib/network/getDeviceInformationByAccount";
import { useState } from "react";

export function DeviceListCard({ config }: { config: Config }) {

    const [loading, setLoading] = useState(false);
  const [DeviceInfo, setDeviceInfo] = useState<
    Array<DeviceInfo>
  >([]);

  const handleRefresh = async () => {
    setLoading(true);

    const deviceInfo = await getDeviceInformationByAccount(config);

    setDeviceInfo(deviceInfo);

    setLoading(false);
  };

  return (
    <Card className="w-full max-w-sm p-4 border-gray-100">
      <CardHeader>
        <Text className="text-xl font-sansSCBold">设备列表</Text>
      </CardHeader>
      <CardContent>
        <View className="flex flex-col gap-8">
          {DeviceInfo.map((device, index) => {
            return (
              <View key={index} className="flex flex flex-col">
                <View className="flex flex-row items-center justify-between">
                  <Text className="font-bold">Mac</Text>
                  <Text>{device.mac}</Text>
                </View>
                <View className="flex flex-row items-center justify-between">
                  <Text className="font-bold">IP</Text>
                  <Text>{device.ip}</Text>
                </View>
                <View className="flex flex-row items-center justify-between">
                  <Text className="font-bold">上行/下行 (Mb)</Text>
                  <Text>
                    {device.upload.toFixed(2)}/{device.download.toFixed(2)}
                  </Text>
                </View>
                <View className="flex flex-row items-center justify-between">
                  <Text className="font-bold">登录时间</Text>
                  <Text>{device.time}</Text>
                </View>
                {device.account && (
                  <View className="flex flex-row items-center justify-between">
                    <Text className="font-bold">登录账号</Text>
                    <Text>{device.account}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline" onPress={handleRefresh} disabled={loading}>
          <Text>{loading ? "刷新中" : "刷新"}</Text>
        </Button>
      </CardFooter>
    </Card>
  );
}
