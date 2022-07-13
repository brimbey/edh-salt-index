import React from 'react';
import {Text, Flex, DialogContainer, Divider, Well, ActionButton} from '@adobe/react-spectrum'
import PropTypes from "prop-types";
import './Preview.css';
import LinkOut from '@spectrum-icons/workflow/LinkOut';
import Close from '@spectrum-icons/workflow/Close';
import Refresh from '@spectrum-icons/workflow/Refresh';


export class Preview extends React.Component {

    static propTypes = {
        deck: PropTypes.object,
        onDismiss: PropTypes.func,
        onRefresh: PropTypes.func,
      }

      handleAuthorLinkPress = (evn) => {
        window.location.href = this?.props?.deck?.authorProfileUrl;
      }

      handleDeckLinkPress = (evn) => {
        window.location.href = this?.props?.deck?.url;
      }

      getSaltRating = (val) => {
        if (val < 10) {
            return "Grade F: WHERE IS THE SALT?!";
        } else if (val < 30) {
            return "Grade D: Under seasoned";
        } else if (val < 40) {
            return "Grade C: Pass the salt";
        } else if (val < 60) {
            return "Grade B: Well seasoned";
        } else if (val < 80) {
            return "Grade A: Completely balanced!";
        }

        return "Grade A+: PERFECTION";
      }

      render() {
        const avatarUrl = this?.props?.deck?.authorAvatarUrl;
        const title = this?.props?.deck?.title;
        const salt = this?.props?.deck?.salt;
        const author = this?.props?.deck?.author;
        const commanders = this?.props?.deck?.commanders?.toString().replace(`,`, `\n`);

        return (
            <DialogContainer type='modal' isDismissable onDismiss={this?.props?.onDismiss}>
                {/* <Dialog 
                    width="480px"> */}
                    <div className='PreviewContainer' width="100%">
                        <Flex direction="column" width="size-4000" margin="10px">
                            <Flex direction="row" gap="size-100" width="100%" justifyContent="right">
                                <ActionButton 
                                    type="reset"
                                    alignSelf="flex-end"
                                    onPress={this?.props?.onRefresh}><Refresh /></ActionButton>
                                <ActionButton 
                                    type="reset"
                                    alignSelf="flex-end"
                                    onPress={this?.props?.onDismiss}><Close /></ActionButton>
                            </Flex>
                            <Flex direction="row" gap="size-130" marginTop="10px">
                                <Flex direction="column">
                                    <img src={avatarUrl} width="100" alt="avatar" />
                                    <Text UNSAFE_className="AuthorText">{author}</Text>
                                </Flex>
                                <Flex direction="column" width="100%">
                                    <Text UNSAFE_className="TitleText">{title}</Text>
                                    
                                    <Text UNSAFE_className="CommanderText">Commander(s):</Text>
                                    <div style={{height: '100%'}} />
                                    <Text UNSAFE_className="CommanderText">{commanders}</Text>
                                    <Divider size="M" />
                                    <Text UNSAFE_className="SaltText">Score: {salt}</Text>
                                </Flex>
                            </Flex>
                            <Well alignSelf="center" width="100%">
                                <Text UNSAFE_className="SaltText" alignSelf="center">{this.getSaltRating(salt)}</Text>
                            </Well>
                            <Flex direction="row" width="100%" marginTop="10px">
                                <ActionButton 
                                    onPress={this.handleDeckLinkPress}><LinkOut/>
                                    Deck&nbsp;&nbsp;&nbsp;
                                </ActionButton>
                                <div style={{ width: '135px' }} />
                                <ActionButton 
                                    alignSelf="flex-end"
                                    onPress={this.handleAuthorLinkPress}>
                                        <LinkOut/>
                                        Author Profile&nbsp;&nbsp;&nbsp;
                                    </ActionButton>
                            </Flex>
                        </Flex>
                    </div>
                {/* </Dialog> */}
            </DialogContainer>
        )
      }
}