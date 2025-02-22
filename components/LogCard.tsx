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

import { Config } from "~/lib/types";
import { useState } from "react";

export function LogCard({ config, online }: { config: Config, online: boolean }) {

    const [loading, setLoading] = useState(false);

    const handleRefresh = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

  return (
    <Card className="w-full max-w-sm p-4 border-gray-100">
      <CardHeader>
        <Text className="text-xl font-sansSCBold">Debug Log</Text>
      </CardHeader>
      <CardContent>
        <View className="flex flex-col gap-2">
          <View className="flex flex-row justify-between">
            <Text className="font-bold">账号</Text>
            <Text>{config.account}</Text>
          </View>
          <View className="flex flex-row justify-between">
            <Text className="font-bold">密码</Text>
            <Text>{config.password}</Text>
          </View>
          <View className="flex flex-row justify-between">
            <Text className="font-bold">域名</Text>
            <Text>{config.hostUrl}</Text>
          </View>
          <View className="flex flex-row justify-between">
            <Text className="font-bold">运营商</Text>
            <Text>{config.networkType}</Text>
          </View>
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
