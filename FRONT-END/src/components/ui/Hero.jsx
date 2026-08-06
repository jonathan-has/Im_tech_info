import HeroImg from "../../assets/hero/hero.png";

export default function Hero() {
  return (
    <div className="relative w-170 h-112.5 lg:block hidden">

      {/* Image découpée */}
      <svg
        viewBox="0 0 700 450"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <clipPath id="heroClip">
            <path
              d="
                M170 0
                H700
                V450
                H170
                C110 450 70 410 70 360
                L70 300
                C70 270 45 245 0 225
                C45 205 70 180 70 150
                L70 90
                C70 40 110 0 170 0
                Z
              "
            />
          </clipPath>
        </defs>

        <image
          href={HeroImg}
          width="700"
          height="450"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#heroClip)"
        />

        {/* Contour */}
        <path
          d="
            M170 0
            H700
            V450
            H170
            C110 450 70 410 70 360
            L70 300
            C70 270 45 245 0 225
            C45 205 70 180 70 150
            L70 90
            C70 40 110 0 170 0
            Z
          "
          fill="none"
          stroke="#5B5FFF"
          strokeWidth="5"
        />
      </svg>

      {/* Décoration en haut */}
      <div className="absolute -top-5 right-12 w-24 h-24 rounded-full bg-blue-500/20 blur-3xl"></div>

      {/* Décoration en bas */}
      <div className="absolute bottom-10 left-0 w-16 h-16 border-2 border-blue-500 rotate-45"></div>

    </div>
  );
}