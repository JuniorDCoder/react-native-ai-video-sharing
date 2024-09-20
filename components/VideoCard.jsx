import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { Video, ResizeMode } from 'expo-av'

const VideoCard = ({video: {title, thumbnail, video, creator: {username, avatar}}}) => {
  const [play, setplay] = useState(false)
    return (
    <View className="flex-col items-center px-9 mb-14">
        <View className="flex-row items-start gap-3">
            <View className="flex flex-row items-center justify-center-1">
                <View className="w-[46px] h-[46px] justify-center items-center p-0.5 rounded-lg border border-secondary">
                    <Image 
                        source={{uri: avatar}}
                        className="w-full h-full rounded-lg"
                        resizeMode='cover'
                    />
                </View>
                <View className="justify-center flex-1 ml-3 gap-y-1">
                    <Text numberOfLines={1} className="text-sm text-white font-psemibold ">
                        {title}
                    </Text>
                    <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
                        {username}
                    </Text>
                </View>
            </View>
            <View className="pt-2">
                <Image 
                    source={icons.menu}
                    className="w-5 h-5"
                    resizeMode='contain'
                />
            </View>
        </View>

        {play ? (
            <Video 
                source={{uri: video}}
                className="w-full mt-3 h-60 rounded-xl"
                resizeMode={ResizeMode.CONTAIN}
                useNativeControls
                shouldPlay
                onPlaybackStatusUpdate={(status) => {
                    if(status.didJustFinish) {
                        setplay(false)
                    }
                }}
            />
        ):(
            <TouchableOpacity 
                activeOpacity={0.7}
                onPress={() => setplay(true)}
                className="relative items-center justify-center w-full mt-3 h-60 rounded-xl"
            >
                <Image 
                    source={{uri: thumbnail}}
                    className="w-full h-full mt-3 rounded-xl"
                    resizeMode='cover'
                />
                <Image 
                    source={icons.play}
                    className="absolute w-12 h-12"
                    resizeMode='contain'
                />
            </TouchableOpacity>
        )
        }
    </View>
  )
}

export default VideoCard