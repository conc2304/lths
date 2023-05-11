import { rest } from 'msw';
const regex = /\/images\/([^/]+)$/;
const response = rest.get(regex, async (req, res, ctx) => {
  //const name = req.params.name;
  const matches = req.url.pathname.match(regex);
  const name = matches ? matches[1] : null;
  if (name) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const url = require(`../../../assets/${name}`);
    //do not directly use require in the fetch, because array buffer is not fulling up
    const image = await fetch(url)
      .then((res) => res.arrayBuffer())
      .catch((e) => {
        console.error(e);
      });

    if (image)
      return res(
        ctx.set('Content-Length', image.byteLength.toString()),
        ctx.set('Content-Type', 'image/png'),
        ctx.body(image)
      );

    const fallback = await fetch('https://picsum.photos/seed/videocarousel/300/200')
      .then((res) => res.arrayBuffer())
      .catch((e) => {
        console.error(e);
      });

    if (fallback)
      return res(
        ctx.set('Content-Length', fallback.byteLength.toString()),
        ctx.set('Content-Type', 'image/png'),
        ctx.body(fallback)
      );
  } else return null;
});

export default response;
