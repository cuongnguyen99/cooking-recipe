import React, {useState, useEffect, useContext} from 'react';
import {Image, ImageBackground, Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback, View, TouchableHighlight} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import ImagePicker from 'react-native-image-crop-picker';
import api from 'apisauce';

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
import foodAPI from '../ultility/api/food';
import AppLoading from './AppLoading';
import Toast from 'react-native-simple-toast';
import UploadScreen from '../components/UploadScreen';
import AppAlert from '../components/AppAlert';


function UpdateRecipeScreen({navigation, route}) {
    const {user, accessToken} = useContext(AuthContext);
    const post = route.params.item;
    const [postUpdate, setPostUpdate] = useState(post);
    const [disable, setDisable] = useState(true);
    const [title, setTitle] = useState(postUpdate.post_name);
    const [des, setDes] = useState(postUpdate.description);
    const [category, setCategory] = useState();
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState(postUpdate.images);
    const [newImage, setNewImage] = useState();
    const [resources, setResources] = useState(postUpdate.resources);
    const [steps, setSteps] = useState(postUpdate.steps);

    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const [accept, setAccept] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect( () => {
        navigation.setOptions({
            headerRight: () => (<HeaderRightButton/>)
        });
        getCategories();
    }, []);

    useEffect(() => {
        if(newImage || post != postUpdate) {
            setDisable(false);
        }
        else if(Object.is(post, postUpdate)) {
            setDisable(true);
        }
        else {
            setDisable(true);
        }
    }, [steps, resources, des, title, category, image, newImage]);

    const handleDeleteRecipe = async () => {
        setAccept(false);
        try {
            setLoading(true);
            const result = await foodAPI.deletePost(post.id, accessToken);
            if(!result.ok) {
                console.log(result.problem);
                setUploadVisible(false);
                return Toast.showWithGravity("Having some error! Please try later!", Toast.LONG, Toast.TOP);
            }
            else if(result.ok) {
                setTimeout(() => {
                    setLoading(false);
                    Toast.showWithGravity("Delete Successfully!", Toast.LONG, Toast.TOP);
                }, 3000);
                setTimeout(() => {
                    navigation.goBack();
                }, 5000);
            }
        } catch (error) {
            setLoading(false);
            console.error(error.message);
            return Toast.showWithGravity(error.message, Toast.LONG, Toast.TOP);
        }
    }

    const onUploadPress = async () => {
        try {
            setProgress(0);
            setUploadVisible(true);
            let newPost = {...postUpdate};

            if(newImage) {
                const imageUpload = [];
                const imageApi = api.create({baseURL: "https://api.cloudinary.com/v1_1/mycooknltc/"});
                for(var i=0; i<newImage.length; i++) {
                    const data = new FormData();
                    data.append("file", newImage[i]);
                    data.append("upload_preset", "bnkilven");

                    const result = await imageApi.post("image/upload", data);
                    console.log("image");

                    if(!result.ok) {
                        console.log(result.problem);
                        setUploadVisible(false);
                        return Toast.showWithGravity("Error when uploading image to server! Please try later!", Toast.LONG, Toast.TOP);
                    }
                    imageUpload.push({imgUrl: result.data.url});
                }
                newPost.images = imageUpload;
            }
            console.log(newPost);
            const rs = await foodAPI.updatePost(newPost, accessToken, progress => setProgress(progress));
            if(!rs.ok) {
                console.log(rs.problem);
                setUploadVisible(false);
                return Toast.showWithGravity("Error when updating your Recipe! Please try later!", Toast.LONG, Toast.TOP);
            }

        } catch (error) {
            setUploadVisible(false);
            console.error(error.message);
            return Toast.showWithGravity(error.message, Toast.LONG, Toast.TOP);
        }
    }

    const getCategories = async () => {
        const result = await categoriesApi.getCategory();
        if(!result.ok) {
            return console.log("Error when getting categories!");
        }
        const data = result.data;
        setCategories(result.data);
        const defaultCategory = data.find(item => {
            return item.id == post.categoryID;
        })
        setCategory(defaultCategory);
    }

    const handleImage = () => {
        let imageList = [];
        let options = {
            multiple: true,
            waitAnimationEnd: false,
            incluExif: true,
            forceJpg: true,
            mediaType: 'photo',
            compressImageQuality: 0.8,
            maxFiles: 5,
            includeBase64: true,
        }
        ImagePicker.openPicker(options).then(response => {
            response.map(item => {
                const temp = item.path.split("/");
                const filename = temp[temp.length - 1];
                imageList.push({
                    name: filename,
                    uri: item.path,
                    type: `image/${item.path.split(".")[2]}`,
                });
            });
            setNewImage(imageList);
        })
        .catch(error => console.log(error.message));
    }

    const handleCategoryChange = (selectedItem) => {
        setCategory(selectedItem);
        let newRecipe = {...postUpdate};
        newRecipe.categoryID = selectedItem.id;
        setPostUpdate(newRecipe);
    }

    const handleTitleChange = (text) => {
        setTitle(text);
        let newRecipe = {...postUpdate};
        newRecipe.post_name = text;
        setPostUpdate(newRecipe);
    }

    const handleDescriptionChange = (text) => {
        setDes(text);
        let newRecipe = {...postUpdate};
        newRecipe.description = text;
        setPostUpdate(newRecipe);
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
            stepNumber: newArr[newArr.length - 1].stepNumber + 1,
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

        let newRecipe = {...postUpdate};
        newRecipe.resources = newArr;
        setPostUpdate(newRecipe);
    }

    const handleRemoveStep = (item, index) => {
        const newArr = steps.filter((m) => {
            if(m.stepNumber !== item.stepNumber) {
                return m;
            }
        });
        const tempt = newArr.map((m) => {
            if(m.stepNumber < item.stepNumber) {
                return m;
            }
            else {
                let t = {...m, stepNumber: m.stepNumber - 1};
                return t;
            }
        });
        setSteps(tempt);

        let newRecipe = {...postUpdate};
        newRecipe.resources = tempt;
        setPostUpdate(newRecipe);
    }
    
    const handleResourceChange = (text, item, index) => {
        const newResource = [...resources];
        newResource[index] = {...item};
        newResource[index].description = text;
        
        setResources(newResource);
        
        let newRecipe = {...postUpdate};
        newRecipe.resources = resources;
        setPostUpdate(newRecipe);
    }

    const handleStepChange = (text, item, index) => {
        const newStep = [...steps];
        newStep[index] = {...item};
        newStep[index].description = text;

        setSteps(newStep);

        let newRecipe = {...postUpdate};
        newRecipe.steps = steps;
        setPostUpdate(newRecipe);
    }

    const HeaderRightButton = () => {
        return (
            <View style={styles.buttonContainer}>
                <TouchableHighlight style={styles.delete_button} underlayColor={colors.text_secondary}
                    onPress={() => setAccept(true)}
                >
                    <Icon name='trash-2' size={26} color={colors.text_black} />
                </TouchableHighlight>
            </View>
        );
    }

    return (
        <>
        <Screen style={styles.screen}>
           <ScrollView showsVerticalScrollIndicator={false}>

            {/* Image */}
            <View style={styles.imageContainer}>
                <ImageBackground
                    source={
                        newImage ? {uri: newImage[0].uri} 
                        : {uri: image[0].imgUrl}
                    }
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
                <AppInput title='Dish name' style={styles.input} value={title} onChangeText={text => handleTitleChange(text)}/>
                <AppInput title='Description about your dish'
                    value={des}
                    onChangeText={text => handleDescriptionChange(text)}
                    style={[styles.input, {height: 100}]} multiline={true}
                />
                <SelectDropdown
                    data={categories}
                    defaultButtonText="Select category"
                    defaultValue={category}
                    buttonStyle={styles.picker}
                    buttonTextStyle={styles.picker_text}
                    onSelect={(selectedItem, index) => handleCategoryChange(selectedItem)}
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
                disable ? (<Button style={styles.buttonDisable} title='Update' titleStyle={{fontSize: 20, fontWeight: 'normal'}} disable={true}/>)
                : (<Button style={styles.button} title='Update' titleStyle={{fontSize: 20, fontWeight: 'normal'}} onPress={onUploadPress}/>)
            }
            </ScrollView>
            
        </Screen>
        {
            accept ? <AppAlert show={accept} message={"Do you exactly wanna delete this recipe?"} cancelText={"No"} confirmText={"Yes"}
            onCancelPressed={() => {setAccept(false)}}
            onConfirmPressed={handleDeleteRecipe}
            /> : null
        }
        <UploadScreen
            onDone={() => {
                setUploadVisible(false);
                setTimeout(() => {
                    navigation.goBack()
                }, 2000);
            }}
            progress={progress}
            visible={uploadVisible}
        />
        {loading ? <AppLoading/> : null}
        </>
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
        color: colors.text_black,
        textAlign: 'left',
        marginLeft: 0,
        fontSize: 16
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5,
    },
    delete_button: {
        borderRadius: 5
    }
})

export default UpdateRecipeScreen;