import { CSSProperties } from 'react';
import { Typography, Box, useTheme, Button } from '@mui/material';
import { ArrowBack, HomeOutlined } from '@mui/icons-material';
import { Property } from 'csstype';
import { useNavigate } from 'react-router-dom';

type SvgBlobProps = {
  gradient1: Property.Color;
  gradient2: Property.Color;
  blobKeyFrames: string[];
  wrapperStyles?: CSSProperties;
  animationDuration?: string | number;
  height?: number;
  width?: number;
};
const SvgBlob = ({
  gradient1,
  gradient2,
  wrapperStyles,
  blobKeyFrames,
  animationDuration = '50s',
  width = 500,
  height = 500,
}: SvgBlobProps) => (
  <Box
    sx={{
      position: 'absolute',
      width: `${width}px`,
      height: `${height}px`,
      background: 'transparent',
      ...wrapperStyles,
    }}
  >
    <svg viewBox={`0 0 500 500`} width="100%" id="blobSvg">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: gradient1 }}></stop>
          <stop offset="100%" style={{ stopColor: gradient2 }}></stop>
        </linearGradient>
      </defs>
      <path fill="url(#gradient)">
        <animate
          attributeName="d"
          dur={animationDuration}
          repeatCount="indefinite"
          values={[...blobKeyFrames, blobKeyFrames[0]].join('; ')}
        ></animate>
      </path>
    </svg>
  </Box>
);
const NotFound = (): JSX.Element => {
  const navigate = useNavigate();
  const theme = useTheme();
  const blobKeyFrames = [
    'M438.5,298Q433,346,387.5,364.5Q342,383,307.5,412.5Q273,442,224.5,444Q176,446,150,404Q124,362,89,330Q54,298,78.5,256Q103,214,122.5,184Q142,154,174,144Q206,134,234,141.5Q262,149,319,108.5Q376,68,392,117.5Q408,167,426,208.5Q444,250,438.5,298Z',
    'M417.5,292Q410,334,365.5,343.5Q321,353,298,404Q275,455,218,469.5Q161,484,145.5,420Q130,356,86,328.5Q42,301,78.5,259Q115,217,133,189.5Q151,162,170,126Q189,90,229.5,89.5Q270,89,322.5,79.5Q375,70,413.5,107Q452,144,438.5,197Q425,250,417.5,292Z',
    'M460,299Q437,348,385,359Q333,370,301.5,394Q270,418,233.5,404.5Q197,391,134.5,399.5Q72,408,53.5,355.5Q35,303,86,262.5Q137,222,152,199.5Q167,177,188,159Q209,141,244,74.5Q279,8,300,77.5Q321,147,391,143Q461,139,472,194.5Q483,250,460,299Z',
    'M465,300.5Q442,351,385,356.5Q328,362,298.5,386Q269,410,224,423.5Q179,437,148,402.5Q117,368,77,335.5Q37,303,28.5,248Q20,193,46.5,143Q73,93,126,77.5Q179,62,228.5,38.5Q278,15,334,31.5Q390,48,424,94.5Q458,141,473,195.5Q488,250,465,300.5Z',
    'M471,303Q451,356,382,348.5Q313,341,291.5,378.5Q270,416,231.5,408.5Q193,401,176,365.5Q159,330,148.5,304Q138,278,143.5,251.5Q149,225,113,160.5Q77,96,140,110.5Q203,125,235,118.5Q267,112,305,113.5Q343,115,395.5,130.5Q448,146,469.5,198Q491,250,471,303Z',
  ];

  const svgSize = [550, 550];
  return (
    <Box title="Page Not Found" position={'relative'}>
      <Box>
        {/* SVG WRAPPER */}
        <Box
          className="svg-wrapper--root"
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            margin: '0 auto',
            width: `${svgSize[0]}px`,
            height: `${svgSize[1]}px`,
            pl: '8rem',
          }}
        >
          <SvgBlob
            gradient1={theme.palette.primary.main}
            gradient2={theme.palette.secondary.main}
            blobKeyFrames={blobKeyFrames}
            wrapperStyles={{ filter: 'blur(20px)', opacity: 1 }}
            width={svgSize[0]}
            height={svgSize[1]}
          />
          <SvgBlob
            gradient1={theme.palette.primary.dark}
            gradient2={theme.palette.primary.light}
            blobKeyFrames={blobKeyFrames}
            width={svgSize[0]}
            height={svgSize[1]}
          />
          {/* glow effect */}

          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <Button
              onClick={() => navigate('/', { replace: true })}
              size="large"
              variant="contained"
              endIcon={<HomeOutlined />}
            >
              HOME
            </Button>
            <Button onClick={() => navigate(-1)} size="large" variant="contained" endIcon={<ArrowBack />}>
              BACK
            </Button>
          </Box>
        </Box>
        {/* TEXT WRAPPER */}
        <Box
          sx={{
            color: theme.palette.secondary.main,
            mixBlendMode: 'difference',
            pr: '16rem',
            pt: '3rem',
            position: 'absolute',
            left: 0,
            right: 0,
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h1"
            component={'div'}
            sx={{
              fontSize: '16rem',
            }}
          >
            404
          </Typography>
          <Typography variant="h2" sx={{ fontSize: '2rem', pr: '12rem' }}>
            Page Not Found
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default NotFound;
