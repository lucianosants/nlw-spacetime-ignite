import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-700">
      <Text className="text-bold text-3xl text-slate-100">
        Open up App.js to start working on your app!
      </Text>
      <StatusBar style="light" translucent />
    </View>
  )
}
