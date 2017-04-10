class ShareProgress extends React.Component {
  constructor(props, context) {
    super(props);

    this.state = {
      percent: 0,
      color: '#3FC7FA',
      facebookShared: false,
      twitterShared: false,
    }
    this.shareToFacebook = this.shareToFacebook.bind(this);
    this.shareToTwitter = this.shareToTwitter.bind(this);
  }
  shareToFacebook() {
    if (!this.state.facebookShared) {
      this.setState({ facebookShared: true, percent: this.state.percent + 50 });
    }
    window.open("https://www.facebook.com/dialog/feed?app_id=184683071273&link=https%3A%2F%2Ffacebook.com%2Fgetpique&picture=http%3A%2F%2Fwww.insert-image-share-url-here.jpg&name=This%20is%20a%20Sample%20Title&caption=%20&description=This%20is%20a%20Facebook%20description.&redirect_uri=http%3A%2F%2Fwww.facebook.com%2F");
  }
  shareToTwitter() {
    if(!this.state.twitterShared) {
      this.setState({ twitterShared: true, percent: this.state.percent + 50 });
    }
    window.open("http://twitter.com/intent/tweet?text=Get%20pique!%20https%3A%2F%2Fgetpique.co");
  }
  render () {
    return (
      <div>
        <div>
          <button className="facebook" onClick={this.shareToFacebook}> Share on Facebook </button>
        </div>
        <div>
          <button className="twitter" onClick={this.shareToTwitter}> Share on Twitter </button>
        </div>
        <p> Progress: {this.state.percent}% </p>
        <ProgressLine percent={this.state.percent} strokeWidth="4" strokeColor={this.state.color}>
        </ProgressLine>
      </div>
    );
  }
}
