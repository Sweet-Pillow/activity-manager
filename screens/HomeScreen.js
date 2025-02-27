import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, FlatList, Button, StyleSheet, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
    const [activities, setActivities] = useState([]);
    const [showCompleted, setShowCompleted] = useState(false);

    //   useEffect(() => {
    //     const loadActivities = async () => {
    //       const storedActivities = await AsyncStorage.getItem('activities');
    //       if (storedActivities) setActivities(JSON.parse(storedActivities));
    //     };
    //     loadActivities();
    //   }, []);

    useFocusEffect(
        React.useCallback(() => {
            // const loadActivities = async () => {
            //     const storedActivities = await AsyncStorage.clear();
            //     if (storedActivities) setActivities(JSON.parse(storedActivities));
            // };
            const loadActivities = async () => {
                const storedActivities = await AsyncStorage.getItem('activities');
                if (storedActivities) setActivities(JSON.parse(storedActivities));
            };
            loadActivities();
        }, [])
    );

    // const toggleCompleted = (id) => {
    //     const updatedActivities = activities.map((activity) =>
    //         activity.id === id ? { ...activity, completed: !activity.completed } : activity
    //     );
    //     setActivities(updatedActivities);
    //     AsyncStorage.setItem('activities', JSON.stringify(updatedActivities));
    // };

    const toggleCompleted = async (id) => {
        const updatedActivities = activities.map((activity) =>
            activity.id === id ? { ...activity, completed: !activity.completed } : activity
        );
        setActivities(updatedActivities);
        await AsyncStorage.setItem('activities', JSON.stringify(updatedActivities));
    };

    const filteredActivities = showCompleted
        ? activities.filter((activity) => activity.completed)
        : activities.filter((activity) => !activity.completed);

    return (
        <View style={styles.container}>
            <FlatList
                data={activities}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.title}>{item.name}</Text>
                        <View style={styles.switchContainer}>
                            <Text>Conclusão:</Text>
                            <Switch
                                value={item.completed || false}
                                onValueChange={() => toggleCompleted(item.id)}
                            />
                        </View>
                        <Button
                            title="Detalhes"
                            onPress={() => navigation.navigate('Detalhes da Atividade', { activity: item })}
                        />
                    </View>
                )}
            />
            <Button
                title="Adicionar Atividade"
                onPress={() => navigation.navigate('Nova Atividade')}
            />
        </View>
    );

    // return (
    //     <View style={styles.container}>
    //         <FlatList
    //             data={activities}
    //             keyExtractor={(item) => item.id}
    //             renderItem={({ item }) => (
    //                 <View style={styles.item}>
    //                     <Text style={styles.title}>{item.name}</Text>
    //                     <Button
    //                         title="Detalhes"
    //                         onPress={() => navigation.navigate('Detalhes da Atividade', { activity: item })}
    //                     />
    //                 </View>
    //             )}
    //         />
    //         <Button
    //             title="Adicionar Atividade"
    //             onPress={() => navigation.navigate('Nova Atividade')}
    //         />
    //     </View>
    // );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    item: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' },
    title: { fontSize: 18 },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
});

export default HomeScreen;