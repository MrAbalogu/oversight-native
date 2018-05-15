import React from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import Spacer from './Spacer';

const About = () => (
  <Container>
    <Content padder>
      <Spacer size={30} />
      <Card style={{flex: 0}}>
        <CardItem>
          <Body>
            <Image source={{uri: 'http://oi67.tinypic.com/tybl.jpg'}} style={{height: 350, width: 300, flex: 1}}/>
          </Body>
        </CardItem>
      </Card>
    </Content>
  </Container>
);

export default About;
