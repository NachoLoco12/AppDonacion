
import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';

const App = () => {
  const [pantalla, setPantalla] = useState('bienvenida'); // Estado para manejar la pantalla actual


  const [fundaciones, setFundaciones] = useState([
    { id: '1', nombre: 'Colitas Felices', tipo: 'Animales' },
    { id: '2', nombre: 'Hogar Dulce Hogar', tipo: 'Personas de la Tercera Edad' },
    { id: '3', nombre: 'Fundación Infantil', tipo: 'Niños de Bajos Recursos' },
  ]);

  const [nuevaFundacion, setNuevaFundacion] = useState('');
  const [tipoFundacion, setTipoFundacion] = useState('');

  // Pantalla Principal
  if (pantalla === 'bienvenida') {
    return (
      <View style={styles.containerBienvenida}>
        <Image source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.hGodoJK9W_Kk-i_C6wlkmQHaJ4%26pid%3DApi&f=1&ipt=8ef5885c07f04d6067da43408990f8eb1f63058d8e44b6c6ccb75e9e6dd492a3&ipo=images' }} style={styles.bienvenidaLogo} />
        <Text style={styles.bienvenidaHeader}>¡Bienvenido a ImpactBridge!</Text>
        <Text style={styles.bienvenidaTexto}>
          ImpactBridge conecta donadores con fundaciones para hacer una diferencia positiva en la sociedad.
        </Text>
        <TouchableOpacity style={styles.bienvenidaButton} onPress={() => setPantalla('principal')}>
          <Text style={styles.bienvenidaButtonText}>Ingresar como Donador</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bienvenidaButton} onPress={() => setPantalla('fundador')}>
          <Text style={styles.bienvenidaButtonText}>Ingresar como Fundador</Text>
        </TouchableOpacity>
      </View>
    );
  }

  

  // Pantalla de donadores
  if (pantalla === 'principal') {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Fundaciones Disponibles</Text>

        <FlatList
          data={fundaciones}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View>
                <Text style={styles.itemText}>{item.nombre}</Text>
                <Text style={styles.itemSubText}>Tipo: {item.tipo}</Text>
              </View>
              <TouchableOpacity style={styles.deleteButton} onPress={() => eliminarFundacion(item.id)}>
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <TouchableOpacity style={styles.homeButton} onPress={() => setPantalla('bienvenida')}>
          <Text style={styles.homeButtonText}>Volver a Inicio</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Pantalla de fundadores
  if (pantalla === 'fundador') {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Agregar Nueva Fundación</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre de la Fundación"
          value={nuevaFundacion}
          onChangeText={setNuevaFundacion}
        />

        <TextInput
          style={styles.input}
          placeholder="Tipo de Fundación"
          value={tipoFundacion}
          onChangeText={setTipoFundacion}
        />

        <TouchableOpacity style={styles.button} onPress={agregarFundacion}>
          <Text style={styles.buttonText}>Agregar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.homeButton} onPress={() => setPantalla('bienvenida')}>
          <Text style={styles.homeButtonText}>Volver a Inicio</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // agregar una nueva fundacion
  const agregarFundacion = () => {
    if (nuevaFundacion.trim() && tipoFundacion.trim()) {
      const nueva = {
        id: (fundaciones.length + 1).toString(),
        nombre: nuevaFundacion,
        tipo: tipoFundacion,
      };
      setFundaciones([...fundaciones, nueva]);
      setNuevaFundacion('');
      setTipoFundacion('');
    }
  };

  // Eliminar fundacion
  const eliminarFundacion = (id) => {
    Alert.alert(
      'Eliminar Fundación',
      '¿Estás seguro de que deseas eliminar esta fundación?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: () => setFundaciones(fundaciones.filter(f => f.id !== id)) },
      ]
    );
  };

  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9', 
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2C3E50', 
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ECF0F1', 
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#BDC3C7',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495E', 
  },
  itemSubText: {
    fontSize: 16,
    color: '#7F8C8D', 
  },
  deleteButton: {
    backgroundColor: '#E74C3C', 
        paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#BDC3C7', 
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#3498DB', 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  homeButton: {
    backgroundColor: '#16A085', 
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  containerBienvenida: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F3F4',
    padding: 20,
  },
  bienvenidaLogo: {
    width: 150,
    height: 150,
    marginBottom: 30,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: '#3498DB', 
  },
  bienvenidaHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2C3E50',
    marginBottom: 15,
  },
  bienvenidaTexto: {
    fontSize: 18,
    textAlign: 'center',
    color: '#7F8C8D',
    marginBottom: 25,
  },
  bienvenidaButton: {
    backgroundColor: '#3498DB', 
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  bienvenidaButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;

