import { Typography, Box } from "@mui/material"; //
import React from "react";
import { KpiRolloverCard } from "../components/kpi-rollover-card/kpi-rollover-card";
import { KpiSparklineCard } from "../components/kpi-sparkline-card/kpi-sparkline-card";
//DIFFERENT WAYS TO DEFINE PROPS

//const SamplePage:React.FC<{children:React.ReactNode}> = ({children}):JSX.Element => {
//const SamplePage = ({children}:{children:React.ReactNode}):JSX.Element => {
//const SamplePage = ():JSX.Element => {
//const SamplePage :React.FC<{}> = ():JSX.Element => {
//  const SamplePage = (props:any):JSX.Element => {

const trendProp = {
    //types of trens: Time duration, Median
    duration: 7,
    span: {
      title: "Prev 7 days",
      unit: "%",
      value: 31,
      direction: "up"
    },
    median: {
      title: "Median",
      unit: "%",
      value: 7,
      direction: "down"
    }
};

const props = {
  title: "Retention", 
  hero: 799, // comp format to add commas
  heroUnit: "SECS",
  trends: trendProp,
  tooltipDesc: "The ratio of users who return to continue using the app. If retention is low, it means that users are not engaging with the app and steps must be taken to attract usage.",
  tooltipActionUrl : "https://en.wikipedia.org/wiki/Retention",
  sparkLine: (<div>react Spark line</div>),
  routeUrl: "https://en.wikipedia.org/wiki/Retention",
}

const SamplePage = (): JSX.Element => {
  return (
    <Box title="Sample Card">
      <Typography variant="h1">Test Compnents</Typography>
      <Typography variant="body2">
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      </Typography>
      <div style={{width: "276px"}}>
        <KpiSparklineCard {...props}/>
      </div>
      <div style={{width: "376px"}}>
        <KpiSparklineCard {...props}/>
      </div>
    </Box>
  );
};

export default SamplePage;
