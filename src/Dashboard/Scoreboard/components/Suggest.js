import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Downshift from 'downshift';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

import { withStyles } from '@material-ui/core/styles';

function renderSuggestion({
	suggestion,
	index,
	itemProps,
	highlightedIndex,
	selectedItem
}) {
	const isHighlighted = highlightedIndex === index;
	const isSelected = (selectedItem || '').indexOf(suggestion) > -1;
	return (
		<MenuItem
			{...itemProps}
			key={suggestion}
			selected={isHighlighted}
			component="div"
			style={{
				fontWeight: isSelected ? 500 : 400
			}}
		>
			{suggestion}
		</MenuItem>
	);
}

class Suggest extends Component {
	render() {
		const { classes, items, inputProps, inputValue } = this.props;

		return (
			<Downshift
        inputValue={inputValue}
        stateReducer={(state, changes) => {
          if (!state.inputValue) {
            return {
              ...changes,
              inputValue: state.inputValue,
              selectedItem: state.inputValue
            };
          }

          if (state.selectedItem === '') {
            return {
              ...changes,
              inputValue: state.inputValue
            };
          }
          return changes;
        }}
				onInputValueChange={(inputValue, stateAndHelpers) =>{
					this.props.onChange(inputValue);
				}}
			>
				{({
					getInputProps,
					getItemProps,
					getLabelProps,
					isOpen,
					inputValue,
					highlightedIndex,
					selectedItem
				}) => (
					<div className={classes.container}>
						<TextField {...getInputProps()} {...inputProps} />
						{isOpen ? (
							<Paper className={classes.paper} square>
								{items
									.filter(
										item =>
											!inputValue ||
											item
												.toLowerCase()
												.includes(
													inputValue.toLowerCase()
												)
									)
									.slice(0, 10)
									.map((item, index) =>
										renderSuggestion({
											suggestion: item,
											index,
											highlightedIndex,
											selectedItem,
											itemProps: getItemProps({
												item: item
											})
										})
									)}
							</Paper>
						) : null}
					</div>
				)}
			</Downshift>
		);
	}
}

const styles = theme => ({
	paper: {
		position: 'absolute',
		zIndex: 1,
		marginTop: theme.spacing.unit,
		left: 0
	},
	container: {
		flexGrow: 1,
		position: 'relative'
	}
});

export default withStyles(styles)(Suggest);
