import React from "react";
import PropTypes from "prop-types";
import { ProgressBar } from "@adobe/react-spectrum";

export class ParseProgressIndicator extends React.Component {

    static propTypes = {
        label: PropTypes.string,
        progress: PropTypes.number,
      }

      render() {
        return (
            <ProgressBar value={this.props.progress} label={this.props.label}  width="100%" />
        )
      }

}