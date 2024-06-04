//#region Native
import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {Pressable} from 'react-native';
//#endregion

//#region Component
import * as Styled from './styles';
//#endregion

//#region Externals Directorys
import {MotiTransitionProp, MotiView} from 'moti';
import {Easing} from 'react-native-reanimated';
//#endregion

export const Switch = (props: any) => {
  //#region Variables
  const trackWidth = useMemo(() => {
    return props.size * 1.5;
  }, [props.size]);

  const trackHeight = useMemo(() => {
    return props.size * 0.6;
  }, [props.size]);

  const knobSize = useMemo(() => {
    return props.size * 0.5;
  }, [props.size]);

  const transition: MotiTransitionProp = {
    type: 'timing',
    duration: 300,
    easing: Easing.out(Easing.ease),
  };
  //#endregion
  
  return (
    <Pressable onPress={props.onPress}>
      <Styled.Container>
        <MotiView
          transition={transition}
          from={{backgroundColor: props.isEnabled ? '#105B74' : '#FFFFFF'}}
          style={{
            width: trackWidth,
            height: trackHeight,
            borderRadius: trackHeight / 2,
          }}
        />
        <MotiView
          transition={transition}
          animate={{
            translateX: props.isEnabled ? trackWidth / 3.5 : -trackWidth / 3.5,
          }}
          style={{
            width: props.size / 2.2,
            height: props.size / 2.2,
            borderRadius: props.size / 2,
            backgroundColor: '#105B74',
            alignItems: 'center',
            justifyContent: 'center',
            bottom: '50%',
          }}>
          <MotiView
            style={{
              width: knobSize,
              height: knobSize,
              borderRadius: knobSize / 2,
              borderWidth: props.size / 14,
              borderColor: props.isEnabled ? '#FFFFFF' : '#105B74',
              backgroundColor: props.isEnabled ? '#FFFFFF' : '#105B74',
            }}
          />
        </MotiView>
      </Styled.Container>
    </Pressable>
  );
};

Switch.propTypes = {
  size: PropTypes.number,
  onPress: PropTypes.func,
  isEnabled: PropTypes.bool,
};
