import React from 'react';
import { Text } from 'react-native';
import { stringLimit } from '../mlib/string';

TextLimit = ({ str, limit, endsWith }) => {
  return <Text>{stringLimit(str, limit, endsWith)}</Text>;
};

export default TextLimit;
