import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import useAppwrite from '../../lib/useAppwrite'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import VideoCard from '../../components/VideoCard'
import { StatusBar } from 'expo-status-bar'
import { useGlobalContext } from '../../context/GlobalProvider'

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts)
  const { data: latestPosts } = useAppwrite(getLatestPosts)
  const { user, setUser, setIsLoggedIn } = useGlobalContext()
  const [refreshing, setrefreshing] = useState(false)

  const onRefresh = async () => {
    setrefreshing(true)
    // fetch data
    await refetch()
    setrefreshing(false)
    
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
          <View className="px-4 my-6 space-y-6">
            <View className="flex-row items-start justify-between mb-6">
              <View>
                <Text className="text-sm text-gray-100 font-pmedium">Welcome Back</Text>
                <Text className="text-2xl text-white font-psemibold">{user?.username}</Text>
              </View>
              <View className="mt-1.5">
                <Image 
                  source={images.logoSmall}
                  className="h-10 w-9"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />
            <View className="flex-1 w-full pt-5 pb-8">
              <Text className="mb-3 text-lg text-gray-100 font-pregular">Latest Videos</Text>
              <Trending posts={latestPosts ?? []}/>
            </View>
            
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}

        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
      <StatusBar style="light" />
    </SafeAreaView>
  )
}

export default Home