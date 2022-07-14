import React from 'react';
import { useSelector } from 'react-redux';
import { ProgressBar } from "@adobe/react-spectrum";

export function ImportStatusBar() {
  const isRefreshing = useSelector((state) => state.import.isRefreshing);
  const progress = (!isRefreshing) ? useSelector((state) => state.import.importing.percentageLoaded) : useSelector((state) => state.import.refreshing.percentageLoaded);
  const cardname = (!isRefreshing) ? useSelector((state) => state.import.importing.current) : useSelector((state) => state.import.refreshing.current);

  return (
    <ProgressBar value={progress} label={cardname}  width="100%" />
  );
}
