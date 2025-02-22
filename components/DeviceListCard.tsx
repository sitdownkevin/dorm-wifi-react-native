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

import { DeviceInformation } from "~/lib/types";
import { useState } from "react";

export function DeviceListCard() {

    const [loading, setLoading] = useState(false);
  const [deviceInformation, setDeviceInformation] = useState<
    Array<DeviceInformation>
  >([]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setDeviceInformation([
        {
          mac: "00:00:00:00:00:00",
          ip: "192.168.2.139",
          upload: "100",
          download: "100",
        },
      ]);
      setLoading(false);
    }, 2000);
  };

  return (
    <Card className="w-full max-w-sm p-4">
      <CardHeader>
        <Text className="text-xl font-sansSCBold">设备列表</Text>
      </CardHeader>
      <CardContent>
        <View className="flex flex-col gap-8">
          {deviceInformation.map((device, index) => {
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
                  <Text className="font-bold">上行/下行</Text>
                  <Text>
                    {device.upload}/{device.download}
                  </Text>
                </View>
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
