import * as React from "react";
import { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Config } from "~/lib/types";
import { Text } from "~/components/ui/text";
import { ConnectCard } from "~/components/ConnectCard";
import { LogCard } from "~/components/LogCard";
import { DeviceListCard } from "~/components/DeviceListCard";
import { getStatus } from "~/lib/network/getStatus";

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
  const [online, setOnline] = useState<boolean>(true);
  const [config, setConfig] = useState<Config>({
    hostUrl: "172.21.0.54",
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

  useEffect(() => {
    getConfig();

    setInterval(async () => {
      const status = await getStatus(config);
      if (status.success) {
        setOnline(true);
      } else {
        setOnline(false);
      }
    }, 60000);
  }, []);

  useEffect(() => {
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
        <DeviceListCard config={config} />
        <LogCard config={config} online={online} />
        <AuthorInfo />
      </View>
    </ScrollView>
  );
}
