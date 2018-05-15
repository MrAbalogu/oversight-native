// import 'isomorphic-fetch';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, RefreshControl, Image, View } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Button } from 'native-base';
// import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
// import Error from './Error';
import Spacer from './Spacer';

const REQUEST_URL = 'https://oversight-ws.herokuapp.com/api/politicians';

class RecipeListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      fetchInProgress: true,
    }
  }

  componentDidMount() {
    return fetch(REQUEST_URL)
      .then(response => response.json())
      .then((json) => {
        this.setState({
          data: json,
          fetchInProgress: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {

    const onPress = {

    };
    return (
      <Container>
        <Content padder>
          {this.state.fetchInProgress ? (
            <Loading />
          ) : (<FlatList
            numColumns={2}
            data={this.state.data}
            renderItem={({ item }) => (
              <Card transparent style={{ paddingHorizontal: 6 }}>
                <CardItem cardBody>
                  <TouchableOpacity onPress={() => onPress(item)} style={{ flex: 1 }}>
                    <Image
                      source={{ uri: item.avatar }}
                      style={{
                        height: 100,
                        width: null,
                        flex: 1,
                        borderRadius: 5,
                      }}
                    />
                  </TouchableOpacity>
                </CardItem>
                <CardItem cardBody>
                  <Body>
                    <Spacer size={2} />
                    <Text style={{ fontWeight: '800', fontSize: 10 }}>{item.name}</Text>
                    <Spacer size={15} />
                    <Button
                      block
                      bordered
                      small
                      onPress={() => onPress(item)}
                    >
                      <Text>View</Text>
                    </Button>
                    <Spacer size={5} />
                  </Body>
                </CardItem>
              </Card>
              )}
            />
          )}
          <Spacer size={20} />
        </Content>
      </Container>
    );
  }
}
// const RecipeListing = ({
//   error,
//   loading,
//   recipes,
//   reFetch,
// }) => {
//   // Loading
//   if (loading) return <Loading />;
//
//   // Error
//   if (error) return <Error content={error} />;
//
//   const keyExtractor = item => item.id;
//
//   const onPress = item => Actions.recipe({ match: { params: { id: String(item.id) } } });
//
//   return (
//     <Container>
//       <Content padder>
//         <FlatList
//           numColumns={2}
//           data={recipes}
//           renderItem={({ item }) => (
//             <Card transparent style={{ paddingHorizontal: 6 }}>
//               <CardItem cardBody>
//                 <TouchableOpacity onPress={() => onPress(item)} style={{ flex: 1 }}>
//                   <Image
//                     source={{ uri: item.image }}
//                     style={{
//                       height: 100,
//                       width: null,
//                       flex: 1,
//                       borderRadius: 5,
//                     }}
//                   />
//                 </TouchableOpacity>
//               </CardItem>
//               <CardItem cardBody>
//                 <Body>
//                   <Spacer size={10} />
//                   <Text style={{ fontWeight: '800' }}>{item.title}</Text>
//                   <Spacer size={15} />
//                   <Button
//                     block
//                     bordered
//                     small
//                     onPress={() => onPress(item)}
//                   >
//                     <Text>View</Text>
//                   </Button>
//                   <Spacer size={5} />
//                 </Body>
//               </CardItem>
//             </Card>
//           )}
//           keyExtractor={keyExtractor}
//           refreshControl={
//             <RefreshControl
//               refreshing={loading}
//               onRefresh={reFetch}
//             />
//           }
//         />
//
//         <Spacer size={20} />
//       </Content>
//     </Container>
//   );
// };

// RecipeListing.propTypes = {
//   error: PropTypes.string,
//   loading: PropTypes.bool.isRequired,
//   recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
//   reFetch: PropTypes.func,
// };
//
// RecipeListing.defaultProps = {
//   error: null,
//   reFetch: null,
// };

export default RecipeListing;
