import propTypes from 'prop-types';
import {Image, StyleSheet} from 'react-native';
import {BACKEND_URL} from '@env';
import React from 'react';

const ImageTemplate = ({src, defaultImg, ...rest}) => {
  return (
    <Image
      {...rest}
      source={
        src
          ? src.startsWith('https')
            ? {uri: src}
            : `${BACKEND_URL}/uploads/${{uri: src}}`
          : defaultImg
      }
      style={style.eventImages}
    />
  );
};

const style = StyleSheet.create({
  eventImages: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

ImageTemplate.propTypes = {
  src: propTypes.string,
  defaultImg: propTypes.node,
};

export default ImageTemplate;
