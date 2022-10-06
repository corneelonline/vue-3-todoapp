<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 23">
    <defs>
      <filter
        x="-4.4%"
        y="-1.5%"
        width="108.9%"
        height="103%"
        filterUnits="objectBoundingBox"
        id="a"
      >
        <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur
          stdDeviation="2"
          in="shadowOffsetOuter1"
          result="shadowBlurOuter1"
        />
        <feColorMatrix
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.151977112 0"
          in="shadowBlurOuter1"
          result="shadowMatrixOuter1"
        />
        <feMerge>
          <feMergeNode in="shadowMatrixOuter1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g
      filter="url(#a)"
      transform="translate(-34 -314)"
      fill="#9B9999"
      fill-rule="nonzero"
    >
      <path
        d="M45.438 330.5v-6.508H52v-.929h-6.562V316.5h-.93v6.563H38v.929h6.508v6.508z"
      />
    </g>
  </svg>
</template>
