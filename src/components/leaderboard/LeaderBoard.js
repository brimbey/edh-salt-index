import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Cell, Column, Row, TableView, TableBody, TableHeader, Flex} from '@adobe/react-spectrum'
import { selectLeaderboardList, fetchAll } from '../../data/redux/slices/leaderboardSlice';
import './LeaderBoard.css';
import { setPreviewDeck } from '../../data/redux/slices/previewSlice';
import {useAsyncList} from '@react-stately/data';

  // handleResize = (e) => {
  //   this.setState({ windowWidth: window.innerWidth });
  // };

  // componentDidMount() {
  //   window.addEventListener("resize", this.handleResize);
  //   this.handleResize();
  // }

  export const getCellRenderer = ((item, columnKey) => {
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

  export const getColumnRenderer = ((item) => {
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

export function LeaderBoard() {
  const items = useSelector(selectLeaderboardList);
  const lastBatchLoaded = useSelector((state) => state.leaderboard.lastBatchLoaded);
  const nextCursor = useSelector((state) => state.leaderboard.nextCursor);
  const isFetching = useSelector((state) => state.leaderboard.isFetching);
  const dispatch = useDispatch();
  

  const handleLeaderboardSelectionChange = (evn) => {
      try {
          const {currentKey} = evn;
          const selectedDeck = items.filter((value, index) => {
              return value.id === currentKey;
          })?.[0];
          
          dispatch(setPreviewDeck(selectedDeck));
      } catch (error) {
          console.log(`error :: ${error}`);
      }
      
  }
  
  let columns = [
    {name: 'USER', uid: 'authorAvatarUrl', maxWidth: 25},
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

  let asyncList = useAsyncList({
    async load({ signal, cursor }) {
      if (isFetching) {
        return;
      } else {
        if (nextCursor) {
            dispatch(fetchAll(nextCursor));
            return {
              items: lastBatchLoaded,
              cursor: nextCursor,
            };
        }
      }

      return {
        items: lastBatchLoaded,
        cursor: nextCursor,
      };
    }
  });

  return (
    <Flex 
      gap="size-0"
      margin="size-0"
      maxWidth="1000px"
      width="100%"
      height="100%"
      style={
        {
          'overflow-y': 'scroll'
      }
      }
    >
      <TableView
        aria-label="All time salt index"
        density='compact'
        height="100%"
        width="100%"
        selectionMode="single" 
        selectionStyle="highlight"
        onSelectionChange={handleLeaderboardSelectionChange}
        // loadingState={this.props?.loadingState}
        // onLoadMore={this?.props?.onLoadMore}
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
              {getColumnRenderer(column)}
            </Column>
          )}
        </TableHeader>
        <TableBody 
          items={asyncList.items}
          loadingState={asyncList.loadingState}
          onLoadMore={asyncList.loadMore}
        >
          {item => (
            <Row>
              {columnKey => getCellRenderer(item, columnKey)}
            </Row>
          )}
        </TableBody>
      </TableView>
    </Flex>
  );
}
