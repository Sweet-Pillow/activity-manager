import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddActivityScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [responsible, setResponsible] = useState('');
    const [date, setDate] = useState(new Date());
    const [dateActivity, setDateActivity] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [description, setDescription] = useState('');

    const toggleDatePicker = () => {
        setShowPicker(!showPicker)
    }

    const onChange = ({ type }, selectedDate) => {
        if (type == "set") {
            const currentDate = selectedDate;
            setDate(currentDate);

            if(Platform.OS === "android"){
                
                toggleDatePicker();
                console.log(selectedDate)
                setDateActivity(formatDate(date));
            }
        } else {
            toggleDatePicker();
        }
    }

    const formatDate = (rawDate) => {

        let date = new Date(rawDate);

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        return `${day}/${month}/${year}`
    }

    const handleSave = async () => {
        if (!name) {
            Alert.alert('Erro', 'O campo Nome da Atividade é obrigatorio');
            return;
        }
        if (!responsible) {
            Alert.alert('Erro', 'O campo Responsavel é obrigatorio');
            return;
        }
        if (!dateActivity) {
            Alert.alert('Erro', 'O campo Data é obrigatorio');
            return;
        }

        const newActivity = {
            id: Date.now().toString(),
            name,
            responsible,
            date,
            description,
            completed: false,

        };

        const storedActivities = await AsyncStorage.getItem('activities');
        const activities = storedActivities ? JSON.parse(storedActivities) : [];
        activities.push(newActivity);
        await AsyncStorage.setItem('activities', JSON.stringify(activities));

        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nome da Atividade"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Responsável"
                value={responsible}
                onChangeText={setResponsible}
            />
            <Pressable
                onPress={toggleDatePicker}>
                <TextInput
                    style={styles.input}
                    placeholder="Data"
                    value={dateActivity}
                    onChangeText={setDateActivity}
                    editable={false}
                />
            </Pressable>
            {showPicker && (<DateTimePicker
                mode='date'
                display='spinner'
                value={date}
                onChange={onChange}
            />)}
            <TextInput
                style={styles.input}
                placeholder="Descrição"
                value={description}
                onChangeText={setDescription}
                multiline
            />
            <Button title="Salvar" onPress={handleSave} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    input: { marginBottom: 16, padding: 8, borderWidth: 1, borderColor: '#ccc' },
});

export default AddActivityScreen;