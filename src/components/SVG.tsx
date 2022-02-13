import React from 'react';

export const CloudySVG = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" className="opacity-50">
      <defs>
        <filter id="a" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dy="4" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope=".05" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#a)">
        <g transform="translate(20 26)">
          <g className="am-weather-sun">
            <path
              fill="none"
              stroke="orange"
              strokeLinecap="round"
              strokeWidth="2"
              d="M0 9v3M-6.364 6.364l-2.121 2.121M-9 0h-3M-6.364-6.364l-2.121-2.121M0-9v-3M6.364-6.364l2.121-2.121M9 0h3M6.364 6.364l2.121 2.121"
            />
          </g>
          <circle fill="orange" r="5" stroke="orange" strokeWidth="2" />
        </g>
        <path
          d="M47.7 34.4c0-4.6-3.7-8.2-8.2-8.2-1 0-1.9.2-2.8.5-.3-3.4-3.1-6.2-6.6-6.2-3.7 0-6.7 3-6.7 6.7 0 .8.2 1.6.4 2.3-.3-.1-.7-.1-1-.1-3.7 0-6.7 3-6.7 6.7 0 3.6 2.9 6.6 6.5 6.7h17.2c4.4-.5 7.9-4 7.9-8.4z"
          fill="#57A0EE"
          stroke="#FFF"
          strokeLinejoin="round"
          strokeWidth="1.2"
          className="am-weather-cloud-2"
        />
      </g>
    </svg>
  );
};

export const RainySVG = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" className="opacity-50">
      <defs>
        <filter id="blur" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dy="4" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope=".05" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#blur)" id="rainy-6">
        <path
          d="M47.7 34.4c0-4.6-3.7-8.2-8.2-8.2-1 0-1.9.2-2.8.5-.3-3.4-3.1-6.2-6.6-6.2-3.7 0-6.7 3-6.7 6.7 0 .8.2 1.6.4 2.3-.3-.1-.7-.1-1-.1-3.7 0-6.7 3-6.7 6.7 0 3.6 2.9 6.6 6.5 6.7h17.2c4.4-.5 7.9-4 7.9-8.4z"
          fill="#57A0EE"
          stroke="#FFF"
          strokeLinejoin="round"
          strokeWidth="1.2"
        />
        <path
          className="am-weather-rain-1"
          fill="none"
          stroke="#91C0F8"
          strokeDasharray="4,4"
          strokeLinecap="round"
          strokeWidth="2"
          d="m26.887 46.29-1.39 7.879"
        />
        <path
          className="am-weather-rain-2"
          fill="none"
          stroke="#91C0F8"
          strokeDasharray="4,4"
          strokeLinecap="round"
          strokeWidth="2"
          d="m31.174 45.015-1.39 7.879"
        />
        <path
          className="am-weather-rain-1"
          fill="none"
          stroke="#91C0F8"
          strokeDasharray="4,4"
          strokeLinecap="round"
          strokeWidth="2"
          d="m34.94 46.695-1.39 7.878"
        />
      </g>
    </svg>
  );
};

export const SnowySVG = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" className="opacity-50">
      <defs>
        <filter id="blur" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dy="4" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope=".05" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#blur)" id="snowy-6">
        <path
          d="M47.7 34.4c0-4.6-3.7-8.2-8.2-8.2-1 0-1.9.2-2.8.5-.3-3.4-3.1-6.2-6.6-6.2-3.7 0-6.7 3-6.7 6.7 0 .8.2 1.6.4 2.3-.3-.1-.7-.1-1-.1-3.7 0-6.7 3-6.7 6.7 0 3.6 2.9 6.6 6.5 6.7h17.2c4.4-.5 7.9-4 7.9-8.4z"
          fill="#57A0EE"
          stroke="#FFF"
          strokeLinejoin="round"
          strokeWidth="1.2"
          className="am-weather-cloud-2"
        />
        <g fill="none" stroke="#57A0EE" strokeLinecap="round" className="am-weather-snow-1">
          <path strokeWidth="1.2" d="M23 44.5v5" />
          <path transform="rotate(45 -45.234 51.263)" d="M0-2.5v5" />
          <path transform="rotate(90 -12 35)" d="M0-2.5v5" />
          <path transform="rotate(135 1.766 28.263)" d="M0-2.5v5" />
        </g>
        <g fill="none" stroke="#57A0EE" strokeLinecap="round" className="am-weather-snow-2">
          <path strokeWidth="1.2" d="M31 44.5v5" />
          <path transform="rotate(45 -41.234 60.92)" d="M0-2.5v5" />
          <path transform="rotate(90 -8 39)" d="M0-2.5v5" />
          <path transform="rotate(135 5.766 29.92)" d="M0-2.5v5" />
        </g>
        <g fill="none" stroke="#57A0EE" strokeLinecap="round" className="am-weather-snow-3">
          <path strokeWidth="1.2" d="M40 44.5v5" />
          <path transform="rotate(45 -36.734 71.784)" d="M0-2.5v5" />
          <path transform="rotate(90 -3.5 43.5)" d="M0-2.5v5" />
          <path transform="rotate(135 10.266 31.784)" d="M0-2.5v5" />
        </g>
      </g>
    </svg>
  );
};

export const ClearSVG = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
      <defs>
        <filter id="blur" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dy="4" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope=".05" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#blur)" id="day">
        <g transform="translate(32 32)">
          <g className="am-weather-sun am-weather-sun-shiny am-weather-easing-ease-in-out">
            <path
              fill="none"
              stroke="orange"
              strokeLinecap="round"
              strokeWidth="2"
              d="M0 9v3M-6.364 6.364l-2.121 2.121M-9 0h-3M-6.364-6.364l-2.121-2.121M0-9v-3M6.364-6.364l2.121-2.121M9 0h3M6.364 6.364l2.121 2.121"
            />
          </g>
          <circle fill="orange" r="5" stroke="orange" strokeWidth="2" />
        </g>
      </g>
    </svg>
  );
};

export const DrizzleSVG = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
      <defs>
        <filter id="blur" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dy="4" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope=".05" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#blur)" id="rainy-3">
        <g transform="translate(20 26)">
          <g className="am-weather-sun">
            <path stroke="orange" strokeLinecap="round" strokeWidth="2" d="M0 9v3" />
            <path
              fill="none"
              stroke="orange"
              strokeLinecap="round"
              strokeWidth="2"
              d="m-6.364 6.364-2.121 2.121M-9 0h-3M-6.364-6.364l-2.121-2.121M0-9v-3M6.364-6.364l2.121-2.121M9 0h3M6.364 6.364l2.121 2.121"
            />
          </g>
          <circle fill="orange" r="5" stroke="orange" strokeWidth="2" />
        </g>
        <path
          d="M47.7 34.4c0-4.6-3.7-8.2-8.2-8.2-1 0-1.9.2-2.8.5-.3-3.4-3.1-6.2-6.6-6.2-3.7 0-6.7 3-6.7 6.7 0 .8.2 1.6.4 2.3-.3-.1-.7-.1-1-.1-3.7 0-6.7 3-6.7 6.7 0 3.6 2.9 6.6 6.5 6.7h17.2c4.4-.5 7.9-4 7.9-8.4z"
          fill="#57A0EE"
          stroke="#FFF"
          strokeLinejoin="round"
          strokeWidth="1.2"
        />
        <g>
          <path
            className="am-weather-rain-1"
            fill="none"
            stroke="#91C0F8"
            strokeDasharray="4,7"
            strokeLinecap="round"
            strokeWidth="2"
            d="m27.918 45.943-1.39 7.878"
          />
          <path
            className="am-weather-rain-2"
            fill="none"
            stroke="#91C0F8"
            strokeDasharray="4,7"
            strokeLinecap="round"
            strokeWidth="2"
            d="m34.174 45.015-1.39 7.879"
          />
        </g>
      </g>
    </svg>
  );
};

export const icons = [
  { id: 'Clouds', icon: <CloudySVG /> },
  { id: 'Rain', icon: <RainySVG /> },
  { id: 'Snow', icon: <SnowySVG /> },
  { id: 'Clear', icon: <ClearSVG /> },
  { id: 'Drizzle', icon: <DrizzleSVG /> }
];
