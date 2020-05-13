import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView, ScrollView, RefreshControl } from 'react-native';

const Posts = (props) => {
  const [posts, setPosts] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(()=>{
    loadPosts();
  }, [])

  const loadPosts = () => {
    setIsShow(true);
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response)=> response.json())
    .then((json) => { 
      setIsShow(false); 
      setRefreshing(false); 
      setPosts(json);
      console.log("posts",json);
    })
  }

  const renderList = () => {
    return(
        <FlatList
        data={posts}
        renderItem={({ item }) => {
          console.log("flat list"+item.id);
          return(
            <TouchableOpacity 
              style={{paddingVertical:20}}
              onPress={() => props.navigation.navigate('PostDetail', {postId: item.id, postTitle:item.title, postBody: item.body})}
            >
              <Text>Post</Text>
              <Text style={{color:'blue'}}>
                Title: {item.title}
              </Text>
              <Text>
                Desc: {item.body}
              </Text>
            </TouchableOpacity>
          )
        }}
        keyExtractor={item => item.id+''}
      />
    );
  }

  return (
          <View style={styles.container}>
            {isShow && <ActivityIndicator size="large" color="blue" />}
            <View>
              {renderList()}
            </View>
          </View>
  );
}


{/* <TouchableOpacity style={{paddingVertical:20}}>
<Text>Post</Text>
<Text>
  Title: {item.title}
</Text>
<Text>
  Desc: {item.body}
</Text>
</TouchableOpacity> */}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default Posts;