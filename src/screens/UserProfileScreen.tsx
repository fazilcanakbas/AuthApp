import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Alert, 
  ActivityIndicator, 
  Image, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

interface User {
  username: string;
  email: string;
  name?: string;
  profile_image?: string;
  createdAt?:string;
}

  const UserProfileScreen: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchUser = async () => {
        const token = await AsyncStorage.getItem('token');
        if (!token) return Alert.alert('Hata', 'Token bulunamadı');
  
        try {
          const response = await fetch("http://192.168.202.88:5000/api/auth/me", {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
  
          const data = await response.json();
  
          if (response.status === 200) {
            setUser(data);
          } else {
            Alert.alert('Hata', data.message || 'Bir hata oluştu');
          }
        } catch (err) {
          Alert.alert('Sunucu Hatası', 'Kullanıcı bilgisi alınamadı');
        } finally {
          setLoading(false);
        }
      };
  
      fetchUser();
    }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A6CF7" />
        <Text style={styles.loadingText}>Profiliniz yükleniyor...</Text>
      </View>
    );
  }


  const profileImage = user?.profile_image || require("../../assets/person.png");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <Image
              source={typeof profileImage === 'string' ? { uri: profileImage } : profileImage}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.username}>{user?.name || user?.username}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="account-circle" size={22} color="#4A6CF7" />
            <Text style={styles.sectionTitle}>Hesap Bilgileri</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Kullanıcı Adı</Text>
            <Text style={styles.infoValue}>{user?.name}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>E-posta</Text>
            <Text style={styles.infoValue}>{user?.email}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Üyelik Tarihi</Text>
            <Text style={styles.infoValue}>{user?.createdAt|| "01.01.2025"}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="settings" size={22} color="#4A6CF7" />
            <Text style={styles.sectionTitle}>Ayarlar</Text>
          </View>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <FontAwesome name="user-circle" size={18} color="#4A6CF7" />
              <Text style={styles.menuItemText}>Profili Düzenle</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color="#CBD5E1" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} 
          onPress={() => navigation.navigate("ChangePassword")}>
            <View style={styles.menuItemContent}>
              <FontAwesome name="lock" style={{marginLeft:3.5}}size={19} color="#4A6CF7" />
              <Text style={styles.menuItemText}>Şifre Değiştir</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color="#CBD5E1" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <FontAwesome name="bell" style={{marginLeft:2.5}} size={16} color="#4A6CF7" />
              <Text style={styles.menuItemText}>Bildirim Ayarları</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color="#CBD5E1" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton}
        onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#64748B',
  },
  header: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 20,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
   
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: '#fff',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 15,
  },
  email: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 5,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 10,
  },
  infoItem: {
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '500',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: '#1E293B',
    marginLeft: 12,
  },
  logoutButton: {
    backgroundColor: '#FF4D4F',
    borderRadius: 10,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginVertical: 20,
    alignItems: 'center',
    shadowColor: '#FF4D4F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
export default UserProfileScreen;