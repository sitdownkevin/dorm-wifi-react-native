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
      const randomMac = Array(6).fill(0).map(() => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join(':');
      const randomIp = `192.168.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
      const randomUpload = Math.floor(Math.random() * 1000).toString();
      const randomDownload = Math.floor(Math.random() * 1000).toString();
      
      setDeviceInformation([
        {
          mac: randomMac,
          ip: randomIp, 
          upload: randomUpload,
          download: randomDownload,
        },
      ]);
      setLoading(false);
    }, Math.random() * 1000);
  };

  return (
    <Card className="w-full max-w-sm p-4 border-gray-100">
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
