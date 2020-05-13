import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';

const PostDetail = (props) => {

  const [comments, setComments] = useState([]);
  const [isShow, setIsShow] = useState(false);

  const loadComments = () => {
    setIsShow(true);
    fetch("https://jsonplaceholder.typicode.com/comments")
    .then((response)=> response.json())
    .then((json) => {
    setIsShow(false);
    setComments(json);
    });
  }

  const renderComments = () => {
    return(
        <FlatList
        data={comments}
        renderItem={({ item }) => {
          console.log("flat list"+item.id);
          if(item.postId === props.route.params.postId){
            return(
              <View style={{flex:1, alignSelf:'center', backgroundColor:'#ffffffe0', marginTop:8, width:'98%', borderColor:'#dddddd', borderWidth:1}}>
                <View style={{padding:4}}>
                  <Text style={{fontSize:16, fontWeight:"bold", color:'blue'}}>{item.name}</Text>
                  <Text style={{color:'blue'}}>
                    Email: {item.email}
                  </Text>
                  <Text>
                    {item.body}
                  </Text>
                </View>
              </View>
            )
          } else {
            return null;
          }
        }}
        keyExtractor={item => item.id+''}
      />
    );
  }

  useEffect(()=>{
    loadComments();
  }, []);

  return (
    <View>
      <View style={{flex:1, alignSelf:'center', backgroundColor:'white', width:'98%', borderColor:'#dddddd', borderWidth:1}}>
        <View style={{padding:4}}>
          <Text style={{fontSize:18, fontWeight:'bold'}}>{props.route.params.postTitle}</Text>
          <Text>{props.route.params.postBody}</Text>
        </View>
      </View>
      {isShow && <ActivityIndicator size="large" color="blue" />}
      {/* <View style={{marginBottom:3}}><Text> </Text></View> */}
      {renderComments()}
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

export default PostDetail;