import React from "react";
import PropTypes from "prop-types";
import { TextField, Button, Text, Flex } from "@adobe/react-spectrum";

export class SubmitForm extends React.Component {

  currentDeckUrl = ``;

  static propTypes = {
    listSubmitHandler: PropTypes.func,
    initialListUrl: PropTypes.string,
  }

  handleOnPress = (event) => {
    this.props.listSubmitHandler(this.currentDeckUrl);
  }

  handleOnChange = (val) => {
    this.currentDeckUrl = val;
  }
  
  render() {
      return (
        <Flex direction="row" alignItems="end" gap="size-300" maxWidth="800px"
        width="100%">
              <TextField 
                label="Paste the URL for your decklist here (currently only Moxfield is supported):" 
                onChange={this.handleOnChange} 
                width="100%" 
                autoFocus={true} 
              />
              <Button onPress={this.handleOnPress} >
                <Text>Submit&nbsp;&nbsp;&nbsp;</Text>
              </Button>
        </Flex>
      )
  }
}