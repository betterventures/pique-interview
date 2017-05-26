import React, { Component } from 'react'
import NukaCarousel from 'nuka-carousel'
import css from './style.css'

export class Carousel extends Component {
  constructor(props) {
    super(props)
    this.state = {index: 0, autoplay: true}
    this.goToSlide = ::this.goToSlide
    this.skipToSlide = ::this.skipToSlide
  }

  skipToSlide(params) {
    const { next, previous } = params
    const { index } = this.state
    if (index < params.index) {
      params.index - index > 1 ? previous() : next()
    } else if (index > params.index) {
      index - params.index > 1 ? next() : previous()
    }
    this.setState({autoplay: false})
  }

  goToSlide(index) {
    this.setState({ index })
  }

  render() {
    const { index, autoplay } = this.state
    const { className, slides, header } = this.props
    return (
      <div className={`${css.root} ${className ? className : ''}`}>
        <div className={css.title}>{header}</div>
        <div className={css.stacked}>
          {slides.map((x, i) =>
            <div key={i}>
              <SlideInfo
                number={i + 1}
                title={x.title}
                body={x.body}
                className={css.detail} />
              <CarouselSlide
                className={css.bg}
                image={x.image} />
            </div>)}
        </div>

        <div className={css.content}>
          <NukaCarousel
            wrapAround
            autoplay={autoplay}
            slideIndex={index}
            initialSlideHeight={500}
            initialSlideWidth={680}
            afterSlide={this.goToSlide}
            slidesToScroll={1}
            decorators={[{
              position: 'TopRight',
              style:{
                position: 'absolute',
                top: '0px',
                right: '0',
                maxWidth: '500px',
                zIndex: 5
              },
              component: props =>
                <CarouselDetails
                  {...props}
                  slides={slides}
                  index={index}
                  className={css.details}
                  onClick={this.skipToSlide} />
            }]}>
            {slides.map((x, i) =>
              <CarouselSlide
                key={i}
                className={css.bg}
                image={x.image} />)}
          </NukaCarousel>
        </div>
      </div>
    )
  }
}

const SlideInfo = ({ number, title, body, onClick, className }) => {
  return (
    <div
      className={className}
      onClick={onClick}>
      <div className={css.bullet}>
        <div className={css.num}>{number}</div>
      </div>
      <div className={css.point}>
        <div className={css.h3}>{title}</div>
        <div className={css.h5}>{body}</div>
      </div>
    </div>
  )
}


const CarouselDetails = ({ slides, index, onClick, className, ...rest }) => {
  return (
    <div className={className}>
      {slides.map((x, i) =>
        <SlideInfo
          number={i + 1}
          title={x.title}
          body={x.body}
          key={i}
          className={`${css.detail} ${index === i ? css.active : ''}`}
          onClick={_ => onClick({
            previous: rest.previousSlide,
            next: rest.nextSlide,
            index: i
          })} />
      )}
    </div>
  )
}

const CarouselSlide = ({ image, className }) => {
  return (
    <div
      className={className}
      style={{backgroundImage: `url(${image})`}} />
  )
}

export default Carousel
