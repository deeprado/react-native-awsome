import React, {Component} from 'react';
import {Container, Header, Content, List, ListItem, Text} from 'native-base';
import Head from '../../common/Head';
export default class ListDividerExample extends Component {
  render() {
    return (
      <Container>
        <Head
          title="ListDivider"
          pushDetails={() => {
            this.props.navigation.goBack();
          }}
        />
        <Content>
          <List>
            <ListItem itemDivider>
              <Text>A</Text>
            </ListItem>
            <ListItem>
              <Text>Aaron Bennet</Text>
            </ListItem>
            <ListItem>
              <Text>Ali Connors</Text>
            </ListItem>
            <ListItem itemDivider>
              <Text>B</Text>
            </ListItem>
            <ListItem>
              <Text>Bradley Horowitz</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
