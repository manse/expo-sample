import { useAtom } from 'jotai';
import { atomWithRefresh } from 'jotai/utils';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import { Suspense } from 'react-dom'

const usersAtom = atomWithRefresh(() => {
  return fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json());
})

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Suspense fallback={<Text>Loading...</Text>}>
        <UserList />
      </Suspense>
    </SafeAreaView>
  );
}

const UserList = () => {
  const users = useAtom(usersAtom);
  return (
    <View>
      {users.map(user => (
        <Text key={user.id}>{user.name}</Text>
    ))}
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
