import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ActivityDetailScreen = ({ route }) => {
    const { activity } = route.params;

    const formatDate = (rawDate) => {

        let date = new Date(rawDate);

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        return `${day}/${month}/${year}`
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{activity.name}</Text>
            <Text>Responsável: {activity.responsible}</Text>
            <Text>Data: {formatDate(activity.date)}</Text>
            <Text>Descrição: {activity.description == "" ? "Não informada." : activity.description}</Text>
            <Text>Conclusão: {activity.completed? "✅": "❌"}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});

export default ActivityDetailScreen;