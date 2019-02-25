import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import classNames from 'classnames';

class SponsorFlag extends React.Component {

  state = {
    images: [],
    currentImageIndex: 0,
    leaving: false
  };

  static getDerivedStateFromProps (props) {
    const { country, sponsor, character } = props;
    const images = [];

    images.push(country);

    images.push(sponsor);

		images.push(character);

    return { images };
  }

  componentDidMount () {
    this.setRotator();
  }

  componentWillUnmount () {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  setRotator () {
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = () => {
      const { images, currentImageIndex } = this.state;

      if (images.length < 1) {
        return false;
      }

      if (images.length === 1) {

        if (currentImageIndex !== 0) {
          this.setState(prevState => ({
            currentImageIndex: 0,
            leaving: false
          }));
        }

        return false;
      }

      this.setState(prevState => ({
        leaving: true
      }));

      setTimeout(() => {
        this.setState((prevState) => {
          const { currentImageIndex } = prevState;
          const atEnd = currentImageIndex >= prevState.images.length - 1;

          return {
            ...prevState,
            leaving: false,
            currentImageIndex: atEnd ? 0 : currentImageIndex + 1
          };
        });
      }, 1900);

    };

    setInterval(this.interval, 7000);
  }

	render() {
		const { sponsor, country, classes, side, style, ...restOfProps } = this.props;
    const { images, currentImageIndex, leaving } = this.state;

		const newStyle = { ...style };

		if (side === 'right' && images[currentImageIndex].includes('characters')) {
			newStyle.transform = 'scale(-1, 1)';
		}

    return (
      <img
        className={classNames(classes.image, {[classes.leaving]: leaving})}
        src={images[currentImageIndex]}
        alt=""
				style={newStyle}
        {...restOfProps}
      />
    );
	}
}

const styles = {
  image: {
    position: 'absolute',
    top: 13,
    width: 49,
    height: 54,
    transition: 'opacity 1.1s',
    opacity: 1
  },
  leaving: {
    opacity: 0,
    transition: 'opacity 1.9s',
  }
};

export default withStyles(styles)(SponsorFlag);
