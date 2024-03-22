import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';


function TaskList() {
    
    
    const [tasks, setTasks] = useState([
        { text: 'Task 1', done: false },
        { text: 'Task 2', done: false },
    ]);
    const [number, setNumber] = useState(0);
    const [lastDoneDate, setLastDoneDate] = useState(null);

    const svgMarkup = `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 91.16 122.88"><defs><style>.cls-1{fill:#f77d02;}.cls-1,.cls-2,.cls-3{fill-rule:evenodd;}.cls-2{fill:#ffc928;}.cls-3{fill:#fff073;}</style></defs><title>flames</title><path class="cls-1" d="M14.45,35.35c1.82,14.45,4.65,25.4,9.44,29.45C24.48,30.87,43,27.4,38.18,0,53.52,3,67.77,33.33,71.36,66.15a37.5,37.5,0,0,0,6.53-19.46c13.76,15.72,21.31,56.82-.17,69.52-12.53,7.41-38.13,7.79-51.46,5.27a27.64,27.64,0,0,1-13.5-5.36c-19.2-14.66-15.17-62.25,1.69-80.77Z"/><path class="cls-2" d="M77.73,116.2h0c-8,4.74-21.42,6.61-33.51,6.67H42.45a95.69,95.69,0,0,1-16.19-1.39,27.64,27.64,0,0,1-13.5-5.36,2.43,2.43,0,0,0-.25-.2c-2.13-10.28,1.76-24,8.49-31.29a25.49,25.49,0,0,0,4.85,13.71C28.51,75.22,39.11,57,50.5,54.94c-3,19.1,11,24.21,10.62,42.45,3.56-2.85,5.66-10.57,7-20.75,9.12,9.49,13.59,26.32,9.59,39.56Z"/><path class="cls-3" d="M65.81,120.73a115,115,0,0,1-39.55.82l-1-.13c.06-5.73,2.21-12,5.47-15.73a17.18,17.18,0,0,0,2.93,8.84c1.61-14.91,8-26.63,14.88-28-1.79,12.32,6.65,15.61,6.4,27.37,2.15-1.84,3.42-6.82,4.23-13.38,4.47,5,7.09,12.84,6.63,20.19Z"/></svg>`;

    useEffect(() => {
        // Check if lastDoneDate is more than a day ago when the component mounts
        const now = new Date();
        now.setHours(0, 0, 0, 0); // Normalize to the start of the day
        if (lastDoneDate && now.getTime() - lastDoneDate.getTime() > 24 * 60 * 60 * 1000) {
            // More than a day has passed since the last task was done, so reset lastDoneDate and number
            setLastDoneDate(null);
            setNumber(0);
            // Update AsyncStorage
            AsyncStorage.multiSet([['number', '0'], ['lastDoneDate', null]]);
        }
    }, []);

    useEffect(() => {
        // Load the number and lastDoneDate from AsyncStorage when the component mounts
        AsyncStorage.multiGet(['number', 'lastDoneDate']).then(([numberResult, dateResult]) => {
            if (numberResult[1] !== null) {
                setNumber(Number(numberResult[1]));
            }
            if (dateResult[1] !== null) {
                const date = new Date(dateResult[1]);
                if (!isNaN(date)) { // Check if the date is valid
                    setLastDoneDate(date);
                }
            }
        });
    }, []);

    useEffect(() => {
        // Save the number and lastDoneDate to AsyncStorage whenever they change
        AsyncStorage.multiSet([
            ['number', String(number)],
            ['lastDoneDate', lastDoneDate ? lastDoneDate.toISOString() : ''],
        ]);
    }, [number, lastDoneDate]);

    const toggleTaskDone = index => {
        setTasks(tasks.map((task, i) => {
            if (i === index) {
                const newTask = { ...task, done: !task.done };
                if (!task.done) {
                    const now = new Date();
                    now.setHours(0, 0, 0, 0); // Normalize to the start of the day
                    if (lastDoneDate && now.getTime() === lastDoneDate.getTime()) {
                    } else {
                        setNumber(number => number + 1);
                        setLastDoneDate(now);
                        AsyncStorage.multiSet([['number', String(number + 1)], ['lastDoneDate', now.toString()]]);
                    }
                }
                return newTask;
            } else {
                return task;
            }
        }));
    };

    // ...rest of the component

    return (
        <View style={styles.taskListContainer}>
            <View style={styles.header}>
                <Text style={styles.heading}>Tasks</Text>
                <View style={styles.rightItems}>
                    <Text>{number}</Text>
                    <SvgXml xml={svgMarkup} width="20" height="20" />
                </View>
            </View>
            <View>
                {tasks.map((task, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.task}
                        onPress={() => toggleTaskDone(index)}
                    >
                        <Text style={task.done ? styles.done : null}>{task.text}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
        
    );
}

const TextBubble = ({text}) =>{
    return (
        <TouchableOpacity>
            <View style={styles.bubbleContainer}>
                <View style={styles.bubble}>  
                    <Text style={styles.text}>
                        {text}
                    </Text>
                    <View style={styles.rightArrow}></View>
                    <View style={styles.rightArrowOverlap}></View>
                </View>
                <Image
                    source={require('./assets/ghost.png')} // Adjust the path to match your file structure
                    style={styles.image2}
                />
            </View>
        </TouchableOpacity>
        
    );
}


export default function LandingPage() {
    const navigation = useNavigation();

    const navigateToOtherPage = () => {
        navigation.navigate('OtherPage');
    }
    return (
        <View style={styles.container}>
            <TaskList />
            <TouchableOpacity onPress={navigateToOtherPage} style={styles.imageContainer}>
                <Image
                    source={require('./assets/happy_man.png')} // Adjust the path to match your file structure
                    style={styles.image}
                />
            </TouchableOpacity>
            <TextBubble text="Hi! Can I help you?" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        flex: 1,
    },
    taskListContainer: {
        backgroundColor: '#ADD8E6',
        borderRadius: 10,
        padding: 10,
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    rightItems: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    task: {
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 50,
    },
    done: {
        textDecorationLine: 'line-through',
    },
    imageContainer: {
        marginTop: 20, // Add some space between the tasks and the image
    },
    image: {
        width: 227*0.8, // Adjust the dimensions as needed
        height: 310*0.8,
    },
    image2: {
        width: 100, // Adjust the dimensions as needed
        height: 92,
        alignSelf: 'flex-end',
    },
    textBubble: {
        backgroundColor: '#26252A',
        borderRadius: 20,
        padding: 10,
        margin: 10,
    },
    text: {
        fontSize: 16,
    },
    rightArrow: {
        position: "absolute",
        backgroundColor: "#0078fe",
        //backgroundColor:"red",
        width: 20,
        height: 25,
        bottom: 0,
        borderBottomLeftRadius: 25,
        right: -10
      },
      
      rightArrowOverlap: {
        position: "absolute",
        backgroundColor: "#ffffff",
        //backgroundColor:"green",
        width: 20,
        height: 35,
        bottom: -6,
        borderBottomLeftRadius: 18,
        right: -20
      },
      bubbleContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: "100%",
        paddingTop: 100,
    },
      bubble:{
        backgroundColor: "#0078fe",
                padding:10,
                marginLeft: -15,
                borderRadius: 5,
                maxWidth: '50%',
                borderRadius: 20, 
                marginRight: -15, 
                marginBottom: 50,  
      }
});