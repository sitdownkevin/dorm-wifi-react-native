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

export function ConnectCard({ config, setConfig, online, setOnline }: { config: Config, setConfig: (config: Config) => void, online: boolean, setOnline: (online: boolean) => void }) {
    const [connecting, setConnecting] = useState(false);

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
        <Card className="w-full max-w-sm p-4">
          <CardHeader className="flex flex-col">
            <Text className="text-xl font-sansSCBold">连接</Text>
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
                onChangeText={(text) =>
                  setConfig({ ...config, password: text })
                }
              />
              <Select>
                <SelectTrigger>
                  <SelectValue
                    placeholder="请选择运营商"
                    className="font"
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
    )
}