import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
interface Props {
  message1: string;
  message2: string;
  showToast: boolean;
  function: () => void;
  hideToast: (value: boolean) => void;
}

export function ToastMessage(props: Props) {
  return (
    <TouchableOpacity onPress={() => props.hideToast(false)}>
    {props.showToast && setTimeout(props.function, 4000) && (
        <Animatable.View
          duration={200}
          animation={'fadeInDownBig'}
          style={{
            alignSelf: 'center',
            height: 'auto',
            width: '90%',
            position: 'absolute',
            borderRadius: 20,
            backgroundColor: '#105B74',
            padding: '4%',
            borderLeftWidth: 6,
            borderWidth: 0.5,
            borderColor: 'white',
            alignItems: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              fontWeight: 'bold',
              color: '#FFFFFF',
              fontFamily: 'AzeretMono-Regular',
            }}>
            {props.message1}
          </Text>
          <Text
            style={{
              fontSize: 11,
              fontWeight: 'normal',
              color: '#FFFFFF',
              fontFamily: 'AzeretMono-Regular',
            }}>
            {props.message2}
          </Text>
        </Animatable.View>
      )}
    </TouchableOpacity>
  );
}