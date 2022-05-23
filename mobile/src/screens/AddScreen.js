import React, { useEffect, useState, useContext } from 'react';
import {Image, ImageBackground, Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import colors from '../styles/colors';
import Screen from './Screen';
import AppText from '../components/AppText';
import Icon from 'react-native-vector-icons/Feather';
import AppInput from '../components/AppInput';
import Separator from '../components/Separator';
import ListingItem from '../components/ListingItem';
import Button from '../components/Button';

import Resource from '../components/Resource';
import Step from '../components/Step';
import AuthContext from '../ultility/context';
import categoriesApi from '../ultility/api/category';

const countries = ["Egypt", "Canada", "Australia", "Ireland"];

function AddScreen({navigation, route}) {
    const {user, accessToken} = useContext(AuthContext);
    const [desHeight, setDesHeight] = useState(30);
    const [disable, setDisable] = useState(true);
    const [title, setTitle] = useState('');
    const [des, setDes] = useState('');
    const [category, setCategory] = useState();
    const [categories, setCategories] = useState([]);
    const [resources, setResources] = useState([
        {
            description: '',
        },
    ]);
    const [steps, setSteps] = useState([
        {
            step_number: 1,
            description: '',
        },
    ]);

    useEffect( () => {
        getCategories();
    }, []);

    useEffect(() => {
        if( des && title && category) {
            let checkResource = resources.every((item) => {
                return item.description !== "";
            })
            let checkStep = steps.every((item) => {
                return item.description !== "";
            })
            if(checkResource && checkStep) {
                setDisable(false);
            }
            else {
                setDisable(true);
            }
        }
    }, [steps, resources, des, title, category]);

    const getCategories = async () => {
        const result = await categoriesApi.getCategory();
        if(!result.ok) {
            return console.log("Error when getting categories!");
        }
        setCategories(result.data);
    }

    const handleImage = () => {
        console.log('Image click');
    }

    const handleAddResource = () => {
        let newArr = resources;
        let item = {
            description: '',
        };
        newArr = [...newArr, item];
        setResources(newArr);
    }

    const handleAddStep = () => {
        let newArr = steps;
        let item = {
            step_number: newArr[newArr.length - 1].step_number + 1,
            description: '',
        };
        newArr = [...newArr, item];
        setSteps(newArr);
    }

    const handleRemoveResource = (item, index) => {
        const newArr = resources.filter((m, i) => {
            if(i != index) {
                return m;
            }
        });
        setResources(newArr);
    }

    const handleRemoveStep = (item, index) => {
        const newArr = steps.filter((m) => {
            if(m.step_number !== item.step_number) {
                return m;
            }
        });
        const tempt = newArr.map((m) => {
            if(m.step_number < item.step_number) {
                return m;
            }
            else {
                let t = {...m, step_number: m.step_number - 1};
                return t;
            }
        });
        setSteps(tempt);
    }
    
    const handleResourceChange = (text, item, index) => {
        const newResource = [...resources];
        newResource[index] = {...item};
        newResource[index].description = text;
        
        setResources(newResource);
        console.log(resources);
    }

    const handleStepChange = (text, item, index) => {
        const newStep = [...steps];
        newStep[index] = {...item};
        newStep[index].description = text;

        setSteps(newStep);
        console.log(newStep);
    }

    return (
        <Screen style={styles.screen}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* Image */}
                <View style={styles.imageContainer}>
                    <ImageBackground
                        source={{uri: '../assets/image/img_background.jpg'}}
                        style={styles.image}
                    >
                        <View
                            style={styles.overlay}
                        >
                        </View>
                        <TouchableWithoutFeedback style={styles.imageContent} onPress={handleImage}>
                            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 20}}>
                                <Icon name='camera' size={24} color={colors.text_primary} style={{marginRight: 10}} />
                                <AppText style={{color: colors.background, fontWeight: 'bold', fontSize: 20}}>Import recipe's image here</AppText>
                            </View>
                        </TouchableWithoutFeedback>
                    </ImageBackground>
                </View>

                {/* About Food */}
                <View style={styles.aboutFood} >
                    <AppInput title='Dish name' style={styles.input} value={title} onChangeText={text => setTitle(text)}/>
                    <AppInput title='Description about your dish'
                        value={des}
                        onChangeText={text => setDes(text)}
                        style={[styles.input, {height: 100}]} multiline={true}
                    />
                    <SelectDropdown
                        data={categories}
                        defaultButtonText="Select category"
                        buttonStyle={styles.picker}
                        buttonTextStyle={styles.picker_text}
                        onSelect={(selectedItem, index) => setCategory(selectedItem)}
                        buttonTextAfterSelection = {(selectedItem, index) => {
                            return selectedItem.category_name;
                        }}
                        rowTextForSelection={(item, index) => {
                            return item.category_name;
                        }}
                    />

                </View>

                {/* Resources */}
                <View style={styles.aboutFood} >
                    <Separator style={styles.separator}/>
                    <AppText style={styles.title}>Ingredients</AppText>
                    
                    {
                        // Resource logic here
                        resources.map((item, index) => {
                            return(
                                <Resource
                                    index={index}
                                    key={index}
                                    onRemoveResource={() => handleRemoveResource(item, index)}
                                    onChangeText={(text) => handleResourceChange(text, item, index)}
                                    value={item.description}
                                />
                            );
                        })
                    }
                    
                    <TouchableWithoutFeedback style={styles.imageContent} onPress={handleAddResource}>
                        <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                            <Icon name='plus-square' size={26} color={colors.text_black} style={{marginRight: 10}} />
                            <AppText style={{color: colors.secondary, fontSize: 18}}>Add New Ingredient</AppText>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                {/* Step */}
                <View style={styles.aboutFood} >
                    <Separator style={styles.separator}/>
                    <AppText style={styles.title}>Steps</AppText>
                    {
                        // Step logic here
                        steps.map((item, index) => {
                            return (
                                <Step
                                    value={item.description}
                                    item={item}
                                    index={index}
                                    key={index}
                                    onRemoveStep={() => handleRemoveStep(item, index)}
                                    onChangeText={(text) => handleStepChange(text, item, index)}
                                />
                            );
                        })
                    }

                    <TouchableWithoutFeedback style={styles.imageContent} onPress={handleAddStep}>
                        <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                            <Icon name='plus-square' size={26} color={colors.text_black} style={{marginRight: 10}} />
                            <AppText style={{color: colors.secondary, fontSize: 18}}>Add New Step</AppText>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                {/* Button */}
                {
                    disable ? (<Button style={styles.buttonDisable} title='Create' titleStyle={{fontSize: 20, fontWeight: 'normal'}} disable={true}/>)
                    : (<Button style={styles.button} title='Create' titleStyle={{fontSize: 20, fontWeight: 'normal'}}/>)
                }
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        position: 'relative',
        paddingLeft: 0,
        paddingRight: 0
    },
    imageContainer: {

    },  
    image: {
        height: 220,
        width: '100%'
    },
    overlay: {
        backgroundColor: '#000',
        height: 220,
        width: '100%',
        position: 'absolute',
        opacity: 0.5,
    },
    imageContent: {
    },
    aboutFood: {
        marginLeft: 15,
        marginRight: 15
    },
    input: {
        marginTop: 15,
        alignItems: 'flex-start',
        textAlignVertical: 'top'
    },
    separator: {
        marginTop: 30,
        marginBottom: 10
    },
    resource: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
    },
    step: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
    },
    button: {
        alignSelf: 'center',
        width: '60%',
        height: 40,
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40
    },
    buttonDisable: {
        alignSelf: 'center',
        width: '60%',
        height: 40,
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40,
        backgroundColor: colors.buttonDisable
    },
    title: {
        fontWeight: '600',
        fontSize: 24,
        marginBottom: 20
    },
    picker: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.buttonDisable,
        width: "100%",
        marginTop: 15,
    },
    picker_text: {
        color: colors.text_secondary,
        textAlign: 'left',
        marginLeft: 0,
        fontSize: 16
    }
})

export default AddScreen;