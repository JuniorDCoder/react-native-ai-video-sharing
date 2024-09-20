import { View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../components/EmptyState'
import useAppwrite from '../../lib/useAppwrite'
import { getUserPosts, signOut } from '../../lib/appwrite'
import VideoCard from '../../components/VideoCard'
import { StatusBar } from 'expo-status-bar'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import InfoBox from '../../components/InfoBox'
import { router } from 'expo-router'
const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext()
  const { data: posts } = useAppwrite(()=> getUserPosts(user.$id))
  const logout = async () => {
    await signOut()

    setUser(null)
    setIsLogged(false)

    router.replace('/sign-in')
  }
  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList 
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="items-center justify-center w-full px-4 mt-6 mb-12">
            <TouchableOpacity
              onPress={logout}
              className="items-end w-full mb-10"
            >
              <Image 
                source={icons.logout}
                resizeMode='contain'
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <View className="items-center justify-center w-12 h-12 border rounded-lg border-secondary">
              <Image 
                source={{uri: user?.avatar}}
                resizeMode='cover'
                className="h-[90%] rounded-lg w-[90%]"
              />
            </View>
            <InfoBox 
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />
            <View className="flex-row mt-5">
              <InfoBox 
                title={posts.length || 0}
                subtitle="Videos"
                containerStyles="mr-10"
                titleStyles="text-xl"
              />
              <InfoBox 
                title="1.2K"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title="No Videos Found"
            subtitle="No videos found for the search query"
          />
        )}
      />
      <StatusBar style="light" />
    </SafeAreaView>
  )
}

export default Profile