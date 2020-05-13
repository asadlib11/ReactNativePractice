import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, FlatList, ActivityIndicator, View, TextInput, SafeAreaView } from 'react-native';
import * as Contacts from 'expo-contacts';

const ContactsPage = (props) => {
  const [isLoading, setIsloading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [inMemoryContacts, setInMemoryContacts] = useState([]);
  
  useEffect(() => {
    (async () => {
        setIsloading(true);
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers],
            });
            setContacts(data);
            setInMemoryContacts(data);
            setIsloading(false);
            console.log("contacts",data.length);
        }
    })();
  }, []);

  const searchContacts=(value)=>{
    const filteredContacts = inMemoryContacts.filter(
        contact => {
            let contactLowercase = (contact.firstName+' '+contact.lastName).toLowerCase();
            let searchTermLowercase = value.toLowerCase();
            return contactLowercase.indexOf(searchTermLowercase) > -1
        }
    ); 
    setContacts(filteredContacts);
  }

  const renderItem = ({item}) => {
    // console.log(item.phoneNumbers[0].digits);
    return(
        <View style={{minHeight:70, padding:5}}>
            <Text style={{color:'#bada55', fontWeight:'bold', fontSize:26}}>
                {item.firstName + ' '}{item.lastName}
            </Text>
            <Text style={{color:'white', fontWeight:'bold'}} >
                {item.phoneNumbers && item.phoneNumbers[0] && item.phoneNumbers[0].digits}
            </Text>
        </View>
    )
  }

  return (
    <View style={{flex:1}}>
        <SafeAreaView style={{backgroundColor: '#2f363c'}} />
        <TextInput
            placeholder="Search"
            placeholderTextColor="#dddddd"
            style={{backgroundColor: '#2f363c', height: 50, fontSize:36, padding:10, color:'white', borderBottomWidth:0.5, borderBottomColor:'#7d90a0'}}
            onChangeText={(value)=>searchContacts(value)}
        />
        <View style={{flex:1, backgroundColor:"#2f363c"}}>
            { isLoading && 
                <View style={{...StyleSheet.absoluteFill, justifyContent:'center', alignItems:'center'}}>
                    <ActivityIndicator size="large" color="#bad555" />
                </View>
            }
            {!isLoading &&
                <FlatList
                    data={contacts}
                    renderItem={renderItem}
                    keyExtractor ={(item, index)=>index.toString()}
                    ListEmptyComponent={()=>(
                        <View style={{flex:1, alignItems:'center', marginTop:50}}>
                        <Text style={{color:'#bad555'}}>No Contacts Found</Text>
                        </View>
                    )}
                />}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ContactsPage;