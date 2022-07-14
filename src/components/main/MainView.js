import React from 'react';
import { SubmitForm } from "../submitform/SubmitForm";
import { Preview } from "../preview/Preview";
import { Flex, View, Header, Divider, Text } from "@adobe/react-spectrum";
import { LeaderBoard } from '../leaderboard/LeaderBoard';
import { ImportStatusBar } from '../importStatusBar/ImportStatusBar';

export class MainView extends React.Component {
    getUrlParam = () => {
        const href = window.location.href;
        return href.substring(href.indexOf(`?sha=`) + 5) || ``;
    }

    handleListSubmit = async (value) => {
        this.props.importDeckList(value);
    };

    componentDidMount = async () => {
        this.props.refreshLeaderboard();
    }

    render() {
        return (
            <View height="100%">
                <View style={{position: 'absolute', top: 0}}>
                    <Header>
                        <Text size="L">EDH Salt Index</Text>
                    </Header>
                    <Divider size="M" />
                </View>
                <div style={{height: "25px"}} />
                <View alignItems="center" height="100%">
                    <Flex 
                        direction="column"  
                        alignItems="center"
                        margin="size-200"
                        height="100%"
                        gap="size-100">
                        <img src="resources/chef-kiss.png" width="100px" alt="MMM SALT!" />
                        <div style={{height: "50px"}} />
                        <Flex direction="column" width="100%" maxWidth="800px">
                            {this.props.isImporting
                                ? <ImportStatusBar />
                                : <SubmitForm listSubmitHandler={this.handleListSubmit} />// initialListUrl={param} />
                            }
                        </Flex>
                        <div style={{height: "50px"}} />
                        {this.props.showPreview 
                            ? <Preview />  
                            : <div style={{height: "0px"}} />
                        }
                        <LeaderBoard selectionHandler={this.handleLeaderboardSelectionChange}  />
                    </Flex>
                </View>
                <div style={{height: "25px"}} />
                <View style={{position: 'absolute', bottom: -100}}>
                    <Divider size="M" />
                    <Header>
                        <Text size="L">Total salt miners: </Text>
                    </Header>
                </View>
            </View>
        )
    }
}