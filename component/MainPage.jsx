import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Feather, MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '../context/ThemeContext'

const MainPage = () => {
   const navigation = useNavigation();
   const { colors } = useTheme();
   const [searchQuery, setSearchQuery] = useState('');

   // Sample tasks data - replace this with your actual tasks data source
   const tasks = [
     { id: '1', title: 'Task 1', dueDate: 'Tue, 23 10:00pm' },
     { id: '2', title: 'Task 2', dueDate: 'Tue, 23 10:00pm' },
     // Add more tasks as needed
   ];

   // Filter tasks based on search query
   const filteredTasks = tasks.filter(task => 
     task.title.toLowerCase().includes(searchQuery.toLowerCase())
   );

   return (
    <SafeAreaView style={{flex:1, backgroundColor: colors.background}}>
      <ScrollView>
        <View style={{flex:1, alignItems:'center'}}>
          {/* Header */}
          <View style={{ width:'100%', padding:30, gap:10, justifyContent:'space-between', flexDirection:'row'}}>
            <Text style={{fontSize:20, color: colors.text, fontWeight:500}}>
              Tasks
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <AntDesign name="setting" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* Search */}
          <View style={{
            backgroundColor: colors.card,
            width:'90%',
            padding:10,
            paddingLeft:20,
            borderRadius:30,
            flexDirection:'row',
            gap:10,
            alignItems:'center',
            marginVertical:10
          }}>
            <Feather name="search" size={20} color={colors.text} />
            <TextInput
              placeholder='Search for tasks'
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{
                backgroundColor: colors.card,
                padding: 4,
                width: '90%',
                color: colors.text
              }}
              placeholderTextColor={colors.text}
            />
          </View>

          {/* Tasks */}
          <View style={{marginVertical:18, gap:10, width:'90%'}}>
            {filteredTasks.length === 0 ? (
              <View style={{alignItems: 'center', justifyContent: 'center', paddingVertical: 32}}>
                <Feather name="search" size={50} color={colors.text} style={{marginBottom: 16}} />
                <Text style={{color: colors.text, fontSize: 18, textAlign: 'center'}}>
                  No tasks found
                </Text>
                <Text style={{color: colors.text, textAlign: 'center', marginTop: 8, opacity: 0.7}}>
                  Try a different search term
                </Text>
              </View>
            ) : (
              filteredTasks.map(task => (
                <View key={task.id} style={{
                  backgroundColor: colors.card,
                  padding:20,
                  paddingLeft:20,
                  borderRadius:10,
                  flexDirection:'row',
                  alignItems:'center',
                  justifyContent:'space-between'
                }}>
                  <View style={{gap:10}}>
                    <Text style={{fontSize:18, color: colors.text, fontWeight:500}}>
                      {task.title}
                    </Text>
                    <Text>
                      <Text style={{color: colors.text, fontWeight:500}}>Due:</Text>
                      <Text style={{color: colors.text}}> {task.dueDate}</Text>
                    </Text>
                  </View>
                  <View style={{flexDirection:'row', gap:25}}>
                    <TouchableOpacity hitSlop={30}>
                      <MaterialCommunityIcons name="pencil-outline" size={17} color={colors.text} />
                    </TouchableOpacity>
                    <TouchableOpacity hitSlop={10}>
                      <FontAwesome6 name="trash" size={17} color={colors.text} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>

      {/* Floating Icon */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: colors.accent,
          padding: 15,
          borderRadius: 50,
          elevation: 5
        }}
        onPress={() => navigation.navigate('NewTask')}
      >
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MainPage
