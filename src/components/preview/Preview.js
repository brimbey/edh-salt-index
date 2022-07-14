import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Text, Flex, DialogContainer, Divider, Well, ActionButton} from '@adobe/react-spectrum'
import './Preview.css';
import LinkOut from '@spectrum-icons/workflow/LinkOut';
import Close from '@spectrum-icons/workflow/Close';
import Refresh from '@spectrum-icons/workflow/Refresh';
import { setPreviewIsShowingFalse } from '../../data/redux/slices/previewSlice';
import { ImportStatusBar } from '../importStatusBar/ImportStatusBar';
import { doRefresh } from '../../data/redux/slices/importSlice';


export function Preview() {
    const deck = useSelector((state) => state.preview.previewDeck);
    const isRefreshing = useSelector((state) => state.import.isRefreshing);
    const isImporting = useSelector((state) => state.import.isImporting);

    const dispatch = useDispatch();

    const handleAuthorLinkPress = (evn) => {
        window.location.href = deck.authorProfileUrl;
      }

    const handleDeckLinkPress = (evn) => {
        window.location.href = deck.url;
      }

    const getSaltRating = (val) => {
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

    const avatarUrl = deck?.authorAvatarUrl;
    const title = deck?.title;
    const salt = deck?.salt;
    const author = deck?.author;
    const commanders = deck?.commanders?.toString().replace(`,`, `\n`);

    return (
        <DialogContainer type='modal' isDismissable onDismiss={() => dispatch(setPreviewIsShowingFalse())}>
            {/* <Dialog 
                width="480px"> */}
                <div className='PreviewContainer' width="100%">
                    <Flex direction="column" width="size-4000" margin="10px">
                        <Flex direction="row" gap="size-100" width="100%" justifyContent="right">
                            <ActionButton 
                                type="reset"
                                alignSelf="flex-end"
                                isDisabled={isImporting || isRefreshing}
                                onPress={() => dispatch(doRefresh(deck.url))}><Refresh /></ActionButton>
                            <ActionButton 
                                type="reset"
                                alignSelf="flex-end"
                                onPress={() => dispatch(setPreviewIsShowingFalse())}><Close /></ActionButton>
                        </Flex>
                        <Flex direction="row" gap="size-130" marginTop="10px">
                            <Flex direction="column">
                                <img src={avatarUrl} width="100" alt="avatar" />
                                <Text UNSAFE_className="AuthorText">{author}</Text>
                            </Flex>
                            <Flex direction="column" width="100%">
                                <Text UNSAFE_className="TitleText">{title}</Text>
                                
                                <Text UNSAFE_className="CommanderText">Commander(s):</Text>
                                <div style={{height: '10px'}} />
                                <Text UNSAFE_className="CommanderText">{commanders}</Text>
                                <div style={{height: '100%'}} />
                                <Divider size="M" />
                                {isRefreshing
                                    ?   <div style={{marginTop: '5px'}}>
                                            <ImportStatusBar paddingTop="10px" />  
                                        </div>
                                    : <Text UNSAFE_className="SaltText">Score: {salt}</Text>
                                }
                            </Flex>
                        </Flex>
                        
                        <Well alignSelf="center" width="100%">
                            <Text UNSAFE_className="SaltText" alignSelf="center">{getSaltRating(salt)}</Text>
                        </Well>
                        <Flex direction="row" width="100%" marginTop="10px">
                            <ActionButton 
                                onPress={handleDeckLinkPress}><LinkOut/>
                                Deck&nbsp;&nbsp;&nbsp;
                            </ActionButton>
                            <div style={{ width: '135px' }} />
                            <ActionButton 
                                alignSelf="flex-end"
                                onPress={handleAuthorLinkPress}>
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
