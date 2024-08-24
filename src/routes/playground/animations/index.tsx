import { component$ } from "@builder.io/qwik";
import "./style.css";
import AnimationBg from "~/media/animation-bg.svg";

export default component$(() => {
  return (
    <div class="relative flex justify-between items-center w-full bg-black h-[100vh] overflow-hidden py-4">
      <img
        class="move-circle"
        alt="Gradient"
        width="1200"
        height="1200"
        src={AnimationBg}
      />
      <svg
        class="lines-entering z-10"
        width="456"
        height="506"
        viewBox="0 0 456 506"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1H146.977C158.575 1 167.977 10.402 167.977 22V119C167.977 130.598 177.379 140 188.977 140H387"
          stroke="url(#paint0_linear_3935_100252)"
          stroke-opacity="0.5"
          stroke-width="2"
        />
        <path
          d="M1 73H95.6589C107.257 73 116.659 82.402 116.659 94V178C116.659 189.598 126.061 199 137.659 199H295"
          stroke="url(#paint1_linear_3935_100252)"
          stroke-opacity="0.5"
          stroke-width="2"
        />
        <path
          d="M1 34H52.3852C63.9831 34 73.3851 43.402 73.3851 55V147C73.3851 158.598 82.7872 168 94.3851 168H362.5"
          stroke="url(#paint2_linear_3935_100252)"
          stroke-opacity="0.5"
          stroke-width="2"
        />
        <path
          d="M13 503.118L85.2395 504.566C97.077 504.804 106.77 495.213 106.66 483.374L105.638 374.196C105.529 362.522 114.962 353 126.637 353H456"
          stroke="url(#paint3_linear_3935_100252)"
          stroke-opacity="0.5"
          stroke-width="2"
        />
        <path
          d="M13 454.254L131.706 455.735C143.406 455.881 152.968 446.437 152.968 434.736V336C152.968 324.402 162.37 315 173.968 315L425 315"
          stroke="url(#paint4_linear_3935_100252)"
          stroke-opacity="0.5"
          stroke-width="2"
        />
        <path
          d="M1 395.5L45.2295 396.84C57.1223 397.201 66.9388 387.618 66.8651 375.72L66.1308 257.13C66.0587 245.481 75.4816 236 87.1304 236H312.5"
          stroke="url(#paint5_linear_3935_100252)"
          stroke-opacity="0.5"
          stroke-width="2"
        />
        <defs>
          <linearGradient
            id="paint0_linear_3935_100252"
            x1="-89.7655"
            y1="48.757"
            x2="-27.4134"
            y2="232.196"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#AC5DD9" />
            <stop offset="1" stop-color="#004FC4" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_3935_100252"
            x1="-93.9646"
            y1="116.291"
            x2="-43.6973"
            y2="286.981"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#AC5DD9" />
            <stop offset="1" stop-color="#004FC4" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_3935_100252"
            x1="-115.768"
            y1="80.0391"
            x2="-68.5817"
            y2="265.292"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#AC5DD9" />
            <stop offset="1" stop-color="#004FC4" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_3935_100252"
            x1="-244.14"
            y1="409.21"
            x2="-218.524"
            y2="616.655"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#004FC4" />
            <stop offset="0.58" stop-color="#AC5DD9" />
          </linearGradient>
          <linearGradient
            id="paint4_linear_3935_100252"
            x1="-226.146"
            y1="367.142"
            x2="-202.443"
            y2="559.589"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#004FC4" />
            <stop offset="0.58" stop-color="#AC5DD9" />
          </linearGradient>
          <linearGradient
            id="paint5_linear_3935_100252"
            x1="-179.811"
            y1="295.723"
            x2="-139.462"
            y2="511.966"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#004FC4" />
            <stop offset="0.58" stop-color="#AC5DD9" />
          </linearGradient>
        </defs>
      </svg>
      <div class="text-center">
        <h1 class="appear-from-below text-white text-5xl mb-2">Welcome to</h1>
        <h2 class="appear-from-below-with-delay text-white text-5xl">
          Future of AI
        </h2>
      </div>
      <svg
        class="lines-entering z-10"
        width="456"
        height="506"
        viewBox="0 0 456 506"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M455 1H309.023C297.425 1 288.023 10.402 288.023 22V119C288.023 130.598 278.621 140 267.023 140H69"
          stroke="url(#paint0_linear_3957_100704)"
          stroke-opacity="0.5"
          stroke-width="2"
        />
        <path
          d="M455 73H360.341C348.743 73 339.341 82.402 339.341 94V178C339.341 189.598 329.939 199 318.341 199H161"
          stroke="url(#paint1_linear_3957_100704)"
          stroke-opacity="0.5"
          stroke-width="2"
        />
        <path
          d="M455 34H403.615C392.017 34 382.615 43.402 382.615 55V147C382.615 158.598 373.213 168 361.615 168H93.5"
          stroke="url(#paint2_linear_3957_100704)"
          stroke-opacity="0.5"
          stroke-width="2"
        />
        <path
          d="M443 503.118L370.761 504.566C358.923 504.804 349.23 495.213 349.34 483.374L350.362 374.196C350.471 362.522 341.038 353 329.363 353H1.01328e-05"
          stroke="url(#paint3_linear_3957_100704)"
          stroke-opacity="0.5"
          stroke-width="2"
        />
        <path
          d="M443 454.254L324.294 455.735C312.594 455.881 303.032 446.437 303.032 434.736V336C303.032 324.402 293.63 315 282.032 315L31 315"
          stroke="url(#paint4_linear_3957_100704)"
          stroke-opacity="0.5"
          stroke-width="2"
        />
        <path
          d="M455 395.5L410.771 396.84C398.878 397.201 389.061 387.618 389.135 375.72L389.869 257.13C389.941 245.481 380.518 236 368.87 236H143.5"
          stroke="url(#paint5_linear_3957_100704)"
          stroke-opacity="0.5"
          stroke-width="2"
        />
        <defs>
          <linearGradient
            id="paint0_linear_3957_100704"
            x1="545.765"
            y1="48.757"
            x2="483.413"
            y2="232.196"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#AC5DD9" />
            <stop offset="1" stop-color="#004FC4" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_3957_100704"
            x1="549.965"
            y1="116.291"
            x2="499.697"
            y2="286.981"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#AC5DD9" />
            <stop offset="1" stop-color="#004FC4" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_3957_100704"
            x1="571.768"
            y1="80.0391"
            x2="524.582"
            y2="265.292"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#AC5DD9" />
            <stop offset="1" stop-color="#004FC4" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_3957_100704"
            x1="700.14"
            y1="409.21"
            x2="674.524"
            y2="616.655"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#004FC4" />
            <stop offset="0.58" stop-color="#AC5DD9" />
          </linearGradient>
          <linearGradient
            id="paint4_linear_3957_100704"
            x1="682.146"
            y1="367.142"
            x2="658.443"
            y2="559.589"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#004FC4" />
            <stop offset="0.58" stop-color="#AC5DD9" />
          </linearGradient>
          <linearGradient
            id="paint5_linear_3957_100704"
            x1="635.811"
            y1="295.723"
            x2="595.462"
            y2="511.966"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#004FC4" />
            <stop offset="0.58" stop-color="#AC5DD9" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
});
