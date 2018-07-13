/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,ImageBackground,ListView} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

export default class App extends Component<Props> {

  constructor(props) {
    super(props);

    //列表数据渲染
    let datas = [
      {title:'1111',age:20},
        {title:'22222',age:30},
          {title:'333333',age:40},
            {title:'444444',age:50},
    ]

    let dataSource = new ListView.DataSource({
      rowHasChanged: (row1,row2) => row1 !== row2 
    })

    this.state = {
      datas: dataSource.cloneWithRows(datas),
      test: new ListView.DataSource({       // 服务端
          rowHasChanged: (row1,row2) => row1 !== row2   
        }),
      loaded:false,
    }

    this.fetchData('http://localhost:3000/posts');

  }

  renderData(data) {
    return (
        <Text style={{color:'red'}}>{data.id} ->{data.title}</Text>
      )
  }


  fetchData(url) {   // fetch API  服务端请求
    fetch(url).
    then(res => res.json()).
    then( data => {
       if(data) {
           this.setState({
              test:this.state.test.cloneWithRows(data),
              loaded:true,
          })
       }
       
    }).
    done();

  }


  render() {
    return (
      <View style={styles.container}>
      {/*背景图片组件     Image是图片组件 postion absolute也可以设置成背景图片*/}
       <ImageBackground style={styles.backgroundImage} source={{uri:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=449224247,2721763316&fm=27&gp=0.jpg'}}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
         <Text style={styles.title}>
          <Text style={styles.test}>
         react native 
         </Text>
         text styles is here !!!~~~
         </Text>

         <Texts title={123}>
            nihao props children
         </Texts>

        
            <ListView dataSource={this.state.datas} renderRow={
              data => <Text style={{color:'red'}}>{data.title} {data.age}</Text>
            }
            />

              {/*数据渲染  也可以写到函数里来调用*/}
              <ListView dataSource={this.state.datas} renderRow={this.renderData}
            />

               <ListView dataSource={this.state.test} renderRow={this.renderData}
            />

            <Text style={{color:'red'}}>{this.state.loaded ? <Text>加载完毕</Text> : <Text>加载中...</Text> }</Text>


          <View style={[styles.item,styles.itemOne]}>
            <Text style={styles.itemText}>1222222</Text>
          </View> 

           <View style={[styles.item,styles.itemTwo]}>
            <Text style={styles.itemText}>2</Text>
          </View> 

           <View style={[styles.item,styles.itemThree]}>
            <Text style={styles.itemText}>3</Text>
          </View> 



          </ImageBackground>

      </View>
    );
  }
}


class Texts extends Component<props> {

  render() {
    return (
          <Text style={styles.itemText}>
            {this.props.children} 这里返回的是 父组件的子元素
            {this.props.title}

          </Text> 
      )
  }
}





const styles = StyleSheet.create({   //样式是可以继承的    文本组件可以事先定义好
   container: {
    flex: 1,
  //  flexDirection:'row',  并排显示
    justifyContent:'center', // 垂直居中   flex-start  flex-end
    justifyContent:'space-between',  //平均分配
    justifyContent:'space-around', // 默认宽度分配
    alignItems: 'center',  // 水平居中    flex-start flex-end
    alignItems:'flex-end', 
    backgroundColor: 'green',
   // margin:30,
   // marginTop:30,  // 上边距
    //边框
   // borderWidth:1,  // borderBottomWidth
    borderColor:'red',   // 也可以是rgba(,,,,)的形式
   // borderRadius:16, // 圆角

    //阴影
    shadowColor:'#6435c9',  // 仅ios
    shadowOpacity:0.6,
    shadowRadius:2,
    shadowOffset:{
      height:3,
      width:0,
    }

  },

  backgroundImage:{
    flex:1,
    width:'100%',
    resizeMode:'cover',//伸缩   stretch 拉伸 可能导致图像失真

  },

  itemOne:{
   // alignSelf:'flex-start',  //子元素位置
    flex:2,   // 单独的子元素大小    占的位置较大
  },
  itemTwo:{
  //  alignSelf:'center',
  },
  itemThree:{
   // alignSelf:'flex-end',   //如果并排显示用该属性 会显示在最底部
  },



  item:{
    backgroundColor:'#fff',
    borderWidth:1,
    borderColor:'red',
    width:'100%',
    marginTop:10,
    flex:1,     // 会把剩下的位置平均分配给每个子元素 高的位置
  },
  itemText:{
    fontSize:22,
    fontWeight:'200',
    color:'blue',
    padding:30,
  },

  test:{
    fontWeight:'300',
    color:'blue',
  },


  title:{
    fontSize:26,
    color:'red',
    textAlign:'center',
    fontStyle:'italic',  // 斜体
    letterSpacing:2, // 间距
    lineHeight:30,
    fontFamily:'Helvetica Neue',
    fontWeight:'300', //  100- 
    textDecorationLine:'underline',//下划线
    textDecorationLine:'line-through', //删除线
    textDecorationStyle:'double',// 下划线样式  双实线
    textDecorationStyle:'dotted', // 点实线
    textDecorationStyle:'dashed', // 点虚线

  },



  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
