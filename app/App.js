import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Button, Text, View, TextInput} from 'react-native';
import { StackNavigator } from 'react-navigation';

let url = "http://192.168.0.54:17777/";

let buf;


class MainActivity extends Component {

  constructor(){
    super();
    this.state = {
      key: undefined,
      value: undefined,
      r:undefined
    }     
  }

    static navigationOptions =
     {
        title: 'First screen',
        header: null
     };
    
     FunctionToOpenSecondActivity = () =>
     {
        if(this.state.r){
          buf = JSON.stringify({
            key : this.state.key,
            value: this.state.value
          })
          this.props.navigation.navigate('Second');
        }        
     }

     post(){ 
      if(this.state.key && this.state.value){
        fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            key: this.state.key,
            value: this.state.value
          }),
        })
        .then((response) => this.setState({
          r: true      
        }) )
          
          .catch((error) =>{
            console.error(error);
          });
      }
    }
    
     render() {
      return (
        <View style={styles.container}> 
          <TextInput
            style={styles.lable}
            placeholder="Type you key"
            onChangeText={(text) => this.setState({
              key: text      
            })}
          />
          <TextInput
            style={styles.lable}
            placeholder="Type you value"
            onChangeText={(text) => this.setState({
              value: text      
            })}
          />
          <Button title="Send to server" onPress={() => this.post()}/>
          <Button onPress = { this.FunctionToOpenSecondActivity } title = 'Click Here To Open Second Activity'/>
        </View>
      );
    }
    }
    
    class SecondActivity extends Component
    {
      constructor(){
        super();
        this.state = {
          key: undefined,
          value:undefined
        }     
      }
      static navigationOptions =
     {
        title: 'Second screen',
        header: null
     };

     get(cb){
      if(this.state.key){
        fetch(url + this.state.key)
        .then((response) => response.json())
        .then((responseJson) => {
          cb(JSON.stringify(responseJson));
        })   
        .catch((error) =>{
          console.error(error);
        });
      }
    }
    FunctionToOpenSecondActivity = () =>
     {      
        this.props.navigation.navigate('First');        
     }
     
     render()
     {
        return(
           <View style = { styles.container }>

           <Button title="Get from server" onPress={() => this.get((r)=>{
            this.setState({
              value: r      
            })
          })}/>
          <Text>{this.state.value}</Text>
           <TextInput
            style={styles.lable}
            placeholder="Type you key"
            onChangeText={(text) => this.setState({
              key: text      
            })}
          />                          
                <Text>{buf}</Text>                 
                <Button onPress = { this.FunctionToOpenSecondActivity } title = 'Back'/>
           </View>
        );
     }
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lable:{    
    height: 40,
    width: 100   
  }
});



export default Project = StackNavigator(
  {
   First: { screen: MainActivity },
   
   Second: { screen: SecondActivity }
  });
