import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Graphic from "../../../components/Graphic";
import GraphicImage from "../../../components/GraphicImage";
import Tag from "./Tag";
import SponsorFlag from "./SponsorFlag";
import { withAssetCache } from "../../../../context/AssetCache";
import { getPlayerAssetUrls } from "../../../../helpers/getPlayerAssetUrls";

import graphics from "../../scripts/graphics";

import classNames from "classnames";

const styles = {
  bracketPhase: {
    position: "absolute",
    textAlign: "center",
    color: "white",
    fontSize: 20,
    top: 66,
    left: 0,
    right: 0
  },
  flag: {
    position: "absolute",
    top: 0,
    width: 49,
    height: 54
  },
  sponsor: {
    color: "rgba(225, 225, 225, 1)"
  },
  score: {
    transition: "transform 2.5s",
    transform: "translateX(0)"
  },
  leftHidden: {
    transform: "translateX(-640px)",
    transition: "none"
  },
  rightHidden: {
    transform: "translateX(640px)",
    transition: "none"
  },
  information: {
    opacity: 0,
    position: "relative"
  },
  activeInformation: {
    opacity: 1,
    transition: "opacity 1s"
  },
  character: {
    position: "absolute",
    width: 59,
    height: 59,
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: 9,
  },
  charImage: {
    maxHeight: '100%',
    maxWidth: '100%',
  },
};

const isOnScoreBoard = sceneName => {
  return sceneName === "In-Game" || sceneName === "In-Game (Reversed Cam)";
};

class Scoreboard extends React.Component {
  state = {
    programScene: null,
    replicant: window.nodecg.Replicant("obs:programScene", {
      defaultValue: null
    }),
    slideInOver: true
  };

  componentDidMount() {
    window.NodeCG.waitForReplicants(this.state.replicant).then(() => {
      this.setState({ programScene: this.state.replicant.value });
    });
    this.state.replicant.on("change", this.updateScene);
  }

  updateScene = newSceneReplicant => {
    if (newSceneReplicant && newSceneReplicant.name) {
      this.setState({
        programScene: newSceneReplicant.name,
        slideInOver: false
      });
      setTimeout(() => {
        this.setState({ slideInOver: isOnScoreBoard(newSceneReplicant.name) });
      }, 2500);
    }
  };

  renderSingles() {
    const { classes, scoreboard, assetCache } = this.props;
    const { programScene, slideInOver } = this.state;

    const player1 = scoreboard.players[0];
    const player1Assets = getPlayerAssetUrls(assetCache, player1);
    const player2 = scoreboard.players[1];
    const player2Assets = getPlayerAssetUrls(assetCache, player2);

    const leftClasses = [classes.score];
    const rightClasses = [classes.score];

    const infoClasses = [classes.information];

    if (slideInOver) {
      infoClasses.push(classes.activeInformation);
    }

    if (!isOnScoreBoard(programScene)) {
      leftClasses.push(classes.leftHidden);
      rightClasses.push(classes.rightHidden);
    }

    return (
      <React.Fragment>
        <GraphicImage src={`build${graphics.cams}`} />
        {/* <GraphicImage
          className={leftClasses}
          src={`build${graphics.scoreLeftSingles}`}
        />
        <GraphicImage
          className={rightClasses}
          src={`build${graphics.scoreRightSingles}`}
        /> */}
        <div className={classNames(infoClasses)}>
          <Tag
            sponsor={player1.sponsor}
            name={player1.name}
            style={{ left: 293 }}
          />
          <Tag
            sponsor={player2.sponsor}
            name={player2.name}
            style={{ right: 293 }}
          />
          <SponsorFlag
            sponsor={player1Assets.sponsor}
            country={player1Assets.country}
            character={player1Assets.character}
            style={{
              left: 530
            }}
          />
          <SponsorFlag
            sponsor={player2Assets.sponsor}
            country={player2Assets.country}
            character={player2Assets.character}
            side="right"
            style={{
              right: 535
            }}
          />
          <div className={classes.character} style={{left: 203}}>
            <img className={classes.charImage} src={player1Assets.character} alt="" />
          </div>
          <div className={classes.character} style={{right: 217}}>
            <img className={classes.charImage} src={player2Assets.character} alt="" />
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderDoubles() {
    const { classes, scoreboard, assetCache } = this.props;
    const { slideInOver, programScene } = this.state;

    const player1 = scoreboard.players[0];
    const player2 = scoreboard.players[1];
    const player3 = scoreboard.players[2];
    const player4 = scoreboard.players[3];

    const player1Assets = getPlayerAssetUrls(assetCache, player1);
    const player3Assets = getPlayerAssetUrls(assetCache, player3);

    const leftClasses = [classes.score];
    const rightClasses = [classes.score];

    const infoClasses = [classes.information];

    if (slideInOver) {
      infoClasses.push(classes.activeInformation);
    }

    if (!isOnScoreBoard(programScene)) {
      leftClasses.push(classes.leftHidden);
      rightClasses.push(classes.rightHidden);
    }

    return (
      <React.Fragment>
        <GraphicImage src={`build${graphics.doublesBase}`} />
        <GraphicImage
          className={classNames(leftClasses)}
          src={`build${graphics.scoreLeftDoubles}`}
        />
        <GraphicImage
          className={classNames(rightClasses)}
          src={`build${graphics.scoreRightDoubles}`}
        />
        <div className={classNames(infoClasses)}>
          <Tag
            sponsor={player1.sponsor}
            name={player1.name}
            style={{ left: 2, top: 0 }}
          />
          <Tag
            sponsor={player2.sponsor}
            name={player2.name}
            style={{ left: 2, top: 46 }}
          />
          <Tag
            sponsor={player3.sponsor}
            name={player3.name}
            style={{ right: 2, top: 0 }}
          />
          <Tag
            sponsor={player4.sponsor}
            name={player4.name}
            style={{ right: 2, top: 46 }}
          />
          <SponsorFlag
            sponsor={player1Assets.sponsor}
            country={player1Assets.country}
            character={player1Assets.character}
            style={{
              left: 417
            }}
          />
          <SponsorFlag
            sponsor={player3Assets.sponsor}
            country={player3Assets.country}
            character={player3Assets.character}
            side="right"
            style={{
              right: 417
            }}
          />
        </div>
      </React.Fragment>
    );
  }

  renderBG() {
    return (
      <React.Fragment>
        <GraphicImage src={`build${graphics.backer}`} />
        <GraphicImage src={`${graphics.p1c}`} />
        <GraphicImage src={`build${graphics.p1n}`} />
        <GraphicImage src={`build${graphics.p1s}`} />
        <GraphicImage src={`${graphics.p2c}`} />
        <GraphicImage src={`build${graphics.p2n}`} />
        <GraphicImage src={`build${graphics.p2s}`} />
      </React.Fragment>
    );
  }

  renderBo3() {
    return (
      <React.Fragment>
        {/* <GraphicImage src={`build${graphics.backer3}`} /> */}
      </React.Fragment>
    );
  }

  renderBo5() {
    return (
      <React.Fragment>
        {/* <GraphicImage src={`build${graphics.backer5}`} /> */}
      </React.Fragment>
    );
  }

  renderScore() {
    const { scoreboard } = this.props;

    const left = scoreboard.set.score.team1.filter(point => !!point).length;
    const right = scoreboard.set.score.team2.filter(point => !!point).length;

    const leftScore = left && (
      <GraphicImage key={`p1-${left}`} src={`${graphics[`left${left}`]}`} />
    );

    const rightScore = right && (
      <GraphicImage key={`p2-${right}`} src={`${graphics[`right${right}`]}`} />
    );

    return (
      <React.Fragment>
        {leftScore}
        {rightScore}
      </React.Fragment>
    );
  }

  renderBracketPhase() {
    const { scoreboard, classes } = this.props;

    return (
      <div className={classes.bracketPhase}>{scoreboard.set.bracketPhase}</div>
    );
  }

  render() {
    const { scoreboard, enabled, classes } = this.props;
    const { slideInOver } = this.state;

    const infoClasses = [classes.information];
    if (slideInOver) {
      infoClasses.push(classes.activeInformation);
    }

    return (
      <Graphic enabled={enabled}>
        <div style={{ height: "100%" }} className={classNames(infoClasses)}>
          {this.renderBG()}
          {scoreboard.set.format === "bo3"
            ? this.renderBo3()
            : this.renderBo5()}
          {this.renderScore()}
          {this.renderBracketPhase()}
          {scoreboard.format === "singles" ? this.renderSingles() : null}
        </div>
      </Graphic>
    );
  }
}

export default withAssetCache(withStyles(styles)(Scoreboard));
