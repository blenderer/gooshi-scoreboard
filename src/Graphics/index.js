import queryString from "query-string";
import React, { Component } from "react";
import font from "./smashnsplash/fonts/big_noodle_titling.woff";
import NodeCGReplicant from "../Dashboard/NodeCGReplicant";
import Scoreboard from "./smashnsplash/components/Scoreboard";
import Commentators from "./smashnsplash/components/Commentators";
import BigCamera from "./smashnsplash/components/BigCamera";
import SideSideCamera from "./smashnsplash/components/SideSideCamera";
import Intermission from "./smashnsplash/components/Intermission";
import ThreeCam from "./smashnsplash/components/ThreeCam";
import Crowd from "./smashnsplash/components/Crowd";
import MidSetReport from "./smashnsplash/components/MidSetReport";

import { AssetCacheProvider } from "../context/AssetCache";

class Graphics extends Component {
  state = {
    scoreboard: null,
    activeOverlay: "Intermission",
    programScene: null
  };

  styles = {
    root: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }
  };

  componentDidMount() {
    window.nodecg.listenFor("obs:transitioning", data => {
      // console.log(data);
    });
  }

  renderGraphics() {
    const { scoreboard } = this.state;
    const graphics = [
      { Component: Scoreboard, overlayName: "Scoreboard" },
      { Component: BigCamera, overlayName: "BigCamera" },
      { Component: SideSideCamera, overlayName: "SideSideCamera" },
      { Component: MidSetReport, overlayName: "MidSetReport" },
      { Component: ThreeCam, overlayName: "ThreeCam" },
      { Component: Commentators, overlayName: "Commentators" },
      { Component: Crowd, overlayName: "Crowd" },
      { Component: Intermission, overlayName: "Intermission" }
    ];
    const query = queryString.parse(window.location.search);
    const scene = query.scene;
    const bg = query.bg ? { backgroundColor: query.bg } : {};

    return (
      <div style={{ ...this.styles.root, ...bg }}>
        {graphics.map(graphic => (
          <graphic.Component
            key={graphic.overlayName}
            enabled={scene === graphic.overlayName}
            scoreboard={scoreboard}
          />
        ))}
      </div>
    );
  }

  render() {
    const { scoreboard, programScene } = this.state;

    return (
      <AssetCacheProvider>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @font-face {
            font-family: 'BigNoodle';
            src: url('build${font}') format('woff');
          }
          #graphics * {
            font-family: BigNoodle;
          }
        `
          }}
        />
        {scoreboard ? this.renderGraphics() : null}
        <NodeCGReplicant
          replicantName="scoreboard"
          value={this.state.scoreboard}
          onNewValue={newValue => {
            this.setState({ scoreboard: newValue });
          }}
        />
        <NodeCGReplicant
          replicantName="obs:programScene"
          value={programScene}
          onNewValue={newValue => {
            this.setState({ programScene: newValue });
          }}
        />
      </AssetCacheProvider>
    );
  }
}

export default Graphics;
