import type { SVGProps } from 'react';
import * as React from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const LogoKdacolorDark = (
  { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    data-style="kdacolor"
    viewBox="0 0 225 64"
    fontSize="1.5em"
    fill="currentColor"
    height="1em"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="#F0EAE6"
      d="M66.345 46.283v-28.57h4.372v11.874h.675A3005 3005 0 0 0 82.01 17.714h5.725a6431 6431 0 0 1-12.84 14.065q3.338 3.624 13.318 14.504H82.29q-2.703-3.028-10.894-12.115h-.675v12.115h-4.375M89.401 46.283q2.028-7.133 8.11-28.572h7.752q2.028 7.133 8.109 28.572h-4.534q-.478-1.673-1.867-6.734H95.799q-.438 1.673-1.867 6.734zm7.514-10.8h8.943q-1.035-3.783-4.132-15.023h-.676q-1.035 3.747-4.133 15.024zM116.159 46.283v-28.57h11.41q5.685 0 8.705 2.91 3.06 2.91 3.062 8.725v5.34q0 5.857-3.062 8.725-3.022 2.867-8.705 2.867h-11.41zm4.455-3.985h6.997q3.695 0 5.486-1.87 1.788-1.912 1.788-5.62v-5.62q0-3.745-1.788-5.58-1.787-1.833-5.486-1.832h-6.997zM144.304 46.283v-28.57h17.929v4.027h-13.557v8.169h12.445v4.026h-12.445v8.369h13.758v3.985h-18.13zM167.05 46.283v-28.57h8.469a7665 7665 0 0 0 7.714 25.623h.676V17.714h4.333v28.572h-8.469a7901 7901 0 0 0-7.714-25.664h-.676v25.664h-4.333zM192.091 46.283q2.028-7.133 8.11-28.572h7.752q2.028 7.133 8.109 28.572h-4.531q-.478-1.673-1.867-6.734h-11.168q-.438 1.673-1.868 6.734h-4.537m7.514-10.8h8.944q-1.036-3.783-4.133-15.023h-.676q-1.035 3.747-4.132 15.024z"
    />
    <path
      fill="#4A9079"
      d="m57.87 56-17.392-.009-21.679-16.92L27.616 32zM57.87 8H40.487L18.799 24.93 27.616 32zM18.794 55.991 8 47.463V16.537l10.794-8.528z"
    />
  </svg>
);
export default LogoKdacolorDark;