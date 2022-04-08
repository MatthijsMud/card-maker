import Head from 'next/head'
import Link from "next/link";
import { VFC } from "react";

import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  Container,
  styled,
} from "@mui/material";

import { Workbench } from "$/layout/workbench";
import { Image } from "$/components";
import YGO from "$/images/splash/yu-gi-oh.svg";

const Home: VFC = (props) => {
  return <>
    <Head>
      <title>Card maker</title>
      <meta name="description" content="Easily create custom trading cards." />
    </Head>
    <Workbench
      title={<Typography variant="h6" component="h1">Card Maker</Typography>}
    >
      {/* Prevent tiles from growing too big on exceedingly wide screens. */}
      <Container maxWidth="xl">
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12} md={6} lg={4}>
            <CardLink href="/yu-gi-oh" media={YGO} title="Yu-Gi-Oh!" />
          </Grid>
        </Grid>
      </Container>
    </Workbench>
  </>
}

export default Home;

const Aspect = styled("div")<{ ratio?: number }>(({ ratio = 1 }) => {
  return {
    position: "relative",
    "&::before": {
      content: JSON.stringify(""),
      display: "block",
      paddingTop: `${(100 / ratio).toFixed(2)}%`,
    },
    "& img": {
      objectFit: "cover",
      objectPosition: "50% 50%",
    },
  }
});

const CardLink: VFC<CardLink.Props> = (props) => {
  return <Card style={{ flexGrow: 1 }}>
    <Link href={props.href} passHref>
      <CardActionArea component="a" style={{ flexGrow: 1 }}>
        <CardMedia component={Aspect} ratio={19 / 10}>
          {/* Relevant `alt` information is conveyed in the link and title. */}
          <Image src={props.media} alt="" layout="fill" />
        </CardMedia>

        <CardHeader title={props.title} />
      </CardActionArea>
    </Link>
  </Card>
};

declare namespace CardLink {
  export type Props = {
    href: string;
    title: string;
    media: string;
  }
}