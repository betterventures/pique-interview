class ShareProgress extends React.Component {
  constructor(props, context) {
    super(props);

    this.state = {
      percent: 0,
      color: '#3FC7FA'
    }

    this.changeState = this.changeState.bind(this);
  }
  changeState() {
    if(this.state.percent < 99) {
      this.state.percent = this.state.percent + 33;
    } else {
      this.state.percent = 99.99;
    }
    this.setState({
      percent: this.state.percent
    });
  }
  render () {
    return (
      <ProgressLine onClick={this.changeState} percent={this.state.percent} strokeWidth="4" strokeColor={this.state.color}>
      </ProgressLine>
    );
  }
}
