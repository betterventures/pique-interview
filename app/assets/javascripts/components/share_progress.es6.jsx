class ShareProgress extends React.Component {
  constructor(props, context) {
    super(props);

    this.state = {
      percent: 0,
      color: '#3FC7FA'
    }
    this.shareToFacebook = this.shareToFacebook.bind(this);
    this.changeState = this.changeState.bind(this);
  }
  shareToFacebook() {
    this.changeState();
    window.open("https://www.facebook.com/dialog/feed?app_id=184683071273&link=https%3A%2F%2Ffacebook.com%2Fgetpique&picture=http%3A%2F%2Fwww.insert-image-share-url-here.jpg&name=This%20is%20a%20Sample%20Title&caption=%20&description=This%20is%20a%20Facebook%20description.&redirect_uri=http%3A%2F%2Fwww.facebook.com%2F");
  }
  changeState() {
    console.log("yolo")
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
      <div>
          <button onClick={this.shareToFacebook}> Share on Facebook </button>
          <a href="https://twitter.com/getpique">Share on Twitter</a>
        <ProgressLine onClick={this.changeState} percent={this.state.percent} strokeWidth="4" strokeColor={this.state.color}>
        </ProgressLine>
      </div>
    );
  }
}
