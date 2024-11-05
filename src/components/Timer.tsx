import * as React from "react";
import { connect } from "react-redux";
import { GameState, GridState } from "../store/types";

export interface TimerProps {
  gameState: GameState;
  minesLeft: number;
}

export interface TimerState {
  startedAt: number;
  endAt: number;
  isTimerStarted: boolean;
}

class Timer extends React.Component<TimerProps, TimerState> {
  interval: number | null = null;

  constructor(props: TimerProps) {
    super(props);
    this.state = { startedAt: 0, endAt: 0, isTimerStarted: false };
    this.handleInterval = this.handleInterval.bind(this);
  }

  static getDerivedStateFromProps(
    props: TimerProps,
    state: TimerState
  ): TimerState | null {
    if (props.gameState === "game" && !state.isTimerStarted) {
      const now = Date.now();
      return {
        startedAt: now,
        endAt: now,
        isTimerStarted: true
      };
    }

    if (props.gameState === "new") {
      return {
        startedAt: 0,
        endAt: 0,
        isTimerStarted: false
      };
    }

    if (
      (props.gameState === "win" || props.gameState === "over") &&
      state.isTimerStarted
    ) {
      return {
        startedAt: state.startedAt,
        endAt: Date.now(),
        isTimerStarted: false
      };
    }

    return null;
  }

  componentDidUpdate(prevProps: TimerProps, prevState: TimerState) {
    if (!prevState.isTimerStarted && this.state.isTimerStarted) {
      this.interval = window.setInterval(this.handleInterval, 100);
    } else if (
      prevState.isTimerStarted &&
      !this.state.isTimerStarted &&
      this.interval
    ) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  handleInterval() {
    this.setState({
      endAt: Date.now()
    });
  }

  render() {
    return (
      <>
        <div>Mines: {this.props.minesLeft}</div>
        <div>
          {((this.state.endAt - this.state.startedAt) / 1000).toFixed(1)}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: GridState) => ({
  gameState: state.gameState,
  minesLeft: state.mines - state.minesMarked
});

export default connect(mapStateToProps)(Timer);
