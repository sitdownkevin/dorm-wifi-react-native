import * as React from "react";
import { View, ScrollView } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Config } from "~/lib/types";
import { Text } from "~/components/ui/text";
import { ConnectCard } from "~/components/ConnectCard";
import { LogCard } from "~/components/LogCard";
import { DeviceListCard } from "~/components/DeviceListCard";

function AuthorInfo() {
  return (
    <View className="flex flex-col items-center justify-center">
      <Text className="text-xs text-gray-300 font-sansSCThin">
        @sitdownkevin
      </Text>
    </View>
  );
}

export default function Screen() {
  const [online, setOnline] = React.useState(true);
  const [config, setConfig] = React.useState<Config>({
    hostUrl: "",
    account: "",
    password: "",
    networkType: 0,
  });

  const storeConfig = async () => {
    try {
      const jsonValue = JSON.stringify(config);
      await AsyncStorage.setItem("@config", jsonValue);
    } catch (e) {
      console.error(e);
    }
  };

  const getConfig = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@config");
      if (jsonValue) {
        setConfig(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    getConfig();
  }, []);

  React.useEffect(() => {
    storeConfig();
  }, [config]);

  return (
    <ScrollView>
      <View className="flex flex-col items-center py-6 px-5 gap-4">
        <ConnectCard
          config={config}
          setConfig={setConfig}
          online={online}
          setOnline={setOnline}
        />
        <DeviceListCard />
        <LogCard config={config} online={online} />
        <AuthorInfo />
      </View>
    </ScrollView>
  );
}
