import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Icon from '@expo/vector-icons/Feather'
import { Link, useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as SecureStore from 'expo-secure-store'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'

import NlwLogo from '../src/assets/nlw-spacetime-logo.svg'
import { api } from '../src/lib/api'

dayjs.locale(ptBr)

type Memory = {
  coverUrl: string
  excerpt: string
  createdAt: string
  id: string
}

export default function Memories() {
  const { bottom, top } = useSafeAreaInsets()

  const [memories, setMemories] = useState<Memory[]>([])

  const router = useRouter()

  const signOut = async () => {
    await SecureStore.deleteItemAsync('token')

    router.push('/')
  }

  const loadMemories = async () => {
    const token = await SecureStore.getItemAsync('token')

    const response = await api.get('/memories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setMemories(response.data)
  }

  useEffect(() => {
    loadMemories()
  }, [])

  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{ marginBottom: bottom, marginTop: top }}
    >
      <View className="mt-4 flex-row items-center justify-between">
        <NlwLogo />

        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={signOut}
            className="h-10 w-10 items-center justify-center rounded-full bg-red-500"
          >
            <Icon name="log-out" size={16} color="#000" />
          </TouchableOpacity>

          <Link href="/new" asChild>
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
              <Icon name="plus" size={16} color="#000" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View className="mt-6 space-y-10">
        {memories.map((memory, index) => {
          return (
            <View className="space-y-4" key={`${index} - ${memory.id}`}>
              <View className="flex-row items-center gap-2">
                <View className="h-px w-5 bg-gray-50" />
                <Text className="font-body text-xs text-gray-100">
                  {dayjs(memory.createdAt).format('D[ de ]MMM[, ]YYYY')}
                </Text>
              </View>

              <View className="space-y-4">
                <Image
                  alt=""
                  source={{
                    uri: memory.coverUrl,
                  }}
                  className="aspect-video w-full rounded-lg"
                />

                <Text className="font-body text-base leading-relaxed text-gray-100">
                  {memory.excerpt}
                </Text>

                <Link href="/memories/id" asChild>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    className="flex-row items-center gap-2"
                  >
                    <Text className="font-body text-sm text-gray-200">
                      Ler mais
                    </Text>

                    <Icon name="arrow-right" color="#9e9ea0" />
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}
