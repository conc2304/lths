import { Box, SxProps } from '@mui/system';
import { Property } from 'csstype';

type SVGProps = {
  scale?: number;
  width?: number;
  height?: number;
  wrapperSx?: SxProps;
  gradientColorBottom?: Property.Color;
  gradientColorTop?: Property.Color;
};

export const LitehouseLogoIcon = (props: SVGProps) => {
  const {
    scale = 1,
    width = 23,
    height = 30,
    wrapperSx,
    gradientColorTop = '#299581',
    gradientColorBottom = '#047881',
  } = props;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', ...wrapperSx }} data-testid="LitehouseLogoIcon">
      <svg
        width={width * scale}
        height={height * scale}
        viewBox="0 0 23 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.5604 24.6445L8.76998 25.9496C8.12848 26.4163 8.11151 27.3666 8.73434 27.8571L10.148 28.9704C10.8726 29.5406 11.8926 29.5406 12.6155 28.9704L14.0309 27.8571C14.6537 27.3666 14.6368 26.4163 13.9953 25.9496L12.2048 24.6445C11.7144 24.2865 11.0508 24.2865 10.5604 24.6445Z"
          fill="url(#paint0_linear_11841_104973)"
        />
        <path
          d="M10.5604 5.36238L8.76998 4.05734C8.12848 3.59064 8.11151 2.64028 8.73434 2.14983L10.148 1.03655C10.8726 0.466333 11.8926 0.466333 12.6155 1.03655L14.0309 2.14983C14.6537 2.64028 14.6368 3.59064 13.9953 4.05734L12.2048 5.36238C11.7144 5.72047 11.0508 5.72047 10.5604 5.36238Z"
          fill="url(#paint1_linear_11841_104973)"
        />
        <path
          d="M16.4968 5.01598L13.7221 7.03889C13.1162 7.48013 12.9176 8.28963 13.2418 8.96506C14.0818 10.7147 14.6011 13.0228 14.6011 15.0032C14.6011 16.9837 14.0801 19.2917 13.2418 21.0414C12.9176 21.7169 13.1162 22.5264 13.7221 22.9676L16.4968 24.9905C17.2469 25.5387 18.2736 24.853 18.0547 23.9502C17.5557 21.8951 16.7785 18.8013 16.7768 15.0049C16.7785 11.2069 17.5557 8.11483 18.0547 6.05968C18.2736 5.15514 17.2486 4.46952 16.4968 5.01598Z"
          fill="url(#paint2_linear_11841_104973)"
        />
        <path
          d="M6.25493 5.01598L9.02964 7.03889C9.6355 7.48013 9.83405 8.28963 9.50991 8.96506C8.66986 10.7147 8.15056 13.0228 8.15056 15.0032C8.15056 16.9837 8.67156 19.2917 9.50991 21.0414C9.83405 21.7169 9.6355 22.5264 9.02964 22.9676L6.25493 24.9905C5.50482 25.5387 4.47809 24.853 4.69702 23.9502C5.19595 21.8951 5.97321 18.8013 5.97491 15.0049C5.97321 11.2069 5.19595 8.11483 4.69702 6.05968C4.47809 5.15514 5.50312 4.46952 6.25493 5.01598Z"
          fill="url(#paint3_linear_11841_104973)"
        />
        <path
          d="M2.78084 15.0037C2.78084 13.478 3.17625 11.9999 3.9009 10.7373C4.29293 10.0516 3.97048 9.17764 3.22886 8.90781L1.53009 8.28838C0.988727 8.09151 0.460938 8.51239 0.460938 9.0877C0.460938 10.6083 1.03794 12.117 1.03794 15.0037C1.03794 17.8904 0.460938 19.3991 0.460938 20.9197C0.460938 21.495 0.990424 21.9159 1.53009 21.719L3.22886 21.0996C3.97048 20.8297 4.29463 19.9558 3.9009 19.2701C3.17625 18.0075 2.78084 16.5294 2.78084 15.0037Z"
          fill="url(#paint4_linear_11841_104973)"
        />
        <path
          d="M19.969 15.0037C19.969 13.478 19.5736 11.9999 18.8489 10.7373C18.4569 10.0516 18.7793 9.17764 19.521 8.90781L21.2197 8.28838C21.7611 8.09151 22.2889 8.51239 22.2889 9.0877C22.2889 10.6083 21.7119 12.117 21.7119 15.0037C21.7119 17.8904 22.2889 19.3991 22.2889 20.9197C22.2889 21.495 21.7594 21.9159 21.2197 21.719L19.521 21.0996C18.7793 20.8297 18.4552 19.9558 18.8489 19.2701C19.5736 18.0075 19.969 16.5294 19.969 15.0037Z"
          fill="url(#paint5_linear_11841_104973)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_11841_104973"
            x1="11.3827"
            y1="0.959268"
            x2="11.3827"
            y2="28.3139"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={gradientColorTop} />
            <stop offset="1" stopColor={gradientColorBottom} />
          </linearGradient>
          <linearGradient
            id="paint1_linear_11841_104973"
            x1="11.3827"
            y1="0.959264"
            x2="11.3827"
            y2="28.3139"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={gradientColorTop} />
            <stop offset="1" stopColor={gradientColorBottom} />
          </linearGradient>
          <linearGradient
            id="paint2_linear_11841_104973"
            x1="15.5858"
            y1="0.959061"
            x2="15.5858"
            y2="28.3137"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={gradientColorTop} />
            <stop offset="1" stopColor={gradientColorBottom} />
          </linearGradient>
          <linearGradient
            id="paint3_linear_11841_104973"
            x1="7.16539"
            y1="0.959061"
            x2="7.16539"
            y2="28.3137"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={gradientColorTop} />
            <stop offset="1" stopColor={gradientColorBottom} />
          </linearGradient>
          <linearGradient
            id="paint4_linear_11841_104973"
            x1="2.26432"
            y1="0.959497"
            x2="2.26432"
            y2="28.3141"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={gradientColorTop} />
            <stop offset="1" stopColor={gradientColorBottom} />
          </linearGradient>
          <linearGradient
            id="paint5_linear_11841_104973"
            x1="20.4867"
            y1="0.959497"
            x2="20.4867"
            y2="28.3141"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={gradientColorTop} />
            <stop offset="1" stopColor={gradientColorBottom} />
          </linearGradient>
        </defs>
      </svg>
    </Box>
  );
};
