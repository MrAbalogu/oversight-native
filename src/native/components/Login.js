import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Form, Item, Label, Input, Text, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Messages from './Messages';
import Header from './Header';
import Spacer from './Spacer';

const url = 'https://oversight-ws.herokuapp.com/api/login';

class Login extends React.Component {
  static propTypes = {
    member: PropTypes.shape({
      email: PropTypes.string,
      logged_in: PropTypes.boolean,
    }),
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
    member: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      email: (props.member && props.member.email) ? props.member.email : '',
      password: '',
      logged_in: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  }

  logout() {
    console.log('logout clicked');
    Actions.signUp();
    this.setState({
      logged_in: false,
    });
  }

  handleSubmit = () => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then(response => response.json())
      .then((data) => {
        if (!data.success) {
          console.warn('login didnt work');
        } else {
          console.log('success', data.responseText);
          Actions.profile();
          this.setState({
            email: '',
            password: '',
            logged_in: true,
          });
        }
      })
      .catch((error) => {
        console.log('Request failed', error);
      });

  }

  render() {
    const { loading, error } = this.props;

    // Loading
    if (loading) return <Loading />;

    return (
      <Container>
        {this.state.logged_in ? (
          <Content>
            <Header
              title={this.state.email}
              content="Thank you for joining us. Now lets rate some politicians"
              visible="false"
            />
            <Text> Welcome Buddy </Text>
          </Content>
        ) : (
            <Content padder>
              <Header
                title="Welcome back"
                content="Please use your email and password to login."
              />

              {error && <Messages message={error} />}

              <Form>
                <Item stackedLabel>
                  <Label>Email</Label>
                  <Input
                    autoCapitalize="none"
                    value={this.state.email}
                    keyboardType="email-address"
                    onChangeText={v => this.handleChange('email', v)}
                  />
                </Item>
                <Item stackedLabel>
                  <Label>Password</Label>
                  <Input
                    secureTextEntry
                    onChangeText={v => this.handleChange('password', v)}
                  />
                </Item>

                <Spacer size={20} />

                <Button block onPress={this.handleSubmit}>
                  <Text>Login</Text>
                </Button>
                <Text onPress={this.logout.bind(this)}> Create Account here</Text>
              </Form>
            </Content>
        )}
      </Container>
    );
  }
}

export default Login;
