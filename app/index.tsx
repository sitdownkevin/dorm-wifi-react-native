import * as React from "react";
import { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Config } from "~/lib/types";
import { Text } from "~/components/ui/text";
import { ConnectCard } from "~/components/ConnectCard";
import { LogCard } from "~/components/LogCard";
import { DeviceListCard } from "~/components/DeviceListCard";
import { Button } from "~/components/ui/button";
import { getStatus, Status, UserInfo } from "~/lib/network/getStatus";

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
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>();
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

  const fuckStatus = async () => {
      const status: Status = await getStatus(config);
      if (status.success) {
        setOnline(true);
        setUserInfo(status.userInfo);
      } else {
        setOnline(false);
        setUserInfo(undefined);
      }
  }

  useEffect(() => {
    getConfig();
    fuckStatus();
    
    // setInterval(async () => {
    //   fuckStatus();
    // }, 60000);

  }, []);

  useEffect(() => {
    storeConfig();
  }, [config]);


  useEffect(() => {
    fuckStatus();
  }, [online]);

  return (
    <ScrollView>
      <View className="flex flex-col items-center py-6 px-5 gap-4">
        {
          userInfo && (
            <View className="flex flex-col items-center gap-2">
              <Text className="text-xs text-gray-500 font-sansSCThin">您好 {userInfo?.name}</Text>
              <Text className="text-xs text-gray-500 font-sansSCThin">{userInfo?.account} - {userInfo?.ip}</Text>
            </View>
          )
        }

        <ConnectCard
          config={config}
          setConfig={setConfig}
          online={online}
          setOnline={setOnline}
        />
        <DeviceListCard config={config} />
        {/* <LogCard config={config} online={online} /> */}
        <AuthorInfo />
      </View>
    </ScrollView>
  );
}
