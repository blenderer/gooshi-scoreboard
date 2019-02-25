import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import classNames from 'classnames';

class Tag extends React.Component {

	render() {
		const { sponsor, name, classes, className, ...restProps } = this.props;

		return (
      <div className={classNames(classes.name, className)} {...restProps}>
        <span className={classes.sponsor}>
          {sponsor ? sponsor + ' ' : null}
        </span>
        {name}
      </div>
		);
	}
}

const styles = {
	name: {
		top: 6,
		width: 229,
		textAlign: 'center',
		color: 'white',
		fontSize: 39,
		position: 'absolute'
	},
	sponsor: {
		color: 'rgba(225, 225, 225, 1)'
	}
};

export default withStyles(styles)(Tag);
