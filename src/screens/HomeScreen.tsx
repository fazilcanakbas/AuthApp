import React ,{useState,useEffect} from 'react'
import { View, Text } from 'react-native'
import axios from 'axios';

interface UserProfile {
  username: string;
  name: string;
  email: string;
  id: string;
}


export default function HomeScreen() {
  const [userProfile, setUserProfile] = useState<UserProfile[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
  
      try {
        const userprofile = await axios.get('http://192.168.25.88:5000/api/auth/User');
        setUserProfile(userprofile.data);
      } catch (error) {
        console.error('Kullanıcıları alırken hata oluştu:', error);
      }
    };
  
    fetchUsers();
  }, []);
  
  return (
<View>
   {userProfile.map((user,index) => (
    <View  key={index}>
      <Text>{user.username}</Text>
      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
    
  
  </View>
  ))}

</View>
  )
}
