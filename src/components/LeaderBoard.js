import React from 'react';
import {Cell, Column, Row, TableView, TableBody, TableHeader, Flex} from '@adobe/react-spectrum'
import PropTypes from "prop-types";
import './LeaderBoard.css';

export class LeaderBoard extends React.Component {

  constructor(props) {
    super(props);

    this.setState({ dataSet: [] });
    this.setState({ windowWidth: window.innerWidth });
  }

  static propTypes = {
    items: PropTypes.array,
    selectionHandler: PropTypes.func,
    // loadMoreHandler: PropTypes.func,
    loadingState: PropTypes.object,
    onLoadMore: PropTypes.object,
  }

  getCellRenderer = ((item, columnKey) => {
    let content;

    if (columnKey === "authorAvatarUrl" && item.url) {
      const avatarUrl = item?.[columnKey] || `/resources/blank-user-avatar.png`;
      
      content =
        <img src={avatarUrl} height="30px" alt={item.author}  />
    } else if (columnKey === "commanders") {
      content = item[columnKey]?.toString().replace(`,`, `, `);
    } else {
      content = item[columnKey];
    }


    return (
      <Cell>{content}</Cell>
    );
  });

  getColumnRenderer = ((item) => {
    let content;

    if (item.uid === "salt") {
      content =
        <Flex direction="row">
          Salt&nbsp;&nbsp;
          <img src="/resources/salt-shaker.png" height="25px" alt="Salt Score"  />
        </Flex>
    } else {
      content = item.name;
    }


    return (
      <div>
        {content}
      </div>
    );
  });

  handleResize = (e) => {
    this.setState({ windowWidth: window.innerWidth });
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  }

  render() {
    let columns = [
      {name: 'USER', uid: 'authorAvatarUrl', maxWidth: 25},
      // {name: 'Deck', uid: 'title'},
      {name: 'Commander(s)', uid: 'commanders'},
    ];

    if (this?.state?.windowWidth > 600) {
      columns.push(    
        {name: 'Title', uid: 'title'}
      );
    }
    
    columns.push(
      {name: '', uid: 'salt', width: 125}
    );

    return (
      <Flex 
        gap="size-0"
        margin="size-0"
        maxWidth="1000px"
        width="100%"
        style={
          {
            'overflow-y': 'scroll'
        }
        }
      >
      {/* <div style={
        {
          'overflow-y': 'scroll',
          width: '100%',
          height: '100%',
      }
      }> */}
        <TableView
          aria-label="All time salt index"
          density='compact'
          height="size-4600"
          width="100%"
          selectionMode="single" 
          selectionStyle="highlight"
          onSelectionChange={this?.props?.selectionHandler}
          loadingState={this.props?.loadingState}
          onLoadMore={this?.props?.onLoadMore}
        >
          <TableHeader columns={columns}>
            {column => (
              <Column
                key={column?.uid}
                align={column?.uid === 'authorAvatarUrl' ? 'start' : 'start'}
                maxWidth={column?.maxWidth}
                width={column?.width}
                minWidth={column?.minWidth}
              >
                {this.getColumnRenderer(column)}
              </Column>
            )}
          </TableHeader>
          <TableBody items={this.props.items}>
            {item => (
              <Row>
                {columnKey => this.getCellRenderer(item, columnKey)}
              </Row>
            )}
          </TableBody>
        </TableView>
        {/* </div> */}
      </Flex>
    );
  }
}