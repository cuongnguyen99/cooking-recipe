import React, {useEffect, useState, useContext} from 'react';
import {
  Image,
  ImageBackground,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
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
import WarningScreen from './WarningScreen';
import { useSelector } from 'react-redux';

function AddScreen({navigation, route}) {
  const user = useSelector(state => state.user_slice.user);
  const accessToken = useSelector(state => state.auth_slice.token);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setloading] = useState(false);
  const [disable, setDisable] = useState(true);
  const [title, setTitle] = useState('');
  const [des, setDes] = useState('');
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState();
  const [resources, setResources] = useState([
    {
      description: '',
    },
  ]);
  const [steps, setSteps] = useState([
    {
      stepNumber: 1,
      description: '',
    },
  ]);

  useEffect(() => {
    checkAdmin();
    getCategories();
  }, []);

  useEffect(() => {
    if (des && title && category && image) {
      let checkResource = resources.every(item => {
        return item.description !== '';
      });
      let checkStep = steps.every(item => {
        return item.description !== '';
      });
      if (checkResource && checkStep) {
        setDisable(false);
      } else {
        setDisable(true);
      }
    }
  }, [steps, resources, des, title, category, image]);

  const getCategories = async () => {
    const result = await categoriesApi.getCategory();
    if (!result.ok) {
      return console.log('Error when getting categories!');
    }
    setCategories(result.data);
  };

  const checkAdmin = () => {
    const roleArr = user.roles;
    const check = roleArr.some(item => {
      return item.id == 2;
    });
    if (check) {
      setIsAdmin(true);
    }
  };

  const onUploadPress = async () => {
    try {
      setloading(true);
      const imageUpload = [];
      const imageApi = api.create({
        baseURL: 'https://api.cloudinary.com/v1_1/mycooknltc/',
      });

      for (var i = 0; i < image.length; i++) {
        const data = new FormData();
        data.append('file', image[i]);
        data.append('upload_preset', 'bnkilven');

        const result = await imageApi.post('image/upload', data);

        if (!result.ok) {
          console.log(result.problem);
          setloading(false);
          return Toast.showWithGravity(
            'Error when uploading image to server! Please try later!',
            Toast.LONG,
            Toast.TOP,
          );
        }
        imageUpload.push({imgUrl: result.data.url});
      }

      const post = {
        post_name: title,
        description: des,
        categoryID: category.id,
      };

      const rs = await foodAPI.saveFood(post, user.username, accessToken);
      if (!rs.ok) {
        console.log(rs.problem);
        setloading(false);
        return Toast.showWithGravity(
          'Error when uploading recipe to server! Please try later!',
          Toast.LONG,
          Toast.TOP,
        );
      }

      const postID = rs.data;
      await Promise.all([
        foodAPI.saveResources(resources, postID, accessToken),
        foodAPI.saveSteps(steps, postID, accessToken),
        foodAPI.saveImages(imageUpload, postID, accessToken),
      ]);
      console.log('Successful!');
      setDes('');
      setTitle('');
      setImage(null);
      setSteps([
        {
          stepNumber: 1,
          description: '',
        },
      ]);
      setResources([
        {
          description: '',
        },
      ]);
      setCategory({});
      setDisable(true);
      setloading(false);
      Toast.showWithGravity(
        'Upload your recipe successfully!',
        Toast.LONG,
        Toast.TOP,
      );
    } catch (error) {
      console.error(error.message);
      setloading(false);
    }
  };

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
    };
    ImagePicker.openPicker(options)
      .then(response => {
        response.map(item => {
          const temp = item.path.split('/');
          const filename = temp[temp.length - 1];
          imageList.push({
            name: filename,
            uri: item.path,
            type: `image/${item.path.split('.')[2]}`,
          });
        });
        setImage(imageList);
      })
      .catch(error => console.log(error.message));
  };

  const handleAddResource = () => {
    let newArr = resources;
    let item = {
      description: '',
    };
    newArr = [...newArr, item];
    setResources(newArr);
  };

  const handleAddStep = () => {
    let newArr = steps;
    let item = {
      stepNumber: newArr[newArr.length - 1].stepNumber + 1,
      description: '',
    };
    newArr = [...newArr, item];
    setSteps(newArr);
  };

  const handleRemoveResource = (item, index) => {
    const newArr = resources.filter((m, i) => {
      if (i != index) {
        return m;
      }
    });
    setResources(newArr);
  };

  const handleRemoveStep = (item, index) => {
    const newArr = steps.filter(m => {
      if (m.stepNumber !== item.stepNumber) {
        return m;
      }
    });
    const tempt = newArr.map(m => {
      if (m.stepNumber < item.stepNumber) {
        return m;
      } else {
        let t = {...m, stepNumber: m.stepNumber - 1};
        return t;
      }
    });
    setSteps(tempt);
  };

  const handleResourceChange = (text, item, index) => {
    const newResource = [...resources];
    newResource[index] = {...item};
    newResource[index].description = text;

    setResources(newResource);
  };

  const handleStepChange = (text, item, index) => {
    const newStep = [...steps];
    newStep[index] = {...item};
    newStep[index].description = text;

    setSteps(newStep);
  };

  return (
    <>
      <Screen style={styles.screen}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Image */}
          <View style={styles.imageContainer}>
            <ImageBackground
              source={
                image
                  ? {uri: image[0].uri}
                  : {
                      uri: 'https://res.cloudinary.com/cooking-recipe/image/upload/v1653375885/canstockphoto35091073_pltq5b.jpg',
                    }
              }
              style={styles.image}>
              <View style={styles.overlay}></View>
              <TouchableWithoutFeedback
                style={styles.imageContent}
                onPress={handleImage}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: 20,
                  }}>
                  <Icon
                    name="camera"
                    size={24}
                    color={colors.text_primary}
                    style={{marginRight: 10}}
                  />
                  <AppText
                    style={{
                      color: colors.background,
                      fontWeight: 'bold',
                      fontSize: 20,
                    }}>
                    Import recipe's image here
                  </AppText>
                </View>
              </TouchableWithoutFeedback>
              { image ? (
                <View style={styles.imageIndex}>
                  <AppText style={styles.index}>+{image?.length-1}</AppText>
                </View>
              ) : null}
            </ImageBackground>
          </View>

          {/* About Food */}
          <View style={styles.aboutFood}>
            <AppInput
              title="Dish name"
              style={styles.input}
              value={title}
              onChangeText={text => setTitle(text)}
            />
            <AppInput
              title="Description about your dish"
              value={des}
              onChangeText={text => setDes(text)}
              style={[styles.input, {height: 100}]}
              multiline={true}
            />
            <SelectDropdown
              data={categories}
              defaultButtonText="Select category"
              buttonStyle={styles.picker}
              buttonTextStyle={styles.picker_text}
              onSelect={(selectedItem, index) => setCategory(selectedItem)}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.category_name;
              }}
              rowTextForSelection={(item, index) => {
                return item.category_name;
              }}
            />
          </View>

          {/* Resources */}
          <View style={styles.aboutFood}>
            <Separator style={styles.separator} />
            <AppText style={styles.title}>Ingredients</AppText>

            {
              // Resource logic here
              resources.map((item, index) => {
                return (
                  <Resource
                    index={index}
                    key={index}
                    onRemoveResource={() => handleRemoveResource(item, index)}
                    onChangeText={text =>
                      handleResourceChange(text, item, index)
                    }
                    value={item.description}
                  />
                );
              })
            }

            <TouchableWithoutFeedback
              style={styles.imageContent}
              onPress={handleAddResource}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <Icon
                  name="plus-square"
                  size={26}
                  color={colors.text_black}
                  style={{marginRight: 10}}
                />
                <AppText style={{color: colors.secondary, fontSize: 18}}>
                  Add New Ingredient
                </AppText>
              </View>
            </TouchableWithoutFeedback>
          </View>

          {/* Step */}
          <View style={styles.aboutFood}>
            <Separator style={styles.separator} />
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
                    onChangeText={text => handleStepChange(text, item, index)}
                  />
                );
              })
            }

            <TouchableWithoutFeedback
              style={styles.imageContent}
              onPress={handleAddStep}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <Icon
                  name="plus-square"
                  size={26}
                  color={colors.text_black}
                  style={{marginRight: 10}}
                />
                <AppText style={{color: colors.secondary, fontSize: 18}}>
                  Add New Step
                </AppText>
              </View>
            </TouchableWithoutFeedback>
          </View>

          {/* Button */}
          {disable ? (
            <Button
              style={styles.buttonDisable}
              title="Create"
              titleStyle={{fontSize: 20, fontWeight: 'normal'}}
              disable={true}
            />
          ) : (
            <Button
              style={styles.button}
              title="Create"
              titleStyle={{fontSize: 20, fontWeight: 'normal'}}
              onPress={onUploadPress}
            />
          )}
        </ScrollView>
      </Screen>
      {loading ? <AppLoading /> : null}
      {isAdmin ? <WarningScreen /> : null}
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    position: 'relative',
    paddingLeft: 0,
    paddingRight: 0,
  },
  imageContainer: {},
  image: {
    height: 220,
    width: '100%',
  },
  overlay: {
    backgroundColor: '#000',
    height: 220,
    width: '100%',
    position: 'absolute',
    opacity: 0.5,
  },
  imageContent: {},
  aboutFood: {
    marginLeft: 15,
    marginRight: 15,
  },
  input: {
    marginTop: 15,
    alignItems: 'flex-start',
    textAlignVertical: 'top',
  },
  separator: {
    marginTop: 30,
    marginBottom: 10,
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
    marginBottom: 40,
  },
  buttonDisable: {
    alignSelf: 'center',
    width: '60%',
    height: 40,
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
    backgroundColor: colors.buttonDisable,
  },
  title: {
    fontWeight: '600',
    fontSize: 24,
    marginBottom: 20,
  },
  picker: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.buttonDisable,
    width: '100%',
    marginTop: 15,
  },
  picker_text: {
    color: colors.text_secondary,
    textAlign: 'left',
    marginLeft: 0,
    fontSize: 16,
  },
  imageIndex: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255, 0.5)',
    padding: 2,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 15,
  },
});

export default AddScreen;
