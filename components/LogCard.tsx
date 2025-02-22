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
    <Card className="w-full max-w-sm p-4">
      <CardHeader>
        <Text className="text-xl font-sansSCBold">状态</Text>
      </CardHeader>
      <CardContent>
        <View className="flex flex-col gap-2">
          <Text>{online ? "已连接" : "未连接"}</Text>
          <Text>账号：{config.account}</Text>
          <Text>密码：{config.password}</Text>
          <Text>域名：{config.hostUrl}</Text>
          <Text>运营商：{config.networkType}</Text>
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
