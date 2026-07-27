declare module 'react-katex' {
  import * as React from 'react';

  export const BlockMath: React.ComponentType<{
    math?: string | number;
    errorColor?: string;
    className?: string;
  }>;

  export const InlineMath: React.ComponentType<{
    math?: string | number;
    errorColor?: string;
    className?: string;
  }>;

  const _default: any;
  export default _default;
}
