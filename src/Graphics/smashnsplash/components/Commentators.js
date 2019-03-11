import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import Graphic from "../../components/Graphic";
import GraphicImage from "../../components/GraphicImage";
import TwitchName from "../../components/TwitchName";
import FadeRotator from "../../components/FadeRotator";

import Tag from "./Scoreboard/Tag";

import graphics from "../scripts/graphics";

const styles = {
  commentatorTag: {
    bottom: 94,
    fontSize: 36,
    width: 445,
    top: "auto"
  },
  twitterTag: {
    bottom: 60,
    position: "absolute",
    fontSize: 24,
    left: 202,
    width: 236,
    height: 33,
    textAlign: "center"
  },
  name: { color: "black" },
  sponsor: { color: "black" }
};

class Commentators extends PureComponent {
  render() {
    const { scoreboard, classes, enabled } = this.props;

    const commentator1 = scoreboard.commentators[0];
    const commentator2 = scoreboard.commentators[1];

    return (
      <Graphic enabled={enabled}>
        <GraphicImage src={`build${graphics.commentary}`} />
        <Tag
          className={classes.commentatorTag}
          sponsor={commentator1.sponsor}
          name={commentator1.name}
          style={{ left: 105 }}
          classes={{ name: classes.name, sponsor: classes.sponsor }}
        />
        <Tag
          className={classes.commentatorTag}
          sponsor={commentator2.sponsor}
          name={commentator2.name}
          style={{ right: 105 }}
          classes={{ name: classes.name, sponsor: classes.sponsor }}
        />
        <div className={classes.twitterTag}>
          <FadeRotator>
            {commentator1.twitch ? (
              <TwitchName>{commentator1.twitch}</TwitchName>
            ) : (
              " "
            )}
            {commentator1.twitter ? (
              <React.Fragment>@{commentator1.twitter}</React.Fragment>
            ) : (
              " "
            )}
          </FadeRotator>
        </div>
        <div
          className={classes.twitterTag}
          style={{ right: 202, left: "auto" }}
        >
          <FadeRotator>
            {commentator2.twitch ? (
              <TwitchName>{commentator2.twitch}</TwitchName>
            ) : (
              " "
            )}
            {commentator2.twitter ? (
              <React.Fragment>@{commentator2.twitter}</React.Fragment>
            ) : (
              " "
            )}
          </FadeRotator>
        </div>
      </Graphic>
    );
  }
}

export default withStyles(styles)(Commentators);
