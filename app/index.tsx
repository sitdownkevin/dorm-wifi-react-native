import * as React from "react";
import { View, ScrollView } from "react-native";
import Animated, {
  FadeInUp,
  FadeOutDown,
  LayoutAnimationConfig,
} from "react-native-reanimated";
import { Info } from "~/lib/icons/Info";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Progress } from "~/components/ui/progress";
import { Text } from "~/components/ui/text";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function Screen() {
  const [online, setOnline] = React.useState(true);
  const [connecting, setConnecting] = React.useState(false);
  const [config, setConfig] = React.useState({
    hostUrl: "192.168.2.1",
    account: "2431181",
    password: "sdkxuke385A",
    networkType: 0,
  });
  const [deviceInformation, setDeviceInformation] = React.useState([
    {
      mac: "00:00:00:00:00:00",
      ip: "192.168.2.139",
      upload: "100",
      download: "100",
    },
    {
      mac: "00:00:00:00:00:00",
      ip: "192.168.2.139",
      upload: "100",
      download: "100",
    },
    {
      mac: "00:00:00:00:00:00",
      ip: "192.168.2.139",
      upload: "100",
      download: "100",
    },
    {
      mac: "00:00:00:00:00:00",
      ip: "192.168.2.139",
      upload: "100",
      download: "100",
    }
  ]);

  const handleConnect = () => {
    if (online) {
      setConnecting(true);
      setTimeout(() => {
        setConnecting(false);
        setOnline(false);
      }, 1000);
    } else {
      setConnecting(true);
      setTimeout(() => {
        setConnecting(false);
        setOnline(true);
      }, 1000);
    }
  };

  return (
    <ScrollView>
      <View className="flex flex-col items-center py-10 gap-4">
        <Card className="w-full max-w-sm p-4">
          <CardHeader className="flex flex-col">
            <CardTitle>连接</CardTitle>
          </CardHeader>
          <CardContent className="">
            <View className="flex flex-col gap-4">
              <Input
                placeholder="域名"
                value={config.hostUrl}
                onChangeText={(text) => setConfig({ ...config, hostUrl: text })}
                className="font-serif"
              />
              <Input
                placeholder="账号"
                value={config.account}
                onChangeText={(text) => setConfig({ ...config, account: text })}
                className="font-serif"
              />
              <Input
                placeholder="密码"
                secureTextEntry
                value={config.password}
                onChangeText={(text) =>
                  setConfig({ ...config, password: text })
                }
              />
              <Select>
                <SelectTrigger>
                  <SelectValue
                    placeholder="请选择运营商"
                    className="font-serif"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1" label="校园网" />
                  <SelectItem value="2" label="中国移动" />
                  <SelectItem value="3" label="中国联通" />
                  <SelectItem value="4" label="中国电信" />
                </SelectContent>
              </Select>
            </View>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onPress={handleConnect}
              disabled={connecting}
              variant={online ? "destructive" : "default"}
            >
              <Text>{online ? "断开连接" : "连接"}</Text>
            </Button>
          </CardFooter>
        </Card>

        {/* <Card className="w-full max-w-sm p-4">
        <CardHeader>
          <CardTitle>状态</CardTitle>
        </CardHeader>
        <CardContent>
          <View className="flex flex-col gap-2">
            <Text className="font-serif">{online ? "已连接" : "未连接"}</Text>
            <Text className="font-serif">账号：{config.account}</Text>
            <Text className="font-serif">密码：{config.password}</Text>
            <Text className="font-serif">域名：{config.hostUrl}</Text>
            <Text className="font-serif">运营商：{config.networkType}</Text>
          </View>
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant="outline">
            <Text>刷新</Text>
          </Button>
        </CardFooter>
      </Card> */}

        <Card className="w-full max-w-sm p-4">
          <CardHeader>
            <CardTitle>设备列表</CardTitle>
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
            <Button className="w-full" variant="outline">
              <Text>刷新</Text>
            </Button>
          </CardFooter>
        </Card>
      </View>
    </ScrollView>
  );
}
