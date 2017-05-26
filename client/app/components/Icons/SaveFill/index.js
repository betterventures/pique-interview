import React from 'react'

const SaveFillIcon = ({ className }) => {
  return (
    <svg
      className={className}
      width="75px"
      height="78px"
      viewBox="0 0 75 78">
      <defs>
        <ellipse id="path-1" cx="17.875" cy="20" rx="17.875" ry="20"></ellipse>
        <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-2">
          <feOffset dx="0" dy="4" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
          <feGaussianBlur stdDeviation="10" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
          <feColorMatrix values="0 0 0 0 0.284861232   0 0 0 0 0.335205366   0 0 0 0 0.414248512  0 0 0 0.2794101 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
        </filter>
      </defs>
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-576.000000, -526.000000)">
          <g id="Group-4" transform="translate(340.000000, 281.000000)">
            <g id="Scholarship-Card-List" transform="translate(0.000000, 130.000000)">
              <g id="Scholarship-Card">
                <g transform="translate(255.612500, 130.000000)">
                  <g id="Oval-5">
                    <use fill="black" fillOpacity="1" filter="url(#filter-2)" href="#path-1"></use>
                    <use fill="#50ADE3" fillRule="evenodd" href="#path-1"></use>
                  </g>
                  <path d="M26.5093673,18.2468418 C26.7734706,18.012521 26.8784756,17.6166201 26.7705538,17.2582821 C26.6631624,16.899646 26.3664438,16.6560835 26.0294204,16.6501211 L20.4901437,16.5505497 L18.625245,10.5971306 C18.5128155,10.2393889 18.2118543,10 17.8748308,10 C17.5375422,10 17.236581,10.2393889 17.1244166,10.5971306 L15.2584573,16.5505497 L9.72024129,16.6501211 C9.38374813,16.6560835 9.08702958,16.899646 8.97937298,17.2582821 C8.87171638,17.6169182 8.97619101,18.0128191 9.24055955,18.2468418 L13.6412219,22.1459288 L12.079936,28.0504565 C11.984477,28.4114775 12.1006188,28.8017142 12.3702906,29.0253028 C12.6404928,29.2488914 13.0058888,29.258133 13.2843111,29.0491522 L17.8748308,25.6023104 L22.4653506,29.0491522 C22.5995236,29.1499162 22.7533187,29.2 22.9071139,29.2 C23.0733717,29.2 23.2396296,29.1412707 23.379371,29.0253028 C23.649308,28.8011179 23.7651847,28.4111794 23.6694605,28.0501584 L22.1060533,22.1459288 L26.5093673,18.2468418 Z" id="star" fill="#FFFFFF"></path>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default SaveFillIcon