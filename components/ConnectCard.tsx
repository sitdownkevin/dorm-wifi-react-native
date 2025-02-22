import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { Config } from "~/lib/types";
import { useState } from "react";
import { connect } from "~/lib/network/connect";
import { disconnect } from "~/lib/network/disconnect";

const networkTypeLabels = {
  0: '校园网',
  2: '中国移动',
  3: '中国联通',
  4: '中国电信',
}


function messageElement({ online, message }: { online: boolean, message?: string }) {
  if (message) {
    return (
      <CardDescription className={"text-gray-500"}>
        {message}
      </CardDescription>
    )
  }

  return (
    <CardDescription className={online ? "text-green-500" : "text-red-500"}>
      {online ? "已连接" : "未连接"}
    </CardDescription>
  )
}


export function ConnectCard({
  config,
  setConfig,
  online,
  setOnline,
}: {
  config: Config;
  setConfig: (config: Config) => void;
  online: boolean;
  setOnline: (online: boolean) => void;
}) {
  const [connecting, setConnecting] = useState(false);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 60,
    right: 60,
  };
  const handleConnect = async () => {
    setConnecting(true);

    if (online) {
      setMessage("断开连接中...");
      const result = await disconnect(config);
      if (result.success) {
        setOnline(false);
        setMessage(undefined);
      } else {
        // setOnline(true);
        setMessage(result.message);
      }
    } else {
      setMessage("连接中...");
      const result = await connect(config);
      
      if (result.success) {
        setOnline(true);
        setMessage(undefined);
      } else {
        setMessage(result.message);
      }
    }

    setConnecting(false);
  };

  return (
    <Card className="w-full max-w-sm px-4 border-gray-100">
      <CardHeader className="flex flex-col">
        <Text className="text-xl font-sansSCBold">连接</Text>
        {messageElement({ online, message })}
      </CardHeader>
      <CardContent className="">
        <View className="flex flex-col gap-4">
          <Input
            placeholder="域名"
            value={config.hostUrl}
            onChangeText={(text) => setConfig({ ...config, hostUrl: text })}
          />
          <Input
            placeholder="账号"
            value={config.account}
            onChangeText={(text) => setConfig({ ...config, account: text })}
          />
          <Input
            placeholder="密码"
            secureTextEntry
            value={config.password}
            onChangeText={(text) => setConfig({ ...config, password: text })}
          />
          <Select
            value={
              { value: String(config.networkType), label: networkTypeLabels[config.networkType as keyof typeof networkTypeLabels] }
            }
            onValueChange={(item,) =>
              setConfig({
                ...config,
                networkType: parseInt(item?.value || "0"),
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="请选择运营商" />
            </SelectTrigger>
            <SelectContent insets={contentInsets} className="w-full">
              <SelectGroup className="w-full">
                <SelectItem value="0" label={networkTypeLabels[0]} />
                <SelectItem value="2" label={networkTypeLabels[2]} />
                <SelectItem value="3" label={networkTypeLabels[3]} />
                <SelectItem value="4" label={networkTypeLabels[4]} />
              </SelectGroup>
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
  );
}
