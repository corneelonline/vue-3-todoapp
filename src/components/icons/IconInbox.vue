<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 24">
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
      transform="translate(-32 -31)"
      fill="#4670BB"
      fill-rule="nonzero"
    >
      <path
        d="M52.875 48.736c.316 0 .583-.111.8-.334.217-.222.325-.486.325-.79v-6.39a.545.545 0 0 0-.018-.132l-2.074-7.154a.47.47 0 0 0-.193-.308.561.561 0 0 0-.334-.114H38.443a.524.524 0 0 0-.342.123.607.607 0 0 0-.203.299l-1.88 6.802a.329.329 0 0 0-.018.185c.012.064.03.126.053.184a5.848 5.848 0 0 0-.035.15.768.768 0 0 0-.018.167v6.187c0 .305.108.569.325.791.217.223.484.334.8.334h15.75ZM45 42.584c-.68 0-1.233-.211-1.661-.633-.428-.422-.648-.972-.66-1.652h-5.378l1.582-5.66H50.94l1.635 5.66h-5.238c-.012.68-.234 1.23-.668 1.652-.434.422-.99.633-1.67.633Zm7.875 5.027h-15.75v-6.187h4.623c.246.715.653 1.274 1.222 1.679.568.404 1.245.606 2.03.606.785 0 1.465-.202 2.04-.606.573-.405.983-.964 1.23-1.68h4.605v6.188Z"
      />
    </g>
  </svg>
</template>
