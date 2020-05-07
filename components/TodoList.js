import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, FlatList } from 'react-native';

const TodoList = (props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [taskArray, setTaskArray]=useState([]);
    
    const saveTask = () => {
        setTaskArray([...taskArray, {id: taskArray.length+1, title: title, desc: description}]);
    }

    const renderTask = (task) => {
        return(
            <TouchableOpacity
                    style={styles.button}
                    onPress={() => props.navigation.navigate('TaskDetail', {task: task})}
                >
                <Text style={styles.taskTitle} >{task.title}</Text>
                <br></br>
                <Text >{task.desc}</Text>
            </TouchableOpacity>
        )
    }


    const renderTodo = () => {
        return(
            <FlatList
                data={taskArray}
                renderItem={({ item }) => {
                    console.log("flat list"+item.id);
                    return(renderTask(item))
                }}
                keyExtractor={item => item.id+''}
            />
        );
    }

    return (
        <View style={styles.container}>
        <Text>Task Title</Text>
        <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 30, width:'90%' }}
            onChangeText={(text) => { setTitle(text); }}
        />
        <Text>Task Description</Text>
        <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 30, width:'90%' }}
            onChangeText={(text) => { setDescription(text); }}
        />
        <view
            style={{ width:'90%' }}
        >
            <Button
                title="Save Task"
                onPress={saveTask}
            />
        </view>
            {renderTodo()}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  taskTitle: {
      fontSize: 22,
      marginTop: 20
  }
});

export default TodoList;